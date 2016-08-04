angular.module('bikeApp').factory('gservice', function($rootScope, $http){

var googleMapService = {};
googleMapService.clickLat = 0;
googleMapService.clickLong = 0;

var locations = [];

var selectedLat = 44.978;
var selectedLong = -93.265;

//Functions provided by the geoservice

//this will start by refreshing the map with new data
googleMapService.refresh = function(latitude, longitude){

  locations = [];
//set the selected lat and long equal to the ones provided on the refresh call
  selectedLat = latitude;
  selectedLong = longitude;

  $http.get('/profile').success(function(response){
    locations = convertToMapPoints(response);

    initialize(latitude, longitude);
  }).error(function(){});
};


var convertToMapPoints = function(response){

  var locations = [];

  //Loop through all the JSON entries provided in the response froM DB

  for(var i=0; i < response.length; i++) {
    var user = response[i];

    //create a popup window for each record
    var contentString =
            '<p><b>Username</b>: ' + user.username +
            '<br><b>About</b>: ' + user.about +
            '</p>';


//convert each of the JSON records into Google maps Location format (Lat and Lng)
//mongoose switches lat and long around..
    locations.push({
      latlon: new google.maps.LatLng(user.bikeRoute.location[1],
    user.bikeRoute.location[0]),
      message: new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 320
      }),
      username: user.username,
      about: user.about

    });

  }

  // now the variable "location" is an array that is populated wiht records stored in a Google Maps format
  return locations;
};  //end conver to map points

//initialize the map
var initialize = function(latitude, longitude) {

  //uses the SELECTED lat, long as a starting point
  var myLatLng = {lat: selectedLat, lng: selectedLong};

//If this map hasn't already been created...
if(!map){

  //create a new map and place in the profile.html page
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 3,
    center: myLatLng
  });


}

  locations.forEach(function(n, i){
    var marker = new google.maps.Marker({
      position: n.latlon,
      map: map,
      title: "Big Map",
      icon: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });

    //for each marker created, add a listener that checkes for a click on the marker (will pop up a window)
    google.maps.event.addListener(marker, 'click', function(e){

      //when clicked, open the message window
      currentSelectedMarker = n;
      n.message.open(map, marker);
    });
  });

//set initial location as a bouncing red marker
var initialLocation = new google.maps.LatLng(latitude, longitude);
var marker = new google.maps.Marker({
  position: initialLocation,
  animation: google.maps.Animation.BOUNCE,
  map: map,
  icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
});

lastMarker = marker;

//function for moving marker to a new selected location..

map.panTo(new google.maps.LatLng(latitude, longitude));

//click on the map somewhere to move the bouncing red marker

google.maps.event.addListener(map, 'click', function(e){
  var marker = new google.maps.Marker({
    position: e.latLng,
    animation: google.maps.Animation.BOUNCE,
    map: map,
    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
  });


//when you click on a new spot on the map to place your red marker, you want to delete the original one
  if(lastMarker){
    lastMarker.setMap(null);
  }
  lastMarker = marker;
  map.panTo(marker.position);

  google.clickLat = marker.getPosition().lat();
  google.clickLong = marker.getPosition().lng();
  $rootScope.$broadcast("clicked");
});  //end event listener


}; //end initialize map function

google.maps.event.addDomListener(window, 'load', googleMapService.refresh(selectedLat, selectedLong));

return googleMapService;



});  //end angular.module



// var drawingManager = new google.maps.drawing.DrawingManager({
//   drawingMode: google.maps.drawing.OverlayType.MARKER,
//   drawingControl: true,
//   drawingControlOptions: {
//     position: google.maps.ControlPosition.TOP_CENTER,
//     drawingModes: [
//       google.maps.drawing.OverlayType.MAKER,
//       google.maps.drawing.OverlayType.POLYLINE
//     ]
//   },
//   markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'}
//
// });
// drawingManager.setMap(map);
//
//
// drawingManager.setOptions({
//   drawingControl: true
// });
