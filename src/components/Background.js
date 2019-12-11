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
    inFlowArr.forEach( inFlow => {
        formula += "+"+inFlow
    });
   
    outFlowArr.forEach( outFlow => {
        formula += "-"+outFlow
    });

    if(!steps){
        steps = 1
    }
    const step = x/steps
    const values = []

    for(let i=1; i<=steps; i++){
        values.push(math.parse(math.format(math.integral(formula, 'x'))).compile().eval({x:i*step}))
    }

    return values
}
console.log(calculateIntegral([], ['x^2'], 10, 1))


export default class Background extends React.Component {

    componentDidMount() {
        const stateRef = firebase.database().ref('state');

        stateRef.on('value', (state) => {
            this.setState(state.val())
        })
    }

    highlightStock = (stockID) =>{
        if(this.state.stockIDs.includes(stockID)){
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
        const newPos = Object.assign({}, this.state.stockPos)
        newPos[stockID] = { x: x, y: y }
        firebase.database().ref('state/stockPos').set(newPos);
    }

    updateStockValue = (stockID, value) => {
        const newValue = Object.assign({}, this.state.stockValues)
        newValue[stockID] = value
        firebase.database().ref('state/stockValues').set(newValue)
    }

    addFlow = (stockID, isInFlow, formula) => {
        let flows
        let path
        if(isInFlow){
            flows = Object.assign({}, this.state.inFlows)
            path = 'inFlows'
        } else {
            flows = Object.assign({}, this.state.outFlows)
            path = 'outFlows'
        }
        
        if(!(stockID in flows)){
            flows[stockID] = []
        }

        flows[stockID].push(formula)
        firebase.database().ref(`state/${path}`).set(flows)
    }

    addStock= (stockName, value) => {
        const newPtr = this.state.stockPtr + 1
        const newStockID = stockName
        const newStockPos = Object.assign({}, this.state.stockPos)
        const newStockValues = Object.assign({}, this.state.stockValues)
        newStockPos[newStockID] = {x:0, y:0}
        console.log(value)
        newStockValues[newStockID] = +value
        console.log("newStockID ", newStockID)
        
        const newState = {
            stockPtr: newPtr,
            stockIDs: this.state.stockIDs.concat([newStockID]),
            stockPos: newStockPos,
            stockValues: newStockValues,
        }

        console.log(newState)

        firebase.database().ref('state').set(newState);
    }

    constructor(props) {
        super(props)
        this.state = {
            stockPtr: 0,
            stockIDs: [],
            stockPos: {},
            stockValues:{},
            inFlows:{},
            outFlows:{},
        };
    }

    render() {
        const wrapperStyle = {display: "flex"}
        
        return (
            <div>
                <div style = {wrapperStyle}> 
                    <Board 
                        stockIDs={this.state.stockIDs}
                        stockPos={this.state.stockPos}
                        stockValues={this.state.stockValues}
                        stockBeingEdited={this.state.stockBeingEdited}
                        updatePosition={this.updatePosition}                
                        ></Board>
                    <StockList 
                        stockIDs={this.state.stockIDs}
                        stockValues={this.state.stockValues}
                        inFlows = {this.state.inFlows}
                        outFlows = {this.state.outFlows}
                    ></StockList>
            </div>
            <Toolbar 
                addStock={this.addStock}
                updateStockValue={this.updateStockValue}
                stockIDs={this.state.stockIDs}
                highlightStock={this.highlightStock}
                addFlow={this.addFlow}
            ></Toolbar>
            </div>
        );
    }
}