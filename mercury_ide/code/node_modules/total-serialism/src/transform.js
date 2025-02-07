//=======================================================================
// transform.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Methods that transform number sequences
// These are called the "transformers"
// A transformer always takes an input list as the first argument
// A transformer never destructively changes the input list
// The output of the transformer is the modified input list(s)
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
const { sort } = require('./statistic');
const { flat, add, max, min, lerp, toArray, size, unique, arrayCombinations } = require('./utility');

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
	a = toArray(a);
	if (!c.length) { 
		// return input if no clone arguments
		return a;
	} else { 
		// flatten clone array if multi-dimensional
		c = flat(c); 
	}
	let arr = [];
	for (let i=0; i<c.length; i++){
		arr = arr.concat(a.map(v => add(v, c[i])));
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
function combine(...arrs){
	if (!arrs.length){ return [0]; }
	let arr = [];
	for (let i=0; i<arrs.length; i++){
		arr = arr.concat(arrs[i]);
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
	let arr = [];
	for (let i=0; i<Math.max(1,d); i++){
		arr = arr.concat(a);
	}
	return arr;
}
exports.duplicate = duplicate;
exports.copy = duplicate;
exports.dup = duplicate;

// pad an array with zeroes (or other values)
// the division determines the amount of values per bar
// total length = bars * div
//
// param {Array} -> Array to use every n-bars
// param {Int} -> amount of bars (optional, default=1)
// param {Int} -> amount of values per bar (optional, default=16)
// param {Value} -> padding argument (optional, default=0)
// param {Number} -> shift the output by n-divs (optional, default=0)
// return {Array}
//
function every(a=[0], bars=1, div=16, pad=0, shift=0){
	let len = Math.floor(bars * div);
	let sft = Math.floor(shift * div);
	return padding(a, len, pad, sft);
}
exports.every = every;

// Import from the Util.flatten
// flatten a multidimensional array. Optionally set the depth
// for the flattening
//
exports.flatten = flat;
exports.flat = flat;

// similar to every(), but instead of specifying bars/divisions
// this method allows you to specify the exact length of the array
// and the shift is not a ratio but in whole integer steps
//
// param {Array} -> Array to use every n-bars
// param {Int} -> Array length output
// param {Number} -> shift the output by n-divs (optional, default=0)
// param {Value} -> padding argument (optional, default=0)
// return {Array}
//
function padding(a=[0], length=16, pad=0, shift=0){
	a = toArray(a);	
	length = size(length);
	
	let len = length - a.length;
	if (len < 1) {
		return a.slice(0, length);
	}
	let arr = new Array(len).fill(pad);
	return rotate(a.concat(arr), shift);
}
exports.padding = padding;
exports.pad = padding;

// filter one or multiple values from an array
// 
// @param {Array} -> array to filter
// @param {Number/String/Array} -> values to filter
// @return (Array} -> filtered array
// 
function filter(a=[0], f){
	let arr = (Array.isArray(a))? a.slice() : [a];
	f = toArray(f);

	for (var i=0; i<f.length; i++){
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
// @param {String/Array} -> types to filter (default = number)
// @return (Array} -> filtered array
// 
function filterType(a=[0], t='number'){
	a = (Array.isArray(a))? a.slice() : [a];
	t = toArray(t);

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
function invert(a=[0], lo, hi){
	a = toArray(a);

	if (lo === undefined){
		// if no center value set lo/hi based on min/max
		hi = max(a);
		lo = min(a);
	} else if (hi === undefined){
		// if no hi defined set hi to be same as lo
		hi = lo;
	}
	return a.slice().map(v => {
		// apply the algorithm recursively for all items
		if (Array.isArray(v)){
			return invert(v, lo, hi);
		}
		return hi - v + lo;
	});
}
exports.invert = invert;

// interleave two or more arrays
// 
// @param {Array0, Array1, ..., Array-n} -> arrays to interleave
// @return {Array}
//  
function lace(...arrs){
	if (!arrs.length){ return [0]; }
	// get the length of longest list
	var l = 0;
	for (let i=0; i<arrs.length; i++){
		arrs[i] = toArray(arrs[i]);
		l = Math.max(arrs[i].length, l);
	}
	// for the max length push all values of the various lists
	var arr = [];
	for (var i=0; i<l; i++){
		for (var k=0; k<arrs.length; k++){
			let v = arrs[k][i];
			if (v !== undefined){ arr.push(v); }
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
function lookup(idx=[0], arr=[0]){
	idx = toArray(idx);
	arr = toArray(arr);
	let a = [];
	let len = arr.length;
	for (let i=0; i<idx.length; i++){
		// recursively lookup values for multidimensional arrays
		if (Array.isArray(idx[i])){
			a.push(lookup(idx[i], arr));
		} else {
			if (!isNaN(idx[i])){
				let look = (Math.floor(idx[i]) % len + len) % len;
				a.push(arr[look]);
			}
		}
	}
	return a;
}
exports.lookup = lookup;

// merge all values of two arrays on the same index
// into a 2D array. preserves length of longest list
// flattens multidimensional arrays to 2 dimensions on merge
// 
// @params {Array0, Array1, ..., Array-n} -> Arrays to merge
// @return {Array}
// 
function merge(...arrs){
	if (!arrs.length){ return [0]; }
	let l = 0;
	for (let i=0; i<arrs.length; i++){
		arrs[i] = toArray(arrs[i]);
		l = Math.max(arrs[i].length, l);
	}
	let arr = [];
	for (let i=0; i<l; i++){
		let a = [];
		for (let k=0; k<arrs.length; k++){
			let v = arrs[k][i];
			if (v !== undefined){ 
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
function palindrome(arr, noDouble=false){
	if (arr === undefined){ return [0] };
	if (!Array.isArray(arr)){ return [arr] };
	
	let rev = arr.slice().reverse();
	if (noDouble){
		rev = rev.slice(1, rev.length-1);
	}
	return arr.concat(rev);
}
exports.palindrome = palindrome;
exports.palin = palindrome;
exports.mirror = palindrome;

// repeat the values of an array n-times
// Using a second array for repeat times iterates over that array
// 
// @param {Array} -> array with values to repeat
// @param {Int/Array} -> array or number of repetitions per value
// @return {Array}
// 
function repeat(arr=[0], rep=1){
	arr = toArray(arr);
	rep = toArray(rep);
	
	let a = [];
	for (let i=0; i<arr.length; i++){
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
	if (!Array.isArray(a)){ return [a]; }
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
	if (!Array.isArray(a)){ return [a]; }
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
exports.sort = sort;

// slice an array in one or multiple parts 
// slice lengths are determined by the second argument array
// outputs an array of arrays of the result
//
// @params {Array} -> array to slice
// @params {Number|Array} -> slice points
// @return {Array}
// 
function slice(a=[0], s=[0], r=true){
	a = toArray(a);
	s = toArray(s);

	let arr = [];
	let _s = 0;
	for (let i=0; i<s.length; i++){
		if (s[i] > 0){
			let _t = _s + s[i];
			arr.push(a.slice(_s, _t));
			_s = _t;
		}
	}
	if (r){
		let rest = a.slice(_s, a.length);
		// attach the rest if not an empty array and r=true
		if (rest.length > 0){ arr.push(rest); }
	}
	return arr;
}
exports.slice = slice;

// Similar to slice in that it also splits an array
// excepts slice recursively splits until the array is
// completely empty 
// 
// @params {Array} -> array to split
// @params {Number/Array} -> split sizes to iterate over
// @return {Array} -> 2D array of splitted values
// 
function split(a=[0], s=[1]){
	a = toArray(a);
	s = toArray(s);

	return _split(a, s);
}
exports.split = split;

function _split(a, s){
	if (s[0] > 0){
		let arr = a.slice(0, s[0]);
		let res = a.slice(s[0], a.length);

		if (res.length < 1){ return [arr]; }
		return [arr, ...split(res, rotate(s, -1))];
	}
	return [...split(a, rotate(s, -1))];
}

// spray the values of one array on the 
// places of values of another array if 
// the value is greater than 0
// 
// param {Array} -> array to spread
// param {Array} -> positions to spread to
// return {Array}
// 
function spray(values=[0], beats=[0]){
	values = toArray(values);
	beats = toArray(beats);

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

// Alternate through 2 or multiple lists consecutively
// Gives a similar result as lace except the output
// length is the lowest common denominator of the input lists
// so that every combination of consecutive values is included
//
// @param {Array0, Array1, ..., Array-n} -> arrays to interleave
// @return {Array} -> array of results 1 dimension less
//
function step(...arrs){
	if (!arrs.length){ return [ 0 ] }
	return flat(arrayCombinations(...arrs), 1);
}
exports.step = step;

// stretch (or shrink) an array of numbers to a specified length
// interpolating the values to fill in the gaps. 
// TO-DO: Interpolations options are: none, linear, cosine, cubic
// 
// param {Array} -> array to stretch
// param {Array} -> outputlength of array
// param {String/Int} -> interpolation function (optional, default=linear)
// 
function stretch(a=[0], len=1, mode='linear'){
	a = toArray(a);
	if (len < 2){ return a; }
	len = size(len);
	
	let arr = [];
	let l = a.length;
	for (let i=0; i<len; i++){
		// construct a lookup interpolation position for new array
		let val = i / (len - 1) * (l - 1);
		// lookup nearest neighbour left/right
		let a0 = a[Math.max(Math.trunc(val), 0)];
		let a1 = a[Math.min(Math.trunc(val)+1, l-1) % a.length];

		if (mode === 'none' || mode === null || mode === false){
			arr.push(a0);
		} else {
			// interpolate between the values according to decimal place
			arr.push(lerp(a0, a1, val % 1));
		}
	}
	return arr;
}
exports.stretch = stretch;

// placeholder for unique from Utils.js
// filter duplicate items from an array
// does not account for 2-dimensional arrays in the array
exports.unique = unique;
