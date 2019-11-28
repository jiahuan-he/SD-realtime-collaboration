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
        return !this.props.stockIDs.includes(this.state.stockName)
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
                    Value
                <input 
                    style={this.isValidStockValue()?null:inputInvalid} 
                    type="text" 
                    value={this.state.stockValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Add Stock" style={button}
                        onClick={() => {
                            if(this.state.stockName === "") return
                            this.props.addStock(this.state.stockName, this.state.stockValue)
                        }}
                    />
            </form>
        )
    }
}