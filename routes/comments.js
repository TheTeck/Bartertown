const express = require('express')
const router = express.Router()
const commentsCtlr = require('../controllers/comments')

router.post('/proposals/:id/comments', isLoggedIn, commentsCtlr.createProposal)
router.post('/bids/:id/comments', isLoggedIn, commentsCtlr.createBid)
router.post('/deals/:id/comments', isLoggedIn, commentsCtlr.createDeal)

// custom authorization middleware function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    // req.isAuthenticated function is given to us by passport
    res.redirect('/auth/google');
}

module.exports = router