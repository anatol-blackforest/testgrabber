//reader
const path = require('path');
const fs = require('fs');

module.exports = function (res){
    //читаем json-файл
	let promise = new Promise((resolve, reject) => {
		fs.stat(path.join('public','json','news.json'), err => {
			if (err) return resolve("no data");
            fs.readFile(path.join('public','json','news.json'), (err, data) => resolve(JSON.parse(data.toString())))
		});
	});
    //передаем прочитанное в шаблон
	promise.then(result => res.render('index', { title: 'ТСН ВРАЖАЭ', data: result }));
    //ловим ошибки
	promise.catch(error => console.error(`Пизданулось :(  ${error.message}`));
};
