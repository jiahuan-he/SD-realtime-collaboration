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

export default class AddFlowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stockID:"",
            formula: "",
        };
    }

    handleChangeName = (event) => {
        const id = event.target.value.trim()
        this.setState({ stockID: id});
        this.props.highlightStock(id)
    }

    handleChangeFormula = (event) => {
        this.setState({ formula: event.target.value});
    }

    isValidStockID = () => {
        return this.props.stockIDs.includes(this.state.stockID)
    }

    isValidformula =() => {
        // return !isNaN(this.state.formula)
        //TODO 
        return true
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
                    Formula
                <input 
                    style={this.isValidformula()?null:inputInvalid} 
                    type="text" 
                    value={this.state.formula} onChange={this.handleChangeFormula} />
                </label>
                    <input type="button" value={this.props.isInFlow?"Add InFlow":"Add OutFLow"} style={button}
                        onClick={() => {
                            if(!this.state.stockID === "" || !this.state.formula) return
                            this.props.addFlow(this.state.stockID, this.props.isInFlow, this.state.formula)
                        }}
                    />
            </form>
        )
    }
}