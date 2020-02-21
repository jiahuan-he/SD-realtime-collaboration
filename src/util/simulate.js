const { evaluate } = require('mathjs')

const flows = [{
"dependencies" : [ "tank1" ],
"equation" : "0.05*tank1",
"from" : "tank1",
"id" : "flow",
"to" : "tank2"
}]
const stocks = [{"dependencies" : [ "tank1", "flow" ],
"equation" : "-flow",
"id" : "tank1",
"initValue" : 100,
"posX" : 31,
"posY" : 115,
"value" : 100
}, {
"dependencies" : [ "tank2", "flow" ],
"equation" : "flow",
"id" : "tank2",
"initValue" : 0,
"posX" : 228,
"posY" : 115,
"value" : 0
} ]
    
export default (stocks, flows, timeFrom, timeTo, timeStep, stocksToSimulate) => {
    
    const equationToExpression = (equation) => {
        const arr = equation.split(/([\+\-\*\/^])/g)
        for(let i=0; i<arr.length; i++){            
            if(/^[a-z0-9]+$/i.test(arr[i])){
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
        res[flow.id] = [evaluate(equationToExpression(flow.equation))]
    })

    const dataPoints = []
    for(let i=timeFrom; i<=timeTo; i+= timeStep){
        stocks.forEach(stock => {
            let len = res[stock.id].length
            const prevValue = res[stock.id][len-1]
            res[stock.id].push(prevValue + timeStep*evaluate(equationToExpression(stock.equation)))
        });

        const dp = {}
        stocksToSimulate.forEach(stock => {
            dp[stock] = res[stock][res[stock].length-1]
        })
        dp.name = i
        dataPoints.push(dp)

        flows.forEach(flow => {
            // let len = res[flow.id].length
            res[flow.id].push(evaluate(equationToExpression(flow.equation)))
        });
    }
    return dataPoints
}
// console.log(simulate(stocks, flows, 0, 10, 1, ["tank1", "tank2"]))