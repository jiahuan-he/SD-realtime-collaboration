import React from 'react'

const moveableText = {
    cursor: 'move',
    fontSize: "large"
}

export default ({posX, posY, id, value}) => 
(<text x={posX} y={posY} id={id} style={moveableText}>
    {id}: {value}
    </text>
)