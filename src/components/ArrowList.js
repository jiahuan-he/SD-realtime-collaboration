import React from 'react';

const style = {
    // float: "left"
}
export default class ArrowList extends React.Component {
    render() {        
        const arrows = this.props.arrows.map( (arrow) => {
        return <li key={arrow.from+arrow.to}>
                from: {arrow.from}, 
                to: {arrow.to}, 
            </li>
        })
        return (
            <div style = {style}>
                <h3>Arrows</h3>
                <ul>{arrows}</ul>
            </div>
        )
    }
}