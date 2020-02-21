import React from 'react';

const style = {
    // float: "left"
}

const listStyleNeedsEquation = {
    color: "red",
}
export default class FlowList extends React.Component {
    render() {        
        const flows = this.props.flows.map( (flow) => {                        
        return <li key={flow.id} style={flow.equation?null:listStyleNeedsEquation} >
                flow id: {flow.id}, 
                equation:{flow.equation?" "+flow.equation:" NEEDS EQUATION"}, 
                from: {flow.from}, 
                to: {flow.to}, 
                dependencies: {flow.dependencies?flow.dependencies.join(", "):null}, 
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