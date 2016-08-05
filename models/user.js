var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');
var bikeRouteSchema = require('./route').schema;


//add to UserSchema later!

var UserSchema = new Schema({
  username: {type: String, required: true, index: {unique: true}},
  password: { type: String, required: true},
  about: {type: String, required: false},
  profilePic: {type: Object, required: false },
  // location: {type: [Number]}, //[Long, Lat]
  routes: [bikeRouteSchema]
});

UserSchema.pre('save', function(next){
  var user = this;
  var SALT_WORK_FACTOR = 10;
  if(user.isModified('password')== false){
    return next();
  };

  //encryption below:  using the added "salt"
  bcrypt.hash(user.password, SALT_WORK_FACTOR, function(err, hash){
    if(err){
      console.log('hash error with bcrypt', err);
    }
    console.log('Hashed Password: ', hash);
    user.password = hash;
    return next();
  });
});


UserSchema.methods.comparePassword =function(candidatePassword, cb) {
  var user = this;

  bcrypt.compare(candidatePassword, user.password, function(err, isMatch){
    if(err){
      console.log('bcrypt password compare error: ', err);
      cb(err, isMatch);
    } else {
      console.log('isMatch', isMatch);
      cb(null, isMatch);
    }

    //cb(null, this.password == candidatePassword);
  });
};

module.exports = mongoose.model('User', UserSchema);
