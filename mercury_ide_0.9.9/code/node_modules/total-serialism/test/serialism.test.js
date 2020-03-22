
const Srl = require("../index");
const Gen = require("../index").Generative;
const Algo = require("../index").Algorithmic;
const Mod = require("../index").Transform;
const Rand = require("../index").Stochastic;
const TL = require("../index").Translate;
const Util = require("../index").Utility;

/*
	Test criteria:
	- test for no argument
	- test for single argument
	- test for multiple arguments
	- test for negative values
	- test for strings vs numbers
*/

// console.log(TL.scaleName());
// TL.searchScales(['1P', '2M', '3m', '4P', '6m', '7M']);

// var divs = ['1/4', '1/8', '3/16', '1/4', '1/6', '2'];
// console.log(TL.divisionToMs(divs));
// console.log(divs);

// var rts = [0.25, 0.125, 0.1875, 0.25, 0.16667, 2];
// console.log(TL.divisionToMs(rts));
// console.log(rts);

// testSerial();
// testGen();
// testAlgo();
// testRand();
// testMod();
testTranslate();
// testUtil();

// Global vars for tests
var complexRules = {
	0: [0, 3, 7],
	3: [-1, 0],
	7: [12, 19, 0],
	12: [12, 0, 0, 5], 
	5: [0, -3, 0]
}

// Test different sections of the package
function testSerial(){
	pagebreak("Serial");

	test("Srl.Generative.spread(10)");
	test("Srl.Algorithmic.euclid(5, 3, 1)");
	test("Srl.Transform.lace([0, 1, 2], [3, 4, 5])");
}

function testGen(){
	pagebreak("Generative");

	test("Gen.spread()");
	test("Gen.spreadFloat(7)");
	test("Gen.spread(5, 7, 19)");
	test("Gen.spread(4, 10, 2)");
	test("Gen.spreadFloat(5, 2, 11)");
	test("Gen.spreadFloat(4, -1, 1)");
	test("Gen.spreadInclusiveFloat(9, -1, 1)");
	test("Gen.spreadInclusiveFloatExp(5, 0, 1, 2)");
	
	test("Gen.fill()");
	test("Gen.fill(10, 2, 15, 3, 20, 4)");

	test("Gen.sineFloat()");
	test("Gen.sineFloat(10, 1, -1, 1, 0.5)");
	test("Gen.cosineFloat(8)");

	test("Gen.sine(10)");
	test("Gen.sine(12, 1, -1, 1)");
	test("Gen.sine(11, 4, 0, 7)");

	test("Gen.cosine(7, 1.5)");
}

function testAlgo(){
	pagebreak("Generative Complex");
	
	pagebreak("Euclid");
	test("Algo.euclid()");
	test("Algo.euclid(10, 3)");
	test("Algo.euclid(8, 5)");
	test("Algo.euclid(16, 9, 1)");
	
	pagebreak("HexBeat");
	test("Algo.hexBeat()");
	test("Algo.hexBeat('f898')");
	test("Algo.hexBeat('a9d2')");
	test("Algo.hexBeat(573)");
	test("Algo.hexBeat(['32fa'])");
	test("Algo.hexBeat(['-zxyt'])");
	
	pagebreak("Lindenmayer");
	test("Algo.linden()");
	// koch curve
	test("Algo.linden('F', 2, {F: 'F+F-F-F+F'})");
	// cantor set
	test("Algo.linden('A', 3, {A: 'ABA', B: 'BBB'})");
	// cantor set as 0's and 1's in an array ruleset
	test("Algo.linden(1, 3, {1: [1, 0, 1], 0: [0, 0, 0]})");
	// Thue-Morse sequence
	test("Algo.linden('A', 4, {A: 'AB', B: 'BA'})");
	// Thue-Morse sequence as 0's and 1's
	test("Algo.linden(1, 4, {0: [0, 1], 1: [1, 0]})");
	// Sierpinski Triangle
	test("Algo.linden('F-G-G', 1, {'F': 'F−G+F+G−F', 'G' : 'GG'})");
	// usage with integers and arrays
	test("Algo.linden([1, 0, 1], 3, {0: [1], 1: [0, 1]})");
	// more complex rules for semitone melodies (see above for rules)
	test("Algo.linden(0, 3, complexRules)");

	pagebreak("Fibonacci");
	test("Algo.fibonacci(12)");
	test("Algo.fibonacci(2, 100)");
	test('Algo.fibonacci(1, 100)[0].split("").map(x => Number(x))');
	
	test("Algo.pisano(12)");
	test("Algo.pisano(7)");
	test("Algo.pisano(4, 10)");

	test("Algo.pell(10)");
	test("Algo.threeFibonacci(10)");
	test("Algo.lucas(10)");

	test("Algo.nbonacci(10, 1, 3, 2)");
	test("Algo.nbonacci(10, 0, 1, 1)");
}

function testRand(){
	pagebreak("Stochastic");

	test("Rand.seed(19374)");
	test("Rand.randomFloat(3, -1, 1)");
	test("Rand.randomFloat(3, 0.2, 0.5)");

	test("Rand.seed(4827)");
	test("Rand.random(5, 2)");
	test("Rand.random(5, 0, 12)");

	test("Rand.seed(4827)");
	test("Rand.random(5, 2)");
	test("Rand.random(5, 0, 12)");

	test("Rand.seed(0)");
	test("Rand.coin(10)");

	test("Rand.dice(4)");
	test("Rand.dice(4)");

	// var shufArr = [0, 5, 7, 12];
	// console.log(Mod.shuffle(shufArr));
	// console.log(shufArr);
	test("Rand.shuffle()");
	test("Rand.seed(1473)");
	test("Rand.shuffle([0, 5, 7, 12])");
	test("Rand.shuffle([0, 5, 7, 12])");

	test("Rand.seed(1473)");
	test("Rand.shuffle([0, 5, 7, 12])");

	test("Rand.seed(4923)");
	test("Rand.twelveTone()");
	test("Rand.twelveTone()");

	test("Rand.seed(4923)");
	test("Rand.twelveTone()");

	test('Rand.seed(75631)');
	test('Rand.urn(5)');
	test('Rand.urn(10, 7)');
	test('Rand.urn(12, -3, 3)');

	test("Rand.choose(5, [0, 1, 2, 3, 5, 8, 13])");
	test("Rand.choose(5, ['c', 'e', 'g'])");
	test("Rand.pick(5, [0, 1, 2, 3, 5, 8, 13])");
	test("Rand.pick(5, ['c', 'e', ['g', 'd']])");
}

function testMod(){
	pagebreak("Transform");
	
	// var modArr = [0, 5, 7];
	// console.log(Mod.clone(modArr, 0, 12, -12));
	// console.log(modArr);
	test("Mod.clone()");
	test('Mod.clone([0, 5, 7], 0, 12, -12)');
	test("Mod.clone(['hello', 'world'], 0, 1, 2)");

	// var comArr1 = [0, 1];
	// var comArr2 = [[22, 33], 4];
	// console.log(Mod.combine(comArr1, comArr2));
	// console.log(comArr1);
	// console.log(comArr2);
	test("Mod.combine()");
	test("Mod.combine([0, 1], [[22, 33], 4])");
	test("Mod.combine([0, 5], 12, [7, 3])");
	test("Mod.combine(0, 12, 3)");

	// var dupArr = [0, 1, 2];
	// console.log(Mod.duplicate(dupArr, 4));
	// console.log(dupArr);
	test("Mod.duplicate()");
	test("Mod.duplicate([0, 1, 2])");
	test("Mod.duplicate([0, 1, 2], 4)");

	// var evArr = [1, 0, 1, 0, 1, 1, 0, 1];
	// console.log(Mod.every([1, 0, 1, 0, 1, 1, 0, 1], 2, 8));
	// console.log(evArr);
	test("Mod.every([1, 0, 1, 0, 1, 1, 0, 1], 2, 8)");
	test("Mod.every([1, 0, 1, 1], 1, 16, 0.5)");
	test("Mod.every([1, 1, 0, 1], 4, 5, -1)");

	// var invArr = [0, 2, 5, 10, 13];
	// console.log(Mod.invert(invArr, 5));
	// console.log(invArr);
	test("Mod.invert()");
	test("Mod.invert([0, 2, 5, 10, 13])");
	test("Mod.invert([0, 2, 5, 10, 13], 5)");
	test("Mod.invert([0, 2, 5, 10, 13], 0, 12)");

	// var lacArr1 = [0, 2, 4];
	// var lacArr2 = [1, 3, 5];
	// console.log(Mod.lace(lacArr1, lacArr2));
	// console.log(lacArr1);
	// console.log(lacArr2);
	test("Mod.lace([0, 2, 4], [1, 3, 5], ['hello'])");
	test("Mod.lace([0, 5, 9], [3, 3], [7, 12, 11, -1])");

	// var merArr1 = [0, 3, 7];
	// var merArr2 = [3, 12];
	// var merArr3 = [12, -1, 19, 5];
	// console.log(Mod.merge(merArr1, merArr2, merArr3));
	// console.log(merArr1, merArr2, merArr3);
	test("Mod.merge()");
	test("Mod.merge([0, 3, 7], [3, 12], [12, -1, 19, 5])");
	test("Mod.merge([0, 1, 2, 3], [10, 20, 30, 40])");

	// var palArr = [0, 1, 2, 3];
	// console.log(Mod.palindrome(palArr, false));
	// console.log(palArr);
	test("Mod.palindrome()");
	test("Mod.palindrome([0, 1, 2, 3])");
	test("Mod.palindrome([0, 1, 2, 3], true)");
	test("Mod.palindrome([0, 1, 2, 3], 1)");

	// var revArr = [0, 5, 7, 12];
	// console.log(Mod.reverse(revArr));
	// console.log(revArr);	
	test("Mod.reverse()");
	test("Mod.reverse([0, 5, 7, 12])");
	test("Mod.reverse([0, [11, 12], 2, 3])");

	// var rotArr = [0, 1, 2, 3];
	// console.log(Mod.rotate(rotArr, -1));
	// console.log(rotArr);
	test("Mod.rotate()");
	test("Mod.rotate([0, 1, 2, 3])");
	test("Mod.rotate([0, 1, 2, 3], 1)");
	test("Mod.rotate([0, 5, 7, 12], -1)");
	test("Mod.rotate([0, [11, 12], 2, 3], 1)");

	// var sprArr1 = [12, 19, 24];
	// var sprArr2 = [1, 0, 0, 1, 1, 0, 1, 0, 0.2];
	// console.log(Mod.spray(sprArr1, sprArr2));
	// console.log(sprArr1, sprArr2);
	test("Mod.spray()");
	test("Mod.spray([12, 19, 24], [1, 0, 0, 1, 1, 0, 1, 0.3, 0])");

	// var unArr = [5, 7, 5, 0, 12, 7, 5];
	// console.log(Mod.unique(unArr));
	// console.log(unArr);
	test("Mod.unique()");
	test("Mod.unique([5, 7, 5, 0, 12, 7, 5])");
}

function testTranslate(){
	pagebreak("Translate");

	test("Srl.setBPM(110)");
	test("Srl.setScale('minor_harmonic', 'a')");

	test("Srl.setRoot('Db')");
	test("Srl.getSettings()");

	test("TL.scaleNames()");

	test("TL.midiToNote(48)");
	test("TL.midiToNote('c4')");
	test("TL.mton([60, 67, 70])");

	test("TL.noteToMidi('c2')");
	test("TL.noteToMidi(['c2','d2','f#2'])");
	test("TL.ntom(['f-1','bb3','g#2'])");

	test("TL.midiToFreq(60)");
	test("TL.mtof([60, 67, 72])");

	test("TL.noteToFreq('c2')");
	test("TL.noteToFreq(['c2','d2','f#2'])");
	test("TL.ntof(['f-1','bb3','g###2'])");

	test("TL.rtom([-12, 0, 7, 12])");
	test("TL.rtom([-12, 0, 7, 12], 4)");
	test("TL.rtom([-12, 0, 7, 12], 'c3')");

	test("TL.rtof([-12, 0, 7, 12])");
	test("TL.rtof([-12, 0, 7, 12], 4)");
	test("TL.rtof([-12, 0, 7, 12], 'c3')");

	Srl.setScale('minor_harmonic', 'b');

	test("TL.toScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);");
	test("TL.toScale(Gen.sine(8, 3.5, -7, 24))");
	test("TL.toScale([0, 4.1, 6.5, 7.1, 9.25])");

	test("Srl.setRoot('c')");
	test("Srl.getSettings()");

	test("TL.toMidi([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);");
	test("TL.toMidi(Gen.sine(8, 3.5, -7, 24), 4)");
	test("TL.toMidi([0, 4.1, 6.5, 7.1, 9.25], 'c3')");
}

function testUtil(){
	pagebreak("Utility");

	test("Util.mod(7, 3)");
	test("Util.mod([-2, 4, 3, 7], 5)");

	test("Util.bound(10.34, 0, 3.14)");
	test("Util.bound([-2, 4, 3, 7], 1, 5)");

	test("Util.map(0.5, 0, 1, 0, 2)");
	test("Util.map(0.5, 0, 1, 0, 2, 0.5)");
	test("Util.map([0, 1, 2, 3, 4], 0, 4, -1, 1)");

	test("Util.add(5, 2)");
	test("Util.add([0, 3, 7], 2)");
	test("Util.add([1, 2, 3, 4], [1, 2, 3])");

	test("Util.sub(5, 2)");
	test("Util.sub([0, 3, 7], 2)");
	test("Util.sub([1, 2, 3, 4], [1, 2, 3])");

	test("Util.mul(5, 2)");
	test("Util.mul([0, 3, 7], 2)");
	test("Util.mul([1, 2, 3, 4], [1, 2, 3])");

	test("Util.div(5, 2)");
	test("Util.div([0, 3, 7], 2)");
	test("Util.div([1, 2, 3, 4], [1, 2, 3])");
}

function test(f){
	// print the written function to console
	console.log(f+";");
	// evaluate the function and print results
	r = eval(f);
	if (r === undefined){
		r = "void return";
	}
	console.log("//=>", r, "\n");
}

function pagebreak(n){
	console.log("====================================");
	console.log("=> \t", n);
	console.log("====================================\n");
}
