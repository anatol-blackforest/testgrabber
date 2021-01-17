// grabber

const request = require('request');
const cheerio = require('cheerio');

let $, jsonArr;

module.exports = function grabber (res, News){
    //считываем сайт
    let promise = new Promise((resolve, reject) => {
	    request.get('https://ain.ua/', (error, response, data) => {
			if (!error && response.statusCode == 200) {
				jsonArr = [];
				//грабим ленту новостей (5 штук), формируя массив
		        let $ = cheerio.load(data);
				$('.block-last-news li').each(function(i, element){
					jsonArr.push($(this).find('a').attr('href'));
				});
				jsonArr = jsonArr.slice(0,5)
				resolve(jsonArr);
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
	}).then(async items => {
		await News.destroy({ truncate : true, cascade: false })
		items = items.map(async item => await News.create({ 
			link: item.link, 
			title: item.title, 
			img: item.img, 
			text: item.text.trim()
		}))
		Promise.all(items)
		return res.json({parsed: true})
	})
    //ловим ошибки
	promise.catch(error => console.error(`Crash :(  ${error.message}`));

};
