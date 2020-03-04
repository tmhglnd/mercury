// The Mercury Ring methods
// Using the total-serialism node package

const max  = require('max-api');
const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Util = require('total-serialism').Utility;
const Dict = require('./dictionary.js');

// const moo = require('moo');
// let lexer = moo.compile({
// 	number:	/-?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
// 	lParen:	'(',
// 	rParen:	')',
// 	lArray:	'[',
// 	rArray:	']',
// 	seperator:	/[\,\;]/,
// 	string:	{ 
// 				match: /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/, 
// 				value: x => x.slice(1, x.length-1) 
// 			},
// 	identifier:	/[a-zA-Z\_][a-zA-Z0-9\_\-]*/,
// 	ws:		/[ \t]+/,
// });

var dict = new Dict();

const handlers = {
	// parse the input strings from code editor
	// seperate lines are input as a string of characters
	'parse' : (...v) => {
		mainParse(...v);
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
		// console.log('ring', '@name', name, '@args', args);
		if (args < 1){
			// do nothing if not enough arguments
			console.error("not enough arguments for method ring");
			return;
		}
		let expr = args.join(' ');
		let parsed = parseString(expr);
		let eval = evaluateParse(parsed);
		
		let arr = [];
		for (i in eval){
			arr.push({ 'array' : eval[i] });
		}
		dict.set(name, arr);
		// max.outlet(dict.items);
	},
	// All the Array transformation/generation methods
	// From the total-serialism Node package
	'spread' : (...v) => {
		return Gen.spread(...v);
	},
	'spreadFloat' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	'spreadF' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	'spreadInclusive' : (...v) => {
		return Gen.spreadInclusive(...v);
	},
	'spreadInclusiveFloat' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	'spreadInclusiveF' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	'fill' : (...v) => {
		return Gen.fill(...v);
	},
	'random' : (...v) => {
		return Rand.random(...v);
	},
	'randomFloat' : (...v) => {
		return Rand.randomFloat(...v);
	},
	'randomF' : (...v) => {
		return Rand.randomFloat(...v);
	},
	'randomSeed' : (v) => {
		Rand.seed(v);
	},
	'shuffle' : (v) => {
		return Rand.shuffle(v);
	},
	'scramble' : (v) => {
		return Rand.shuffle(v);
	},
	'euclid' : (...v) => {
		return Algo.euclid(...v);
	},
	'euclidean' : (...v) => {
		return Algo.euclid(...v);
	},
	'clone' : (...v) => {
		return Mod.clone(...v);
	},
	'combine' : (...v) => {
		return Mod.combine(...v);
	},
	'join' : (...v) => {
		return Mod.combine(...v);
	},
	'duplicate' : (...v) => {
		return Mod.duplicate(...v);
	},
	'dup' : (...v) => {
		return Mod.duplicate(...v);
	},
	'every' : (...v) => {
		return Mod.every(...v);
	},
	'invert' : (...v) => {
		return Mod.invert(...v);
	},
	'lace' : (...v) => {
		return Mod.lace(...v);
	},
	'merge' : (...v) => {
		return Mod.merge(...v);
	},
	'palindrome' : (...v) => {
		return Mod.palindrome(...v);
	},
	'palin' : (...v) => {
		return Mod.palindrome(...v);
	},
	'reverse' : (...v) => {
		return Mod.reverse(...v);
	},
	'rev' : (...v) => {
		return Mod.reverse(...v);
	},
	'rotate' : (...v) => {
		return Mod.rotate(...v);
	},
	'rot' : (...v) => {
		return Mod.rotate(...v);
	},
	'spray' : (...v) => {
		return Mod.spray(...v);
	},
	'unique' : (...v) => {
		return Mod.unique(...v);
	}
}
max.addHandlers(handlers);

function mainParse(){
	let rings = [];
	let other = [];
	// regular expression to match rings
	let r = /ring\ .+/;

	for (let i in arguments){
		l = arguments[i]
		if (r.test(l)){
			rings.push(l);
		} else {
			other.push(l);
		}
	}
	// clear the dictionary
	mainFunc.call(handlers, 'clear');

	for (let r in rings){
		let params = rings[r].split(' ');
		mainFunc.call(handlers, ...params);
	}
	max.outlet(dict.items);

	for (let o in other){
		let expr = other[o].split(' ');
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
// possible function name. excepts multi-dimensional arrays
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