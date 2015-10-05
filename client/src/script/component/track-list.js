'use strict';

var $id = document.getElementById.bind(document);

var TrackList = function() {
  this.data = {
    artistName: null,
    album: null
  };
  this.init.apply(this);
};
TrackList.prototype = {
  constructor: TrackList,
  init: function() {
    this.$ = {
      list: $id('track-list')
    };

    this._bindEvent();
    window.addEventListener('message', this, false);
  },
  handleEvent: function(ev) {
    var action = ev.data.action,
        data   = ev.data.data;
    if (action === 'SELECT_ALBUM') {
      this.data.album = data.album;
      this._show(data.album);
    }
    if (action === 'SELECT_ARTIST') {
      this.data.artistName = data.name;
    }
  },
  _show: function(album) {
    var artistName = this.data.artistName;
    var frag = document.createDocumentFragment();
    album.c.forEach(function(track) {
      var li = document.createElement('li');
      var name = track.n;
      // var dispName = track.n.split(artistName + ' - ')[1];
      // var ext = /\.\w+$/.exec(dispName)[0];
      // dispName = dispName.split(ext)[0];

      li.textContent = name;
      li.setAttribute('data-name', artistName + '/' + album.n + '/' + name);
      frag.appendChild(li);
    });
    this.$.list.innerHTML = '';
    this.$.list.appendChild(frag);
  },
  _bindEvent: function() {
    this.$.list.addEventListener('click', function(ev) {
      var name = ev.target.getAttribute('data-name');
      if (name.length === 0) { return; }

      window.postMessage({ action: 'SELECT_TRACK', data: { name: name } }, location.origin);
    }, false);
   }
};

module.exports = TrackList;
