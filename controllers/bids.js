const Proposal = require('../models/proposal')
const Bid = require('../models/bid')
const fs = require('fs')
const path = require('path')

module.exports = {
    new: newBid,
    create,
    show,
    delete: deleteBid
}

async function newBid (req, res) {
    try {
        // Pass the proposal we're adding a bid to
        const proposal = await Proposal.findById(req.params.id)
        res.render('bids/new', { proposal })
    } catch (err) {
        res.send(err)
    }
}

async function create (req, res) {
    try {
        // Populate the new bid with data from form
        const bid = new Bid(req.body)
        // Tie the bid to it's owner
        bid.owner = req.user._id
        bid.ownerName = req.user.username
        bid.parentProposal = req.params.id
        // Get the image name from file saved in req.body (appended in router)
        bid.image = {
            data: fs.readFileSync(path.join('public/uploads/' + req.body.file.filename)),
            contentType: req.body.mimetype
        }
        await bid.save()
        
        // Indicate in parent proposal there is a new bid
        const proposal = await Proposal.findById(bid.parentProposal)
        proposal.newBid = true
        await proposal.save()
        console.log( proposal)
        res.redirect(`/proposals/${req.params.id}`)
    } catch (err) {
        res.send(err)
    }
}

async function show (req, res) {
    try {
        // Get the bid to show in view
        const bid = await Bid.findById(req.params.id)
        const proposal = await Proposal.findById(bid.parentProposal)
        res.render('bids/show', { bid , isPropOwner: proposal.owner.equals(req.user.id),
                                 isOwner: req.user._id.equals(bid.owner) })
    } catch (err) {
        res.send(err)  
    }
}

async function deleteBid (req, res) {
    try {
        // Get the bid from the model and delete it
        await Bid.findByIdAndDelete(req.params.id)
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}