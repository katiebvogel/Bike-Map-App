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
  var userId = request.user._id;
  var username = request.user.username;
  var about = request.user.about;
  var profilePic = request.user.profilePic;

  console.log('This user id: ', userId,
    'This user username: ', username,
    'This user about: ', about,
    'picture: ', profilePic);


  User.findOne({_id: userId}, function(error, user){
      if(error) throw error;
      console.log('user profile data', user);
      response.send(user);
});
});




router.post('/', images.single('file'), function(request, response){
  console.log(request.file);
  // bikeRoute.create();
  // User.find({}).populate('routes').exec(function(err, user){
  //   console.log(user);

// });
console.log('profile.js checking out the request body:', request.body);
var routeObj = {
  startLocation: request.body.startLocation,
  endLocation: request.body.endLocation,
  comments: request.body.comments,
  routePic: request.file.filename};

bikeRoute.model.create(routeObj, function(error, bikeRoute) {

  if (error) throw error;

User.findOne({_id: request.user._id}, function(error, user){

  console.log('this is the current user trying to add a bike route: ', user);
  console.log('this is a route trying to be added', routeObj);
  if(!user.routes){
    user.routes = [];
  }
  user.routes.push(bikeRoute);

  user.save(function(error){
    if(error) throw error;
  })
}); //end user.findone
}); //end Route.create (for a new bike route to be entered into the DB)

}); //end router.post


//here's the route that helps render saved bike routes on the user's page
///

// router.get('/routes', function(request, response){
//   var userId = request.user._id;
//   var startLocation = request.routes.startLocation;
//   var endLocation = request.routes.endLocation;
//   var comments = request.routes.comments;
//
//   console.log('This user id: ', userId,
//     'This user startLocation: ', startLocation,
//     'This user endLocation: ', endLocation,
//     'comments: ', comments);
//
//
//   bikeRoute.findOne({_id: userId}, function(error, route){
//       if(error) throw error;
//       console.log('user routes data', route);
//       response.send(route);
// });
// });

///  end the block about routing from the DB back to the controller to render saved bike routes on the page



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
