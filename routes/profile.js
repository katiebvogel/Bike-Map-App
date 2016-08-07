var router = require('express').Router();
var path = require('path');
var multer = require('multer');
var images = multer({dest: 'images/'});

var User = require('../models/user');
var bikeRoute = require('../models/route');


var vm = this;

router.get('/profile', function(request, response){
  // console.log('router get in profile.js', response);
  response.sendFile(path.join(__dirname, '../public/views/profile.html'));
});


//this SHOULD? send to display the user's profile information on their page load after logging in
router.get('/users', function(request, response){
  vm.userId = request.user._id;
  var username = request.user.username;
  var about = request.user.about;
  var profilePic = request.user.profilePic;

  console.log('This user id: ', vm.userId,
    'This user username: ', username,
    'This user about: ', about,
    'picture: ', profilePic);


  User.findOne({_id: vm.userId}, function(error, user){
      if(error) throw error;
      console.log('user profile data', user);
      response.send(user);
});
return vm.userId;
});




router.post('/', images.single('file'), function(request, response){
  // console.log(request.file);
  //
  // console.log('profile.js checking out the request body:', request.body);
  var routeObj = {
    startLocation: request.body.startLocation,
    endLocation: request.body.endLocation,
    comments: request.body.comments,
    routePic: request.file.filename};

    bikeRoute.model.create(routeObj, function(error, bikeRoute) {

  if (error) throw error;

User.findOne({_id: vm.userId}, function(error, user){

  // console.log('this is the current user trying to add a bike route: ', user);
  // console.log('this is a route trying to be added', routeObj);
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




module.exports = router;
