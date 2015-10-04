'use strict';

var axios = require('axios');
var $id = document.getElementById.bind(document);

var AlbumList = function() {
  this.data = {
    items: []
  };
  this.init.apply(this);
};
AlbumList.prototype = {
  constructor: AlbumList,
  init: function() {
    this.$ = {
      list: $id('album-list')
    };

    window.addEventListener('message', this, false);
  },
  handleEvent: function(ev) {
    var data= ev.data;
    if (data.action === 'SELECT_ARTIST') {
      this._load(data.name);
    }
  },
  _load: function(name) {
    var that = this;
    axios
      .get('/api/album-list', {
        params: {
          n: name
        }
      })
      .then(that._handleRes.bind(that))
      .then(that._bindEvent.bind(that))
      .catch(function(res) {
        console.error(res);
      });
  },
  _handleRes: function(res) {
    this.data.items = res.data;
    var frag = document.createDocumentFragment();
    res.data.forEach(function(album) {
      var li = document.createElement('li');
      var name = album.n;
      li.textContent = name;
      li.setAttribute('data-name', name);
      frag.appendChild(li);
    });
    this.$.list.innerHTML = '';
    this.$.list.appendChild(frag);
  },
  _bindEvent: function() {
    var items = this.data.items;
    this.$.list.addEventListener('click', function(ev) {
      var name = ev.target.getAttribute('data-name');
      if (name.length === 0) { return; }

      var album = items.filter(function(album) {
        return album.n === name;
      })[0];

      window.postMessage({ action: 'SELECT_ALBUM', album: album }, location.origin);
    }, false);
   }
};

module.exports = AlbumList;
