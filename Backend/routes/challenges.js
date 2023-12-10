const express = require('express')
const challengeRouter = express.Router()
const {getChallenges, getMyChallenges, getMyProofs, proofVerified} = require("../db/dbconnect")

challengeRouter.post('/getChallenges', async(req, res) => {
    const result = await getChallenges()
    res.send({"data":result})
})
  
challengeRouter.post('/getMyChallenges', async(req, res) => {
    const result = await getMyChallenges(req.body.wallet_address)
    res.send({"data":result})
})

challengeRouter.post('/getMyProofs', async(req, res) => {
    const result = await getMyProofs(req.body.nick_name)
    res.send({"data":result})
})

challengeRouter.post('/proofVerified', async(req, res) => {
    await proofVerified(req.body.challenge_id, req.body.nick_name)
    res.send({"data":true})
})

module.exports = challengeRouter