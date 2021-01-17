//reader

module.exports = function (req, res, News){
	let promise = new Promise(async (resolve, reject) => {
		let data = await News.findAll({
			limit: req.query.limit,
			offset: req.query.offset,
			order: [['id', 'ASC']]
		})
		resolve(data)
	});
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
