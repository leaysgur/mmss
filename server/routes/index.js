'use strict';

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res) {
  res.render('index', { hoge: 'hogehoge' });
});

router.get('/logout', function(req, res) {
  delete req.session.isLogin;
  res.redirect('/');
});

router.post('/login', function(req, res) {
  var id = req.body.id;
  var pw = req.body.pw;

  // TODO
  console.log(id, pw);
  req.session.isLogin = true;

  res.redirect('/player');
});

module.exports = router;
