'use strict';

var Keyboard = function() {
  this.init.apply(this);
};

Keyboard.prototype = {
  constructor: Keyboard,
  init: function() {
    document.addEventListener('keydown', this, false);
  },
  handleEvent: function(ev) {
    ev.preventDefault();

    var key;
    switch(ev.keyCode) {
    case 32: //Space
      key = 'S';
      break;

    case 37: // left
      key = 'L';
      break;

    case 38: // up
      key = 'U';
      break;

    case 39: // right
      key = 'R';
      break;

    case 40: // down
      key = 'D';
      break;

    default:
      key = null;
    }
    key && window.postMessage({ action: 'KEYDOWN', data: { key: key } }, location.origin);
  }
};

module.exports = (new Keyboard());
