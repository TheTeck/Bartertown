const express = require('express')
const router = express.Router()
const commentsCtlr = require('../controllers/comments')

router.post('/proposals/:id/comments', commentsCtlr.createProposal)
router.post('/bids/:id/comments', commentsCtlr.createBid)

module.exports = router