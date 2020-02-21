import React from 'react'

const style ={
    stroke: "black",
    strokeWidth: 2,
    zIndex: -10,
    opacity: 0.4,

}
export default ({pos, markerId}) => {
    return <line 
        x1={pos.from.x+25} 
        y1={pos.from.y+25} 
        x2={pos.to.x+25} 
        y2={pos.to.y+25} 
        style={style}
        markerEnd={`url(#${markerId})`}
    />
}