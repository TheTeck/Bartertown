const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
        type: String,
        default: 'images/colors.png'
    },
    likes: {
        type: Number,
        default: 0
    }
})

module.exports = mongoose.model('Bid', bidSchema)