const express = require('express')

const router = express.Router()

router.get('/add', (req,res) => {
	res.render('form')
})

router.post('/add', (req,res) => {
	console.log(req.body)
	res.json({
		ok: true
	})
})

module.exports = router