const ethers = require("ethers");
const contractABI = require("./abi.json");
const { addChallenge } = require("../db/dbconnect");

async function ethereumEvent() {
  const contractAddress = "0x634F9Bc798A228C6Ed8fD4A14A2b907498146809";
  const provider = new ethers.providers.WebSocketProvider(
    `wss://eth-sepolia.g.alchemy.com/v2/MkqfsRsB8VOWDzaA_1xXPlJQlVc1njUr`
  );
  const contract = new ethers.Contract(contractAddress, contractABI, provider);
  console.log("Contract Initialized !!!")
  contract.on("ChallengeCreated", async(challenge_id, challenger, expected_profit, event) => {
    console.log("Got a new challenge ", challenge_id)
    const data = await contract.getChallengeDetails(challenge_id)
    await addChallenge(parseInt(challenge_id), data[0], data[1], [data[2][0],data[2][1],data[2][2],data[2][3],data[2][4]], parseInt(data[3]))
  });
}

module.exports = {ethereumEvent}