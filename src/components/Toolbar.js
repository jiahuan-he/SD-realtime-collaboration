import React from 'react';

const button  = {
    backgroundColor: "white",
    border: "1px solid",
    color: "black",
    padding: "10px 24px",
    cursor: "pointer",
    float: "left",
}

export default class Toolbar extends React.Component {
    render() {
        return (
            <div>
                <button style={button} onClick={this.props.addStock}>Stock</button>
            </div>
        )
    }
}