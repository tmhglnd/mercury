//====================================================================
// utility.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Utility functions
//====================================================================

const chart = require('asciichart');

const HALF_PI = Math.PI / 2.0;
const TWO_PI = Math.PI * 2.0;
const PI = Math.PI;

exports.HALF_PI = HALF_PI;
exports.TWO_PI = TWO_PI;
exports.PI = PI;

// Wrap a value between a low and high range
// Similar to mod, expect the low range is also adjustable
// 
// @param {Number/Array} -> input value
// @param {Number} -> minimum value optional, (default=12)
// @param {Number} -> maximum value optional, (default=0)
// @return {Number} -> remainder after division
// 
function wrap(a, lo=12, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// calculate range and wrap the values
	let r = hi - lo;
	if (!Array.isArray(a)){
		return (((a - lo % r) + r) % r) + lo;
	}
	return a.map(x => (((x - hi % r) + r) % r) + hi)
}
exports.wrap = wrap;

// Constrain a value between a low and high range
// 
// @param {Number/Array} -> number to constrain
// @param {Number} -> minimum value (optional, default=12)
// @param {Number} -> maximum value (optional, default=0)
// @return {Number} -> constrained value
// 
function constrain(a, lo=12, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// constrain the values
	if (!Array.isArray(a)){
		return Math.min(hi, Math.max(lo, a));
	}
	return a.map(x => Math.min(hi, Math.max(lo, x)));
}
exports.constrain = constrain;
exports.bound = constrain;

// Fold a between a low and high range
// When the value exceeds the range it is folded inwards
// Has the effect of "bouncing" against the boundaries
// 
// @param {Number/Array} -> number to fold
// @param {Number} -> minimum value (optional, default=12)
// @param {Number} -> maximum value (optional, default=0)
// @return {Number} -> folder value
// 
function fold(a, lo=12, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// fold the values
	if (!Array.isArray(a)){
		return _fold(a, lo, hi);
	}
	return a.map(x => _fold(x, lo, hi));
}
exports.fold = fold;
exports.bounce = fold;

function _fold(a, lo, hi){
	a = _map(a, lo, hi, -1, 1);
	a = Math.asin(Math.sin(a * HALF_PI)) / HALF_PI;
	return _map(a, -1, 1, lo, hi);
}

// Map/scale a value or array from one input-range 
// to a given output-range
// 
// @param {Number/Array} -> value to be scaled
// @param {Number} -> input low
// @param {Number} -> input high
// @param {Number} -> output low
// @param {Number} -> output high
// @param {Number} -> exponent (optional, default=1)
// @return {Number/Array}
// 
function map(a, ...params){
	if (!Array.isArray(a)){
		return _map(a, ...params);
	}
	return a.map(x => _map(x, ...params));
}
exports.map = map;
exports.scale = map;

function _map(a, inLo=0, inHi=1, outLo=0, outHi=1, exp=1){
	a = (a - inLo) / (inHi - inLo);
	if (exp != 1){
		var sign = (a >= 0.0) ? 1 : -1;
		a = Math.pow(Math.abs(a), exp) * sign;
	}
	return a * (outHi - outLo) + outLo;
}

// add 1 or more values to an array, 
// preserves listlength of first argument
// arguments are applied sequentially
// 
// @param {Number/Array} -> input to be added to
// @param {Number/Array} -> value to add
// @return {Number/Array}
// 
function add(a, v=0){
	if (Array.isArray(v)){
		a = (Array.isArray(a))? a : [a];
		let l1 = a.length, l2 = v.length, r = [];
		let l = Math.max(l1, l2);
		for (let i=0; i<l; i++){
			r[i] = a[i % l1] + v[i % l2];
		}
		return r;
	}
	if (!Array.isArray(a)){
		return a + v;
	}
	return a.map(x => x + v);
}
exports.add = add;

// subtract 1 or more values from an array
// preserves listlength of first argument
// arguments are applied sequentially
// 
// @param {Number/Array} -> input to be subtracted from
// @param {Number/Array} -> value to subtract
// @return {Number/Array}
// 
function subtract(a, v=0){
	if (Array.isArray(v)){
		a = (Array.isArray(a))? a : [a];
		let l1 = a.length, l2 = v.length, r = [];
		let l = Math.max(l1, l2);
		for (let i=0; i<l; i++){
			r[i] = a[i % l1] - v[i % l2];
		}
		return r;
	}
	if (!Array.isArray(a)){
		return a - v;
	}
	return a.map(x => x - v);
}
exports.subtract = subtract;
exports.sub = subtract;

// multiply 1 or more values from an array
// preserves listlength of first argument
// arguments are applied sequentially
// 
// @param {Number/Array} -> input to be multiplied
// @param {Number/Array} -> value to multiply with
// @return {Number/Array}
// 
function multiply(a, v=1){
	if (Array.isArray(v)){
		a = (Array.isArray(a))? a : [a];
		let l1 = a.length, l2 = v.length, r = [];
		let l = Math.max(l1, l2);
		for (let i=0; i<l; i++){
			r[i] = a[i % l1] * v[i % l2];
		}
		return r;
	}
	if (!Array.isArray(a)){
		return a * v;
	}
	return a.map(x => x * v);
}
exports.multiply = multiply;
exports.mul = multiply;

// divide 1 or more values from an array
// preserves listlength of first argument
// arguments are applied sequentially
// 
// @param {Number/Array} -> input to be divided
// @param {Number/Array} -> value to divide with
// @return {Number/Array}
// 
function divide(a, v=1){
	if (Array.isArray(v)){
		a = (Array.isArray(a))? a : [a];
		let l1 = a.length, l2 = v.length, r = [];
		let l = Math.max(l1, l2);
		for (let i=0; i<l; i++){
			r[i] = a[i % l1] / v[i % l2];
		}
		return r;
	}
	if (!Array.isArray(a)){
		return a / v;
	}
	return a.map(x => x / v);
}
exports.divide = divide;
exports.div = divide;

// Return the remainder after division
// also works in the negative direction
// 
// @param {Int/Array} -> input value
// @param {Int/Array} -> divisor (optional, default=12)
// @return {Int/Array} -> remainder after division
// 
function mod(a, mod=12){
	if (Array.isArray(mod)){
		a = (Array.isArray(a))? a : [a];
		let l1 = a.length, l2 = mod.length, r = [];
		let l = Math.max(l1, l2);
		for (let i=0; i<l; i++){
			let m = mod[i % l2];
			r[i] = ((a[i % l1] % m) + m) % m;
		}
		return r;
	}
	if (!Array.isArray(a)){
		return ((a % mod) + mod) % mod;
	}
	return a.map(x => ((x % mod) + mod) % mod);
}
exports.mod = mod;

// Plot an array of values to the console in the form of an
// ascii chart and return chart from function. If you just want the 
// chart returned as text and not log to console set { log: false }.
// Using the asciichart package by x84. 
// 
// @param {Number/Array/String} -> value to plot
// @param {Object} -> { log: false } don't log to console and only return
//                 -> { data: true } log the original array data
//                 -> { decimals: 2 } adjust the number of decimals
//                 -> { height: 10 } set a fixed chart line-height
//                 -> other preferences for padding, colors, offset
//                    See the asciichart documentation
// 
function plot(a=[0], prefs){
	// if a is not an Array
	a = (Array.isArray(a)) ? a : [a]; 
	// empty object if no preferences
	prefs = (typeof prefs !== 'undefined') ? prefs : {};

	prefs.log = (typeof prefs.log !== 'undefined') ? prefs.log : true;
	prefs.data = (typeof prefs.data !== 'undefined') ? prefs.data : false;
	prefs.decimals = (typeof prefs.decimals !== 'undefined') ? prefs.decimals : 2;

	let p = chart.plot(a, prefs);
	if (prefs.data){
		console.log('chart data: [', a.map(x => x.toFixed(prefs.decimals)).join(", "), "]\n");
	}
	if (prefs.log){
		console.log(chart.plot(a, prefs), "\n");
	}
	return p;
}
exports.plot = plot;