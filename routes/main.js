var mongoose = require('mongoose');
var User = require('./models/user.js');

var router = require('express').Router();

router.get('/users', function(request, response){

  var query = User.find({});
  query.exec(function(error, users){
    if(err){
    response.send('error getting from the database', err);
  } else {
    response.json(users);
  }
});

});

app.post('/users', function(request, response){

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
