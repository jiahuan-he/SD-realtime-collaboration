//{"stockName": []}
const stocks = ["s1", "s2"]
const inFlows = {
    // "s1": {0.1: "x"},
    "s1": {
        "s2": "",
    },
    "s2": {
        "s1": "",
    },
}
const outFlows = {
    // "s1": {0.2: "x"},
}

const initValues = {
    "s1":1,
    "s2":2,
}

const functions = {
    "x": (a, b) => +a * +b,
    "+": (a, b) => +a + +b,
    "-": (a, b) => +a - +b,
    "": (a, b) => b,
}

const run = (stocks, inFlows, outFlows, initValues, unit, deltaT) => {
    const res = {}
    const steps = deltaT/unit
    stocks.forEach(stock => {
        res[stock] = [initValues[stock]]
    });

    if(steps<=1){
        return res
    }
    
    for(let i=1; i<=steps; i++){
        // populate the ith value for all stocks
        stocks.forEach( stock => {
            let inFlowSum = 0
            let outFlowSum = 0
            const inFlowsForTheStock = inFlows[stock]
            const outFlowsForTheStock = outFlows[stock]
            const stockLastValue = res[stock][i-1]

            for(let operand in inFlowsForTheStock){
                const operator = functions[inFlowsForTheStock[operand]]
                if(isNaN(operand)){
                    operand = res[operand][i-1]
                }
                inFlowSum += +operator(stockLastValue, operand)
            }

            for(let operand in outFlowsForTheStock){
                const operator = functions[outFlowsForTheStock[operand]]
                if(isNaN(operand)){
                    operand = res[operand][i-1]
                }
                outFlowSum += +operator(stockLastValue, operand)
            }
            const total = stockLastValue+inFlowSum-outFlowSum
            res[stock].push(total)
        })
    }

    return res;
}

console.log(run(stocks, inFlows, outFlows, initValues, 1, 5))