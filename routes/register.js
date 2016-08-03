var router = require('express').Router();
var path = require('path');
var multer = require('multer');
var images = multer({dest: 'images/'});

var User = require('../models/user');

router.get('/', function(request, response){
  response.sendFile(path.join(__dirname, '../public/views/register.html'));
});

router.post('/', function(request, response){
  User.create({
    username: request.body.username,
    password: request.body.password,
    about: request.body.about
    // profilePic: request.files['avatar'][0]
  }, function(err, user){
    if(err) {
      console.log(err);
      response.sendStatus(500);
    } else {

      response.send(user);
    }
  });
});


module.exports = router;
