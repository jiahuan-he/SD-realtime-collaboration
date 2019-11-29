import React from 'react';
import firebase from '../firebase'
import Board from './Board'
import Toolbar from './Toolbar'
import StockList from './StockList'

export default class Background extends React.Component {

    componentDidMount() {
        const stateRef = firebase.database().ref('state');

        stateRef.on('value', (state) => {
            this.setState(state.val())
        })
    }

    highlightStock = (stockID) =>{
        if(this.state.stockIDs.includes(stockID)){
            this.setState({
                stockBeingEdited:stockID
            })
        } else {
            this.setState({
                stockBeingEdited: null
            })
        }
    }

    updatePosition = (stockID, x, y) => {
        const newPos = Object.assign({}, this.state.stockPos)
        newPos[stockID] = { x: x, y: y }
        firebase.database().ref('state/stockPos').set(newPos);
    }

    updateStockValue = (stockID, value) => {
        const newValue = Object.assign({}, this.state.stockValues)
        newValue[stockID] = value
        firebase.database().ref('state/stockValues').set(newValue)
    }

    addStock_ = (stockName, value) => {
        const newPtr = this.state.stockPtr + 1
        const newStockID = `stock${newPtr}`
        const newStockPos = Object.assign({}, this.state.stockPos)
        const newStockValues = Object.assign({}, this.state.stockValues)
        newStockPos[newStockID] = {x:0, y:0}
        newStockValues[newStockID] = 0
        const newState = {
            stockPtr: newPtr,
            stockIDs: this.state.stockIDs.concat([newStockID]),
            stockPos: newStockPos,
            stockValues: newStockValues,
        }

        console.log(newState)

        firebase.database().ref('state').set(newState);
    }

    addStock= (stockName, value) => {
        const newPtr = this.state.stockPtr + 1
        const newStockID = stockName
        const newStockPos = Object.assign({}, this.state.stockPos)
        const newStockValues = Object.assign({}, this.state.stockValues)
        newStockPos[newStockID] = {x:0, y:0}
        console.log(value)
        newStockValues[newStockID] = +value
        console.log("newStockID ", newStockID)
        
        const newState = {
            stockPtr: newPtr,
            stockIDs: this.state.stockIDs.concat([newStockID]),
            stockPos: newStockPos,
            stockValues: newStockValues,
        }

        console.log(newState)

        firebase.database().ref('state').set(newState);
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
        const wrapperStyle = {display: "flex"}
        return (
            <div>
                <div style = {wrapperStyle}> 
                    <Board 
                        stockIDs={this.state.stockIDs}
                        stockPos={this.state.stockPos}
                        stockValues={this.state.stockValues}
                        stockBeingEdited={this.state.stockBeingEdited}
                        updatePosition={this.updatePosition}                
                        ></Board>
                    <StockList 
                        stockIDs={this.state.stockIDs}
                        stockValues={this.state.stockValues}
                    ></StockList>
            </div>
            <Toolbar 
                addStock={this.addStock}
                updateStockValue={this.updateStockValue}
                stockIDs={this.state.stockIDs}
                highlightStock={this.highlightStock}
            ></Toolbar>
            </div>
        );
    }
}