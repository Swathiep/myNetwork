var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var groupSchema = new Schema({
	groupName: {type: String, required: true},
	admin: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
	members: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
	createdDate: Date
});

module.exports = mongoose.model('Group', groupSchema);