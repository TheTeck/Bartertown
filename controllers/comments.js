const Proposal = require('../models/proposal')
const User = require('../models/user')
const Bid = require('../models/bid')
const Deal = require('../models/deal')

module.exports = {
    createProposal,
    createBid,
    createDeal
}


async function createProposal (req, res) {
    // Just push the form value onto the proposal's comments array
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
    // Just push the form value onto the bid's comments array
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

async function createDeal (req, res) {
    // Just push the form value onto the deal's comments array
    try {
        const deal = await Deal.findById(req.params.id)
        deal.comments.push({
            owner: req.user.username,
            content: req.body.content
        })
        await deal.save()
        res.redirect(`/deals/${deal._id}`)
    } catch (err) {
        res.send(err)
    }
}