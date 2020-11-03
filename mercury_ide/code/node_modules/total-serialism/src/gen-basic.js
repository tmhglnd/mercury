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
//==========================================================================

const Util = require('./utility.js');

// Generate a list of n-length starting at one value
// up until (but excluding) the 3th argument. 
// Evenly spaced values in between in floating-point
// 
// @params {array-length, low-output, high-output}
// @return {Array}
//
function spreadFloat(len=1, lo=len, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is minimum of 1
	len = Math.max(1, len);
	// generate array
	let arr = [];
	for (let i=0; i<len; i++){
		arr[i] = (i / len) * (hi - lo) + lo;
	}
	return arr;
}
exports.spreadFloat = spreadFloat;
exports.spreadF = spreadFloat;

// Generate a list of n-length starting at one value
// up until (but excluding) the 3th argument. 
// Set an exponential curve in the spacing of the values.
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadFloatExp(len=1, lo=len, hi=0, exp=1){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is minimum of 1
	len = Math.max(1, len);
	// generate array
	let arr = [];
	for (let i=0; i<len; i++){
		arr[i] = Math.pow((i / len), exp) * (hi - lo) + lo;
	}
	return arr;
}
exports.spreadFloatExp = spreadFloatExp;

// Spread function rounded to integers
// 
// @params {length, low-output, high-output}
// @return {Array}
//
function spread(len, lo, hi){
	let arr = spreadFloat(len, lo, hi);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spread = spread;

// Spread function floored to integers
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadExp(len, lo, hi, exp){
	let arr = spreadFloatExp(len, lo, hi, exp);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spreadExp = spreadExp;

// Generate a list of n-length starting at one value
// ending at the 3th argument.
// Evenly spaced values in between in floating-point
// 
// @params {length, low-output, high-output}
// @return {Array}
//
function spreadInclusiveFloat(len=1, lo=len, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is minimum of 1
	len = Math.max(1, len);
	// generate array
	let arr = []
	for (let i=0; i<len; i++){
		arr[i] = (i / (len-1)) * (hi - lo) + lo;
	}
	return arr;
}
exports.spreadInclusiveFloat = spreadInclusiveFloat;
exports.spreadIncF = spreadInclusiveFloat;

// Generate a list of n-length starting at one value
// ending at the 3th argument.
// Set an exponential curve in the spacing of the values.
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadInclusiveFloatExp(len=1, lo=len, hi=0, exp=1){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is minimum of 1
	len = Math.max(1, len);
	// generate array
	let arr = [];
	for (let i=0; i<len; i++){
		arr[i] = Math.pow((i / (len-1)), exp) * (hi - lo) + lo;
	}
	return arr;
}
exports.spreadInclusiveFloatExp = spreadInclusiveFloatExp;

// spreadinclusiveFloat function floored to integers
// 
// @params {length, low-output, high-output}
// @return {Array}
//
function spreadInclusive(len, lo, hi){
	var arr = spreadInclusiveFloat(len, lo, hi);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spreadInclusive = spreadInclusive;
exports.spreadInc = spreadInclusive;

// spreadinclusiveFloatExp function floored to integers
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadInclusiveExp(len, lo, hi, exp){
	var arr = spreadInclusiveFloatExp(len, lo, hi, exp);
	return arr.map(v => Math.floor(Number(v.toPrecision(15))));
}
exports.spreadInclusiveExp = spreadInclusiveExp;

// fill an array with values. Arguments are pairs.
// Every pair consists of <value, amount>
// The value is repeated n-amount times in the list
// 
// @params {value0, amount0, value1, amount1, ... value-n, amount-n}
// @return {Array}
// 
function fill(...args){
	// when no arguments return array of 0
	if (!args.length){ return [0]; }
	// when arguments uneven strip last argument
	if (args.length % 2){ args.pop(); }
	
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
// @param {Int} -> Length of output array
// @param {Number} -> Periods of sine-wave 
// @param {Number} -> Low range of values (optional, default=-1) 
// @param {Number} -> High range of values (optional, default=1)
// @param {Number} -> Phase offset (optional, default=0)
// @return {Array} -> Sine function
// 
function sineFloat(len=1, periods=1, lo, hi, phase=0){
	if (lo === undefined){ lo = -1; hi = 1; }
	else if (hi === undefined){ hi = lo, lo = 0; }
	// if no range specified
	// if (lo === undefined){ lo = -1; hi = 1; }
	// swap if lo > hi
	// if (lo > hi){ var t=lo, lo=hi, hi=t; }

	// array length minimum of 1
	len = Math.max(1, len);
	let arr = [];

	let a = Math.PI * 2.0 * periods / len;
	let p = Math.PI * phase * 2.0;
	for (let i=0; i<len; i++){
		arr[i] = Math.sin(a * i + p);
	}
	return Util.map(arr, -1, 1, lo, hi);
}
exports.sineFloat = sineFloat;
// exports.sin = sineFloat;

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
// exports.cos = cosineFloat;

// Generate an integer array with n-periods of a cosine function
// Flip the low and high range to invert the function
// See sin() for details
// 
function cosine(len=1, periods=1, lo=12, hi, phase=0){
	var arr = sineFloat(len, periods, lo, hi, phase+0.25);
	return arr.map(v => Math.trunc(v));
}
exports.cosine = cosine;

