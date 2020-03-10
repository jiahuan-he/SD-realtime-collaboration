import React from 'react'

const style ={
    fill: "black",
}
export default ({from, to, flowText}) => {
    const x = from.x+to.x
    const y = from.y+to.y
    return <text 
        x={x/2} 
        y={y/2}
        style={style}
    >{flowText}</text>
}