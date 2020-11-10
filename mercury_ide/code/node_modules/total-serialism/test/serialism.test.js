
const fs = require('fs');

// test with different builds
let entryPoint = "../index";
// entryPoint = "../build/ts.bundle.js";
// entryPoint = "../build/ts.es5.js";
// entryPoint = "../build/ts.es5.min.js";

const Srl = require(entryPoint);
const Gen = Srl.Generative;
const Algo = Srl.Algorithmic;
const Mod = Srl.Transform;
const Rand = Srl.Stochastic;
const Stat = Srl.Statistic;
const TL = Srl.Translate;
const Util = Srl.Utility;

const chart = require('asciichart');
var config = {
    offset: 3,
    padding: '        ',
	height: 10,
}

console.time('requires load');
console.timeEnd('requires load');
console.log();

/*
	Test criteria:
	- test for no argument
	- test for single argument
	- test for multiple arguments
	- test for negative values
	- test for strings vs numbers
*/

// fs.writeFileSync('test-plot.txt', p);

// let spr = Gen.spreadFloat(20, -3.14, 16.18);
// console.log(spr);
// console.log(Util.fold(spr).map(x => x.toFixed(3)));

/*
var markov = new Rand.MarkovChain();

var set = [0, 1, 1, 2, 1, 3, 2, 3, 1, 3, 0];
var set2 = [0, 7, 5, 7, 7, 9, 3, 3, 5, 0, 0, 1];

var melody = ['c', 'e', 'f', 'e', 'g', 'f', 'a', 'c'];
var melody2 = ['g', 'a', 'b', 'g', 'a', 'f', 'd', 'e'];

// train with an array of values
markov.train(melody);

// add more to the training
markov.train(melody2);

console.log(markov.table);
// console.log(JSON.stringify(markov.table));

// var mark2 = new Rand.MarkovChain(markov.table);
// console.log('chain 2', mark2.table);

// markov.state(2);
markov.state('c');
// markov.seed(58392);
markov.seed(31415);

console.log(markov.next());
console.log('result', markov.chain(10))

markov.clear();
console.log(markov.table);
*/

fullTest();

function fullTest(){
	console.time('Total Time');
	testSerial();
	testGen();
	testAlgo();
	testRand();
	testMod();
	testStat();
	testTranslate();
	testUtil();

	pagebreak("All Tests Passed");
	console.timeEnd('Total Time');
}

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

	test("Gen.spreadInclusive(5, 7, 19)");
	test("Gen.spreadInc(4, 10, 2)");
	
	test("Gen.spreadFloat(5, 2, 11)");
	test("Gen.spreadFloat(4, -1, 1)");
	test("Gen.spreadF(4, -2, 2)");
	
	test("Gen.spreadInclusiveFloat(9, -1, 1)");
	test("Gen.spreadIncF(9, -1, 1)");
	test("Gen.spreadInclusiveFloatExp(5, 0, 1, 2)");
	
	test("Gen.fill()");
	test("Gen.fill(10, 2, 15, 3, 20, 4)");

	test("Util.plot(Gen.sineFloat(16), {log: false, height: 5, data: true})");
	test("Gen.sineFloat(10, 1, -1, 1, 0.5)");
	// test("Gen.sin(8)");
	test("Util.plot(Gen.cosineFloat(16), {log: false, height: 5, data: true})");
	// test("Gen.cos(8)");

	test("Util.plot(Gen.sine(10), {log: false})");
	test("Gen.sine(12, 1, -1, 1)");
	test("Util.plot(Gen.sine(11, 4, 0, 7), {log: false})");

	test("Util.plot(Gen.cosine(7, 1.5), {log: false})");
}

function testAlgo(){
	pagebreak("Generative Complex");
	
	pagebreak("Euclid");
	test("Algo.euclid()");
	test("Algo.euclid(10, 3)");
	test("Algo.euclid(8, 5)");
	test("Algo.euclid(16, 9, 1)");
	test("Algo.euclid(16, 2)");
	
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
	test('Algo.fibonacci()');
	test("Algo.fibonacci(12)");
	test("Algo.fibonacci(2, 100, true)");
	
	test('Algo.pisano()');
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
	test("Rand.randomF(3, 0.2, 0.5)");

	test("Rand.seed(4827)");
	test("Rand.random(5, 2)");
	test("Rand.random(5, 0, 12)");

	test("Rand.seed(4827)");
	test("Rand.random(5, 2)");
	test("Rand.random(5, 0, 12)");

	test("Rand.seed(1618)");
	test("Rand.drunkFloat(5)");
	console.log(Util.plot(Rand.drunkFloat(5, 1), {height: 5}));
	
	test("Rand.drunk(10, 5, 0, 24)");
	console.log(Util.plot(Rand.drunk(10, 24, 0, 24), {height: 5}));

	test("Rand.drunk(10, 4, 0, 12, 6, false)");
	console.log(Util.plot(Rand.drunk(10, 4, 0, 12, 1, false), {height: 5}));

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

	let arr = [0, 9, 7, 3, 5, 0, -1];
	Rand.seed(3141);
	test("Rand.expand(30, [0, 9, 7, 3, 5, 0, -1])");

	test('Rand.seed(3141)');
	Util.plot(Rand.expand(30, [0, 9, 7, 3, 5, 0, -1]), { height: 10 });
	
	test("Rand.seed(6181)");
	console.log('Rand.expand(30, [0, 9, 7, 3, 5, 0, -1]')
	Util.plot(Rand.expand(30, [0, 9, 7, 3, 5, 0, -1]), { height: 10 });
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
	test("Mod.every([1, 1, 0, 1], 4, 5, 0, -1)");
	test("Mod.every([1, 0, 0, 1, 1], 1, 8, 0)");
	test("Mod.every([1, 0, 0, 1, 1], 1.5, 8, 0, 0.5)");
	test("Mod.every([3, 0, 7, 9, 11], 2, 7, 12)");
	
	test("Mod.filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [3, 8, 10])");
	test("Mod.filter([0, 1.618, 2, 3.14, 4], 3.14)");
	test("Mod.filter([0, 1, 'foo', 'bar', 2, 3], ['1', 'foo'])");
	
	test("Mod.filterType([0, 1, [1, 2], 'foo', 2, null, true, {bar: 5}, 3.14, undefined], 'number')");

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
	test("Mod.palindrome([0, [1, 11], 2, 3], true)");
	test("Mod.palindrome([0, 1, 2, 3], 1)");


	test("Mod.repeat([10, 20, 30], 3)");
	test("Mod.repeat([10, 20, 30, 40], [1, 4, 2, 0])");
	test("Mod.repeat(['kick', 'hat'], [1, 4])");
	test("Mod.repeat([[10, 20], [30, 40, 50]], [2, 3])");

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

	test("Mod.sort([-10, 8, 6, -12, -6, -7, 2, 4, 3, 11], -1)");
	test("Mod.sort([10, 3.14, 'snare', 'kick', 5, -6, 'hat'])");
	test("Mod.sort([-10, 8, 6, -12, -6, -7, 2, 4, 3, 11])");

	// var sprArr1 = [12, 19, 24];
	// var sprArr2 = [1, 0, 0, 1, 1, 0, 1, 0, 0.2];
	// console.log(Mod.spray(sprArr1, sprArr2));
	// console.log(sprArr1, sprArr2);
	test("Mod.spray()");
	test("Mod.spray([12, 19, 24], [1, 0, 0, 1, 1, 0, 1, 0.3, 0])");

	test("Mod.stretch([0, 12, 3, 7], 15)");
	Util.plot(Mod.stretch([0, 12, 3, 7], 30), { height: 10 });
	Util.plot(Mod.stretch([0, 12, 3, 7], 10, 'none'), { height: 5 });

	// var unArr = [5, 7, 5, 0, 12, 7, 5];
	// console.log(Mod.unique(unArr));
	// console.log(unArr);
	test("Mod.unique()");
	test("Mod.unique([5, 7, 5, 0, 12, 7, 5])");
}

function testStat(){
	pagebreak("Statistic");

	test("Stat.sort([-10, 8, 6, -12, -6, -7, 2, 4, 3, 11], -1)");
	test("Stat.sort([10, 3.14, 'foo', 'bar', 5, -6, 'foobar'])");
	test("Stat.sort([-10, 8, 6, -12, -6, -7, 2, 4, 3, 11])");

	test("Stat.mean([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, 1, -3])");
	test("Stat.average([1, 2, 3, 4, 5, 6, 7, 8, 9])");
	test("Stat.average([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, 1, -3])");

	test("Stat.median()");
	test("Stat.median([1, 5, 6, 9, 13])");
	test("Stat.median([1, 5, 6, 'foo', 'bar', 13,])");
	
	test("Stat.center([1, 5, 11])");
	test("Stat.center([1, 7, 4, 2, 9, 5])");
	test("Stat.center([1, 7, 4, 2, 9, 5, 'foo', 'bar', true, true])");
	
	test("Stat.common([8, 4, 3, 11, 9, 0, 11, 2, 10, 5, 11, 0])");
	test("Stat.common([8, 4, 3, 9, 9, 0, 2, 10, 5, 11, 0, 11])");
	test("Stat.common([8, 4, 3, 'foo', 'foo', 0, 2, 10, 5, 11, 0, 11])");

	test("Stat.maximum([-38, -53, -6, 33, 88, 32, -8, 73])");
	test("Stat.minimum([-38, -53, -6, 33, 88, 32, -8, 73])");
	test("Stat.minimum([-38, -53, -6, 'foo', 33, 'bar'])");

	test("Stat.change([0, 3, 7, 0, 12, 9, 5, 7])");
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
	test("TL.mton([48, 55, 51, 43])");

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

	test("TL.setTempo(120)");
	test("TL.divisionToMs()");
	test("TL.dtoms(['1/4', '1/8', '3/16', '1/4', '1/6', '2'])");
	test("TL.dtoms(['1/4', '1/8', '3/16', '1/4', '1/6', '2'], 100)");
	test("TL.dtoms([0.25, 0.125, 0.1875, 0.25, 0.16667, 2])");
	
	test("TL.dtor(['1/4', '1/8', '3/16', '1/4', '1/6', '2'])");

	console.log("var scala = new TL.Scala()");
	var scl = new TL.Scala();

	scl.parse(fs.readFileSync('data/scl/12-TET.scl', 'utf8'));
	scl.tune(261.6255653);
	scl.center(60);

	console.log(scl.names.slice(0, 10));
	console.log('//=>', scl.data);

	console.log('scl.scalaToFreq([60, 63, 67, 69, 72, 81, 36, 48])')
	console.log('//=>', scl.stof([60, 63, 67, 69, 72, 81, 36, 48]).map(x => x.toFixed(2)));

	console.log(scl.search({ cents: ['4/3', '5/4', '11/9'], size: 11 }));
}

function testUtil(){
	pagebreak("Utility");

	test("Util.mod(7, 3)");
	test("Util.mod([-2, 4, 3, 7], 5)");

	test("Util.bound(10.34, 0, 3.14)");
	test("Util.bound([-2, 4, 3, 7], 1, 5)");

	test("Util.fold([-1, 0, 1, 2, 3, 4, 5], 0, 3)");
	// test("Util.fold(Gen.spreadFloat(10, -5, 5), 0, 1)");
	// test("Util.fold(Gen.spreadFloat(20, -4, 6), -2, 3)");
	// test("Util.fold(Gen.sineFloat(20, 1, -5, 29), 0, 24)");

	test("Util.map(0.5, 0, 1, 0, 2)");
	test("Util.map(0.5, 0, 1, 0, 2, 0.5)");
	test("Util.map([0, 1, 2, 3, 4], 0, 4, -1, 1)");

	test("Util.add(5, 2)");
	test("Util.add([0, 3, 7], 2)");
	test("Util.add([1, 2, 3, 4], [1, 2, 3])");
	test("Util.add([1, 2], [1, 2, 3, 4])");
	
	test("Util.sub(5, 2)");
	test("Util.sub([0, 3, 7], 2)");
	test("Util.sub([1, 2, 3, 4], [1, 2, 3])");
	test("Util.sub([1, 2], [1, 2, 3, 4])");
	
	test("Util.mul(5, 2)");
	test("Util.mul([0, 3, 7], 2)");
	test("Util.mul([1, 2, 3, 4], [1, 2, 3])");
	test("Util.mul([1, 2], [1, 2, 3, 4])");
	
	test("Util.div(5, 2)");
	test("Util.div([0, 3, 7], 2)");
	test("Util.div([1, 2, 3, 4], [1, 2, 3])");
	test("Util.div([1, 2], [1, 2, 3, 4])");
}

function test(f){
	// print the written function to console
	console.log(f+";");
	// evaluate the function and print results
	let r = eval(f);
	if (r === undefined){
		r = "void return";
	}
	console.log("//=>", r, "\n");
}

function benchMark(f, iterations=10000){
	console.time('benchmark time');
	console.log(f+";");

	for (var i in iterations){
		eval(f);
	}
	console.timeEnd('benchmark time');
}

function pagebreak(n){
	console.log("====================================");
	console.log("=> \t", n);
	console.log("====================================\n");
}
