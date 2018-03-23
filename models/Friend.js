var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var friendSchema = new Schema({
	name: {type: String, required: true},
	friendWith: [{type: mongoose.Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Friend', friendSchema); 
  