'use strict';

var express = require('express');
var router = express.Router();

var mmss = require('mmss');

router.get('/files', function (req, res) {
  // var json = JSON.stringify(mmss.music, null, 2);
  res.json(mmss.music);
});

module.exports = router;
