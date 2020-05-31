import React from 'react'

const stock = {
    stroke: 'black',
    cursor: 'move',
    strokeWidth: "1px",
    fill: 'white'
}

const stockHighlight = {
    stroke: 'green',
    cursor: 'move',
    strokeWidth: "2px",
    fill: 'white'
}

const moveable = {
    cursor: 'move',
}

export default ({posX, posY, id, initValue, highlight}) => 
(
    <g x={posX} y={posY} id={id} style={moveable}>
        <rect x={posX} y={posY} width={"5%"} height={"5%"} style={highlight?stockHighlight:stock}/>
        <foreignObject x={posX} y={posY} width="50" height="50">
            <div>{id+": "+initValue}</div>                 
        </foreignObject>    
    </g>
);