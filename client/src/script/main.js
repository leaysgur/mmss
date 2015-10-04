'use strict';

var pathname = location.pathname;

switch (pathname) {
case '/player':
  break;
case '/':
default:
  var Search = require('./component/search');
  new Search();
  break;
}
