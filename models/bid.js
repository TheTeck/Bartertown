const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    owner: String,
    content: String
})

const bidSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    parentProposal: {
        type: Schema.Types.ObjectId,
        ref: 'Proposal'
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerName: String,
    image: {
        data: Buffer,
        contentType: String
    },
    newBid: {
        type: Boolean,
        default: false
    },
    comments: [commentSchema]
})

module.exports = mongoose.model('Bid', bidSchema)