//==============================================================================
// gen-stochastic.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Stochastic algorithms to generate various forms of random 
// number sequences
// 
// credits:
// - Thankfully using the seedrandom package by David Bau
//==============================================================================

// require seedrandom package
var seedrandom = require('seedrandom');
var Gen = require('./gen-basic');
// local pseudorandom number generator
var rng = seedrandom();

// Set the seed for all the Random Number Generators. 
// 0 sets to unpredictable seeding
// 
// @param {Number/String} -> the seed
// @return {Void}
// 
function seed(v=0){
	if (v === 0 || v === null){
		rng = seedrandom();
	} else {
		rng = seedrandom(v);
	}
}
exports.seed = seed;

// generate a list of random float values 
// between a certain specified range (excluding high val)
// 
// @param {Int} -> number of values to output
// @param {Number} -> minimum range (optional, default=0)
// @param {Number} -> maximum range (optional, defautl=1)
// @return {Array}
// 
function randomFloat(len=1, lo=1, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is positive and minimum of 1
	len = Math.max(1, Math.abs(len));
	
	var arr = new Array(len);
	for (var i=0; i<len; i++){
		arr[i] = (rng() * (hi - lo)) + lo;
	}
	return arr;
}
exports.randomFloat = randomFloat;

// generate a list of random integer values 
// between a certain specified range (excluding high val)
// 
// @param {Int} -> number of values to output
// @param {Number} -> minimum range (optional, default=0)
// @param {Number} -> maximum range (optional, defautl=2)
// @return {Array}
// 
function random(len=1, lo=2, hi=0){
	var arr = randomFloat(len, lo, hi);
	return arr.map(v => Math.floor(v));
}
exports.random = random;

// generate a list of random integer values
// but the next random value is within a limited range of the previous value
// 
// @param {Int} -> length of output array
// @param {Number} -> minimum range (optional, default=null)
// @param {Number} -> maximum range (optional, default=null)
// @return {Array}
// function drunk(len=1, lo=null, hi=null, start=0){
// 	len = Math.max(1, Math.abs(len));

// }
// exports.drunk = drunk;

// generate a list of random integer values 0 or 1
// like a coin toss, heads/tails
// 
// @param {Int} -> number of tosses to output
// @return {Array}
// 
function coin(len=1){
	var arr = randomFloat(len, 0, 2);
	return arr.map(v => Math.floor(v));
}
exports.coin = coin;

// generate a list of random integer values 1 to 6
// like the roll of a dice
// 
// @param {Int} -> number of tosses to output
// @param {Int} -> sides of the die (optional, default=6)
// @return {Array}
// 
function dice(len=1, sides=6){
	var arr = randomFloat(len, 1, sides+1);
	return arr.map(v => Math.floor(v));
}
exports.dice = dice;

// shuffle a list, based on the
// Fisher-Yates shuffle algorithm
// by Ronald Fisher and Frank Yates in 1938
// algorithm has run time complexity of O(n)
// 
// @param {Array} -> array to shuffle
// @return {Array}
// 
function shuffle(a=[0]){
	var arr = a.slice();
	for (var i=arr.length-1; i>0; i-=1) {
		var j = Math.floor(rng() * (i + 1));
		var t = arr[i];
		arr[i] = arr[j];
		arr[j] = t;
	}
	return arr;
}
exports.shuffle = shuffle;

function urn(len=1, lo=len, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is positive and minimum of 1
	len = Math.max(1, Math.abs(len));

	var vals = [];
	for (var i=0; i<hi-lo; i++){
		vals.push(i+lo);
	}
	vals = shuffle(vals);
	
	return vals.slice(0, len);
}
exports.urn = urn;