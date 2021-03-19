const Bid = require('../models/bid')
const Deal = require('../models/deal')
const Proposal = require('../models/proposal')

module.exports = {
    new: newDeal,
    create,
    show,
    delete: deleteDeal
}


async function newDeal (req, res) {
    try {
        // Render a new page with both proposal and bid
        const bid = await Bid.findById(req.params.id)
        const proposal = await Proposal.findById(bid.parentProposal)
        res.render('deals/new', { bid, proposal })
    } catch (err) {
        res.send(err)
    }   
}

async function create (req, res) {
    try {
        // Transfer all the data from the proposal and bid into the
        // new deal document
        const bid = await Bid.findById(req.params.id)
        const proposal = await Proposal.findById(bid.parentProposal)
        const deal = new Deal()
        deal.title = proposal.title
        deal.title2 = bid.title
        deal.description = proposal.description
        deal.description2 = bid.description
        deal.owner = proposal.owner
        deal.owner2 = bid.owner
        deal.ownerName = proposal.ownerName
        deal.ownerName2 = bid.ownerName
        deal.image = proposal.image
        deal.image2 = bid.image
        deal.comments = []
        await deal.save()
        const deals = await Deal.find({})
        // delete old proposal and bid
        await Proposal.findByIdAndDelete({ _id: proposal._id })
        await Bid.findByIdAndDelete({ _id: bid._id})
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}

async function show (req, res) {
    try {
        const deal = await Deal.findById(req.params.id)
        res.render('deals/show', { deal })
    } catch (err) {
        res.send(err)
    }
}

async function deleteDeal (req, res) {
    try {
        await Deal.findByIdAndDelete(req.params.id)
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}