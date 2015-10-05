'use strict';

var express      = require('express');
var session      = require('express-session');
var bodyParser   = require('body-parser');
var cookieParser = require('cookie-parser');
var middleware   = require('app/middleware');

var app = express();

// テンプレートまわり
app.set('views', './');
app.set('view engine', 'html');
app.engine('html', require('consolidate').lodash);

// ログイン・セッションまわり
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

// 静的ファイルまわり
app.use(express.static('client/build'));
app.use(express.static('client/public'));

// ルーター・コントローラーまわり
// ページを返す
app.use('/',    require('routes/index'));
// APIで叩く
app.use('/api', require('routes/api'));

// ログイン後だけ通るやつ
app.use('/',    middleware.isLogin,    require('routes/auth/index'));
app.use('/api', middleware.isLoginAPI, require('routes/auth/api'));

module.exports = app;
