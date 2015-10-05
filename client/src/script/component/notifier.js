'use strict';

var Notifier = function() {
  this.data = {
    ntfInstance: null
  };
  this.init.apply(this);
};
Notifier.prototype = {
  constructor: Notifier,
  init: function() {

    if (Notification && Notification.permission !== 'granted') {
      Notification.requestPermission(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
    }

    window.addEventListener('message', this, false);
  },
  handleEvent: function(ev) {
    var action = ev.data.action,
        data   = ev.data.data;
    if (action === 'TRACK_START') {
      this._show(data.name);
    }
  },
  _show: function(name) {
    var ntf   = this.data.ntfInstance,
        timer = this.data.ntfTimer;
    ntf = new Notification(name, {
      body: 'body',
      icon: ''
    });
    timer = setTimeout(function() {
      ntf.close();
      clearTimeout(timer);
    }, 3000);
  }
};

module.exports = Notifier;
