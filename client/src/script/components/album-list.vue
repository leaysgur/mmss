<template>
<ul>
  <li class="clickableLi" v-repeat="album in items" v-on="click: onClickAlbum(album.n)">
    {{album.n}}
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
    onClickAlbum: function(name) {
      var album = this.items.filter(function(album) {
        return album.n === name;
      })[0];

      window.postMessage({ action: 'SELECT_ALBUM', data: { album: album } }, location.origin);
    },
    handleEvent: function(ev) {
      var action = ev.data.action,
          data   = ev.data.data;
      if (action === 'SELECT_ARTIST') {
        this._load(data.name);
      }
    },
    _load: function(name) {
      axios
        .get('/api/album-list', {
          params: {
            n: name
          }
        })
        .then(this._handleRes)
        .catch(function(res) {
          console.error(res);
        });
    }
  },
  created: function() {
    window.addEventListener('message', this, false);
  }
};
</script>
