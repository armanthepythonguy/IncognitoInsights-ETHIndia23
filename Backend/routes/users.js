const express = require('express')
const {ethers} = require("ethers")
const userRouter = express.Router()
const {getNickName, addNickName} = require("../db/dbconnect")

userRouter.post('/checkUser', async (req, res) => {
    let result = await getNickName(req.body.wallet_address)
    if(result!=null){
      res.send({"res":true, "nick_name":result["nick_name"], "push_address":result["push_address"]})
    }else{
      res.send({"res":false})
    }
})

userRouter.post('/addUser', async (req, res) => {
    const wallet = ethers.Wallet.createRandom()
    await addNickName(req.body.wallet_address, req.body.nick_name, wallet.privateKey)
    res.send({"res":true, "push_address":wallet.privateKey})
})

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

userRouter.post('/nickhash', async(req, res) => {
  res.send({"data":(req.body.nick_name.hashCode() < 0) ? req.body.nick_name.hashCode()*-1 : req.body.nick_name.hashCode()})
})

module.exports = userRouter