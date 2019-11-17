import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from './firebase.js'

const boardStyle = {
    height: 1000,
    width: 1000,
    backgroundColor: '#eeeeee',
};

const svgWrapper = {
    overflow: "scroll",
    height: 600,
    width: 600,
}

const moveable = {
    cursor: 'move',
}

const stock = {
    stroke: 'black',
    cursor: 'move',
    strokeWidth: "1px",
    fill: 'white'
}

class Rect extends React.Component {
    componentDidMount() {
        this.makeDraggable()
    }

    makeDraggable = () => {
        const id = this.props.stockID
        let draggable = document.getElementById(id);
        let offset
        draggable.addEventListener('mousedown', mouseDown)
        draggable.addEventListener('mouseup', mouseUpOrLeave)
        draggable.addEventListener('mouseleave', mouseUpOrLeave)

        function mouseDown(e) {
            console.log("mouse down")
            draggable = document.getElementById(id);
            offset = getMousePosition(e);
            offset.x -= parseFloat(draggable.getAttributeNS(null, "x"));
            offset.y -= parseFloat(draggable.getAttributeNS(null, "y"));
            draggable.addEventListener('mousemove', mouseMove)
        }


        console.log(this.props)

        const mouseMove = (e) => {
            console.log("mouse move")
            if (!draggable) return
            e.preventDefault();
            const coord = getMousePosition(e);
            console.log(coord.x - offset.x)
            console.log(coord.y - offset.y)
            // updatePosition(id, coord.x - offset.x, coord.y - offset.y)
            this.props.updatePosition(id, coord.x - offset.x, coord.y - offset.y)
            draggable.setAttributeNS(null, "x", this.props.x);
            draggable.setAttributeNS(null, "y", this.props.y);
        }

        function mouseUpOrLeave(e) {
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
                <svg style={boardStyle}>
                    <g 
                        x={this.props.x} 
                        y={this.props.y} 
                        id={this.props.stockID} 
                        style={moveable}
                    >                        
                        <rect x={this.props.x} y={this.props.y} width={"5%"} height={"5%"} style={stock}/>
                        <foreignObject x={this.props.x} y={this.props.y} width="50" height="50">
                            <div>test</div>
                        </foreignObject>    
                    </g>       
                </svg>                         
            </div>
        );
    }
}

class Background extends React.Component {

    initPosition() {
        firebase.database().ref('stockIDs').set(["stock0"]);
        firebase.database().ref('stockPos').set({
            "stock0": { x: 0, y: 0, },
        });
    }

    componentDidMount() {
        this.initPosition()

        const IDRef = firebase.database().ref('stockIDs');
        const posRef = firebase.database().ref('stockPos');

        IDRef.on('value', (stockIDs) => {
            // console.log(stockIDs.val())
            this.setState({
                stockIDs: stockIDs.val(),
            })
        });

        posRef.on('value', (stockPos) => {
            this.setState({
                stockPos: stockPos.val(),
            })
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            stockIDs: ["stock0"],
            stockPos:
            {
                "stock0": { x: 0, y: 0, },
            },
            stockValues:{
                "stock0": 1,
            },
            test: 0
        };
    }

    updatePosition = (stockID, x, y) => {
        let newPos = Object.assign({}, this.state.stockPos)
        newPos[stockID] = { x: x, y: y }
        firebase.database().ref('stockPos').set({
            [stockID]: { x: x, y: y, },
        });
    }

    render() {
        const stocks = this.state.stockIDs.map(id => {
            return <Rect
                key={id}
                stockID={id}
                x={this.state.stockPos[id].x}
                y={this.state.stockPos[id].y}
                updatePosition={this.updatePosition}
                testFunc={this.testFunc}
            />
        })

        return (
            <div>
                {stocks}
            </div>
        );
    }
}

ReactDOM.render(
    <Background />,
    document.getElementById('root')
);
