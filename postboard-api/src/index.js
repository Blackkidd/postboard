const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors')
const mongoose = require('mongoose')
require("dotenv/config")

// Import Routes here.
const UserRouter = require('./routes/UserRouter')


app.use(cors())
app.use(express.json())

app.use(UserRouter)

app.get("/", (req, res)=>{
    res.send("API is Running...")
})

//Connect to database(mongodb)
mongoose.connect(
    process.env.DB_CONNECTION
)


// Server Start PORT 5000
app.listen(5000, ()=>{
    console.log("server is running")
})

