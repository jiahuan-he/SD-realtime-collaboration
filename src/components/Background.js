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

    updateParameterPosition = (parameterName, x, y) => {
        const parameters = Object.assign([], this.state.parameters)
        const targetParameter = parameters.find( parameters => parameters.name === parameterName)
        targetParameter.posX = x
        targetParameter.posY = y
        firebase.database().ref('state/parameters').set(parameters);
    }

    updateCloudPosition = (cloudByFlow, x, y) => {
        let targetCloud
        const cloudsOrigin = Object.assign([], this.state.cloudsOrigin)
        const cloudsDestination = Object.assign([], this.state.cloudsDestination)
        if(cloudsOrigin.find(cloud => cloud.flow === cloudByFlow)){
            targetCloud = cloudsOrigin.find(cloud => cloud.flow === cloudByFlow)
        } else {
            targetCloud = cloudsDestination.find(cloud => cloud.flow === cloudByFlow)
        }
        targetCloud.posX = x
        targetCloud.posY = y
        firebase.database().ref('state/cloudsOrigin').set(cloudsOrigin);
        firebase.database().ref('state/cloudsDestination').set(cloudsDestination);
    }

    updateStockValue = (stockID, value) => {
        const stocks = Object.assign([], this.state.stocks)
        const targetStock = stocks.find( stock => stock.id === stockID)
        targetStock.initValue = +value
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
            "equation": "",
        }
        stocks.push(newStock)
        firebase.database().ref('state/stocks').set(stocks);
    }

    addParameter= (parameterName, value) => {
        const parameters = Object.assign([], this.state.parameters)
        const newParameter = {
            "name": parameterName,
            "value":+value,
            "posX": 0,
            "posY": 10, // offset the text a bit so the text doesn't come off the background
        }
        console.log("add parameter")
        parameters.push(newParameter)
        firebase.database().ref('state/parameters').set(parameters);
    }

    addCloud= (flowID, from, to) => {
        if(from && to && from.trim().length>0 && to.trim().length>0) return
        const isOrigin = from ? false:true
        let clouds = isOrigin ? this.state.cloudsOrigin:this.state.cloudsDestination        
        clouds = Object.assign([], clouds)
        const ref = isOrigin?'state/cloudsOrigin':'state/cloudsDestination'
        const newCloud = {
            "flow":flowID,
            "posX": 0,
            "posY": 0,
        }
        clouds.push(newCloud)
        firebase.database().ref(ref).set(clouds);
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
            "equation": "",
            "from":from?from: "",
            "to":to?to: "",
            "dependencies": [],
        }
        const stocks = Object.assign([], this.state.stocks)
        
        // add flow names to stocks' equation by default
        if(from) stocks.find( stock => stock.id === from).equation += `-${flowID}`
        if(to) stocks.find( stock => stock.id === to).equation += `+${flowID}`

        flows.push(newFlow)
        firebase.database().ref('state/flows').set(flows);
        firebase.database().ref('state/stocks').set(stocks);
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
            cloudsOrigin: [],
            cloudsDestination: [],
            parameters: [],
        }
    }

    render() {
        const wrapperStyle = {display: "flex"}
        const XAxisDataKey = "__STEP__"
        return (
            <div>
                <div style = {wrapperStyle}> 
                    <Board 
                        stocks={this.state.stocks}
                        flows={this.state.flows}
                        arrows={this.state.arrows}
                        parameters={this.state.parameters}
                        cloudsOrigin={this.state.cloudsOrigin}
                        cloudsDestination={this.state.cloudsDestination}
                        stockBeingEdited={this.state.stockBeingEdited}
                        updatePosition={this.updatePosition}    
                        updateCloudPosition={this.updateCloudPosition}
                        updateParameterPosition={this.updateParameterPosition}
                        ></Board>
                    <div>
                        <StockList stocks={this.state.stocks}></StockList>
                        <FlowList flows={this.state.flows}></FlowList>
                        <ArrowList arrows={this.state.arrows}></ArrowList>
                        {this.state.simulationData.length>0
                        &&<Chart simulationData={this.state.simulationData} XAxisDataKey={XAxisDataKey}></Chart>}
                        
                    </div>
            </div>
            <Toolbar 
                addStock={this.addStock}
                addFlow={this.addFlow}
                addParameter={this.addParameter}
                updateStockValue={this.updateStockValue}
                stocks={this.state.stocks}
                flows={this.state.flows}
                parameters={this.state.parameters}
                arrows={this.state.arrows}
                highlightStock={this.highlightStock}
                addDependenciesToStockOrFlow={this.addDependenciesToStockOrFlow}
                addArrow={this.addArrow}
                addCloud={this.addCloud}
                addEquation={this.addEquation}
                addSimulationData={this.addSimulationData}
                XAxisDataKey={XAxisDataKey}
            ></Toolbar>
            </div>
        );
    }
}