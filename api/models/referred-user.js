// app/models/referred-user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReferredUserSchema   = new Schema({
  id: String,
  referralId: String,
  referred: String,
  progress: {
    current: Number,
    max: Number
  },
  date: Number,
  completed: Boolean
});

module.exports = mongoose.models.ReferredUser || mongoose.model('ReferredUser', ReferredUserSchema);
