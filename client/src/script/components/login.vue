<style lang="scss">
.login {
  width: 80%;
  margin: 0 auto;

  &-btn {
    margin-top: 8px;
  }
}
</style>
<template>
<div class="login">
  <form action="/login" method="post">
    <input type="text" name="id" v-model="id">
    <input type="password" name="pw" v-model="pw">
    <button class="login-btn" v-attr="disabled: isFormEmpty">Login</button>
  </form>
</div>
</template>
<script>
module.exports = {
  data: function() {
    return {
      id: '',
      pw: ''
    };
  },
  computed: {
    isFormEmpty: function() {
      return !(this.id.length && this.pw.length);
    }
  }
};
</script>
