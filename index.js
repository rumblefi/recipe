const app = require('./app')
const config = require('./config')
const database = require('./database')

database()
	.then( info => {
		console.log(`Connected to ${info.host}:${info.port}/${info.name}`)
		app.listen(config.PORT, () => console.log('Example app') )
	})
	.catch( () => {
		console.error('Unable to connect to database')
		process.exit(1)
	})