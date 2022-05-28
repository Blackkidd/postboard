const mongoose = require('mongoose')

const BlogSchema = mongoose.Schema({
    title: String,
    author: String,
    description: String,
    comment:[{
        body: String,
        date: Date,
    }],
    date:{
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.Schema('Blog', BlogSchema);