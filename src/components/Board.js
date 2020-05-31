import React from 'react';
import Stock from './Stock'
import Flow from './Flow'
import FlowText from './FlowText'
import Cloud from './Cloud'
import Arrow from './Arrow'
import Parameter from './Parameter'
import firebase from '../firebase'

const boardStyle = {
    height: 1000,
    width: 1000,
    backgroundColor: '#eeeeee',
};
const svgWrapper = {
    overflow: "scroll",
    height: 500,
    width: 600,
}

const markerId = "arrow"

const updateCloudPosition = (cloudByFlow, x, y, _FB_PATH) => {    
    firebase.database().ref(_FB_PATH+'state').once('value').then((state) => {
        let targetCloud    
        const cloudsOrigin = Object.assign([], state.val().cloudsOrigin)
        const cloudsDestination = Object.assign([], state.val().cloudsDestination)
        if(cloudsOrigin.find(cloud => cloud.flow === cloudByFlow)){
            targetCloud = cloudsOrigin.find(cloud => cloud.flow === cloudByFlow)
        } else {
            targetCloud = cloudsDestination.find(cloud => cloud.flow === cloudByFlow)
        }
        targetCloud.posX = x
        targetCloud.posY = y
        firebase.database().ref(_FB_PATH+'state/cloudsOrigin').set(cloudsOrigin);
        firebase.database().ref(_FB_PATH+'state/cloudsDestination').set(cloudsDestination)
    })
}

const makeDraggable = (id, updatePositionHandler, _FB_PATH) => {    
    let draggable = document.getElementById(id);
    let offset

    const mouseDown = (e) => {
        draggable = document.getElementById(id);
        offset = getMousePosition(e);
        offset.x -= parseFloat(draggable.getAttributeNS(null, "x"));
        offset.y -= parseFloat(draggable.getAttributeNS(null, "y"));
        draggable.addEventListener('mousemove', mouseMove)
    }

    const mouseMove = (e) => {
        if (!draggable) return
        e.preventDefault();
        const coord = getMousePosition(e);
        updatePositionHandler(id, coord.x - offset.x, coord.y - offset.y, _FB_PATH)
    }

    const mouseUpOrLeave = (e) => {
        draggable = null
    }

    // mouse position to svg position
    const getMousePosition = (e) => {
        const CTM = draggable.getScreenCTM();
        return {
            x: (e.clientX - CTM.e) / CTM.a,
            y: (e.clientY - CTM.f) / CTM.d
        };
    }

    draggable.addEventListener('mousedown', mouseDown)
    draggable.addEventListener('mouseup', mouseUpOrLeave)
    draggable.addEventListener('mouseleave', mouseUpOrLeave)
}

const DraggableComponent = (Component, updatePositionHandler) => 
    class extends React.Component {
        componentDidMount() {
            makeDraggable(this.props.elementId, updatePositionHandler, this.props._FB_PATH)
        }
        render() {
            return <Component {...this.props}/>
        }
    }

const DraggableCloud = DraggableComponent(Cloud, updateCloudPosition)

export default class Board extends React.Component {    
    
    render() {
        const stocks = this.props.stocks.map(stock => {
            return <Stock
                key={stock.id}
                stock = {stock}
                updatePosition={this.props.updatePosition}
                highlight = {this.props.stockBeingEdited===stock.id?true:false}
            />
        })

        const cloudsOrigin = this.props.cloudsOrigin.map( cloud => {
            return <DraggableCloud
                elementId={cloud.flow}
                _FB_PATH={this.props._FB_PATH}
                key={cloud.flow}
                flow={cloud.flow}
                posX={cloud.posX}
                posY={cloud.posY}
                updateCloudPosition={this.props.updateCloudPosition}
            />
        })

        const cloudsDestination = this.props.cloudsDestination.map( cloud => {
            return <DraggableCloud
                elementId={cloud.flow}
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

        const getFlowCenter = (flow) => {
            const pos = flowPos.find(f => f.id === flow.id)
            return {
                x: (pos.from.x + pos.to.x)/2,
                y: (pos.from.y + pos.to.y)/2,
            }
        }

        const getStockCorner = (stock) => {
            return {
                x: stock.posX+50,
                y: stock.posY,
            }
        }

        const getParameterPos = (parameter) => {
            return {
                x: parameter.posX+4*parameter.name.length,// 4*length is the best proportion so x is at the center of the text
                y: parameter.posY,
            }
        }

        const arrows = this.props.arrows.map( arrow => {
            let from
            const fromStock = this.props.stocks.find((stock) => stock.id === arrow.from)
            const fromFlow = this.props.flows.find((flow) => flow.id === arrow.from)
            const fromParameter = this.props.parameters.find((parameter) => parameter.name === arrow.from)
            if(fromStock){
                from = getStockCorner(fromStock)
            } else if(fromFlow){
                from = getFlowCenter(fromFlow)
            } else {
                from = getParameterPos(fromParameter)
            }

            let to
            const toStock = this.props.stocks.find((stock) => stock.id === arrow.to)
            const toFlow = this.props.flows.find((flow) => flow.id === arrow.to)
            const toParameter = this.props.parameters.find((parameter) => parameter.name === arrow.to)
            if(toStock){
                to = getStockCorner(toStock)
            } else if(toFlow){
                to = getFlowCenter(toFlow)
            } else {
                to = getParameterPos(toParameter)
            }

            return <Arrow 
                key={arrow.from+arrow.to}
                markerId = {markerId}
                from={from}
                to={to}
            />
        })

        const parameters = this.props.parameters.map( parameter => {
            return <Parameter 
                key={parameter.name}
                parameter={parameter}
                updateParameterPosition={this.props.updateParameterPosition}
            ></Parameter>
        })

        return (
            <div style={svgWrapper}>
                <svg style={boardStyle}>
                    <defs>
                        <marker id={markerId} viewBox="0 0 10 10" refX="5" refY="5"
                            markerWidth="6" markerHeight="6"
                            orient="auto-start-reverse"
                            fill="#2b580c"
                        >
                        <marker id={markerId} viewBox="0 0 10 10" refX="5" refY="5"
                            markerWidth="6" markerHeight="6"
                            orient="auto-start-reverse"
                            fill="#2b580c"
                        ></marker>
                        <path d="M 0 0 L 10 5 L 0 10 z"/>
                        </marker>
                    </defs>
                    {stocks}                                        
                    {flowTexts}  
                    {cloudsOrigin}
                    {cloudsDestination}
                    {flows}
                    {arrows}
                    {parameters}
                </svg>
            </div>
        );
    }
}