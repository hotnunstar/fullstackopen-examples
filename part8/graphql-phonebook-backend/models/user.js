const mongoose = require('mongoose')

const schema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		minlength: [3, 'User username must be at least 3 characters long'],
	},
	friends: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Person',
		},
	],
})

module.exports = mongoose.models.User || mongoose.model('User', schema)
