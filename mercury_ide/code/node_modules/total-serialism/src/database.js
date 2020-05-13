//==============================================================================
// database.js
// part of 'total-serialism' Package
// by Timo Hoogland (@t.mo / @tmhglnd), www.timohoogland.com
// MIT License
//
// Build the databases of notes and other values used for the library
// as JSON files
// 
// credits:
// - Using the amazing Tonal.js package by @danigb for various functions
// - Using jsonFile package for beautiful JSON files
//==============================================================================

const fs = require('fs-extra');
const Algo = require('./gen-complex');
const { Note } = require('@tonaljs/tonal');

// Build the databases
buildNoteSet();
buildIntegerSequences();

// Build a database of most common Notenames and their
// corresponding relative semitone value
// 
// @return {Void} -> NoteSet as a JSON object
// 
function buildNoteSet(){
	let notes = 'c d e f g a b'.split(" ");
	notes = notes.concat('c d e f g a b'.toUpperCase().split(" "));
	let accidentals = 'bb b # ## x'.split(" ");

	let tones = {};
	for (let n in notes){
		tones[notes[n]] = Note.chroma(notes[n]);
		for (let a in accidentals) {
			let key = notes[n] + accidentals[a];
			tones[key] = Note.chroma(key);
		}
	}

	fs.writeJsonSync('data/tones.json', tones, { spaces : 2 , EOL: '\r\n' });
	console.log('NoteSet database written succesfully');
}

// Build the integer sequences dataset for quick access of
// Fibonacci, Pell and Tribonacci numbers
// 
// @return {Void} -> Databases for integersequences as JSON object
function buildIntegerSequences(){
	const file = './data/fibonacci.json';
	let data = { 
		"fibonacci" : [], 
		"pell" : [],
		"tribonacci" : []
	}
	data.fibonacci = Algo.fibonacci(1024);
	data.pell = Algo.pell(1024);
	data.tribonacci = Algo.threeFibonacci(1024);

	fs.writeJsonSync(file, data, { spaced: 2, EOL: '\r\n' })
	console.log("Integer Sequences dataset written succesfully");
}

/* WORK IN PROGRESS

const { ScaleType } = require('@tonaljs/tonal');
const { Interval } = require('@tonaljs/tonal');

// Build a database of the scales used for mapping relative
// semitone values to a value fitting in the scale
// 
function buildScaleSet(){
	let scale = ScaleType.get("whole tone");
	console.log(scale);

	for (let i in scale.intervals){
		let iv = Interval.get(scale.intervals[i]);
		let semitones = iv.semitones;
		let ivName = iv.name;
		let ivNum = iv.num;
		let ivQ = iv.q;

		console.log(ivName, ivNum, ivQ, semitones);
	}
}
*/