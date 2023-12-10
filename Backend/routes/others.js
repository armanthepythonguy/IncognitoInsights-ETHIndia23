const express = require('express')
const otherRouter = express.Router()
const {calculateProfit} = require("../utils/process")
const {addProof} = require("../db/dbconnect")
const {generateProof} = require("../circuit-proof/generateProof")
const {uploadData} = require("../db/lighthouse")

otherRouter.post('/calculateProfit', async (req, res) => {
    let data = await calculateProfit(req.body.user_address)
    res.send({"data": data})
})
  
otherRouter.post('/generateProof', async(req, res) => {
    try {
        const proof = await generateProof(req.body.challenge_id, req.body.nick_name, req.body.actual_profit, req.body.hashed_message, req.body.pub_key_x_solver, req.body.pub_key_y_solver, req.body.signature_solver)
        const ipfs_hash = await uploadData(proof)
        await addProof(req.body.challenge_id, ipfs_hash, req.body.nick_name, req.body.actual_profit)
        res.send({"res":true}) 
    } catch (error) {
        console.log(error)
        res.send({"res":false}) 
    }
})

module.exports = otherRouter