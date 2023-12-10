const mongoose = require("mongoose")

// Schema to store the mapping of wallet_address to nick_name
const NicknameSchema = new mongoose.Schema({
    wallet_address : String,
    nick_name: String,
    push_address : String
})
const nickNameSchema = mongoose.model("NickName", NicknameSchema)

//Schema to store the challenges and their public inputs
const ChallengeSchema = new mongoose.Schema({
    challenge_id : Number,
    challenger_address : String,
    platform : String,
    profit_percentage : Number,
    holdings : [String]
})
const challengeSchema = mongoose.model("Challenge", ChallengeSchema)

//Schema to store the proofs generated
const ProofSchema = new mongoose.Schema({
    challenge_id : Number,
    ipfs_proof : String,
    prover_nickname : String,
    actualProfit : Number,
    is_proved : Boolean
})
const proofSchema = mongoose.model("Proof", ProofSchema)

module.exports = {
    nickNameSchema,
    challengeSchema,
    proofSchema
}
