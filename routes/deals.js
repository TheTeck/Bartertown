const express = require('express')
const router = express.Router()
const dealsCtlr = require('../controllers/deals')

router.get('/:id/new', dealsCtlr.new)

module.exports = router