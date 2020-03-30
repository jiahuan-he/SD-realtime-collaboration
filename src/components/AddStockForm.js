import React from 'react';

const button = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "5px 12px",
    cursor: "pointer",
}

const inputInvalid = {
    border: "2px solid #ed6663"
}

export default class AddStockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockName:"",
            stockValue: 0,
        };
    }

    handleChangeName = (event) => {
        this.setState({ stockName: event.target.value.trim()});
    }

    handleChangeValue = (event) => {
        this.setState({ stockValue: event.target.value});
    }

    isValidStockID = () => {    
        if(!this.state.stockName) return false
        return this.props.stocks.filter((stock => stock.id === this.state.stockName)).length === 0 
        && this.props.flows.filter((flow => flow.id === this.state.stockName)).length === 0
    }

    isValidStockValue =() => {
        return !isNaN(this.state.stockValue)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Stock Name
                <input 
                    style={this.isValidStockID()?null:inputInvalid} 
                    type="text" 
                    value={this.state.stockName} 
                    onChange={this.handleChangeName} 
                />
                </label>
                <label>
                    Init Value
                <input 
                    style={this.isValidStockValue()?null:inputInvalid} 
                    type="text" 
                    value={this.state.stockValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Add Stock" style={button}
                        onClick={() => {
                            if(this.state.stockName === "" || !this.isValidStockID() || !this.isValidStockValue()) return
                            this.props.addStock(this.state.stockName, this.state.stockValue)
                            this.setState({
                                stockName:"",
                                stockValue: 0
                            })
                        }}
                    />
            </form>
        )
    }
}