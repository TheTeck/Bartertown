const User = require('../models/user');
const Proposal = require('../models/proposal')

module.exports = {
    new: newProposal,
    create
}

async function newProposal(req, res) {
    try {
        const user = await User.findById(req.user._id)
        res.render('proposals/new', { name: user.username })
    } catch (err) {
        res.send(err)
    }    
}

async function create(req, res) {
    try {
        const proposal = new Proposal(req.body)
        proposal.owner = req.user._id
        await proposal.save()
        console.log(proposal)
        res.redirect('/profile')
    } catch (err) {
        res.send(err)
    }
}