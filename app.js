'use strict';
var fs = require('fs');

var Log = require('util/log');
var log = new Log();

var config = require('config');


// 引数で音源のあるディレクトリのパスをもらう
var MUSIC_PATH = process.argv[2];
if (MUSIC_PATH === undefined) {
  log.e('Path to your music dir is required!');
  log.e('  npm start ./path/to/your/music');
  process.exit(1);
}

// ディレクトリ！
if (fs.statSync(MUSIC_PATH).isDirectory() === false) {
  log.e('Specified path is not a directory!');
  log.e('  npm start ./path/to/your/music');
  process.exit(1);
}

config.MUSIC_PATH = MUSIC_PATH;
console.log(config);
