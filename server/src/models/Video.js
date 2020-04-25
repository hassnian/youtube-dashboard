const mongoose = require('mongoose');

const schema = mongoose.Schema({
	title: String,
	description: String,
	tags: String,
});

module.exports = mongoose.model('Video', schema);
