'use strict';

var Notifier = function() {
  this._ntfInstance = null;
  this._ntfTimer    = null;
  this.init.apply(this);
};

Notifier.prototype = {
  constructor: Notifier,
  init: function() {
    if (Notification && Notification.permission !== 'granted') {
      this._initNtf();
    }

    window.addEventListener('message', this, false);
  },
  _initNtf: function() {
    Notification
      .requestPermission()
      .then(function(status) {
        if (Notification.permission !== status) {
          Notification.permission = status;
        }
      });
  },
  handleEvent: function(ev) {
    var action = ev.data.action,
        data   = ev.data.data;
    if (action === 'NOTIFY_NOWPLAYING') {
      this._show(data);
    }
  },
  _show: function(tag) {
    var ntf   = this._ntfInstance,
        timer = this._ntfTimer;
    ntf = new Notification(tag.ti, {
      tag:  'nowplaying',
      body: tag.ar + ' - ' + tag.al,
    });

    timer = setTimeout(function() {
      ntf.close.bind(ntf)();
      clearTimeout(timer);
    }, 3000);
  }
};

module.exports = (new Notifier());
