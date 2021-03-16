const Proposal = require('../models/proposal')
const User = require('../models/user')
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
        res.render('bids/new', { name: req.user.username, proposal })
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
        console.log(bid, req.params.id)
        res.redirect(`/proposals/${req.params.id}`)
    } catch (err) {
        res.send(err)
    }
}

async function show (req, res) {
    try {
        // Get the bid to show in view
        const bid = await Bid.findById(req.params.id)
        console.log('showing bid')
        res.render('bids/show', { name: req.user.username, bid , isOwner: req.user._id.equals(bid.owner) })
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