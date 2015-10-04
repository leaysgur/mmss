'use strict';

var fs   = require('fs');
var path = require('path');

module.exports = function(dir, fn) {
  _walk(dir, fn);

  function _walk(baseDir, callback){
    var results = [];

    fs.readdir(baseDir, function(err, files) {
      if (err) { return fn(err); }

      var pending = files.length;
      if (!pending) { return callback(null, results); }

      files.map(function (file) {
        return path.join(baseDir, file);
      }).filter(function (file) {
        // ディレクトリなら再帰
        if(fs.statSync(file).isDirectory()) {
          _walk(file, function(err, res) {
            // [!] これがディレクトリのデータ構造
            results.push({
              n: path.basename(file),
              c: res
            });

            // 終わり
            if (!--pending) {
              callback(null, results);
            }
          });
        }

        return fs.statSync(file).isFile();
      }).forEach(function (file) {
        var pathArr = file.split('/');
        var fileName = pathArr[pathArr.length - 1];
        // .からはじまるゴミファイルは無視
        if (fileName.charAt(0) !== '.') {
          // [!] これがファイルのデータ構造
          results.push({
            n: path.basename(file)
          });
        }

        // 終わり
        if (!--pending) {
          callback(null, results);
        }
      });
    });
  }
};
