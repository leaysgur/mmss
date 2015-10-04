'use strict';

var express      = require('express');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');

var app = express();

app.set('views', __dirname + '/../tmpls');
app.set('view engine', 'html');
app.engine('html', require('consolidate').lodash);

app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({
  secret: 'mmss',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 30 * 60 * 1000
    }
}));


// TODO: srcはいらなくなる
app.use(express.static('client/build'));
app.use(express.static('client/public'));

// ページを返す
app.use('/',    require('routes/index'));
// APIで叩く
app.use('/api', require('routes/api'));

module.exports = app;
