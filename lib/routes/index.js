'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('index', { hoge: 'hogehoge' });
});

module.exports = router;
