(function(global) {
  'use strict';

  var axios = require('axios');
  var document = global.document;

  var $id = document.getElementById.bind(document);

  var Search = function() {
    this.init.apply(this);
  };
  Search.prototype = {
    constructor: Search,
    init: function() {
      this.$ = {
        query: $id('query'),
        exec:  $id('exec'),
        res:   $id('res')
      };
      this.$.exec.addEventListener('click', this.execSearch.bind(this), false);
    },
    execSearch: function() {
      var that = this;
      var query = this.$.query.value;
      if (query.length === 0) { return; }

      axios.get('/api/search', {
        params: {
          q: query
        }
      })
      .then(that._handleRes.bind(that))
      .catch(function (res) {
        console.log(res);
      });
    },
    _handleRes: function(res) {
      this.$.res.textContent = JSON.stringify(res.data, null, 2);
    }
  };

  new Search();

}(window));
