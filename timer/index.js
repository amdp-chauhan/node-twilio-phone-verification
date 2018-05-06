'use strict';

const handler = (context, timer) => { // eslint-disable-line no-unused-vars
  context.log('Timer call');
  context.done();
};

module.exports = { handler };