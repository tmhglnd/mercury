//====================================================================
// mercury.js
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// GNU GPL-3.0 License
// 
// The Mercury Parser and Ring Methods
// Using the total-serialism node package
//====================================================================

const max  = require('max-api');
const copy = require('clipboardy');

const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Stat = require('total-serialism').Statistic;
const TL   = require('total-serialism').Translate;
const Util = require('total-serialism').Utility;
const Dict = require('./dictionary.js');

var dict = new Dict();

let DEBUG = false;
let AUTO_COPY = true;

const handlers = {
	// enable copy code to clipboard on execute
	'autoCopy' : (v) => {
		AUTO_COPY = (v > 0);
	},
	// enable debug logging
	'debug' : (v) => {
		DEBUG = (v > 0);
	},
	// parse the input strings from code editor
	// seperate lines are input as a string of characters
	'parse' : (...v) => {
		// post('@parse', ...v);
		mainParse(v);

		// copy sketch to clipboard for pasting to other editors
		if (AUTO_COPY){
			let head = ['//=== MERCURY SKETCH ' + date() + ' ==='];
			copy.writeSync(head.concat(v).join('\n'));
		}
	},
	// clear the dictionary with variables
	'clear' : () => {
		post('@clear', 'variables cleared');
		dict.clear();
		max.outlet(dict.items);
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
			max.post("ERROR: not enough arguments for method ring");
			return;
		}
		post("@ring", "name:", name, "args:", ...args);
		if (isNaN(name)){
			let expr = args.join(' ');
			let parsed = parseString(expr);
			// post('@parseString', parsed);
			let eval = evaluateParse(parsed);
			// post('@eval', eval);
			let arr = [];
			for (i in eval){
				arr.push({ 'array' : eval[i] });
			}
			dict.set(name, arr);
		} else {
			// numbers are not allowed as ring name
			max.post("ring: "+name+" is not a valid name");
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
		// console.log("seed", ...v);
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
	// expand an array based upon the pattern within an array
	// arbitrarily choosing the next 
	'expand' : (...v) => {
		// check if arguments are correct
		v[0] = (Array.isArray(v[0])) ? v[0] : [v[0]];
		v[1] = Math.max(2, (Array.isArray(v[1])) ? v[1][0] : v[1]);
		return Rand.expand(v[0], v[1]);
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
	// repeat the individual values of an array by a certain amount
	'repeat' : (...v) => {
		return Mod.repeat(...v);
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
	'filter' : (...v) => {
		let args = [...v];
		return Mod.filter(v[0], v.slice(1, v.length));
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
	// sort an array in ascending or descending order
	'sort' : (...v) => {
		return Stat.sort(...v);
	},
	// spray values on the non-zero places of another array
	'spray' : (...v) => {
		return Mod.spray(...v);
	},
	// stretch an array to a specified length, interpolating values
	'stretch' : (...v) => {
		// swap because of implementation in total-serialism
		v[0] = (Array.isArray(v[0])) ? v[0] : [v[0]];
		v[1] = Math.max(2, (Array.isArray(v[1])) ? v[1][0] : v[1]);
		return Util.trunc(Mod.stretch(...v));
	},
	'stretchFloat' : (...v) => {
		return Mod.stretch(...v);
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
	// Statistic Methods
	// 
	// IMPLEMENTATION NEEDED
	// maximum
	// minimum
	// mean
	// median
	// mode

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
	let time = Date.now();

	let cleaned = [];
	lines.forEach((line) => {
		// post('@input', line);
		// remove comments from code
		line = line.replace(/\/{2,}.+/g, '');

		// remove linebreaks and split into array
		// split double coded lines via '&' symbol
		line = line.match(/[^&\r\n]+/g);
		if (!line) { return; }
		// line = line.split('&');

		line.forEach((l) => {
			// remove double whitespaces
			l = l.replace(/\s+/g, ' ');
			// remove leading or trailing whitespaces
			l = l.replace(/^\s+|\s+$/g, '');
			// add if not empty string
			if (l !== '') { 
				cleaned.push(l); 
			}
		});
	});
	lines = cleaned;

	post("@mainParse", lines);
/*
	// DEPRECATED
	// remove comments from code
	lines = lines.map(x => x.replace(/\/{2,}.+/g, ''));

	// split double coded lines via '&' symbol
	let t = [];
	for (let l in lines){
		t.push(...lines[l].split('&'));
	}
	lines = t;

	// remove double whitespaces
	lines = lines.slice().map(x => x.replace(/\s+/g, ' '));
	// remove leading or trailing whitespaces
	lines = lines.map(x => x.replace(/^\s+|\s+$/g, ''));
*/
	
	// store rings and rest of code separately
	let rings = [];
	let other = [];

	// regular expression to match rings/debug/seed/scale/tempo
	let ring = /(ring\ |list\ |array\ ).+/;
	let bugs = /set\ debug\ .+/;
	let seed = /set\ randomSeed\ .+/;
	let scale = /set\ scale\ .+/;
	let tempo = /set\ tempo\ .+/;
	let mute = /(silence|mute|killAll)/;

	// let set = /(set\ |apply\ |give\ ).+/;
	// let inst = /(new\ |make\ ).+/;

	for (let i in lines){
		l = lines[i];
		// if empty string skip this iteration
		if (l === ''){ continue; }

		post('@line', l);
		if (ring.test(l)){
			// does line start with ring/list/array
			rings.push(l);
		} else if (seed.test(l) || scale.test(l) || tempo.test(l) || bugs.test(l)){
			// does line start with a global setting
			other.push(l);			
			let expr = l.split(' ');
			expr.shift();
			mainFunc.call(handlers, ...expr);	
		} else if (mute.test(l)){
			// does line start with silence/mute/killAll
			other.push("silence");
		} else {
			// rest of the code to parse
			other.push(l);
		}
	}
	// clear the dictionary
	mainFunc.call(handlers, 'clear');
	
	for (let r in rings){
		post('@list', rings[r]);	
		let params = rings[r].split(' ');
		params[0] = mapFunc(params[0]);
		mainFunc.call(handlers, ...params);
	}
	// output the new variables dictionary
	max.outlet(dict.items);
	
	// max.post('code', other);
	for (let o in other){
		// max.post('parsing', other[o])
		let line = other[o];
		let expr = [];
		let s = '';
		let isString = false;

		// filter for strings
		for (let char in line){
			let c = line.charAt(char);
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
		// max.post('expr', ...expr);
		expr = expr.concat(s.split(' ').filter(i => i).map(x => parseNumber(x)));
		// max.post('expr', expr);
		
		if (expr.length < 2 && expr[0] !== 'silence'){
			max.post('WARNING: '+expr.join(' ')+' needs at least 1 more argument');
		} else {
			post('@code', expr);
			max.outlet('parsed', ...expr);
		}

/*
		// WORK IN PROGRESS FOR KEYBINDING AND MINILANG
		let tokenizer = /([^\s]+\([^\(\)]*\)|["'`][^"'`]*["'`]|[^\s]+)/g;
		if (tokenizer.test(line)){
			let tokens = line.match(tokenizer);
			post('@tokens', ...tokens);

			// syntaxTree object to store code parse
			let code = {
				'action' : 'empty',
				'object' : 'empty',
				'type' : 'empty',
				'functions' : [],
				'arguments' : []
			}
			let keys = Object.keys(code);

			for (let t in tokens){
				// is the token a function
				let isFunc = /[^\s]+\([^\(\)]*\)/g;
				let isNum = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/g;
				if (isFunc.test(tokens[t])){
					// split function name from token
					let c = tokens[t].split(/\(([^\(\)]*)\)/g);
					let m = mapFunc(c[0]);
					code['functions'].push({[m] : c[1].split(' ')});
				} else if (isNum.test(tokens[t])){
					code['arguments'].push(tokens[t]);
				} else {
					code[keys[t]] = mapFunc(tokens[t]);
				}
			}
			let def = {};
			// traverse the tree and set initials
			Object.keys(code).forEach((t) => {
				if (t === 'action'){
					let objs = actions[code[t]];
					if (Array.isArray(objs)){
						max.post('@action', objs);
						if (objs.includes(code['object'])){
							def = defaultInstrument[code['object']];
							// Object.keys(def).forEach((d) => {
							// 	def[d] = code[d];
							// });
						} else {
							max.post('ERROR: object: [ '+code['object']+' ] does not exist');
						}
					}
				}
				// else if (t === 'object'){
					
					// max.post('@object', code[t]);
				// }
				else if (t === 'type'){
					if (code[t] === 'empty'){
						code[t] = def[t];
					}
				}
				else {
					def[t] = code[t]
				}
			});
			post('@ast', code);
		}*/
	}
	max.outlet('done');
	
	time = Date.now() - time;
	max.post('parsed code succesful within: ' + time + ' ms');
}

const actions = {
	'ring' : 'empty',
	'set' : 'empty',
	'new' : [
		'synth',
		'sample',
		'polySynth',
		'loop',
		'midi',
		'emitter'
	]
}

const defaultInstrument = {
	'synth' : {
		'type' : 'saw',
		'functions' : [
			{ 'note' : [0, 0] },
			{ 'time' : ['1', 0] },
			{ 'env' : [5, 500] },
			{ 'beat' : 1 },
			{ 'amp' : 0.75 },
			{ 'add_fx' : {} },
			{ 'wave2' : ['saw', 0] },
		]
	}
}

// const initials = require('../data/initials.json');
// max.post(initials);

// check if the function is part of mapped functions
// else return original value
// 
function mapFunc(f){
	let m = (keywordBinds[f])? keywordBinds[f] : f;
	// post('@map', f, m);
	return m;
}

// evaluate the parsed items if it is a function
// 
function evaluateParse(parse){
	var params = parse.value;
	var f = params[0];

	post('@eval', params, f);

	if (!hasFunc(f)){
		// if f is no function 
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
	if (!items.length){
		max.post('WARNING: empty array');
		items.push(0);
	}
	return { 'type' : type, 'value' : items };
}

// keyword bindings, use custom keywords for functions
const keywords = require('../data/bind-functions.json');
// mini language, use single characters for keywords and functions
const miniLang = require('../data/mini-functions.json');

let keywordBinds = {};
keywordBinds = keywordBindings(keywords, keywordBinds);
keywordBinds = keywordBindings(miniLang, keywordBinds);

// Generate a dictionary of keyword and binding pairs based on 
// input dictionary of categorized keybindings 
function keywordBindings(dict, obj){
	max.post('Generating function keyword bindings...');	
	let binds = { ...obj };
	Object.keys(dict).forEach((k) => {
		// store itself first
		binds[k] = k;
		dict[k].forEach((b) => {
			if (binds[b]) {
				// if already exists ignore and print warning
				max.post('Warning! Duplicate keyword: [ '+b+' ] \nfor: [ '+binds[b]+' ] and: [ '+k+' ] \n => BIND IGNORED');
			} else {
				// store binding name with resulting keyword
				binds[b] = k;
			}
			post('mapped: [ '+b+' ] to: [ '+k+' ]');
		});
	});
	// post(binds);
	max.post('...keyword bindings generated');
	return binds;
}

// Console log replacement that logs to the max window
// and only when debug flag = true
// 
function post(...v){
	if (DEBUG) {
		max.post(...v);
	}
}

function date(){
	let now = new Date();

	let dd = String(now.getDate()).padStart(2, '0');
	let mm = String(now.getMonth()+1).padStart(2, '0');
	let yyyy = now.getFullYear();
	let hh = String(now.getHours()).padStart(2, '0');
	let mi = String(now.getMinutes()).padStart(2, '0');
	let ss = String(now.getSeconds()).padStart(2, '0');
	let time = [yyyy, mm, dd, hh, mi, ss].join('.');

	return time;
}
