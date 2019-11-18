import React from 'react';
import Element from './Element'

const boardStyle = {
    height: 1000,
    width: 1000,
    backgroundColor: '#eeeeee',
};
const svgWrapper = {
    overflow: "scroll",
    height: 500,
    width: 500,
}

export default class Board extends React.Component {    
    
    render() {
        const stocks = this.props.stockIDs.map(id => {
            return <Element
                key={id}
                stockID={id}
                stockValue={this.props.stockValues[id]}
                x={this.props.stockPos[id].x}
                y={this.props.stockPos[id].y}
                updatePosition={this.props.updatePosition}
            />
        })

        return (
            <div style={svgWrapper}>
                <svg style={boardStyle}>
                    {stocks}
                </svg>
            </div>
        );
    }
}