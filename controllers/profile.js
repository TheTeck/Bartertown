const User = require('../models/user');
const Proposal = require('../models/proposal')

module.exports = {
    show,
    edit,
    update
}

async function show (req, res) {
    try {
        // Get user name for nav
        const user = await User.findById(req.user._id)
        const name = user.username ? user.username : user.email

        // Get user's proposals to display
        const proposals = await Proposal.find({owner: req.user._id})
        
        res.render('profile/index', { name: name, proposals })
    } catch (err) {
        res.send(err)
    }     
}

async function edit (req, res) {
    try {
        // Get user name for nav
        const user = await User.findById(req.user._id)
        res.render('profile/edit', { name: user.username })
    } catch (err) {
        res.send(err)
    }
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
