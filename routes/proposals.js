var router = require('express').Router();
const passport = require('passport');
const proposals = require('../controllers/proposals');
const proposalsCtlr = require('../controllers/proposals')


router.get('/new', proposalsCtlr.new)
router.get('/:id', proposalsCtlr.show)
router.post('/', proposalsCtlr.create)



module.exports = router