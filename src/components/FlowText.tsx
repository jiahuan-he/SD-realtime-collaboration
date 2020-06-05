import React from 'react'
import { I_Pos } from '../model'


const style ={
    fill: "black",
}

export const FlowText: React.FC<{from: I_Pos, to: I_Pos, flowText: string}> = ({from, to, flowText}) => {
    const x = from.x+to.x
    const y = from.y+to.y
    return <text 
        x={x/2} 
        y={y/2}
        style={style}
    >{flowText}</text>
}