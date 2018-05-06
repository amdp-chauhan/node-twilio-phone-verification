// app/models/user-balance.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var UserBalanceSchema   = new Schema({
  uid: String,
  transactions: Number,
  balance: Number
});

module.exports = mongoose.models.UserBalance || mongoose.model('UserBalance', UserBalanceSchema);
