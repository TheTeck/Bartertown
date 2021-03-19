var router = require('express').Router();
const passport = require('passport');
const profileCtlr = require('../controllers/profile')


router.get('/', isLoggedIn, profileCtlr.show)
router.get('/edit', isLoggedIn, profileCtlr.edit)
router.put('/', isLoggedIn, profileCtlr.update)

// custom authorization middleware function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    // req.isAuthenticated function is given to us by passport
    res.redirect('/auth/google');
}

module.exports = router