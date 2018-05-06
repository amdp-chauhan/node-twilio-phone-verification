// app/models/sendgrid-list.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var SendgridListSchema   = new Schema({
  id: Number,
  page: Number,
  total: Number,
  list: Array,
  timeStamp: Number
});

module.exports = mongoose.models.SendgridList || mongoose.model('SendgridList', SendgridListSchema);
