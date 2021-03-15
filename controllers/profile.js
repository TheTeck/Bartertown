const User = require('../models/user');
const Proposal = require('../models/proposal')
const Bid = require('../models/bid')

module.exports = {
    show,
    edit,
    update
}

async function show (req, res) {
    try {
        // Get user name for nav
        const user = await User.findById(req.user._id)
        if (!user.username) user.username = user.email

        // Get user's proposals to display
        const proposals = await Proposal.find({ owner: req.user._id })

        // Get user's bids on other users' proposals
        const bids = await Bid.find({ owner: req.user._id })
        
        res.render('profile/index', { name: user.username, proposals, bids })
    } catch (err) {
        res.send(err)
    }     
}

function edit (req, res) {
    res.render('profile/edit', { name: req.user.username })
}

async function update (req, res) {
    try {
        // Update values of user's username and email
        const user = await User.findById(req.user._id)
        user.username = req.body.username
        user.email = req.body.email
        await user.save(function(err) { 
            res.redirect('/profile')
        })    
    } catch (err) {
        res.send(err)
    }
}
