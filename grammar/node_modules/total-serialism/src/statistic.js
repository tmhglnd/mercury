//=======================================================================
// statistic.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Statistical related methods and algorithms that can be helpful in
// analysis of number sequences, melodies, rhythms and more
//=======================================================================

const Mod = require('./transform');
const Util = require('./utility');

// sort an array of numbers or strings. sorts ascending
// or descending in numerical and alphabetical order
// 
// @param {Array} -> array to sort
// @param {Int} -> sort direction (positive value is ascending)
// @return {Array} -> sorted array, object includes order-indeces
// 
function sort(a=[0], d=1){
	if (!Array.isArray(a)) { return a; }
	let arr;
	if (a.map(x => typeof x).includes('string')){
		arr = a.slice().sort();
	} else {
		arr = a.slice().sort((a,b) => { return a-b; })
	}
	if (d < 0){
		return arr.reverse();
	}
	return arr;
}
exports.sort = sort;

// Return the biggest value from an array
// 
// @param {NumberArray} -> input array
// @return {Number} -> biggest value
// 
exports.maximum = Util.maximum;
exports.max = Util.maximum;

// Return the lowest value from an array
// 
// @param {NumberArray} -> input array
// @return {Number} -> lowest value
// 
exports.minimum = Util.minimum;
exports.min = Util.minimum;

// Return the average (artihmetic mean value) from an array
// The mean is a measure of central tendency
// 
// @param {NumberArray} -> input array of n-numbers
// @return {Number} -> mean
// 
function mean(a=[0]){
	if (!Array.isArray(a)) { return a; }
	let s = 0;
	for (let i in a){
		s += a[i];
	}
	return s / a.length;
}
exports.mean = mean;
exports.average = mean;

// Return the median (center value) from an array
// The median is a measure of central tendency
// If array is even number of values the median is the
// average of the two center values
// Ignores other datatypes then Number and Boolean
// 
// @param {NumberArray} -> input array of n-numbers
// @return {Number} -> median
// 
function median(a=[0]){
	if (!Array.isArray(a)) { return a; }
	let arr = a.slice();
	if (arr.map(x => typeof x).includes('string')) { 
		arr = Mod.filterType(arr, ['number', 'boolean']);
	}
	arr = arr.sort((a,b) => { return a-b; });
	let c = Math.floor(arr.length/2);

	if (!(arr.length % 2)){
		return (arr[c] + arr[c-1]) / 2;
	}
	return arr[c];
}
exports.median = median;
exports.center = median;

// Returns the mode(s) (most common value) from an array
// The mode is a measure of central tendency
// Returns an array when multi-modal system
// 
// @param {NumberArray} -> input array of n-numbers
// @return {Number/Array} -> the mode or modes
//
function mode(a=[0]){
	if (!Array.isArray(a)) { return a; }
	let arr = a.slice().sort((a,b) => { return a-b; });

	let amount = 1;
	let streak = 0;
	let modes = [];

	for (let i=1; i<arr.length; i++){
		if (arr[i-1] != arr[i]){
			amount = 0;
		}
		amount++;
		if (amount > streak){
			streak = amount;
			modes = [arr[i]];
		} else if (amount == streak){
			modes.push(arr[i]);
		}
	}
	return modes;
}
exports.mode = mode;
exports.common = mode;

// Return the difference between every consecutive value in an array
// With melodic content from a chromatic scale this can be seen as
// a list of intervals that, when followed from the same note, results
// in the same melody.
// 
// @param {Array} -> array to calculate from
// @return {Array} -> list of changes
// 
function change(a=[0, 0]){
	if (a.length < 2 || !Array.isArray(a)){
		return [0];
	}
	let len = a.length;
	let arr = [];
	for (let i=1; i<len; i++){
		arr.push(a[i] - a[i-1]);
	}
	return arr;
}
exports.change = change;
exports.difference = change;
