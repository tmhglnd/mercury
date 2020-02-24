// The Mercury Ring methods
// Using the total-serialism node package

const max  = require('max-api');
const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Util = require('total-serialism').Utility;
const Dict = require('./dictionary.js');

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

		// dict.set(name, { 
		// 	"@type" : "1d", 
		// 	"@value" : eval
		// });

		dict.set(name, eval);
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

function evaluateParse(params){
	var f = params[0];
	if (!hasFunc(f)){
		return params.map(x => parseNumber(x));
	} else {
		params.shift();
		params = params.map(x => parseParam(x));
		console.log("@func", f, ": @params", ...params);
		return mainFunc.call(handlers, f, ...params);
	}
}

function hasFunc(f){
	return f in handlers;
}

function mainFunc(func){
	return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

function parseNumber(v){
	return (isNaN(Number(v))) ? v : Number(v);
}

function parseParam(v){
	v = parseNumber(v);
	if (isNaN(v)){
		if (dict.has(v)){
			v = dict.get(v);	
		}
	}
	return v;
}

// parse the input string to an array of values 
// and possible function name
function parseString(str){
	var isFunction = false;
	var depth = 0;
	var items = []; // array for ascii storage
	var arg = ""; // string of arguments

	// iterate through all the characters in a codeline
	for (var i in str){
		var char = str[i];
		if (char == "("){
			if (!isFunction){
				isFunction = true;
				if(arg != ""){ items.push(arg); } // add function name
				arg = "";
			}
		}
		else if (char == ")"){
			isFunction = false;
			items.push(arg);
			arg = "";
		}
		else if (char == "["){
			if (!depth){
				if(arg != ""){ items.push(arg) }; // add array items
				arg = "";
			} else {
				arg += char;
			}
			depth++;
		}
		else if (char == "]"){
			depth--;
			if (depth <= 0){
				items.push(arg); // add array items as a string
				arg = "";
			} else {
				arg += char;
			}
		}
		else if (char == " "){
			if (arg != ""){ items.push(arg); } // add item to array
			arg = "";
		}
		else {
			arg += char;
		}
	}
	return items;
}