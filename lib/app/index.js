'use strict';

var express = require('express');
var app = express();

app.set('views', 'tmpl');
app.set('view engine', 'html');
app.engine('html', require('consolidate').lodash);

app.use('/',    require('routes/index'));
app.use('/api', require('routes/api'));

module.exports = app;
