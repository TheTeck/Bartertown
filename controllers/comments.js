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

async function createDeal (req, res) {
    try {
        console.log('<-------------------1')
        const deal = await Deal.findById(req.params.id)
        console.log('<-------------------2')
        deal.comments.push({
            owner: req.user.username,
            content: req.body.content
        })
        console.log('<-------------------3')
        await deal.save()
        console.log('<-------------------4')
        res.redirect(`/deals/${deal._id}`)
    } catch (err) {
        res.send(err)
    }
}