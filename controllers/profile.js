
const User = require('../models/user');

module.exports = {
    show,
    edit,
    update
}

function show (req, res) {

    console.log(req.user._id)
    User.findById(req.user._id, function(err, user) {
        const name = user.username ? user.username : user.email
        console.log(user, '<<<<')
        res.render('profile/index', {
            user: req.user,
            name: name
        })
    })      
}

function edit (req, res) {
    User.findById(req.user._id, function(err, user) {
        res.render('profile/edit', {
            name: user.username
        })
    })
}

function update (req, res) {
    User.findById(req.user._id, function(err, user) {
        user.username = req.body.username
        user.email = req.body.email
        user.save(function(err) {
            res.redirect('/profile')
        })
        
    })
}
