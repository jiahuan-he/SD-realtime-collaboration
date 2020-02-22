import React from 'react';
import firebase from '../firebase'
import Board from './Board'
import Toolbar from './Toolbar'
import FlowList from './FlowList'
import StockList from './StockList'
import ArrowList from './ArrowList'
import Chart from './Chart'

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

    addSimulationData = (data) => {
        firebase.database().ref('state/simulationData').set(data);
    }

    constructor(props) {
        super(props)
        this.state = {
            stocks: [],
            flows: [],
            arrows: [],
            simulationData: [], 
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
                        {this.state.simulationData.length>0
                        &&<Chart simulationData={this.state.simulationData}></Chart>}
                        
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
                addSimulationData={this.addSimulationData}
            ></Toolbar>
            </div>
        );
    }
}