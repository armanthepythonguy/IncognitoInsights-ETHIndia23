const API = "b9ed43bd.b39ddeb75aab4118a4dd11c947586d0a"
const lighthouse = require('@lighthouse-web3/sdk')
// const fs = require('fs');
// const fetch = require('node-fetch');

async function uploadData(text){
    const response = await lighthouse.uploadText(text, API)
    return response.data.Hash
}

// async function downloadFile(cid){
//     const response = await fetch(`https://gateway.lighthouse.storage/ipfs/${cid}`)
//     return Buffer.from(await response.arrayBuffer()).toString()
//   };

// async function main(){
//     console.log(await downloadFile("QmahWkTD43YDwbD5msz1FCdWAjv619gkckvMCG9GJxwFMV"))
// }

// main()


module.exports=  {
    uploadData
}