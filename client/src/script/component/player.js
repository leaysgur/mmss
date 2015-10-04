'use strict';

var axios = require('axios');
var $id = document.getElementById.bind(document);

var Player = function() {
  this.init.apply(this);
};
Player.prototype = {
  constructor: Player,
  init: function() {
    this.$ = {
      player: $id('player')
    };

    window.addEventListener('message', this, false);
  },
  handleEvent: function(ev) {
    var data = ev.data;
    if (data.action === 'SELECT_TRACK') {
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
      // .then(that._bindEvent.bind(that))
      .catch(function(res) {
        console.error(res);
      });
  },
  _handleRes: function(res) {
    var ctx = new window.AudioContext();
    var source = ctx.createBufferSource();
    ctx.decodeAudioData(res.data, function(audioBuffer) {
      source.buffer = audioBuffer;
      source.connect(ctx.destination);
      source.start(ctx.currentTime);
      source.stop(ctx.currentTime + 1);
    });
   }
};

module.exports = Player;
