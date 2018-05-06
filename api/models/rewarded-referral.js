// app/models/rewarded-referral.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var RewardedReferralSchema   = new Schema({
  id: String,
  referred: String,
  amount: Number
});

module.exports = mongoose.models.RewardedReferral || mongoose.model('RewardedReferral', RewardedReferralSchema);
