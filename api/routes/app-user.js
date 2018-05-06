const _ = require('lodash');
const express = require('express');
const appUser = require('../services/app-user');
const common = require('../services/common');

const router = new express.Router();

/**
 * Get App User
 */
router.get('/', async (req, res, next) => {
    try {
        res.status(200).send({result: true, user: {}, isNew: true});
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

/**
 * Update App User
 */
router.put('/', async (req, res, next) => {
    if (!req.body) {
      return res.status(500).send({error: 'Empty request'});
    }
    try {
        const user = {};
        res.status(200).send({result: true, user});
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

/**
 * Delete App User
 */
router.delete('/', async (req, res, next) => {
    try {
        const result = {};
        res.status(200).send({result: !!result});
    } catch (error) {
        const parsed = common.parseError(error);
        return res.status(parsed.status).send(parsed.data);
    }
});

module.exports = router;
