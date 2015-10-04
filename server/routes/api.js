'use strict';

var express = require('express');
var router = express.Router();

var mmss = require('app/mmss');

router.get('/files', function(req, res) {
  var json = JSON.stringify(mmss.music, null, 2);
  res.send(json);
});

router.get('/search', function(req, res) {
  var query = req.query.q || null;

  mmss.search(query, function(err, result) {
    if (err) { return res.send('ng'); }
    res.json(result);
  });
});

// ファイルリストを再取得する
router.get('/refresh', function(req, res) {
  mmss.build(function(err) {
    if (err) { return res.send('ng'); }
    res.send('ok');
  });
});

module.exports = router;
