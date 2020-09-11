//=======================================================================
// gen-stochastic.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Stochastic and Probablity Theory algorithms to generate 
// various forms of random 
// number sequences
// 
// credits:
// - Gratefully using the seedrandom package by David Bau
//=======================================================================

// require Generative methods
const Gen = require('./gen-basic.js');
const Util = require('./utility.js');
// require seedrandom package
var seedrandom = require('seedrandom');

// local pseudorandom number generator
var rng = seedrandom();

// Set the seed for all the Random Number Generators. 
// 0 sets to unpredictable seeding
// 
// @param {Number/String} -> the seed
// @return {Void}
// 
function seed(v=0){
	if (v === 0 || v === null || v === undefined){
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
	len = Math.max(1, len);
	
	var arr = new Array(len);
	for (var i=0; i<len; i++){
		arr[i] = (rng() * (hi - lo)) + lo;
	}
	return arr;
}
exports.randomFloat = randomFloat;
exports.randomF = randomFloat;

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

// generate a list of random float values but the next random 
// value is within a limited range of the previous value generating
// a random "drunk" walk, also referred to as brownian motion.
// Inspired by the [drunk]-object in MaxMSP
// 
// @param {Int} -> length of output array
// @param {Number} -> step range for next random value
// @param {Number} -> minimum range (optional, default=null)
// @param {Number} -> maximum range (optional, default=null)
// @param {Number} -> starting point
// @param {Bool} -> fold between lo and hi range
// @return {Array}
// 
function drunkFloat(len=1, step=1, lo=1, hi=0, p, bound=true){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	p = (!p)? (lo+hi)/2 : p;

	var arr = [];
	for (var i=0; i<Math.max(1,len); i++){
		// direction of next random number (+ / -)
		var dir = (rng() > 0.5) * 2 - 1;
		// prev + random value * step * direction
		p += rng() * step * dir;

		if (bound && (p > hi || p < lo)){
			p = Util.fold(p, lo, hi);
		}
		arr.push(p);
	}
	return arr;
}
exports.drunkFloat = drunkFloat;
exports.walkFloat = drunkFloat;

// generate a list of random integer values but the next random 
// value is within a limited range of the previous value generating
// a random "drunk" walk, also referred to as brownian motion.
// Inspired by the [drunk]-object in MaxMSP
// 
// @param {Int} -> length of output array
// @param {Number} -> step range for next random value
// @param {Number} -> minimum range (optional, default=null)
// @param {Number} -> maximum range (optional, default=null)
// @param {Number} -> starting point
// @param {Bool} -> fold between lo and hi range
// @return {Array}
// 
function drunk(len=1, step=1, lo=12, hi=0, p, bound=true){
	let arr = drunkFloat(len, step, lo, hi, p, bound);
	return arr.map(v => Math.floor(v));
}
exports.drunk = drunk;
exports.walk = drunk;

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

// shuffle a list, based on the Fisher-Yates shuffle algorithm
// by Ronald Fisher and Frank Yates in 1938
// The algorithm has run time complexity of O(n)
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

// Generate a list of 12 semitones
// then shuffle the list based on a random seed
// 
// @return {Array} -> twelve-tone series
// 
function twelveTone(){
	return shuffle(Gen.spread(12));
}
exports.twelveTone = twelveTone;

// Generate a list of unique random integer values between a 
// certain specified range (excluding high val). An 'urn' is filled
// with values and when one is picked it is removed from the urn. 
// If the outputlist is longer then the range, the urn refills when
// empty. On refill it is made sure no repeating value can be picked.
// Inspired by the [urn]-object in MaxMSP
// 
// @param {Int} -> number of values to output
// @param {Number} -> maximum range (optional, default=12)
// @param {Number} -> minimum range (optional, defautl=0)
// @return {Array} -> random values
// 
function urn(len=1, hi=12, lo=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// generate array with values and pick
	return pick(len, Gen.spread(hi-lo, lo, hi));
}
exports.urn = urn;

// Choose random items from an array provided
// The default array is an array of 0 and 1
// 
// @param {Int} -> output length
// @param {Array} -> items to choose from
// @return {Array} -> randomly selected items
// 
function choose(len=1, a=[0, 1]){
	// if a is no Array make it an array
	a = (!Array.isArray(a))? [a] : a;

	var arr = [];
	for (var i=0; i<Math.max(1,len); i++){
		arr.push(a[Math.floor(rng()*a.length)]);
	}
	return arr;
}
exports.choose = choose;

// Pick random items from an array provided
// An 'urn' is filled with values and when one is picked it is removed 
// from the urn. If the outputlist is longer then the range, the urn 
// refills when empty. On refill it is made sure no repeating value
// can be picked.
// 
// @param {Int} -> output length
// @param {Array} -> items to choose from
// @return {Array} -> randomly selected items
// 
function pick(len=1, a=[0, 1]){
	// fill the jar with the input
	var jar = (!Array.isArray(a))? [a] : a;
	// shuffle the jar
	var s = shuffle(jar);
	// value, previous, output-array
	var v, p, arr = [];	
	for (var i=0; i<Math.max(1,len); i++){
		v = s.pop();
		if (v === undefined){
			s = shuffle(jar);
			v = s.pop();
			if (v === p) {
				v = s.pop();
				s.push(p);
			}
		}
		arr[i] = v;
		p = v;
	}
	return arr;
}
exports.pick = pick;


// Initialize a Markov Chain Model (One of the simpelest forms of ML)
// A Markov chain is a stochastic model describing a sequence 
// of possible events in which the probability of each event depends 
// only on the state of the previous (multiple) events.
// 
// @get chain -> return transition table from Markov
// @method clear() -> erase the transition table
// @method train() -> train the markov model
// @method seed() -> seed the random number generator (scoped RNG)
// @method axiom() -> set the initial value to start the chain
// @method next() -> generate the next value based state or set axiom
// @method chain() -> generate an array of values
// 
class MarkovChain {
	constructor(data){
		// transition probabilities table
		this._table = {};
		// train if dataset is provided
		if (data) { this.train(data) };
		// current state of markov chain
		this._state;
		// scoped random number generator
		this.rng = seedrandom();
	}
	get table(){
		// return copy of object
		return { ...this._table };
	}
	clear(){
		// empty the transition probabilities
		this._table = {};
	}
	train(a){
		if (!Array.isArray(a)){ 
			return console.error('Error: train() expected array but received:', typeof a);
		}
		// build a transition table from array of values
		for (let i=1; i<a.length; i++){
			if (!this._table[a[i-1]]) {
				this._table[a[i-1]] = [a[i]];
			} else {
				this._table[a[i-1]].push(a[i]);
			}
		}
	}
	seed(s){
		// set unpredictable seed if 0, null or undefined
		if (s === 0 || s === null || s === undefined){
			rng = seedrandom();
		} else {
			rng = seedrandom(s);
		}
	}
	state(a){
		// set the state
		if (!this._table[a]){
            console.error('Warning: state() value is not part of transition table');
		}
		this._state = a;
	}
	next(){
        // if the state is undefined or has no transition in table
        // randomly choose from all
		if (this._state === undefined || !this._table[this._state]){
			let states = Object.keys(this._table);
			this._state = states[Math.floor(rng() * states.length)]
		}
		// get probabilities based on state
		let probs = this._table[this._state];
		// select pseudorandomly next value
		this._state = probs[Math.floor(rng() * probs.length)];
		return this._state;
	}
	chain(l){
		// return an array of values generated with next()
		let c = [];
		for (let i=0; i<l; i++){
			c.push(this.next());
		}
		return c;
	}
}
exports.MarkovChain = MarkovChain;