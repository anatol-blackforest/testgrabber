// Написать сервис (парсер), который параллельно с сайта ain.ua сохранит в базу пять последних статей, из разных категорий 
// (структуры DB придумать самому, написать миграции). Также нужно реализовать следующие роуты
// 1) Вывести список статей (заголовок + 300 символов из текста), с пагинацией.
// 2) Просмотр статьи (весь текст + изображения, если есть)
// 3) Подготовить Postmen коллекцию для тестирования.
// Stack: Node JS, Express, ORM-sequelize, PostgreSQL

const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan');
require('dotenv').config()
const grabber = require('./lib/grabber');
const getall = require('./lib/getall');
const article = require('./lib/article');
const model = require('./lib/model');

//use
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.USERNAME, process.env.PASSWORD, {
  host: 'localhost',
  port: process.env.DB_PORT,
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
app.get('/articles', (req, res) => getall(req, res, News));
app.get('/articles/:id', (req, res) => article(req, res, News));

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
  res.send({'error': err});
});

module.exports = app;
