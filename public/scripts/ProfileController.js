 angular.module('bikeApp').controller('ProfileController', function($http, $location, Upload, $rootScope, geolocation){

//gservice, userService?

  var vm = this;
  //use vm.active = true in order to keep the saved routes in a collapsed state on page load
  vm.active = true;
  vm.formData = {};
  vm.profilePic = [];

//below is our call to get the user information which will be displayed on profile page load.
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
var stepDisplay;
var markerArray = [];
var mapOptions = {};
var myRoute = [];
vm.directionsPanel = [];

vm.initMap = function() {
  var markerArray = [];

          // Instantiate a directions service.
          var directionsService = new google.maps.DirectionsService;

          // Create a map and center it on Minneapolis
          map = new google.maps.Map(document.getElementById('map'), {
              zoom:7,
              center: {lat: 44.978, lng: -93.265}
            });

          // Create a renderer for directions and bind it to the map.
          var directionsDisplay = new google.maps.DirectionsRenderer({map: map});
          directionsDisplay.setPanel(document.getElementById('directionsPanel'));
          // Instantiate an info window to hold step text.
          var stepDisplay = new google.maps.InfoWindow;

          // Display the route between the initial start and end selections.
          calculateAndDisplayRoute(
              directionsDisplay, directionsService, markerArray, stepDisplay, map);
          // Listen to change events from the start and end lists.
          var onChangeHandler = function() {
            calculateAndDisplayRoute(
                directionsDisplay, directionsService, markerArray, stepDisplay, map);
          };
          document.getElementById('start').addEventListener('change', onChangeHandler);
          document.getElementById('end').addEventListener('change', onChangeHandler);
        }

        function calculateAndDisplayRoute(directionsDisplay, directionsService,
            markerArray, stepDisplay, map) {
          // First, remove any existing markers from the map.
          for (var i = 0; i < markerArray.length; i++) {
            markerArray[i].setMap(null);
          }

          // Retrieve the start and end locations and create a DirectionsRequest using
          // Biking directions.
          directionsService.route({
            origin: document.getElementById('start').value,
            destination: document.getElementById('end').value,
            travelMode: 'BICYCLING'
          }, function(response, status) {
            // Route the directions and pass the response to a function to create
            // markers for each step.
            if (status === 'OK') {
              directionsDisplay.setDirections(response);
              showSteps(response, markerArray, stepDisplay, map);
            } else {
              window.alert('Directions request failed due to ' + status);
            }
          });
        }

        function showSteps(directionResult, markerArray, stepDisplay, map) {
          // For each step, place a marker, and add the text to the marker's infowindow.
          // Also attach the marker to an array so we can keep track of it and remove it
          // when calculating new routes.
          var myRoute = directionResult.routes[0].legs[0];
          for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = markerArray[i] = markerArray[i] || new google.maps.Marker;
            marker.setMap(map);
            marker.setPosition(myRoute.steps[i].start_location);
            attachInstructionText(
                stepDisplay, marker, myRoute.steps[i].instructions, map);
          }
        }

        function attachInstructionText(stepDisplay, marker, text, map) {
          google.maps.event.addListener(marker, 'click', function() {
            // Open an info window when the marker is clicked on, containing the text of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map, marker);
          });
        }

//end block about displaying a google map that allows for a search and display







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
  console.log(vm.formData.routePic1);
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
vm.uploadFile(vm.formData.routePic1);
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




// add a delete route function and button
vm.removeAction = function(route){
  console.log('you chose to remove', route);
  $http.delete('/profile/removeWithId/' + route ).then(function(response){
    vm.route = response.data;
    console.log(response);
  }, function(response){
    console.log('failure deleting');
  })
};
   //end remove button click function



// add a LOOKUP routes function and button
//first, send the data that is being used for the search
vm.startSearch = '';
vm.endSearch = '';

vm.searchAction = function(){
  console.log('startSearch', vm.startSearch);
  var sendData = {};
  sendData.startSearch = vm.startSearch;
  sendData.endSearch = vm.endSearch;

 $http.put('/profile/keywordsearch', sendData).then(handleSuccess, handleFailure);
  console.log('you chose to lookup routes', sendData);

};//end searchbutton click function

function handleSuccess(response) {
  console.log('Success posting the keyword search', response);
  vm.searchRoutes = response.data;
};
function handleFailure(response) {
  console.log('Failure posting to the keyword search', response);
};





});// end controller
