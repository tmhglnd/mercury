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
const { Note, Scale } = require('@tonaljs/tonal');
const { Chord } = require('@tonaljs/tonal');
const { Progression } = require('@tonaljs/tonal');

// require Scale Mappings
// const Scales = require('../data/scales.json');
const ToneSet = require('../data/tones.json');
const chromaSet = { c:0, d:2, e:4, f:5, g:7, a:9, b:11 };

const { unique } = require('./transform');
const { add, wrap, multiply, toArray } = require('./utility');

// create a mapping list of scales for 12-TET from Tonal
let Scales = {};

Scale.names().forEach((s) => {
	let scl = Scale.get(s);
	let name = scl.name.replace(/\s+/g, '_').replace(/[#'-]+/g, '');
	let chroma = scl.chroma.split('').map(x => Number(x));

	// rename aeolian to minor
	name = (name === 'aeolian')? 'minor' : name;

	let map = [];
	for (let i=0; i<chroma.length; i++){
		if (!chroma[i]){
			map.push(map[map.length-1]);
			continue;
		}
		map.push(i);
	}
	Scales[name] = map;
});

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
// @return {Number} -> the tempo in Beats/Minute (BPM)
// 
function setTempo(t=100){
	if (Array.isArray(t)){
		t = t[0];
	}
	notation.bpm = Math.max(1, Number(t));
	notation.measureInMs = 60000.0 / notation.bpm * 4;
	return getTempo();
}
exports.setTempo = setTempo;
exports.setBPM = setTempo;

// Get the current used tempo
// 
// @return {Number} -> tempo in Beats/Minute (BPM)
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
// @return {Object} -> the scale, root and rootInt
// 
function setScale(s="chromatic", r){
	if (Scales[s]){
		notation.scale = s;
		if (r !== undefined) { setRoot(r); }
		notation.map = Scales[s];
	}
	return getScale();
}
exports.setScale = setScale;

// returns the scale and root as object
// 
// @return {Object} -> the scale, root and rootInt
// 
function getScale(){
	return { 
		"scale" : getSettings().scale, 
		"root" : getSettings().root,
		"rootInt" : getSettings().rootInt,
		"mapping" : getSettings().map
	};
}
exports.getScale = getScale;

// Set the root of a scale to use for mapping integer sequences
// 
// @param {Int/String} -> root of the scale (optional, default=c)
// @return {Object} -> the scale, root and rootInt
// 
function setRoot(r='c'){
	if (!isNaN(Number(r))){
		notation.rootInt = Math.floor(r);
		notation.root = Note.pitchClass(Note.fromMidi(notation.rootInt));
	} 
	// else if (r in ToneSet){
	// 	notation.rootInt = chromaToRelative(r);
	// 	// notation.rootInt = ToneSet[r];
	// 	notation.root = r;
	// } else {
	// 	console.log('not a valid root');
	// }
	else {
		notation.rootInt = chromaToRelative(r);
		// notation.rootInt = ToneSet[r];
		notation.root = r;
	}
	return getScale();
}
exports.setRoot = setRoot;

// returns the root of the scale as String and integer
// 
// @return {Object} -> the scale and root
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
	return Object.keys(Scales).sort();
}
exports.scaleNames = scaleNames;
exports.getScales = scaleNames;

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
function midiToNote(a=60){
	if (!Array.isArray(a)){
		return Note.fromMidi(a).toLowerCase();
	}
	return a.map(x => midiToNote(x));
}
exports.midiToNote = midiToNote;
exports.mton = midiToNote;

// Convert a midi value to a frequency (60 => 261.63 Hz)
// With default equal temperament tuning A4 = 440 Hz
// Adjust the tuning with optional second argument
// Adjust the amount of notes per octave (12-TET, 5-TET) with third argument
// Adjust the center c4 midi value with optional fourth argument
// 
// @param {Number/Array} -> midi values to convert
// @param {Number} -> tuning
// @param {Number} -> octave division
// @return {Number/Array} -> frequency in Hz
// 
function midiToFreq(a=48, t=440, n=12, c=69){
	if (!Array.isArray(a)){
		return Math.pow(2, (a - c) / n) * t;
	}
	return a.map(x => midiToFreq(x, t, n, c));
}
exports.midiToFreq = midiToFreq;
exports.mtof = midiToFreq;

// Convert a frequency to closest midi note (261.62 Hz => 60)
// With default equal temperament tuning A4 = 440 Hz
// Set the detune flag to return te exact floating point midi value
// 
// @param {Number/Array} -> frequency value
// @param {Number/Array} -> detune precision value (default=false)
// @return {Number/Array} -> midi note
// 
function freqToMidi(a=261, d=false){
	if (!Array.isArray(a)){
		let f = Math.log(a / 440) / Math.log(2) * 12 + 69;
		if (!d) {
			return Math.round(f);
		}
		return f;
	}
	return a.map(x => freqToMidi(x, d));
}
exports.freqToMidi = freqToMidi;
exports.ftom = freqToMidi;

// Convert a frequency to closest note name (261.62 Hz => 'c4')
// With default equal temperament tuning A4 = 440 Hz
// 
// @param {Number/Array} -> frequency value
// @return {Number/Array} -> midi note
// 
function freqToNote(a=261){
	return midiToNote(freqToMidi(a));
}
exports.freqToNote = freqToNote;
exports.fton = freqToNote;

// Convert a pitch name to a midi value (C4 => 60)
// 
// @param {String/Array} -> pitch name to convert
// @return {Number/Array} -> midi value
// 
function noteToMidi(a='c4'){
	if (!Array.isArray(a)){
		return Note.midi(a);
	}
	return a.map(x => noteToMidi(x));
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
	return a.map(x => noteToFreq(x));
}
exports.noteToFreq = noteToFreq;
exports.ntof = noteToFreq;

// Convert a chromagram pitch class to a relative note number
// 
// @param {String/Array} -> pitchclass names to convert
// @return {Number/Array} -> midi note number
// 
function chromaToRelative(c='c'){
	if (!Array.isArray(c)){
		let m = c.toLowerCase().match(/^[a-g]/);
		let v = 0;
		if (m){
			v = chromaSet[m[0]];
		} else {
			console.log(`ctor(): '${c}' is not a valid chroma value`);
			return 0;
		}
		let a = c.split('').slice(1);
		a.forEach((a) => {
			switch(a) {
				case '#': v += 1; break;
				case 'b': v -= 1; break;
				case 'x': v += 2; break;
				case '-': v -= 12; break;
				case '+': v += 12; break;
			}
		});
		return v;
	}
	return c.map(x => chromaToRelative(x));
}
exports.chromaToRelative = chromaToRelative;
exports.ctor = chromaToRelative;

// Convert a list of relative semitone intervals to midi
// provide octave offset with second argument. Octave offset
// follows midi octave convention where 3 is 48, 4 is 60 etc.
// 
// @param {Number/Array} -> relative
// @param {Number/String} -> octave (optional, default=4)
// @return {Number/Array}
// 
function relativeToMidi(a=0, o=4){
	if (!Array.isArray(a)){
		o = (typeof o === 'string')? Note.midi(o) : (o + 1) * 12;
		return a + o;
	}
	return a.map(x => relativeToMidi(x, o));
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
	return midiToFreq(relativeToMidi(a, o));
}
exports.relativeToFreq = relativeToFreq;
exports.rtof = relativeToFreq;

// Map a list of relative semitone values to the selected
// scale set with setScale(). Preserves detuning when a 
// midi floating point value is used.
// Also offsets the values with the root note selected
// 
// @params {Array/Number} -> Array of relative semitones
// @return {Array/Number} -> mapped to scale
// 
function mapToScale(a=[0]){
	if (!Array.isArray(a)) {
		// detuning float
		let d = a - Math.floor(a);
		// selected semitone
		let s = Math.floor(((a % 12) + 12) % 12);
		// octave offset
		let o = Math.floor(a / 12) * 12;
		return notation.map[s] + o + d + notation.rootInt;
	}
	return a.map(x => mapToScale(x));
}
exports.mapToScale = mapToScale;
exports.toScale = mapToScale;

// Map an array of relative semitone intervals to scale and 
// output in specified octave as midi value
// 
// @param {Array/Int} -> semitone intervals
// @param {Int/String} -> octave range
// @return {Array/Int} -> mapped midi values
// 
function mapToMidi(a=[0], o=4){
	return add(relativeToMidi(mapToScale(a), o), notation.rootInt);
}
exports.mapToMidi = mapToMidi;
exports.toMidi = mapToMidi;

// Map an array of relative semitone intervals to scale and 
// output in frequency value
// 
// @param {Array/Int} -> semitone intervals
// @param {Int/String} -> octave range
// @return {Array/Int} -> mapped midi values
//
function mapToFreq(a=[0], o=4){
	// return mapToMidi(a, o);
	return midiToFreq(mapToMidi(a, o));
}
exports.mapToFreq = mapToFreq;
exports.toFreq = mapToFreq;

// Convert a frequency ratio string to a corresponding cents value
// eq. ['2/1', '3/2'] => [1200, 701.95]
// 
// @param {Number/String/Array} -> ratios to convert
// @return {Number/Array} -> cents output
// 
function ratioToCent(a=['1/1']){
	a = toArray(a);
	return a.map(x => {
		if (Array.isArray(x)){
			return ratioToCent(x);
		}
		return Math.log(divRatio(x)) / Math.log(2) * 1200;
	});
}
exports.ratioToCent = ratioToCent;
exports.rtoc = ratioToCent;

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

// Use a list of roman numerals to translate a chord progression
// The function returns a 2d-array of chords, where every chord is
// a separate array within the larger array. The chords are returned
// as semitones from 0-12. Optionally with a second argument you can 
// offset the chords based on a note name or midi value
// eg. IIm with 'D' becomes [E, G, B] becomes => [4, 7, 11]
// Valid chord numerals: I, II, III, ..., VII
// Valid additions: m, M, 7, 9, sus2, sus4, maj7, m7, maj9, m9
// 
// @param - {Array/String} -> roman numerals to convert to chords
// @param - {String/Number} -> root for chord progression
// @return - {2d-Array} -> array of chords
//
function chordsFromNumerals(a=['i'], n='c'){
	// make array if not array and flatten
	a = Array.isArray(a)? a.flat(Infinity) : [a];
	// check if n is notename
	n = isNaN(n)? n : midiToNote(wrap(n));
	// generate progression of chord names
	let p = Progression.fromRomanNumerals(n, a);
	// translate chordnames to semitones
	return chordsFromNames(p);
}
exports.chordsFromNumerals = chordsFromNumerals;
exports.chords = chordsFromNumerals;

// Use a list of chord names to generate a chord progression
// The function returns an array of chords and works on n-dimensional arrays
// where every chord is a separate array within the larger array. 
// The chords are returned as semitones from 0-12. 
// eg. Em becomes => [4, 7, 11]
// Valid note names: C, D, E ..., B
// Valid additions: m, M, 7, 9, sus2, sus4, maj7, m7, maj9, m9
// 
// @param - {Array/String} -> chord names to convert to numbers
// @return - {2d-Array} -> array of chords
//
function chordsFromNames(a=['c']){
	// if not an array, translate chordname to semitone array
	if (!Array.isArray(a)){
		let ch = Chord.get(a);
		if (ch.empty){
			console.log(`Invalid chord name generated from numeral: ${a}`);
			return [0];
		}
		// return wrap(chromaToRelative(ch.notes));
		return chromaToRelative(ch.notes);
	}
	return a.map(c => chordsFromNames(c));
}
exports.chordsFromNames = chordsFromNames;

// Convert a beat division value to milliseconds based on the global BPM
// eg. ['1/4', 1/8', '1/16'] => [500, 250, 125] @ BPM = 120
// Also works with ratio floating values
// 
// @param {Number/String/Array} -> beat division or ratio array
// @param {Number} -> set the BPM (optional, default=globalBPM)
// @return {Number/Array}
//
function divisionToMs(a=['1'], bpm){
	return ratioToMs(divisionToRatio(a), bpm);
}
exports.divisionToMs = divisionToMs;
exports.dtoms = divisionToMs;

// Convert a beat ratio value to milliseconds based on the global BPM
// eg. [0.25, 0.125, 0.0625] => [500, 250, 125] @ BPM = 120
// 
// @param {Number/String/Array} -> beat ratio array
// @param {Number} -> set the BPM (optional, default=globalBPM)
// @return {Number/Array}
//
function ratioToMs(a=[1], bpm){
	let measureMs = notation.measureInMs;
	if (bpm){
		measureMs = 60000 / Math.max(1, Number(bpm)) * 4;
	}
	return multiply(a, measureMs);
}
exports.ratioToMs = ratioToMs;
exports.rtoms = ratioToMs;

// Convert a beat ratio value to milliseconds based on the BPM
// eg. [0.25, 0.125, 0.0625] => [500, 250, 125] @ BPM = 120
// 
// @param {Number/String/Array} -> beat ratio array
// @return {Number/Array}
//
function divisionToRatio(a=['1']){
	a = toArray(a);
	return a.map(x => {
		if (Array.isArray(x)){
			return divisionToRatio(x);
		}
		return divRatio(x);
	});
}
exports.divisionToRatio = divisionToRatio;
exports.dtor = divisionToRatio;

// Evaluate a division string to a ratio
// 
function divRatio(x){
	// match all division symbols: eg. 1/4, 5/16
	let d = /^\d+(\/\d+)?$/;
	// output a floating point value
	return (typeof x === 'string' && d.test(x))? eval(x) : x;
}

// Convert a division or ratio value to amount of ticks
// Used in software like Ableton, M4L and MaxMSP
// 
// @param {Number/String/Array} -> division to convert
// @return {Array}
// 
function divisionToTicks(a=['1']){
	// 1 tick = 1/480th of a quarter note, 
	// 1 bar = 1920 ticks
	return multiply(divisionToRatio(a), 1920);
}
exports.divisionToTicks = divisionToTicks;
exports.dtotk = divisionToTicks;
exports.ratioToTicks = divisionToTicks;
exports.rtotk = divisionToTicks;

// Convert timevalues to a ratio in floatingpoint
// eg. 4n, 8nt, 16nd, 2m etc.
// 
// @param {String/Array} -> timevalues to convert
// @return {Array}
// 
function timevalueToRatio(a=['1n']){
	a = toArray(a);
	return a.map(x => {
		if (Array.isArray(x)){
			return timevalueToRatio(x);
		}
		return timevalueRatio(x);
	});
}
exports.timevalueToRatio = timevalueToRatio;
exports.ttor = timevalueToRatio;

// Convert timevalues to milliseconds
// 
// @param {String/Array} -> timevalues to convert
// @param {Number} -> bpm (optional, default=globalBPM)
// @return {Array}
// 
function timevalueToMs(a=['1n'], bpm){
	return ratioToMs(timevalueToRatio(a), bpm);
}
exports.timevalueToMs = timevalueToMs;
exports.ttoms = timevalueToMs;

// Convert timevalues to ticks
// 
// @param {String/Array} -> timevalues to convert
// @return {Array}
// 
function timevalueToTicks(a=['1n']){
	return multiply(timevalueToRatio(a), 1920);
}
exports.timevalueToTicks = timevalueToTicks;
exports.ttotk = timevalueToTicks;

function timevalueRatio(x){
	let r = /^(\d+)([nm])([dt]?)$/;
	let m = x.match(r);
	let v = 1;
	if (m){
		let nm = { 'n' : 1, 'm' : m[1]*m[1] }
		let dt = { 'd' : 3/2, 't' : 2/3, '' : 1 }
		v = 1 / m[1] * nm[m[2]] * dt[m[3]];
	} else {
		console.log(`timevalueRatio(): ${x} is not a valid timevalue`);
	}
	return v;
}

// Convert toneJS time values
// function tonetimeRatio(x){
// }

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
			'size' : 12,
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
		
		// let result = { ...db };
		let result = JSON.parse(JSON.stringify(db));
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
						
						tmpCents = unique(tmpCents).map(x => x.toFixed(f.decimals));

						for (let i in s){
							// for all entered cent/ratio values
							let cent = (typeof s[i] === 'string')? ratioToCent(s[i])[0] : s[i];
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
							line = ratioToCent(line[0])[0];
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
