import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const svgStyle = {
    height: 3000,
    viewBox: "0 0 3000 2000",
    fill: 'blue',
};

const rectBackground = {
    x: "0",
    y: "0",
    width: "3000",
    height: "2000",
    fill: '#fafafa',
}

const rectMoveable = {
    width: "80",
    height: "100",
    fill: 'blue',
    cursor: 'move',
}

const rectStatic = {
    x: 180,
    y: 50,
    width: 80,
    height: 100,
    fill: '#888',
    cursor: 'not-allowed',
}

class Rect extends React.Component {
    componentDidMount() {
        this.makeDraggable("draggable")
    }

    makeDraggable =(id) => {        
        let draggable = document.getElementById(id);
        let offset
        draggable.addEventListener('mousedown', mouseDown)
        draggable.addEventListener('mouseup', mouseUp)

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
            draggable.setAttributeNS(null, "x", coord.x-offset.x);
            draggable.setAttributeNS(null, "y", coord.y-offset.y);
        }

        function mouseUp(e){
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
            <svg style={svgStyle}>
                <rect style={rectBackground}/>
                <rect x="0" y="0" id='draggable' style={rectMoveable}/>
                <rect id='static' style={rectStatic}/>
            </svg>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Rect />
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
