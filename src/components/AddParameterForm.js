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

export default class AddParameterForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            parameterName:"",
            parameterValue: 0,
        };
    }

    handleChangeName = (event) => {
        this.setState({ parameterName: event.target.value.trim()});
    }

    handleChangeValue = (event) => {
        this.setState({ parameterValue: event.target.value});
    }

    isValidParameterName = () => {    
        if(!this.state.parameterName) return false
        return this.props.stocks.filter((stock => stock.id === this.state.parameterName)).length === 0 
        && this.props.flows.filter((flow => flow.id === this.state.parameterName)).length === 0
        && this.props.parameters.filter((parameter => parameter.name === this.state.parameterName)).length === 0
    }

    isValidParameterValue =() => {
        return !isNaN(this.state.parameterValue)
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Parameter Name
                <input 
                    style={this.isValidParameterName()?null:inputInvalid} 
                    type="text" 
                    value={this.state.parameterName} 
                    onChange={this.handleChangeName} 
                />
                </label>
                <label>
                    Value
                <input 
                    style={this.isValidParameterValue()?null:inputInvalid} 
                    type="text" 
                    value={this.state.parameterValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Add Parameter" style={button}
                        onClick={() => {
                            if(this.state.parameterName === "" || !this.isValidParameterName()) return
                            this.props.addParameter(this.state.parameterName, this.state.parameterValue)
                            this.setState({
                                parameterName:"",
                                parameterValue: 0
                            })
                        }}
                    />
            </form>
        )
    }
}