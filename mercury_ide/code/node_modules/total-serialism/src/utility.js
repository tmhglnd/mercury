//=======================================================================
// utility.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Utility functions
//=======================================================================

const HALF_PI = Math.PI / 2.0;
const TWO_PI = Math.PI * 2.0;
const PI = Math.PI;

exports.HALF_PI = HALF_PI;
exports.TWO_PI = TWO_PI;
exports.PI = PI;

// Return the remainder after division
// works also in the negative direction
// 
// @param {Int/Array} -> input value
// @param {Int} -> divisor
// @return {Int/Array} -> remainder after division
// 
function mod(a, mod){
	if (!Array.isArray(a)){
		return ((a % mod) + mod) % mod;
	}
	return a.map(x => ((x % mod) + mod) % mod);
}
exports.mod = mod;

// Wrap a value between a low and high range
// Similar to mod, expect the low range is also adjustable
// 
// @param {Number/Array} -> input value
// @param {Number} -> minimum value (default=0)
// @param {Number} -> maximum value (default=12)
// @return {Number} -> remainder after division
// 
// function wrap(a, max=12, min=0){
// 
// }
// exports.wrap = wrap;

// Constrain a value between a low
// and high range
// 
// @param {Number} -> number to constrain
// @param {Number} -> minimum value (default=0)
// @param {Number} -> maximum value (default=1)
// @return {Number} -> constrained value
// 
function constrain(a, min, max){
	if (!Array.isArray(a)){
		return Math.min(max, Math.max(min, a));
	}
	return a.map(x => Math.min(max, Math.max(min, x)));
}
exports.constrain = constrain;
exports.bound = constrain;

// Fold a between a low and high range
// When the value exceeds the range it is folded inwards
// Has the effect of "bouncing" against the boundaries
// 
// @param {Number} -> number to fold
// @param {Number} -> minimum value
// @param {Number} -> maximum value
// @return {Number} -> folder value
// 
function fold(a, ...params){
	if (!Array.isArray(a)){
		return _fold(a, ...params);
	}
	return a.map(x => _fold(x, ...params));
}
exports.fold = fold;
exports.bounce = fold;

function _fold(a, min, max){
	a = _map(a, min, max, -1, 1);
	a = Math.asin(Math.sin(a * HALF_PI)) / HALF_PI;
	return _map(a, -1, 1, min, max);
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
function add(a=[0], v=0){
	if (!Array.isArray(a)){
		return a + v;
	}
	if (Array.isArray(v)){
		for (let i in a){
			a[i] = a[i] + v[i % v.length];
		}
		return a;
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
function subtract(a=[0], v=0){
	if (!Array.isArray(a)){
		return a - v;
	}
	if (Array.isArray(v)){
		for (let i in a){
			a[i] = a[i] - v[i % v.length];
		}
		return a;
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
function multiply(a=[0], v=0){
	if (!Array.isArray(a)){
		return a * v;
	}
	if (Array.isArray(v)){
		for (let i in a){
			a[i] = a[i] * v[i % v.length];
		}
		return a;
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
function divide(a=[0], v=0){
	if (!Array.isArray(a)){
		return a / v;
	}
	if (Array.isArray(v)){
		for (let i in a){
			a[i] = a[i] / v[i % v.length];
		}
		return a;
	}
	return a.map(x => x / v);
}
exports.divide = divide;
exports.div = divide;