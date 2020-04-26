const mongoose = require('mongoose');

const schema = mongoose.Schema({
	title: String,
	description: String,
	tags: Array,
});

module.exports = mongoose.model('Video', schema);
