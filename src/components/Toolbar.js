import React from 'react';
import AddStockForm from './AddStockForm';
import EditStockForm from './EditStockForm';
import AddFlowForm from './AddFlowForm'
import AddArrowForm from './AddArrowForm'
import AddEquationForm from './AddEquationForm'
import SimulateForm from './SimulateForm'
import AddParameterForm from './AddParameterForm'

const buttonStyle = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "5px 12px",
    cursor: "pointer",
}

const inputInvalidStyle = {
    border: "2px solid #ed6663"
}

export default class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <AddStockForm 
                    addStock={this.props.addStock}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}/>
                <AddParameterForm
                    addParameter={this.props.addParameter}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}/>
                <EditStockForm 
                    updateStockValue={this.props.updateStockValue}
                    stocks={this.props.stocks}                    
                    highlightStock={this.props.highlightStock}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}/>
                <AddFlowForm
                    addFlow={this.props.addFlow}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    highlightStock={this.props.highlightStock}
                    addDependenciesToStockOrFlow={this.props.addDependenciesToStockOrFlow}
                    addCloud={this.props.addCloud}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}/>
                <AddArrowForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    arrows={this.props.arrows}
                    addDependenciesToStockOrFlow={this.props.addDependenciesToStockOrFlow}
                    addArrow={this.props.addArrow}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}/>
                <AddEquationForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    addEquation={this.props.addEquation}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}/>
                <SimulateForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    parameters={this.props.parameters}
                    addSimulationData={this.props.addSimulationData}
                    XAxisDataKey={this.props.XAxisDataKey}
                    button={buttonStyle}
                    inputInvalidStyle={inputInvalidStyle}
                    />                
            </div>
        )
    }
}