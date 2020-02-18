import React from 'react';
import AddStockForm from './AddStockForm';
import EditStockForm from './EditStockForm';
import AddFlowForm from './AddFlowForm'

export default class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <AddStockForm 
                    addStock={this.props.addStock}
                    stocks={this.props.stocks}
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
                ></AddFlowForm>                
            </div>
        )
    }
}