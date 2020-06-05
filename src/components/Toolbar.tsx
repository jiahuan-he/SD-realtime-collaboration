import React, { CSSProperties } from 'react';
import AddStockForm from './AddStockForm';
import EditStockForm from './EditStockForm';
import AddFlowForm from './AddFlowForm'
import AddArrowForm from './AddArrowForm'
import AddEquationForm from './AddEquationForm'
import SimulateForm from './SimulateForm'
import AddParameterForm from './AddParameterForm'
import { I_Stock, I_Flow, I_Parameter, I_Arrow, SimulationData } from '../model';

const buttonStyle: CSSProperties = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "5px 12px",
    cursor: "pointer",
}

const inputInvalidStyle: CSSProperties = {
    border: "2px solid #ed6663"
}

interface Props{
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    parameters: Array<I_Parameter>,
    arrows: Array<I_Arrow>,
    XAxisDataKey: string,
    addEquation: (equation:string, id:string)=>void,
    addDependenciesToStockOrFlow: (from:string, to:string)=>void,
    addArrow: (from:string, to:string)=>void,
    addFlow: (id:string, from:string, to:string)=>void,
    addCloud: (id:string, from:string, to:string)=>void,
    addStock: (id:string, value:number)=>void,
    addParameter: (parameterName:string, parameterValue:number)=>void,
    highlightStock: (id:string) => void,
    updateStockValue: (id:string, value:number) => void,
    addSimulationData: (data: SimulationData) => void,
}


interface State{

}

export default class Toolbar extends React.Component<Props, State>{
    render() {
        return (
            <div>
                <AddStockForm 
                    addStock={this.props.addStock}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}/>
                <AddParameterForm
                    addParameter={this.props.addParameter}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}/>
                <EditStockForm 
                    updateStockValue={this.props.updateStockValue}
                    stocks={this.props.stocks}                    
                    highlightStock={this.props.highlightStock}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}/>
                <AddFlowForm
                    addFlow={this.props.addFlow}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    highlightStock={this.props.highlightStock}
                    addDependenciesToStockOrFlow={this.props.addDependenciesToStockOrFlow}
                    addCloud={this.props.addCloud}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}/>
                <AddArrowForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    arrows={this.props.arrows}
                    addDependenciesToStockOrFlow={this.props.addDependenciesToStockOrFlow}
                    addArrow={this.props.addArrow}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}/>
                <AddEquationForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    addEquation={this.props.addEquation}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}/>
                <SimulateForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    addSimulationData={this.props.addSimulationData}
                    XAxisDataKey={this.props.XAxisDataKey}
                    button={buttonStyle}
                    inputInvalid={inputInvalidStyle}
                    />                
            </div>
        )
    }
}