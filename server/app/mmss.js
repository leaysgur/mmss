'use strict';

var fs    = require('fs');
var utils = require('utils');
var ID3   = require('id3');

var MMSS = function() {
  this.config = {};
  this.music  = {};
};

MMSS.prototype = {
  constructor: MMSS,
  start: function(config) {
    this.config = config;

    this.build(function(err) {
      if (err) {
        console.error('Building file list failed..');
        process.exit(1);
      }
      // 遅延ロードじゃないとダメ
      var server = require('app/server').listen(config.PORT, function() {
        var port = server.address().port;
        console.log('App is running on port: %s', port);
      });
    });
  },
  build: function(fn) {
    console.log('Building file list start...');
    var that = this;
    utils.dir2obj(this.config.MUSIC_PATH, function(err, res) {
      if (err) { fn(err); }
      console.log('Building file list finish!');

      that.music = res;
      fn && fn(null);
    });
  },
  search: function(query, fn) {
    var foundAlbums = [];
    if (query === null) {
      return fn(null, foundAlbums);
    }

    var qRe = new RegExp(query, 'i');
    // まずはアーティスト名で探す
    var foundArtists = this.music.filter(function(artist) {
      return ('c' in artist) && qRe.test(artist.n);
    });

    if (foundArtists.length === 0) {
      return fn(null, foundAlbums);
    }

    foundArtists.forEach(function(artist) {
      artist.c.forEach(function(album) {
        foundAlbums.push({
          artist: artist.n,
          album:  album.n
        });
      });
    });

    fn(null, foundAlbums);
  },
  getArtistList: function(fn) {
    var artists = [];

    this.music.forEach(function(artist) {
      if ('c' in artist) {
        artists.push(artist.n);
      }
    });

    fn(null, artists.sort());
  },
  getAlbumList: function(name, fn) {
    var albums = [];

    var artist = this.music.filter(function(artist) {
      return artist.n === name;
    })[0];

    artist.c.forEach(function(album) {
      // Disc1とか
      if ('c' in album.c[0]) {
        var tracks = [];
        album.c.forEach(function(disk) {
          tracks = tracks.concat(disk.c.map(function(track) { return { n: disk.n + '/' + track.n }; }));
        });
        album.c = tracks;
      }
      albums.push(album);
    });

    var MUSIC_PATH = this.config.MUSIC_PATH;
    albums = albums.map(function(album) {
      var dirPath = MUSIC_PATH + '/' + name + '/' + album.n + '/';
      album.c = album.c.map(function(track) {
        var path = dirPath + track.n;

        var fileBuffer = fs.readFileSync(path);
        var id3 = new ID3(fileBuffer);
        id3.parse();
        track.t = {
          ti: id3.get('title'),
          al: id3.get('album'),
          ar: id3.get('artist'),
          tr: id3.get('track')
        };

        return track;
      }).sort(function(a, b) {
        var aNum = a.t.tr.split('/')[0]|0;
        var bNum = b.t.tr.split('/')[0]|0;
        return aNum > bNum ? 1 : -1;
      });
      return album;
    });

    fn(null, albums);
  },
  getTrack: function(name, fn) {
    var track = {
      path: this.config.MUSIC_PATH + '/' + name
    };
    fn(null, track);
  }
};

module.exports = (new MMSS());
