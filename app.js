const express = require('express');
const app = express();
const Twig = require("twig");
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const grabber = require('./lib/grabber');
const reader = require('./lib/reader');

app.set("twig options", {strict_variables: false});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

//use
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

//модуль граббер
grabber();

//модуль ридер
app.get('/', (req, res) => reader(res));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
