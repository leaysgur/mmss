'use strict';

var jsondir = require('jsondir');
var app = require('app/index');

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
        var port = server.address().port;
        console.log('App is running on port: %s', port);
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
