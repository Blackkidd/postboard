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
mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected', ()=>{
    console.log("connect database success")
})

mongoose.connection.on('error', (error)=>{
    console.log("connect database fail")
})

// Server Start PORT 5000
app.listen(PORT, ()=>{
    console.log("server is running in port",PORT)
})
