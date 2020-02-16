
const Srl = require("../index");
const Gen = require("../index").Generative;
const Algo = require("../index").Algorithmic;
const Mod = require("../index").Transform;
const Rand = require("../index").Stochastic;
const TsL = require("../index").Translate;
const Util = require("../index").Utility;

/*
	Test criteria:
	- test for no argument
	- test for single argument
	- test for multiple arguments
	- test for negative values
*/

testSerial();
testGen();
testAlgo();
testRand();
testMod();
testTranslate();
testUtil();

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
}

function testAlgo(){
	pagebreak("Generative Complex");

	test("Algo.euclid()");
	test("Algo.euclid(10, 3)");
	test("Algo.euclid(8, 5)");
	test("Algo.euclid(16, 9, 1)");

	test("Algo.hexBeat();");
	test("Algo.hexBeat('f898');");
	test("Algo.hexBeat('a9d2');");
	test("Algo.hexBeat(573);");
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

	test("TsL.midiToNote(48);");
	test("TsL.mton([60, 67, 72]);");

	test("TsL.noteToMidi('c2');");
	test("TsL.noteToMidi(['c2','d2','f#2']);");
	test("TsL.ntom(['f-1','bb3','g#2']);");

	test("TsL.midiToFreq(60);");
	test("TsL.mtof([60, 67, 72]);");

	test("TsL.noteToFreq('c2');");
	test("TsL.noteToFreq(['c2','d2','f#2']);");
	test("TsL.ntof(['f-1','bb3','g###2']);");

	test("TsL.midiToNote(Mod.palindrome(Gen.spread(3, 48, 60)));");

	test("TsL.semiToMidi(0);");
	test("TsL.semiToMidi([0, 2, 7, -3, -12, 12]);");
	test("TsL.stom([0, 2, 7, -3, -12, 12], 3);");

	test("TsL.semiToFreq(0);");
	test("TsL.semiToFreq([0, 2, 7, -3, -12, 12]);");
	test("TsL.stof([0, 2, 7, -3, -12, 12], 3);");

	test("TsL.midiToSemi(48);");
	test("TsL.midiToSemi([48, 50, 55, 45, 36, 60]);");
	test("TsL.mtos([48, 50, 55, 45, 36, 60], 3);");

	test("TsL.scaleNames();");
	test("TsL.setScale('harmonic minor', 'd');");
	test("TsL.setScale('prometheus', 'A#');");
	test("TsL.setScale('minor pentatonic', 'd');");
	test("TsL.getScale();");
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
	console.log(f);
	// evaluate the function and print results
	r = eval(f);
	if (r === undefined){
		r = "void return";
	}

	console.log("=> ", r, "\n");
}

function pagebreak(n){
	console.log("====================================");
	console.log("=> \t", n);
	console.log("====================================\n");
}