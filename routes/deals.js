const express = require('express')
const router = express.Router()
const dealsCtlr = require('../controllers/deals')

router.get('/:id/new', dealsCtlr.new)
router.get('/:id', dealsCtlr.show)
router.post('/:id', dealsCtlr.create)
router.delete('/:id', dealsCtlr.delete)

module.exports = router