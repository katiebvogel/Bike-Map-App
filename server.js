var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');

var passport = require('passport');
var session = require('express-session');

var LocalStrategy = require('passport-local').Strategy;

// include variables for ROUTES below  (model for User, login, register, photos, etc..)
// -------------------

var User = require('./models/user');


var app = express();

mongoose.connect("mongodb://localhost/bikeApp");

app.use(bodyParser.json());
app.use(express.static('public'));



//Routes
app.get('/', function(request, response){
  response.sendFile(path.join(__dirname, 'public/views/main.html'));
}); //main route on page load


//server listen

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Server listening on ' + server.address().port);
});
