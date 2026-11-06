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

const { maximum, minimum, flatten, toArray, lcm, gcd } = require('./utility');

// sort an array of numbers or strings. sorts ascending
// or descending in numerical and alphabetical order
// 
// @param {Array} -> array to sort
// @param {Int} -> sort direction (positive value is ascending)
// @return {Array} -> sorted array, object includes order-indeces
// 
function sort(a=[0], d=1){
	a = toArray(a);
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
exports.maximum = maximum;
exports.max = maximum;

// Return the lowest value from an array
// 
// @param {NumberArray} -> input array
// @return {Number} -> lowest value
// 
exports.minimum = minimum;
exports.min = minimum;

// Return the average (artihmetic mean value) from an array
// The mean is a measure of central tendency
// 
// @param {NumberArray} -> input array of n-numbers
// @param {Bool} -> enable/disable the deep flag for n-dim arrays (default=true)
// @return {Number} -> mean
// 
function mean(a=[0], d=true){
	if (!Array.isArray(a)) { return a; }
	if (d) { a = flatten(a); }

	let s = 0;
	for (let i in a){
		s += isNaN(a[i])? 0 : a[i];
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
// @param {Bool} -> enable/disable the deep flag for n-dim arrays (default=true)
// @return {Number} -> median
// 
function median(a=[0], d=true){
	if (!Array.isArray(a)) { return a; }
	if (d) { a = flatten(a); }

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
// @param {Bool} -> enable/disable the deep flag for n-dim arrays (default=true)
// @return {Number/Array} -> the mode or modes
//
function mode(a=[0], d=true){
	if (!Array.isArray(a)) { return a; }
	if (d) { a = flatten(a); }
	
	// get all the unique occurances and the amount of times they occur
	let occurances = {};
	a.forEach((o) => {
		if (!occurances[o]){
			occurances[o] = 0;
		}
		occurances[o]++;
	});
	// for all the items save the best streak (or streaks)
	let modes = [];
	let streak = 0;
	Object.keys(occurances).forEach((o) => {
		if (occurances[o] > streak){
			streak = occurances[o];
			modes = [o];
		} else if (occurances[o] === streak){
			modes.push(o);
		}
	});
	// remap strings to numbers if possible
	return modes.map(m => isNaN(m) ? m : Number(m));
}
exports.mode = mode;
exports.common = mode;

// Compare two arrays recursively and if all values
// of the array and subarrays are equal to eachother
// return a true boolean
// 
// @params {Array} -> compare array1
// @params {Array} -> compare array2
// @return {Bool} -> true or false
// 
function compare(a1=[0], a2){
	a1 = toArray(a1);
	a2 = toArray(a2);
	if (a1.length !== a2.length){
		return false;
	}
	for (let i in a1){
		if (Array.isArray(a1[i])){
			return compare(a1[i], a2[i]);
		} else if (a1[i] !== a2[i]){
			return false;
		}
	}
	return true;
}
exports.compare = compare;
// exports.equal = compare; (deprecated for equal in utility operator)

// Return the difference between every consecutive value in an array
// With melodic content from a chromatic scale this can be seen as
// a list of intervals that, when followed from the same note, results
// in the same melody.
// 
// @param {Array} -> array to calculate from
// @param {Bool} -> returns diff between first and last (optional, default=false)
// @return {Array} -> list of changes
// 
function change(a=[0, 0], l=false){
	if (a.length < 2 || !Array.isArray(a)){
		return [0];
	}
	let len = a.length;
	let arr = [];
	for (let i=1; i<len; i++){
		arr.push(a[i] - a[i-1]);
	}
	// optionally also return diff from first and last value
	if (l){ arr.push(a[0] - a[a.length-1]); }
	return arr;
}
exports.change = change;
exports.delta = change;
exports.difference = change;
exports.diff = change;

// Calculate the Greatest Common Divisor from an array
// The function uses the algorithm described in _gcd() above
// 
// @param {Array} -> array to calculate on
// @return {Int} -> greatest common divisor
// 
exports.greatestCommonDivisor = gcd;
exports.gcd = gcd;

// Calculate the Least Common Multiple from an array
// the function uses the algorithm described in _lcd() above
//
// @param {Array} -> array to calculate on
// @return {Int} -> least common multiple
// 
exports.leastCommonMultiple = lcm;
exports.lcm = lcm;
