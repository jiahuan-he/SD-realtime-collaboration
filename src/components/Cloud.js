import React from 'react'

const stock = {
    stroke: 'black',
    cursor: 'move',
    strokeWidth: "1px",
    fill: 'white'
}

const moveable = {
    cursor: 'move',
}

export default class Cloud extends React.Component {
    componentDidMount() {
        this.makeDraggable()
    }

    makeDraggable = () => {
        const id = this.props.flow
        let draggable = document.getElementById(id);
        let offset

        const mouseDown = (e) => {
            draggable = document.getElementById(id);
            offset = getMousePosition(e);
            offset.x -= parseFloat(draggable.getAttributeNS(null, "x"));
            offset.y -= parseFloat(draggable.getAttributeNS(null, "y"));
            draggable.addEventListener('mousemove', mouseMove)
        }

        const mouseMove = (e) => {
            if (!draggable) return
            e.preventDefault();
            const coord = getMousePosition(e);
            this.props.updateCloudPosition(id, coord.x - offset.x, coord.y - offset.y)
        }

        const mouseUpOrLeave = (e) => {
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
        const x=this.props.posX
        const y=this.props.posY
        const id=this.props.flow
        const rx = 40
        const ry = 20
        return (
            <g 
                x={x} 
                y={y} 
                id={id} 
                style={moveable}
            >
                <ellipse cx={x} cy={y} rx={rx} ry={ry} style={stock}/>
                <foreignObject x={x-rx/1.5} y={y-ry/2} width={70} height={50}>
                    <div>{"CLOUD"}</div>
                </foreignObject>    
            </g>       
        );
    }
}