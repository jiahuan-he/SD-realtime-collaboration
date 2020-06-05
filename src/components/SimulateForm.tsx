import React, {FormEvent, CSSProperties } from 'react';
import { I_Stock, I_Flow, I_Parameter, SimulationData } from '../model';
import simulate from '../util/simulate'

interface State{
    stocksToSimulate: string,
    timeFrom: string,
    timeTo: string,
    timeStep: string,
}

interface Props{
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    parameters: Array<I_Parameter>,
    button: CSSProperties,
    inputInvalid: CSSProperties,
    XAxisDataKey: string,
    addSimulationData: (data: SimulationData) => void,
}


export default class SimulateForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            stocksToSimulate: "",
            timeFrom: '',
            timeTo: '',
            timeStep: '',
        };
    }
    
    handleChangeStocksToSimulate = (event: FormEvent<HTMLInputElement>) => {        
        this.setState({ stocksToSimulate: event.currentTarget.value});
    }

    handleChangeTimeFrom = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ timeFrom: event.currentTarget.value});
    }

    handleChangeTimeTo = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ timeTo: event.currentTarget.value});
    }

    handleChangeTimeStep = (event: FormEvent<HTMLInputElement>) => {
        this.setState({ timeStep: event.currentTarget.value});
    }

    isValidTimeFrom = () => {
        return !isNaN(Number(this.state.timeFrom))
    }

    isValidTimeTo = () => {
        return !isNaN(Number(this.state.timeTo))
    }

    isValidTimeStep = () => {
        return !isNaN(Number(this.state.timeStep))
    }

    isValidStocksToSimulate = () => {
        if(!this.state.stocksToSimulate) return false
        const stocks = this.state.stocksToSimulate.replace(/ /g,'').split(",")
        for(let i=0; i<stocks.length; i++){
            if(this.props.stocks.filter((stock) => stock.id === stocks[i]).length !== 1) return false 
        }
        return true
    }

    render() {
        return (
            <form>
                <label>
                    Stocks
                <input 
                    style={this.isValidStocksToSimulate()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.stocksToSimulate} 
                    onChange={
                        (event) => {
                            this.handleChangeStocksToSimulate(event)
                        }
                    } 
                />
                </label>
                <label>
                    Time From
                <input 
                    style={this.isValidTimeFrom()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.timeFrom} onChange={this.handleChangeTimeFrom} />
                </label>
                <label>
                    Time To
                <input 
                    style={this.isValidTimeTo()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.timeTo} onChange={this.handleChangeTimeTo} />
                </label>

                <label>
                    Time Step
                <input 
                    style={this.isValidTimeStep()?undefined:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.timeStep} onChange={this.handleChangeTimeStep} />
                </label>
                
                <input type="button" value="Simulate" style={this.props.button}
                    onClick={() => {
                        if(!this.isValidStocksToSimulate() 
                        || !this.isValidTimeFrom()
                        || !this.isValidTimeTo()
                        || !this.isValidTimeStep()
                        ) return
                        const stocks = this.state.stocksToSimulate.replace(/ /g,'').split(",")
                        const data = simulate(
                            this.props.stocks,
                            this.props.flows,
                            this.props.parameters,
                            +this.state.timeFrom,
                            +this.state.timeTo,
                            +this.state.timeStep,
                            stocks,
                            this.props.XAxisDataKey,
                        )
                        this.props.addSimulationData(data)
                    }}
                />
            </form>
        )
    }
}