import React from 'react';
import AddStockForm from './AddStockForm';

export default class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <AddStockForm 
                    addStock={this.props.addStock}
                    stockIDs={this.props.stockIDs}
                    ></AddStockForm>
            </div>
        )
    }
}