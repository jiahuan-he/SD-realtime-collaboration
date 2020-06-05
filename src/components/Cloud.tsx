import React from 'react'

const stock = {
    stroke: 'black',
    cursor: 'move',
    strokeWidth: "1px",
    fill: 'white'
}

const moveable = {
    cursor: 'move',
}

const rx = 40
const ry = 20

export const Cloud: React.FC<{posX: number, posY:number, id:string}> = ({posX, posY, id}) =>  
    <g x={posX} y={posY} id={id} style={moveable}>
        <ellipse cx={posX} cy={posY} rx={rx} ry={ry} style={stock}/>
        <foreignObject x={posX-rx/1.5} y={posY-ry/2} width={80} height={50}>
            <div>{"CLOUD"}</div>
        </foreignObject>    
    </g>