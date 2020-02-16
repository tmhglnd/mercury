//==============================================================================
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
//==============================================================================

// Generate a list of n-length starting at one value
// up untill (but excluding) the 3th argument. 
// Evenly spaced values in between in floating-point
// 
// @params {array-length, low-output, high-output}
// @return {Array}
//
function spreadFloat(len=1, lo=len, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is positive and minimum of 1
	len = Math.max(1, Math.abs(len));
	// generate array
	var arr = new Array(len);
	for (var i=0; i<len; i++){
		arr[i] = (i / len) * (hi - lo) + lo;
	}
	return arr;
}
exports.spreadFloat = spreadFloat;

// Generate a list of n-length starting at one value
// up untill (but excluding) the 3th argument. 
// Set an exponential curve in the spacing of the values.
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadFloatExp(len=1, lo=len, hi=0, exp=1){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// len is positive and minimum of 1
	len = Math.max(1, Math.abs(len));
	// generate array
	var arr = new Array(len);
	for (var i=0; i<len; i++){
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
	var arr = spreadFloat(len, lo, hi);
	return arr.map(v => Math.floor(v));
}
exports.spread = spread;

// Spread function floored to integers
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadExp(len, lo, hi, exp){
	var arr = spreadFloatExp(len, lo, hi, exp);
	return arr.map(v => Math.floor(v));
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
	// generate array
	var arr = new Array(len);
	for (var i = 0; i < len; i++){
		arr[i] = (i / (len-1)) * (hi - lo) + lo;
	}
	return arr;
}
exports.spreadInclusiveFloat = spreadInclusiveFloat;

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
	// generate array
	var arr = new Array(len);
	for (var i = 0; i < len; i++){
		arr[i] = Math.pow(i / (len-1), exp) * (hi - lo) + lo;
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
	return arr.map(v => Math.floor(v));
}
exports.spreadInclusive = spreadInclusive;

// spreadinclusiveFloatExp function floored to integers
// 
// @params {length, low-output, high-output, exponent}
// @return {Array}
//
function spreadInclusiveExp(len, lo, hi, exp){
	var arr = spreadInclusiveFloatExp(len, lo, hi, exp);
	return arr.map(v => Math.floor(v));
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
	if (!args.length){ return [0]; }
	if (args.length % 2){ args.pop(); }
	
	var arr = [];
	for (var i=0; i<args.length/2; i++){
		for (var k=0; k<Math.abs(args[i*2+1]); k++){
			arr.push(args[i*2]);
		}
	}
	return arr;
}
exports.fill = fill;