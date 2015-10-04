'use strict';

var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!' + '<a href="/foo">foo</a>');
});

app.get('/foo', function (req, res) {
  res.send('foo!');
});

module.exports = app;
