const _ = require('lodash');
const AppUser = require('../models/app-user');
const common = require('./common');
const axios = require('axios');

/**
 * @param {Object} data
 * @param {Object} req
 * @return {Object.<{user: Object, isNew: boolean}>}
 */
module.exports.fetchUser = async (data, req) => {
  const saved = {};
  const firebaseUser = false;
  return {user: saved, isNew: !firebaseUser};
};

/**
 * @param {String} uid
 * @return {Object}
 */
module.exports.fetchUserByUid = async (uid) => {
  const appUser = await AppUser.findOne({uid: uid})
  
  if (!appUser) {
    throw new Error('User not found.');
  }

  return appUser;
};

/**
 * @param {String} uid
 * @return {Object}
 */
// module.exports.updateByUid = async (uid, document) => {
//   const appUser = await AppUser.update({uid}, document)

//   return appUser;
// };

/**
 * @param {Object} decodedToken
 * @param {Object} props
 * @return {Promise}
 */
module.exports.updateUser = async (decodedToken, props) => {
  let appUser = await AppUser.findOne({uid: decodedToken.uid});

  if (!appUser) {
    throw new Error('User not found.');
  } else if (!_.isObject(props)) {
    throw new Error('Incorrect request data.');
  } else {
    _.each(Object.keys(props), key => appUser[key] = props[key]);
    return await appUser.save();
  }
};

/**
 * @param {Object} decodedToken
 * @return {Promise}
 */
module.exports.deleteUser = async (decodedToken) => {
  return await AppUser.remove({uid: decodedToken.uid});
};
