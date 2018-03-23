var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var eventSchema = new Schema({
	description: {type: String, required: true},
	eventDate: {type: Date, required: true},
	oneTime: {type: Boolean, default: false},
	relatedTo: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Event', eventSchema);
