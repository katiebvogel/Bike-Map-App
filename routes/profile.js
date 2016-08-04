var router = require('express').Router();
var path = require('path');
var multer = require('multer');
var images = multer({dest: './images'});

var bikeRoute = require('../models/route');

router.get('/', function(request, response){
  console.log('router get in profile.js', response);
  response.sendFile(path.join(__dirname, '../public/views/profile.html'));
});

router.post('/', function(request, response){
  bikeRoute.create({
    startLocation: request.body.startLocation,
    endLocation: request.body.endLocation,
    comments: request.body.comments,
    location: request.body.location,
    photos: request.body.photos
}, function(err, bikeRoute) {
  if(err){
    console.log(err);
    response.sendStatus(500);
  } else {
    response.send(bikeRoute);
  }
  }); //end Route.create (for a new bike route to be entered into the DB)
}); //end router.post


module.exports = router;
