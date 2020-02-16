//==============================================================================
// translate.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Methods to translate between midi, note-names, intervals and more
// 
// credits:
// - Using the amazing Tonal.js package by @danigb
//==============================================================================

// require Tonal API
const Note = require('tonal-note');
const Scl = require('tonal-scale');
// const Tonal = require('tonal');
// const Interval = require('tonal-interval');
// const Chord = require('tonal-chord');
// const Key = require('tonal-key');

var scale = {
	"scale" : "chromatic",
	"root" : "c",
	"intervals" : Scl.intervals("chromatic"),
	"chroma" : []
}
var bpm = 120;

// set the scale to use for mapping integer sequences to
// 
// @param {String} -> scale name
// @param {Int/String} -> root of the scale (optional, default=c)
// @return {Void}
function setScale(s="chromatic", r="c"){
	if (Scl.exists(s)){
		// scale.scale = s;
		// scale.root = r;
		// scale.intervals = Scl.intervals(s);
		console.log(Scl.props(s));
	}
}
exports.setScale = setScale;

// returns the scale and root as object
// 
// @return {Object} -> the scale and root
function getScale(){
	return scale;
}
exports.getScale = getScale;

// returns a list of all available scale names
// 
// @return {Array} -> scales
function scaleNames(){
	return Scl.names();
}
exports.scaleNames = scaleNames;

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
function noteToMidi(a='c3'){
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
function noteToFreq(a='c3'){
	if (!Array.isArray(a)){
		return Note.freq(a);
	}
	return a.map(x => Note.freq(x));
}
exports.noteToFreq = noteToFreq;
exports.ntof = noteToFreq;

// Convert a list of semitone intervals to midi
// provide octave offset
// 
// @param {Number/Array} -> semitones
// @param {Number} -> octave (optional, default=4)
// @return {Number/Array}
// 
function semiToMidi(a=0, o=4){
	if (!Array.isArray(a)){
		return a + o * 12;
	}
	return a.map(x => x + o * 12);
}
exports.semiToMidi = semiToMidi;
exports.stom = semiToMidi;

// Convert a list of semitone intervals to frequency
// provide octave offset
// 
// @param {Number/Array} -> semitones
// @param {Number} -> octave (optional, default=4)
// @return {Number/Array}
// 
function semiToFreq(a=0, o=4){
	if (!Array.isArray(a)){
		return Note.freq(a + o * 12);
	}
	return a.map(x => Note.freq(x + o * 12));
}
exports.semiToFreq = semiToFreq;
exports.stof = semiToFreq;

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

/*
let SYNC = true;
let _scale_name = 'minor';
let _scale = [];
let _tonic = 'c';

function syncToScale(note){
	var interval = _scale[parseInt(note) % 12];
	var octave = parseInt(note / 12);
	var detune = note - (parseInt(note));
	return interval + 12*octave + detune;
}//syncToScale()

function setSync(f){
	SYNC = (f != 0) ? true : false;
}//setSync()

function setScale(name){
	_scale_name = name;
	_scale = Tonal.scale(_scale_name);
	_scale = scaleStretch(relativeToSemitone(_scale));
}//set_scale()

function randomScale(){
	var a = Scale.names();
	var r = Math.floor(Math.random() * a.length);
	setScale(a[r]);
}//randomScale()

function relativeToSemitone(scl){
	return scl.map(Interval.semitones);
}//relativeToSemitone()

function scaleStretch(s){
	var n = 0;
	var scl = [];
	for (var i=0; i<12; i++){
		var index = s.indexOf(i)
		if (index > 0){
			n = s[index];
		}
		scl[i] = n;
	}
	return scl;
}//scaleStretch()

// not implemented yet
// function getChord(i){
// 	return i;
// }//getChord()
*/