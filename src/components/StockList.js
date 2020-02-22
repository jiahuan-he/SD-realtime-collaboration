import React from 'react';

const style = {
    // float: "left"
}

const listStyleNeedsEquation = {
    color: "red",
}

export default class StockList extends React.Component {
    render() {        
        const stocks = this.props.stocks.map( (stock) => {
        return <li key={stock.id} style={stock.equation?null:listStyleNeedsEquation} >
                stock id: {stock.id}, 
                equation:{stock.equation?" "+stock.equation:" NEEDS EQUATION"}, 
                initValue: {" "+stock.initValue}, 
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