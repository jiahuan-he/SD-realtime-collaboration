import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import firebase from './firebase.js'

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
        this.makeDraggable()
    }

    makeDraggable = () => {
        const id = this.props.stockID
        const updatePosition = this.props.updatePosition
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
                <svg style={svgStyle} >
                    <rect x={this.props.x} y={this.props.y} width={"5%"} height={"5%"} id={this.props.stockID} style={rectMoveable} />
                </svg>
            </div>
        );
    }
}

// function SVGWrapper(props) {
//     return (<div style={svgWrapper}></div>)
// }

class Game extends React.Component {

    writeUserData(name) {
        firebase.database().ref('test/id1').set({
            username: name,
            email: "email",
        });
    }

    constructor(props) {
        super(props)
        this.state = {
            stockIDs: ["stock0"],
            stockPos: 
                {
                    "stock0":{x: "0", y: "0",},
                },
            test: 0
            
        };
    }

    testFunc = ()=> {
        this.setState({test: 1})
    }

    updatePosition = (stockID, x, y) => {
        let newPos = Object.assign({}, this.state.stockPos)
        newPos[stockID] = {x:x, y:y}
        this.setState({
            stockPos: newPos
        })
    }

    render() {
        // this.writeUserData("name1")

        // var starCountRef = firebase.database().ref('test/');
        // starCountRef.on('value', function (el) {
        //     console.log(el.val())
        // });
        
        console.log(this.updatePosition)
        const stocks = this.state.stockIDs.map( id => {
            return <Rect 
                key={id}
                stockID={id} 
                x={this.state.stockPos[id].x} 
                y={this.state.stockPos[id].y}
                updatePosition = {this.updatePosition}
                testFunc = {this.testFunc}
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
    <Game />,
    document.getElementById('root')
);
