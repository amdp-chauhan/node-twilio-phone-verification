// app/models/app-user.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var AppUserSchema   = new Schema({
  uid: String,
  displayName: String,
  userAvatarHash: String,
  passwordHash: String,
  email: String,
  emailVerified: Boolean,
  phoneVerified: Boolean,
  phoneNumber: String,
  photoURL: String,
  wallet: String,
  isWalletUpdated: Boolean,
  disabled: Boolean,
  level: Number,
  isRated: Boolean
});

module.exports = mongoose.models.AppUser || mongoose.model('AppUser', AppUserSchema);
