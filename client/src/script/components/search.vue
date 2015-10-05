<style>
</style>
<template>
  <input type="text" v-model="query">
  <button v-on="click: execSearch" v-attr="disabled: isQueryEmpty">Search</button>
  <div>
    <ul v-show="found.length !== 0">
      <li v-repeat="set in found">
        {{set.artist}} - {{set.album}}
      </li>
    </ul>
    <p v-show="found.length === 0">見つかりませんでした</p>
  </div>
</template>
<script>
var axios = require('axios');

module.exports = {
  data: function() {
    return {
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
    }
  }
};
</script>

