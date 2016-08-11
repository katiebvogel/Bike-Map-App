var mongoose = require('mongoose');
Schema = mongoose.Schema;

var bikeRouteSchema = new Schema({
  userId: Schema.Types.ObjectId,
  startLocation: {type: String},
  endLocation: {type: String},
  comments: {type: String, required: false},
  location: {type: [Number]},  //[long, lat]
  routePic1: {type: Array, required: false},
  // routePic2: {type: Array, required: false},
  // routePic3: {type: Array, required: false},
  // routePic4: {type: Array, required: false},
  maps: {type: Array},
  user: {type: Schema.ObjectId, ref: 'User'}
});

//indexes this schema as 2nd sphere for geolocation purposes..
bikeRouteSchema.index({location: '2dsphere'});

var exportObject = {};

exportObject.model = mongoose.model('bikeRoute', bikeRouteSchema);

exportObject.schema = bikeRouteSchema;

module.exports = exportObject;
