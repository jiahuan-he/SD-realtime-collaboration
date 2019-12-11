import React from 'react';

const style = {
    // float: "left"
}
export default class StockList extends React.Component {
    render() {
        console.log(this.props.stockValues)
        
        const stocks = this.props.stockIDs.map( (id) => {
            let inFlow = ""
            this.props.inFlows[id].forEach(flow => {
                inFlow += flow+" , "
            })
            let outFlow = ""
            this.props.outFlows[id].forEach(flow => {
                outFlow += flow+" , "
            })
            return   <li key={id}>id: {id}, value: {this.props.stockValues[id]}, 
            inflows: {inFlow}
            outflows: {outFlow}
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