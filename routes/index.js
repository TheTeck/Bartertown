var router = require('express').Router();
const passport = require('passport');
const indexCtlr = require('../controllers/index')

// The root route renders our only view
router.get('/', function(req, res) {
  // Where do you want to go for the root route
  res.redirect('/index')
});

router.get('/index', indexCtlr.index)

// Google OAuth login route
router.get('/auth/google', passport.authenticate(
  'google',
  { scope: ['profile', 'email'] }
));

// Google OAuth callback route
router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect : '/profile', // where do you want the client to go after you login 
    failureRedirect : '/index' // where do you want the client to go if login fails
  }
));

// OAuth logout route
router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/index');
});


function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;