const { BarretenbergBackend }  = require('@noir-lang/backend_barretenberg');
const { Noir }  =  require('@noir-lang/noir_js');
const circuit = require('./circuits.json');
const { getChallengeById } = require('../db/dbconnect');
const {ethers} = require("ethers")
String.prototype.hashCode = function() {
    var hash = 0,
      i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr = this.charCodeAt(i);
      hash = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  }

async function generateProof(challenge_id, solver_nickname, actual_profit_percentage, hashed_message, pub_key_x_solver,pub_key_y_solver, signature_solver){
    const backend = new BarretenbergBackend(circuit);
    const noir = new Noir(circuit, backend);
    const challenge_details = await getChallengeById(challenge_id)
    const input = {
        challenger_address : challenge_details.challenger_address,
        platform : challenge_details.platform,
        holdings : challenge_details.holdings,
        expected_profit_percentage : challenge_details.profit_percentage,
        actual_profit_percentage : actual_profit_percentage,
        solver_nickname : (solver_nickname.hashCode() < 0) ? solver_nickname.hashCode()*-1 : solver_nickname.hashCode(),
        hashed_message : Object.values(hashed_message),
        pub_key_x_solver : Object.values(pub_key_x_solver),
        pub_key_y_solver : Object.values(pub_key_y_solver),
        signature_solver : Object.values(signature_solver)
    }
    console.log(input)
    const proof = await noir.generateFinalProof(input);
    console.log((solver_nickname.hashCode() < 0) ? solver_nickname.hashCode()*-1 : solver_nickname.hashCode())
    console.log(Buffer.from(proof.proof).toString("hex"))
    return(Buffer.from(proof.proof).toString("hex"))
}

async function getProof(){
  const backend = new BarretenbergBackend(circuit);
    const noir = new Noir(circuit, backend);
    const input = {
      challenger_address : "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      platform : "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      holdings : [
      "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      "0x5E6f063e754Eb36762c4bC3dcDa854c640C77e36",
      ],
      expected_profit_percentage : 500,
      actual_profit_percentage : 600,
      solver_nickname : 1,
      hashed_message : [223,13,20,228,203,52,174,15,63,31,150,62,159,197,107,231,211,221,217,6,235,89,253,8,56,101,41,52,29,32,9,225],
      pub_key_x_solver :[165,178,123,213,13,102,98,207,221,114,165,223,179,150,140,9,13,18,120,142,111,187,65,84,109,250,124,191,137,194,49,119],
      pub_key_y_solver : [110,166,131,66,135,29,153,57,221,100,196,73,18,49,150,48,101,194,75,74,36,215,186,152,206,153,179,112,54,113,4,177],
      signature_solver : [132,100,191,209,126,114,194,237,153,71,214,126,215,93,210,84,148,144,66,12,180,250,156,47,87,104,61,241,14,205,64,119,125,226,188,144,59,161,87,158,232,43,24,17,148,1,245,37,54,234,32,48,115,196,115,123,37,159,178,246,179,214,180,214]
      
    }
    const proof = await noir.generateFinalProof(input)
    console.log(Buffer.from(proof.proof).toString("hex"))
    return(Buffer.from(proof.proof).toString("hex"))
  }


// getProof()
module.exports = {
    generateProof
}