import React from 'react';

const style = {
    // float: "left"
}
export default class StockList extends React.Component {
    render() {        
        const flows = this.props.flows.map( (flow) => {                        
        return   <li key={flow.id}>
            flow id: {flow.id}, 
            from: {flow.from}, 
            to: {flow.to}, 
            equation:{flow.equation}</li>
        })
        return (
            <div style = {style}>
                <h3>Flows</h3>
                <ul>{flows}</ul>
            </div>
        )
    }
}