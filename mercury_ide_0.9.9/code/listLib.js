//==============================================================================
// listLib.js
// 
// a library of algorithmic composition functions
// generative list functions, transformational list functions
//==============================================================================

autowatch = 1;
inlets = 2;
outlets = 2;

setinletassist(0, "(list/message) input list, evaluate function");
setinletassist(1, "(list) input list");
setoutletassist(0, "(list) output of evaluated function");
setoutletassist(1, "(message) errors");


var errorMessage;
var list1 = []; //input a list on the left inlet
var list2 = []; //input a list on the right inlet

// Input lists in inlets
// set arguments in a left to right order
// 
function list(){
	if (inlet == 1){
		list2 = arrayfromargs(arguments);
	}
	if (inlet == 0){
		list1 = arrayfromargs(arguments);
	}
}//list()

// Function handlers for spread functions
//
function spread(){
	var args = arrayfromargs(arguments);
	var arr = _spread(args);
	arr = arr.map(function(e){ return Math.round(e); });
	outlet(0, arr);
}//spread()

function spreadFloat(){
	var args = arrayfromargs(arguments);
	var arr = _spread(args);
	outlet(0, arr);
}//spreadFloat()

function spreadInclusive(){
	var args = arrayfromargs(arguments);
	var arr = _spreadinclusive(args);
	arr = arr.map(function(e){ return Math.round(e); });
	outlet(0, arr);
}//spreadinclusive()

function spreadInclusiveFloat(){
	var args = arrayfromargs(arguments);
	var arr = _spreadinclusive(args);
	outlet(0, arr);
}//spreadinclusiveFloat()

// Generate a list of n-length starting at one value
// up till (excluding) the 3th argument. 
// Evenly spaced values in between
//
function _spread(args){
	// var args = arrayfromargs(arguments);
	var len = args[0];
	var lo = 0.;
	var range = 0.;

	if (args.length > 3){
		errorMessage = "spread(): more then 3 arguments given. Arguments <listlength, lo, hi>";
		outlet(1, errorMessage);
	}

	switch(args.length){
		case 1:
			range = args[0];
			lo = 0;
			break;
		case 2:
			range = args[1];
			lo = 0;
			break;
		case 3:
			lo = args[1];
			range = args[2] - lo;
			break;
	}

	var listOut = [];
	for (var i = 0; i < len; i++){
		listOut[i] = (i / len) * range + lo;
	}
	return listOut;
}//spread()

// Generate a list of n-length starting at one value
// ending at the 3th argument. Evenly spaced values in between
// 
function _spreadinclusive(args){
	// var args = arrayfromargs(arguments);
	var len = args[0];
	var lo = 0.;
	var range = 0.;

	if (args.length > 3){
		errorMessage = "spread(): more then 3 arguments given. Arguments <listlength, lo, hi>";
		outlet(1, errorMessage);
	}

	switch(args.length){
		case 1:
			range = args[0];
			lo = 0;
			break;
		case 2:
			range = args[1];
			lo = 0;
			break;
		case 3:
			lo = args[1];
			range = args[2] - lo;
			break;
	}

	var listOut = [];
	for (var i = 0; i < len; i++){
		listOut[i] = (i / (len-1)) * range + lo;
	}
	return listOut;
}//spreadinclusive()

// add all values of two lists on the same index
// 
function merge(){
	var listOut = [];
	var len1 = list1.length;
	var len2 = list2.length;

	if (len1 < 1 || len2 < 1){
		errorMessage = "merge(): one of the input-lists has a size of 0."
		outlet(1, errorMessage);
	}

	var largest = Math.max(len1, len2);
	if (len1 < len2){
		var temp = list2;
		list2 = list1;
		list1 = temp;
	}
	for (var i = 0; i < Math.abs(len1-len2); i++){
		// list2.push(0);
		list2.push(list2[i % list2.length]);
	}
	for (var i = 0; i < largest; i++){
		listOut[i] = list1[i] + list2[i];
	}
	outlet(0, listOut);
}//merge()

var pattern, counts, remainders;

// A euclidean rhythm generator. Generates values of 0 and 1
// Distributed based on the common denominator after division
// 
function euclid(){
	var args = arrayfromargs(arguments);

	var steps = Math.max(1, Math.floor(args[0]));
	var beats = Math.min(steps, Math.max(1, Math.floor(args[1])));
	var rotate = Math.floor(args[2]);

	if (args.length > 3){
		errorMessage = "euclid(): more then 3 arguments given. Arguments <length, beats, rotate>";
		outlet(1, errorMessage);
	}

	pattern = [];
	counts = [];
	remainders = [];
	var level = 0;
	var divisor = steps - beats;

	remainders.push(beats);

	while (remainders[level] > 1){
		counts.push(Math.floor(divisor / remainders[level]));
        remainders.push(divisor % remainders[level]);

		divisor = remainders[level];
        level++;
	}

    counts.push(divisor);
    build(level);

	// var offset = pattern.indexOf(1);
	var offset = getIndex(1, pattern);
	var outList = [];

	for (var i = 0; i < steps; i++){
		outList[i] = pattern[mod((i + offset - rotate), steps)]
	}
	outlet(0, outList);
}//euclid()

function build(l){
	var level = l;

	if (level == -1){
			pattern.push(0);
	} else if (level == -2){
			pattern.push(1);
	} else {
		for (var i = 0; i < counts[level]; i++){
			build(level-1);
		}
		if (remainders[level] != 0){
			build(level-2);
		}
	}
}//build()

// Return the remainder after division
// Works also in the negative direction
// 
function mod(value, mod){
   return ((value % mod) + mod) % mod;
}//mod()

// Constrain a value between 2 numbers
// 
function constrain(value, min, max){
	return Math.min(max, Math.max(min, value));
}//constrain()

// Return the index of a value from a list
// 
function getIndex(v, arr){
	for (var i = 0; i < arr.length; i++){
		if (arr[i] == v){
			return i;
		}
	}
}//getIndex()

// Decode an 2-dimensional array received as 
// 1-dimensional message
// 
function decodeArray(str){
	str = (str+" ").split("").reverse();
	decodeArr = decodeRecursive(str);
	outlet(0, "done");
}//decodeArray()

var decodeArr = [];
// Recursive function for decoding array to 
// 2-dimensional array in javascript
// 
function decodeRecursive(str){
	var arr = [];
	var tok = "";
	var char;
	var i = 0;

	while (str.length > 0){
		char = str.pop();
		if (char == " " && tok != ""){
			arr[i] = tok;
			tok = "";
			i++;
		}
		else if (char == "[") {
			arr[i] = decodeRecursive(str);
			i++;
		}
		else if (char == "]") {
			arr[i] = tok;
			break;
		}
		else {
			tok += char;
		}
	}
	return arr;
}//decode_recursive()

function lookup(i){
	outlet(0, decodeArr[i]);
}//lookup()

function length(){
	outlet(1, decodeArr.length);
}//length()

//==============================================================================
// listLib.js
// 
// Copyright (C) 2019 Timo Hoogland
// License GNU Lesser General Public License
//==============================================================================
