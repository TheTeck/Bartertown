var router = require('express').Router();
const bidsCtlr = require('../controllers/bids')


router.get('/proposals/:id/bids/new', bidsCtlr.new)


module.exports = router