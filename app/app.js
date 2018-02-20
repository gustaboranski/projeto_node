// modulos de importação
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressNunjucks = require('express-nunjucks');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
require('./passport');

// rotas importadas
//var index = require('./routes/index');
const index = require('./routes/musicas');
var users = require('./routes/users');
var tabuada = require('./routes/tabuada');
const login = require('./routes/login');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'njk');

var njk = expressNunjucks(app, { watch : true });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        let method = req.body._method;
	delete req.body._method;
	return method;
    }
}));
app.use(session({
    secret : 'teste sessoes', 
    resave : false, 
    saveUninitialized : false 
}));

app.use(passport.initialize());
app.use(passport.session());

//caminho das rotas
app.use('/', index);
app.use('/users', users);
app.use('/tabuada', tabuada);
app.use('/', login);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
