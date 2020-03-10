import React from 'react'

const style ={
    stroke: "black",
    strokeWidth: 2,
    zIndex: -10,
    opacity: 0.4,

}
export default ({pos, markerId}) => {
    return <line 
        x1={pos.from.x} 
        y1={pos.from.y} 
        x2={pos.to.x} 
        y2={pos.to.y} 
        style={style}
        markerEnd={`url(#${markerId})`}
    />
}