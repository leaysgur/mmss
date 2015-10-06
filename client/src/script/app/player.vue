<template>
  <h2>ストリーミング</h2>

  <div class="columnWrap">
    <div class="columnWrap-item">
      <artist-list-view></artist-list-view>
    </div>
    <div class="columnWrap-item">
      <album-list-view></album-list-view>
    </div>
    <div class="columnWrap-item">
      <track-list-view></track-list-view>
    </div>
  </div>
  <play-list-view></play-list-view>
  <player-view></player-view>

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
