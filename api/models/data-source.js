// app/models/data-source.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var DataSourceSchema   = new Schema({
  uid: String,
  id: String,
  title: String,
  description: String,
  icon: String,
  lastUpdate: Number,
  isEnabled: Boolean
});

module.exports = mongoose.models.DataSource || mongoose.model('DataSource', DataSourceSchema);
