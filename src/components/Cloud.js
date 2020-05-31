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

export default class Cloud extends React.Component {                
    
    render() {
        const x=this.props.posX
        const y=this.props.posY
        const id=this.props.flow
        const rx = 40
        const ry = 20
        return (
            <g 
                x={x} 
                y={y} 
                id={id} 
                style={moveable}
            >
                <ellipse cx={x} cy={y} rx={rx} ry={ry} style={stock}/>
                <foreignObject x={x-rx/1.5} y={y-ry/2} width={80} height={50}>
                    <div>{"CLOUD"}</div>
                </foreignObject>    
            </g>       
        );
    }
}