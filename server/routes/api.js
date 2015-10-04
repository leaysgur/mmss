'use strict';

var express = require('express');
var router = express.Router();

var mmss = require('app/mmss');

router.get('/files', function(req, res) {
  var json = JSON.stringify(mmss.music, null, 2);
  res.send(json);
});

// ファイルリストを再取得する
router.get('/refresh', function(req, res) {
  mmss.build(function(err) {
    if (err) {
      res.send('ng');
    } else {
      res.send('ok');
    }
  });
});

module.exports = router;
