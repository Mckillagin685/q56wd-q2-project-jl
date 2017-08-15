'use strict';

// const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const axios = require('axios');
// const jwt = require('jsonwebtoken');
// const knex = require('../knex');
// const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/glassdoor', (req, res, next) => {
  console.log(req.ip, req.connection.remoteAddress);
  axios.get('/http://api.glassdoor.com/api/api.htm?t.p=182724&t.k=dnxzk0MPf7A&userip=0.0.0.0&useragent=chrome&format=json&v=1&action=employers&q=Aricent')
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    })
  res.send(200)
})



module.exports = router;


// http://api.glassdoor.com/api/api.htm?
// t.p=182724&t.k=dnxzk0MPf7A
//
// &userip=0.0.0.0
//
// &useragent=
//
// &format=json
// &v=1
// &action=employers
//
// &q=
