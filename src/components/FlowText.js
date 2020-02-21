import React from 'react'

const style ={
    fill: "black",
}
export default ({pos, flowText}) => {
    const x = pos.from.x+pos.to.x+50
    const y = pos.from.y+pos.to.y+50
    return <text 
        x={x/2} 
        y={y/2}
        style={style}
    >{flowText}</text>
}