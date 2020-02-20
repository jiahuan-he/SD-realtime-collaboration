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

export default class AddEquationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            equation: "",
        };
    }

    handleChangeId = (event) => {
        this.setState({ id: event.target.value});
    }

    handleChangeEquation = (event) => {
        this.setState({ equation: event.target.value});
    }

    isValidId = () => {
        if(!this.state.id) return false
        
        if(this.props.stocks.filter((stock => stock.id === this.state.id)).length === 0
        && this.props.flows.filter((flow => flow.id === this.state.id)).length === 0
        ) return false
        
        return true 
    }

    isValidEquation = () => {
        if(!this.state.equation.trim()) return false        
        return true 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Name
                <input 
                    style={this.isValidId()?null:inputInvalid} 
                    type="text" 
                    value={this.state.id} onChange={this.handleChangeId} />
                </label>
                <label>
                    Equation
                <input 
                    style={this.isValidEquation()?null:inputInvalid} 
                    type="text" 
                    value={this.state.equation} onChange={this.handleChangeEquation}/>
                </label>
                <input type="button" value={"Add Equation"} style={button}
                    onClick={() => {
                        if(!this.isValidId() || !this.isValidEquation()) return                        
                        this.props.addEquation(this.state.equation, this.state.id)
                    }}
                />
            </form>
        )
    }
}