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


//this SHOULD send to display the user's profile information on their page load after logging in
router.get('/users', function(request, response){
  vm.userId = request.user._id;
  var username = request.user.username;
  var about = request.user.about;
  var profilePic = request.user.profilePic;

  User.findOne({_id: vm.userId}, function(error, user){
      if(error) throw error;
      // console.log('user profile data', user);
      response.send(user);
});
return vm.userId;
});


router.post('/', images.single('file'), function(request, response){
  console.log('post request for the images files', request.file.filename);
  var routeObj = {
    startLocation: request.body.startLocation,
    endLocation: request.body.endLocation,
    comments: request.body.comments,
    routePic1: request.file.filename};

    bikeRoute.model.create(routeObj, function(error, bikeRoute) {

  if (error) throw error;

User.findOne({_id: vm.userId}, function(error, user){
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






//save the updates made to a bikeroute .  see code block below ---
router.put('/updateWithId/:id', function(request, response){
  console.log('made it to the router.put for updating', request.params.id);
  console.log('here is the request.body', request.body);

var id = request.params.id;
var responseData = {};
var userId = request.user._id;

var routeObj = {
  startLocation: request.body.route.startLocation,
  endLocation: request.body.route.endLocation,
  comments: request.body.route.comments
};
console.log("route object", routeObj);

bikeRoute.model.findByIdAndUpdate(id, routeObj, {upsert: true}, function(error, userRoute){
  if(error) {
  console.log('error finding by id for update', error);
  responseData.One = "error";
} else {
  console.log('success in updating bike route in ROUTES collection');
  bikeRoute.model.startLocation = routeObj.startLocation;
  bikeRoute.model.endLocation = routeObj.endLocation;
  bikeRoute.model.comments = routeObj.comments;
//   bikeRoute.model.save(function(error){
//     if(error) throw error;
//   })
//   responseData.One = "success";
}
// response.send(responseData);
});
User.findOne({_id: userId}, function(error, user){
  if(error) {
    console.log('error finding which user you are for the update');
    responseData.Two = 'error finding yourself';
  } else {

    var bikeRouteToEdit = user.routes.id(id);

    bikeRouteToEdit.startLocation = routeObj.startLocation;
    bikeRouteToEdit.endLocation = routeObj.endLocation;
    bikeRouteToEdit.comments = routeObj.comments;

    user.save(function(error){
      if (error){
        response.sendStatus(500);
      } else {
        response.sendStatus(200);
      }

    });
  }
// response.send(responseData);
});


}); //end router.put for the update bikeroute function









//Delete bikeroute function is  below  ---

router.delete('/removeWithId/:id', function(request, response){
  var id = request.params.id;
  var responseData = {};
  console.log('here is the id of the route clicked:', request.params.id);

  bikeRoute.model.findByIdAndRemove(id, function(error, userRoute){
    if(error) {
    console.log('error finding by id for deletion', error);
    responseData.One = "error";
  } else {
    console.log('success in deleting bike route from routes collection');
    responseData.One = "success";
  }
  })
  User.findOne({_id: vm.userId}, function(error, user){
if(error) {
  console.log('error finding which user you are');
  responseData.Two = 'error finding yourself';
} else {
  user.routes.id(id).remove();
  user.save(function(error){
    console.log('error saving user while deleting route');
    responseData.Two = "error saving while deleting route";
  });
}
response.send(responseData);
});

});  //end router.delete






//below is a block that looks up bikeRoutes in the DB according to keywords
//specifically, start or end locations
router.put('/keywordsearch', function(request, response){

  var vm = {};

  vm.start = request.body.startSearch;
  vm.end = request.body.endSearch;

// var likeEnd = new RegExp('.*' + vm.end + '.*');
// var likeStart = new RegExp('.*' + vm.start + '.*');


  bikeRoute.model.find({$or:[{'startLocation':  vm.start}, {'endLocation': vm.end }, {'startLocation': vm.end}, {'endLocation': vm.start} ]}, function(error, bikeRoute){
    if(error){
      response.send('error getting the keyworded routes from DB', error);
    } else  {
      response.send(bikeRoute);
    }
  });
}); //end router.put

// User.find({}, 'routes', function(error, routes){
//     if(error){
//       response.send('error getting the keyworded routes from DB', error);
//     } else  {
//       response.send(routes);
//     }
// });






module.exports = router;
