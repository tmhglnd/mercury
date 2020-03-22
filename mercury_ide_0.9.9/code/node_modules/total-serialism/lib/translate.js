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

// Convert a division value to milliseconds based on set BPM
// eg. ['1/4', 1/8', '1/16'] => [500, 250, 125] @ BPM = 120
// 
// @param {Number/String/Array}
// @return {Number/Array}
//
function divisionToMs(a='1'){
	// console.log('divisionToMs', a);
	// var arr = [];
	// for (i in a){
	// 	// console.log(eval(a[i]));
	// 	arr.push(eval(a[i]) * notation.measureInMs);
	// }
	return a.map(x => {
		x = (typeof x === 'string')? eval(x) : x;
		return x * notation.measureInMs
	});
	// return arr;
}
exports.divisionToMs = divisionToMs;
*/