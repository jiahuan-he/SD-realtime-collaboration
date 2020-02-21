import React from 'react';
import firebase from '../firebase'
import Board from './Board'
import Toolbar from './Toolbar'
import FlowList from './FlowList'
import StockList from './StockList'
import ArrowList from './ArrowList'
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
        if(this.state.stocks.filter( (stock => stockID === stock.id))){
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
            "dependencies": [stockName],
            "equation": null,
        }
        stocks.push(newStock)
        firebase.database().ref('state/stocks').set(stocks);
    }

    addDependenciesToStockOrFlow = (dependency, id) => {
        const stocks = Object.assign([], this.state.stocks)
        const flows = Object.assign([], this.state.flows)
        const targetStock = stocks.find( stock => stock.id === id)
        const targetFlow = flows.find( flow => flow.id === id)
        if(targetStock) {
            if(!targetStock.dependencies) targetStock.dependencies = []
            targetStock.dependencies.push(dependency)
            firebase.database().ref('state/stocks').set(stocks);
        }
        else if(targetFlow) {
            if(!targetFlow.dependencies) targetFlow.dependencies = []
            targetFlow.dependencies.push(dependency)
            firebase.database().ref('state/flows').set(flows);
        }        
    }

    addFlow = (flowID, from, to) => {
        const flows = Object.assign([], this.state.flows)
        const newFlow = {
            "id": flowID,
            "equation":null,
            "from":from?from:null,
            "to":to?to:null,
            "dependencies": [],
        }
        flows.push(newFlow)
        console.log(flows)
        firebase.database().ref('state/flows').set(flows);
    }

    addArrow = (from, to) => {
        const arrows = Object.assign([], this.state.arrows)
        const newArrow = {
            "from":from,
            "to":to,
        }
        arrows.push(newArrow)
        firebase.database().ref('state/arrows').set(arrows)
    }
    
    addEquation = (equation, id) => {
        const stocks = Object.assign([], this.state.stocks)
        const flows = Object.assign([], this.state.flows)
        const targetStock = stocks.find( stock => stock.id === id)
        const targetFlow = flows.find( flow => flow.id === id)
        if(targetStock) {
            targetStock.equation = equation
            firebase.database().ref('state/stocks').set(stocks);
        }
        else if(targetFlow) {
            targetFlow.equation = equation
            firebase.database().ref('state/flows').set(flows);
        } 
    }
    
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
            arrows: [],
        }
    }

    render() {
        const wrapperStyle = {display: "flex"}
        
        return (
            <div>
                <div style = {wrapperStyle}> 
                    <Board 
                        stocks={this.state.stocks}
                        flows={this.state.flows}
                        stockBeingEdited={this.state.stockBeingEdited}
                        updatePosition={this.updatePosition}                
                        ></Board>
                    <div>
                        <StockList stocks={this.state.stocks}></StockList>
                        <FlowList flows={this.state.flows}></FlowList>
                        <ArrowList arrows={this.state.arrows}></ArrowList>
                    </div>
            </div>
            <Toolbar 
                addStock={this.addStock}
                addFlow={this.addFlow}
                updateStockValue={this.updateStockValue}
                stocks={this.state.stocks}
                flows={this.state.flows}
                highlightStock={this.highlightStock}
                addDependenciesToStockOrFlow={this.addDependenciesToStockOrFlow}
                addArrow={this.addArrow}
                addEquation={this.addEquation}
            ></Toolbar>
            <button onClick={() => this.run("a")}>RUN</button>
            </div>
        );
    }
}