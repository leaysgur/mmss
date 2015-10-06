<style lang="scss">
.playList-item {
  display: flex;

  &-mLabel {
    padding-bottom: 4px;
    margin-bottom: 8px;
    border-bottom: 1px solid #eee;
    font-size: .8em;
    font-weight: bold;
  }

  &-trackNo {
    width: 28px;
    margin-right: 8px;
    text-align: right;
  }

  &-trackInfo {
    width: 32%;
  }
}
</style>
<template>
<ul class="playList">
  <li v-show="items.length === 0">曲を選択してください</li>
  <li v-show="items.length !== 0" class="playList-item playList-item-mLabel">
    <div class="playList-item-trackNo">No</div>
    <div class="playList-item-trackInfo">曲名</div>
    <div class="playList-item-trackInfo">アルバム名</div>
    <div class="playList-item-trackInfo">アーティスト名</div>
  </li>
  <li class="playList-item clickableLi" v-repeat="track in items" v-on="click: onClickTrack(track.n)">
    <div class="playList-item-trackNo">{{_getTrackNo(track.t.tr)}}</div>
    <div class="playList-item-trackInfo">{{track.t.ti}}</div>
    <div class="playList-item-trackInfo">{{track.t.al}}</div>
    <div class="playList-item-trackInfo">{{track.t.ar}}</div>
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
