'use strict';

var utils = require('utils');

var MMSS = function() {
  this.config = {};
  this.music  = {};
};

MMSS.prototype = {
  constructor: MMSS,
  start: function(config) {
    this.config = config;

    this.build(function() {
      // 遅延ロードじゃないとダメ
      var server = require('app/app').listen(8888, function () {
        var port = server.address().port;
        console.log('App is running on port: %s', port);
      });
    });
  },
  build: function(fn) {
    var that = this;
    utils.dir2obj(this.config.MUSIC_PATH, function(err, res) {
      // TODO;
      if (err) { return; }

      that.music = res;
      fn && fn();
    });
  }
};

module.exports = (new MMSS());
