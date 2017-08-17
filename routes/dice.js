'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

router.get('/dice/jobDesc', (req, res, next) => {
  const url = req.query.url;

  let result = {};

  request(`${url}`, (err, res, body) => {
    if(!err && res.statusCode == 200){
      var $ = cheerio.load(body);
      var jobDesc = $('#jobdescSec').text()

      result = {'job_description': jobDesc}
      
    }else if(err){
      throw boom.create(500, 'Internal server error');
    }
  })
  res.send(result);
});
