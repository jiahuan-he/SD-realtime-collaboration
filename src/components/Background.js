import React from 'react';
import firebase from '../firebase'
import Board from './Board'
import Toolbar from './Toolbar'
import FlowList from './FlowList'
import StockList from './StockList'
import Chart from './Chart'
import { Redirect } from 'react-router-dom'

export default class Background extends React.Component {

    componentDidMount() {        
        firebase.database().ref(this._FB_PATH+'state').on('value', (state) => {
            if(state.val()) {
                this.setState(state.val())
            }
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

    updateStockValue = (stockID, value) => {
        const stocks = Object.assign([], this.state.stocks)
        const targetStock = stocks.find( stock => stock.id === stockID)
        targetStock.initValue = +value
        firebase.database().ref(this._FB_PATH+'state/stocks').set(stocks)
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
        firebase.database().ref(this._FB_PATH+'state/stocks').set(stocks);
    }

    addParameter= (parameterName, value) => {
        const parameters = Object.assign([], this.state.parameters)
        const newParameter = {
            "id":parameterName,
            "name": parameterName,
            "value":+value,
            "posX": 0,
            "posY": 10, // offset the text a bit so the text doesn't come off the background
        }
        parameters.push(newParameter)
        firebase.database().ref(this._FB_PATH+'state/parameters').set(parameters);
    }

    addCloud= (flowID, from, to) => {
        if(from && to && from.trim().length>0 && to.trim().length>0) return
        if(!from && !to) return        
        let clouds = this.state.clouds
        clouds = Object.assign([], clouds)
        const ref = this._FB_PATH+'state/clouds'
        const newCloud = {
            "flow":flowID,
            "flowFrom": from,
            "flowTo":to,
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
            firebase.database().ref(this._FB_PATH+'state/stocks').set(stocks);
        }
        else if(targetFlow) {
            if(!targetFlow.dependencies) targetFlow.dependencies = []
            targetFlow.dependencies.push(dependency)
            firebase.database().ref(this._FB_PATH+'state/flows').set(flows);
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
        firebase.database().ref(this._FB_PATH+'state/flows').set(flows);
        firebase.database().ref(this._FB_PATH+'state/stocks').set(stocks);
    }

    addArrow = (from, to) => {
        const arrows = Object.assign([], this.state.arrows)
        const newArrow = {
            "from":from,
            "to":to,
        }
        arrows.push(newArrow)
        firebase.database().ref(this._FB_PATH+'state/arrows').set(arrows)
    }
    
    addEquation = (equation, id) => {
        const stocks = Object.assign([], this.state.stocks)
        const flows = Object.assign([], this.state.flows)
        const targetStock = stocks.find( stock => stock.id === id)
        const targetFlow = flows.find( flow => flow.id === id)
        if(targetStock) {
            targetStock.equation = equation
            firebase.database().ref(this._FB_PATH+'state/stocks').set(stocks);
        }
        else if(targetFlow) {
            targetFlow.equation = equation
            firebase.database().ref(this._FB_PATH+'state/flows').set(flows);
        } 
    }

    addSimulationData = (data) => {
        firebase.database().ref(this._FB_PATH+'state/simulationData').set(data);
    }

    constructor(props) {
        super(props)
        if(this.props.location.state){
            this._FB_PATH = `simulations/${this.props.location.state.simulationID}/`
        } 
        
        this.state = {
            stocks: [],
            flows: [],
            arrows: [],
            simulationData: [], 
            cloudsOrigin: [],
            cloudsDestination: [],
            parameters: [],
            clouds:[],
        }
    }

    render() {
        if(!this._FB_PATH){
            return <Redirect to={{pathname: '/'}}/>
        }
        const wrapperStyle = {display: "flex"}
        const XAxisDataKey = "__STEP__"
        return (
            <div>
                <b>Simulation ID: {this.props.location.state.simulationID}</b>
                <div style = {wrapperStyle}> 
                    <Board 
                        _FB_PATH = {this._FB_PATH}
                        stocks={this.state.stocks}
                        flows={this.state.flows}
                        arrows={this.state.arrows}
                        parameters={this.state.parameters}
                        clouds={this.state.clouds}
                        stockBeingEdited={this.state.stockBeingEdited}                                                  
                        ></Board>
                    <div>
                        <StockList stocks={this.state.stocks}></StockList>
                        <FlowList flows={this.state.flows}></FlowList>
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