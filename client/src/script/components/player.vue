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
