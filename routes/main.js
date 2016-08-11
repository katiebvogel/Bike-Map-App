var mongoose = require('mongoose');
var User = require('../models/user.js');

var router = require('express').Router();

router.get('/', function(request, response){

  //let's see what it looks like to Get a user with a route associated
  // console.log('Requesting user', request.user);

  var query = User.find({});
  query.exec(function(error, users){
    if(err){
    response.send('error getting from the database', err);
  } else {
    response.json(users);
  }
});

});

router.post('/register', function(request, response){

  var newuser = new User(request.body);

  newuser.save(function(err){
    if(err){
      response.send('error posting to DB', err)
    } else {
      response.json(request.body);
    }
  });
});



module.exports = router;
