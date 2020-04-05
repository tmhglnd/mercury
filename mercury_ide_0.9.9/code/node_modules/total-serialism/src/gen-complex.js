//==============================================================================
// gen-complex.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Complex Algorithms and methods that generate number sequences as 
// startingpoint for composing melodies, rhythms and more
// 
// credits:
// - euclid() based on paper by Godfried Toussaint  
// http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf 
// and code from https://github.com/brianhouse/bjorklund
// - hexBeat() inspired by Steven Yi's implementation in the csound
//  livecode environment from 
// https://github.com/kunstmusik/csound-live-code
// and here https://kunstmusik.github.io/learn-hex-beats/
// - fibonacci(), nbonacci() and pisano() inspired by 'fibonacci motion' 
// used by composer Iannis Xenakis and 'symbolic music'. See further 
// reading in README.md. Also inspired by Numberphile videos on 
// pisano period on youtube.
//==============================================================================

const Transform = require('./transform.js');
const BigNumber = require('bignumber.js');
const JSON = require('jsonfile');

// configure the bignumber settings
BigNumber.config({
	DECIMAL_PLACES: 20,
	EXPONENTIAL_AT: [-7, 20]
});

// A hexadecimal rhythm generator. Generates values of 0 and 1
// based on the input of a hexadecimal character string
//
// @param {String} -> hexadecimal characters (0 t/m f)
// @return {Array} -> rhythm
// 
function hexBeat(hex="8"){
	if (!hex.isNaN){ hex = hex.toString(); }
	var a = [];
	for (let i in hex){
		var binary = parseInt("0x"+hex[i]).toString(2);
		binary = isNaN(binary)? '0000' : binary;
		var padding = binary.padStart(4, '0');
		a = a.concat(padding.split('').map(x => Number(x)));
	}
	return a;
}
exports.hexBeat = hexBeat;

// A euclidean rhythm generator. Generates values of 0 and 1
// distributed based on the common denominator after division
//
// @param {Int} steps
// @param {Int} beats
// @param {Int} rotate
// @return {Array}
// 
var pattern, counts, remainders;

function euclid(steps=8, beats=4, rot=0){
	pattern = [];
	counts = [];
	remainders = [];
	var level = 0;
	var divisor = steps - beats;

	remainders.push(beats);
	while (remainders[level] > 1){
		counts.push(Math.floor(divisor / remainders[level]));
		remainders.push(divisor % remainders[level]);
		
		divisor = remainders[level];
        level++;
	}
    counts.push(divisor);
	build(level);

	return Transform.rotate(pattern, rot - pattern.indexOf(1));
}
exports.euclid = euclid;

function build(l){
	var level = l;
	
	if (level == -1){
		pattern.push(0);
	} else if (level == -2){
		pattern.push(1);
	} else {
		for (var i=0; i<counts[level]; i++){
			build(level-1);
		}
		if (remainders[level] != 0){
			build(level-2);
		}
	}
}

// Lindemayer String expansion
// a recursive fractal algorithm to generate botanic (and more)
// Default rule is 1 -> 10, 0 -> 1, where 1=A and 0=B
// Rules are specified as a JS object consisting of strings or arrays
//
// @param {String} -> the axiom (the start)
// @param {Int} -> number of generations
// @param {Object} -> production rules
// @return {String/Array} -> axiom determins string or array output
// 
function linden(axiom=[1], iteration=3, rules={1: [1, 0], 0: [1]}){
	axiom = (typeof axiom === 'number')? [axiom] : axiom;
	let asString = typeof axiom === 'string';
	let res;

	for(let n=0; n<iteration; n++){
		res = (asString)? "" : [];
		for(let ch in axiom){
			let char = axiom[ch];
			let rule = rules[char];
			if(rule){
				res = (asString)? res + rule : res.concat(rule);
			}else{
				res = (asString)? res + char : res.concat(char);
			}
		}
		axiom = res;
	}
	return res;
}
exports.linden = linden;

// Generate any n-bonacci sequence as an array of BigNumber objects
// F(n) = t * F(n-1) + F(n-2). This possibly generatres various 
// integer sequences: fibonacci, pell, tribonacci
// 
// @param {Int} -> output length of array
// @param {Int} -> multiplier t
// @param {Int} -> start value 1
// @param {Int} -> start value 2
// @return {Array} -> array of BigNumber objects
// 
function numBonacci(len=1, s1=0, s2=1, t=1){
	var n1 = new BigNumber(s2); //startvalue n-1
	var n2 = new BigNumber(s1); //startvalue n-2

	len = Math.max(1, len-2);
	var cur = 0, arr = [n2, n1];

	if (len < 2) {
		return arr.slice(0, len);
	} else {
		for (var i=0; i<len; i++){	
			// general method for nbonacci sequences
			// Fn = t * Fn-1 + Fn-2
			cur = n1.times(t).plus(n2);
			n2 = n1; // store n-1 as n-2
			n1 = cur; // store current number as n-1
			arr.push(cur); // store BigNumber in array
		}
		return arr;
	}
}

// Generate any n-bonacci sequence as an array of BigNumber objects
// for export fuction
// 
// @return {String-Array} -> array of bignumbers as strings
// 
function nbonacci(len=1, s1=0, s2=1, t=1){
	return numBonacci(len, s1, s2, t).map(x => x.toFixed());
}
exports.nbonacci = nbonacci;

// Generate the Fibonacci sequence as an array of BigNumber objects
// F(n) = F(n-1) + F(n-2). The ratio between consecutive numbers in 
// the fibonacci sequence tends towards the Golden Ratio (1+√5)/2
// OEIS: A000045 (Online Encyclopedia of Integer Sequences)
// 
// @param {Int} -> output length of array
// @return {String-Array} -> array of bignumbers as strings
// 
function fibonacci(len=1, offset=0){
	var f = numBonacci(len+offset, 0, 1, 1).map(x => x.toFixed())
	if (offset > 0){
		return f.slice(offset, offset+len);
	}
	return f;
}
exports.fibonacci = fibonacci;

// Generate the Pisano period sequence as an array of BigNumber objects
// Returns array of [0] if no period is found within the default length
// of fibonacci numbers (256). In that case 
// 
// F(n) = (F(n-1) + F(n-2)) mod a.
// 
// @param {Int} -> output length of array
// @param {Int} -> modulus for pisano period
// @return {Int-Array} -> array of integers
// 
function pisano(mod=12, len=-1){
	mod = (mod < 1)? 1 : mod;
	if (len < 1){
		return pisanoPeriod(mod);
	} else {
		return numBonacci(len, 0, 1, 1).map(x => x.mod(mod).toNumber());
	}
}
exports.pisano = pisano;

function pisanoPeriod(mod=2, length=64){
	// console.log('pisano', '@mod', mod, '@length', length);
	var seq = numBonacci(length, 0, 1, 1).map(x => x.mod(mod).toNumber());
	var p = [], l = 0;

	for (var i=0; i<seq.length; i++){
		p.push(seq[i]);

		if (p.length > 2){ 
			var c = [0, 1, 1];
			var equals = 0;

			for (let k in p){
				equals += p[k] === c[k];
			}
			if (equals === 3 && l > 3){
				return seq.slice(0, l);
				// return { 'length' : l };
			}
			p = p.slice(1, 3);
			l++;
		}
	}
	// console.log('no period, next iteration');
	return pisanoPeriod(mod, length*2);
}

// Generate the Pell numbers as an array of BigNumber objects
// F(n) = 2 * F(n-1) + F(n-2). The ratio between consecutive numbers 
// in the pell sequence tends towards the Silver Ratio 1 + √2.
// OEIS: A006190 (Online Encyclopedia of Integer Sequences)
// 
// @param {Int} -> output length of array
// @return {String-Array} -> array of bignumbers as strings
// 
function pell(len=1){
	return numBonacci(len, 0, 1, 2).map(x => x.toFixed());
}
exports.pell = pell;

// Generate the Tribonacci numbers as an array of BigNumber objects
// F(n) = 2 * F(n-1) + F(n-2). The ratio between consecutive numbers in 
// the 3-bonacci sequence tends towards the Bronze Ratio (3 + √13) / 2.
// OEIS: A000129 (Online Encyclopedia of Integer Sequences)
// 
// @param {Int} -> output length of array
// @return {String-Array} -> array of bignumbers as strings
// 
function threeFibonacci(len=1){
	return numBonacci(len, 0, 1, 3).map(x => x.toFixed());
}
exports.threeFibonacci = threeFibonacci;

// Generate the Lucas numbers as an array of BigNumber objects
// F(n) = F(n-1) + F(n-2), with F0=2 and F1=1.
// OEIS: A000032 (Online Encyclopedia of Integer Sequences)
// 
// @param {Int} -> output length of array
// @return {String-Array} -> array of bignumbers as strings
// 
function lucas(len=1){
	return numBonacci(len, 2, 1, 1).map(x => x.toFixed());
}
exports.lucas = lucas;

// build the integer sequences dataset for quick access
// buildDataSet();
function buildDataSet(){
	const file = './data/fibonacci.json';
	let data = { 
		"fibonacci" : [], 
		"pell" : [],
		"tribonacci" : []
	}
	data.fibonacci = fibonacci(1024);
	data.pell = pell(1024);
	data.tribonacci = tribonacci(1024);

	JSON.writeFile(file, data, { spaces: 2, EOL: '\r\n' }, function (err) {
		if (err) { 
			console.error(err); 
		} else {
			console.log("//=> Integer Sequences dataset generated");
		}
	});
}
exports.buildDataSet = buildDataSet;