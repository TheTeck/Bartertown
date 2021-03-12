const mongoose = require('mongoose')
const Schema = mongoose.Schema

const proposalSchema = new Schema({
    title: String,
    description: String,
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: String,
    likes: Number,
    views: Number
})

module.exports = mongoose.model('Proposal', proposalSchema)