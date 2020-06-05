import React from 'react';
import { I_Flow } from '../model';

const listStyleNeedsEquation = {
    color: "red",
}

export const FlowList: React.FC<{flows: Array<I_Flow>}> = ({flows}) => {    
    const flowList = flows.map( (flow) => {
    return <li key={flow.id} style={flow.equation?undefined:listStyleNeedsEquation} >
            flow id: {flow.id}, 
            equation:{flow.equation?" "+flow.equation:" NEEDS EQUATION"}, 
            from: {flow.from}, 
            to: {flow.to},
        </li>
    })
    return (
        <div>
            <h3>Flows</h3>
            <ul>{flowList}</ul>
        </div>
    )
}
