import React from 'react'

const style ={
    stroke: "#f8615a",
    strokeWidth: 1.5,
    zIndex: -10,
    opacity: 1,

}
export default ({from, to, markerId}) => {
    return <line 
    x1={from.x} 
    y1={from.y} 
    x2={to.x} 
    y2={to.y} 
    style={style}
    markerEnd={`url(#${markerId})`}
/>
}