'use strict';

var pathname = location.pathname;

switch (pathname) {
case '/player':
  var ArtistList = require('./component/artist-list');
  new ArtistList();
  var AlbumList = require('./component/album-list');
  new AlbumList();
  var TrackList = require('./component/track-list');
  new TrackList();
  var Player = require('./component/player');
  new Player();
  var PlayList = require('./component/play-list');
  new PlayList();
  break;
case '/':
default:
  var Search = require('./component/search');
  new Search();
  break;
}
