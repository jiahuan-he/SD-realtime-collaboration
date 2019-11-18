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
    height: 500,
    width: 500,
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

const button  = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "10px 24px",
    cursor: "pointer",
    float: "left",
}

class Element extends React.Component {
    componentDidMount() {
        this.makeDraggable()
    }

    makeDraggable = () => {
        const id = this.props.stockID
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
            draggable.setAttributeNS(null, "x", this.props.x);
            draggable.setAttributeNS(null, "y", this.props.y);
        }

        const mouseUpOrLeave = (e) => {
            console.log("mouse up")
            draggable = null
        }

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
        const x=this.props.x
        const y=this.props.y
        const id=this.props.stockID
        const stockValue=this.props.stockValue
        return (
            <g 
                x={x} 
                y={y} 
                id={id} 
                style={moveable}
            >
                <rect x={x} y={y} width={"5%"} height={"5%"} style={stock}/>
                <foreignObject x={x} y={y} width="50" height="50">
                    <div>{id+": "+stockValue}</div>                 
                </foreignObject>    
            </g>       
        );
    }
}

class Board extends React.Component {    
    
    render() {
        const stocks = this.props.stockIDs.map(id => {
            return <Element
                key={id}
                stockID={id}
                stockValue={this.props.stockValues[id]}
                x={this.props.stockPos[id].x}
                y={this.props.stockPos[id].y}
                updatePosition={this.props.updatePosition}
            />
        })

        return (
            <div style={svgWrapper}>
                <svg style={boardStyle}>
                    {stocks}
                </svg>
            </div>
        );
    }
}

class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <button style={button} onClick={this.props.addStock}>Stock</button>
            </div>
        )
    }
}

class Background extends React.Component {

    componentDidMount() {
        const stateRef = firebase.database().ref('state');

        stateRef.on('value', (state) => {
            this.setState(state.val())
        })
    }

    updatePosition = (stockID, x, y) => {
        const newPos = Object.assign({}, this.state.stockPos)
        newPos[stockID] = { x: x, y: y }
        firebase.database().ref('state/stockPos').set(newPos);
    }

    addStock = () => {
        const newPtr = this.state.stockPtr + 1
        const newStockID = `stock${newPtr}`
        const newStockPos = Object.assign({}, this.state.stockPos)
        const newStockValues = Object.assign({}, this.state.stockValues)
        newStockPos[newStockID] = {x:0, y:0}
        newStockValues[newStockID] = 0
        firebase.database().ref('state').set(
            {
                stockPtr: newPtr,
                stockIDs: this.state.stockIDs.concat([newStockID]),
                stockPos: newStockPos,
                stockValues: newStockValues,
            }
        );
    }

    constructor(props) {
        super(props)
        this.state = {
            stockPtr: 0,
            stockIDs: [],
            stockPos: {},
            stockValues:{},
        };
    }

    render() {

        return (
            <div>
            <Board 
                stockIDs={this.state.stockIDs}
                stockPos={this.state.stockPos}
                stockValues={this.state.stockValues}
                updatePosition={this.updatePosition}
                ></Board>
            <Toolbar addStock={this.addStock}></Toolbar>
            </div>
        );
    }
}

ReactDOM.render(
    <Background />,
    document.getElementById('root')
);
