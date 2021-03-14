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
        checkFileType(file, cb)
    }
}).single('image')

router.get('/proposals', proposalsCtlr.index)
router.get('/proposals/new', proposalsCtlr.new)
router.get('/proposals/:id', proposalsCtlr.show)
router.post('/proposals/', uploader, proposalsCtlr.create)
router.delete('/proposals/:id', proposalsCtlr.delete)

// The middleware for multer
async function uploader (req, res, next) {
    const user = await User.findById(req.user._id)

    upload (req, res, function(err) {
        if (err) {
            res.render('proposals/new', { name: user.username, msg: err })
        } else {
            req.body.file = req.file
            return next()
        }
    })
}

// Helper function for file validation
function checkFileType (file, cb) {
    // Allow extensions
    const filetypes = /jpeg|jpg|png|gif/
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
    // Check mime type
    const mimetype = filetypes.test(file.mimetype)

    if (mimetype && extname) {
        return cb(null, true)
    } else {
        cb ('Error: Images Only!')
    }
}

module.exports = router