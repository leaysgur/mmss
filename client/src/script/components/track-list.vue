<style lang="scss">
.trackList-item {
  display: flex;

  &-trackNo {
    width: 28px;
    margin-right: 8px;
    text-align: right;
  }
}
</style>
<template>
<ul class="trackList">
  <li class="trackList-item clickableLi" v-repeat="track in items" v-on="click: onClickTrack(track.n)">
    <div class="trackList-item-trackNo">{{_getTrackNo(track.t.tr)}}</div>
    <div>{{track.t.ti}}</div>
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

      window.postMessage({ action: 'SELECT_TRACK', data: { name: mName } }, location.origin);
    },
    handleEvent: function(ev) {
      var action = ev.data.action,
          data   = ev.data.data;
      if (action === 'SELECT_ALBUM') {
        this.album = data.album;
        this.items = this.album.c;
      }
      if (action === 'SELECT_ARTIST') {
        this.artistName = data.name;
      }
      if (action === 'TRACK_START') {
        this._sendToNotifier(data.name);
      }
      if (action === 'SELECT_TRACK') {
        this._syncPlayList(data.skipSync);
      }
    },
    _syncPlayList: function(isSkipSync) {
      if (isSkipSync) { return; }
      window.postMessage({ action: 'SYNC_PLAYLIST', data: this.$data }, location.origin);
    },
    _getTrackNo: function(str) {
      return str.split('/')[0];
    },
    _sendToNotifier: function(name) {
      var pathArr = name.split('/');
      // アーティスト名
      pathArr.shift();
      // アルバム名
      pathArr.shift();
      // 残るのがnameで使ってるキー
      var fileName = pathArr.join('/');
      var tags = this.album.c.filter(function(track) {
        return track.n === fileName;
      })[0].t;

      window.postMessage({ action: 'NOTIFY_NOWPLAYING', data: tags }, location.origin);
    }
  },
  created: function() {
    window.addEventListener('message', this, false);
  }
};
</script>
