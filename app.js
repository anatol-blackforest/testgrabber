// Написать сервис (парсер), который параллельно с сайта ain.ua сохранит в базу пять последних статей, из разных категорий 
// (структуры DB придумать самому, написать миграции). Также нужно реализовать следующие роуты

// 1) Вывести список статей (заголовок + 300 символов из текста), с пагинацией.

// 2) Просмотр статьи (весь текст + изображения, если есть)

// 3) Подготовить Postmen коллекцию для тестирования.

// Stack: Node JS, Express, ORM-sequelize, PostgreSQL

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
const model = require('./lib/model');

app.set("twig options", {strict_variables: false});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

//use
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres', 'postgres', 'postgres', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение установлено');
  })
  .catch(err => {
    console.error('Ошибка соединения');
  })

const News = model(sequelize, Sequelize)

//модуль парсер
app.get('/parse', (req, res) => grabber(res, News));

//модуль ридер
app.get('/', (req, res) => reader(res, News));

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
