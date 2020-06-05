import React, { FC } from 'react'
import { I_Pos } from '../model'

const style ={
    stroke: "#f8615a",
    strokeWidth: 1.5,
    zIndex: -10,
    opacity: 1,

}
export const Arrow: FC<{from: I_Pos, to: I_Pos, markerId: string}> = ({from, to, markerId}) => {
    return <line 
    x1={from.x} 
    y1={from.y} 
    x2={to.x} 
    y2={to.y} 
    style={style}
    markerEnd={`url(#${markerId})`}
/>
}