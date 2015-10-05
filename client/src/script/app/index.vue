<style>
</style>
<template>
  <h2>アーティスト検索</h2>
  <p>
    アーティスト名をいれると持ってるアルバムが表示される
  </p>
  <search-view></search-view>

  <a href="/player">playerへ</a>
</template>
<script>
module.exports = {
  data: function() {
    return {};
  },
  components: {
    searchView: require('../components/search.vue')
  }
};
</script>
