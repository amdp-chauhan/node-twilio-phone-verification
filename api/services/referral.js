const _ = require('lodash');
const shortId = require('shortid');
const moment = require('moment');

const ReferralEvent = require('../models/referral-event');
const ReferralCode = require('../models/referral-code');
const ReferredUser = require('../models/referred-user');
const UserBalance = require('../models/user-balance');
const RewardedReferral = require('../models/rewarded-referral');

/**
 * @param {Object} decodedToken
 * @param {Object} options
 * @return {Promise}
 */
module.exports.addReferralInfo = async (decodedToken, options) => {
  const refferalCodeNote = await ReferralCode.findOne({referralCode: options.code});

  if (refferalCodeNote && refferalCodeNote.id !== decodedToken.uid) {
    const userBalance = await UserBalance.findOne({uid: decodedToken.uid});
    let referring = await ReferredUser.findOne({id: decodedToken.uid});
    if (!referring) {
      const currentProgress = _.get(userBalance, 'total', 0);
      const isCompleted = currentProgress >= 10;
      const toSave = new ReferredUser({
        id: decodedToken.uid,
        referred: options.code,
        referralId: shortId.generate(),
        progress: {
          current: isCompleted ? 10 : currentProgress,
          max: 10
        },
        date: moment.utc().unix(),
        completed: isCompleted
      });
      referring = await toSave.save();
    }

    let referredUsers = [];
    const ownReferralCodeNote = await ReferralCode.findOne({id: decodedToken.uid});
    if (ownReferralCodeNote) {
      referredUsers = await ReferredUser.find({referred: ownReferralCodeNote.refferalCode});
    }
    return {
      status: 200,
      data: {
        referralCode: options.code,
        referring: referring || null,
        referredUsers: referredUsers || []
      }
    };
  } else {
    throw new Error('Invalid referral code');
  }
};

/**
 * @param {Object} decodedToken
 * @return {Promise}
 */
module.exports.getReferralInfo = async (decodedToken) => {
  const refferalCodeNote = await ReferralCode.findOne({id: decodedToken.uid});

  let referralCode;
  if (refferalCodeNote) {
    referralCode = refferalCodeNote.referralCode;
  } else {
    const toSave = new ReferralCode({
      id: decodedToken.uid,
      referralCode: shortId.generate()
    });
    const saved = await toSave.save();
    referralCode = saved.referralCode;
  }

  const referring = await ReferredUser.findOne({id: decodedToken.uid});
  const referredUsers = await ReferredUser.find({referred: referralCode});
  return {
    status: 200,
    data: { referralCode, referring, referredUsers: referredUsers || [] }
  };
};

/**
 * @param {Object} eventObj
 * @return {Promise}
 */
module.exports.addEvent = async (eventObj) => {
  const referralCode = _.get(eventObj, 'referralCode');
  const eventType = _.get(eventObj, 'eventType');

  if (!referralCode || !eventType) {
    throw new Error('Request data is incorrect');
  }

  let saved;
  if (eventObj.eventType === 'referral-code-click-step-1') {
    const toSave = new ReferralEvent({ referralCode, eventType, timeStamp: moment.utc().unix() });
    saved = await toSave.save();
  }

  const allEvents = await ReferralEvent.find({ referralCode, eventType });
  return {
    status: 200,
    data: {result: !!saved, total: _.get(allEvents, 'length', 0), eventType}
  };
};
