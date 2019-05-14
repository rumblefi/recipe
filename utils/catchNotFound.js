function catchNotFound(next) {
	const err = new Error('Not Found')
	err.status = 404
	return next(err)
}

module.exports = catchNotFound