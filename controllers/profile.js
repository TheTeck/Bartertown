
const User = require('../models/user');

module.exports = {
    show
}

function show (req, res, next) {

    console.log(req.user._id)
    User.findById(req.user._id, function(err, user) {
        console.log(user, '<<<<')
        res.render('profile/index', {
            user: req.user,
            name: user.name ? user.name : user.email
        })
    })      
}