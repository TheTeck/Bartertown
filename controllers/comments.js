const Proposal = require('../models/proposal')
const User = require('../models/user')
const Bid = require('../models/bid')

module.exports = {
    createProposal,
    createBid
}


async function createProposal (req, res) {
    try {
        const proposal = await Proposal.findById(req.params.id)
        proposal.comments.push( {
            owner: req.user.username,
            content: req.body.content
        })
        await proposal.save()
        res.redirect(`/proposals/${proposal._id}`)
    } catch (err) {
        res.send(err)
    }
}

async function createBid (req, res) {
    try {
        const bid = await Bid.findById(req.params.id)
        bid.comments.push( {
            owner: req.user.username,
            content: req.body.content
        })
        await bid.save()
        res.redirect(`/bids/${bid._id}`)
    } catch (err) {
        res.send(err)
    }
}