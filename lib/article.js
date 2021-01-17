//reader

module.exports = function (req, res, News){
	let promise = new Promise(async (resolve, reject) => {
		console.log(req.params)
		let data = await News.findAll({
			where: {
			  id: req.params.id
			}
		}); 
		resolve(data[0])
	});
	promise.then(data => {
		data.text = data.text.replace(/  +/g,'').replace(/[\r\n]+/g, '\n')
		res.json(data)
	});
    //ловим ошибки
	promise.catch(error => console.error(`Crash :(  ${error.message}`));
};
