'use strict';

var axios = require('axios');

var AjaxInterseptor = function() {
  this.init.apply(this);
};

AjaxInterseptor.prototype = {
  constructor: AjaxInterseptor,
  init: function() {
    axios.interceptors.request.use(function(config) {
      window.postMessage({ action: 'PRE_AJAX', data: null }, location.origin);
      return config;
    }, function(error) {
    });
    axios.interceptors.response.use(function(res) {
      window.postMessage({ action: 'POST_AJAX', data: null }, location.origin);
      return res;
    }, function(error) {
    });
  }
};

module.exports = (new AjaxInterseptor());

