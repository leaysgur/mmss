<style>
</style>
<template>
  <input type="text" v-model="query">
  <button v-on="click: execSearch" v-attr="disabled: isQueryEmpty">Search</button>
  <div>
    <ul>
      <li v-show="isNotFound">見つかりませんでした</li>
      <li v-repeat="set in found">
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
      if (res.data.length === 0) {
        this.isNotFound = true;
        return;
      }
      this.found = res.data;
      this.isNotFound = false;
    }
  }
};
</script>
