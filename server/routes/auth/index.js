'use strict';

var express = require('express');
var router  = express.Router();

router.get('/player', function(req, res) {
  res.render('index');
});

module.exports = router;
