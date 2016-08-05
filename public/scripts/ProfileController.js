 angular.module('bikeApp').controller('ProfileController', function($http, $location, Upload, $rootScope, geolocation){

//gservice, userService?


console.log('ProfileController is loaded');

  var vm = this;

vm.message = "Profile stuff is beginning to work with angular"

var userData = {};

vm.getUserData = function(){
  $http.get('/profile/users').then(
    function(response){

    console.log('getting profile data', response);

  },
  function(response){
    console.log('error getting profile data', response);
  });

};

vm.getUserData();





vm.formData = {};



var coords = {};
var lat = 0;
var long = 0;

vm.formData.latitude = 44.978;
vm.formData.longitude = -93.265;

//get the user's actual coordinates based on HTML5 window load

// geolocation.getLocation().then(function(data){
//
//   //set the lat and long to the loaded actual HTML5 coords
//
//   vm.formData.longitude = parseFloat(coords.long).toFixed(3);
//   parseFloat(coords.lat).toFixed(3);
//
//   gservice.refresh(vm.formData.latitude, vm.formData.longitude);
//
// });

//now to actually listen for that "CLICK"

// $rootScope.$on("clicked", function(){
//   vm.$apply(function(){
//
//     vm.formData.latitude = parseFloat(gservice.clickLat).toFixed(3);
//     vm.formData.longitude = parseFloat(gservice.clickLong).toFixed(3);
//   });
// });


vm.uploadFile = function(file){
  console.log('file: ', file);
  console.log(vm.formData.routePic);
  Upload.upload({
    url: '/profile/bikeRoutes',
    data: {file: file, startLocation: vm.formData.startLocation, endLocation: vm.formData.endLocation, comments: vm.formData.comments}
  })
  .then(function(response){
    console.log(response.config.file.name, response.data, 'uploaded');
  },  function(response) {
    console.log(('Error uploading', response.status));
  });
};

vm.newBikeRoute = function(){

vm.uploadFile(vm.formData.routePic);
}

});




//   var bikeRoute = {
//     start: vm.formData.startLocation,
//     finish: vm.formData.endLocation,
//     message: vm.formData.comments,
//     location: [vm.formData.longitude, vm.formData.latitude],
//     photos: vm.file
//   };
//
// $http.post('/', bikeRoute).success(function(data){
//   console.log('logging for the http post in profile controller: ', bikeRoute.username)
// });
// };
// });
  // vm.formData.startLocation = "";
  // vm.formData.endLocation = "";
  // vm.formData.comments = "";
  // vm.formData.photos = "";

  // gservice.refresh(vm.formData.latitude, vm.formData.longitude);
// });
// .error(function(data){
//   console.log('error posting new bike route to DB', data);


 //end new bikeroute function
//
// $http.get('/profile', bikeRoute).then(function(response){
//   console.log(response);
//   vm.routes = ('My Routes.  Starting from: ', response.data.startLocation, ' to: ', response.data.endLocation, '. Here are my comments abou the trip: ', response.data.comments, '. ');
//   return vm.routes;
// });

// });

// });  // end controller
