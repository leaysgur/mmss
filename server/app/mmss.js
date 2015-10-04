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

    this.build(function(err) {
      if (err) {
        console.error('Building file list failed..');
        process.exit(1);
      }
      // 遅延ロードじゃないとダメ
      var server = require('app/server').listen(config.PORT, function() {
        var port = server.address().port;
        console.log('App is running on port: %s', port);
      });
    });
  },
  build: function(fn) {
    console.log('Building file list start...');
    var that = this;
    utils.dir2obj(this.config.MUSIC_PATH, function(err, res) {
      if (err) { fn(err); }
      console.log('Building file list finish!');

      that.music = res;
      fn && fn(null);
    });
  }
};

module.exports = (new MMSS());