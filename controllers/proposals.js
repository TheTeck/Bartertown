const User = require('../models/user');
const Proposal = require('../models/proposal');
const user = require('../models/user');


module.exports = {
    new: newProposal,
    create,
    show,
    delete: deleteProposal
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
        console.log(req.body.file.filename)
        // Populate the new proposal with data from form
        const proposal = new Proposal(req.body)
        // Tie the proposal to it's owner
        proposal.owner = req.user._id
        // Get the image name from file saved in req.body (appended in router)
        proposal.image = req.body.file.filename
        await proposal.save()
        console.log(proposal.likes, '<<<<<<<<<<<< likes')
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

        // Reroute depending on if it is the user's proposal or not
        if (proposal.owner.equals(req.user._id)) {
            res.render('proposals/show', { name: user.username, proposal, isOwner: true})
        } else {
            res.render('proposals/show', { name: user.username, proposal, isOwner: false})
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