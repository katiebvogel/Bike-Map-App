var router = require('express').Router();
var path = require('path');
var multer = require('multer');
var images = multer({dest: 'images/'});

var User = require('../models/user');
var bikeRoute = require('../models/route');


router.get('/profile', function(request, response){
  console.log('router get in profile.js', response);
  response.sendFile(path.join(__dirname, '../public/views/profile.html'));
});


//this SHOULD? send to display the user's profile information on their page load after logging in
router.get('/users', function(request, response){
  User.find({}, function(error, user){
  if(error) throw error;
  console.log('user profile data', response);
  response.send(user);
});
});




router.post('/bikeRoutes', images.single('file'), function(request, response){
  console.log(request.file);
  // bikeRoute.create();
  // User.find({}).populate('routes').exec(function(err, user){
  //   console.log(user);

// });


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
bikeRoute.save(function(err){
  if(err){
    console.log('error creating bike route', err);
    response.sendStatus(500);
  } else {
    console.log('successfully saved new bike route');
    response.sendStatus(200);
  }
});
}); //end router.post


// router.put('/editWithId/:id/:routes?', function(request, response){
//
//    var id = request.params.id;
//    var routes = request.params.routes;
//
//   console.log(request.params.id);
//
//   User.findById(request.params.id, functioner(err, user){
//     if(err){
//       console.log(err);
//       response.sendStatus(500);
//     } else {
//       User.populate('routes').exec(function(err, user){
//         console.log(user);
//     }
//   })
// });

module.exports = router;
