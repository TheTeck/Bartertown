const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema ({
    owner: String,
    content: String
})

const dealSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    title2: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    description2: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    owner2: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    ownerName: String,
    ownerName2: String,
    image: {
        data: Buffer,
        contentType: String
    },
    image2: {
        data: Buffer,
        contentType: String
    },
    comments: [commentSchema]
})

module.exports = mongoose.model('Deal', dealSchema)