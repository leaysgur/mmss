'use strict';

var $id = document.getElementById.bind(document);

var PlayList = function() {
  this.data = {
  };
  this.init.apply(this);
};
PlayList.prototype = {
  constructor: PlayList,
  init: function() {
    this.$ = {
      list: $id('play-list')
    };

    this._bindEvent();
    window.addEventListener('message', this, false);
  },
  handleEvent: function(ev) {
    var action = ev.data.action,
        data   = ev.data.data;
    if (action === 'SELECT_TRACK') {
      this._cloneTrackList();
    }
    if (action === 'TRACK_END') {
      this._triggerNext(data.name);
    }
  },
  _cloneTrackList: function() {
    this.$.list.innerHTML = $id('track-list').innerHTML;
  },
  _bindEvent: function() {
    this.$.list.addEventListener('click', function(ev) {
      var name = ev.target.getAttribute('data-name');
      if (name.length === 0) { return; }

      window.postMessage({ action: 'SELECT_TRACK', data: { name: name } }, location.origin);
    }, false);
   },
  _triggerNext: function(name) {
    var li = this.$.list.getElementsByTagName('li');
    var trackList = [].slice.call(li).map(function(el) { return el.getAttribute('data-name'); });
    var idx = trackList.indexOf(name) + 1;
    idx = idx === trackList.length ? 0 : idx;
    window.postMessage({ action: 'PLAY_TRACK', data: { name: trackList[idx] } }, location.origin);
   }
};

module.exports = PlayList;
