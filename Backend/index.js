const {getConnection} = require("./db/dbconnect")
const {ethereumEvent} = require("./events/events")
const userRouter = require("./routes/users")
const challengeRouter = require("./routes/challenges")
const otherRouter = require("./routes/others")
const express = require('express')
var cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
const port = 3001
getConnection()
ethereumEvent()

app.use("/user", userRouter)
app.use("/challenge", challengeRouter)
app.use("/", otherRouter)

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`)
})