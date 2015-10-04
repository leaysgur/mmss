'use strict';

var axios = require('axios');
var $id = document.getElementById.bind(document);

var ArtistList = function() {
  this.init.apply(this);
};
ArtistList.prototype = {
  constructor: ArtistList,
  init: function() {
    this.$ = {
      list: $id('list')
    };
    this._load();
  },
  _load: function() {
    var that = this;
    axios
      .get('/api/artist-list')
      .then(that._handleRes.bind(that))
      .catch(function(res) {
        console.error(res);
      });
  },
  _handleRes: function(res) {
    var frag = document.createDocumentFragment();
    res.data.forEach(function(name) {
      var li = document.createElement('li');
      li.textContent = name;
      li.setAttribute('data-id', name);
      frag.appendChild(li);
    });
    this.$.list.appendChild(frag);
  }
};

module.exports = ArtistList;
