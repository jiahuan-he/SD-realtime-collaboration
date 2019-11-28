import React from 'react';

const button = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "5px 12px",
    cursor: "pointer",
    // float: "right",
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
        this.setState({ stockName: event.target.value });
    }

    handleChangeValue = (event) => {
        this.setState({ stockValue: event.target.value });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Stock Name
                <input type="text" value={this.state.stockName} onChange={this.handleChangeName} />                
                </label>
                <label>
                    Value
                <input type="text" value={this.state.stockValue} onChange={this.handleChangeValue} />
                </label>
                {/* <input type="button" value="submit" style={button} onClick={() => {
                    this.props.addStock(this.state.stockName, this.state.stockValue)
                }}> */}
                    <input type="button" value="Add Stock" style={button}
                        onClick={() => {
                            this.props.addStock(this.state.stockName, this.state.stockValue)
                        }}
                    />
            </form>
        )
    }
}