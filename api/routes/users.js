const _ = require('lodash');
const express = require('express');
const common = require('../services/common');

const router = new express.Router();

/**
 * Get User balance
 */
router.get('/balance', async (req, res, next) => {
  try {
    res.status(200).send({result: true, balance: 1, transactions: 1});
  } catch (error) {
    const parsed = common.parseError(error);
    return res.status(parsed.status).send(parsed.data);
  }
});

module.exports = router;
