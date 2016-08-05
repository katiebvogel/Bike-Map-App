var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');


var multer = require('multer');
var passport = require('passport');
var session = require('express-session');
var jade = require('jade');
var LocalStrategy = require('passport-local').Strategy;

// include variables for ROUTES below  (model for User, login, register, photos, etc..)
// -------------------


var User = require('./models/user');
var register = require('./routes/register');
var login = require('./routes/login');
var main = require('./routes/main');
var Route = require('./models/route');
var profile = require('./routes/profile');

var app = express();


var mongoURI = "mongodb://localhost/users";
var MongoDB = mongoose.connect(mongoURI).connection;


MongoDB.on('error', function(err){
  console.log('mongodb connection error', err);
});

MongoDB.once('open', function(){
  console.log('mongodb connection open');
});

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());

//view engine?
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/views', express.static('views'));
app.use('/images', express.static('images'));



app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static('public'));

// app.use('/', main);

app.get('/', function(request, response){
  response.sendFile(path.join(__dirname, 'public/views/main.html'));
});

app.use('/login', login);
app.use('/register', register);
app.use('/main', main);
app.use('/profile', profile);
// app.use('/images', images);


// we need to authenticate the users
passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
  User.findById(id, function(err, user){
    if(err) {
      return done(err);
    }
    done(null, user);
  });
});


passport.use('local', new LocalStrategy({ passReqToCallback: true, usernameField: 'username'},
function(request, username, password, done){
  User.findOne({username: username}, function(err, user){
    if(err) {
      console.log('passport local error', err);
    }
     else if(!user) {
      return done(null, false, {message: 'Incorrect username and password.'});
    }

    //test a matching password
    user.comparePassword(password, function(err, isMatch){
      if(err){
        console.log('compare password error', err);
      }
       else if (isMatch){
        return done(null,user);
      } else {
        done(null, false, {message: 'Incorrect username and password.'});
      }
    });
  });
})
);

// app.use(multer(
//   {dest: 'images/'}
// ));


app.use('/api', function(request, response, next){
  if(request.isAuthenticated()){
    next();
  } else {
    repsonse.sendStatus(403);
  }
});

app.get('/*', function(request, response){
  response.sendFile(path.join(__dirname, 'public/views/main.html'));
});



//server listen
var port = process.env.PORT || 3000;
var server = app.listen(port, function () {
  console.log('Server listening on ' + server.address().port);
});
