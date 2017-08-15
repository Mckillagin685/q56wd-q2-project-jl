'use strict';

// const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const axios = require('axios');
// const jwt = require('jsonwebtoken');
// const knex = require('../knex');
// const { camelizeKeys, decamelizeKeys } = require('humps');

const router = express.Router();

router.get('/glassdoor/:company', (req, res, next) => {
  // console.log(req.ip, req.connection.remoteAddress);
  axios.get(`http://api.glassdoor.com/api/api.htm?t.p=182724&t.k=dnxzk0MPf7A&userip=64.125.192.130&useragent=chrome&format=json&v=1&action=employers&q='${req.params.company}&exactMatch=true'`)
    .then(function (response) {
      // console.log('req: ' + req.params.company);
      // console.log(response.data.response.employers);
      res.send(response.data.response.employers);
    })
    .catch(function (err) {
      console.log(err);
    })
  // res.send(200)
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
