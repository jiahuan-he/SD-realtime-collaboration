import React from 'react'

const moveableText = {
    cursor: 'move',
    fontSize: "large"
}

export default class Parameter extends React.Component {
    componentDidMount() {
        this.makeDraggable()
    }

    makeDraggable = () => {
        const id = this.props.parameter.name
        let draggable = document.getElementById(id);
        let offset

        const mouseDown = (e) => {
            console.log("mouse down")
            draggable = document.getElementById(id);
            offset = getMousePosition(e);
            offset.x -= parseFloat(draggable.getAttributeNS(null, "x"));
            offset.y -= parseFloat(draggable.getAttributeNS(null, "y"));
            draggable.addEventListener('mousemove', mouseMove)
        }

        const mouseMove = (e) => {
            console.log("mouse move")
            if (!draggable) return
            e.preventDefault();
            const coord = getMousePosition(e);
            console.log(coord.x - offset.x)
            console.log(coord.y - offset.y)
            this.props.updateParameterPosition(id, coord.x - offset.x, coord.y - offset.y)
        }

        const mouseUpOrLeave = (e) => {
            console.log("mouse up")
            draggable = null
        }

        // mouse position to svg position
        const getMousePosition = (e) => {
            const CTM = draggable.getScreenCTM();
            return {
                x: (e.clientX - CTM.e) / CTM.a,
                y: (e.clientY - CTM.f) / CTM.d
            };
        }
        draggable.addEventListener('mousedown', mouseDown)
        draggable.addEventListener('mouseup', mouseUpOrLeave)
        draggable.addEventListener('mouseleave', mouseUpOrLeave)
    }

    render() {
        const x=this.props.parameter.posX
        const y=this.props.parameter.posY
        const id=this.props.parameter.name
        return (<text 
            x={x} 
            y={y} 
            id={id} 
            style={moveableText}
            >{id}</text>)
    }
}