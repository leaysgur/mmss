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
    var data = ev.data;
    if (data.action === 'SELECT_ALBUM') {
      this.data.album = data.album;
      this._show(data.album);
    }
    if (data.action === 'SELECT_ARTIST') {
      this.data.artistName = data.name;
      this._hide();
    }
    if (data.action === 'TRACK_END') {
      this._triggerNext(data.name);
    }
  },
  _show: function(album) {
    var artistName = this.data.artistName;
    var frag = document.createDocumentFragment();
    album.c.forEach(function(track) {
      var li = document.createElement('li');
      var name = track.n;
      li.textContent = name;
      li.setAttribute('data-name', artistName + '/' + album.n + '/' + name);
      frag.appendChild(li);
    });
    this.$.list.innerHTML = '';
    this.$.list.appendChild(frag);
  },
  _hide: function() {
    this.$.list.innerHTML = '';
   },
  _bindEvent: function() {
    this.$.list.addEventListener('click', function(ev) {
      var name = ev.target.getAttribute('data-name');
      if (name.length === 0) { return; }

      window.postMessage({ action: 'SELECT_TRACK', name: name }, location.origin);
    }, false);
   },
  _triggerNext: function(name) {
    var trackList = this.data.album.c.map(function(track) { return track.n; });
    var idx = trackList.indexOf(name) + 1;
    idx = idx === trackList.length ? 0 : idx;
    var li = this.$.list.getElementsByTagName('li');
    var ev = document.createEvent('MouseEvents');
    ev.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);

    li[idx].dispatchEvent(ev);
   }
};

module.exports = TrackList;
