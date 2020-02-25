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
	// input the ring, get the varname
	// and join the expression to string to be parsed
	'clear' : () => {
		dict.clear();
		max.outlet(dict.items);
		console.log('cleared dictionary');
	},
	'ring' : (name, ...args) => {
		if (args < 1){
			return;
		}
		var expr = args.join(' ');
		var parsed = parseString(expr);
		var eval = evaluateParse(parsed);
		// console.log("@eval", eval);
		
		var arr = [];
		for (i in eval){
			arr.push({ 'array' : eval[i] });
		}
		dict.set(name, arr);
		max.outlet(dict.items);
	},
	'spread' : (...v) => {
		return Gen.spread(...v);
	},
	'spreadFloat' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	'spreadInclusive' : (...v) => {
		return Gen.spreadInclusive(...v);
	},
	'spreadInclusiveFloat' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	'fill' : (...v) => {
		return Gen.fill(...v);
	},
	'random' : (...v) => {
		return Rand.random(...v);
	},
	'randomSeed' : (v) => {
		Rand.seed(v);
	},
	'shuffle' : (v) => {
		return Rand.shuffle(v);
	},
	'euclid' : (...v) => {
		return Algo.euclid(...v);
	},
	'clone' : (...v) => {
		return Mod.clone(...v);
	},
	'join' : (...v) => {
		return Mod.combine(...v);
	},
	'duplicate' : (...v) => {
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
	'reverse' : (...v) => {
		return Mod.reverse(...v);
	},
	'rotate' : (...v) => {
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
		for (i in v){
			v[i] = parseNumber(v[i]);
		}
	}
	return (isNaN(Number(v))) ? v : Number(v);
}

// parse list of parameters and check for array
// already stored in variable list
// 
function parseParam(v){
	v = parseNumber(v);
	if (isNaN(v)){
		if (dict.has(v)){
			v = dict.get(v).slice();
			for (i in v){
				v[i] = v[i].array;
			}
		}
	}
	return v;
}

// parse the input string to an array of values and 
// possible function name. excepts multi-dimensional arrays
// arrays of 3 dimension or higher will be stripped down to 2d
// 
function parseString(str){
	var depth = 0;
	var type = '1d';
	var items = []; // array for ascii storage
	var items2D = []; // array for items array
	var arg = ""; // string of arguments

	// iterate through all the characters in a codeline
	// and set items and tokens based on character
	for (var i in str){
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