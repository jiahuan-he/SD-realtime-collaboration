import React from 'react';
import firebase from '../firebase'
import Board from './Board'
import Toolbar from './Toolbar'
import StockList from './StockList'
import { create, all } from 'mathjs'
import * as integral from 'mathjs-simple-integral'

const math = create(all)
math.import(integral)

const calculateIntegral = (inFlowArr, outFlowArr, x, steps) => {
    let formula = ""
    if(inFlowArr){
        inFlowArr.forEach( inFlow => {
            formula += "+"+inFlow
        });
    }
    
    if(outFlowArr){
        outFlowArr.forEach( outFlow => {
            formula += "-"+outFlow
        });
    }

    if(!steps){
        steps = 1
    }
    const step = x/steps
    const values = []
    if(formula.length > 0){
        for(let i=1; i<=steps; i++){
            values.push(math.parse(math.format(math.integral(formula, 'x'))).compile().eval({x:i*step}))
        }
    }
    return values
}

export default class Background extends React.Component {

    componentDidMount() {
        const stateRef = firebase.database().ref('state');

        stateRef.on('value', (state) => {
            this.setState(state.val())
        })
    }

    highlightStock = (stockID) =>{
        if(this.state.stocks.filter( (stock => stockID == stock.id))){
            this.setState({
                stockBeingEdited:stockID
            })
        } else {
            this.setState({
                stockBeingEdited: null
            })
        }
    }

    updatePosition = (stockID, x, y) => {
        const stocks = Object.assign([], this.state.stocks)
        const targetStock = stocks.find( stock => stock.id === stockID)
        targetStock.posX = x
        targetStock.posY = y
        firebase.database().ref('state/stocks').set(stocks);
    }

    updateStockValue = (stockID, value) => {
        const stocks = Object.assign([], this.state.stocks)
        const targetStock = stocks.find( stock => stock.id === stockID)
        targetStock.initValue = value
        firebase.database().ref('state/stocks').set(stocks)
    }

    addStock= (stockName, value) => {
        const stocks = Object.assign([], this.state.stocks)
        const newStock = {
            "id": stockName,
            "initValue":+value,
            "value":+value,
            "posX": 0,
            "posY": 0,
            "arrowTo": null,
            "arrowFrom": [],
        }
        stocks.push(newStock)
        firebase.database().ref('state/stocks').set(stocks);
    }


    // addFlow = (stockID, isInFlow, formula) => {
    //     let flows
    //     let path
    //     if(isInFlow){
    //         flows = Object.assign({}, this.state.inFlows)
    //         path = 'inFlows'
    //     } else {
    //         flows = Object.assign({}, this.state.outFlows)
    //         path = 'outFlows'
    //     }
        
    //     if(!(stockID in flows)){
    //         flows[stockID] = []
    //     }

    //     flows[stockID].push(formula)
    //     firebase.database().ref(`state/${path}`).set(flows)
    // }

    
    run = (stockID) => {
        const inFlows = this.state.inFlows[stockID]
        const outFlows = this.state.outFlows[stockID]
        const res = calculateIntegral(inFlows, outFlows, 10 , 10)
        
        let i = 0
        const t = setInterval(() => {
            if(i >= res.length){
                clearInterval(t);
            } else {
                this.updateStockValue(stockID, res[i])
                i++;
            }
        }, 1000);
    }

    constructor(props) {
        super(props)
        this.state = {
            stocks: [],
            flows: [],
        }
    }

    render() {
        const wrapperStyle = {display: "flex"}
        
        return (
            <div>
                <div style = {wrapperStyle}> 
                    <Board 
                        stocks={this.state.stocks}
                        stockBeingEdited={this.state.stockBeingEdited}
                        updatePosition={this.updatePosition}                
                        ></Board>
                    <StockList 
                        stocks={this.state.stocks}
                        flows={this.state.flows}
                    ></StockList>
            </div>
            <Toolbar 
                addStock={this.addStock}
                updateStockValue={this.updateStockValue}
                stocks={this.state.stocks}
                highlightStock={this.highlightStock}
            ></Toolbar>
            <button onClick={() => this.run("a")}>RUN</button>
            </div>
        );
    }
}