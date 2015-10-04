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
        /// ディレクトリなら再帰
        if(fs.statSync(file).isDirectory()) {
          _walk(file, function(err, res) {
            results.push({
              dn: path.basename(file),
              fs: res
            });

            // 終わり
            if (!--pending) {
              callback(null, results);
            }
          });
        }

        return fs.statSync(file).isFile();
      }).forEach(function (file) {
        results.push({
          fn: path.basename(file)
        });

        if (!--pending) {
          callback(null, results);
        }
      });
    });
  }
};
