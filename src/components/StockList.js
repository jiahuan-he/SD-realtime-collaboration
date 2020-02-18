import React from 'react';

const style = {
    // float: "left"
}
export default class StockList extends React.Component {
    render() {        
        const stocks = this.props.stocks.map( (stock) => {
        return <li key={stock.id}>
                stock id: {stock.id}, 
                equation:{" "+stock.equation}, 
                initValue: {" "+stock.initValue}, 
                currentValue: {" "+stock.value},
                dependencies: {stock.dependencies.join(", ")},                 
            </li>
        })
        return (
            <div style = {style}>
                <h3>Stocks</h3>
                <ul>{stocks}</ul>
            </div>
        )
    }
}