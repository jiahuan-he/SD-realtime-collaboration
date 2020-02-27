import React from 'react'

const stock = {
    stroke: 'black',
    cursor: 'move',
    strokeWidth: "1px",
    fill: 'white'
}

const stockHighlight = {
    stroke: 'green',
    cursor: 'move',
    strokeWidth: "2px",
    fill: 'white'
}

const moveable = {
    cursor: 'move',
}

export default class Element extends React.Component {
    componentDidMount() {
        this.makeDraggable()
    }

    makeDraggable = () => {
        const id = this.props.stock.id
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
            this.props.updatePosition(id, coord.x - offset.x, coord.y - offset.y)
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
        const x=this.props.stock.posX
        const y=this.props.stock.posY
        const id=this.props.stock.id
        const stockValue=this.props.stock.value
        return (
            <g 
                x={x} 
                y={y} 
                id={id} 
                style={moveable}
            >
                <rect x={x} y={y} width={"5%"} height={"5%"} style={this.props.highlight?stockHighlight:stock}/>
                <foreignObject x={x} y={y} width="50" height="50">
                    <div>{id+": "+stockValue}</div>                 
                </foreignObject>    
            </g>       
        );
    }
}