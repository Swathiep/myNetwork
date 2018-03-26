var mongoose = require('mongoose'),
    User = require('./models/User'),
    express = require('express'),
    async = require('async')

var app = express();
module.exports = app;

var connStr = 'mongodb://localhost:27017/myNetworkDB';
mongoose.connect(connStr, function(err, db) {
    if (err) throw err;
    console.log('Successfully connected to MongoDB');
});
mongoose.Promise = global.Promise;

var usersInserted = [];

function createUser(userName, password, phone, email, bornOn, callback) {
	var userDetail = {userName: userName,
    password: password,
    phone: phone,
    email: email,
    bornOn: bornOn
	};

	var userToInsert = new User(userDetail);
	// save user to database
	userToInsert.save(function(err) {
	    if (err) {
	    	console.log("error in saving user:: "+err);
	    	callback(err, null);
	    	return;
	    } 
	    console.log('User Successfully saved:: '+userToInsert);
	    usersInserted.push(userToInsert);
	    callback(null, userToInsert);
	});
}

function InsertUsers(callBack) {
	async.parallel([
		function(callback) {
			createUser('Swathi', 'swa@2018', 7795728976, 'swathiep2009@gmail.com', new Date('1988-05-07'), callback);
		},
		function(callback) {
			createUser('BalajiDN', 'Bala@123', 9844765624, 'balajiforyou@gmail.com', new Date('1987-03-03'), callback);
		},
		function(callback) {
			createUser('BalajiEP', 'Balaep@123', 9845373031, 'balajiep@gmail.com', new Date('1985-07-08'), callback);
		},
		function(callback) {
			createUser('Mayura', 'mayura#2018', 7874567893, 'mayura@gmail.com', new Date('1985-06-14'), callback);
		},
		function(callback) {
			createUser('Yashil', 'yashildatta@2016', 9845365478, 'yashilDB@gmail.com', new Date('2016-01-07'), callback);
		},
		function(callback) {
			createUser('Sahana', 'sahana@123', 8822680412, 'sahana2014@gmail.com', new Date('1986-08-20'), callback);
		},
		function(callback) {
			createUser('User1', 'user1@123', 9076534214, 'user1@gmail.com', new Date('1981-07-08'), callback);
		},
		function(callback) {
			createUser('User2', 'user2@123', 9845235678, 'user2@gmail.com', new Date('1983-02-18'), callback);
		},
		function(callback) {
			createUser('User3', 'user3@897', 7892345670, 'user3@gmail.com', new Date('1984-04-20'), callback);
		},
		function(callback) {
			createUser('User4', 'user4@123', 8943216754, 'user4@gmail.com', new Date('1985-07-08'), callback);
		},
		function(callback) {
			createUser('User5', 'user5@123', 9054321454, 'user5@gmail.com', new Date('1981-10-09'), callback);
		},
		function(callback) {
			createUser('User6', 'user6@123', 7894289322, 'user6@gmail.com', new Date('1980-11-28'), callback);
		},
		function(callback) {
			createUser('User7', 'user7@123', 9845356423, 'user7@gmail.com', new Date('1989-12-18'), callback);
		},
		function(callback) {
			createUser('User8', 'user8@123', 9844211980, 'user8@gmail.com', new Date('1982-10-10'), callback);
		},
		function(callback) {
			createUser('User9', 'user9@123', 9943507564, 'user9@gmail.com', new Date('1990-04-02'), callback);
		},
		function(callback) {
			createUser('User10', 'user10@123', 9760199096, 'user10@gmail.com', new Date('1992-10-10'), callback);
		}
	], callBack);
}

// create a user a new user
async.series([InsertUsers], function(err, result) {
	if (err) {
        console.log('FINAL ERROR: '+err);
    }
    else {
        console.log('result: '+result);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});


