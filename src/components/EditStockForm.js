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

export default class EditStockForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockID:"",
            stockValue: 0,
        };
    }

    handleChangeName = (event) => {
        const id = event.target.value.trim()
        this.setState({ stockID: id});
        this.props.highlightStock(id)
    }

    handleChangeValue = (event) => {
        this.setState({ stockValue: event.target.value});
    }

    isValidStockID = () => {
        return this.props.stocks.filter((stock) => stock.id === this.state.stockID).length === 1
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
                    value={this.state.stockID} 
                    onChange={
                        (event) => {
                            this.handleChangeName(event)
                        }
                    } 
                />
                </label>
                <label>
                    Init Value
                <input 
                    style={this.isValidStockValue()?null:inputInvalid} 
                    type="text" 
                    value={this.state.stockValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Edit Stock InitValue" style={button}
                        onClick={() => {
                            if(!this.state.stockID === "" || !this.state.stockValue) return
                            this.props.updateStockValue(this.state.stockID, this.state.stockValue)
                            this.setState({
                                stockID:"",
                                stockValue: 0,
                            })
                            this.props.highlightStock("")
                        }}
                    />
            </form>
        )
    }
}