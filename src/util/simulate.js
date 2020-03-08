const { evaluate } = require('mathjs')
    
export default (stocks, flows, timeFrom, timeTo, timeStep, stocksToSimulate, XAxisDataKey) => {
    console.log(stocks)
    console.log(flows)
    console.log(stocksToSimulate)

    const equationToExpression = (equation) => {        
        const arr = equation.replace(/ /g,'').split(/([\+\-\*\/^])/g)
        for(let i=0; i<arr.length; i++){            
            if(/^[a-z0-9]+$/i.test(arr[i]) && isNaN(arr[i])){
                const foundStock = stocks.find( (stock) => stock.id === arr[i])
                const foundFlow = flows.find( (flow) => flow.id === arr[i])
                
                const foundVar = foundStock ? foundStock:foundFlow
                const len = res[foundVar.id].length
                arr[i] = res[foundVar.id][len-1]
            }            
        }
        return arr.join("")
    }

    const res = {}
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
        const dp = {}
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
// console.log(simulate(stocks, flows, 0, 10, 1, ["tank1", "tank2"]))