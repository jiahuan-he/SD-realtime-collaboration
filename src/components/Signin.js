import React from 'react';
import firebase from '../firebase'
import { Redirect } from 'react-router-dom'


const button = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "5px 12px",
    cursor: "pointer",
}

export default class Background extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            simulationID: "",
            path: "",
        }
    }

    handleChange = (event) => {
        const simulationID = event.target.value.trim()
        this.setState({ simulationID: simulationID });
    }

    handleSubmit = () => {
        const simulationID = this.state.simulationID
        firebase.database().ref('simulations/' + simulationID).once('value').then((snapshot) => {
            if(snapshot.val()){
                this.setState({ path: simulationID})
            } else {
                firebase.database().ref('simulations/' + simulationID).set({
                    state:0
                }, ()=> {
                    this.setState({ path: simulationID})
                });
            }
        });        
    }

    render() {
        const form = (<form onSubmit={this.handleSubmit}>
            <label>SimulationID
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <input type="button" value="Creat/Join Simulation" style={button} onClick={this.handleSubmit} />
        </form>)
        const redirect = <Redirect to={{
            pathname: '/simulation',
            state: { simulationID: this.state.simulationID}            
        }}        
        />
        
        return this.state.path ? redirect : form



    }
}