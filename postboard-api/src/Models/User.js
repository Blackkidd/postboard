const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phoneNum: String,
    // postdetail:{
    //     title: String,
    //     detail: String,
    //     comment: String,
    //     date:{
    //         type: Date, 
    //         default: Date.now
    //     }
    // }
}) 

module.exports = mongoose.model('User', UserSchema)