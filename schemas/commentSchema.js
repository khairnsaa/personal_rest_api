const mongoose = require('mongoose')

const commentsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Comment", commentsSchema)