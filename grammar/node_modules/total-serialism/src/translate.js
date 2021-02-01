//==============================================================================
// translate.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Methods to translate between midi, note-names, intervals and more
// 
// credits:
// - Using the amazing Tonal.js package by @danigb for various functions
//==============================================================================

// require API's
const { Note } = require('@tonaljs/tonal');
// require Scale Mappings
const Scales = require('../data/scales.json');
const ToneSet = require('../data/tones.json');

const Mod = require('./transform.js');

// global settings stored in object
var notation = {
	"scale" : "chromatic",
	"root" : "c",
	"rootInt" : 0,
	"map" : Scales["chromatic"],
	"bpm" : 120,
	"measureInMs" : 2000
}

// Return a dictionary with all the notational preferences:
// scale, root, map, bpm, measureInMs
// 
// @return -> Dictionary object
// 
function getSettings(){
	return { ...notation };
}
exports.getSettings = getSettings;

// Set the tempo to use for translating between values, default = 100. 
// Also calculates the length of a 4/4 measure in milliseconds
// 
// @param {Number} -> the tempo in Beats/Minute (BPM)
// @return {Void}
// 
function setTempo(t=100){
	if (Array.isArray(t)){
		t = t[0];
	}
	notation.bpm = Math.max(1, Number(t));
	notation.measureInMs = 60000.0 / notation.bpm * 4;
}
exports.setTempo = setTempo;
exports.setBPM = setTempo;

// Get the current used tempo
// 
// @return -> tempo in Beats/Minute (BPM)
// 
function getTempo(){
	return getSettings().bpm;
}
exports.getTempo = getTempo;
exports.getBPM = getTempo;

// Set the scale to use for mapping integer sequences to
// 
// @param {String} -> scale name
// @param {Int/String} -> root of the scale (optional, default=c)
// @return {Void}
// 
function setScale(s="chromatic", r){
	if (Scales[s]){
		notation.scale = s;
		if (r !== undefined) { setRoot(r); }
		notation.map = Scales[s];
	}
}
exports.setScale = setScale;

// returns the scale and root as object
// 
// @return {Object} -> the scale, root and rootInt
// @return {Void}
// 
function getScale(){
	return { 
		"scale" : getSettings().scale, 
		"root" : getSettings().root,
		"rootInt" : getSettings().rootInt };
}
exports.getScale = getScale;

// Set the root of a scale to use for mapping integer sequences
// 
// @param {Int/String} -> root of the scale (optional, default=c)
// @return {Void}
// 
function setRoot(r='c'){
	if (!isNaN(Number(r))){
		notation.rootInt = Math.floor(r);
		notation.root = Note.pitchClass(Note.fromMidi(notation.rootInt));
	} else if (r in ToneSet){
		notation.rootInt = ToneSet[r];
		notation.root = r;
	} else {
		console.log('not a valid root');
	}
}
exports.setRoot = setRoot;

// returns the root of the scale as String and integer
// 
// @return {Object} -> the scale and root
// @return {Void}
// 
function getRoot(){
	return { "root" : getSettings().root, "rootInt" : getSettings().rootInt };
}
exports.getRoot = getRoot;

/* WORK IN PROGRESS
// set a custom mapping for a non existing scale
// 
// @params {Array} -> array of length 12 containing semitones
// @return {Void}
// 
function setMapping(a){
	if (!Array.isArray(a) || a.length < 12){
		console.error("not an array or not long enough");
		a = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
	}
	notation.map = a.slice(0, 12);
	// a = (a !== undefined)? a : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
}
exports.setMapping = setMapping;*/

// returns an array of all available scale names
// 
// @return {Array} -> scale names
// 
function scaleNames(){
	return Object.keys(Scales);
}
exports.scaleNames = scaleNames;

/* WORK IN PROGRESS
// search scales based on an array of intervals
// 
// @param {Array|String} -> array of intervals
// @return {Object} -> possible scales
// 
function searchScales(iv){
	iv = (Array.isArray(iv))? iv : [iv];

	let names = scaleNames();
	let scales = names.map(x => Scl.intervals(x));
	let arr = [];
	for (let n in names){
		let includes = 0;
		for (let i in iv){
			includes += scales[n].includes(iv[i]);
		}
		if (includes == iv.length){
			arr.push({ "scale" : names[n], "intervals" : scales[n]});
		}
	}
	console.log(arr);
}
exports.searchScales = searchScales;*/

// Convert a midi value to a note name (60 => C4)
// 
// @param {Number/Array} -> midi values to convert
// @return {String/Array} -> note name
// 
function midiToNote(a=48){
	if (!Array.isArray(a)){
		return Note.fromMidi(a);
	}
	return a.map(x => Note.fromMidi(x));
}
exports.midiToNote = midiToNote;
exports.mton = midiToNote;

// Convert a midi value to a frequency (60 => 261.63 Hz)
// With default equal temperament tuning A4 = 440 Hz
// 
// @param {Number/Array} -> midi values to convert
// @return {Number/Array} -> frequency in Hz
// 
function midiToFreq(a=48){
	if (!Array.isArray(a)){
		return Note.freq(Note.fromMidi(a));
	}
	return a.map(x => Note.freq(Note.fromMidi(x)));
}
exports.midiToFreq = midiToFreq;
exports.mtof = midiToFreq;

// Convert a pitch name to a midi value (C4 => 60)
// 
// @param {String/Array} -> pitch name to convert
// @return {Number/Array} -> midi value
// 
function noteToMidi(a='c4'){
	if (!Array.isArray(a)){
		return Note.midi(a);
	}
	return a.map(x => Note.midi(x));
}
exports.noteToMidi = noteToMidi;
exports.ntom = noteToMidi;

// Convert a pitch name to a frequency (C4 => 261.63 Hz)
// With default equal temperament tuning A4 = 440 Hz
// 
// @param {String/Array} -> pitch name to convert
// @return {Number/Array} -> frequency in Hz
// 
function noteToFreq(a='c4'){
	if (!Array.isArray(a)){
		return Note.freq(a);
	}
	return a.map(x => Note.freq(x));
}
exports.noteToFreq = noteToFreq;
exports.ntof = noteToFreq;

// Convert a list of relative semitone intervals to midi
// provide octave offset
// 
// @param {Number/Array} -> relative
// @param {Number/String} -> octave (optional, default=4)
// @return {Number/Array}
// 
function relativeToMidi(a=0, o=4){
	o = (typeof o === 'string')? Note.midi(o) : o * 12;
	if (!Array.isArray(a)){
		return a + o;
	}
	return a.map(x => x + o);
}
exports.relativeToMidi = relativeToMidi;
exports.rtom = relativeToMidi;

// Convert a list of semitone intervals to frequency
// provide octave offset
// 
// @param {Number/Array} -> semitones
// @param {Number} -> octave (optional, default=4)
// @return {Number/Array}
// 
function relativeToFreq(a=0, o=4){
	o = (typeof o === 'string')? Note.midi(o) : o * 12;
	if (!Array.isArray(a)){
		console.log(Note.freq(Note.fromMidi(a + o)));
		return Note.freq(a + o);
	}
	return a.map(x => Note.freq(Note.fromMidi(x + o)));
}
exports.relativeToFreq = relativeToFreq;
exports.rtof = relativeToFreq;

// Map a list of relative semitone values to the selected
// scale set with setScale(). Preserves detuning when a 
// midi floating point value is used
// 
// @params {Array/Number} -> Array of relative semitones
// @return {Array/Number} -> mapped to scale
// 
function mapToScale(a=[0]){
	if (!Array.isArray(a)) return mapScale(a);
	return a.map(x => mapScale(x));
}
exports.mapToScale = mapToScale;
exports.toScale = mapToScale;

function mapScale(a){
	let d = a - Math.floor(a);
	let s = Math.floor(((a % 12) + 12) % 12);
	let o = Math.floor(a / 12);
	return notation.map[s] + o * 12 + d;
}

// Map an array of reletive semitone intervals to scale and 
// output in specified octave as midi value
// 
// @param {Array/Int} -> 
// @param {Int/String} -> octave 
// @return {Array/Int} -> mapped midi values
// 
function mapToMidi(a=[0], o=4){
	o = (typeof o === 'string')? Note.midi(o) : o * 12 + notation.rootInt;
	if (!Array.isArray(a)) return a + o;
	return a.map(x => mapScale(x) + o);
}
exports.mapToMidi = mapToMidi;
exports.toMidi = mapToMidi;

/* WORK IN PROGRESS
// Convert a midi value to semitone intervals
// provide octave offset
// 
// @param {Number/Array} -> semitones
// @param {Number} -> octave (optional, default=4)
// @return {Number/Array}
// 
function midiToSemi(a=0, o=4){
	if (!Array.isArray(a)){
		return a - o * 12;
	}
	return a.map(x => x - o * 12);
}
exports.midiToSemi = midiToSemi;
exports.mtos = midiToSemi;
*/

// Convert a beat division value to milliseconds based on the global BPM
// eg. ['1/4', 1/8', '1/16'] => [500, 250, 125] @ BPM = 120
// 
// @param {Number/String/Array} -> beat division or ratio array
// @param {Number} -> set the BPM (optional, default=globalBPM)
// @return {Number/Array}
//
function divisionToMs(a=['1'], bpm){
	let measureMs = notation.measureInMs;
	if (bpm !== undefined) {
		measureMs = 60000.0 / Math.max(1, Number(bpm)) * 4;
	}
	let v = (!Array.isArray(a))? [a] : a; 
	return v.map(x => {
		// match all division symbols: eg. 1/4, 5/16
		let d = /^\d+(\/\d+)?$/;
		x = (typeof x === 'string' && d.test(x))? eval(x) : x;
		return x * measureMs;
	});
}
exports.divisionToMs = divisionToMs;
exports.dtoms = divisionToMs;

// Convert a beat ratio value to milliseconds based on the BPM
// eg. [0.25, 0.125, 0.0625] => [500, 250, 125] @ BPM = 120
// 
// @param {Number/String/Array} -> beat ratio array
// @return {Number/Array}
//
function divisionToRatio(a=['1']){
	let v = (!Array.isArray(a))? [a] : a; 
	return v.map(x => {
		// match all division symbols: eg. 1/4, 5/16
		let d = /^\d+(\/\d+)?$/;
		return (typeof x === 'string' && d.test(x))? eval(x) : x;
	});
}
exports.divisionToRatio = divisionToRatio;
exports.dtor = divisionToRatio;

// Convert a frequency ratio string to a corresponding cents value
// eq. ['2/1', '3/2'] => [1200, 701.95]
// 
// @param {Number/String/Array} -> ratios to convert
// @return {Number/Array} -> cents output
// 
function ratioToCent(ratio=['1/1']){
	let reg = /^[0-9]+(\/[0-9]+)?$/;
	let a = (!Array.isArray(ratio))? [ratio] : ratio;

	a = a.map(x => {
		if (typeof x === 'string' && reg.test(x)){
			x = eval(x);
		}
		return Math.log(x)/Math.log(2)*1200.0;
	});
	return (!Array.isArray(ratio))? a[0] : a;
}
exports.ratioToCent = ratioToCent;
exports.rtoc = ratioToCent;

//=======================================================================
// Scala class
// 
// Import a .scl file and convert to a JSON object. Use methods to 
// translate numbers into frequencies according to the settings of
// tune, center and the scala cents
//=======================================================================

// const fs = require('fs');
// const path = require('path');

// const TL = require('./translate.js');
// scala database from json
// const db = require('../data/scldb-min.json');

class Scala {
	constructor() {
		// the converted file to dictionary
		this.scl = {
			'description' : 'Divide an octave into 12 equal steps',
			'size' : 1,
			'tune' : 440,
			'center' :  69,
			'range' : 1200,
			'cents' : [ 0, 100, 200, 300, 400, 500, 
						600, 700, 800, 900, 1000, 1100 ]
		};
	}

	// get the current loaded scala data
	// 
	// @return {Object} -> Object with the loaded scala data
	// 
	get data(){
		return { ...this.scl };
	}

	// get the filenames from the database
	// 
	// @return {Array} -> array with all scala filenames
	// 
	get names(){
		const db = require('../data/scldb.json');
		return Object.keys(db);
	}

	// set the tuning in Hz for the center value
	// 
	// @param {Number} -> tuning in Hz
	// @return {Void}
	// 
	tune(v){
		if (isNaN(Number(v))){
			error(v + ' is not a number \n');
		} else {
			this.scl['tune'] = v;
		}
	}
	
	// set the center value corresponding with cent 0 and tuning frequency
	// 
	// @param {Int} -> center value as integer
	// @return {Void}
	// 
	center(v){
		if (isNaN(Number(v))){
			error(v + ' is not a number \n');
		} else {
			this.scl['center'] = v;
		}
	}

	// return the frequency from the scala corresponding to the input number
	// 
	// @params {Number/Array} -> Number to convert
	// @return {Number} -> Converted frequency
	// 
	scalaToFreq(a=48){
		let isArr = !Array.isArray(a);
		let arr = (isArr)? [a] : a;

		arr = arr.map((x) => {
			let s = this.scl.size;
			let n = x - this.scl.center;
			let o = Math.floor(n / s) * this.scl.range;
			let c = this.scl.cents[((n % s) + s) % s];

			return Math.pow(2, (c + o) / 1200) * this.scl.tune;
		});
		return (isArr)? arr[0] : arr;
	}

	// shorthand for scalaToFreq()
	stof(a=48){
		return this.scalaToFreq(a);
	}

	// search the scala scale database with filter options
	// 
	// @params {Object} -> filter options in the format:
	// 					{ size: <Number/Array>, range: <Number>, 
	// 					  cents: <String/Array>, description: <String/Array> }
	// @return {Object -> All scala files matching the filter
	// 
	search(f){
		const db = require('../data/scldb.json');

		f = (typeof f !== 'undefined') ? f : {};
		f.size = (typeof f.size !== 'undefined') ? f.size : null;
		f.cents = (typeof f.cents !== 'undefined') ? f.cents : null;
		f.description = (typeof f.description !== 'undefined') ? f.description : null;
		f.decimals = (typeof f.decimals !== 'undefined') ? f.decimals : 3;

		// console.log('search', f);
		
		let result = { ...db };
		Object.keys(f).forEach((k) => {
			let tmpRes = {};
			// only search the key if filter is added
			if (f[k] !== null){
				// allow arrays for multiple searches
				let s = (!Array.isArray(f[k]))? [f[k]] : f[k];
				// serach size with number match
				if (k === 'size'){
					Object.keys(result).forEach((scl) => {
						s.forEach((v) => {
							if (result[scl][k] === Number(v)){
								tmpRes[scl] = result[scl];
							}
						});
					});
					result = tmpRes;
				}
				// search description with regular expression
				if (k === 'description'){
					Object.keys(result).forEach((scl) => {
						s.forEach((v) => {
							if (result[scl][k].match(String(v), 'i')){
								tmpRes[scl] = result[scl];
							}
						});
					});
					result = tmpRes;
				}
				// search cents for number or ratio
				if (k === 'cents'){
					Object.keys(result).forEach((scl) => {
						let match = 0;

						// temporary cents array
						let tmpCents = result[scl][k];
						// append the octave ratio (or range)
						tmpCents.push(result[scl]['range']);
						// filter duplicates
						tmpCents = Mod.unique(tmpCents).map(x => x.toFixed(f.decimals));

						for (let i in s){
							// for all entered cent/ratio values
							let cent = (typeof s[i] === 'string')? ratioToCent(s[i]) : s[i];
							// if equals cent from array increment match
							for (let c=0; c<tmpCents.length; c++){
								if (tmpCents[c] === cent.toFixed(f.decimals)){
									match += 1;
								}
							}
						}
						// result if matches equals amount of searches
						if (match === s.length) {
							tmpRes[scl] = result[scl];
						}
					});
					result = tmpRes;
				}
			}
		});
		return result;
	}

	// read and parse a filestring (best imported with fs.readFileSync for 
	// local usage or fetch() in the browser) to use in the scale
	// 
	// @params {String} -> text as string loaded from .scl file
	// @return {Void}
	// 
	parse(f){
		// read the file text in variable
		// let file = fs.readFileSync(f, 'utf8');
		// this.scl.name = path.parse(f).name;

		// remove linebreaks and split into array of lines
		let file = f.replace(/(\r\n|\n\r|\r|\n)/g, '\n').split('\n');
		// empty cents array in dictionary
		this.scl.cents = [ 0 ];
		// init line number and note count
		let l = 0, n = 0;
		// iterate through lines
		for (var i=0; i<file.length; i++){
			let line = file[i];
	
			if (line.match(/^!(.+)?/)) {
				// ignore if comment
			} else {
				// console.log(line, l);
				if (l === 0){
					// first non-comment line is description
					this.scl['description'] = line;
				} else if (l === 1){
					// second non-comment line is number of notes in scale
					this.scl['size'] = Number(line);
				} else {
					// remove leading, trailing and multiple whitespace
					// split line in array
					line = line.trim().replace(/\s+/g, ' ').split(' ');
	
					if (n < this.scl.size){
						// if line is not a number then it's a ratio
						if (isNaN(Number(line[0]))) {
							line = ratioToCent(line[0]);
						} else {
							// if line is negative then make absolute
							line = (Number(line[0]) < 0)? Math.abs(Number(line[0])) : Number(line[0]);
						}
						// push notes to object and increment notecount
						this.scl.cents.push(line);
						n++;
					}
				}
				// increment linecount
				l++;
			}
		}
		// sort the cent values
		this.scl['cents'] = this.scl.cents.sort((a, b) => {return a-b});
		// last value is width of "octave" (usually an octave of 1200)
		this.scl['range'] = this.scl.cents.pop();
	}

	// return an object with frequencies derived from the loaded scala
	// mapped to a specific range of values
	// 
	// @params {Int} -> high value for output range (optional, default=127)
	// @params {Int} -> low value for output range (optional, default=0)
	// @return {Object} -> Object with all values and corresponding frequency
	// 
	chart(hi=127, lo=0){
		// swap lo and hi range if hi is smaller than lo
		if (hi < lo){ var t=hi, hi=lo, lo=t; }
		let range = hi - lo;
		// empty object for frequencies
		let chart = {};
		// calculate frequencies for values 0 to 127
		for (var i=0; i<range+1; i++){
			chart[i + lo] = this.scalaToFreq(i + lo);
		}
		return chart;
	}
}
exports.Scala = Scala;
