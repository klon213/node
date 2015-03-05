module.exports = function(req, res, next) {
	res.sendHttpError = function(error) {
		res.status(error.status);
		res.json(error);
		/*
		 if(res.req.header(['x-requested-with'] == 'XMLHttpRequest')) {

		 } else {
		 res.render('error', {error: error});
		 }
		 */
	};
	next();
};