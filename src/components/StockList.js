import React from 'react';

const style = {
    // float: "left"
}
export default class StockList extends React.Component {
    render() {
        console.log(this.props.stockValues)
        
        const stocks = this.props.stockIDs.map( (id) => {
            let inFlow = ""
            if(this.props.inFlows && this.props.inFlows[id]){
                this.props.inFlows[id].forEach(flow => {
                    inFlow += flow+" , "
                })
            }
            let outFlow = ""
            if(this.props.outFlows && this.props.outFlows[id]) {
                
                this.props.outFlows[id].forEach(flow => {
                    outFlow += flow+" , "
                })
            }
            
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