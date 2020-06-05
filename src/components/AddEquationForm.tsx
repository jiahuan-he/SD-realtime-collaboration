import React, { CSSProperties, FormEvent } from 'react';
import { I_Stock, I_Flow} from '../model';

interface State{
    id: string,
    equation:string,
}

interface Props{
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    addEquation: (equation:string, id:string)=>void,
    button: CSSProperties,
    inputInvalid: CSSProperties,
}


export default class AddEquationForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            id: "",
            equation: "",
        };
    }

    handleChangeId = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ id: event.currentTarget.value});
    }

    handleChangeEquation = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ equation: event.currentTarget.value});
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
            <form>
                <label>
                    Name
                <input 
                    style={this.isValidId()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.id} onChange={this.handleChangeId} />
                </label>
                <label>
                    Equation
                <input 
                    style={this.isValidEquation()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.equation} onChange={this.handleChangeEquation}/>
                </label>
                <input type="button" value={"Add Equation"} style={this.props.button}
                    onClick={() => {
                        if(!this.isValidId() || !this.isValidEquation()) return                        
                        this.props.addEquation(this.state.equation, this.state.id)
                        this.setState({
                            id: "",
                            equation: "",
                        })
                    }}
                />
            </form>
        )
    }
}