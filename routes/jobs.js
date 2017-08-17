'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();
const axios = require('axios');

module.exports = router;

router.get('/jobs', (req, res, next) => {

  axios.get(`http://service.dice.com/api/rest/jobsearch/v1/simple.json?text=${req.query.title}&city=${req.query.location}`)
  .then((resp) => {
    res.send(resp.data);
  })
  .catch((err) => {
    next(err)
  })
});
