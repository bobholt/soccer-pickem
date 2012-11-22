"use strict";

/* DB SETUP */
var config = require('../../.config');
var crypto = require('crypto');
var encryption = require('../encryption/index').encryption;
var mongoose = require('mongoose');

mongoose.connection.on('open', function(){
	console.log('mongodb is connected!');
});

var db = mongoose.connect(config.creds.mongoose_auth);

function toUpper(string) {
	return string.toUpperCase();
}

function toLower(string) {
	return string.toLowerCase();
}

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

/* COUNTRIES */

var CountrySchema = new Schema({
	name: {
		type: String,
		index: {
			unique: true
		},
		required: true,
		unique: true
	},
	code: {
		type: String,
		required: true,
		unique: true,
		set: toUpper
	},
	updated: {
		type: Date,
		required: true,
		default: new Date(),
		select: false
	}
});

var Country = mongoose.model('Country', CountrySchema);

function addCountry(req, res, next){
	var country = new Country();
	country.name = req.body.name;
	country.code = req.body.code;
	country.updated = new Date();
	country.save(function(err){
		res.send(req.body);
	});
}

function editCountry(req, res, next){
	Country.findOne({ _id: req.body._id }, function(err, doc) {
		doc.name = req.body.name;
		doc.code = req.body.code;
		doc.updated = new Date();
		doc.save(function(err){
			res.send(req.body);
		});
	});
}

function getCountries(req, res, next){
	Country.find().sort('name', 1).exec(function(arr, data) {
		if (data.length > 0) {
			res.send(data);
		} else {
			res.statusCode = 204;
			res.end(':: no data ::');
		}
	});
}

function getCountry(req, res, next){
	Country.findOne(
		{ name: req.params.name.replace('_', ' ') },
		function(err, doc) {
			res.send(doc);
		}
	);
}

/* LEAGUES */

var LeagueSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true
	},
	country_code: {
		type: String,
		required: true,
		index: true
	},
	playable: {
		type: Boolean,
		required: true,
		default: false
	},
	updated: {
		type: Date,
		required: true,
		default: new Date(),
		select: false
	},
	tier: {
		type: Number,
		required: true,
		default: 0
	}
});

var League = mongoose.model('League', LeagueSchema);

function addLeague(req, res, next){
	var league = new League();
	league.name = req.body.name;
	league.tier = req.body.tier;
	league.country_code = req.body.country_code;
	league.updated = new Date();
	league.playable = req.body.playable;
	league.save(function(err){
		res.send(req.body);
	});
}

function editLeague(req, res, next){
	League.findOne({ _id: req.body._id }, function(err, doc) {
		doc.name = req.body.name;
		doc.country_code = req.body.country_code;
		doc.tier = req.body.tier;
		doc.updated = new Date();
		doc.playable = req.body.playable;
		doc.save(function(err){
			res.send(req.body);
		});
	})
}

function getLeagues(req, res, next){
	League.find().sort('tier', 1).exec(function(arr, data) {
		if (data.length > 0) {
			res.send(data);
		} else {
			res.statusCode = 204;
			res.end(':: no data ::');
		}
	});
}


/* TEAMS */

var TeamSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true,
	},
	results: [Result],
	updated: {
		type: Date,
		required: true,
		default: new Date(),
		select: false
	}
});

var Team = mongoose.model('Team', TeamSchema);

function addTeam(req, res, next){
	var team = new Team();
	team.name = req.body.name;
	team.updated = new Date();
	team.save(function(err){
		res.send(req.body);
	});
}

function editTeam(req, res, next){
	Team.findOne({ _id: req.body._id }, function(err, doc) {
		doc.name = req.body.name;
		doc.updated = new Date();
		doc.save(function(err){
			res.send(req.body);
		})
	});
}

function getTeams(req, res, next){
	Team.find().sort('name', 1).exec(function(arr, data) {
		if (data.length > 0) {
			res.send(data);
		} else {
			res.statusCode = 204;
			res.end(':: no data ::');
		}
	});
}


/* RESULTS */

var ResultSchema = new Schema({
	season: {
		type: String,
		index: true,
		required: true
	},
	team_id: {
		type: ObjectId,
		required: true
	},
	team: {
		type: String,
		index: true,
		required: true
	},
	league_id: {
		type: ObjectId,
		required: true
	},
	league: {
		type: String,
		index: true,
		required: true
	},
	matchesPlayed: {
		type: Number,
		required: true,
		default: 0
	},
	wins: {
		type: Number,
		required: true,
		default: 0
	},
	draws: {
		type: Number,
		required: true,
		default: 0
	},
	losses: {
		type: Number,
		required: true,
		default: 0
	},
	goalsFor: {
		type: Number,
		required: true,
		default: 0
	},
	goalsAgainst: {
		type: Number,
		required: true,
		default: 0
	},
	updated: {
		type: Date,
		required: true,
		default: new Date(),
		select: false
	}
	//calculated: goalDifferential, points
});

var Result = mongoose.model('Result', ResultSchema);

function addResult(req, res, next){
	Team.findOne({_id: req.body.team_id}, function(err, doc) {
		doc.results.push({
			season: req.body.season,
			team_id: req.body.team_id,
			team: req.body.team,
			league_id: req.body.league_id,
			league: req.body.league,
			matchesPlayed: req.body.matchesPlayed,
			wins: req.body.wins,
			draws: req.body.draws,
			losses: req.body.losses,
			goalsFor: req.body.goalsFor,
			goalsAgainst: req.body.goalsAgainst,
			updated: new Date()
		})
		doc.save(function(err){
			res.send(req.body);
		});
	});
}

function editResult(req, res, next){
	Result.findOne({_id: req.body._id}, function(err, doc) {
		doc.season = req.body.season;
		doc.team_id = req.body.team_id;
		doc.team = req.body.team;
		doc.league_id = req.body.league_id;
		doc.league = req.body.league;
		doc.matchesPlayed = req.body.matchesPlayed;
		doc.wins = req.body.wins;
		doc.draws = req.body.draws;
		doc.losses = req.body.losses;
		doc.goalsFor = req.body.goalsFor;
		doc.goalsAgainst = req.body.goalsAgainst;
		doc.updated = new Date();
		doc.save(function(err){
			res.send(req.body);
		});
	});
}

function getResults(req, res, next){
	Result.find().sort('name', 1).exec(function(arr, data) {
		if (data.length > 0) {
			res.send(data);
		} else {
			res.statusCode = 204;
			res.end(':: no data ::');
		}
	});
}


/* USERS */

var UserSchema = new Schema({
	username: {
		type: String,
		required: true,
		set: toLower,
		validate: [
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			'not a valid email address'
		]
	},
	displayname: {
		type: String,
		required: true,
		set: toLower,
		index: true
	},
	email: {
		type: String,
		required: true,
		set: toLower,
		validate: [
			/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
			'not a valid email address'
		]
	},
	firstname: {
		type: String,
		required: true,
		default: null
	},
	lastname: {
		type: String,
		required: true,
		index: true,
		default: null
	},
	role: {
		type: String,
		required: true,
		default: 'user'
	},
	confirmed: {
		type: Boolean,
		required: true,
		default: false
	},
	salt: {
		type: String,
		required: true
	},
	hash: {
		type: String,
		required: true
	},
	updated: {
		type: Date,
		required: true,
		default: new Date(),
		select: false
	}
});

UserSchema.methods.validPassword = function validPassword(password) {

	var salt = this.salt;
	var hash = this.hash;

	var saltHash = crypto.createHash('sha1').update(salt).digest('base64');

	var passwordHash = crypto.createHash('sha1').update(password).digest('base64');

	var combinedHash = crypto.createHash('sha1').update(saltHash + passwordHash).digest('base64');

	return (hash === combinedHash);

};

var User = mongoose.model('User', UserSchema);

function addUser(req, res, next){
	var user = new User();
	var salt = encryption.getSalt();

	user.username = req.body.email;
	user.displayname = req.body.displayname;
	user.email = req.body.email;
	user.firstname = req.body.firstname;
	user.lastname = req.body.lastname;
	user.salt = salt;
	user.hash = encryption.encryptPassword(req.body.password, salt);
	user.updated = new Date();

	delete req.body.password;

	user.save(function(err){
		res.send(req.body);
	});
}

function editUser(req, res, next){

}

function getUsers(req, res, next){

}

function getUser(req, res, next){
	User.findOne(
		{ displayname: req.params.displayname },
		['_id', 'displayname', 'email', 'firstname', 'lastname'],
		function(err, doc) {
			res.send(doc);
		}
	);
}

/* USER LEAGUES */

var UserLeagueSchema = new Schema({
	name: {
		type: String,
		required: true,
		index: true
	},
	season: {
		type: String,
		index: true,
		required: true
	},
	users_allowed: {
		type: Number,
		required: true,
		default: 0
	},
	is_public: {
		type: Boolean,
		required: true,
		default: false
	},
	commissioner: {
		type: ObjectId,
		required: true
	},
	league_id: {
		type: ObjectId,
		required: true
	},
	league: {
		type: String,
		index: true,
		required: true
	},
	updated: {
		type: Date,
		required: true,
		default: new Date(),
		select: false
	}
});

var UserLeague = mongoose.model('UserLeague', UserLeagueSchema);

function addUserLeague(req, res, next){
	var userLeague = new UserLeague();
	userLeague.name = req.body.name;
	userLeague.season = req.body.season;
	userLeague.users_allowed = req.body.users_allowed;
	userLeague.is_public = req.body.is_public;
	userLeague.commissioner = req.body.commissioner;
	userLeague.users = req.body.users;
	userLeague.league_id = req.body.league_id;
	userLeague.league = req.body.league;
	userLeague.updated = new Date();
	userLeague.save(function(err){
		res.send(req.body);
	});
}

function editUserLeague(req, res, next){
	UserLeague.findOne({ _id: req.body._id }, function(err, doc) {
		doc.name = req.body.name;
		doc.season = req.body.season;
		doc.users_allowed = req.body.users_allowed;
		doc.is_public = req.body.is_public;
		doc.commissioner = req.body.commissioner;
		doc.users = req.body.users;
		doc.league_id = req.body.league_id;
		doc.league = req.body.league;
		doc.updated = new Date();
		doc.save(function(err){
			res.send(req.body);
		});
	})
}

function getUserLeagues(req, res, next){
	UserLeague.find().sort('tier', 1).exec(function(arr, data) {
		if (data.length > 0) {
			res.send(data);
		} else {
			res.statusCode = 204;
			res.end(':: no data ::');
		}
	});
}


exports.database = {
	Country: Country,
	addCountry: addCountry,
	editCountry: editCountry,
	getCountries: getCountries,
	getCountry: getCountry,
	League: League,
	addLeague: addLeague,
	editLeague: editLeague,
	getLeagues: getLeagues,
	Team: Team,
	addTeam: addTeam,
	editTeam: editTeam,
	getTeams: getTeams,
	Result: Result,
	addResult: addResult,
	editResult: editResult,
	getResults: getResults,
	User: User,
	addUser: addUser,
	editUser: editUser,
	getUsers: getUsers,
	getUser: getUser,
	addUserLeague: addUserLeague,
	editUserLeague: editUserLeague,
	getUserLeagues: getUserLeagues
}