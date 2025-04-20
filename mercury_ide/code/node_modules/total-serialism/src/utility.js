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

// check if the value is an array or not
// if not transform into an array and output
//
// @param {Value} -> input to be checked
// @return {Array} -> the input as an array
//
function toArray(a){
	return Array.isArray(a) ? a : [a];
}
exports.toArray = toArray;

// check if the value is an array or not
// if it is an array output the first value
// 
// @param {Value} -> intput to be checked
// @param {Int+} -> index to return from Array (optional, default=0)
// @return {Value} -> single value output
//
function fromArray(a, i=0){
	return Array.isArray(a) ? a[i] : a;
}
exports.fromArray = fromArray;

// Return the length/size of an array if the argument is an array
// if argument is a number return the number as integer
// if argument is not a number return 1
// The method can be used to input arrays as arguments for other functions
// 
// @param {Value/Array} -> input value to check
// @return {Int} -> the array length
// 
function length(a){
	if (Array.isArray(a)){
		// return array length if argument is array
		return a.length;
	}
	// else return 1 if NaN or positive integer if Number
	return isNaN(a) ? 1 : Math.max(1, Math.floor(a));
}
exports.length = length;
exports.size = length;

// Wrap a value between a low and high range
// Similar to mod, expect the low range is also adjustable
// 
// @param {Number/Array} -> input value
// @param {Number} -> minimum value optional, (default=12)
// @param {Number} -> maximum value optional, (default=0)
// @return {Number} -> remainder after division
// 
function wrap(a=0, lo=12, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// calculate range and wrap the values
	if (!Array.isArray(a)){
		return _wrap(a, lo, hi);
	}
	return a.map(x => wrap(x, lo, hi));
}
exports.wrap = wrap;

function _wrap(a, lo, hi){
	let r = hi - lo;
	return ((((a - lo) % r) + r) % r) + lo;
}

// Constrain a value between a low and high range
// 
// @param {Number/Array} -> number to constrain
// @param {Number} -> minimum value (optional, default=12)
// @param {Number} -> maximum value (optional, default=0)
// @return {Number} -> constrained value
// 
function constrain(a=0, lo=12, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// constrain the values
	if (!Array.isArray(a)){
		return Math.min(hi, Math.max(lo, a));
	}
	return a.map(x => constrain(x, lo, hi));
}
exports.constrain = constrain;
exports.bound = constrain;
exports.clip = constrain;
exports.clamp = constrain;

// Fold a between a low and high range
// When the value exceeds the range it is folded inwards
// Has the effect of "bouncing" against the boundaries
// 
// @param {Number/Array} -> number to fold
// @param {Number} -> minimum value (optional, default=12)
// @param {Number} -> maximum value (optional, default=0)
// @return {Number} -> folder value
// 
function fold(a=0, lo=12, hi=0){
	// swap if lo > hi
	if (lo > hi){ var t=lo, lo=hi, hi=t; }
	// fold the values
	if (!Array.isArray(a)){
		return _fold(a, lo, hi);
	}
	return a.map(x => fold(x, lo, hi));
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
function map(a=0, ...params){
	if (!Array.isArray(a)){
		return _map(a, ...params);
	}
	return a.map(x => map(x, ...params));
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

// Lerp (Linear interpolation) two values or arrays
// Both sides can be a single value or an array
// Set the interpolation factor as third argument
// 
// @param {Number/Array} -> input 1 to be mixed
// @param {Number/Array} -> input 2 to be mixed
// @param {Number} -> interpolation factor (optional, default=0.5)
// @return {Number/Array}
// 
function lerp(a=0, v=0, f=0.5){
	return arrayCalc(a, v, (a, b) => { return a * (1 - f) + b * f });
}
exports.lerp = lerp;
exports.mix = lerp;

// add 1 or more values to an array, 
// preserves listlength of first argument
// arguments are applied sequentially
// 
// @param {Number/Array} -> input to be added to
// @param {Number/Array} -> value to add
// @return {Number/Array}
// 
function add(a=0, v=0){
	return arrayCalc(a, v, (a, b) => { return a + b });
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
function subtract(a=0, v=0){
	return arrayCalc(a, v, (a, b) => { return a - b });
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
function multiply(a=0, v=1){
	return arrayCalc(a, v, (a, b) => { return a * b });
}
exports.multiply = multiply;
exports.mult = multiply;
exports.mul = multiply;

// divide 1 or more values from an array
// preserves listlength of first argument
// arguments are applied sequentially
// 
// @param {Number/Array} -> input to be divided
// @param {Number/Array} -> value to divide with
// @return {Number/Array}
// 
function divide(a=0, v=1){
	return arrayCalc(a, v, (a, b) => { return a / b });
}
exports.divide = divide;
exports.div = divide;

// Return the remainder after division
// also works in the negative direction, so wrap starts at 0
// 
// @param {Int/Array} -> input value
// @param {Int/Array} -> divisor (optional, default=12)
// @return {Int/Array} -> remainder after division
// 
function mod(a=0, v=12){
	return arrayCalc(a, v, (a, b) => { return ((a % b) + b) % b });
}
exports.mod = mod;

// Raise a value of one array to the power of the value
// from the right hand array
// 
// @param {Number/Array} -> base
// @param {Number/Array} -> exponent 
// @return {Number/Array} -> result from function
// 
function pow(a=0, v=1){
	return arrayCalc(a, v, (a, b) => { return Math.pow(a, b) });
}
exports.pow = pow;

// Return the squareroot of an array of values
// 
// @param {Number/Array} -> values
// @return {Number/Array} -> result
// 
function sqrt(a=0){
	return arrayCalc(a, 0, (a) => { return Math.sqrt(a) });
}
exports.sqrt = sqrt;

// Evaluate a function for a multi-dimensional array
// 
// @params {Array|Number} -> left hand input array
// @params {Array|Number} -> right hand input array
// @params {Function} -> function to evaluate
// @return {Array|Number} -> result of evaluation
// 
function arrayCalc(a=0, v=0, func=()=>{return a;}){
	// if righthand side is array
	if (Array.isArray(v)){
		a = toArray(a);
		let l1 = a.length, l2 = v.length, r = [];
		let l = Math.max(l1, l2);
		for (let i=0; i<l; i++){
			r[i] = arrayCalc(a[i % l1], v[i % l2], func);
		}
		return r;
	}
	// if both are single values
	if (!Array.isArray(a)){
		let r = func(a, v);
		if (!isNaN(a) && !isNaN(v)){
			return isNaN(r)? 0 : r;
		}
		return r;
	}
	// if lefthand side is array
	return a.map(x => arrayCalc(x, v, func));
}
exports.arrayCalc = arrayCalc;

// Call a list function with provided arguments
// The difference is that first all the possible combinations of the arrays
// are calculated allowing arrays as arguments to generate
// multiple versions of the function and joining them together
//
function multiCall(func, ...a){
	// calculate the array combinations
	let args = arrayCombinations(...a);
	// call the function for all the argument combinations
	args = args.map((a) => func(...a));
	// combine into a single list but preserving multi-dimensional arrays
	let out = flatten(args, 1);
	return out;
}
exports.multiCall = multiCall;

// Alternate through 2 or multiple lists consecutively
// The output length is the lowest common denominator of the input lists
// so that every combination of consecutive values is included
// This function is used to allow arrays as input for Generators
// And for the step function for algorithmic composition
//
// @param {Array0, Array1, ..., Array-n} -> arrays to interleave
// @return {Array} -> outputs a 2D array of the results
//
function arrayCombinations(...arrs){
	// make sure all items are an array of at least 1 item
	arrs = arrs.map(a => toArray(a));
	// get the lengths, but remove duplicate lengths
	let sizes = unique(arrs.map(a => a.length));
	// multiply to get total of possible iterations
	let iters = 1;	
	sizes.forEach((l) => iters *= l);
	// iterate over the total amount pushing the items to array
	let arr = [];
	for (let i=0; i<iters; i++){
		arr.push(arrs.map((e) => {
			return e[i % e.length]
		}));
	}
	return arr;
}
exports.arrayCombinations = arrayCombinations;

// flatten a multidimensional array. Optionally set the depth
// for the flattening
//
// @param {Array} -> array to flatten
// @param {Number} -> depth of flatten
// @return {Array} -> flattened array
//
function flatten(a=[0], depth=Infinity){
	return toArray(a).flat(depth);
}
exports.flatten = flatten;
exports.flat = flatten;

// Truncate all the values in an array towards 0,
// sometimes referred to as rounding down
// 
// @param {Number/Array} -> input value
// @return {Int/Array} -> trucated value
function truncate(a=[0]){
	if (!Array.isArray(a)){
		return Math.trunc(a);
	}
	return a.map(x => truncate(x));
}
exports.truncate = truncate;
exports.trunc = truncate;
exports.int = truncate;

// Return the sum of all values in the array
// Ignore all non numeric values
// Works with multidimensional arrays by flattening first
// 
// @param {Array} -> input array
// @return {Number} -> summed array
//
function sum(a=[0]){
	let s = 0;
	flatten(toArray(a)).forEach((v) => {
		s += isNaN(v) ? 0 : v;
	});
	return s;
}
exports.sum = sum;

// Return the biggest value from an array
// 
// @param {NumberArray} -> input array
// @return {Number} -> biggest value
// 
function maximum(a=[0]){
	if (!Array.isArray(a)) { return a; }
	return Math.max(...flatten(a));
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
	return Math.min(...flatten(a));
}
exports.minimum = minimum;
exports.min = minimum;

// Normalize all the values in an array between 0. and 1.
// The highest value will be 1, the lowest value will be 0.
// 
// @param {Number/Array} -> input values
// @return {Number/Array} -> normalized values
// 
function normalize(a=[0]){
	// get minimum and maximum
	let min = minimum(a);
	let range = maximum(a) - min;
	// if range 0 then range = min and min = 0
	if (!range) { range = min, min = 0; }
	// normalize and return
	return divide(subtract(a, min), range);
}
exports.normalize = normalize;
exports.norm = normalize;

// Signed Normalize all the values in an array between -1. and 1.
// The highest value will be 1, the lowest value will be -1.
//
// @param {Number/Array} -> input values
// @return {Number/Array} -> signed normalized values
// 
function signedNormalize(a=[0]){
	return subtract(multiply(normalize(a), 2), 1);
}
exports.signedNormalize = signedNormalize;
exports.snorm = signedNormalize;

// filter duplicate items from an array
// does not account for 2-dimensional arrays in the array
// 
// @param {Array} -> array to filter
// @return {Array}
// 
function unique(a=[0]){
	return [...new Set(toArray(a))];
}
exports.unique = unique;

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
	a = toArray(a);
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
	a = toArray(a);
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