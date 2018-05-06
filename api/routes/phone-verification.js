const _ = require('lodash');
const express = require('express');
const twilio = require('../services/twilio-integration');
const common = require('../services/common');
const appUser = require('../services/app-user');
const phoneVerification = require('../services/phone-verification');

const router = new express.Router();

/**
 * Sent verification code to user's phone
 */
router.post('/sent', async (req, res, next) => {
  if (!req.body) {
    return res.status(500).send({
      error: 'Empty request'
    });
  }
  try {
    const { uid } = req.body;
    const user = await appUser.fetchUserByUid(uid);
    
    if (user && user.phoneVerified) {
      throw new Error('Phone already verified.');
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);
    const result = await twilio.sendMessage({
      to: user.phoneNumber,
      body: `${verificationCode} is your verification code for Product.`
    });

    if (result.status === 200) {
      phoneVerification.findAndUpdate({
        uid,
        verificationCode,
        isValid: true
      });
    }

    res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
  } catch (error) {
    const parsed = common.parseError(error);
    return res.status(parsed.status).send(parsed.data);
  }
});

/**
 * Validate obtained verification with uid
 */
router.post('/validate', async (req, res, next) => {
  if (!req.body) {
    return res.status(500).send({
      error: 'Empty request'
    });
  }

  try {
    const { uid, verificationCode } = req.body;
    let user = await appUser.fetchUserByUid(uid);
    
    if (user && user.phoneVerified) {
      throw new Error('Phone already verified.');
    }

    const result = await phoneVerification.validateVerificationCode({uid, verificationCode, isValid: true});
    
    if (result.data.isValid) {
      const userUpdateResponse = await appUser.updateUser({ uid }, { phoneVerified: true });
      if (userUpdateResponse.phoneVerified) {
        phoneVerification.findAndUpdate({
          uid,
          verificationCode,
          isValid: false
        });
      }
    }

    res.status(_.get(result, 'status', 200)).send({result: true});
  } catch (error) {
    const parsed = common.parseError(error);
    return res.status(parsed.status).send(parsed.data);
  }
});

module.exports = router;