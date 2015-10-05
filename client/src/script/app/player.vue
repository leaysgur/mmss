<style>
</style>
<template>
  <h2>ストリーミング</h2>

  <artist-list-view></artist-list-view>
  <album-list-view></album-list-view>
  <track-list-view></track-list-view>

  <hr>

  <play-list-view></play-list-view>
  <player-view></player-view>

  <a href="/">トップへ</a>
</template>
<script>
module.exports = {
  components: {
    artistListView: require('../components/artist-list.vue'),
    albumListView:  require('../components/album-list.vue'),
    trackListView:  require('../components/track-list.vue'),
    playListView:   require('../components/play-list.vue'),
    playerView:     require('../components/player.vue'),
  }
};
</script>
