const axios = require("axios");

async function getDetails(tokenAddresses){
    if (tokenAddresses.length === 0){
        return {}
    }
    const url = "https://api.1inch.dev/token/v1.2/1/custom";

    const config = {
        headers: {
            "Authorization": "Bearer kUANYFgStQYTJUuhHtzyH4os1gjCAHjl"
        },
        params: {
            "addresses": tokenAddresses
        }
    }

    const response = await axios.get(url, config)
    return response.data
}

async function getPrices(tokenAddresses){
    if (tokenAddresses.length === 0){
        return {}
    }
    const url = "https://api.1inch.dev/price/v1.1/1";

    const config = {
        headers: {
            "Authorization": "Bearer kUANYFgStQYTJUuhHtzyH4os1gjCAHjl"
        },
        params: {}
    };
    const body = {
        "tokens": tokenAddresses,
        "currency": "USD"
    };
    
    const response = await axios.post(url, body, config)
    return response.data
}

module.exports = {
    getDetails,
    getPrices
}