import React, { CSSProperties } from 'react';
import { I_Stock } from '../model';

const listStyleNeedsEquation: CSSProperties = {
    color: "red",
}

export const StockList: React.FC<{stocks:Array<I_Stock>}> = ({stocks}) => {
        const stockList = stocks.map( (stock) => {
        return <li key={stock.id} style={stock.equation?undefined:listStyleNeedsEquation} >
                stock id: {stock.id}, 
                equation:{stock.equation?" "+stock.equation:" NEEDS EQUATION"}, 
                initValue: {" "+stock.initValue}, 
                dependencies: {stock.dependencies.join(", ")},                 
            </li>
        })
        return (
            <div>
                <h3>Stocks</h3>
                <ul>{stockList}</ul>
            </div>
        )    
}