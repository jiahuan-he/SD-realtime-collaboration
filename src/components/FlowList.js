import React from 'react';

const style = {
    // float: "left"
}
export default class FlowList extends React.Component {
    render() {        
        const flows = this.props.flows.map( (flow) => {                        
        return <li key={flow.id}>
                flow id: {flow.id}, 
                equation:{flow.equation}, 
                from: {flow.from}, 
                to: {flow.to}, 
                dependencies: {flow.dependencies.join(", ")}, 
            </li>
        })
        return (
            <div style = {style}>
                <h3>Flows</h3>
                <ul>{flows}</ul>
            </div>
        )
    }
}