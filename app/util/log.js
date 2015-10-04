'use strict';

var Log = function(options) {
  options = options || {};

  this.silent = options.silent || false;
};

Log.prototype = {
  constructor: Log,
  l: function(str) {
    this._print('[LOG] ', str);
  },
  e: function(str) {
    this._print('[ERR] ', str);
  },
  _print: function() {
    if (this.silent) { return; }
    console.log.apply(console, arguments);
  }
};

module.exports = Log;
