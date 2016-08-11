var router = require('express').Router();

var passport = require('passport');
var path = require('path');
var mongoose = require('mongoose');


router.get('/', function(request, response){
  console.log('Here is a message from login.js router');
  response.send(request.isAuthenticated());
});

router.get('/passportSuccess', function(request, response){
  response.sendStatus(200);
});

router.get('/passportFailure', function(request, response){
  response.sendStatus(401);
});

router.post('/',  passport.authenticate('local', {
  successRedirect: '/login/passportSuccess',
  failureRedirect: '/login/passportFailure'
}));



module.exports = router;
