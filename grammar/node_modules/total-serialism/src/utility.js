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

// Interpolate / mix between 2 values
// 
// @param {Number} -> value 1
// @param {Number} -> value 2
// @param {Number} -> interpolation factor (0-1, optional, default=0.5)
// @return {Number}
// 
// function mix(arr0, arr1=[0], f=0.5){
// 	arr1 = (Array.isArray())? arr1 : [arr1];
// 	// if (!Array.isArray(arr0) && !Array.isArray(arr1)){
// 	// 	return _mix(arr0, arr1, f);
// 	// }
// }
// exports.mix = mix;
// exports.interpolate = mix;

function _mix(a0, a1, f=0.5, mode='linear'){
	return a0 * (1-f) + a1 * f;
}
exports.lerp = _mix;

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

// Truncate all the values in an array towards 0,
// sometimes referred to as rounding down
// 
// @param {Number/Array} -> input value
// @return {Int/Array} -> trucated value
function truncate(a=[0]){
	if (!Array.isArray(a)){
		return Math.trunc(a);
	}
	return a.map(x => Math.trunc(x));
}
exports.truncate = truncate;
exports.trunc = truncate;
exports.int = truncate;

// Return the biggest value from an array
// 
// @param {NumberArray} -> input array
// @return {Number} -> biggest value
// 
function maximum(a=[0]){
	if (!Array.isArray(a)) { return a; }
	let m = -Infinity;
	for (let i in a){
		m = (a[i] > Number(m))? a[i] : m;
	}
	return m;
}
exports.maximum = maximum;
exports.max = maximum;

// Return the lowest value from an array
// 
// @param {NumberArray} -> input array
// @return {Number} -> lowest value
// 
function minimum(a=[0]){
	if (!Array.isArray(a)) { return a; }
	let m = Infinity;
	for (let i in a){
		m = (a[i] < Number(m))? a[i] : m;
	}
	return m;
}
exports.minimum = minimum;
exports.min = minimum;

// Normalize all the values in an array between 0. and 1.
// The highest value will be 1, the lowest value will be 0.
// 
// @param {Number/Array} -> input values
// @return {Int/Array} -> normailzed values
function normalize(a=[0]){
	a = (!Array.isArray(a))? [a] : a;
	// get minimum and maximum
	let min = minimum(a);
	let range = maximum(a) - min;
	// if range 0 then range = min and min = 0
	if (!range) { range = min, min = 0; }
	// normalize and return
	return a.map(x => (x - min) / range);
}
exports.normalize = normalize;

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

// Draw a 2D-array of values to the console in the form of an
// ascii gray-scaleimage and return chart from function. 
// If you just want the chart returned as text and not log to console 
// set { log: false }. If you want to print using a characterset under 
// ascii-code 256 use { extend: false }. 
// 
// @param {Array/2D-Array} -> values to plot
// @param {Object} -> { log: false } don't log to console and only return
//                 -> { extend: true } use extended ascii characters
//                 -> { error: false } use error character for error reporting
// 
function draw(a=[0], prefs){
	// if a is not an array
	a = (Array.isArray(a)) ? a : [a];
	// if a is not an 2d-array
	a = (Array.isArray(a[0])) ? a : [a];

	// empty object if no preferences
	prefs = (typeof prefs !== 'undefined') ? prefs : {};

	prefs.log = (typeof prefs.log !== 'undefined') ? prefs.log : true;
	prefs.extend = (typeof prefs.extend !== 'undefined') ? prefs.extend : true;
	prefs.error = (typeof prefs.error !== 'undefined') ? prefs.error : false;

	// when using extended ascii set
	let chars = (prefs.extend) ? ' ░▒▓█'.split('') : ' .-=+#'.split('');
	// when flagging NaN values
	let err = (prefs.error) ? ((prefs.extend) ? '�' : '?') : ' ';

	// get the lowest and highest value from input and calculate range
	let min = Infinity, max = -Infinity;
	for (let i in a){
		for (let j in a[i]){
			min = (a[i][j] < min)? a[i][j] : min;
			max = (a[i][j] > max)? a[i][j] : max;
		}
	}
	let range = max - min;

	// lookup a grayscale ascii value based on normalized array value
	// use whitespace if value is NaN or 'X' if error flag is true
	let p = '';
	for (let i in a){
		for (let j in a[i]){
			let grey = Math.trunc((a[i][j] - min) / range * (chars.length-1));
			let char = (isNaN(grey)) ? err : chars[grey];
			p += char;
		}
		// add linebreak if multiple lines must be printed
		if (a.length > 1) { p += '\n'; }
	}
	if (prefs.log){ console.log(p); }
	return p;	
}
exports.draw = draw;