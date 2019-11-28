import React from 'react';
import AddStockForm from './AddStockForm';
import EditStockForm from './EditStockForm';

export default class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <AddStockForm 
                    addStock={this.props.addStock}
                    stockIDs={this.props.stockIDs}
                    ></AddStockForm>
                <EditStockForm 
                    updateStockValue={this.props.updateStockValue}
                    stockIDs={this.props.stockIDs}
                ></EditStockForm>
            </div>
        )
    }
}