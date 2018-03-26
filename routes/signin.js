var express = require('express');
var mongoose = require('mongoose'),
    User = require('../models/User');

var connStr = 'mongodb://localhost:27017/myNetworkDB';
mongoose.connect(connStr, function(err, db) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
mongoose.Promise = global.Promise;

var router = express.Router();

router.post('/', function(req, res, next) {
	console.log('userName: '+req.body.userName);
  	findUser(req.body.userName, req.body.password, res);
});

function findUser(userName, password, res) {
	User.findOne({ "userName": userName }, function(err, user) {
	    if (err) {
	    	console.log("error in find user:: "+err);
	    } 

	    // test a matching password
	    if(user !== null) {
		    user.comparePassword(password, function(err, isMatch) {
		        if (err) throw err;
		        if(isMatch) {
		        	console.log('User: '+userName+' Signed In successfully.'); 
		        	res.json(user);
		        } else {
		        	console.log('Sign In Failed. Please re-try with valid credentials.');
		        	res.json({});
		        }
		    });
		}
	});
}


module.exports = router;
