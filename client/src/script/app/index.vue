<template>
  <h2>アーティスト検索</h2>
  <p class="content">
    アーティスト名を入力すると、持ってるアルバムがわかります
  </p>
  <div class="content">
    <search-view></search-view>
  </div>
</template>
<script>
module.exports = {
  components: {
    searchView: require('../components/search.vue')
  }
};
</script>
