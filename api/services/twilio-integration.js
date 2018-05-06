const _ = require('lodash');
const twilio = require('twilio');
const client = new twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

/**
 * @param {Object} options
 * @return {Promise}
 */
module.exports.sendMessage = async (options) => {
  const from = process.env.TWILIO_FROM;
  const to = _.get(options, 'to');
  const body = _.get(options, 'body');
  
  if (!from || !to || !body) {
    throw new Error('Request data is incorrect');
  }

  try {
    let response = await client.messages.create({
      from, to, body
    });

    return {
      status: 200,
      data: {
        result: true,
        sid: response.sid
      }
    };
  } catch (error) {
    throw new Error(error);
  }
};