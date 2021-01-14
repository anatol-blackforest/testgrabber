// grabber

const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs');
const util = require('util');

// Написать сервис (парсер), который параллельно с сайта ain.ua сохранит в базу пять последних статей, из разных категорий 
// (структуры DB придумать самому, написать миграции).Также нужно реализовать следующие роуты

// 1) Вывести список статей (заголовок + 300 символов из текста), с пагинацией.

// 2) Просмотр статьи (весь текст + изображения, если есть)

// 3) Подготовить Postmen коллекцию для тестирования.

// Stack: Node JS, Express, ORM-sequelize, PostgreSQL

let $, jsonArr;

module.exports = function grabber (){
    //считываем сайт
    let promise = new Promise((resolve, reject) => {
	    request.get('https://ain.ua/', (error, response, data) => {
			if (!error && response.statusCode == 200) {
				jsonArr = [];
				//грабим ленту новостей (5 штук), формируя json
		        let $ = cheerio.load(data);
				$('.block-last-news li').each(function(i, element){
					jsonArr.push($(this).find('a').attr('href'));
				});
				jsonArr = jsonArr.slice(0,5)
				resolve(jsonArr.slice(0,5));
			}
		});
	}).then(async result => {
		let items = await result.map(async link => {
			let result = await new Promise((resolve, reject) => {
				request.get(link, (error, response, data) => {
					if (!error && response.statusCode == 200) {
						let $ = cheerio.load(data);
						article = {
							link,
							title: $('H1').text(),
							img: $('.wp-block-image img').attr('src'),
							text: $('.post-content').text()
						}
						resolve(article)
					}
				});
			})
            return result
		})
		return Promise.all(items)
	}).then(items => {
		console.log(items)
	})
	//promise.then(result => fs.writeFile(path.join('public','json','news.json'), JSON.stringify(result), setTimeout(grabber, 10000)));
    //ловим ошибки
	promise.catch(error => console.error(`Crash :(  ${error.message}`));

};
