<style lang="scss">
.player {
  display: flex;
  align-items: center;
  padding: 16px 0;

  &-disp {
    text-indent: 8px;
    font-size: .8em;
  }
}
</style>
<template>
<div class="player">
  <audio
    v-el="player"
    v-show="srcUrl"
    v-attr="src: srcUrl"
    v-on="ended: onAudioEnded"
    controls
    autoplay
  ></audio>
  <div class="player-disp">{{nowPlaying}}</div>
</div>
</template>
<script>
var axios = require('axios');

module.exports = {
  data: function() {
    return {
      name: '',
      srcUrl: null,
      nowPlaying: ''
    };
  },
  watch: {
    name: function(val) { this._load(val); }
  },
  methods: {
    handleEvent: function(ev) {
      var action = ev.data.action,
          data   = ev.data.data;
      if (action === 'SELECT_TRACK') {
        this.name = data.name;
      }
      if (action === 'PLAY_TRACK') {
        this.name = data.name;
      }
      if (action === 'NOTIFY_NOWPLAYING') {
        this._showNowPlaying(data);
      }
      if (action === 'KEYDOWN') {
        this._handleKey(data.key);
      }
    },
    _load: function(name) {
      axios
        .get('/api/track', {
          responseType: 'arraybuffer',
          params: {
            n: name
          }
        })
        .then(this._handleRes)
        .catch(function(res) {
          console.error(res);
        });
    },
    _handleRes: function(res) {
      var blob = new window.Blob([res.data], { type: 'audio/mpeg' });
      var objectUrl = window.URL.createObjectURL(blob);
      this.srcUrl = objectUrl;

      window.postMessage({ action: 'TRACK_START', data: { name: this.name } }, location.origin);
    },
    _handleKey: function(key) {
      var player = this.$$.player;
      if (!this.srcUrl) { return; }
      if (key === 'U') { player.volume += 0.1; }
      if (key === 'D') { player.volume -= 0.1; }
      if (key === 'R') { player.currentTime = player.duration; }
      if (key === 'L') { (player.currentTime|0) === 0 ? __trackBack.call(this) : player.currentTime = 0; }
      if (key === 'S') { player.paused ? player.play() : player.pause(); }

      function __trackBack() {
        window.postMessage({ action: 'TRACK_BACK', data: { name: this.name } }, location.origin);
      }
    },
    _showNowPlaying: function(tag) {
      this.nowPlaying = tag.ti + ' from ' + tag.al + ' by ' + tag.ar;
    },
    onAudioEnded: function() {
      window.postMessage({ action: 'TRACK_END', data: { name: this.name } }, location.origin);
    }
  },
  created: function() {
    window.addEventListener('message', this, false);
  }
};
</script>
