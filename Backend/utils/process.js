const { getTransactions }  = require("./graph")
const {getDetails, getPrices} = require("./1inch")

async function getPortfolioAndCapital(transactions){
    let portfolio = {}
    let capitalBalance = 0
    transactions.forEach(trade => {
        if (Object.keys(portfolio).includes(trade.tokenIn.id)){
            portfolio[trade.tokenIn.id].balance -= parseInt(trade.amountIn)
        }else{
            capitalBalance += parseFloat(trade.amountInUSD)
        }
        if (Object.keys(portfolio).includes(trade.tokenOut.id)){
            portfolio[trade.tokenOut.id].balance += parseInt(trade.amountOut)
        }else{
            portfolio[trade.tokenOut.id] = {
                name : trade.tokenOut.name,
                symbol : trade.tokenOut.symbol,
                balance : parseInt(trade.amountOut)
            }
        }
    })
    return {"capital":capitalBalance, "portfolio":portfolio}
}

async function currentPortfolioBalance(portfolio){
    const tokenDetails = await getDetails(Object.keys(portfolio))
    await new Promise(r => setTimeout(r, 2000))
    const tokenPrice = await getPrices(Object.keys(portfolio))
    let currentBalance = 0
    for(let key in portfolio){
        currentBalance += parseFloat(tokenPrice[key])*(portfolio[key]["balance"]/(10**tokenDetails[key]["decimals"]))
    }
    return currentBalance
}

async function calculateProfit(user_address){
    const transactions = await getTransactions(user_address)
    const calculatedData = await getPortfolioAndCapital(transactions)
    const currentBalance = await currentPortfolioBalance(calculatedData["portfolio"])
    if(calculatedData["capital"] === 0){
        return 0
    }
    return ((currentBalance-calculatedData["capital"])/calculatedData["capital"])*100
}

module.exports = {
    calculateProfit
}