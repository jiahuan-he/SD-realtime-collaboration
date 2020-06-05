import React from 'react'

const moveableText = {
    cursor: 'move',
    fontSize: "large"
}

export const Parameter: React.FC<{
    posX: number, 
    posY: number, 
    id: string, 
    value: number}> 
    = ({posX, posY, id, value}) => 
(<text x={posX} y={posY} id={id} style={moveableText}>
    {id}: {value}
    </text>
)