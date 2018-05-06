// app/models/data/geolocation-data.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GeolocationDataSchema   = new Schema({
  id: String,
  uid: String,
  utcOffset: Number,
  data: Object | Array
});

module.exports = mongoose.models.GeolocationData || mongoose.model('GeolocationData', GeolocationDataSchema);
