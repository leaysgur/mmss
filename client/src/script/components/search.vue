<style lang="scss">
.search {
  &-form {
    display: flex;
    margin-bottom: 8px;

    &-btn {
      margin-left: 8px;
      width: 80px;
    }
  }

  &-res {
    background-color: #fff;

    &-item {
      padding: 0 8px;
    }
  }
}
</style>
<template>
<div class="search">
  <div class="search-form">
    <input type="text" v-model="query">
    <button class="search-form-btn" v-on="click: execSearch" v-attr="disabled: isQueryEmpty">Search</button>
  </div>

  <p v-show="found.length !== 0" class="content">{{found.length}}件見つかりました。</p>
  <ul class="search-res">
    <li class="search-res-item" v-show="isNotFound">見つかりませんでした</li>
    <li class="search-res-item" v-repeat="set in found">
      {{set.artist}} - {{set.album}}
    </li>
  </ul>
</div>
</template>
<script>
var axios = require('axios');

module.exports = {
  data: function() {
    return {
      isNotFound: false,
      query: '',
      found: []
    };
  },
  computed: {
    isQueryEmpty: function() {
      return this.query.length === 0;
    }
  },
  methods: {
    execSearch: function() {
      axios.get('/api/search', {
        params: {
          q: this.query
        }
      })
      .then(this._handleRes)
      .catch(function (res) {
        console.error(res);
      });
    },
    _handleRes: function(res) {
      this.found = res.data;
      this.isNotFound = res.data.length === 0;
    }
  }
};
</script>
