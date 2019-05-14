const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const staticAsset = require('static-asset')
const config = require('./config')
const routes = require('./routes/index')
const models = require('./models/index')

// express
const app = express()

//uses
app.set('view engine', 'ejs')
app.use(bodyParser.json())
app.use(staticAsset(path.join(__dirname,'public')))
app.use(express.static(path.join(__dirname,'public')))

//routers
app.get('/', (req,res) => {
	return models.Recipe.find({})
		.then( recipes => {
			return res.render('index', {recipes})
		})
		.catch(console.log)
})
app.use('/recipe', routes.recipe)
app.use('/archive', routes.archive)


//catch 404 and forward to error handler
app.use( (req,res,next) => {
	const err = new Error('Not Found')
	err.status = 404
	next(err)
})
app.use((error,req,res,next) => {
	res.status(error.status || 500 )
	res.render('error', {
		message: error.message,
		error: !config.IS_PRODUCTION ? error : {}
	})
})

module.exports = app