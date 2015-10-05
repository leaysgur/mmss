'use strict';

var Vue = require('vue');

switch (location.pathname) {
case '/player':
  require('./controller/player');
  break;
case '/':
  new Vue(require('./app/index.vue')).$mount('#jsApp');
  break;
case '/login':
default:
  break;
}
