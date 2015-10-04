'use strict';

var Log = function(options) {
  options = options || {};

  this.silent = options.silent || false;
};

Log.prototype = {
  constructor: Log,
  l: function(str) {
    this._print('[LOG] ' + str);
  },
  e: function(str) {
    this._print('[ERR] ' + str);
  },
  _print: function(str) {
    if (this.silent) { return; }
    console.log(str);
  }
};

module.exports = Log;
