"use strict";

var random = require('random');
var seedrandom = require('./seedrandom');
var crypto = require('crypto');

var generated = "";

function quotaCallback(quota) {
	if (quota > 0) {

		random.generateStrings(randomCallback,{
			num: 16,
			len: 16
		},randomError);

	} else {

		quotaError( "zero quota", "000", "No quota left.");

	}

}

function generateSeeds(){
	for (var i = 0; i < 11; i++) {
		setTimeout(function(){
			Math.seedrandom(Math.random());
			if (i === 10) {
					Math.seedrandom();
			}
		}, getRandomBetween(0, 20));
	}
}

function quotaError(type, code, string) {

	console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
	generateSeeds();

}

function randomCallback(string){

	Math.seedrandom(string.join(''));
	Math.seedrandom();

}

function randomError(type, code, string) {

	console.log("RANDOM.ORG Error: Type: "+type+", Status Code: "+code+", Response Data: "+string);
	generateSeeds();

}

function getRandomBetween(min, max) {

	return parseInt((Math.random() * (max - min + 1)) + min, 10);

}

function getSalt(){
	var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz`~!@#$%^&*()-_=+[{]}|;:',<.>?";
	var string_length = 128;
	var randomstring = '';
	for (var i=0; i<string_length; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		randomstring += chars.substring(rnum,rnum+1);
	}

	return randomstring;
}

function encryptPassword(pwd, salt) {

	var saltHash = crypto.createHash('sha1').update(salt).digest('base64');

	var passwordHash = crypto.createHash('sha1').update(pwd).digest('base64');

	var combinedHash = crypto.createHash('sha1').update(saltHash + passwordHash).digest('base64');

	return combinedHash;

}

random.checkQuota(quotaCallback,{},quotaError);

exports.encryption = {
	getSalt: getSalt,
	encryptPassword: encryptPassword
}
