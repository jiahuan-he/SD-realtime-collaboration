import React from 'react'
import { I_Pos } from '../model'

const style ={
    stroke: "#2b580c",
    strokeWidth: 4,
    zIndex: -10,
    opacity: 0.4,

}
export const Flow: React.FC<{from: I_Pos, to: I_Pos, markerId: string}> = ({from, to, markerId}) => {
    return <line 
        x1={from.x} 
        y1={from.y} 
        x2={to.x} 
        y2={to.y} 
        style={style}
        markerEnd={`url(#${markerId})`}
    />
}