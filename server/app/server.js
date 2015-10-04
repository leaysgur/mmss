'use strict';

var express = require('express');
var app = express();

app.set('views', __dirname + '/../tmpls');
app.set('view engine', 'html');
app.engine('html', require('consolidate').lodash);

// TODO: srcはいらなくなる
app.use(express.static('client/src'));
app.use(express.static('client/build'));
app.use(express.static('client/public'));

// ページを返す
app.use('/',    require('routes/index'));
// APIで叩く
app.use('/api', require('routes/api'));

module.exports = app;
