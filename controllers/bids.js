const Proposal = require('../models/proposal')
const User = require('../models/user')
const Bid = require('../models/bid')

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
        const user = await User.findById(req.user._id)
        res.render('bids/new', { name: user.username, proposal })
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
        // Add the owner's name to the bid for views
        const user = await User.findById(req.user._id)
        bid.ownerName = user.username
        bid.parentProposal = req.params.id
        // Get the image name from file saved in req.body (appended in router)
        bid.image = req.body.file.filename
        await bid.save()
        res.redirect('/proposals')
    } catch (err) {
        res.send(err)
    }
}

async function show (req, res) {
    try {
        // Get the bid to show in view
        const bid = await Bid.findById(req.params.id)
        // Get the user to pass the username
        const user = await User.findById(req.user._id)
        // Determine if user is owner of the bid
        res.render('bids/show', { name: user.username, bid , isOwner: user._id.equals(bid.owner) })
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