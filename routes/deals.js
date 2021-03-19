const express = require('express')
const router = express.Router()
const dealsCtlr = require('../controllers/deals')

router.get('/:id/new', isLoggedIn, dealsCtlr.new)
router.get('/:id', isLoggedIn, dealsCtlr.show)
router.post('/:id', isLoggedIn, dealsCtlr.create)
router.delete('/:id', isLoggedIn, dealsCtlr.delete)

// custom authorization middleware function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    // req.isAuthenticated function is given to us by passport
    res.redirect('/auth/google');
}

module.exports = router