const express = require('express')
const models = require('../models/index')
const catchNotFound = require('../utils/catchNotFound')

const router = express.Router()

router.get('/add', (req, res) => {
	res.render('form')
})

router.post('/add', (req, res) => {
	const {
		title,
		recipeDescription,
		imageURL,
		ingredients,
		instructions
	} = req.body

	models.Recipe.create({
			title,
			description: recipeDescription,
			imageURL,
			ingredients,
			instructions
		})
		.then(recipe => {
			res.json({
				ok: true
			})
		})
		.catch(error => {
			console.log(error)
			res.json({
				ok: false
			})
		})

})

router.get('/:recipe', (req, res, next) => {
	const url = req.params.recipe.trim().replace(/ +(?= )/g, '')
	if (!url) {
		return catchNotFound(next)
	} else {
		models.Recipe.findOne({
				url
			})
			.then(recipe => {
				if (!recipe) {
					return catchNotFound(next)
				} else {
					return res.render('recipe', {
						recipe
					})
				}
			})
			.catch(console.error)
	}
})

module.exports = router