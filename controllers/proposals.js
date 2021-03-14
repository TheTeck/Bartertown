const User = require('../models/user');
const Proposal = require('../models/proposal');
const Bid = require('../models/bid');



module.exports = {
    index,
    new: newProposal,
    create,
    show,
    delete: deleteProposal
}

async function index (req, res) {
    try {
        // Getting all of the proposal to view
        const proposals = await Proposal.find({})
        // Just getting the username for the nav
        const user = await User.findById(req.user._id)
        res.render('proposals/index', { name: user.username, proposals })
    } catch (err) {
        res.send(err)
    }
}

async function newProposal (req, res) {
    try {
        // Just getting the username for the nav
        const user = await User.findById(req.user._id)
        res.render('proposals/new', { name: user.username })
    } catch (err) {
        res.send(err)
    }    
}

async function create (req, res) {
    try {
        // Populate the new proposal with data from form
        const proposal = new Proposal(req.body)
        // Tie the proposal to it's owner
        proposal.owner = req.user._id
        // Add the owner's name to the proposal for views
        const user = await User.findById(req.user._id)
        proposal.ownerName = user.username
        // Get the image name from file saved in req.body (appended in router)
        proposal.image = req.body.file.filename
        await proposal.save()
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}

async function show (req, res) {
    try {
        // Get the proposal user just clicked on
        const proposal = await Proposal.findById(req.params.id)
        // Just getting the username for the nav
        const user = await User.findById(req.user._id)
        // Get the bids attached to this proposal
        const bids = await Bid.find({ parentProposal: req.params.id })
        // Reroute depending on if it is the user's proposal or not
        if (proposal.owner.equals(req.user._id)) {
            res.render('proposals/show', { name: user.username, proposal, bids, isOwner: true})
        } else {
            res.render('proposals/show', { name: user.username, proposal, bids, isOwner: false})
        }        
    } catch (err) {
        res.send(err)
    }
}

async function deleteProposal (req, res) {
    try {
        // Get the proposal from the model and delete it
        await Proposal.findByIdAndDelete(req.params.id)
        // Just getting the username for the nav
        const user = await User.findById(req.user._id)
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}