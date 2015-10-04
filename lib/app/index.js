'use strict';

var express = require('express');
var app = express();
var mmss = require('mmss');

app.get('/', function (req, res) {
  res.send('Hello World!' + '<a href="/files">files</a>');
});

app.get('/files', function (req, res) {
  var json = JSON.stringify(mmss.music, null, 2);
  res.send('<pre>' + json + '</pre>');
});

module.exports = app;
