// app/models/app-user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReferralEventSchema   = new Schema({
  referralCode: String,
  timeStamp: Number,
  eventType: String
});

module.exports = mongoose.models.ReferralEvent || mongoose.model('ReferralEvent', ReferralEventSchema);
