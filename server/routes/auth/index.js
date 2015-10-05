'use strict';

var express = require('express');
var router  = express.Router();
var config  = require('config');

router.get('/player', function(req, res) {
  res.render('index', {
    other: config.APPS.SEARCH
  });
});

module.exports = router;
