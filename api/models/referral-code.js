// app/models/referral-code.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var ReferralCodeSchema   = new Schema({
  id: String,
  referralCode: String
});

module.exports = mongoose.models.ReferralCode || mongoose.model('ReferralCode', ReferralCodeSchema);
