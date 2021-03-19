var router = require('express').Router();
const passport = require('passport');
const proposals = require('../controllers/proposals');
const proposalsCtlr = require('../controllers/proposals')
const multer = require('multer')
const path = require('path')
const User = require('../models/user')

// Set storage engine
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
  
// Initialize upload
const upload = multer ({
    storage,
    limits: { fileSize: 1000000 },
    fileFilter: function(req, file, cb) {
        // Allow extensions
        const filetypes = /jpeg|jpg|png|gif/
        // Check extension
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
        // Check mime type
        const mimetype = filetypes.test(file.mimetype)
        // Need mimetype for data model
        req.body.mimetype = file.mimetype

        if (mimetype && extname) {
            return cb(null, true)
        } else {
            cb ('Error: Images Only!')
        }
    }
}).single('image')


router.get('/', isLoggedIn, proposalsCtlr.index)
router.get('/new', isLoggedIn, proposalsCtlr.new)
router.get('/:id', isLoggedIn, proposalsCtlr.show)
router.post('/', uploader, isLoggedIn, proposalsCtlr.create)
router.delete('/:id', isLoggedIn, proposalsCtlr.delete)


// The middleware for multer
function uploader (req, res, next) {

    upload (req, res, function(err) {
        if (err) {
            res.render('proposals/new', { name: req.user.username, msg: err })
        } else {
            req.body.file = req.file
            return next()
        }
    })
}

// custom authorization middleware function
function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) return next();
    // req.isAuthenticated function is given to us by passport
    res.redirect('/auth/google');
}

module.exports = router