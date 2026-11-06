
const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Stat = require('total-serialism').Statistic;
const TL   = require('total-serialism').Translate;
const Util = require('total-serialism').Utility;

const { cowsay, cowthink } = require('cowsayjs');
const cows = [ 'apt', 'bud-frogs', 'bunny', 'cower', 'dragon', 'duck', 'eyes', 'flaming-sheep', 'hello-kitty', 'koala', 'luke-koala', 'moose', 'pony-smaller', 'sheep', 'skeleton', 'small', 'tux', 'udder', 'unipony-smaller', 'vader-koala', 'vader' ];

const functionMap = {
	// All the Array transformation/generation methods
	// From the total-serialism Node package
	// 
	// Generative Methods
	// 
	// generate an array of ints between specified range
	'spread' : (...v) => {
		return Gen.spread(...v);
	},
	// generate an array of floats between range
	'spreadFloat' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	'spreadF' : (...v) => {
		return Gen.spreadFloat(...v);
	},
	// generate an array of ints between specified range (inclusive)
	'spreadInclusive' : (...v) => {
		return Gen.spreadInclusive(...v);
	},
	'spreadInc' : (...v) => {
		return Gen.spreadInclusive(...v);
	},
	// generate an array of floats between range (inclusive)
	'spreadInclusiveFloat' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	'spreadInclusiveF' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	'spreadIncF' : (...v) => {
		return Gen.spreadInclusiveFloat(...v);
	},
	// generate an array between range (exponentially)
	'spreadExp' : (...v) => {
		return Gen.spreadExp(...v);
	},
	'spreadExpFloat' : (...v) => {
		return Gen.spreadExpFloat(...v);
	},
	'spreadExpF' : (...v) => {
		return Gen.spreadExpFloat(...v);
	},
	'spreadInclusiveExp' : (...v) => {
		return Gen.spreadInclusiveExp(...v);
	},
	'spreadIncExp' : (...v) => {
		return Gen.spreadInclusiveExp(...v);
	},
	'spreadInclusiveExpFloat' : (...v) => {
		return Gen.spreadInclusiveExpFloat(...v);
	},
	'spreadIncExpF' : (...v) => {
		return Gen.spreadInclusiveExpFloat(...v);
	},
	// fill an array with duplicates of a value
	'fill' : (...v) => {
		return Gen.fill(...v);
	},
	// generate an array from a sinewave function
	'sine' : (...v) => {
		return Gen.sine(...v);
	},
	'sineFloat' : (...v) => {
		return Gen.sineFloat(...v);
	},
	'sineF' : (...v) => {
		return Gen.sineFloat(...v);
	},
	'sinF' : (...v) => {
		return Gen.sineFloat(...v);
	},
	// generate an array from a cosine function
	'cosine' : (...v) => {
		return Gen.cosine(...v);
	},
	'cosineFloat' : (...v) => {
		return Gen.cosineFloat(...v);
	},
	'cosineF' : (...v) => {
		return Gen.cosineFloat(...v);
	},
	'cosF' : (...v) => {
		return Gen.cosineFloat(...v);
	},
	// generate an array from a sawtooth function
	'saw' : (...v) => {
		return Gen.saw(...v);
	},
	'sawFloat' : (...v) => {
		return Gen.sawFloat(...v);
	},
	'sawF' : (...v) => {
		return Gen.sawFloat(...v);
	},
	// generate an array from a squarewave function
	'square' : (...v) => {
		return Gen.square(...v);
	},
	'rect' : (...v) => {
		return Gen.square(...v);
	},
	'squareFloat' : (...v) => {
		return Gen.squareFloat(...v);
	},
	'squareF' : (...v) => {
		return Gen.squareFloat(...v);
	},
	'rectF' : (...v) => {
		return Gen.squareFloat(...v);
	},
	'binaryBeat' : (...v) => {
		return Gen.binaryBeat(...v);
	},
	'binary' : (...v) => {
		return Gen.binaryBeat(...v);
	},
	'spacingBeat' : (...v) => {
		return Gen.spacingBeat(...v);
	},
	'spacing' : (...v) => {
		return Gen.spacingBeat(...v);
	},
	// 
	// Algorithmic Methods
	// 
	// generate a euclidean rhythm evenly spacing n-beats amongst n-steps
	// switched to fastEuclid method
	'euclid' : (...v) => {
		// return Algo.euclid(...v);
		return Algo.fastEuclid(...v);
	},
	'euclidean' : (...v) => {
		// return Algo.euclid(...v);
		return Algo.fastEuclid(...v);
	},
	// generate a rhythm based on a hexadecimal string (0-f)
	'hexBeat' : (...v) => {
		// console.log("@hexBeat", v);
		return Algo.hexBeat(v[0]);
	},
	'hex' : (...v) => {
		return Algo.hexBeat(v[0]);
	},
	// generate a sequence of numbers from the collatz conjecture
	// thread lightly, can grow large with large input numbers
	'collatz' : (...v) => {
		return Algo.collatz(v[0]);
	},
	'collatzMod' : (...v) => {
		return Algo.collatzMod(...v);
	},
	// generate the numbers in the fibonacci sequence
	'fibonacci' : (...v) => {
		return Algo.fibonacci(...v);
	},
	// generate the pisano periods from the fibonacci sequence
	'pisano' : (...v) => {
		return Algo.pisano(...v);
	},
	// // generate a normalized pisano period. returns in range 0 - 1
	// 'nPisano' : (...v) => {
	// 	return Util.normalize(Algo.pisano(...v));
	// },
	'fibonacciMod' : (...v) => {
		return functionMap.pisano(v);
	},
	// generate the numbers in the fibonacci sequence
	'pell' : (...v) => {
		return Algo.pell(...v);
	},
	// generate the numbers in the fibonacci sequence
	'lucas' : (...v) => {
		return Algo.lucas(...v);
	},
	// generate the numbers in the fibonacci sequence
	'threeFibonacci' : (...v) => {
		return Algo.threeFibonacci(...v);
	},
	// Per Nørgards Inifity series
	'infinitySeries' : (...v) => {
		return Algo.infinitySeries(...v);
	},
	'infSeries' : (...v) => {
		return functionMap.infinitySeries(v);
	},
	// 
	// Stochastic Methods
	// 
	// set the random number generator seed
	'randomSeed' : (...v) => {
		return Rand.seed(v[0]);
	},
	// get the random number generator seed
	'getSeed' : () => {
		return Rand.getSeed();
	},
	// generate an array of random integers in range
	'random' : (...v) => {
		return Rand.random(...v);
	},
	'rand' : (...v) => {
		return Rand.random(...v);
	},
	// generate an array of random floats
	'randomFloat' : (...v) => {
		return Rand.randomFloat(...v);
	},
	'randomF' : (...v) => {
		return Rand.randomFloat(...v);
	},
	'randF' : (...v) => {
		return Rand.randomFloat(...v);
	},
	// generate a random walk (drunk)
	'drunk' : (...v) => {
		return Rand.drunk(...v);
	},
	'drunkFloat' : (...v) => {
		return Rand.drunkFloat(...v);
	},
	'drunkF' : (...v) => {
		return Rand.drunkFloat(...v);
	},
	// generate random values picked from an urn
	'urn' : (...v) => {
		return Rand.urn(...v);
	},
	// generate an array of coin tosses
	'coin' : (...v) => {
		return Rand.coin(v[0]);
	},
	// generate an array of dice rolls
	'dice' : (...v) => {
		return Rand.dice(v[0]);
	},
	// generate random clave patterns
	'clave' : (...v) => {
		return Rand.clave(...v);
	},
	// generate an array of twelveTone notes
	'twelveTone' : () => {
		return Rand.twelveTone();
	},
	// choose values at random from a ring provided
	'choose' : (...v) => {
		return Rand.choose(...v);
	},
	// pick values randomly from a ring provided and remove chosen
	'pick' : (...v) => {
		return Rand.pick(...v);
	},
	// shuffle the items in an array, influenced by the random seed
	'shuffle' : (v) => {
		return Rand.shuffle(v);
	},
	'scramble' : (v) => {
		return Rand.shuffle(v);
	},
	// expand an array based upon the pattern within an array
	// arbitrarily choosing the next 
	'expand' : (...v) => {
		// check if arguments are correct
		v[0] = (Array.isArray(v[0])) ? v[0] : [v[0]];
		v[1] = Math.max(2, (Array.isArray(v[1])) ? v[1][0] : v[1]);
		return Rand.expand(v[0], v[1]);
	},
	// markov chain methods
	// combine the markovTrain with markovChain
	// first train the model based on a list
	// then generate a list output from the chain
	'markovTrain' : (...v) => {
		// generate markovchain from the incoming list
		let markov = new Rand.DeepMarkovChain(...v);
		// create string of data
		let data = markov.stringify();
		// clear data and delete
		markov.clear();
		markov = null;
		// output the table as a string array to use for generating
		return [ data ];
	},
	'markov' : (...v) => {
		return functionMap['markovTrain'](...v);
	},
	'markovChain' : (...v) => {
		// train from a markov table and generate a chain
		let markov = new Rand.DeepMarkovChain();
		markov.parse(v[1]);
		let gen = markov.chain(v[0]);
		// clear the data and remove markov
		markov.clear();
		markov = null;
		// return generated array
		return gen;
	},
	'chain' : (...v) => {
		return functionMap['markovChain'](...v);
	},
	// 
	// Transformational Methods
	// 
	// duplicate an array with an offset added to every value
	'clone' : (...v) => {
		return Mod.clone(...v);
	},
	// combine multiple numbers/arrays into one
	'combine' : (...v) => {
		return Mod.combine(...v);
	},
	'concat' : (...v) => {
		return Mod.combine(...v);
	},
	'join' : (...v) => {
		return Mod.combine(...v);
	},
	// duplicate an array certain amount of times
	'duplicate' : (...v) => {
		return Mod.duplicate(...v);
	},
	'dup' : (...v) => {
		return Mod.duplicate(...v);
	},
	'copy' : (...v) => {
		return Mod.duplicate(...v);
	},
	// Pad an array with zeroes (or any other value) up to the length specified.
	'pad' : (...v) => {
		return Mod.pad(...v);
	},
	// add zeroes to a rhythm to make it play once over a certain amount of bars
	'every' : (...v) => {
		return Mod.every(...v);
	},
	// flatten a multidimensional array to 1D (or specified)
	'flatten' : (...v) => {
		return Util.flatten(...v);
	},
	'flat' : (...v) => {
		return functionMap.flatten(v);
	},
	// invert an array around a center point
	'invert' : (...v) => {
		return Mod.invert(...v);
	},
	'inverse' : (...v) => {
		return Mod.invert(...v);
	},
	'flip' : (...v) => {
		return Mod.invert(...v);
	},
	'inv' : (...v) => {
		return Mod.invert(...v);
	},
	// filter items from an array
	'filter' : (...v) => {
		return Mod.filter(v[0], v.slice(1, v.length));
	},
	// lookup the values from an array based on another array
	'lookup' : (...v) => {
		return Mod.lookup(...v);
	},
	'get' : (...v) => {
		return Mod.lookup(...v);
	},
	// interleave multiple arrays into one
	'lace' : (...v) => {
		return Mod.lace(...v);
	},
	'zip' : (...v) => {
		return Mod.lace(...v);
	},
	// merge arrays into a 2D-array
	'merge' : (...v) => {
		return Mod.merge(...v);
	},
	// 'mix' : (...v) => {
	// 	return Mod.merge(...v);
	// },
	// generate a palindrome of an array
	'palindrome' : (...v) => {
		return Mod.palindrome(...v);
	},
	'palin' : (...v) => {
		return Mod.palindrome(...v);
	},
	'mirror' : (...v) => {
		return Mod.palindrome(...v);
	},
	'pinky' : (...v) => {
		return Mod.pinkyUp(...v);
	},
	'pinkyUp' : (...v) => {
		return Mod.pinkyUp(...v);
	},
	'pinkyDown' : (...v) => {
		return Mod.pinkyDown(...v);
	},
	'pinkyUpDown' : (...v) => {
		return Mod.pinkyUpDown(...v);
	},
	// repeat the individual values of an array by a certain amount
	'repeat' : (...v) => {
		return Mod.repeat(...v);
	},
	// reverse an array
	'reverse' : (...v) => {
		return Mod.reverse(...v);
	},
	'rev' : (...v) => {
		return Mod.reverse(...v);
	},
	'retrograde' : (...v) => {
		return Mod.reverse(...v);
	},
	// rotate an array in positive or negative direction
	'rotate' : (...v) => {
		return Mod.rotate(...v);
	},
	'rot' : (...v) => {
		return Mod.rotate(...v);
	},
	'turn' : (...v) => {
		return Mod.rotate(...v);
	},
	// sort an array in ascending or descending order
	'sort' : (...v) => {
		return Stat.sort(...v);
	},
	// spray values on the non-zero places of another array
	'spray' : (...v) => {
		return Mod.spray(...v);
	},
	// slice an array into one or multiple parts
	'slice' : (...v) => {
		return Mod.slice(...v);
	},
	// split an array recursively till the end
	'split' : (...v) => {
		return Mod.split(...v);
	},
	'thumb' : (...v) => {
		return Mod.thumbUp(...v);
	},
	'thumbUp' : (...v) => {
		return Mod.thumbUp(...v);
	},
	'thumbDown' : (...v) => {
		return Mod.thumbDown(...v);
	},
	'thumbUpDown' : (...v) => {
		return Mod.thumbUpDown(...v);
	},
	// cut a piece of the array and return
	'cut' : (...v) => {
		return Mod.slice(...v)[0];
	},
	// cut a piece of the array and return the last part
	'cutLast' : (...v) => {
		return Mod.slice(...v).pop();
	},
	// stretch an array to a specified length, interpolating values
	'stretch' : (...v) => {
		return Util.trunc(functionMap['stretchFloat'](...v));
	},
	'stretchF' : (...v) => {
		return functionMap['stretchFloat'](...v);
	},
	'stretchFloat' : (...v) => {
		// swap because of implementation in total-serialism
		v[0] = (Array.isArray(v[0])) ? v[0] : [v[0]];
		v[1] = Math.max(2, (Array.isArray(v[1])) ? v[1][0] : v[1]);
		return Mod.stretch(...v);
	},
	// remove duplicates from an array, leave order intact
	'unique' : (...v) => {
		return Mod.unique(...v);
	},
	'thin' : (...v) => {
		return Mod.unique(...v);
	},
	// 
	// Translate Methods
	//
	'tempo' : (...v) => {
		TL.setTempo(v[0]);
		return TL.getTempo();
	},
	'getTempo' : () => {
		return TL.getTempo();
	},
	'scale' : (...v) => {
		TL.setScale(...v);
		return TL.getSettings().map;
	},
	'getScale' : () => {
		return TL.getSettings().scale;
	},
	'getRoot' : () => {
		return TL.getSettings().root;
	},
	'getScaleMap' : () => {
		return TL.getSettings().map;
	},
	'scaleNames' : (...v) => {
		return TL.getScales();
	},
	'tuning' : (...v) => {
		console.log('set tuning', v);
	},
	'root' : (v) => {
		TL.setRoot(v[0]);
		return TL.getSettings().root;
	},
	// tempo translate methods
	// divisionToMs
	'divisionToMs' : (...v) => {
		return TL.divisionToMs(...v);
	},
	'dtoms' : (...v) => {
		return TL.divisionToMs(...v);
	},
	// divisionToRatio
	'divisionToRatio' : (...v) => {
		return TL.divisionToRatio(...v);
	},
	'dtor' : (...v) => {
		return TL.divisionToRatio(...v);
	},
	// ratioToMs
	'ratioToMs' : (...v) => {
		return TL.ratioToMs(...v);
	},
	'rtoms' : (...v) => {
		return TL.ratioToMs(...v);
	},
	// timeToRatio
	'timeToRatio' : (...v) => {
		return TL.timevalueToRatio(...v);
	},
	'ttor' : (...v) => {
		return TL.timevalueToRatio(...v);
	},
	// pitch translate methods
	// midiToNote
	'midiToNote' : (...v) => {
		return TL.midiToNote(...v);
	},
	'mton' : (...v) => {
		return TL.midiToNote(...v);
	},
	// midiToFreq
	'midiToFreq' : (...v) => {
		return TL.midiToFreq(...v);
	},
	'mtof' : (...v) => {
		return TL.midiToFreq(...v);
	},
	// freqToMidi
	'freqToMidi' : (...v) => {
		return TL.freqToMidi(...v);
	},
	'ftom' : (...v) => {
		return TL.freqToMidi(...v);
	},
	// freqToNote
	'freqToNote' : (...v) => {
		return TL.freqToNote(...v);
	},
	'fton' : (...v) => {
		return TL.freqToNote(...v);
	},
	// noteToMidi
	'noteToMidi' : (...v) => {
		return TL.ntom(...v);
	},
	'ntom' : (...v) => {
		return TL.ntom(...v);
	},
	// noteToFreq
	'noteToFreq' : (...v) => {
		return TL.noteToFreq(...v);
	},
	'ntof' : (...v) => {
		return TL.noteToFreq(...v);
	},
	// chromaToRelative
	'chromaToRelative' : (...v) => {
		return TL.chromaToRelative(...v);
	},
	'ctor' : (...v) => {
		return TL.chromaToRelative(...v);
	},
	// relativeToMidi
	'relativeToMidi' : (...v) => {
		return TL.relativeToMidi(...v);
	},
	'rtom' : (...v) => {
		return TL.relativeToMidi(...v);
	},
	// relativeToFreq
	'relativeToFreq' : (...v) => {
		return TL.relativeToFreq(...v);
	},
	'rtof' : (...v) => {
		return TL.relativeToFreq(...v);
	},
	// mapToScale functions
	'toScale' : (...v) => {
		return TL.toScale(...v);
	},
	// ratio to cent
	'ratioToCent' : (...v) => {
		return TL.ratioToCent(...v);
	},
	'rtoc' : (...v) => {
		return TL.ratioToCent(...v);
	},
	// chords generation
	'chordsFromNumerals' : (...v) => {
		return TL.chordsFromNumerals(v);
	},
	'makeChords' : (...v) => {
		return functionMap.chordsFromNumerals(v);
	},
	'chordsFigured' : (...v) => {
		return functionMap.chordsFromNumerals(v);
	},
	'chordsFromNames' : (...v) => {
		return TL.chordsFromNames(...v);
	},
	'chordsNamed' : (...v) => {
		return functionMap.chordsFromNames(v);
	},
	// translate text to ASCII
	'textCode' : (...v) => {
		return TL.textCode(...v);
	},
	// 
	// Statistic Methods
	// 
	// IMPLEMENTATION NEEDED
	// maximum
	// minimum
	// mean / average
	// median / center
	// mode / common

	// 
	// Utility Methods
	// 
	// wrap values between a low and high range
	'wrap' : (...v) => {
		return Util.wrap(...v);
	},
	// fold values between a low and high range
	'fold' : (...v) => {
		return Util.fold(...v);
	},
	// clip values between a low and high range
	'clip' : (...v) => {
		return Util.constrain(...v);
	},
	'constrain' : (...v) => {
		return Util.constrain(...v);
	},
	// scale values from an input range to an output range
	'map' : (...v) => {
		return Util.map(...v);
	},
	// sum the values from an array into one number
	'sum' : (...v) => {
		return Util.sum(...v);
	},
	'reduce' : (...v) => {
		return Util.sum(...v);
	},
	// return the size of an array
	'size' : (v) => {
		return Util.size(v);
	},
	// length unsupported because overwritten by function map to env
	// 'length' : (v) => {
	// 	return Util.size(v);
	// },
	// add 1 or more values to an array
	'add' : (...v) => {
		return Util.add(...v);
	},
	// subtract 1 or more values from an array
	'subtract' : (...v) => {
		return Util.subtract(...v);
	},
	'sub' : (...v) => {
		return Util.subtract(...v);
	},
	// multiply 1 or more values to an array
	'multiply' : (...v) => {
		return Util.multiply(...v);
	},
	'mult' : (...v) => {
		return Util.multiply(...v);
	},
	'mul' : (...v) => {
		return Util.multiply(...v);
	},
	// divide 1 or more values from an array
	'divide' : (...v) => {
		return Util.divide(...v);
	},
	'div' : (...v) => {
		return Util.divide(...v);
	},
	// normalize an array to 0-1 range
	'normalize' : (...v) => {
		return Util.normalize(...v);
	},
	'norm' : (...v) => {
		return Util.normalize(...v);
	},
	// signed normalize an array to -1 1 range
	'signedNormalize' : (...v) => {
		return Util.add(Util.mult(Util.norm(...v), 2), -1);
	},
	'snorm' : (...v) => {
		return functionMap.signedNormalize(...v);
	},
	// take the modulus of an array
	'modulo' : (...v) => {
		return Util.mod(...v);
	},
	'mod' : (...v) => {
		return Util.mod(...v);
	},
	// convert floats to integers by truncating
	'int' : (v) => {
		return Util.arrayCalc(v, 0, (a) => Math.trunc(a));
	},
	// round down floats
	'floor' : (v) => {
		return Util.arrayCalc(v, 0, (a) => Math.floor(a));
	},
	// round floats to nearest integer
	'round' : (v) => {
		return Util.arrayCalc(v, 0, (a) => Math.round(a));
	},
	'ceil' : (v) => {
		return Util.arrayCalc(v, 0, (a) => Math.ceil(a));
	},
	// compare two lists for equals
	'equals' : (...v) => {
		return Util.arrayCalc(v[0], v[1], (a,b) => Number(a === b));
	},
	'eq' : (...v) => {
		return functionMap.equals(...v);
	},
	// compare two lists for not equal
	'notEquals' : (...v) => {
		return Util.arrayCalc(v[0], v[1], (a,b) => Number(a !== b));
	},
	'neq' : (...v) => {
		return functionMap.notEquals(...v);
	},
	// compare left for greater than right list
	'greater' : (...v) => {
		return Util.arrayCalc(v[0], v[1], (a,b) => Number(a > b));	
	},
	'gt' : (...v) => {
		return functionMap.greater(...v);
	},
	// compare left for greater than or equal to right list
	'greaterEquals' : (...v) => {
		return Util.arrayCalc(v[0], v[1], (a,b) => Number(a >= b));	
	},
	'gte' : (...v) => {
		return functionMap.greaterEquals(...v);
	},
	// compare left for less than right list
	'less' : (...v) => {
		return Util.arrayCalc(v[0], v[1], (a,b) => Number(a < b));	
	},
	'lt' : (...v) => {
		return functionMap.less(...v);
	},
	// compare left for less than or equal to right list
	'lessEquals' : (...v) => {
		return Util.arrayCalc(v[0], v[1], (a,b) => Number(a <= b));	
	},
	'lte' : (...v) => {
		return functionMap.lessEquals(...v);
	},
	// some plotting utilities
	'plot' : (...v) => {
		return Util.plot(v[0], { log: false });
	},
	'draw' : (...v) => {
		return Util.draw(v[0], { log: false });
	},
	// just for fun, mostly during performances
	'cowsay' : (...v) => {
		let txt = v[0] ?? 'hello!';
		txt = (typeof txt !== 'string') ? JSON.stringify(txt) : txt;
		let cow = v[1] ?? 'default';
		if (cow === 'random') cow = cows[Math.floor(Math.random()*cows.length)];
		return cowsay(txt, { cow: cow });
	},
	'cowthink' : (...v) => {
		let txt = v[0] ?? 'hmm';
		txt = (typeof txt !== 'string') ? JSON.stringify(txt) : txt;
		let cow = v[1] ?? 'default';
		if (cow === 'random') cow = cows[Math.floor(Math.random()*cows.length)];
		return cowthink(txt, { cow: cow });
	}
}
exports.functionMap = functionMap;