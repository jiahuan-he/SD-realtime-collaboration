import React from 'react';
import firebase from '../firebase'
import {Board} from './Board'
import Toolbar from './Toolbar'
import {FlowList} from './FlowList'
import {StockList} from './StockList'
import {Chart} from './Chart'
import { Redirect } from 'react-router-dom'
import { I_Flow, I_Stock, I_Arrow, SimulationData, I_Parameter, I_Cloud } from '../model';

const deleteSimulationFormStyle = {
    display:"inline-block",
    marginLeft:"10px",
}

const simulationIdStyle = {
    display:"inline-block",
}

const deleteButtonStyle = {
    color:"red",
    backgroundColor: "white",
    border: "1px solid",
    padding: "5px 12px",
}

type Stock = {}

type State = {
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    arrows: Array<I_Arrow>,
    simulationData: SimulationData,
    parameters: Array<I_Parameter>,
    clouds:Array<I_Cloud>,
    FB_PATH:string | undefined,
    stockBeingEdited: string | null,
}
export default class Background extends React.Component<any, State> {

    componentDidMount() {        
        firebase.database().ref(this.state.FB_PATH+'/state').on('value', (state) => {
            if(state.val()) {
                this.setState(state.val())
            }
        })
    }

    highlightStock = (stockID: string) =>{
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

    updateStockValue = (stockID: string, value: number) => {
        const stocks: Array<I_Stock> = Object.assign([], this.state.stocks)
        const targetStock = stocks.find( stock => stock.id === stockID)
        if(!targetStock) return
        targetStock.initValue = +value        
        firebase.database().ref(this.state.FB_PATH+'/state/stocks').set(stocks)
    }

    addStock= (stockName: string, value: number) => {
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
        firebase.database().ref(this.state.FB_PATH+'/state/stocks').set(stocks);
    }

    addParameter= (parameterName: string, value: number) => {
        const parameters = Object.assign([], this.state.parameters)
        const newParameter = {
            "id":parameterName,
            "name": parameterName,
            "value":+value,
            "posX": 0,
            "posY": 10, // offset the text a bit so the text doesn't come off the background
        }
        parameters.push(newParameter)
        firebase.database().ref(this.state.FB_PATH+'/state/parameters').set(parameters);
    }

    addCloud= (flowID: string, from: string, to: string) => {
        if(from && to && from.trim().length>0 && to.trim().length>0) return
        if(!from && !to) return        
        let clouds = this.state.clouds
        clouds = Object.assign([], clouds)
        const ref = this.state.FB_PATH+'/state/clouds'
        const newCloud = {
            "id": flowID,
            "flow":flowID,
            "flowFrom": from,
            "flowTo":to,
            "posX": 0,
            "posY": 0,
        }
        clouds.push(newCloud)
        firebase.database().ref(ref).set(clouds);
    }

    addDependenciesToStockOrFlow = (dependency: string, id: string) => {
        const stocks: Array<I_Stock> = Object.assign([], this.state.stocks)
        const flows: Array<I_Flow> = Object.assign([], this.state.flows)
        const targetStock = stocks.find( stock => stock.id === id)
        const targetFlow = flows.find( flow => flow.id === id)
        if(!targetStock || !targetFlow) return
        if(targetStock) {
            if(!targetStock.dependencies) targetStock.dependencies = []
            targetStock.dependencies.push(dependency)
            firebase.database().ref(this.state.FB_PATH+'/state/stocks').set(stocks);
        }
        else if(targetFlow) {
            if(!targetFlow.dependencies) targetFlow.dependencies = []
            targetFlow.dependencies.push(dependency)
            firebase.database().ref(this.state.FB_PATH+'/state/flows').set(flows);
        }        
    }

    addFlow = (flowID: string, from: string, to: string) => {
        const flows: Array<I_Flow> = Object.assign([], this.state.flows)
        const newFlow = {
            "id": flowID,
            "equation": "",
            "from":from?from: "",
            "to":to?to: "",
            "dependencies": [],
        }
        const stocks: Array<I_Stock> = Object.assign([], this.state.stocks)
        
        // add flow names to stocks' equation by default
        let fromStock = stocks.find( stock => stock.id === from)
        let toStock = stocks.find( stock => stock.id === to)
        if(from && fromStock) fromStock.equation += `-${flowID}`
        if(to && toStock) toStock.equation += `+${flowID}`

        flows.push(newFlow)
        firebase.database().ref(this.state.FB_PATH+'/state/flows').set(flows);
        firebase.database().ref(this.state.FB_PATH+'/state/stocks').set(stocks);
    }

    addArrow = (from: string, to: string) => {
        const arrows = Object.assign([], this.state.arrows)
        const newArrow = {
            "from":from,
            "to":to,
        }
        arrows.push(newArrow)
        firebase.database().ref(this.state.FB_PATH+'/state/arrows').set(arrows)
    }
    
    addEquation = (equation: string, id: string) => {
        const stocks: Array<I_Stock> = Object.assign([], this.state.stocks)
        const flows: Array<I_Flow> = Object.assign([], this.state.flows)
        const targetStock = stocks.find( stock => stock.id === id)
        const targetFlow = flows.find( flow => flow.id === id)
        if(targetStock) {
            targetStock.equation = equation
            firebase.database().ref(this.state.FB_PATH+'/state/stocks').set(stocks);
        }
        else if(targetFlow) {
            targetFlow.equation = equation
            firebase.database().ref(this.state.FB_PATH+'/state/flows').set(flows);
        } 
    }

    addSimulationData = (data: SimulationData) => {
        firebase.database().ref(this.state.FB_PATH+'/state/simulationData').set(data);
    }

    constructor(props: any) {
        super(props)
        const FB_PATH = this.props.location && this.props.location.state?`simulations/${this.props.location.state.simulationID}`:undefined
        this.state = {
            stocks: [],
            flows: [],
            arrows: [],
            simulationData: [], 
            parameters: [],
            clouds:[],
            FB_PATH:FB_PATH,
            stockBeingEdited: null,
        }
    }

    handleSubmitDeleteButton = () => {        
        firebase.database().ref(this.state.FB_PATH).set(null, ()=> this.setState({FB_PATH:undefined}))
    }

    render() {
        if(!this.state.FB_PATH){
            return <Redirect to={{pathname: '/'}}/>
        }
        const wrapperStyle = {display: "flex"}
        const XAxisDataKey = "__STEP__"
        return (
            <div>
                <div>
                    <b style={simulationIdStyle}>Simulation ID: {this.props.location.state.simulationID}</b>
                    <form style={deleteSimulationFormStyle} onSubmit={this.handleSubmitDeleteButton}>
                        <input type="button" value="Delete Simulation" style={deleteButtonStyle} onClick={this.handleSubmitDeleteButton} />
                    </form>
                </div>
                <div style = {wrapperStyle}> 
                    <Board 
                        FB_PATH = {this.state.FB_PATH}
                        stocks={this.state.stocks}
                        flows={this.state.flows}
                        arrows={this.state.arrows}
                        parameters={this.state.parameters}
                        clouds={this.state.clouds}
                        stockBeingEdited={this.state.stockBeingEdited}/>
                    <div>
                        <StockList stocks={this.state.stocks}/>
                        <FlowList flows={this.state.flows}/>
                        {this.state.simulationData.length>0
                        &&<Chart simulationData={this.state.simulationData} XAxisDataKey={XAxisDataKey}/>}
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
                />                
            </div>
        );
    }
}