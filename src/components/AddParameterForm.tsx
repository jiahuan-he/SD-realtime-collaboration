import React, {FormEvent, CSSProperties } from 'react';
import { I_Stock, I_Flow, I_Parameter } from '../model';

interface State{
    parameterName:string,
    parameterValue:number,
}

interface Props{
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    parameters: Array<I_Parameter>,
    addParameter: (parameterName:string, parameterValue:number)=>void,
    button: CSSProperties,
    inputInvalid: CSSProperties,
}

export default class AddParameterForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            parameterName:"",
            parameterValue: 0,
        };
    }

    handleChangeName = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ parameterName: event.currentTarget.value.trim()});
    }

    handleChangeValue = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ parameterValue: Number(event.currentTarget.value)});
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
            <form>
                <label>
                    Parameter Name
                <input 
                    style={this.isValidParameterName()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.parameterName} 
                    onChange={this.handleChangeName} 
                />
                </label>
                <label>
                    Value
                <input 
                    style={this.isValidParameterValue()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.parameterValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Add Parameter" style={this.props.button}
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