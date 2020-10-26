//====================================================================
// mercury.js
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// GNU GPL-3.0 License
// 
// The Mercury Parser and Ring Methods
// Using the total-serialism node package
//====================================================================

const max  = require('max-api');
// const moo  = require('moo');

const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const TL   = require('total-serialism').Translate;
const Util = require('total-serialism').Utility;
const Dict = require('./dictionary.js');

var dict = new Dict();

// let lexer = moo.compile({
// 	string: /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/,
// 	rest: moo.error
// })

const handlers = {
	// parse the input strings from code editor
	// seperate lines are input as a string of characters
	'parse' : (...v) => {
		mainParse(v);
		// console.log('@parse', v);
	},
	// clear the dictionary with variables
	'clear' : () => {
		dict.clear();
		// max.outlet(dict.items);
	},
	// done processing
	'done' : () => {
		max.outlet("done");
	},
	// input the ring, get the varname
	// and join the expression to string to be parsed
	'ring' : (name, ...args) => {
		if (args < 1){
			// do nothing if not enough arguments
			max.post("not enough arguments for method ring");
			return;
		}
		// max.post("@ring", "name:", name, "args:", ...args);
		if (isNaN(name)){
			let expr = args.join(' ');
			let parsed = parseString(expr);
			// max.post('@parseString', parsed);
			let eval = evaluateParse(parsed);
			// max.post('@eval', eval);
			
			let arr = [];
			for (i in eval){
				arr.push({ 'array' : eval[i] });
			}
			dict.set(name, arr);
		} else {
			// numbers are not allowed as ring name
			max.post("ring:", name, "is not a valid name");
		}
	},
	// All the Array transformation/generation methods
	// From the total-serialism Node package
	// 
	// Generative Methods
	// 
	// generate an array of ints between specified range
	'spread' : (...v) => {
		return Gen.spread(...v);
	},
	// generate an array of floats between range
	'spreadFloat' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	'spreadF' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	// generate an array of ints between specified range (inclusive)
	'spreadInclusive' : (...v) => {
		return Gen.spreadInclusive(...v);
	},
	// generate an array of floats between range (inclusive)
	'spreadInclusiveFloat' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	'spreadInclusiveF' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	// fill an array with duplicates of a value
	'fill' : (...v) => {
		return Gen.fill(...v);
	},
	// generate an array from a sinewave function
	'sine' : (...v) => {
		return Gen.sine(...v);
	},
	'sineFloat' : (...v) => {
		return Gen.sineFloat(...v);
	},
	'sineF' : (...v) => {
		return Gen.sineFloat(...v);
	},
	// generate an array from a cosine function
	'cosine' : (...v) => {
		return Gen.cosine(...v);
	},
	'cosineFloat' : (...v) => {
		return Gen.cosineFloat(...v);
	},
	'cosineF' : (...v) => {
		return Gen.cosineFloat(...v);
	},
	// 
	// Algorithmic Methods
	// 
	// generate a euclidean rhythm evenly spacing n-beats amongst n-steps
	'euclid' : (...v) => {
		return Algo.euclid(...v);
	},
	'euclidean' : (...v) => {
		return Algo.euclid(...v);
	},
	// generate a rhythm based on a hexadecimal string (0-f)
	'hexBeat' : (...v) => {
		// console.log("@hexBeat", v);
		return Algo.hexBeat(v[0]);
	},
	'hex' : (...v) => {
		return Algo.hexBeat(v[0]);
	},
	// generate the numbers in the fibonacci sequence
	'fibonacci' : (...v) => {
		return Algo.fibonacci(...v);
	},
	// generate the pisano periods from the fibonacci sequence
	'pisano' : (...v) => {
		// console.log(Algo.pisano(...v));
		return Algo.pisano(...v);
	},
	// generate the numbers in the fibonacci sequence
	'pell' : (...v) => {
		return Algo.pell(...v);
	},
	// generate the numbers in the fibonacci sequence
	'lucas' : (...v) => {
		return Algo.lucas(...v);
	},
	// generate the numbers in the fibonacci sequence
	'threeFibonacci' : (...v) => {
		return Algo.threeFibonacci(...v);
	},
	// 
	// Stochastic Methods
	// 
	// set the random number generator seed
	'randomSeed' : (...v) => {
		console.log("seed", ...v);
		Rand.seed(v[0]);
	},
	// generate an array of random integers in range
	'random' : (...v) => {
		return Rand.random(...v);
	},
	'rand' : (...v) => {
		return Rand.random(...v);
	},
	// generate an array of random floats
	'randomFloat' : (...v) => {
		return Rand.randomFloat(...v);
	},
	'randomF' : (...v) => {
		return Rand.randomFloat(...v);
	},
	'randF' : (...v) => {
		return Rand.randomFloat(...v);
	},
	// generate a random walk (drunk)
	'drunk' : (...v) => {
		return Rand.drunk(...v);
	},
	'drunkF' : (...v) => {
		return Rand.drunkFloat(...v);
	},
	'drunkFloat' : (...v) => {
		return Rand.drunkFloat(...v);
	},
	// generate random values picked from an urn
	'urn' : (...v) => {
		return Rand.urn(...v);
	},
	// generate an array of coin tosses
	'coin' : (...v) => {
		return Rand.coin(v[0]);
	},
	// generate an array of dice rolls
	'dice' : (...v) => {
		return Rand.dice(v[0]);
	},
	// generate an array of twelveTone notes
	'twelveTone' : () => {
		return Rand.twelveTone();
	},
	// choose values at random from a ring provided
	'choose' : (...v) => {
		return Rand.choose(...v);
	},
	// pick values randomly from a ring provided and remove chosen
	'pick' : (...v) => {
		return Rand.pick(...v);
	},
	// shuffle the items in an array, influenced by the random seed
	'shuffle' : (v) => {
		return Rand.shuffle(v);
	},
	'scramble' : (v) => {
		return Rand.shuffle(v);
	},
	// 
	// Transformational Methods
	// 
	// duplicate an array with an offset added to every value
	'clone' : (...v) => {
		return Mod.clone(...v);
	},
	// combine multiple numbers/arrays into one
	'combine' : (...v) => {
		return Mod.combine(...v);
	},
	'concat' : (...v) => {
		return Mod.combine(...v);
	},
	'join' : (...v) => {
		return Mod.combine(...v);
	},
	// duplicate an array certain amount of times
	'duplicate' : (...v) => {
		return Mod.duplicate(...v);
	},
	'dup' : (...v) => {
		return Mod.duplicate(...v);
	},
	'repeat' : (...v) => {
		return Mod.duplicate(...v);
	},
	// add zeroes to a rhythm to make it play once over a certain amount of bars
	'every' : (...v) => {
		return Mod.every(...v);
	},
	// invert an array around a center point
	'invert' : (...v) => {
		return Mod.invert(...v);
	},
	'inverse' : (...v) => {
		return Mod.invert(...v);
	},
	'flip' : (...v) => {
		return Mod.invert(...v);
	},
	'inv' : (...v) => {
		return Mod.invert(...v);
	},
	// interleave multiple arrays into one
	'lace' : (...v) => {
		return Mod.lace(...v);
	},
	'zip' : (...v) => {
		return Mod.lace(...v);
	},
	// merge arrays into a 2D-array
	'merge' : (...v) => {
		return Mod.merge(...v);
	},
	'mix' : (...v) => {
		return Mod.merge(...v);
	},
	// generate a palindrome of an array
	'palindrome' : (...v) => {
		return Mod.palindrome(...v);
	},
	'palin' : (...v) => {
		return Mod.palindrome(...v);
	},
	'mirror' : (...v) => {
		return Mod.palindrome(...v);
	},
	// rotate an array in positive or negative direction
	'rotate' : (...v) => {
		return Mod.rotate(...v);
	},
	'rot' : (...v) => {
		return Mod.rotate(...v);
	},
	'turn' : (...v) => {
		return Mod.rotate(...v);
	},
	// reverse an array
	'reverse' : (...v) => {
		return Mod.reverse(...v);
	},
	'rev' : (...v) => {
		return Mod.reverse(...v);
	},
	'retrograde' : (...v) => {
		return Mod.reverse(...v);
	},
	// spray values on the non-zero places of another array
	'spray' : (...v) => {
		return Mod.spray(...v);
	},
	// remove duplicates from an array, leave order intact
	'unique' : (...v) => {
		return Mod.unique(...v);
	},
	'thin' : (...v) => {
		return Mod.unique(...v);
	},
	// 
	// Translate Methods
	//
	'tempo' : (...v) => {
		return TL.setTempo(v[0]);
	},
	'scale' : (...v) => {
		return TL.setScale(...v);
	},
	'toScale' : (...v) => {
		return TL.toScale(...v);
	},
	'divisionToMs' : (...v) => {
		return TL.divisionToMs(...v);
	},
	'dtoms' : (...v) => {
		return TL.divisionToMs(...v);
	},
	// 
	// Utility Methods
	// 
	// add 1 or more values to an array
	'add' : (...v) => {
		return Util.add(...v);
	},
	// subtract 1 or more values from an array
	'subtract' : (...v) => {
		return Util.subtract(...v);
	},
	'sub' : (...v) => {
		return Util.subtract(...v);
	},
	// multiply 1 or more values to an array
	'multiply' : (...v) => {
		return Util.multiply(...v);
	},
	'mul' : (...v) => {
		return Util.multiply(...v);
	},
	// divide 1 or more values from an array
	'divide' : (...v) => {
		return Util.divide(...v);
	},
	'div' : (...v) => {
		return Util.divide(...v);
	}
}
max.addHandlers(handlers);

function mainParse(lines){
	// remove double whitespaces
	lines = lines.slice().map(x => x.replace(/\s{2,}/g, ' '));
	max.post("@mainParse", lines);

	let rings = [];
	let other = [];
	// regular expression to match rings
	let ring = /ring\ .+/;
	let seed = /set\ randomSeed\ .+/;
	let scale = /set\ scale\ .+/;
	let tempo = /set\ tempo\ .+/;
	let mute = /(silence|mute|killAll)/;

	for (let i in lines){
		l = lines[i];
		if (ring.test(l)){
			rings.push(l);
		} else if (seed.test(l) || scale.test(l) || tempo.test(l)){
			other.push(l);			
			let expr = l.split(' ');
			expr.shift();
			mainFunc.call(handlers, ...expr);	
		} else if (mute.test(l)){
			max.post("@silence");
			other.push("silence");
		} else {
			other.push(l);
		}
	}
	// clear the dictionary
	mainFunc.call(handlers, 'clear');
	
	for (let r in rings){
		// max.post('@ring', rings[r]);
		let params = rings[r].split(' ');
		mainFunc.call(handlers, ...params);
	}
	// output the new variables dictionary
	max.outlet(dict.items);
	
	for (let o in other){
		// let string = /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/g;
		// max.post('@string', string.exec(other[o]));
		let expr = [];
		let s = '';
		let isString = false;
		for (let char in other[o]){
			let c = other[o].charAt(char);
			if (c === '"' || c === "'" || c === "`"){
				if (isString){
					expr.push(s);
				} else {
					expr = expr.concat(s.split(' ').filter(i => i).map(x => parseNumber(x)));
				}
				isString = !isString;
				s = '';
			} else {
				s += c;
			}
		}
		expr = expr.concat(s.split(' ').filter(i => i).map(x => parseNumber(x)));
		// expr.push(s);

		// expr = other[o].split(' ').map(x => parseNumber(x));
		max.post('@parsed', expr);
		max.outlet('parsed', ...expr);
	}
	max.outlet('done');
}

// evaluate the parsed items if it is a function
// 
function evaluateParse(parse){
	var params = parse.value;
	var f = params[0];

	if (!hasFunc(f)){
		return params.map(x => parseNumber(x));
	} else {
		params.shift();
		params = params.map(x => parseParam(x));
		// console.log("@func", f, ": @params", ...params);
		return mainFunc.call(handlers, f, ...params);
	}
}

// check if the function is part of the function handlers
// 
function hasFunc(f){
	return f in handlers;
}

// apply the function and return the array result
// 
function mainFunc(func){
	return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

// if string to number is a number output that
// else output the string instead
// check for entire array if array is provided
// 
function parseNumber(v){
	if (typeof v === 'object'){
		for (let i in v){
			v[i] = parseNumber(v[i]);
		}
	}
	return (isNaN(Number(v))) ? v : Number(v);
}

// parse list of parameters and check for array
// already stored in variable list
// 
function parseParam(v){
	let p = parseNumber(v);
	if (isNaN(p)){
		if (dict.has(p)){
			p = dict.get(p).slice();
			for (i in p){
				p[i] = p[i].array;
			}
		}
	}
	return p;
}

// parse the input string to an array of values and 
// possible function name. accepts multi-dimensional arrays
// arrays of 3 dimension or higher will be stripped down to 2d
// 
function parseString(str){
	let depth = 0;
	let type = '1d';
	let items = []; // array for ascii storage
	let items2D = []; // array for items array
	let arg = ""; // string of arguments

	// iterate through all the characters in a codeline
	// and set items and tokens based on character
	for (let i in str){
		var char = str[i];
		if (char === "[" || char === "("){
			if(arg != ""){ 
				items.push(arg);
				arg = "";
			}
			depth++;
		}
		else if (char === "]" || char === ")"){
			depth--;
			if (!depth){
				if (arg != ""){
					items.push(arg);
					arg = "";
				}
			} else if (depth == 1){
				if (arg != ""){
					items2D.push(arg);
					arg = "";
				}
				items.push(items2D);
				items2D = [];
			} else {
				if (arg != ""){
					items2D.push(arg);
					arg = "";
				}
			}
		}
		else if (char == " "){
			if (arg != ""){ 
				if (depth > 1){
					type = '2d';
					items2D.push(arg);
				} else {
					items.push(arg); 
				}
			}
			arg = "";
		}
		else {
			arg += char;
		}
	}
	return { 'type' : type, 'value' : items };
}