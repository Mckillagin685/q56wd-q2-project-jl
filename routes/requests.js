'use strict';

const bcrypt = require('bcrypt-as-promised');
const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio')

// possible change of /request/job/:url ... adding scraped data to database

router.post('/request/jobInfo/:url', (req, res, next) => {
  const url = req.param.url;
  let result = {};
  request(`${url}`, (err, res, body) => {
    if(!err && res.statusCode == 200){
      var $ = cheerio.load(body);
      var location = $('#estJLoc').attr('value');
      var employer = $('span[itemprop=name]').text()
      var jobTitle = $('#estJTitle').attr('value')
      var jobDesc = $('#jobdescSec').text()
      var jobSkills = $('#estSkillText').attr('value')
      var jobTerms = $('#taxTermsTextId').attr('value')
      var postDate = $('li.posted').text()

      result = {'location': location, 'employer': employer, 'jobTitle': jobTitle, 'jobDesc': jobDesc, 'jobSkills': jobSkills, 'jobTerms': jobTerms, 'postDate': postDate}
    }
  })
  res.send(result);
})
