'use strict';

var axios = require('axios');
var $id = document.getElementById.bind(document);

var Player = function() {
  this.data = {
    name: null
  };
  this.init.apply(this);
};
Player.prototype = {
  constructor: Player,
  init: function() {
    this.$ = {
      player: $id('player'),
      audio:  $id('audio')
    };

    window.addEventListener('message', this, false);
  },
  handleEvent: function(ev) {
    var data = ev.data;
    if (data.action === 'SELECT_TRACK') {
      this.data.name = data.name;
      this._load(data.name);
    }
    if (data.action === 'PLAY_TRACK') {
      this.data.name = data.name;
      this._load(data.name);
    }
  },
  _load: function(name) {
    var that = this;
    axios
      .get('/api/track', {
        responseType: 'arraybuffer',
        params: {
          n: name
        }
      })
      .then(that._handleRes.bind(that))
      .then(that._bindEvent.bind(that))
      .catch(function(res) {
        console.error(res);
      });
  },
  _handleRes: function(res) {
    var blob = new window.Blob([res.data], { type: 'audio/mpeg' });
    var objectUrl = window.URL.createObjectURL(blob);
    this.$.audio.removeEventListener('ended', this._handleTrackEnd.bind(this), false);
    this.$.audio.src = objectUrl;
  },
  _bindEvent: function() {
    this.$.audio.addEventListener('ended', this._handleTrackEnd.bind(this), false);
  },
  _handleTrackEnd: function() {
    this.$.audio.removeEventListener('ended', this._handleTrackEnd.bind(this), false);

    var name = this.data.name;
    window.postMessage({ action: 'TRACK_END', name: name }, location.origin);
  }
};

module.exports = Player;
