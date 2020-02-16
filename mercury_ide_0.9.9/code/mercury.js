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
	},
	'ring' : (...args) => {
		if (args < 1){}
		var varName = args[0].toString();	
		var expr = args.slice(1, args.length).join(' ');

		var parsed = parseString(expr);
		console.log('parsed', parsed);
	
		var eval = evaluateParse(parsed);
		console.log('evaluated', eval);

		dict.set(varName, eval);
		max.outlet(dict.items);
	},
	'spread' : (...v) => {
		return Gen.spread(...v);
	},
	'spreadFloat' : (...v) => {
		console.log(...v);
		var r = Gen.spreadFloat(...v);
		console.log(r);
		return r;
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
	'euclid' : (...v) => {
		return Algo.euclid(...v);
	},
	'seed' : (v) => {
		Rand.seed(v);
	}
}
max.addHandlers(handlers);

function evaluateParse(parse){
	var f = parse[0];
	if (!hasFunc(f)){
		console.log("function undefined: " + f);
		return parse;
	} else {
		parse.shift();

		for (i in parse){
			console.log(parse[i], isNaN(parse[i]));
		}
		console.log("@func", f, ": @params", ...parse);
		return mainFunc.call(handlers, f, ...parse);
	}
}

function hasFunc(f){
	return f in handlers;
}

function mainFunc(func){
	console.log("func")
    return this[func].apply(this, Array.prototype.slice.call(arguments, 1));
}

function getParam(name){
	if (isNaN(name)){
		if (dict.has(name)){
			maxApi.outlet(dict.get(name));
		} else {
			if (!hasfunc(name)){
				errorPost("no function/array: " + name);
				maxApi.outlet([0]);
			} else {
				maxApi.outlet(mainfunc.call(handlers, name, ...v));
			}
		}
	}
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