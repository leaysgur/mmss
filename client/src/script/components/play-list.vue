<style>
</style>
<template>
<ul>
  <li v-repeat="track in items" v-on="click: onClickTrack(track.n)">
    {{_getTrackNo(track.t.tr)}} {{track.t.ti}}
  </li>
</ul>
</template>
<script>
module.exports = {
  data: function() {
    return {
      items:      [],
      artistName: null,
      album:      null
    };
  },
  methods: {
    onClickTrack: function(name) {
      var mName = this.artistName + '/' + this.album.n + '/' + name;

      window.postMessage({ action: 'SELECT_TRACK', data: { name: mName, skipSync: true } }, location.origin);
    },
    handleEvent: function(ev) {
      var action = ev.data.action,
          data   = ev.data.data;
      if (action === 'SYNC_PLAYLIST') {
        this.$data = data;
      }
      if (action === 'TRACK_END') {
        this._triggerNext(data.name);
      }
    },
    _getTrackNo: function(str) {
      return str.split('/')[0];
    },
    _triggerNext: function(name) {
      var mName = this.artistName + '/' + this.album.n + '/';
      var trackList = this.items.map(function(track) {
        return mName + track.n;
      });
      var idx = trackList.indexOf(name) + 1;
      idx = idx === trackList.length ? 0 : idx;

      window.postMessage({ action: 'PLAY_TRACK', data: { name: trackList[idx] } }, location.origin);
     }
  },
  created: function() {
    window.addEventListener('message', this, false);
  }
};
</script>
