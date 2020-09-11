//=======================================================================
// statistic.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Statistical related methods and algorithms that can be helpful in
// analysis of number sequences, melodies, rhythms and more
// 
//=======================================================================

const Mod = require('./transform');

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