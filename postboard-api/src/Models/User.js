const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    phoneNum: String,
}) 

module.exports = mongoose.model('User', UserSchema)