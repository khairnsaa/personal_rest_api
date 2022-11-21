const mongoose = require('mongoose')

const postsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("post", postsSchema)