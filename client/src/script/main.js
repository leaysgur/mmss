'use strict';

var pathname = location.pathname;

switch (pathname) {
case '/player':
  var ArtistList = require('./component/artist-list');
  new ArtistList();
  // var Player = require('./component/player');
  break;
case '/':
default:
  var Search = require('./component/search');
  new Search();
  break;
}
