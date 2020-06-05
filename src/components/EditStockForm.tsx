import React, {FormEvent, CSSProperties } from 'react';
import { I_Stock} from '../model';

interface State{
    stockID: string,
    stockValue: number,
}

interface Props{
    stocks: Array<I_Stock>,
    updateStockValue: (id:string, value:number) => void
    highlightStock: (id:string) => void,
    button: CSSProperties,
    inputInvalid: CSSProperties,
}


export default class EditStockForm extends React.Component<Props, State>  {
    constructor(props: Props) {
        super(props);
        this.state = {
            stockID:"",
            stockValue: 0,
        };
    }

    handleChangeName = (event: FormEvent<HTMLInputElement>) => {
        const id = event.currentTarget.value.trim()
        this.setState({ stockID: id});
        this.props.highlightStock(id)
    }

    handleChangeValue = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ stockValue: Number(event.currentTarget.value)});
    }

    isValidStockID = () => {
        return this.props.stocks.filter((stock) => stock.id === this.state.stockID).length === 1
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
                    style={this.isValidStockValue()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.stockValue} onChange={this.handleChangeValue} />
                </label>
                    <input type="button" value="Edit Stock InitValue" style={this.props.button}
                        onClick={() => {
                            if(!this.state.stockID|| !this.state.stockValue) return
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