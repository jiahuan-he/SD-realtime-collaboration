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

export default class AddArrowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: "",
            to: "",
        };
    }

    handleChangeFrom = (event) => {
        this.setState({ from: event.target.value});
    }

    handleChangeTo = (event) => {
        this.setState({ to: event.target.value});
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
            <form onSubmit={this.handleSubmit}>
                <label>
                    From
                <input 
                    style={this.isValidFrom()?null:inputInvalid} 
                    type="text" 
                    value={this.state.from} onChange={this.handleChangeFrom} />
                </label>
                <label>
                    To
                <input 
                    style={this.isValidTo()?null:inputInvalid} 
                    type="text" 
                    value={this.state.to} onChange={this.handleChangeTo}/>
                </label>
                <input type="button" value={"Add Arrow"} style={button}
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