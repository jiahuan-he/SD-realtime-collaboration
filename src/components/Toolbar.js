import React from 'react';
import AddStockForm from './AddStockForm';
import EditStockForm from './EditStockForm';
import AddFlowForm from './AddFlowForm'
import AddArrowForm from './AddArrowForm'
import AddEquationForm from './AddEquationForm'
import SimulateForm from './SimulateForm'

export default class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <AddStockForm 
                    addStock={this.props.addStock}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    ></AddStockForm>
                <EditStockForm 
                    updateStockValue={this.props.updateStockValue}
                    stocks={this.props.stocks}                    
                    highlightStock={this.props.highlightStock}
                ></EditStockForm>
                <AddFlowForm
                    addFlow={this.props.addFlow}
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    highlightStock={this.props.highlightStock}
                    addDependenciesToStockOrFlow={this.props.addDependenciesToStockOrFlow}
                    addCloud={this.props.addCloud}
                ></AddFlowForm>                
                <AddArrowForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    addDependenciesToStockOrFlow={this.props.addDependenciesToStockOrFlow}
                    addArrow={this.props.addArrow}
                ></AddArrowForm>
                <AddEquationForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    addEquation={this.props.addEquation}
                ></AddEquationForm>
                <SimulateForm
                    stocks={this.props.stocks}
                    flows={this.props.flows}
                    addSimulationData={this.props.addSimulationData}
                    XAxisDataKey={this.props.XAxisDataKey}
                >
                </SimulateForm>
            </div>
        )
    }
}