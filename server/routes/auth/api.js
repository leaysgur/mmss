'use strict';

var express = require('express');
var router  = express.Router();
var mmss    = require('app/mmss');

// ファイルリストを再取得する
router.get('/refresh', function(req, res) {
  mmss.build(function(err) {
    if (err) { return res.json({ error: 1 }); }
    res.json({ success: 1 });
  });
});

router.get('/artist-list', function(req, res) {
  mmss.getArtistList(function(err, items) {
    if (err) { return res.json({ error: 1 }); }
    res.json(items);
  });
});

module.exports = router;
