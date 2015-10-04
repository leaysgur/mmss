'use strict';
var fs = require('fs');

var config = require('config');
var mmss   = require('mmss');


// 引数で音源のあるディレクトリのパスをもらう
var MUSIC_PATH = process.argv[2];
if (MUSIC_PATH === undefined) {
  console.error('Path to your music dir is required!');
  console.error('  npm start ./path/to/your/music');
  process.exit(1);
}

// ディレクトリ！
if (fs.statSync(MUSIC_PATH).isDirectory() === false) {
  console.error('Specified path is not a directory!');
  console.error('  npm start ./path/to/your/music');
  process.exit(1);
}

// 無事に確保できたらサーバー立てる
config.MUSIC_PATH = MUSIC_PATH;
mmss.start(config);
