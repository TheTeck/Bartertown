var router = require('express').Router();
const passport = require('passport');
const profileCtlr = require('../controllers/profile')


router.get('/', profileCtlr.show)
router.get('/edit', profileCtlr.edit)
router.put('/', profileCtlr.update)


module.exports = router