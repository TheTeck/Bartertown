const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    owner: String,
    content: String
})

const proposalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerName: String,
    image: {
        type: String,
        default: 'images/colors.png'
    },
    likes: {
        type: Number,
        default: 0
    },
    views: {
        type: Number,
        default: 0
    },
    comments: [commentSchema]
})

module.exports = mongoose.model('Proposal', proposalSchema)