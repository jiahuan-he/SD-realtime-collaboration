import React from 'react';
import {Stock} from './Stock'
import {Flow} from './Flow'
import {FlowText} from './FlowText'
import {Cloud} from './Cloud'
import {Arrow} from './Arrow'
import {Parameter} from './Parameter'
import firebase from '../firebase'
import { I_Cloud, I_Arrow, I_Flow, I_Parameter, I_Stock, I_Positionable } from '../model';

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

const updatePosition = (elementId: string, x: number, y: number, FB_PATH: string, FB_PATH_SUFFIX: string) => {    
    firebase.database().ref(`${FB_PATH}/state`).once('value').then((state) => {
        let targetElement        
        const elements: Array<I_Positionable> = Object.assign([], state.val()[FB_PATH_SUFFIX])        
        targetElement = elements.find(el => el.id === elementId)
        if(!targetElement) return        
        targetElement.posX = x
        targetElement.posY = y
        firebase.database().ref(`${FB_PATH}/state/${FB_PATH_SUFFIX}`).set(elements)
    })
}

const makeDraggable = (
    id: string, updatePositionHandler: 
    (elementId: string, x: number, y: number, FB_PATH: string, FB_PATH_SUFFIX: string) => void, 
    FB_PATH: string, 
    FB_PATH_SUFFIX: string
    ) => {
    let draggable: any = document.getElementById(id)
    let offset: {x: number, y: number}

    const mouseDown = (e: MouseEvent) => {
        draggable = document.getElementById(id);        
        offset = getMousePosition(e);
        offset.x -= parseFloat(draggable.getAttributeNS(null, "x")||"0");
        offset.y -= parseFloat(draggable.getAttributeNS(null, "y")||"0");
        draggable.addEventListener('mousemove', mouseMove)
    }

    const mouseMove = (e: MouseEvent) => {  
        if (!draggable) return      
        e.preventDefault();
        const coord = getMousePosition(e);
        updatePositionHandler(id, coord.x - offset.x, coord.y - offset.y, FB_PATH, FB_PATH_SUFFIX)
    }

    const mouseUpOrLeave = (e: MouseEvent) => {
        draggable = null
    }

    // mouse position to svg position
    const getMousePosition = (e: MouseEvent) => {
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

interface DraggableComponentProps{
    elementId: string,
    updatePosition: (elementId: string, x: number, y: number, FB_PATH: string, FB_PATH_SUFFIX: string) => void,
    FB_PATH: string,
    FB_PATH_SUFFIX: string,
}
const DraggableComponent = <P extends object>(Component: React.FC<P>) => 
    class extends React.Component<P & DraggableComponentProps> {
        componentDidMount() {
            makeDraggable(this.props.elementId, this.props.updatePosition, this.props.FB_PATH, this.props.FB_PATH_SUFFIX)
        }
        render() {            
            return <Component {...this.props}/>
        }
    }

const DraggableCloud = DraggableComponent(Cloud)
const DraggableStock = DraggableComponent(Stock)
const DraggableParameter = DraggableComponent(Parameter)

interface Props{
    FB_PATH: string,
    stocks: Array<I_Stock>,
    flows: Array<I_Flow>,
    parameters: Array<I_Parameter>,
    arrows: Array<I_Arrow>,
    clouds: Array<I_Cloud>,
    stockBeingEdited: string | null,
}
export const Board: React.FC<Props> = (props: Props) =>{        
    const stocks = props.stocks.map(stock => {
        return <DraggableStock
            key={stock.id}
            {...stock}
            highlight = {props.stockBeingEdited===stock.id?true:false}
            elementId={stock.id}
            FB_PATH={props.FB_PATH}
            FB_PATH_SUFFIX={"stocks"}
            updatePosition={updatePosition}
        />
    })

    const clouds = props.clouds.map( cloud => {
        return <DraggableCloud                
            key={cloud.flow}
            {...cloud}
            elementId={cloud.id}
            FB_PATH={props.FB_PATH}
            FB_PATH_SUFFIX={"clouds"}
            updatePosition={updatePosition}
        />
    })
    
    const flowPos = props.flows
        .map(flow => {
            let from
            if(flow.from){
                from = props.stocks.find((stock) => stock.id === flow.from)
            } else {                    
                from = props.clouds.find( cloud => cloud.flow === flow.id && cloud.flowTo) // if cloud.to exists, the flow originates FROM a cloud
            }
            let to
            if(flow.to){
                to = props.stocks.find((stock) => stock.id === flow.to)
            } else {
                to = props.clouds.find( cloud => cloud.flow === flow.id && cloud.flowFrom) // if cloud.to exists, the flow goes TO a cloud
            }
            from = from!
            to = to!
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

    const getFlowCenter = (flow: I_Flow) => {
        const pos = flowPos.find(f => f.id === flow.id)!
        return {
            x: (pos.from.x + pos.to.x)/2,
            y: (pos.from.y + pos.to.y)/2,
        }
    }

    const getStockCorner = (stock: I_Stock) => {
        return {
            x: stock.posX+50,
            y: stock.posY,
        }
    }

    const getParameterPos = (parameter: I_Parameter) => {
        return {
            x: parameter.posX+4*parameter.name.length,// 4*length is the best proportion so x is at the center of the text
            y: parameter.posY,
        }
    }

    const arrows = props.arrows.map( arrow => {
        let from
        const fromStock = props.stocks.find((stock) => stock.id === arrow.from)
        const fromFlow = props.flows.find((flow) => flow.id === arrow.from)
        const fromParameter = props.parameters.find((parameter) => parameter.name === arrow.from)

        if(fromStock){
            from = getStockCorner(fromStock)
        } else if(fromFlow){
            from = getFlowCenter(fromFlow)
        } else if(fromParameter){
            from = getParameterPos(fromParameter)
        } else {
            throw new Error("arrow no origin")
        }

        let to
        const toStock = props.stocks.find((stock) => stock.id === arrow.to)
        const toFlow = props.flows.find((flow) => flow.id === arrow.to)
        const toParameter = props.parameters.find((parameter) => parameter.name === arrow.to)
        if(toStock){
            to = getStockCorner(toStock)
        } else if(toFlow){
            to = getFlowCenter(toFlow)
        } else if(toParameter){
            to = getParameterPos(toParameter)
        } else {
            throw new Error("arrow no destination")
        }

        return <Arrow 
            key={arrow.from+arrow.to}
            markerId = {markerId}
            from={from}
            to={to}
        />
    })

    const parameters = props.parameters.map( parameter => {
        return <DraggableParameter 
            key={parameter.id}
            {...parameter}
            elementId={parameter.id}
            FB_PATH={props.FB_PATH}
            FB_PATH_SUFFIX={"parameters"}
            updatePosition={updatePosition}/>
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
                {clouds}
                {flows}
                {arrows}
                {parameters}
            </svg>
        </div>
    );
}
