import { Stock,
     Flow, Parameter } from "../model"

const { evaluate } = require('mathjs')
    
export default (
        stocks: Array<Stock>, 
        flows: Array<Flow>,
        parameters: Array<Parameter>,
        timeFrom: number,
        timeTo: number,
        timeStep: number,
        stocksToSimulate: Array<string>,
        XAxisDataKey: string
    ) => {
    const res: {[key:string]:Array<number>} = {}
    const equationToExpression = (equation: string):string => {
        const arr = equation.replace(/ /g,'').split(/([+\-*/^])/g)
        for(let i=0; i<arr.length; i++){            
            if(/^[a-z0-9]+$/i.test(arr[i]) && isNaN(Number(arr[i]))){
                const foundParamter = parameters.find( (parameter) => parameter.name === arr[i])                
                if(foundParamter){
                    arr[i] = foundParamter.value.toString()
                    continue
                }
                
                const foundStock = stocks.find( (stock) => stock.id === arr[i])
                const foundFlow = flows.find( (flow) => flow.id === arr[i])                
                const foundVar = foundStock ? foundStock:foundFlow
                if (!foundVar) return ""
                const len = res[foundVar.id].length
                arr[i] = res[foundVar.id][len-1].toString()
            }            
        }
        return arr.join("")
    }
    
    // populate initial stock values
    stocks.forEach(stock => {
        res[stock.id] = [stock.initValue]
    });
    // populate initial flow values
    flows.forEach(flow => {
        const expression = equationToExpression(flow.equation)
        console.log(expression)
        res[flow.id] = [evaluate(expression)]
    })

    const dataPoints = []
    for(let i=timeFrom; i<=timeTo; i = i+timeStep){    
        const dp: {[key:string]:number} = {}
        stocksToSimulate.forEach(stock => {
            dp[stock] = res[stock][res[stock].length-1]
        })
        dp[XAxisDataKey] = i
        dataPoints.push(dp)
        stocks.forEach(stock => {
            let len = res[stock.id].length
            const prevValue = res[stock.id][len-1]
            res[stock.id].push(prevValue + timeStep*evaluate(equationToExpression(stock.equation)))
        });

        flows.forEach(flow => {
            res[flow.id].push(evaluate(equationToExpression(flow.equation)))
        });
    }
    return dataPoints
}