import React from 'react';
import Element from './Element'
import Flow from './Flow'
import FlowText from './FlowText'
import Cloud from './Cloud'

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

        const cloudsOrigin = this.props.cloudsOrigin.map( cloud => {
            return <Cloud
                key={cloud.flow}
                flow={cloud.flow}
                posX={cloud.posX}
                posY={cloud.posY}
                updateCloudPosition={this.props.updateCloudPosition}
            />
        })

        const cloudsDestination = this.props.cloudsDestination.map( cloud => {
            return <Cloud
                key={cloud.flow}
                flow={cloud.flow}
                posX={cloud.posX}
                posY={cloud.posY}
                updateCloudPosition={this.props.updateCloudPosition}
            />
        })
        
        const flowPos = this.props.flows
            .map(flow => {
                let from
                if(flow.from){
                    from = this.props.stocks.find((stock) => stock.id === flow.from)
                } else {
                    from = this.props.cloudsOrigin.find( cloud => cloud.flow === flow.id)
                }
                let to                
                if(flow.to){
                    to = this.props.stocks.find((stock) => stock.id === flow.to)
                } else {
                    to = this.props.cloudsDestination.find( cloud => cloud.flow === flow.id)
                }
                
                return {
                    id: flow.id,
                    from: {
                        // eclipse position x, y are at the center, whereas rect svg position x, y are positioned at the top left corner
                        // 25 is the width/height of the rect svg
                        x: flow.from?from.posX+25:from.posX,
                        y: flow.from?from.posY+25:from.posY,
                    },
                    to: {
                        x: flow.to?to.posX+25:to.posX,
                        y: flow.to?to.posY+25:to.posY,
                    },
                }                
            })
        
        const flows = flowPos.map( flow => {
            return <Flow    
                    key={flow.id}  
                    from={flow.from}
                    to={flow.to}
                    markerId={markerId}               
                />
        })

        const flowTexts = flowPos.map( flow => {
            return <FlowText
                    key={flow.id}  
                    from={flow.from}
                    to={flow.to}
                    flowText={flow.id}  
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
                    {flowTexts}  
                    {cloudsOrigin}
                    {cloudsDestination}
                    {flows}
                </svg>
            </div>
        );
    }
}