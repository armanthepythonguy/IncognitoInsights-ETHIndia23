const mongoose = require("mongoose")
const {ethers} = require("ethers")
const {nickNameSchema, challengeSchema, proofSchema} = require("./schema")

async function getConnection(){
    await mongoose.connect("mongodb+srv://ethindia:ethindia@ethindia.wtmpmnm.mongodb.net/?retryWrites=true&w=majority")
    console.log("DB connected succesfully !!!!")
}

async function getNickName(wallet_address){
    const query = nickNameSchema.where({
        wallet_address: wallet_address
    })
    const result = await query.findOne()
    return result
}

async function addNickName(wallet_address, nick_name, push_address){
    const newNickName = new nickNameSchema({
        wallet_address : wallet_address,
        nick_name : nick_name,
        push_address : push_address
    })
    await newNickName.save()
}

async function getChallengeById(challenge_id){
    const query = challengeSchema.where({
        challenge_id : challenge_id
    })
    const result = await query.findOne()
    return result
}

async function getChallenges(){
    const challenges = await challengeSchema.find()
    return challenges
}

async function getMyChallenges(wallet_address){
    const query = challengeSchema.where({
        challenger_address : wallet_address
    })
    let result = await query.find()
    let newres = []
    for(let i=0; i<result.length; i++){
        const proof_query = proofSchema.where({
            challenge_id: result[i].challenge_id
        })
        let proofresult = await proof_query.find()
        let newproofs = []
        for(let j=0; j<proofresult.length; j++){
            const pushquery = nickNameSchema.where({
                nick_name : proofresult[j].prover_nickname
            })
            let res = await pushquery.findOne()
            newproofs.push({
                "challenge_id" : proofresult[j].challenge_id,
                "ipfs_proof" : proofresult[j].ipfs_proof,
                "prover_nickname" : proofresult[j].prover_nickname,
                "actualProfit" : proofresult[j].actualProfit,
                "is_proved" : proofresult[j].is_proved,
                "prover_push_address" : res["push_address"]
            })
        }
        newres.push({
            "challenge_id": result[i].challenge_id,
            "challenger_address": result[i].challenger_address,
            "platform": result[i].platform,
            "profit_percentage": result[i].profit_percentage,
            "holdings": result[i].holdings,
            "proofs" : newproofs
        })
    }
    return newres
}

async function getMyProofs(nick_name){
    const query = proofSchema.where({
        prover_nickname : nick_name
    })
    let result = await query.find()
    let newres = []
    for(let i=0; i<result.length; i++){
        const challengequery = challengeSchema.where({
            challenge_id : result[i].challenge_id
        })
        let challengeres = await challengequery.findOne()
        console.log(ethers.utils.getAddress(challengeres.challenger_address))
        const pushquery = nickNameSchema.where({
            wallet_address : challengeres.challenger_address.toLowerCase()
        })
        let pushres = await pushquery.findOne()
        newres.push({
            "challenge_id" : result[i].challenge_id,
            "ipfs_proof" : result[i].ipfs_proof,
            "prover_nickname" : result[i].prover_nickname,
            "actualProfit" : result[i].actualProfit,
            "is_proved" : result[i].is_proved,
            "prover_push_address" : pushres["push_address"]
        })
    }
    return newres
}

async function addProof(challenge_id, proof, nick_name, actual_profit){
    const newProof = new proofSchema({
        challenge_id : challenge_id,
        ipfs_proof : proof,
        prover_nickname : nick_name,
        actualProfit : actual_profit,
        is_proved : false
    })
    await newProof.save()
}

async function proofVerified(challenge_id, prover_nickname){
    await proofSchema.updateOne({challenge_id: challenge_id, prover_nickname: prover_nickname}, {is_proved:true})
}

async function addChallenge(challenge_id, challenger_address, platform, holdings, expected_profit){
    const newChallenge = new challengeSchema({
        challenge_id : challenge_id,
        challenger_address : challenger_address,
        platform : platform,
        profit_percentage : expected_profit,
        holdings : holdings
    })
    await newChallenge.save()
}

module.exports= {
    getConnection,
    addNickName,
    getNickName,
    getChallengeById,
    getChallenges,
    getMyChallenges,
    addProof,
    addChallenge,
    getMyProofs,
    proofVerified
}
