import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const svgStyle = {
    height: 1000,
    width: 1000,    
    backgroundColor: '#eeeeee',
};

const svgWrapper = {
    overflow: "scroll",
    height: 600,
    width: 600,
}

const rectMoveable = {
    fill: 'blue',
    cursor: 'move',
}

class Rect extends React.Component {
    componentDidMount() {
        this.makeDraggable("draggable")
    }

    makeDraggable =(id) => {        
        let draggable = document.getElementById(id);
        let offset
        draggable.addEventListener('mousedown', mouseDown)
        draggable.addEventListener('mouseup', mouseUpOrLeave)
        draggable.addEventListener('mouseleave', mouseUpOrLeave)

        function mouseDown(e){
            console.log("mouse down")
            draggable = document.getElementById(id);
            offset = getMousePosition(e);
            offset.x -= parseFloat(draggable.getAttributeNS(null, "x"));
            offset.y -= parseFloat(draggable.getAttributeNS(null, "y"));
            draggable.addEventListener('mousemove', mouseMove)
        }
       
        function mouseMove(e){
            console.log("mouse move")
            if(!draggable) return
            e.preventDefault();
            const coord = getMousePosition(e);
            console.log(coord.x-offset.x)
            console.log(coord.y-offset.y)
            draggable.setAttributeNS(null, "x", coord.x-offset.x);
            draggable.setAttributeNS(null, "y", coord.y-offset.y);
        }

        function mouseUpOrLeave(e){
            console.log("mouse up")
            draggable = null
        }

        function getMousePosition(e) {
            const CTM = draggable.getScreenCTM();
            return {
              x: (e.clientX - CTM.e) / CTM.a,
              y: (e.clientY - CTM.f) / CTM.d
            };
        }

    }

    render() {
        return (
            <div style={svgWrapper}>
                <svg style={svgStyle} >
                    <rect x="0" y="0" width={"5%"} height={"5%"} id='draggable' style={rectMoveable}/>
                </svg>
            </div>            
        );
    }
}

function SVGWrapper(props){    
    return (<div style={svgWrapper}></div>)
}

class Game extends React.Component {
    render() {
        return (
            <div>
                <Rect />
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
