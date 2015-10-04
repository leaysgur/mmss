'use strict';

var fs = require('fs');

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

// アーティスト一覧
router.get('/artist-list', function(req, res) {
  mmss.getArtistList(function(err, items) {
    if (err) { return res.json({ error: 1 }); }
    res.json(items);
  });
});

// アルバム一覧
router.get('/album-list', function(req, res) {
  var name = req.query.n || null;
  mmss.getAlbumList(name, function(err, items) {
    if (err) { return res.json({ error: 1 }); }
    res.json(items);
  });
});

// 曲
router.get('/track', function(req, res) {
  var name = req.query.n || null;
  mmss.getTrack(name, function(err, track) {
    if (err) { return res.json({ error: 1 }); }
    res.set({ 'Content-Type': 'audio/mpeg' });
    var readStream = fs.createReadStream(track.path);
    readStream.pipe(res);
  });
});

module.exports = router;
