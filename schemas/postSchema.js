const mongoose = require('mongoose')
const commentSchema = require('./commentSchema')

const postsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    post: {
        type: String,
        required: true
    },
    comments: [
		{
			type: commentSchema
		},
	],
})

postsSchema.method("toJSON", function () {
	const { _v, _id, ...object } = this.toObject();
	object.id = _id;
	return object;
});

module.exports = mongoose.model("post", postsSchema)