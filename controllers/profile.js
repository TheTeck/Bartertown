
const User = require('../models/user');

module.exports = {
    show,
    edit,
    update
}

async function show (req, res) {
    try {
        const user = await User.findById(req.user._id)
        const name = user.username ? user.username : user.email
        res.render('profile/index', { user: req.user, name: name })
    } catch (err) {
        res.send(err)
    }     
}

async function edit (req, res) {
    try {
        const user = await User.findById(req.user._id)
        res.render('profile/edit', { name: user.username })
    } catch (err) {
        res.send(err)
    }
}

async function update (req, res) {
    try {
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
