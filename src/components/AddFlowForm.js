import React from 'react';

export default class AddFlowForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            flowID:"",
            from: "",
            to: "",
        };
    }

    handleChangeName = (event) => {
        const id = event.target.value.trim()
        this.setState({ flowID: id});
    }

    handleChangeFrom = (event) => {
        this.setState({ from: event.target.value});
    }

    handleChangeTo = (event) => {
        this.setState({ to: event.target.value});
    }

    isValidFlowID = () => {
        if(!this.state.flowID) return false
        return this.props.flows.filter((flow => flow.id === this.state.flowID)).length === 0
        && this.props.stocks.filter((stock => stock.id === this.state.flowID)).length === 0
        && this.props.parameters.filter((parameter => parameter.name === this.state.flowID)).length === 0
    }

    isValidFrom = () => {
        if(this.state.from){
            if(this.props.stocks.length === 0 || this.props.stocks.filter((stock => stock.id === this.state.from)).length === 0) return false
        }
        if(this.state.from && this.state.to && this.state.from === this.state.to) return false
        return true 
    }

    isValidTo = () => {
        if(this.state.to){
            if(this.props.stocks.length === 0 || this.props.stocks.filter((stock => stock.id === this.state.to)).length === 0) return false
        }
        if(this.state.from && this.state.to && this.state.from === this.state.to) return false
        return true 
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Flow Name
                <input 
                    style={this.isValidFlowID()?null:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.flowID} 
                    onChange={
                        (event) => {
                            this.handleChangeName(event)
                        }
                    } 
                />
                </label>
                <label>
                    From
                <input 
                    style={this.isValidFrom()?null:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.from} onChange={this.handleChangeFrom} />
                </label>
                <label>
                    To
                <input 
                    style={this.isValidTo()?null:this.props.inputInvalid} 
                    type="text" 
                    value={this.state.to} onChange={this.handleChangeTo}/>
                </label>

                <input type="button" value={"Add Flow"} style={this.props.button}
                    onClick={() => {
                        if(!this.isValidFlowID()
                        || !this.isValidFrom()
                        || !this.isValidTo()
                        ) return
                        if(this.state.from) this.props.addDependenciesToStockOrFlow(this.state.flowID, this.state.from)
                        if(this.state.to) this.props.addDependenciesToStockOrFlow(this.state.flowID, this.state.to)
                        this.props.addFlow(this.state.flowID, this.state.from, this.state.to) 
                        this.props.addCloud(this.state.flowID, this.state.from, this.state.to) 
                        this.setState({
                            flowID:"",
                            from: "",
                            to: "",})
                    }}
                />
            </form>
        )
    }
}