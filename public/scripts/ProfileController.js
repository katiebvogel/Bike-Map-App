 angular.module('bikeApp').controller('ProfileController', function($http, $location, Upload, $rootScope, geolocation){

//gservice, userService?


// console.log('ProfileController is loaded');

  var vm = this;

  vm.active = true;



//below is our call to get the user information which will be displayed on profile page load.
// var userData = {};

vm.getUserData = function(){
  $http.get('/profile/users').then(
    function(response){

    console.log('getting profile data', response);
    vm.username = response.data.username;
    vm.about = response.data.about;
    vm.profilePic = response.data.profilePic;

    return(vm.username, vm.about, vm.profilePic);

  },
  function(response){
    console.log('error getting profile data', response);
  });

};

vm.getUserData();



// ----  this is the end of the block that gets data from server for display on the page

//block below to display simple map on a click next to create a new bike route form
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var map;
vm.initMap = function() {
  directionsDisplay = new google.maps.DirectionsRenderer();
   var chicago = new google.maps.LatLng(44.978, -93.265);
   var mapOptions = {
     zoom:7,
     center: chicago
   }
   map = new google.maps.Map(document.getElementById('map'), mapOptions);
   directionsDisplay.setMap(map);
 }
  // map = new google.maps.Map(document.getElementById('map'), {
  //   center: {lat: 44.978, lng: -93.265},
  //   zoom: 8
  // });
// };

vm.calcRoute = function() {
  var start = document.getElementById('start').value;
  var end = document.getElementById('end').value;
  var request = {
    origin: start,
    destination: end,
    travelMode: 'BICYCLING'
  };
  directionsService.route(request, function(result, status) {
    if (status == 'OK') {
      directionsDisplay.setDirections(result);
    }
  });
};

//end block about displaying a google map

vm.formData = {};



var coords = {};
var lat = 0;
var long = 0;

vm.formData.latitude = 44.978;
vm.formData.longitude = -93.265;

// //get the user's actual coordinates based on HTML5 window load
//
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
//
// //now to actually listen for that "CLICK"
//
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
    url: '/profile',
    data: {file: file, startLocation: vm.formData.startLocation, endLocation: vm.formData.endLocation, comments: vm.formData.comments}

  }).then(function(response){
    console.log('create route', response.data);
  },  function(response) {
    console.log(('Error uploading', response.status));
  });
};

vm.newBikeRoute = function(){
vm.uploadFile(vm.formData.routePic);
};

// end the block about adding a new bike route




//begin a block that gets saved bike route information back on the user's profile //
vm.getUserRoutes = function(){
  $http.get('/profile/users').then(
    function(response){
    console.log('getting user saved route data', response);

    vm.userRoutes = response.data.routes;
    console.log('userRoutes: ', vm.userRoutes);
      return (vm.userRoutes);

  },
  function(response){
    console.log('error getting user routes data', response);
  });


};

vm.getUserRoutes();


//end the block about getting bike route information back on user's profile


//add a delete route function and button
// vm.removeAction = function(userRouteId){
//   console.log('you chose to remove');
//   $http.delete('/profile/removeWithId/' + bikeRoute.model._id ).then(function(response){
//     vm.userRoute = response.data;
//   }, function(response){
//     console.log('failure deleting');
//   })
// } ;  //end remove button click function





// try to get a map to display on Create New Route form panel




// navigator.geolocation;
// navigator.geolocation.getCurrentPosition();
// var latitude = position.coords.latitude;
// var longitude = position.coords.longitude;
// var map;
//
//         function initMap() {
//             map = new google.maps.Map(document.getElementById('map'), {
//                 center: {
//                     lat: 44.9778,	//	Default Minneapolis centered
//                     lng: -93.2650
//                 },
//                 zoom: 10,
//                 disableDefaultUI: true,	// gets rid of google zoom and street view buttons
//
// // var infoWindow = new google.maps.InfoWindow({map: map}); commented out to get rid of ugly popup
//
//             // Try HTML5 geolocation.
//             if (navigator.geolocation) {
//                 navigator.geolocation.getCurrentPosition(function(position) {
//                     var pos = {
//                         lat: position.coords.latitude,
//                         lng: position.coords.longitude
//                     };
//
//                     // infoWindow.setPosition(pos);
//                     // infoWindow.setContent('Location found.');
//                     map.setCenter(pos);
//                 }, function() {
//                     handleLocationError(true, infoWindow, map.getCenter());
//                 });
//             } else {
//                 // Browser doesn't support Geolocation
//                 handleLocationError(false, infoWindow, map.getCenter());
//             }
//         }
//
//         function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//             infoWindow.setPosition(pos);
//             infoWindow.setContent(browserHasGeolocation ?
//                 'Error: The Geolocation service failed.' :
//                 'Error: Your browser doesn\'t support geolocation.');
//         }

});// end controller
