'use strict';

const boom = require('boom');
const express = require('express');
const jwt = require('jsonwebtoken');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const router = express.Router();
const request = require('request');
const cheerio = require('cheerio');

const authorize = function(req, res, next) {
  jwt.verify(req.cookies.token, process.env.JWT_KEY, (err, playload) => {
    if (err) {
      return next(boom.create(401, 'Unauthorized'));
    }

    req.claim = playload;

    next();
  });
};

module.exports = router;

router.post('/favs/addJobInfo/:url', authorize, (req, res, next) => {
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

      result = {'location': location, 'employer': employer, 'job_title': jobTitle, 'job_description': jobDesc, 'job_skills': jobSkills, 'job_terms': jobTerms, 'post_age': postDate, 'job_url': url, userId: req.claim.userId }

      return knex('favs').insert(result, '*');
    }else if(err){
      throw boom.create(500, 'Internal server error');
    }
  })
  res.send(result);
});

router.get('/favs/jobs', authorize, (req, res, next) => {
  knex('favs')
    .where('favs.user_id', req.claim.userId)
    .orderBy('favs.post_age', 'ASC')
    .then((rows) => {
      const favs = camelizeKeys(rows);

      res.send(favs);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete('/favs/:id', authorize, (req, res, next) => {
  const favId = Number.parseInt(req.body.bookId);

  if (!Number.isInteger(favId)) {
    return next(boom.create(400, 'Favorite ID must be an integer'));
  }

  const clause = { id: favId, user_id: req.claim.userId };

  let fav;

  knex('favs')
    .where(clause)
    .first()
    .then((row) => {
      if (!row) {
        throw boom.create(404, 'Favorite not found');
      }

      fav = camelizeKeys(row);

      return knex('favs')
        .del()
        .where('id', fav.id);
    })
    .then(() => {
      delete fav.id;

      res.send(fav);
    })
    .catch((err) => {
      next(err);
    });
});
