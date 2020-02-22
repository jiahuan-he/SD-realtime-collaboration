import React from 'react';
import simulate from '../util/simulate'

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

export default class SimulateForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stocksToSimulate: "",
            timeFrom: '',
            timeTo: '',
            timeStep: '',
        };
    }
    
    handleChangeStocksToSimulate = (event) => {        
        this.setState({ stocksToSimulate: event.target.value});
    }

    handleChangeTimeFrom = (event) => {
        this.setState({ timeFrom: event.target.value});
    }

    handleChangeTimeTo = (event) => {
        this.setState({ timeTo: event.target.value});
    }

    handleChangeTimeStep = (event) => {
        this.setState({ timeStep: event.target.value});
    }

    isValidTimeFrom = () => {
        return !isNaN(this.state.timeFrom)
    }

    isValidTimeTo = () => {
        return !isNaN(this.state.timeTo)
    }

    isValidTimeStep = () => {
        return !isNaN(this.state.timeStep)
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    Stocks
                <input 
                    style={this.isValidStocksToSimulate()?null:inputInvalid} 
                    type="text" 
                    value={this.state.stocksToSimulate} 
                    onChange={
                        (event) => {
                            this.handleChangeStocksToSimulate(event)                            
                            if(this.isValidStocksToSimulate()){
                                const stocks = this.state.stocksToSimulate.replace(/ /g,'').split(",")
                            }
                        }
                    } 
                />
                </label>
                <label>
                    Time From
                <input 
                    style={this.isValidTimeFrom()?null:inputInvalid} 
                    type="text" 
                    value={this.state.timeFrom} onChange={this.handleChangeTimeFrom} />
                </label>
                <label>
                    Time To
                <input 
                    style={this.isValidTimeTo()?null:inputInvalid} 
                    type="text" 
                    value={this.state.timeTo} onChange={this.handleChangeTimeTo} />
                </label>

                <label>
                    Time Step
                <input 
                    style={this.isValidTimeStep()?null:inputInvalid} 
                    type="text" 
                    value={this.state.timeStep} onChange={this.handleChangeTimeStep} />
                </label>
                
                <input type="button" value="Simulate" style={button}
                    onClick={() => {
                        if(!this.isValidStocksToSimulate() 
                        || !this.isValidTimeFrom()
                        || !this.isValidTimeTo()
                        || !this.isValidTimeStep()
                        ) return
                        const stocks = this.state.stocksToSimulate.replace(/ /g,'').split(",")
                        this.props.addSimulationData(simulate(
                            this.props.stocks,
                            this.props.flows,
                            +this.state.timeFrom,
                            +this.state.timeTo,
                            +this.state.timeStep,
                            stocks
                        ))
                    }}
                />
            </form>
        )
    }
}