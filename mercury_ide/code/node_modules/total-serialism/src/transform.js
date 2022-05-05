//=======================================================================
// transform.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Basic methods that can transform number sequences
// 
// TODO:
// - make invert() work with note-values 'c' etc.
// 
// credits:
// - Many functions are based on Laurie Spiegel's suggestion to 
// "extract a basic "library" consisting of the most elemental 
// transformations which have consistently been successfully used on 
// musical patterns, a basic group of "tried-and-true" musical 
// manipulations.", in Manipulation of Musical Patterns (1981)
//=======================================================================

// require the Utility methods
// const Rand = require('./gen-stochastic');
const Stat = require('./statistic');
const Util = require('./utility');

// Duplicate an array multiple times,
// optionaly add an offset to every value when duplicating
// Also works with 2-dimensonal arrays
// If string the values will be concatenated
// 
// @param {Array} -> array to clone
// @param {Int, Int2, ... Int-n} -> amount of clones with integer offset
// 								 -> or string concatenation
// 
function clone(a=[0], ...c){
	// flatten array if multi-dimensional
	if (!c.length) { 
		c = [0, 0];
	} else { 
		c = c.flat(); 
	}
	var arr = [];
	for (var i=0; i<c.length; i++){
		arr = arr.concat(a.map(v => Util.add(v, c[i])));
	}
	return arr;
}
exports.clone = clone;

// combine arrays into one array
// multiple arrays as arguments possible
// 
// @params {Array0, Array1, ..., Array-n} -> Arrays to join
// @return {Array}
// 
function combine(...args){
	if (!args.length){ return [0]; }
	var arr = [];
	for (var i=0; i<args.length; i++){
		arr = arr.concat(args[i]);
	}
	return arr;
}
exports.combine = combine;
exports.join = combine;

// duplicate an array a certain amount of times
// 
// @param {Array} -> array to duplicate
// @param {Int} -> amount of output duplicates (optional, default=2)
// @return {Array}
// 
function duplicate(a=[0], d=2){
	var arr = [];
	for (var i=0; i<Math.max(1,d); i++){
		arr = arr.concat(a);
	}
	return arr;
}
exports.duplicate = duplicate;
exports.copy = duplicate;
exports.dup = duplicate;

// add zeroes to an array with a rhythmic sequence
// the division determins the amount of values per bar
// total length = bars * div
//
// param {Array} -> Array to use every n-bars
// param {Int} -> amount of bars
// param {Int} -> amount of values per bar
// param {Value} -> padding argument (optional, default=0)
// param {Number} -> shift the output by n-divs (optional, default=0)
// return {Array}
//
function every(a=[0], bars=4, div=16, pad=0, shift=0){
	let len = Math.floor(bars * div) - a.length;
	if (len < 1 ) {
		return a;
	} else {
		let arr = new Array(len).fill(pad);

		return rotate(a.concat(arr), Math.floor(shift*div));
	}
}
exports.every = every;

// filter one or multiple values from an array
// 
// @param {Array} -> array to filter
// @param {Number/String/Array} -> values to filter
// @return (Array} -> filtered array
// 
function filter(a=[0], f){
	let arr = (Array.isArray(a))? a.slice() : [a];
	f = (Array.isArray(f))? f : [f];

	for (let i in f){
		let index = arr.indexOf(f[i]);
		while (index >= 0){
			arr.splice(index, 1);
			index = arr.indexOf(f[i]);
		}
	}
	return arr;
}
exports.filter = filter;

// filter one or multiple datatypes from an array
// In this case the input type is the type that is output
// 
// @param {Array} -> array to filter
// @param {String/Array} -> types to filter
// @return (Array} -> filtered array
// 
function filterType(a=[0], t){
	a = (Array.isArray(a))? a.slice() : [a];
	t = (Array.isArray(t))? t : [t];

	let types = a.map(x => typeof x);	
	let arr = [];
	for (let i in t){
		let index = types.indexOf(t[i]);
		while (index >= 0){
			arr.push(a[index]);
			a.splice(index, 1);
			types.splice(index, 1);
			index = types.indexOf(t[i]);
		}
	}
	return arr;
}
exports.filterType = filterType;
exports.tFilter = filterType;

// invert a list of values by mapping the lowest value
// to the highest value and vice versa, flipping everything
// in between. 
// Second optional argument sets the center to flip values against. 
// Third optional argument sets a range to flip values against.
// 
// @param {Array} -> array to invert
// @param {Int} -> invert center / low range (optional)
// @param {Int} -> high range (optional)
// @return {Array}
// 
function invert(arr=[0], lo, hi){
	if (lo === undefined){
		hi = Math.max(...arr);
		lo = Math.min(...arr);
	} else if (hi === undefined){
		hi = lo;
	}
	return arr.slice().map(v => hi - v + lo);
}
exports.invert = invert;

// interleave two or more arrays
// 
// @param {Array0, Array1, ..., Array-n} -> arrays to interleave
// @return {Array}
//  
function lace(...args){
	if (!args.length){ return [0]; }

	var l = 0;
	for (let i in args){
		l = Math.max(args[i].length, l);
	}
	var arr = [];
	for (var i=0; i<l; i++){
		for (var k in args){
			let v = args[k][i];
			if (v != undefined){ arr.push(v); }
		}
	}
	return arr;
}
exports.lace = lace;
exports.zip = lace;

// Build an array of items based on another array of indeces 
// The values are wrapped within the length of the lookup array
// Works with n-dimensional arrays by applying a recursive lookup
// 
// @param {Array} -> Array with indeces to lookup
// @param {Array} -> Array with values returned from lookup
// @return {Array} -> Looked up values
// 
function lookup(idx=1, arr=[0]){
	idx = (Array.isArray(idx)) ? idx : [idx];
	arr = (Array.isArray(arr)) ? arr : [arr];
	let a = [];
	let len = arr.length;
	for (let i in idx){
		if (Array.isArray(idx[i])){
			a[i] = lookup(idx[i], arr);
		} else {
			let look = (idx[i] % len + len) % len;
			a[i] = arr[look];
		}
	}
	return a;
}
exports.lookup = lookup;

// merge all values of two arrays on the same index
// into a 2D array. preserves length of longest list
// 
// @params {Array0, Array1, ..., Array-n} -> Arrays to merge
// @return {Array}
// 
function merge(...args){
	if (!args.length){ return [0]; }
	var l = 0;
	for (let i in args){
		l = Math.max(args[i].length, l);
	}
	var arr = [];
	for (var i=0; i<l; i++){
		var a = [];
		for (var k in args){
			let v = args[k][i];
			if (v != undefined){ 
				if (Array.isArray(v)) a.push(...v);
				else a.push(v);
			}
		}
		arr[i] = a;
	}
	return arr;
}
exports.merge = merge;

// reverse an array and concatenate to the input
// creating a palindrome of the array
// 
// @param {Array} -> array to make palindrome of
// @param {Bool} -> no-double flag (optional, default=false)
// @return {Array}
// 
function palindrome(arr=[0], noDouble=false){
	var rev = arr.slice().reverse();
	if (noDouble){
		rev = rev.slice(1, rev.length-1);
	}
	return arr.concat(rev);
}
exports.palindrome = palindrome;
exports.mirror = palindrome;

// repeat the values of an array n-times
// Using a second array for repeat times iterates over that array
// 
// @param {Array} -> array with values to repeat
// @param {Int/Array} -> array or number of repetitions per value
// @return {Array}
// 
function repeat(arr=[0], rep=1){
	arr = (Array.isArray(arr))? arr : [arr];
	rep = (Array.isArray(rep))? rep : [rep];
	
	let a = [];
	for (let i in arr){
		let r = rep[i % rep.length];
		r = (isNaN(r) || r < 0)? 0 : r;
		for (let k=0; k<r; k++){
			a.push(arr[i]);
		}
	}
	return a;
}
exports.repeat = repeat;

// reverse the order of items in an Array
// 
// @param {Array} -> array to reverse
// @return {Array}
// 
function reverse(a=[0]){
	return a.slice().reverse();
}
exports.reverse = reverse;

// rotate the position of items in an array 
// 1 = direction right, -1 = direction left
// 
// @param {Array} -> array to rotate
// @param {Int} -> steps to rotate (optional, default=0)
// @return {Array}
// 
function rotate(a=[0], r=0){
	var l = a.length;
	var arr = [];
	for (var i=0; i<l; i++){
		// arr[i] = a[Util.mod((i - r), l)];
		arr[i] = a[((i - r) % l + l) % l];
	}
	return arr;
}
exports.rotate = rotate;

// placeholder for the sort() method found in 
// statistic.js
// 
exports.sort = Stat.sort;

// spray the values of one array on the 
// places of values of another array if 
// the value is greater than 0
// 
// param {Array} -> array to spread
// param {Array} -> positions to spread to
// return {Array}
// 
function spray(values=[0], beats=[0]){
	var arr = beats.slice();
	var c = 0;
	for (let i in beats){
		if (beats[i] > 0){
			arr[i] = values[c++ % values.length];
		}
	}
	return arr;
}
exports.spray = spray;

// stretch (or shrink) an array of numbers to a specified length
// interpolating the values to fill in the gaps. 
// TO-DO: Interpolations options are: none, linear, cosine, cubic
// 
// param {Array} -> array to stretch
// param {Array} -> outputlength of array
// param {String/Int} -> interpolation function (optional, default=linear)
// 
function stretch(a=[0], len=5, mode='linear'){
	let arr = [];
	let l = a.length;
	for (let i=0; i<len; i++){
		// construct a lookup interpolation position for new array
		let val = i / (len - 1) * (l - 1);
		// lookup nearest neighbour left/right
		let a0 = a[Math.max(Math.trunc(val), 0)];
		let a1 = a[Math.min(Math.trunc(val)+1, l-1)];

		if (mode === 'none' || mode === null || mode === false){
			arr.push(a0);
		} else {
			// interpolate between the values according to decimal place
			arr.push(Util.lerp(a0, a1, val % 1));
		}
	}
	return arr;
}
exports.stretch = stretch;

// filter duplicate items from an array
// does not account for 2-dimensional arrays in the array
// 
// @param {Array} -> array to filter
// @return {Array}
// 
function unique(a=[0]){
	return [...new Set(a)];
}
exports.unique = unique;
