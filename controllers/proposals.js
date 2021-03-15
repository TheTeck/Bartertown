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
        res.render('proposals/index', { name: req.user.username, proposals })
    } catch (err) {
        res.send(err)
    }
}

function newProposal (req, res) {
    res.render('proposals/new', { name: req.user.username })
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
        // Get the bids attached to this proposal
        const bids = await Bid.find({ parentProposal: req.params.id })
        
        res.render('proposals/show', { name: req.user.username, proposal, bids, isOwner: proposal.owner.equals(req.user._id) })    
    } catch (err) {
        res.send(err)
    }
}

async function deleteProposal (req, res) {
    try {
        // Get the proposal from the model and delete it
        await Proposal.findByIdAndDelete(req.params.id)
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}