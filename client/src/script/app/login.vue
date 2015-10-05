<style>
</style>
<template>
  <h2>ストリーミング</h2>
  <p>
    この機能はログインが必要
  </p>
  <login-view></login-view>

  <a href="/">トップへ</a>
</template>
<script>
module.exports = {
  data: function() {
    return {};
  },
  components: {
    loginView: require('../components/login.vue')
  }
};
</script>
