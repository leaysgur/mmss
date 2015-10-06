<template>
<ul>
  <li class="clickableLi" v-repeat="items" v-on="click: onClickArtist($value)">
    {{$value}}
  </li>
</ul>
</template>
<script>
var axios = require('axios');

module.exports = {
  data: function() {
    return {
      items: []
    };
  },
  methods: {
    _handleRes: function(res) {
      this.items = res.data;
    },
    onClickArtist: function(name) {
      if (name === null || name.length === 0) { return; }

      window.postMessage({ action: 'SELECT_ARTIST', data: { name: name } }, location.origin);
    }
  },
  created: function() {
    axios
      .get('/api/artist-list')
      .then(this._handleRes)
      .catch(function(res) {
        console.error(res);
      });
  }
};
</script>
