//==========================================================================
// gen-basic.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Basic methods that generate number sequences as 
// startingpoint for composing melodies, rhythms and more
// 
// credits:
// - spread-methods inspired by Max8's MC functions spread and spreadinclusive
// - cosine/sine array generation inspired by workshop by Steven Yi at ICLC
//==========================================================================

// const Util = require('./utility.js');
const { map, flatten, toArray, size, TWO_PI } = require('./utility');

// Generate a list of n-length that counts integers
// If only one argument provided the function counts from 0 to x
// If two arguments provided the function counts from x to y
//
// @param {Int+} -> count (or count from, default=12)
// @param {Int+} -> count from (optional, default=undefined)
// @return -> {IntArray}
// 
function count(from=11, to){
	// if to is undefined set to 0
	if (to === undefined){ var t=from, from=0, to=t; }
	// calculate the range
	let range = Math.abs(to - from);
	// calculate direction
	let dir = (from < to) ? 1 : -1;
	// start with the from value
	let arr = [ from ];
	// next value is the current + the direction
	for (let i=0; i<range; i++){
		arr.push( arr[i] + dir );
	}
	return arr;
}
exports.counter = count;
exports.count = count;

// Generate a list of n-length starting at one value
// up until (but excluding) the 3th argument. 
// Evenly spaced values in between in floating-point
// Defaults to range of 0 - 1 for Float
// 
// @param {Int+} -> array-length
// @param {Int} -> low output 
// @param {Int} -> high output
// @return -> {Array}
//
function spreadFloat(len=1, lo=1, hi){
	// if hi undefined set lo to 0 and hi=lo
	if (hi === undefined){ var t=lo, lo=0, hi=t; }
	// calculate the range
	let r = hi - lo; 
	// lo is actual lowest value
	lo = Math.min(lo, hi);
	// len is minimum of 1 or length of array
	len = size(len);
	if (len === 1){ return [lo]; }
	// stepsize
	let s = Math.abs(r) / len;
	// generate array
	let arr = [];
	for (let i=0; i<len; i++){
		arr[i] = i * s + lo;
	}
	return (r < 0)? arr.reverse() : arr;
}
exports.spreadFloat = spreadFloat;
exports.spreadF = spreadFloat;

// Spread function rounded to integers
// 
// @params {length, low-output, high-output}
// @return {Array}
//
function spread(len, lo=size(len), hi){
	let arr = spreadFloat(len, lo, hi);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spread = spread;

// Generate a list of n-length starting at one value
// up until (but excluding) the 3th argument. 
// Set an exponential curve in the spacing of the values.
// Defaults to range of 0 - 1 for Float
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadExpFloat(len=1, lo=1, hi, exp=1){
	// if hi undefined set lo to 0 and hi=lo
	if (hi === undefined){ var t=lo, lo=0, hi=t; }
	// calculate the range
	let r = hi - lo; 
	// lo is actual lowest value
	lo = Math.min(lo, hi);
	// len is minimum of 1
	len = size(len);
	// len = Math.max(1, len);
	if (len === 1){ return [lo]; }
	// generate array
	let arr = [];
	for (let i=0; i<len; i++){
		arr[i] = Math.pow((i / len), exp) * Math.abs(r) + lo;
	}
	return (r < 0)? arr.reverse() : arr;
}
exports.spreadFloatExp = spreadExpFloat; // deprecated
exports.spreadExpFloat = spreadExpFloat;
exports.spreadExpF = spreadExpFloat;

// Spread function floored to integers
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadExp(len, lo=size(len), hi, exp){
	let arr = spreadExpFloat(len, lo, hi, exp);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spreadExp = spreadExp;

// Generate a list of n-length starting at one value
// ending at the 3th argument.
// Evenly spaced values in between in floating-point
// Defaults to range of 0 - 1 for Float
// 
// @params {length, low-output, high-output}
// @return {Array}
//
function spreadInclusiveFloat(len=1, lo=1, hi){
	// if hi undefined set lo to 0 and hi=lo
	if (hi === undefined){ var t=lo, lo=0, hi=t; }
	// calculate the range
	let r = hi - lo; 
	// lo is actual lowest value
	lo = Math.min(lo, hi);
	// len is minimum of 1
	len = size(len);
	// len = Math.max(1, len);
	if (len === 1){ return [lo]; }
	// stepsize
	let s = Math.abs(r) / (len - 1);
	// generate array
	let arr = []
	for (let i=0; i<len; i++){
		arr[i] = i * s + lo;
	}
	return (r < 0)? arr.reverse() : arr;
}
exports.spreadInclusiveFloat = spreadInclusiveFloat;
exports.spreadIncF = spreadInclusiveFloat;

// spreadinclusiveFloat function floored to integers
// 
// @params {length, low-output, high-output}
// @return {Array}
//
function spreadInclusive(len, lo=size(len), hi){
	var arr = spreadInclusiveFloat(len, lo, hi);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spreadInclusive = spreadInclusive;
exports.spreadInc = spreadInclusive;

// Generate a list of n-length starting at one value
// ending at the 3th argument.
// Set an exponential curve in the spacing of the values.
// Defaults to range of 0 - 1 for Float
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadInclusiveExpFloat(len=1, lo=1, hi, exp=1){
	// if hi undefined set lo to 0 and hi=lo
	if (hi === undefined){ var t=lo, lo=0, hi=t; }
	// calculate the range
	let r = hi - lo; 
	// lo is actual lowest value
	lo = Math.min(lo, hi);
	// len is minimum of 1
	len = size(len);
	// len = Math.max(1, len);
	if (len === 1){ return [lo]; }
	// generate array
	let arr = [];
	for (let i=0; i<len; i++){
		arr[i] = Math.pow((i / (len-1)), exp) * Math.abs(r) + lo;
	}
	return (r < 0)? arr.reverse() : arr;
}
exports.spreadInclusiveFloatExp = spreadInclusiveExpFloat; //deprecated
exports.spreadInclusiveExpFloat = spreadInclusiveExpFloat;
exports.spreadIncExpF = spreadInclusiveExpFloat;

// spreadinclusiveFloatExp function floored to integers
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadInclusiveExp(len, lo=size(len), hi, exp){
	var arr = spreadInclusiveExpFloat(len, lo, hi, exp);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spreadInclusiveExp = spreadInclusiveExp;
exports.spreadIncExp = spreadInclusiveExp;

// fill an array with values. Arguments are pairs.
// Every pair consists of <value, amount>
// The value is repeated n-amount times in the list
// Also accepts an array as a single argument
// 
// @params {value0, amount0, value1, amount1, ... value-n, amount-n}
// @return {Array}
// 
function fill(...args){
	// also accepts a single array as argument containing the pairs
	if (args.length === 1){
		args = args[0];
	}
	// when arguments uneven strip last argument
	if (args.length % 2){ args.pop(); }
	// when no arguments return array of 0
	if (!args.length){ return [0]; }
	
	let len = args.length/2;
	let arr = [];
	for (let i=0; i<len; i++){
		for (let k=0; k<Math.abs(args[i*2+1]); k++){
			arr.push(args[i*2]);
		}
	}
	return arr;
}
exports.fill = fill;

// Generate an array with n-periods of a sine function
// Optional last arguments set lo and hi range and phase offset
// Only setting first range argument sets the low-range to 0
// 
// @param {Int} -> Length of output array (resolution)
// @param {NumberArray | Number} -> Periods of sine-wave 
// @param {Number} -> Low range of values (optional, default=-1) 
// @param {Number} -> High range of values (optional, default=1)
// @param {Number} -> Phase offset (optional, default=0)
// @return {Array} -> Sine function
// 
function sineFloat(len=1, periods=1, lo, hi, phase=0){
	// if no range specified
	if (lo === undefined){ lo = -1; hi = 1; }
	else if (hi === undefined){ hi = lo, lo = 0; }
	// make periods array
	periods = toArray(periods);
	
	// if (lo === undefined){ lo = -1; hi = 1; }
	// swap if lo > hi
	// if (lo > hi){ var t=lo, lo=hi, hi=t; }

	// array length minimum of 1
	len = size(len);
	// len = Math.max(1, len);
	let arr = [];

	// let twoPI = Math.PI * 2.0;
	// let a = Math.PI * 2.0 * periods / len;
	// let p = Math.PI * phase * 2.0;
	let p = TWO_PI * phase;
	for (let i=0; i<len; i++){
		// arr[i] = Math.sin(a * i + p);
		let a = TWO_PI * periods[i % periods.length] / len;
		arr[i] = Math.sin(a * i + p);
	}
	return map(arr, -1, 1, lo, hi);
}
exports.sineFloat = sineFloat;
exports.sineF = sineFloat;
exports.sinF = sineFloat;

// Generate an integer array with n-periods of a sine function
// Optional last arguments set lo and hi range
// 
// @param {Int} -> Length of output array
// @param {Number} -> Periods of sine-wave 
// @param {Number} -> Low range of values (optional, default = 0) 
// @param {Number} -> High range of values (optional, default = 12)
// @param {Number} -> Phase shift (optional, default = 0)
// @return {Array} -> Sine function
// 
function sine(len=1, periods=1, lo=12, hi, phase){
	var arr = sineFloat(len, periods, lo, hi, phase);
	return arr.map(v => Math.trunc(v));
}
exports.sine = sine;

// Generate an array with n-periods of a cosine function
// Flip the low and high range to invert the function
// See sinFloat() for details
//
function cosineFloat(len=1, periods=1, lo, hi, phase=0){
	return sineFloat(len, periods, lo, hi, phase+0.25);
}
exports.cosineFloat = cosineFloat;
exports.cosineF = cosineFloat;
exports.cosF = cosineFloat;

// Generate an integer array with n-periods of a cosine function
// Flip the low and high range to invert the function
// See sin() for details
// 
function cosine(len=1, periods=1, lo=12, hi, phase=0){
	var arr = sineFloat(len, periods, lo, hi, phase+0.25);
	return arr.map(v => Math.trunc(v));
}
exports.cosine = cosine;

// Generate an array with n-periods of a saw/phasor function
// Optional last arguments set lo and hi range and phase offset
// Only setting first range argument sets the low-range to 0
// 
// @param {Int} -> Length of output array (resolution)
// @param {Number/Array} -> Periods of the wave (option, default=1)
// @param {Number} -> Low range of values (optional, default=-1) 
// @param {Number} -> High range of values (optional, default=1)
// @param {Number} -> Phase offset (optional, default=0)
// @return {Array} -> wave-function as array
//  
function sawFloat(len=1, periods=1, lo, hi, phase=0){
	if (lo === undefined){ lo = -1; hi = 1; }
	else if (hi === undefined){ hi = lo, lo = 0; }
	// make periods array
	periods = toArray(periods);

	// array length minimum of 1
	len = size(len);
	// len = Math.max(1, len);
	let arr = [];

	let a = 1 / len;
	for (let i=0; i<len; i++){
		arr[i] = ((i * a * periods[i % periods.length]) % 1.0 + 1.0) % 1.0;
	}
	return map(arr, 0, 1, lo, hi);
	// return arr;
}
exports.sawFloat = sawFloat;
exports.phasor = sawFloat;
exports.sawF = sawFloat;

function saw(len=1, periods=1, lo=12, hi, phase=0){
	var arr = sawFloat(len, periods, lo, hi, phase);
	return arr.map(v => Math.trunc(v));
}
exports.saw = saw;

// Generate an array with n-periods of a pulse/squarewave function
// Optional last arguments set lo and hi range and pulse width
// Only setting first range argument sets the low-range to 0
// 
// @param {Int} -> Length of output array (resolution)
// @param {Number/Array} -> Periods of the wave (option, default=1)
// @param {Number} -> Low range of values (optional, default=-1) 
// @param {Number} -> High range of values (optional, default=1)
// @param {Number} -> Pulse width (optional, default=0.5)
// @return {Array} -> wave-function as array
//  
function squareFloat(len=1, periods=1, lo, hi, pulse=0.5){
	if (lo === undefined){ lo = 0; hi = 1; }
	else if (hi === undefined){ hi = lo, lo = 0; }
	// make periods array
	periods = toArray(periods);

	// array length minimum of 1
	len = size(len);
	// len = Math.max(1, len);
	let arr = [];

	let a = 1 / len;
	for (let i=0; i<len; i++){
		arr[i] = ((i * a * periods[i % periods.length]) % 1 + 1) % 1;
		arr[i] = arr[i] < pulse;
	}
	return map(arr, 0, 1, lo, hi);
	// return arr;
}
exports.squareFloat = squareFloat;
exports.squareF = squareFloat;
exports.rectFloat = squareFloat;
exports.rectF = squareFloat;

function square(len=1, periods=1, lo=12, hi, pulse=0.5){
	var arr = squareFloat(len, periods, lo, hi, pulse);
	return arr.map(v => Math.trunc(v));
}
exports.square = square;
exports.rect = square;

// Generate a binary rhythm from a positive integer number or an array 
// of numbers. Returns the binary value as an array of separated 1's and 0's
// useful for representing rhythmical patterns
// 
// @param {Int+/Array} -> Array of numbers to convert to binary representation
// @return {Array} -> Array of 1's and 0's
//
function binary(...a){
	// if no arguments return else flatten array to 1 dimension
	if (!a.length) { return [0]; }
	a = flatten(a);

	let arr = [];
	for (let i=0; i<a.length; i++){
		if (isNaN(a[i])){
			arr = arr.concat(0);
		} else {
			// make the value into a whole number
			let v = Math.floor(Math.max(a[i], 0));
			// convert the number to binary string, split, convert to numbers
			arr = arr.concat(v.toString(2).split('').map((x) => Number(x)));
		}
	}
	return arr;
}
exports.binary = binary;
exports.binaryBeat = binary;

// Generate an array of 1's and 0's based on a positive integer number or array
// Every number in the array will be replaced by a 1 with a specified amount of 
// 0's appended to it. Eg. a 2 => 1 0, a 4 => 1 0 0 0, etc. This technique is
// useful to generate a rhythm based on spacing length between onsets
//
// @param {Int+/Array} -> Array of numbers to convert to spaced rhythm
// @return {Array} -> Array of 1's and 0's representing a rhythm
//
function spacing(...a){
	// if no arguments return else flatten array to 1 dimension
	if (!a.length) { return [0]; }
	a = flatten(a);

	let arr = [];
	for (let i=0; i<a.length; i++){
		if (isNaN(a[i]) || a[i] < 1){
			// if no number or less than 1 append 0
			arr = arr.concat(0);
		} else {
			// for every integer push a 1 followed by 0's
			for (let j=0; j<Math.floor(a[i]); j++){
				arr.push(!j ? 1 : 0);
			}
		}
	}
	return arr;
}
exports.space = spacing;
exports.spacing = spacing;
exports.spacingBeat = spacing;