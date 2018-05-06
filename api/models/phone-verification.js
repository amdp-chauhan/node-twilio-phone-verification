// app/models/referral-code.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PhoneVerificationSchema = new Schema({
  uid: String,
  verificationCode: String,
  isValid: Boolean
});

module.exports = mongoose.models.PhoneVerification || mongoose.model('PhoneVerification', PhoneVerificationSchema);
