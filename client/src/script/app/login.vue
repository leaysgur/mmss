<template>
  <h2>ストリーミング</h2>
  <p class="content">
    この先はログインが必要です。
  </p>
  <div class="content">
    <login-view></login-view>
  </div>
</template>
<script>
module.exports = {
  components: {
    loginView: require('../components/login.vue')
  }
};
</script>
