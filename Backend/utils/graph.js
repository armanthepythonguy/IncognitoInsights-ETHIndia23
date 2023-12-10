const { createClient, cacheExchange, fetchExchange } = require("urql");
const API = "5bc93deff875bb8fbcbef46e5107ac12"
const URL = `https://gateway.thegraph.com/api/${API}/subgraphs/id/7h1x51fyT5KigAhXd8sdE3kzzxQDJxxz1y66LTFiC3mS`


async function getTransactions(user_address){
    const client = createClient({
        url: URL,
        exchanges : [cacheExchange, fetchExchange]
    })
    const query= `
    query{
    swaps(where: {to:"${user_address}"}){
        to,
        from,
        tokenIn{
        id,
        name,
        symbol
        },
        amountIn,
        amountInUSD,
        tokenOut{
        id,
        name,
        symbol
        },
        amountOut,
        amountOutUSD
    }
    }
    `
    const data = await (await client.query(query).toPromise()).data["swaps"]
    return data
}

module.exports = {
    getTransactions
}