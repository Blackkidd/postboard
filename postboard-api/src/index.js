const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const { DATABASEURL } = require("./config")
const cors = require('cors')
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

app.get("/", (req, res)=>{
    res.send("API is Running...")
})

app.listen(5000, ()=>{
    console.log("server is running")
})
