'use strict';

var express = require('express');
var router = express.Router();

var mmss = require('app/mmss');

router.get('/files', function(req, res) {
  var json = JSON.stringify(mmss.music, null, 2);
  res.send('<pre>' + json + '</pre>');
});

router.get('/search', function(req, res) {
  var query = req.query.q || null;

  mmss.search(query, function(err, result) {
    if (err) { return res.json({ error: 1 }); }
    res.json(result);
  });
});

// ファイルリストを再取得する
router.get('/refresh', function(req, res) {
  mmss.build(function(err) {
    if (err) { return res.json({ error: 1 }); }
    res.json({ success: 1 });
  });
});

module.exports = router;
