const mongoose = require('mongoose')
const URLSlugs = require('mongoose-url-slugs')
const tr = require('transliter')

const {
	Schema
} = mongoose

const schema = new Schema({
	title: {
		type: String,
		required: true
	},
	description: {
		type: String,
		required: true
	},
	imageURL: {
		type: String,
		required: true
	},
	ingredients: {
		type: Array,
		required: true
	},
	instructions: {
		type: String,
		required: true
	},
}, {
	timestamps: true
})

schema.plugin(
	URLSlugs('title', {
		field: 'url',
		generator: text => tr.slugify(text)
	})
)

schema.set('toJSON', {
	virtuals: true
})

module.exports = mongoose.model('Recipe', schema)