const express = require('express')
const router = express.Router()
const config = require('../config')
const models = require('../models/index')

router.get('/:page',(req,res) => {
	const perPage = +config.PER_PAGE
	const page = req.params.page || 1

	models.Recipe.find({}).skip(perPage * page - perPage )
			.limit(perPage)
			.then( recipes =>  {
				models.Recipe.count()
					.then( count => {
						res.render('index', {
							recipes,
							current: page,
							pages: Math.ceil(count / perPage)
						})	
					})
					.catch(console.log)
			})
			.catch(console.log)

})

module.exports = router