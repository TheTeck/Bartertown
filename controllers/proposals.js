const User = require('../models/user');
const Proposal = require('../models/proposal')

module.exports = {
    new: newProposal,
    create,
    show
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
        res.render('proposals/show', { name: user.username, proposal})
    } catch (err) {
        res.send(err)
    }
}