'use strict';

var express = require('express');
var jsondir = require('jsondir');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

var MMSS = function() {
  this.config = {};
  this.music  = {};
};

MMSS.prototype = {
  constructor: MMSS,
  start: function(config) {
    this.config = config;

    // this.build(function() {
      var server = app.listen(8888, function () {
        var host = server.address().address;
        var port = server.address().port;

        console.log('Example app listening at http://%s:%s', host, port);
      });
    // });
  },
  build: function(fn) {
    var that = this;
    jsondir.dir2json(this.config.MUSIC_PATH, function(err, res) {
      // TODO;
      if (err) { return; }

      that.music = res;
      fn && fn();
    });
  }
};

module.exports = (new MMSS());
