import React, {FormEvent, CSSProperties } from 'react';
import { I_Stock, I_Flow, I_Parameter } from '../model';

interface State{
    stockName: string
    stockValue: number
}

interface Props{
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    parameters: Array<I_Parameter>,
    addStock: (id:string, value:number)=>void,
    button: CSSProperties,
    inputInvalid: CSSProperties,
}

export default class AddStockForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            stockName:"",
            stockValue: 0,
        };
    }

    handleChangeName = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ stockName: event.currentTarget.value.trim()});
    }

    handleChangeValue = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ stockValue: Number(event.currentTarget.value)});
    }

    isValidStockID = () => {
        if(!this.state.stockName) return false
        return this.props.stocks.filter((stock => stock.id === this.state.stockName)).length === 0 
        && this.props.flows.filter((flow => flow.id === this.state.stockName)).length === 0
        && this.props.parameters.filter((parameter => parameter.name === this.state.stockName)).length === 0
    }

    isValidStockValue =() => {
        return !isNaN(this.state.stockValue)
    }

    render() {
        return (
            <form>
                <label>
                    Stock Name
                <input 
                    style={this.isValidStockID()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.stockName} 
                    onChange={this.handleChangeName} 
                />
                </label>
                <label>
                    Init Value
                <input 
                    style={this.isValidStockValue()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.stockValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Add Stock" style={this.props.button}
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