import React from 'react';
import Element from './Element'
import Flow from './Flow'

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

const markerId = "arrow"

export default class Board extends React.Component {    
    
    render() {
        const stocks = this.props.stocks.map(stock => {
            return <Element
                key={stock.id}
                stock = {stock}
                updatePosition={this.props.updatePosition}
                highlight = {this.props.stockBeingEdited===stock.id?true:false}
            />
        })
        
        const flows = this.props.flows
            .filter((flow) => flow.from && flow.to)
            .map(flow => {
                const from = this.props.stocks.find((stock) => stock.id === flow.from)
                const to = this.props.stocks.find((stock) => stock.id === flow.to)
                const pos = {
                    from: {
                        x: from.posX,
                        y: from.posY,
                    },
                    to: {
                        x: to.posX,
                        y: to.posY,
                    },
                }
                return <Flow    
                    key={flow.id}  
                    pos={pos}     
                    markerId={markerId}               
                />
            })
        return (
            <div style={svgWrapper}>
                <svg style={boardStyle}>
                    <defs>
                        <marker id={markerId} markerWidth="13" markerHeight="13" refX="2" refY="6" orient="auto">
                        <path d="M2,2 L2,11 L10,6 L2,2" />
                        </marker>
                    </defs>
                    {stocks}                    
                    {flows}                    
                </svg>
            </div>
        );
    }
}