'use strict';

var axios = require('axios');
var $id = document.getElementById.bind(document);

var ArtistList = function() {
  this.data = {
    items: []
  };
  this.init.apply(this);
};
ArtistList.prototype = {
  constructor: ArtistList,
  init: function() {
    this.$ = {
      list: $id('artist-list')
    };
    this._load();
  },
  _load: function() {
    var that = this;
    axios
      .get('/api/artist-list')
      .then(that._handleRes.bind(that))
      .then(that._bindEvent.bind(that))
      .catch(function(res) {
        console.error(res);
      });
  },
  _handleRes: function(res) {
    this.data.items = res.data;
    var frag = document.createDocumentFragment();
    res.data.forEach(function(name) {
      var li = document.createElement('li');
      li.textContent = name;
      li.setAttribute('data-name', name);
      frag.appendChild(li);
    });
    this.$.list.appendChild(frag);
  },
  _bindEvent: function() {
    this.$.list.addEventListener('click', function(ev) {
      var name = ev.target.getAttribute('data-name');
      if (name.length === 0) { return; }

      window.postMessage({ action: 'SELECT_ARTIST', data: { name: name } }, location.origin);
    }, false);
  }
};

module.exports = ArtistList;
