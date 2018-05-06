const _ = require('lodash');
const express = require('express');
const referral = require('../services/referral');
const common = require('../services/common');

const router = new express.Router();

/**
 * Get User referral info
 */
router.get('/info', async (req, res, next) => {
    try {
        const decodedToken = {};
        const result = await referral.getReferralInfo(decodedToken);
        res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

/**
 * Add User referral info
 */
router.post('/info', async (req, res, next) => {
    const options = { code: req.body.code };
    try {
        const decodedToken = {};
        const result = await referral.addReferralInfo(decodedToken, options);
        res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

/**
 * Add User referral info
 */
router.post('/event', async (req, res, next) => {
    try {
        const isVerified = true;
        if (isVerified) {
            const result = await referral.addEvent(req.body);
            res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
        } else {
            res.status(401).send('Unauthorized request');
        }
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

/**
 * Add User referral info
 */
router.get('/job', async (req, res, next) => {
    try {
        const result = {};
        res.status(_.get(result, 'status', 200)).send(_.get(result, 'data'));
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

module.exports = router;
