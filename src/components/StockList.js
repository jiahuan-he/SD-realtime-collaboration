import React from 'react';

const style = {
    // float: "left"
}
export default class StockList extends React.Component {
    render() {
        console.log(this.props.stockValues)
        const stocks = this.props.stockIDs.map( (id) => {
            return   <li key={id}>id: {id}, value: {this.props.stockValues[id]}</li>
        })
        return (
            <div style = {style}>
                <h3>Stocks</h3>
                <ul>{stocks}</ul>
            </div>
        )
    }
}