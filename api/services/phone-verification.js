const _ = require('lodash');
const PhoneVerification = require('../models/phone-verification');

/**
 * @param {Object} document
 * @return {Object}
 */
module.exports.findAndUpdate = async (document) => {
  
  try {
    PhoneVerification.update(
      { uid: document.uid },
      document,
      { upsert: true },
      (error) => {
        if (error) throw new Error(error);
      }
    );
  } catch (error) {
    throw new Error(error);
  }
};

/**
 * @param {Object} document
 * @return {Object}
 */
module.exports.validateVerificationCode = async (document) => {
  
  try {
    const record = await PhoneVerification.findOne(document);
    if (!record) {
      throw new Error("Invalid Verification Code.");
    }

    return {
      status: 200,
      data: record
    }
  } catch (error) {
    throw new Error(error);
  }
};
