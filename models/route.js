var mongoose = require('mongoose');
Schema = mongoose.Schema;

var bikeRouteSchema = new Schema({
  userID: Schema.Types.ObjectId,
  startLocation: {type: String},
  endLocation: {type: String},
  comments: {type: String, required: false},
  location: {type: [Number]},  //[long, lat]
  photos: {type: Array, required: false},
  maps: {type: Array},
  user: {type: Schema.ObjectId, ref: 'User'}
});

//indexes this schema as 2nd sphere for geolocation purposes..
bikeRouteSchema.index({location: '2dsphere'});

var exportObject = {};

exportObject.model = mongoose.model('bikeRoute', bikeRouteSchema);

exportObject.schema = bikeRouteSchema;

module.exports = exportObject;
