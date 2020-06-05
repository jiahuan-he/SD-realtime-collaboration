import React, { Component, FormEvent, CSSProperties } from 'react';
import { I_Stock, I_Flow, I_Parameter, I_Arrow } from '../model';

interface State{
    from: string,
    to:string,
}

interface Props{
    arrows: Array<I_Arrow>,
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    parameters: Array<I_Parameter>,
    addDependenciesToStockOrFlow: (from:string, to:string)=>void,
    addArrow: (from:string, to:string)=>void,
    button: CSSProperties,
    inputInvalid: CSSProperties,
}

export default class AddArrowForm extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            from: "",
            to: "",
        };
    }

    handleChangeFrom = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ from: event.currentTarget.value});
    }

    handleChangeTo = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ to: event.currentTarget.value});
    }

    isValidFrom = () => {
        if(!this.state.from) return false
        
        if(this.props.stocks.filter((stock => stock.id === this.state.from)).length === 0
        && this.props.flows.filter((flow => flow.id === this.state.from)).length === 0
        && this.props.parameters.filter((parameter => parameter.name === this.state.from)).length === 0
        ) return false

        if(this.state.from === this.state.to) return false
        if(this.props.arrows.filter(arrow => arrow.from === this.state.from && arrow.to === this.state.to).length>0) return false
        return true 
    }

    isValidTo = () => {
        if(!this.state.to) return false
        
        if(this.props.stocks.filter((stock => stock.id === this.state.to)).length === 0
        && this.props.flows.filter((flow => flow.id === this.state.to)).length === 0
        && this.props.parameters.filter((parameter => parameter.name === this.state.to)).length === 0
        ) return false

        if(this.state.from === this.state.to) return false
        if(this.props.arrows.filter(arrow => arrow.from === this.state.from && arrow.to === this.state.to).length>0) return false
        
        return true 
    }

    render() {
        return (
            <form>
                <label>
                    From
                <input 
                    style={this.isValidFrom()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.from} onChange={this.handleChangeFrom} />
                </label>
                <label>
                    To
                <input 
                    style={this.isValidTo()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.to} onChange={this.handleChangeTo}/>
                </label>
                <input type="button" value={"Add Arrow"} style={this.props.button}
                    onClick={() => {
                        if(!this.isValidFrom() || !this.isValidTo()) return
                        this.props.addDependenciesToStockOrFlow(this.state.from, this.state.to)
                        this.props.addArrow(this.state.from, this.state.to)
                        this.setState({
                            from: "",
                            to: "",
                        })
                    }}
                />
            </form>
        )
    }
}