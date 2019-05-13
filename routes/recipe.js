const express = require('express')
const models = require('../models/index')

const router = express.Router()

router.get('/add', (req,res) => {
	res.render('form')
})

router.post('/add', (req,res) => {
	const {title,recipeDescription,imageURL,ingredients,instructions} = req.body

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
	.catch( error => {
		console.log(error)
		res.json({
			ok: false
		})
	})

})

module.exports = router