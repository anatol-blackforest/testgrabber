//reader

module.exports = function (res, News){
    //читаем json-файл
	let promise = new Promise(async (resolve, reject) => {
		let data = await News.findAll({raw: true })
		resolve(data)
	});
    //передаем прочитанное в шаблон
	promise.then(data => {
		data = data.map(item => {
			item.text = item.text.replace(/  +/g,'').replace(/[\r\n]+/g, '\n').slice(0,300)
			return item
		})
		res.json(data)
	});
    //ловим ошибки
	promise.catch(error => console.error(`Crash :(  ${error.message}`));
};
