
const exp = require('constants');
const fs = require('fs');

// test with different builds
let entryPoint = "../index";
// entryPoint = "../build/ts.bundle.js";
// entryPoint = "../build/ts.es5.js";
let es5build = "../build/ts.es5.min.js";

// load library from index.js;
let TS = require(entryPoint);
let Gen, Algo, Mod, Rand, Stat, TL, Util;

// run full test with ./index.js
fullTest(TS);

// reload library with es5.min.js build
TS = require(es5build);

// and run full test with es5.min.js build;
fullTest(TS);

/*
	Test criteria:
	- test for no argument
	- test for single argument
	- test for multiple arguments
	- test for negative values
	- test for strings vs numbers
*/

function fullTest(Srl){
	Gen = Srl.Generative;
	Algo = Srl.Algorithmic;
	Mod = Srl.Transform;
	Rand = Srl.Stochastic;
	Stat = Srl.Statistic;
	TL = Srl.Translate;
	Util = Srl.Utility;

	// testSerial();
	testGenerative();
	testAlgorithmic();
	testStochastic();
	testTransform();
	testStatistic();
	testTranslate();
	testUtility();
}

// Test different sections of the package
function testSerial(){
	pagebreak("Serial");

	test("Srl.Generative.spread(10)");
	test("Srl.Algorithmic.euclid(5, 3, 1)");
	test("Srl.Transform.lace([0, 1, 2], [3, 4, 5])");
}

function testGenerative(){
	test("Gen.spread()", () => {
		expect(Gen.spread()).toStrictEqual([0]);
	})
	test("Gen.spread(6)", () => {
		expect(Gen.spread(6)).toStrictEqual([0, 1, 2, 3, 4, 5]);
	});
	test("Gen.spread([1,2,3,4,5,6])", () => {
		expect(Gen.spread([1,2,3,4,5,6])).toStrictEqual([0, 1, 2, 3, 4, 5]);
	});
	test("Gen.spread(6, 12)", () => {
		expect(Gen.spread(6, 12)).toStrictEqual([0, 2, 4, 6, 8, 10]);
	});
	test("Gen.spread(6, -3, 12)", () => {
		expect(Gen.spread(6, -3, 12)).toStrictEqual([-3, -1, 2, 4, 7, 9]);
	});
	test("Gen.spread(6, -12, 3)", () => {
		expect(Gen.spread(6, -12, 3)).toStrictEqual([-12, -10, -7, -5, -2, 0]);
	});

	test("Gen.spreadFloat()", () => {
		expect(Gen.spreadFloat()).toStrictEqual([0]);
	});
	test("Gen.spreadFloat(4)", () => {
		expect(Gen.spreadFloat(4)).toStrictEqual([0, 0.25, 0.5, 0.75]);
	});
	test("Gen.spreadFloat([1,2,3,4])", () => {
		expect(Gen.spreadFloat([1,2,3,4])).toStrictEqual([0, 0.25, 0.5, 0.75]);
	});
	test("Gen.spreadFloat(4, 2)", () => {
		expect(Gen.spreadFloat(4, 2)).toStrictEqual([0, 0.5, 1, 1.5]);
	});
	test("Gen.spreadFloat(4, -1, 1)", () => {
		expect(Gen.spreadFloat(4, -1, 1)).toStrictEqual([-1, -0.5, 0, 0.5]);
	});
	
	test("Gen.spreadInc()", () => {
		expect(Gen.spreadInc()).toStrictEqual([0]);
	});
	test("Gen.spreadInc(6)", () => {
		expect(Gen.spreadInc(6)).toStrictEqual([0, 1, 2, 3, 4, 6]);
	});
	test("Gen.spreadInc([1,2,3,4,5,6])", () => {
		expect(Gen.spreadInc([1,2,3,4,5,6])).toStrictEqual([0, 1, 2, 3, 4, 6]);
	});
	test("Gen.spreadInc(6, 12)", () => {
		expect(Gen.spreadInc(6, 12)).toStrictEqual([0, 2, 4, 7, 9, 12]);
	});
	test("Gen.spreadInc(6, -3, 12)", () => {
		expect(Gen.spreadInc(6, -3, 12)).toStrictEqual([-3, 0, 3, 6, 9, 12]);
	});
	test("Gen.spreadInc(6, -12, 3)", () => {
		expect(Gen.spreadInc(6, -12, 3)).toStrictEqual([-12, -9, -6, -3, 0, 3]);
	});
	
	test("Gen.spreadIncF()", () => {
		expect(Gen.spreadIncF()).toStrictEqual([0]);
	});
	test("Gen.spreadIncF(5)", () => {
		expect(Gen.spreadIncF(5)).toStrictEqual([0, 0.25, 0.5, 0.75, 1]);
	});
	test("Gen.spreadIncF([1,2,3,4,5])", () => {
		expect(Gen.spreadIncF([1,2,3,4,5])).toStrictEqual([0, 0.25, 0.5, 0.75, 1]);
	});
	test("Gen.spreadIncF(5, 2)", () => {
		expect(Gen.spreadIncF(5, 2)).toStrictEqual([0, 0.5, 1, 1.5, 2]);
	});
	test("Gen.spreadIncF(5, -1, 1)", () => {
		expect(Gen.spreadIncF(5, -1, 1)).toStrictEqual([-1, -0.5, 0, 0.5, 1]);
	});

	test("Gen.spreadExp(10, 0, 10, 2)", () => {
		expect(Gen.spreadExp(10, 0, 10, 2)).toStrictEqual([0, 0, 0, 0, 1, 2, 3, 4, 6, 8]);
	});
	test("Gen.spreadExp(new Array(10), 0, 10, 2)", () => {
		expect(Gen.spreadExp(new Array(10), 0, 10, 2)).toStrictEqual([0, 0, 0, 0, 1, 2, 3, 4, 6, 8]);
	});
	test("Gen.spreadIncExp(10, 0, 10, 2)", () => {
		expect(Gen.spreadIncExp(10, 0, 10, 2)).toStrictEqual([0, 0, 0, 1, 1, 3, 4, 6, 7, 10]);
	});
	test("Gen.spreadExpF(12, 0, 10, 0.5)", () => {
		expect(Gen.spreadExpF(12, 0, 10, 0.5)).toStrictEqual([0, 2.8867513459481287, 4.08248290463863, 5, 5.773502691896257, 6.454972243679028, 7.0710678118654755, 7.637626158259733, 8.16496580927726, 8.660254037844386, 9.128709291752768, 9.574271077563381]);
	});
	test("Gen.spreadIncExpF(12, 0, 10, 0.5)", () => {
		expect(Gen.spreadIncExpF(12, 0, 10, 0.5)).toStrictEqual([0, 3.0151134457776365, 4.264014327112209, 5.222329678670935, 6.030226891555273, 6.74199862463242, 7.385489458759964, 7.977240352174656, 8.528028654224418, 9.04534033733291, 9.534625892455924, 10]);
	});
	test("Gen.spreadIncExpF(new Array(12), 0, 10, 0.5)", () => {
		expect(Gen.spreadIncExpF(new Array(12), 0, 10, 0.5)).toStrictEqual([0, 3.0151134457776365, 4.264014327112209, 5.222329678670935, 6.030226891555273, 6.74199862463242, 7.385489458759964, 7.977240352174656, 8.528028654224418, 9.04534033733291, 9.534625892455924, 10]);
	});

	test("Gen.fill()", () => {
		expect(Gen.fill()).toStrictEqual([0]);
	});
	test("Gen.fill(10, 2, 15, 3, 20, 4)", () => {
		expect(Gen.fill(10, 2, 15, 3, 20, 4)).toStrictEqual([10, 10, 15, 15, 15, 20, 20, 20, 20]);
	});
	test("Gen.fill([10, 20], 2, [15, [5, 3]], 3)", () => {
		expect(Gen.fill([10, 20], 2, [15, [5, 3]], 3)).toStrictEqual([[10, 20], [10, 20], [15, [5, 3]], [15, [5, 3]], [15, [5, 3]]]);
	});
	test("Gen.fill([10, 2, 15, 3, 20, 4])", () => {
		expect(Gen.fill([10, 2, 15, 3, 20, 4])).toStrictEqual([10, 10, 15, 15, 15, 20, 20, 20, 20]);
	});

	test("Gen.sine(8, 1, -5, 5)", () => {
		expect(Gen.sine(8, 1, -5, 5)).toStrictEqual([0, 3, 5, 3, 0, -3, -5, -3,]);
	})
	test("Gen.sine(Array(8), 1, -5, 5)", () => {
		expect(Gen.sine(Array(8), 1, -5, 5)).toStrictEqual([0, 3, 5, 3, 0, -3, -5, -3,]);
	})
	test("Gen.cos(30, Gen.sinF(30, 2), -5, 5)", () => {
		expect(Gen.cosine(8, Gen.sinF(8, 2), -5, 5)).toStrictEqual([ 5, 3, 5, -3, 5, -3, 5, 3,]);
	})
	
	test("Gen.saw(8, 8.5)", () => {
		expect(Gen.saw(8, 8.5)).toStrictEqual([ 0, 0, 1, 2, 3, 3, 4, 5,]);
	});
	test("Gen.saw(Array(8), 8.5)", () => {
		expect(Gen.saw(Array(8), 8.5)).toStrictEqual([ 0, 0, 1, 2, 3, 3, 4, 5,]);
	});
	test("Gen.sawF(8, 2.5)", () => {
		expect(Gen.sawF(8, 2.5)).toStrictEqual([ -1, -0.375, 0.25, 0.875, -0.5, 0.125, 0.75, -0.625,]);
	});
	test("Gen.saw(8, Gen.sinF(8, 2), 0, 12))", () => {
		expect(Gen.saw(8, Gen.sinF(8, 2), 0, 12)).toStrictEqual([0, 1, 0, 7, 11, 7, 0, 1,]);
	});

	test("Gen.square(8, 3, 0, 12, 0.8)", () => {
		expect(Gen.square(8, 3, 0, 12, 0.8)).toStrictEqual([12, 12, 12, 12, 12, 0, 12, 12]);
	});
	test("Gen.square(Array(8), 3, 0, 12, 0.8)", () => {
		expect(Gen.square(Array(8), 3, 0, 12, 0.8)).toStrictEqual([12, 12, 12, 12, 12, 0, 12, 12]);
	});
	test("Gen.squareF(8, 4, 0, 1, 0.2)", () => {
		expect(Gen.squareF(8, 4, 0, 1, 0.2)).toStrictEqual([1, 0, 1, 0, 1, 0, 1, 0]);
	});
	test("Gen.squareF(8, Gen.sinF(8, 2, 1, 5))", () => {
		expect(Gen.squareF(8, Gen.sinF(8, 2, 1, 5))).toStrictEqual([1, 0, 0, 1, 1, 1, 1, 0]);
	});

	test("Gen.binary(2)", () => {
		expect(Gen.binary(2)).toStrictEqual([1, 0]);
	});
	test("Gen.binary(358)", () => {
		expect(Gen.binary(358)).toStrictEqual([1, 0, 1, 1, 0, 0, 1, 1, 0]);
	});
	test("Gen.binary(4, 3, 5)", () => {
		expect(Gen.binary(4, 3, 5)).toStrictEqual([1, 0, 0, 1, 1, 1, 0, 1]);
	});
	test("Gen.binary([-4, 4])", () => {
		expect(Gen.binary([-4, 4])).toStrictEqual([0, 1, 0, 0]);
	});

	test("Gen.space(2)", () => {
		expect(Gen.space(2)).toStrictEqual([1, 0]);
	});
	test("Gen.space(2, 3, 2)", () => {
		expect(Gen.space(2, 3, 2)).toStrictEqual([1, 0, 1, 0, 0, 1, 0]);
	});
	test("Gen.space([4, 2, 0])", () => {
		expect(Gen.space([4, 2, 0])).toStrictEqual([1, 0, 0, 0, 1, 0, 0]);
	});
	test("Gen.space([4, [2, 0]])", () => {
		expect(Gen.space([4, [2, 0]])).toStrictEqual([1, 0, 0, 0, 1, 0, 0]);
	});
}

function testAlgorithmic(){
	test("Algo.euclid()", () => { 
		expect(Algo.euclid()).toStrictEqual([1, 0, 1, 0, 1, 0, 1, 0]); 
	});
	test("Algo.euclid(8, 5)", () => {
		expect(Algo.euclid(8, 5)).toStrictEqual([1, 0, 1, 1, 0, 1, 1, 0]);
	});
	test("Algo.euclid(Array(8), Array(5))", () => {
		expect(Algo.euclid(Array(8), Array(5))).toStrictEqual([1, 0, 1, 1, 0, 1, 1, 0]);
	});
	test("Algo.euclid(8, 3, 1)", () => {
		expect(Algo.euclid(8, 3, 1)).toStrictEqual([ 0, 1, 0, 0, 1, 0, 0, 1])
	});

	test("Algo.fastEuclid()", () => {
		expect(Algo.fastEuclid()).toStrictEqual([1, 0, 1, 0, 1, 0, 1, 0]);
	});
	test("Algo.fastEuclid(8, 5)", () => {
		expect(Algo.fastEuclid(8, 5)).toStrictEqual([ 1, 0, 1, 0, 1, 1, 0, 1 ]);
	});
	test("Algo.fastEuclid(Array(8), Array(5))", () => {
		expect(Algo.fastEuclid(Array(8), Array(5))).toStrictEqual([ 1, 0, 1, 0, 1, 1, 0, 1 ]);
	});
	test("Algo.fastEuclid(8, 3, 1)", () => {
		expect(Algo.fastEuclid(8, 3, 1)).toStrictEqual([ 0, 1, 0, 0, 1, 0, 0, 1 ]);
	});
	
	test("Algo.hexBeat()", () => {
		expect(Algo.hexBeat()).toStrictEqual([ 1, 0, 0, 0 ]);
	});
	test("Algo.hexBeat('f898')", () => {
		expect(Algo.hexBeat('f898')).toStrictEqual([1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0, 0]);
	});
	test("Algo.hexBeat('a9d2')", () => {
		expect(Algo.hexBeat('a9d2')).toStrictEqual([1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0]);
	});
	test("Algo.hexBeat(573)", () => {
		expect(Algo.hexBeat(573)).toStrictEqual([0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 1, 1]);
	});
	test("Algo.hexBeat(['32fa'])", () => {
		expect(Algo.hexBeat(['32fa'])).toStrictEqual([0, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0]);
	});
	test("Algo.hexBeat(['-zxyt'])", () => {
		expect(Algo.hexBeat(['-zxyt'])).toStrictEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
	});
	test("Algo.hexBeat(0x89fc)", () => {
		expect(Algo.hexBeat(0x89fc)).toStrictEqual([0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0]);
	});
	

	test("Algo.linden()", () => {
		expect(Algo.linden()).toStrictEqual([ 1, 0, 1, 1, 0 ]);
	});
	// koch curve
	test("Algo.linden('F', 2, {F: 'F+F-F-F+F'})", () => {
		expect(Algo.linden('F', 2, {F: 'F+F-F-F+F'})).toStrictEqual('F+F-F-F+F+F+F-F-F+F-F+F-F-F+F-F+F-F-F+F+F+F-F-F+F');
	});
	// cantor set
	test("Algo.linden('A', 3, {A: 'ABA', B: 'BBB'})", () => {
		expect(Algo.linden('A', 3, {A: 'ABA', B: 'BBB'})).toStrictEqual('ABABBBABABBBBBBBBBABABBBABA');
	});
	// cantor set as 0's and 1's in an array ruleset
	test("Algo.linden(1, 3, {1: [1, 0, 1], 0: [0, 0, 0]})", () => {
		expect(Algo.linden(1, 3, {1: [1, 0, 1], 0: [0, 0, 0]})).toStrictEqual([1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1]);
	});
	// Thue-Morse sequence
	test("Algo.linden('A', 4, {A: 'AB', B: 'BA'})", () => {
		expect(Algo.linden('A', 4, {A: 'AB', B: 'BA'})).toStrictEqual('ABBABAABBAABABBA');
	});
	// Thue-Morse sequence as 0's and 1's
	test("Algo.linden(1, 4, {0: [0, 1], 1: [1, 0]})", () => {
		expect(Algo.linden(1, 4, {0: [0, 1], 1: [1, 0]})).toStrictEqual([1, 0, 0, 1, 0, 1, 1, 0, 0, 1, 1, 0, 1, 0, 0, 1]);
	});
	// Sierpinski Triangle
	test("Algo.linden('F-G-G', 2, {'F': 'F−G+F+G−F', 'G' : 'GG'})", () => {
		expect(Algo.linden('F-G-G', 2, {'F': 'F−G+F+G−F', 'G' : 'GG'})).toStrictEqual('F−G+F+G−F−GG+F−G+F+G−F+GG−F−G+F+G−F-GGGG-GGGG');
	});
	// usage with integers and arrays
	test("Algo.linden([1, 0, 1], 3, {0: [1], 1: [0, 1]})", () => {
		expect(Algo.linden([1, 0, 1], 3, {0: [1], 1: [0, 1]})).toStrictEqual([0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1]);
	});
	// more complex rules for semitone melodies (see above for rules)
	test("Algo.linden(0, 3, complexRules)", () => {
		// Global vars for tests
		var complexRules = {
			0: [0, 3, 7],
			3: [-1, 0],
			7: [12, 19, 0],
			12: [12, 0, 0, 5], 
			5: [0, -3, 0] }

		expect(Algo.linden(0, 3, complexRules)).toStrictEqual([0, 3, 7, -1, 0, 12, 19, 0, -1, 0, 3, 7, 12, 0, 0, 5, 19, 0, 3, 7]);
	});

	test('Algo.collatz()', () => {
		expect(Algo.collatz()).toStrictEqual([ 1, 2, 4, 8, 16, 5, 10, 3, 6 ]);
	});
	test('Algo.collatz(7)', () => {
		expect(Algo.collatz(7)).toStrictEqual([ 1, 2, 4, 8, 16, 5, 10, 20, 40, 13, 26, 52, 17, 34, 11, 22 ]);
	});
	test('Algo.collatz(314)', () => {
		expect(Algo.collatz(314)).toStrictEqual([
			1,   2,   4,  8,  16,   5,  10,  20,  40,
		   13,  26,  52, 17,  34,  11,  22,  44,  88,
		   29,  58,  19, 38,  76, 152, 304, 101, 202,
		   67, 134, 268, 89, 178,  59, 118, 236, 472,
		  157
		]);
	});
	
	test('Algo.collatzMod()', () => {
		expect(Algo.collatzMod()).toStrictEqual([ 1, 0, 0, 0, 0, 1, 0, 1, 0 ]);
	});
	test('Algo.collatzMod(7, 12)', () => {
		expect(Algo.collatzMod(7, 12)).toStrictEqual([ 1, 2, 4, 8, 4, 5, 10, 8, 4, 1, 2, 4, 5, 10, 11, 10 ]);
	});
	test('Algo.collatzMod(314, 5)', () => {
		expect(Algo.collatzMod(314, 5)).toStrictEqual([
			1, 2, 4, 3, 1, 0, 0, 0, 0, 3,
			1, 2, 2, 4, 1, 2, 4, 3, 4, 3,
			4, 3, 1, 2, 4, 1, 2, 2, 4, 3,
			4, 3, 4, 3, 1, 2, 2
		  ]);
	});

	test('Algo.fibonacci()', () => {
		expect(Algo.fibonacci()).toStrictEqual([0]);
	});
	test("Algo.fibonacci(12)", () => {
		expect(Algo.fibonacci(12)).toStrictEqual([ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]);
	});
	test("Algo.fibonacci(2, 100, true)", () => {
		expect(Algo.fibonacci(2, 100, true)).toStrictEqual([ '354224848179261915075', '573147844013817084101' ]);
	});
	
	test('Algo.pisano()', () => {
		expect(Algo.pisano()).toStrictEqual([ 0, 1, 1, 2, 3, 5, 8, 1, 9, 10, 7, 5, 0, 5, 5, 10, 3, 1, 4, 5, 9, 2, 11, 1 ]);
	});
	test("Algo.pisano(7)", () => {
		expect(Algo.pisano(7)).toStrictEqual([ 0, 1, 1, 2, 3, 5, 1, 6, 0, 6, 6, 5, 4, 2, 6, 1 ]);
	});
	// test("Algo.pisano(Array(7))", () => {
	// 	expect(Algo.pisano(Array(7))).toStrictEqual([ 0, 1, 1, 2, 3, 5, 1, 6, 0, 6, 6, 5, 4, 2, 6, 1 ]);
	// });
	test("Algo.pisano(4, 10)", () => {
		expect(Algo.pisano(4, 10)).toStrictEqual([ 0, 1, 1, 2, 3, 1, 0, 1, 1, 2 ]);
	});

	test("Algo.pell(10)", () => {
		expect(Algo.pell(10)).toStrictEqual([ 0, 1, 2, 5, 12, 29, 70, 169, 408, 985 ]);
	});
	test("Algo.threeFibonacci(10)", () => {
		expect(Algo.threeFibonacci(10)).toStrictEqual([ 0, 1, 3, 10, 33, 109, 360, 1189, 3927, 12970 ]);
	});
	test("Algo.lucas(10)", () => {
		expect(Algo.lucas(10)).toStrictEqual([ 2, 1, 3, 4, 7, 11, 18, 29, 47, 76 ]);
	});

	test("Algo.nbonacci(10, 2, 1, 1)", () => {
		expect(Algo.nbonacci(10, 2, 1, 1)).toStrictEqual(Algo.lucas(10));
	});
	test("Algo.nbonacci(10, 0, 1, 1)", () => {
		expect(Algo.nbonacci(10, 0, 1, 1)).toStrictEqual(Algo.fibonacci(10));
	});


	test('Algo.infinitySeries()', () => {
		expect(Algo.infinitySeries()).toStrictEqual([  0,  1, -1, 2, 1, 0, -2,  3, -1, 2, 0, 1, 2, -1, -3, 4 ]);
	});
	test('Algo.infinitySeries(16, [0, 3])', () => {
		expect(Algo.infinitySeries(16, [0, 3])).toStrictEqual([ 0,  3, -3,  6, 3, 0, -6,  9, -3,  6, 0, 3, 6, -3, -9, 12]);
	});
	test('Algo.infinitySeries(Array(16), [0, 3])', () => {
		expect(Algo.infinitySeries(Array(16), [0, 3])).toStrictEqual([ 0,  3, -3,  6, 3, 0, -6,  9, -3,  6, 0, 3, 6, -3, -9, 12]);
	});
	test('Algo.infSeries(8, [0, 1], 120)', () => {
		expect(Algo.infinitySeries(8, [0, 1], 120)).toStrictEqual([ -4,  5,  3, -2, 5, -4, -6,  7]);
	});

	test('Algo.Automaton()', () => {
		let ca = new Algo.Automaton();
		ca.rule(122);	
		Rand.seed(314);
		ca.feed(Rand.coin(10));

		expect(ca.next()).toStrictEqual([0, 1, 1, 1, 0, 1, 1, 1, 0, 0]);
		expect(ca.next()).toStrictEqual([1, 1, 0, 1, 1, 1, 0, 1, 1, 0]);
		expect(ca.next()).toStrictEqual([1, 1, 1, 1, 0, 1, 1, 1, 1, 1]);
		expect(ca.next()).toStrictEqual([0, 0, 0, 1, 1, 1, 0, 0, 0, 0]);
		expect(ca.next()).toStrictEqual([0, 0, 1, 1, 0, 1, 1, 0, 0, 0]);
	});
}

function testStochastic(){
	test("Rand.seed(19374)", () => {
		expect(Rand.seed(19374)).toBe(19374);
	});
	test("Rand.getSeed()", () => {
		expect(Rand.getSeed()).toBe(19374);
	});
	test("Rand.randomFloat(3, -1, 1)", () => {
		expect(Rand.randomFloat(3, -1, 1)).toStrictEqual([ 0.6291111850577886, 0.15153786227276944, 0.32814801081039646 ]);
	});
	test("Rand.randomF(3, 0.2, 0.5)", () => {
		expect(Rand.randomF(3, 0.2, 0.5)).toStrictEqual([ 0.29801793054336634, 0.28391363035769457, 0.3928823791544367 ]);
	});
	test("Rand.random(5, 2)", () => {
		Rand.seed(4827);
		expect(Rand.random(5, 2)).toStrictEqual([ 1, 0, 1, 1, 0 ]);
	});
	test("Rand.random(5, 0, 12)", () => {
		expect(Rand.random(5, 0, 12)).toStrictEqual([ 11, 8, 4, 10, 1 ]);
	});
	test("Rand.random([1,2,3,4,5], 2)", () => {
		Rand.seed(4827);
		expect(Rand.random([1,2,3,4,5], 2)).toStrictEqual([ 1, 0, 1, 1, 0 ]);
	});
	
	test("Rand.random(5, 2)", () => {
		Rand.seed(7632);
		expect(Rand.random(5, 2)).toStrictEqual([ 0, 1, 1, 1, 1 ]);
	});
	test("Rand.random(5, 0, 12)", () => {
		expect(Rand.random(5, 0, 12)).toStrictEqual([ 7, 1, 7, 10, 9 ]);
	});
	
	test("Rand.drunkFloat(5)", () => {
		Rand.seed(1618);
		expect(Rand.drunkFloat(5)).toStrictEqual([ 0.49305378228860675, 0.4599542055791346, 0.8460817983354717, 0.9639116027672727, 0.4009600948886277 ]);
	});
	test("Rand.drunk(10, 5, 0, 24)", () => {
		expect(Rand.drunk(10, 5, 0, 24)).toStrictEqual([ 15, 14, 16, 19, 15, 17, 13, 17, 16, 18 ]);
	});
	test("Rand.drunk(10, 4, 0, 12, 6, false)", () => {
		expect(Rand.drunk(10, 4, 0, 12, 6, false)).toStrictEqual([4,  6,  2,  1, -3, -2, -2, -4, -2, -2 ])
	});
	test("Rand.drunkFloat([1,2,3,4,5])", () => {
		Rand.seed(1618);
		expect(Rand.drunkFloat([1,2,3,4,5])).toStrictEqual([ 0.49305378228860675, 0.4599542055791346, 0.8460817983354717, 0.9639116027672727, 0.4009600948886277 ]);
	});

	test("Rand.coin(5)", () => {
		Rand.seed(3141);
		expect(Rand.coin(5)).toStrictEqual([ 0, 1, 0, 0, 1 ]);
	});

	test("Rand.dice(5)", () => {
		expect(Rand.dice(5)).toStrictEqual([ 3, 6, 6, 4, 3 ]);
	});
	
	test("Rand.coin([1,2,3,4,5])", () => {
		Rand.seed(3141);
		expect(Rand.coin([1,2,3,4,5])).toStrictEqual([ 0, 1, 0, 0, 1 ]);
	});

	test("Rand.dice([1,2,3,4,5])", () => {
		expect(Rand.dice([1,2,3,4,5])).toStrictEqual([ 3, 6, 6, 4, 3 ]);
	});

	test("Rand.shuffle()", () => {
		expect(Rand.shuffle()).toStrictEqual([0]);
	});
	test("Rand.shuffle([0, 5, 7, 12])", () => {
		Rand.seed(1473);
		expect(Rand.shuffle([0, 5, 7, 12])).toStrictEqual([ 12, 5, 7, 0 ]);
	});
	test("Rand.shuffle([0, 5, 7, 12])", () => {
		expect(Rand.shuffle([0, 5, 7, 12])).toStrictEqual([ 7, 12, 0, 5 ]);
	});

	test("Rand.twelveTone()", () => {
		Rand.seed(4923);
		expect(Rand.twelveTone()).toStrictEqual([ 11, 0, 8, 2, 4, 9, 1, 6, 3, 5, 7, 10 ]);
	});
	test("Rand.twelveTone()", () => {
		expect(Rand.twelveTone()).toStrictEqual([ 2, 10, 4, 11, 7, 9, 6, 0,  8, 1, 3, 5 ]);
	});

	test("Rand.clave()", () => {
		Rand.seed(7483);
		expect(Rand.clave()).toStrictEqual([ 1, 0, 1, 0, 0, 1, 0, 1]);
	});
	test("Rand.clave([1,2,3,4,5,6,7,8])", () => {
		Rand.seed(7483);
		expect(Rand.clave([1,2,3,4,5,6,7,8])).toStrictEqual([ 1, 0, 1, 0, 0, 1, 0, 1]);
	});
	test("Rand.clave(5)", () => {
		expect(Rand.clave(5)).toStrictEqual([ 1, 0, 0, 1, 0 ]);
	});
	test("Rand.clave(8, 4)", () => {
		expect(Rand.clave(8, 4)).toStrictEqual([ 1, 0, 1, 0, 1, 0, 0, 0 ]);
	});
	test("Rand.clave(8, 3, 1)", () => {
		expect(Rand.clave(8, 3, 1)).toStrictEqual([ 1, 1, 0, 0, 1, 0, 1, 1 ]);
	});

	test('Rand.urn(5)', () => {
		Rand.seed(7563);
		expect(Rand.urn(5)).toStrictEqual([ 5, 8, 3, 1, 7 ]);
	});
	test('Rand.urn([1,2,3,4,5])', () => {
		Rand.seed(7563);
		expect(Rand.urn([1,2,3,4,5])).toStrictEqual([ 5, 8, 3, 1, 7 ]);
	});
	test('Rand.urn(10, 5)', () => {
		expect(Rand.urn(10, 5)).toStrictEqual([ 3, 0, 2, 1, 4, 2, 4, 3, 1, 0 ]);
	});
	test('Rand.urn(12, -3, 3)', () => {
		expect(Rand.urn(12, -3, 3)).toStrictEqual([ 1,  0, -2, -1, 2, -3, -2, -3,  2, 1, 0, -1 ]);
	});

	test("Rand.choose(5, [0, 1, 2, 3, 5, 8])", () => {
		Rand.seed(9351);
		expect(Rand.choose(5, [0, 1, 2, 3, 5, 8])).toStrictEqual([ 3, 5, 2, 5, 3 ]);
	});
	test("Rand.choose([1,2,3,4,5], [0, 1, 2, 3, 5, 8])", () => {
		Rand.seed(9351);
		expect(Rand.choose([1,2,3,4,5], [0, 1, 2, 3, 5, 8])).toStrictEqual([ 3, 5, 2, 5, 3 ]);
	});
	test("Rand.choose(5, ['c', 'e', 'g'])", () => {
		expect(Rand.choose(5, ['c', 'e', 'g'])).toStrictEqual([ 'g', 'g', 'e', 'c', 'g' ]);
	});
	
	test("Rand.pick(5, [0, 1, 2, 3, 5, 8])", () => {
		Rand.seed(9351);
		expect(Rand.pick(5, [0, 1, 2, 3, 5, 8])).toStrictEqual([ 3, 8, 1, 2, 5 ]);
	});
	test("Rand.pick([1,2,3,4,5], [0, 1, 2, 3, 5, 8])", () => {
		Rand.seed(9351);
		expect(Rand.pick([1,2,3,4,5], [0, 1, 2, 3, 5, 8])).toStrictEqual([ 3, 8, 1, 2, 5 ]);
	});
	test("Rand.pick(5, ['c', 'e', ['g', 'd']])", () => {
		expect(Rand.pick(5, ['c', 'e', ['g', 'd']])).toStrictEqual([ [ 'g', 'd' ], 'e', 'c', 'e', 'c' ]);
	});

	test("Rand.expand(0)", () => {
		expect(Rand.expand(0)).toStrictEqual([0]);
	})
	test("Rand.expand([0, 7, 3, 5, 0, -1], 10)", () => {
		let arr = [0, 7, 3, 5, 0, -1];
		Rand.seed(3141);
		expect(Rand.expand(arr, 10)).toStrictEqual([ 0, 7, 3, 5, 0, -1, 6, 8, 7, 2 ]);
	});
	test("Rand.expand([0, 7, 3, 5, 0, -1], Gen.spread(10))", () => {
		let arr = [0, 7, 3, 5, 0, -1];
		let arr2 = Gen.spread(10);
		Rand.seed(3141);
		expect(Rand.expand(arr, arr2)).toStrictEqual([ 0, 7, 3, 5, 0, -1, 6, 8, 7, 2 ]);
	});
}

function testTransform(){
	test("Mod.clone()", () => {
		expect(Mod.clone()).toStrictEqual([0]);
	});
	test('Mod.clone([0, 5, 7], 0, 12, -12)', () => {
		expect(Mod.clone([0, 5, 7], 0, 12, -12)).toStrictEqual([ 0, 5, 7, 12, 17, 19, -12, -7, -5 ]);
	});
	test('Mod.clone([0, [5, 9], [7, 12]], 0, 10)', () => {
		expect(Mod.clone([0, [5, 9], [7, 12]], 0, 10)).toStrictEqual([ 0, [ 5, 9 ], [ 7, 12 ], 10, [ 15, 19 ], [ 17, 22 ] ]);
	});
	test("Mod.clone(['kick', 'snare', 'hat'], ['_808', '_909'])", () => {
		expect(Mod.clone(['kick', 'snare', 'hat'], ['_808', '_909'])).toStrictEqual([ 'kick_808', 'snare_808', 'hat_808', 'kick_909', 'snare_909', 'hat_909' ]);
	});
	test("Mod.clone(['c', ['e', 'g']], ['4', '#3'])", () => {
		expect(TS.Transform.clone(['c', ['e', 'g']], ['4', '#3'])).toStrictEqual([ 'c4', [ 'e4', 'g4' ], 'c#3', [ 'e#3', 'g#3' ] ]);
	});

	test("Mod.combine()", () => {
		expect(Mod.combine()).toStrictEqual([0]);
	});
	test("Mod.combine([0, 5], [[12, [19, 24]], 7])", () => {
		expect(Mod.combine([0, 5], [[12, [19, 24]], 7])).toStrictEqual([ 0, 5, [ 12, [ 19, 24 ] ], 7 ]);
	});

	test("Mod.duplicate()", () => {
		expect(Mod.duplicate()).toStrictEqual([0, 0]);
	});
	test("Mod.duplicate([0, [7, 12]], 3)", () => {
		expect(Mod.duplicate([0, [7, 12]], 3)).toStrictEqual([ 0, [ 7, 12 ], 0, [ 7, 12 ], 0, [ 7, 12 ] ]);
	});

	test("Mod.every()", () => {
		expect(Mod.every()).toStrictEqual([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
	});
	test("Mod.every([1, 0, 1, 1, 1], 2, 8)", () => {
		expect(Mod.every([1, 0, 1, 1, 1], 2, 8)).toStrictEqual([ 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
	});
	test("Mod.every([1, 1, 0, 1], 4, 4, 0, -1)", () => {
		expect(Mod.every([1, 1, 0, 1], 4, 4, 0, -1)).toStrictEqual([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1 ]);
	});
	test("Mod.every([3, [0, 7]], 2, 4, 12)", () => {
		expect(Mod.every([3, [0, 7]], 2, 4, 12)).toStrictEqual([ 3, [ 0, 7 ], 12, 12, 12, 12, 12, 12 ]);
	});
	
	test("Mod.pad()", () => {
		expect(Mod.pad()).toStrictEqual([ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ]);
	})
	test("Mod.pad([3, 7, 12], 8)", () => {
		expect(Mod.pad([3, 7, 12], 8)).toStrictEqual([ 3, 7, 12, 0, 0, 0, 0, 0 ]);
	});
	test("Mod.pad([3, 7, 12], Array(8))", () => {
		expect(Mod.pad([3, 7, 12], Array(8))).toStrictEqual([ 3, 7, 12, 0, 0, 0, 0, 0 ]);
	});
	test("Mod.pad(['c', 'f', 'g'], 8, '-', 4)", () => {
		expect(Mod.pad(['c', 'f', 'g'], 8, '-', 4)).toStrictEqual([ '-', '-', '-', '-', 'c', 'f', 'g', '-' ]);
	});
	
	test("Mod.flat()", () => {
		expect(Mod.flat()).toStrictEqual([0]);
	});
	test("Mod.flatten([1, [2, 3, [4], 5]])", () => {
		expect(Mod.flatten([1, [2, 3, [4], 5]])).toStrictEqual([ 1, 2, 3, 4, 5]);
	});
	
	test("Mod.filter()", () => {
		expect(Mod.filter()).toStrictEqual([0]);
	});
	test("Mod.filter([0, 1, 2, 3, 4, 5], [3, 5])", () => {
		expect(Mod.filter([0, 1, 2, 3, 4, 5], [3, 5])).toStrictEqual([0, 1, 2, 4]);
	});
	test("Mod.filter([0, [1, 2], 3, [4, 5]], [3, 5])", () => {
		expect(Mod.filter([0, [1, 2], 3, [4, 5]], [3, 5])).toStrictEqual([ 0, [ 1, 2 ], [ 4, 5 ] ]);
	});
	
	test("Mod.filterType()", () => {
		expect(Mod.filterType()).toStrictEqual([0]);
	});
	test("Mod.filterType([0, 'foo', {bar : true}, 1, undefined])", () => {
		expect(Mod.filterType([0, 'foo', {bar : true}, 1, undefined])).toStrictEqual([0, 1]);
	});
	test("Mod.filterType([0, 1, [1, 2], 'foo', 2, true, {bar: 5}, 3.14], 'number')", () => {
		expect(Mod.filterType([0, 1, [1, 2], 'foo', 2, true, {bar: 5}, 3.14], 'number')).toStrictEqual([ 0, 1, 2, 3.14 ]);
	});

	test("Mod.invert()", () => {
		expect(Mod.invert()).toStrictEqual([0]);
	});
	test("Mod.invert([-1, 2, 7, 14])", () => {
		expect(Mod.invert([-1, 2, 7, 14])).toStrictEqual([ 14, 11, 6, -1 ]);
	});
	test("Mod.invert([-1, 2, 7, 14], 5)", () => {
		expect(Mod.invert([-1, 2, 7, 14], 5)).toStrictEqual([ 11, 8, 3, -4 ]);
	});
	test("Mod.invert([-1, [2, 7], 14], 0, 12)", () => {
		expect(Mod.invert([-1, [2, 7], 14], 0, 12)).toStrictEqual([ 13, [10, 5], -2 ]);
	});
	
	test("Mod.lace()", () => {
		expect(Mod.lace()).toStrictEqual([0]);
	});
	test("Mod.lace([0, 0], 7, [9, 9, 9])", () => {
		expect(Mod.lace([0, 0], 7, [9, 9, 9])).toStrictEqual([ 0, 7, 9, 0, 9, 9 ]);
	});
	
	// test("Mod.lookup()");
	test("Mod.lookup()", () => {
		expect(Mod.lookup()).toStrictEqual([0]);
	});
	test("Mod.lookup([0, [1, 1, [2, 3]], 1], ['c4', 'e4', 'f4', 'g4'])", () => {
		expect(Mod.lookup([0, [1, 1, [2, 3]], 1], ['c4', 'e4', 'f4', 'g4'])).toStrictEqual([ 'c4', [ 'e4', 'e4', [ 'f4', 'g4' ] ], 'e4' ]);
	});
	test("Mod.lookup([0.999, [1.32, 1.91, [2.78, 3.14]], 1.54], ['c4', 'e4', 'f4', 'g4'])", () => {
		expect(Mod.lookup([0.999, [1.32, 1.91, [2.78, 3.14]], 1.54], ['c4', 'e4', 'f4', 'g4'])).toStrictEqual([ 'c4', [ 'e4', 'e4', [ 'f4', 'g4' ] ], 'e4' ]);
	});
	
	test("Mod.merge()", () => {
		expect(Mod.merge()).toStrictEqual([0]);
	});
	test("Mod.merge([0, 0, 0], [5, 5], [7, 7, 7, 7])", () => {
		expect(Mod.merge([0, 0, 0], [5, 5], [7, 7, 7, 7])).toStrictEqual([ [ 0, 5, 7 ], [ 0, 5, 7 ], [ 0, 7 ], [ 7 ] ]);
	});
	
	test("Mod.palindrome()", () => {
		expect(Mod.palindrome()).toStrictEqual([0]);
	});
	test("Mod.palindrome([0, [5, 7], 9, 12])", () => {
		expect(Mod.palindrome([0, [5, 7], 9, 12])).toStrictEqual([ 0, [ 5, 7 ], 9, 12, 12, 9, [ 5, 7 ], 0 ]);
	});
	test("Mod.palindrome([0, [5, 7], 9, 12])", () => {
		expect(Mod.palindrome([0, [5, 7], 9, 12], true)).toStrictEqual([ 0, [ 5, 7 ], 9, 12, 9, [ 5, 7 ] ]);
	});

	// test("Mod.palindrome([0, 1, 2, 3], 1)");
	
	test("Mod.repeat()", () => {
		expect(Mod.repeat()).toStrictEqual([0]);
	});
	test("Mod.repeat([0, 5, 7], 3)", () => {
		expect(Mod.repeat([0, 5, 7], 3)).toStrictEqual([ 0, 0, 0, 5, 5, 5, 7, 7, 7 ]);
	});
	test("Mod.repeat(['c4', 'e4', 'f4', 'g4'], [1, 4, 2, 0])", () => {
		expect(Mod.repeat(['c4', 'e4', 'f4', 'g4'], [1, 4, 2, 0])).toStrictEqual([ 'c4', 'e4', 'e4', 'e4', 'e4', 'f4', 'f4' ]);
	});

	// var revArr = [0, 5, 7, 12];
	// console.log(Mod.reverse(revArr));
	// console.log(revArr);	
	test("Mod.reverse()", () => {
		expect(Mod.reverse()).toStrictEqual([0]);
	});
	test("Mod.reverse([0, 5, 7, 12])", () => {
		expect(Mod.reverse([0, 5, 7, 12])).toStrictEqual([12, 7, 5, 0]);
	});

	test("Mod.rotate()", () => {
		expect(Mod.rotate()).toStrictEqual([0]);
	});
	test("Mod.rotate([0, 5, 7, 12], 1)", () => {
		expect(Mod.rotate([0, 5, 7, 12], 1)).toStrictEqual([ 12, 0, 5, 7 ]);
	});
	
	test("Mod.sort()", () => {
		expect(Mod.sort()).toStrictEqual([0]);
	});
	test("Mod.sort([-5, 7, 0, 3, 12, -7, 9], -1)", () => {
		expect(Mod.sort([-5, 7, 0, 3, 12, -7], -1)).toStrictEqual([ 12, 7, 3, 0, -5, -7 ]);
	});
	test("Mod.sort(['e4', 'g3', 'c4', 'f3', 'b5'])", () => {
		expect(Mod.sort(Mod.sort(['e4', 'g3', 'c4', 'f3', 'b5']))).toStrictEqual([ 'b5', 'c4', 'e4', 'f3', 'g3' ]);
	});
	
	test("Mod.slice()", () => {
		expect(Mod.slice()).toStrictEqual([[0]]);
	});
	test("Mod.slice(Gen.spread(8), [3, 2])", () => {
		expect(Mod.slice(Gen.spread(8), [3, 2])).toStrictEqual([ [ 0, 1, 2 ], [ 3, 4 ], [ 5, 6, 7 ] ]);
	});
	test("Mod.slice(Gen.spread(24), [3, 2, -1, 5], false)", () => {
		expect(Mod.slice(Gen.spread(24), [3, 2, -1, 5], false)).toStrictEqual([ [ 0, 1, 2 ], [ 3, 4 ], [ 5, 6, 7, 8, 9 ] ]);
	});
	
	test("Mod.split()", () => {
		expect(Mod.split()).toStrictEqual([[0]]);
	})
	test("Mod.split(Gen.spread(8), 3)", () => {
		expect(Mod.split(Gen.spread(8), 3)).toStrictEqual([ [ 0, 1, 2 ], [ 3, 4, 5 ], [ 6, 7 ] ]);
	});
	test("Mod.split(Gen.spread(8), [3, 2, -1])", () => {
		expect(Mod.split(Gen.spread(8), [3, 2, -1])).toStrictEqual([ [ 0, 1, 2 ], [ 3, 4 ], [ 5, 6, 7 ] ]);
	});
	
	test("Mod.spray()", () => {
		expect(Mod.spray()).toStrictEqual([0]);
	});
	test("Mod.spray([7, 9, 12], [1, 0, 0, 1, 1, 0, 1, 0])", () => {
		expect(Mod.spray([7, 9, 12], [1, 0, 0, 1, 1, 0, 1, 0])).toStrictEqual([ 7, 0, 0, 9, 12, 0, 7, 0 ]);
	});
	test("Mod.spray([[5, 7, 9], [12, 14]], [1, 0, 1, 1, 0])", () => {
		expect(Mod.spray([[5, 7, 9], [12, 14]], [1, 0, 1, 1, 0])).toStrictEqual([ [ 5, 7, 9 ], 0, [ 12, 14 ], [ 5, 7, 9 ], 0 ]);
	});

	test("Mod.step()", () => {
		expect(Mod.step()).toStrictEqual([0]);
	});
	test("Mod.step([1, 2], [10, 20])", () => {
		expect(Mod.step([1, 2], [10, 20])).toStrictEqual([1, 10, 2, 20]);
	});
	test("Mod.step([1, 2, 3], [10, 20])", () => {
		expect(Mod.step([1, 2, 3], [10, 20])).toStrictEqual([1, 10, 2, 20, 3, 10, 1, 20, 2, 10, 3, 20]);
	});
	test("Mod.step([1, [2, 3]], [10, 20], [100, 200])", () => {
		expect(Mod.step([1, [2, 3]], [10, 20], [100, 200])).toStrictEqual([1, 10, 100, [2, 3], 20, 200]);
	});

	test("Mod.stretch()", () => {
		expect(Mod.stretch()).toStrictEqual([0]);
	});
	test("Mod.stretch([0, 12, 3, 7], 9)", () => {
		expect(Mod.stretch([0, 12, 3, 7], 9)).toStrictEqual([ 0, 4.5, 9, 10.875, 7.5, 4.125, 4, 5.5, 7 ]);
	});
	test("Mod.stretch([0, 12, 3, 7], Array(9))", () => {
		expect(Mod.stretch([0, 12, 3, 7], Array(9))).toStrictEqual([ 0, 4.5, 9, 10.875, 7.5, 4.125, 4, 5.5, 7 ]);
	});
	
	test("Mod.stretch([0, 12, 3, 7], 9, 'none')", () => {
		expect(Mod.stretch([0, 12, 3, 7], 9, 'none')).toStrictEqual([ 0, 0, 0, 12, 12, 12, 3, 3, 7 ]);
	});
	
	test("Mod.unique()", () => {
		expect(Mod.unique()).toStrictEqual([0]);
	});
	test("Mod.unique([5, 7, 5, 0, 12, 7, 5])", () => {
		expect(Mod.unique([5, 7, 5, 0, 12, 7, 5])).toStrictEqual([ 5, 7, 0, 12 ]);
	});
	test("Mod.unique(['c', 'c', 'g', 'f', 'f'])", () => {
		expect(Mod.unique(['c', 'c', 'g', 'f', 'f'])).toStrictEqual([ 'c', 'g', 'f' ]);
	});
}

function testStatistic(){
	test("Stat.sort()", () => {
		expect(Stat.sort()).toStrictEqual([0]);
	});
	test("Stat.sort([-5, 7, 0, 3, 12, -7, 9], -1)", () => {
		expect(Stat.sort([-5, 7, 0, 3, 12, -7], -1)).toStrictEqual([ 12, 7, 3, 0, -5, -7 ]);
	});
	test("Stat.sort(['e4', 'g3', 'c4', 'f3', 'b5'])", () => {
		expect(Stat.sort(Stat.sort(['e4', 'g3', 'c4', 'f3', 'b5']))).toStrictEqual([ 'b5', 'c4', 'e4', 'f3', 'g3' ]);
	});
	
	test("Stat.mean()", () => {
		expect(Stat.mean()).toStrictEqual(0);
	});
	test("Stat.mean([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, 1, -2])", () => {
		expect(Stat.mean([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, 1, -2])).toStrictEqual(0);
	});
	test("Stat.mean([1, 2, 3, 4, 5, 6, 7, 8, 9])", () => {
		expect(Stat.mean([1, 2, 3, 4, 5, 6, 7, 8, 9])).toStrictEqual(5);
	});
	test("Stat.mean([2, [-6, 2, 0], [10, [9, -2], 5], -8, [-11, 1], -2])", () => {
		expect(Stat.mean([2, [-6, 2, 0], [10, [9, -2], 5], -8, [-11, 1], -2])).toStrictEqual(0);
	});

	test("Stat.median()", () => {
		expect(Stat.median()).toStrictEqual(0);
	});
	test("Stat.median([1, 5, 6, 9, 13])", () => {
		expect(Stat.median([1, 5, 6, 9, 13])).toStrictEqual(6);
	});
	test("Stat.median([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, -2])", () => {
		expect(Stat.median([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, -2])).toStrictEqual(0);
	});
	test("Stat.median([2, [-6, 2, 0], [10, [9, -2], 5], -8, [-11], -2])", () => {
		expect(Stat.median([2, [-6, 2, 0], [10, [9, -2], 5], -8, [-11], -2])).toStrictEqual(0);
	});
	
	test("Stat.mode()", () => {
		expect(Stat.mode()).toStrictEqual([]);
	});
	test("Stat.mode([8, 4, 3, 11, 9, 0, 11, 2, 10, 5, 11, 0])", () => {
		expect(Stat.mode([8, 4, 3, 11, 9, 0, 11, 2, 10, 5, 11, 0])).toStrictEqual([11]);
	});
	test("Stat.mode([8, 4, 3, 9, 9, 0, 2, 10, 5, 11, 0, 11])", () => {
		expect(Stat.mode([8, 4, 3, 9, 9, 0, 2, 10, 5, 11, 0, 11])).toStrictEqual([0, 9, 11]);
	});
	test("Stat.mode([8, [4, 3], 9, [9, 0, [2, 10], 5], 11, 0, 11])", () => {
		expect(Stat.mode([8, [4, 3], 9, [9, 0, [2, 10], 5], 11, 0, 11])).toStrictEqual([0, 9, 11]);
	});
	
	test("Stat.max()", () => {
		expect(Stat.max()).toStrictEqual(0);
	});
	test("Stat.max([-38, [-53, [-6, 33], 88, 32], [-8, 73]])", () => {
		expect(Stat.max([-38, [-53, [-6, 33], 88, 32], [-8, 73]])).toStrictEqual(88);
	});
		
	test("Stat.minimum()", () => {
		expect(Stat.min([-38, -53, -6, 33, 88, 32, -8, 73])).toStrictEqual(-53);
	});
	test("Stat.minimum([-38, [-53, [-6, 33], 88, 32], [-8, 73]])", () => {
		expect(Stat.min([-38, -53, -6, 33, 88, 32, -8, 73])).toStrictEqual(-53);
	});

	test("Stat.change()", () => {
		expect(Stat.change()).toStrictEqual([0]);
	});
	test("Stat.change([4, 10])", () => {
		expect(Stat.change([4, 10])).toStrictEqual([6]);
	});
	test("Stat.change([0, 3, 7, 0, 12, 9, 5, 7])", () => {
		expect(Stat.change([0, 3, 7, 0, 12, 9, 5, 7])).toStrictEqual([ 3, 4, -7, 12, -3, -4, 2 ]);
	});
	test("Stat.change([0, 3, 7, 0, 12, 9, 5, 7], true)", () => {
		expect(Stat.change([0, 3, 7, 0, 12, 9, 5, 7], true)).toStrictEqual([ 3, 4, -7, 12, -3, -4, 2, -7 ]);
	});

	test("Stat.compare()", () => {
		expect(Stat.compare()).toStrictEqual(false);
	});
	test("Stat.compare(2, 2)", () => {
		expect(Stat.compare(2, 2)).toStrictEqual(true);
	});
	test("Stat.compare([0, 5, 7], [0, 5, 7])", () => {
		expect(Stat.compare([0, 5, 7], [0, 5, 7])).toStrictEqual(true);
	});
	test("Stat.compare(3.1451, '3.1451')", () => {
		expect(Stat.compare(3.1451, '3.1451')).toStrictEqual(false);
	});
	test("Stat.compare(['c', ['e', 'g']], ['c', ['e', 'g']])", () => {
		expect(Stat.compare(['c', ['e', 'g']], ['c', ['e', 'g']])).toStrictEqual(true);
	});
}

function testTranslate(){
	test("TL.midiToNote()", () => {
		expect(TL.mton()).toStrictEqual('c4');
	});
	test("TL.midiToNote(60)", () => {
		expect(TL.mton(60)).toStrictEqual('c4');
	});
	test("TL.mton([48, 55, 51, 43])", () => {
		expect(TL.mton([48, 55, 51, 43])).toStrictEqual([ 'c3', 'g3', 'eb3', 'g2' ]);
	});
	test("TL.mton([48, [[55, 51], 43]])", () => {
		expect(TL.mton([48, [[55, 51], 43]])).toStrictEqual([ 'c3', [ [ 'g3', 'eb3' ], 'g2' ] ]);
	});

	test("TL.midiToFreq()", () => {
		expect(TL.mtof()).toStrictEqual(130.8127826502993);
	});
	test("TL.midiToFreq(60)", () => {
		expect(TL.mtof(60)).toStrictEqual(261.6255653005986);
	});
	test("TL.mtof([48, 55, 51, 43])", () => {
		expect(TL.mtof([48, 55, 51, 43])).toStrictEqual([ 130.8127826502993, 195.99771799087463, 155.56349186104043, 97.99885899543733 ]);
	});
	test("TL.mtof([48, [[55, 51], 43]])", () => {
		expect(TL.mtof([48, [[55, 51], 43]])).toStrictEqual([ 130.8127826502993, [ [ 195.99771799087463, 155.56349186104043 ], 97.99885899543733 ] ]);
	});
	test("TL.mtof(60.3)", () => {
		expect(TL.mtof(60.3)).toStrictEqual(266.19869962824436);
	});

	test("TL.ftom()", () => {
		expect(TL.ftom()).toStrictEqual(60);
	});
	test("TL.ftom(261)", () => {
		expect(TL.ftom(261)).toStrictEqual(60);
	});
	test("TL.ftom([ 131, [[ 196, 156], 98] ])", () => {
		expect(TL.ftom([ 131, [[ 196, 156], 98] ])).toStrictEqual([ 48, [ [ 55, 51 ], 43 ] ]);
	});
	test("TL.ftom([ 131, 196, 156, 98 ], true)", () => {
		expect(TL.ftom([ 131, 196, 156, 98 ], true)).toStrictEqual([ 48.02475945615349, 55.00020156708658, 51.04851006405106, 43.00020156708658 ]);
	});

	test("TL.fton()", () => {
		expect(TL.fton()).toStrictEqual('c4');
	});
	test("TL.fton(261)", () => {
		expect(TL.fton(261)).toStrictEqual('c4');
	});
	test("TL.fton([ 131, [[ 196, 156], 98] ])", () => {
		expect(TL.fton([ 131, [[ 196, 156], 98] ])).toStrictEqual([ 'c3', [ [ 'g3', 'eb3' ], 'g2' ] ]);
	});
	
	test("TL.ntom()", () => {
		expect(TL.ntom()).toStrictEqual(60);
	});
	test("TL.ntom('c4')", () => {
		expect(TL.ntom()).toStrictEqual(60);
	});
	test("TL.ntom(['c3', [['g3', 'eb3'], 'g2']])", () => {
		expect(TL.ntom(['c3', [['g3', 'eb3'], 'g2']])).toStrictEqual([48, [[55, 51], 43]]);
	});
	
	test("TL.ntof()", () => {
		expect(TL.ntof()).toStrictEqual(261.6255653005986);
	});
	test("TL.ntof('c4')", () => {
		expect(TL.ntof('c4')).toStrictEqual(261.6255653005986);
	});
	test("TL.ntof(['c3', [['g3', 'eb3'], 'g2']])", () => {
		expect(TL.ntof(['c3', [['g3', 'eb3'], 'g2']])).toStrictEqual([ 130.8127826502993, [ [ 195.99771799087463, 155.56349186104043 ], 97.99885899543733 ] ]);
	});

	test("TL.ctor()", () => {
		expect(TL.ctor()).toStrictEqual(0);
	});
	test("TL.ctor(['c3', [['g3', 'eb3'], 'g2']])", () => {
		expect(TL.ctor(['c3', [['g3', 'eb3'], 'g2']])).toStrictEqual([ 0, [ [ 7, 3 ], 7 ] ]);
	});
	test("TL.ctor(['c#', [['gx', 'eb'], 'gbb']])", () => {
		expect(TL.ctor(['c#', [['gx-', 'eb'], 'gbb+']])).toStrictEqual([ 1, [ [ -3, 3 ], 17 ] ]);
	});
	
	test("TL.rtom()", () => {
		expect(TL.rtom()).toStrictEqual(60);
	});
	test("TL.rtom([-12, 0, 7, 12])", () => {
		expect(TL.rtom([-12, 0, 7, 12])).toStrictEqual([ 48, 60, 67, 72 ]);
	});
	test("TL.rtom([-12, 0, 7, 12], 3)", () => {
		expect(TL.rtom([-12, 0, 7, 12], 3)).toStrictEqual([ 36, 48, 55, 60 ]);
	});
	test("TL.rtom([-12, [[0, 7], 12]], 'c3')", () => {
		expect(TL.rtom([-12, [[0, 7], 12]], 'c3')).toStrictEqual([ 36, [ [ 48, 55 ], 60 ] ]);
	});
	
	test("TL.rtof()", () => {
		expect(TL.rtof()).toStrictEqual(261.6255653005986);
	});
	test("TL.rtof([-12, 0, 7, 12])", () => {
		expect(TL.rtof([-12, 0, 7, 12])).toStrictEqual([ 130.8127826502993, 261.6255653005986, 391.99543598174927, 523.2511306011972 ]);
	});
	test("TL.rtof([-12, 0, 7, 12], 3)", () => {
		expect(TL.rtof([-12, 0, 7, 12], 3)).toStrictEqual([ 65.40639132514966, 130.8127826502993, 195.99771799087463, 261.6255653005986 ]);
	});
	test("TL.rtof([-12, [[0, 7], 12]], 'c3')", () => {
		expect(TL.rtof([-12, [[0, 7], 12]], 'c3')).toStrictEqual([ 65.40639132514966, [[130.8127826502993, 195.99771799087463 ], 261.6255653005986 ]]);
	});
		
	test("TL.toScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])", () => {
		TL.setScale('harmonic_minor', 'c');
		expect(TL.toScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])).toStrictEqual([ 0, 0, 2, 3, 3, 5,  5, 7, 8, 8, 8, 11 ]);
	});
	test("TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11])", () => {
		TL.setScale('harmonic_minor', 'd');
		expect(TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11])).toStrictEqual([ 2, [ 2, 4, 5 ], [ 5, 7, [ 7, 9 ], 10 ], 10, 10, 13 ]);
	});
	test("TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11], 'harmonic_minor')", () => {
		TL.setRoot('chromatic', 'c');
		// TL.setScale('harmonic_minor', 'c');
		expect(TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11], 'harmonic_minor')).toStrictEqual([ 0, [ 0, 2, 3 ], [ 3, 5, [ 5, 7 ], 8 ], 8, 8, 11 ]);
	});
	test("TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11], 'harmonic_minor', 'd')", () => {
		expect(TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11], 'harmonic_minor', 'd')).toStrictEqual([ 2, [ 2, 4, 5 ], [ 5, 7, [ 7, 9 ], 10 ], 10, 10, 13 ]);
	});
	test("TL.toScale([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11], 'harmonic_minor', 'd')", () => {
		TL.setScale('harmonic_minor', 'c');
		expect(TL.toScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 'scale_does_not_exist', 'y')).toStrictEqual([ 0, 0, 2, 3, 3, 5, 5, 7, 8, 8, 8, 11 ]);
	});
	
	test("TL.getSettings()", () => {
		TL.setRoot('gb');
		TL.setScale('minor_pentatonic');
		TL.setTempo(100);
		expect(TL.getSettings()).toStrictEqual({
			scale: 'minor_pentatonic',
			root: 'gb',
			rootInt: 6,
			map: [
			   0,  0, 0, 3, 3,
			   5,  5, 7, 7, 7,
			  10, 10
			],
			bpm: 100,
			measureInMs: 2400
		  });
	});

	test("TL.toMidi([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11])", () => {
		TL.setScale('minor_pentatonic', 'c');
		expect(TL.toMidi([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11])).toStrictEqual([ 60, [ 60, 60, 63 ], [ 63, 65, [ 65, 67 ], 67 ], 67, 70, 70 ]);
	});
	
	test("TL.toFreq([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11]])", () => {
		TL.setScale('minor_pentatonic', 'c');
		expect(TL.toFreq([0, [1, 2, 3], [4, 5, [6, 7], 8], 9, 10, 11])).toStrictEqual([ 261.6255653005986, [ 261.6255653005986, 261.6255653005986, 311.12698372208087 ], [ 311.12698372208087, 349.2282314330039, [ 349.2282314330039, 391.99543598174927 ], 391.99543598174927 ], 391.99543598174927, 466.1637615180899, 466.1637615180899 ]);
	});
	
	test("TL.rtoc()", () => {
		expect(TL.rtoc()).toStrictEqual([ 0 ]);
	});	
	test("TL.rtoc('11/5')", () => {
		expect(TL.rtoc('11/5')).toStrictEqual([ 1365.0042284999222 ]);
	});	
	test("TL.rtoc(['2/1', ['3/2', ['4/3', '5/4']], '9/8'])", () => {
		expect(TL.rtoc(['2/1', ['3/2', ['4/3', '5/4']], '9/8'])).toStrictEqual([ 1200, [ 701.9550008653874, [ 498.04499913461245, 386.3137138648348 ] ], 203.91000173077484 ]);
	});	

	
	test("TL.dtoms()", () => {
		TL.setTempo(100);
		expect(TL.dtoms()).toStrictEqual([2400]);
	});
	test("TL.dtoms('1/8', 115)", () => {
		expect(TL.dtoms('1/8', 115)).toStrictEqual([260.8695652173913]);
	});
	test("TL.dtoms(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'])", () => {
		expect(TL.dtoms(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'])).toStrictEqual([ 600, [ 300, [ 450, 600 ] ], 400, 4800 ]);
	});
	test("TL.dtoms([0.25, [0.125, [0.1875, 0.25]], 0.1667, 2])", () => {
		expect(TL.dtoms([0.25, [0.125, [0.1875, 0.25]], 0.1667, 2])).toStrictEqual([ 600, [ 300, [ 450, 600 ] ], 400.08, 4800 ]);
	});
	test("TL.dtoms(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'], 160)", () => {
		expect(TL.dtoms(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'], 160)).toStrictEqual([ 375, [ 187.5, [ 281.25, 375 ] ], 250, 3000 ]);
	});

	test("TL.rtoms()", () => {
		expect(TL.rtoms()).toStrictEqual([2400])
	});
	test("TL.rtoms(0.125, 115)", () => {
		expect(TL.rtoms(0.125, 115)).toStrictEqual(260.8695652173913);
	});
	test("TL.rtoms([0.25, [0.125, [0.1875, 0.25]], 0.1667, 2])", () => {
		expect(TL.rtoms([0.25, [0.125, [0.1875, 0.25]], 0.1667, 2])).toStrictEqual([ 600, [ 300, [ 450, 600 ] ], 400.08, 4800 ]);
	});

	test("TL.dtor()", () => {
		expect(TL.dtor()).toStrictEqual([1]);
	});
	test("TL.dtor(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'])", () => {
		expect(TL.dtor(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'])).toStrictEqual([ 0.25, [ 0.125, [ 0.1875, 0.25 ] ], 0.16666666666666666, 2 ]);
	});

	test("TL.dtotk()", () => {
		expect(TL.dtotk()).toStrictEqual([1920]);
	});
	test("TL.dtotk(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'])", () => {
		expect(TL.dtotk(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'])).toStrictEqual([ 480, [ 240, [ 360, 480 ] ], 320, 3840 ]);
	});
	test("TL.rtotk([0.25, [0.125, [0.1875, 0.25]], 0.16667, 2])", () => {
		expect(TL.dtotk([0.25, [0.125, [0.1875, 0.25]], 0.16666666666666666, 2])).toStrictEqual([ 480, [ 240, [ 360, 480 ] ], 320, 3840 ]);
	});

	test("TL.ttor()", () => {
		expect(TL.ttor()).toStrictEqual([1]);
	});
	test("TL.ttor(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'])", () => {
		expect(TL.ttor(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'])).toStrictEqual([ 0.25, [ 0.08333333333333333, [ 0.09375, 0.75 ] ], 0.03125, 3 ]);
	});

	test("TL.ttotk()", () => {
		expect(TL.ttotk()).toStrictEqual([1920]);
	});
	test("TL.ttotk(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'])", () => {
		expect(TL.ttotk(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'])).toStrictEqual([ 480, [ 160, [ 180, 1440 ] ], 60, 5760 ]);
	});

	test("TL.ttoms()", () => {
		expect(TL.ttoms()).toStrictEqual([2400]);
	});
	test("TL.ttoms(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'])", () => {
		expect(TL.ttoms(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'])).toStrictEqual([ 600, [ 200, [ 225, 1800 ] ], 75, 7200 ]);
	});
	test("TL.ttoms(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'], 160)", () => {
		expect(TL.ttoms(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'], 160)).toStrictEqual([ 375, [ 125, [ 140.625, 1125 ] ], 46.875, 4500 ]);
	});

	test("TL.chords()", () => {
		expect(TL.chordsFromNumerals(['I', 'IIm', 'IVsus2', 'V7', 'VIm9'])).toStrictEqual([[ 0, 4, 7 ], [ 2, 5, 9 ], [ 5, 7, 0 ], [ 7, 11, 2, 5 ], [ 9, 0, 4, 7, 11 ]]);
	});
	test("TL.chords()", () => {
		expect(TL.chordsFromNumerals(['I', 'IIm', 'IVsus2', 'V7', 'VIm9'], 'eb')).toStrictEqual([[ 3, 7, 10 ], [ 5, 8, 0 ], [ 8, 10, 3 ], [ 10, 2, 5, 8 ], [ 0, 3, 7, 10, 2 ]]);
	});
	test("TL.chords()", () => {
		expect(TL.chordsFromNames(['C', 'Dm', 'Fsus2', 'G7', 'Am9'])).toStrictEqual([[ 0, 4, 7 ], [ 2, 5, 9 ], [ 5, 7, 0 ], [ 7, 11, 2, 5 ], [ 9, 0, 4, 7, 11 ]]);
	});

	test("TL.textToCode()", () => {
		expect(TL.textToCode('bach cage')).toStrictEqual([ 98, 97, 99, 104, 32, 99, 97, 103, 101 ]);
	});

	test("TL.textToCode()", () => {
		expect(TL.textToCode(['bach', 'cage'])).toStrictEqual([ [ 98, 97, 99, 104 ], [ 99, 97, 103, 101 ] ]);
	});

	var scl;
	test("new TL.Scala()", () => {
		scl = new TL.Scala();
	});

	test("Scala.parse()", () => {
		scl.parse(fs.readFileSync('data/scl/12-TET.scl', 'utf8'));
	});

	test("Scala.names", () => {
		expect(scl.names.slice(0, 10)).toStrictEqual([
			'05-19', '05-22',
			'05-24', '06-41',
			'07-19', '07-31',
			'07-37', '08-11',
			'08-13', '08-19' ]);
	});

	test("Scala.data", () => {
		scl.tune(261.6255653);
		scl.center(60);
	
		expect(scl.data).toStrictEqual({
			description: ' 12-TET or Tone Equal Temperatement divides an octave into 12 equal steps',
			size: 12,
			tune: 261.6255653,
			center: 60,
			range: 1200,
			cents: [
				0, 100,  200,  300,
			  400, 500,  600,  700,
			  800, 900, 1000, 1100
			]
		});
	});
	
	test("Scala.stof()", () => {
		expect(scl.stof([60, 63, 67, 69, 72, 81, 36, 48]).map(x => x.toFixed(2))).toStrictEqual([ '261.63', '311.13', '392.00', '440.00', '523.25', '880.00', '65.41', '130.81' ]);
	});

	// fix search bug in scala?
	// test("Scala.search()", () => {
	// 	expect(scl.search({ cents: ['4/3', '5/4', '11/9'], size: 11 })).toStrictEqual({
	// 		yarman_rast: {
	// 		  description: '11-tone Arabian and Turkish Rast/Penchgah by Ozan Yarman',
	// 		  size: 11,
	// 		  tune: 440,
	// 		  center: 69,
	// 		  range: 1200,
	// 		  cents: [
	// 							 0, 203.91000173077484,
	// 			347.40794063398204,  386.3137138648348,
	// 			498.04499913461245,    582.51219260429,
	// 			 701.9550008653874,  905.8650025961623,
	// 			 996.0899982692251, 1049.3629414993693,
	// 			1088.2687147302222,               1200,
	// 						  1200,               1200,
	// 						  1200
	// 		  ]
	// 		}
	// 	  });
	// });
}

function testUtility(){
	test("Util.arrayCalc()", () => {
		expect(Util.arrayCalc()).toStrictEqual(0);
	});
	test("Util.arrayCalc(4, 3, (a,b)=>Math.sqrt(a*a+b*b))", () => {
		expect(Util.arrayCalc(4, 3, (a,b)=>Math.sqrt(a*a+b*b))).toStrictEqual(5);
	});
	test("Util.arrayCalc([1, [3, 4]], [1, [4, 3, 2]], (a,b)=>Math.sqrt(a*a+b*b))", () => {
		expect(Util.arrayCalc([1, [3, 4]], [1, [4, 3, 2]], (a,b)=>Math.sqrt(a*a+b*b))).toStrictEqual([ 1.4142135623730951, [ 5, 5, 3.605551275463989 ] ]);
	});

	test("Util.add()", () => {
		expect(Util.add()).toStrictEqual(0);
	});
	test("Util.add(5, 2)", () => {
		expect(Util.add(5, 2)).toStrictEqual(7);
	});
	test("Util.add([-3, 0, 3, 7], 2)", () => {
		expect(Util.add([-3, 0, 3, 7], 2)).toStrictEqual([-1, 2, 5, 9]);
	});
	test("Util.add(2, [-3, 0, 3, 7])", () => {
		expect(Util.add(2, [-3, 0, 3, 7])).toStrictEqual([-1, 2, 5, 9]);
	});
	test("Util.add([1, 2, 3, 4], [10, 20, 30])", () => {
		expect(Util.add([1, 2, 3, 4], [10, 20, 30])).toStrictEqual([11, 22, 33, 14]);
	});
	test("Util.add([1, [2, 3]], [10, [20, 30, 40]])", () => {
		expect(Util.add([1, [2, 3]], [10, [20, 30, 40]])).toStrictEqual([11, [22, 33, 42]]);
	});
	
	test("Util.sub()", () => {
		expect(Util.sub()).toStrictEqual(0);
	});
	test("Util.sub(5, 2)", () => {
		expect(Util.sub(5, 2)).toStrictEqual(3);
	});
	test("Util.sub([-3, 0, 3, 7], 2)", () => {
		expect(Util.sub([-3, 0, 3, 7], 2)).toStrictEqual([-5, -2, 1, 5]);
	});
	test("Util.sub([1, [2, 3]], [10, [20, 30, 40]])", () => {
		expect(Util.sub([1, [2, 3]], [10, [20, 30, 40]])).toStrictEqual([-9, [-18, -27, -38]]);
	});

	test("Util.mul()", () => {
		expect(Util.mul()).toStrictEqual(0);
	});
	test("Util.mul(5, 2)", () => {
		expect(Util.mul(5, 2)).toStrictEqual(10);
	});
	test("Util.mul([-3, 0, 3, 7], 2)", () => {
		expect(Util.mul([-3, 0, 3, 7], 2)).toStrictEqual([-6, 0, 6, 14]);
	});
	test("Util.mul([1, [2, 3]], [10, [20, 30, 40]])", () => {
		expect(Util.mul([1, [2, 3]], [10, [20, 30, 40]])).toStrictEqual([10, [40, 90, 80]]);
	});

	test("Util.div()", () => {
		expect(Util.div()).toStrictEqual(0);
	});
	test("Util.div(5, 2)", () => {
		expect(Util.div(5, 2)).toStrictEqual(2.5);
	});
	test("Util.div([-3, 0, 3, 7], 2)", () => {
		expect(Util.div([-3, 0, 3, 7], 2)).toStrictEqual([-1.5, 0, 1.5, 3.5]);
	});
	test("Util.div([1, [2, 3]], [10, [20, 30, 40]])", () => {
		expect(Util.div([1, [2, 3]], [10, [20, 30, 40]])).toStrictEqual([0.1, [0.1, 0.1, 0.05]]);
	});
	
	test("Util.pow()", () => {
		expect(Util.pow()).toStrictEqual(0);
	});
	test("Util.pow(5, 2)", () => {
		expect(Util.pow(5, 2)).toStrictEqual(25);
	});
	test("Util.pow([2, 3, 4, 6], 2)", () => {
		expect(Util.pow([2, 3, 4, 6], 2)).toStrictEqual([4, 9, 16, 36]);
	});
	test("Util.pow([1, [2, 3]], [10, [2, 3, 4]])", () => {
		expect(Util.pow([1, [2, 3]], [10, [2, 3, 4]])).toStrictEqual([1, [4, 27, 16]]);
	});

	test("Util.sqrt()", () => {
		expect(Util.sqrt()).toStrictEqual(0);
	});
	test("Util.sqrt(9)", () => {
		expect(Util.sqrt(9)).toStrictEqual(3);
	});
	test("Util.sqrt([4, 9, 16, 25])", () => {
		expect(Util.sqrt([4, 9, 16, 25])).toStrictEqual([2, 3, 4, 5]);
	});
	test("Util.sqrt([4, [9, [16, 25], 144]])", () => {
		expect(Util.sqrt([4, [9, [16, 25], 144]])).toStrictEqual([2, [3, [4, 5], 12]]);
	});

	test("Util.mod()", () => {
		expect(Util.mod()).toStrictEqual(0);
	});
	test("Util.mod(5, 2)", () => {
		expect(Util.mod(5, 2)).toStrictEqual(1);
	});
	test("Util.mod([-3, 0, 3, 7], 2)", () => {
		expect(Util.mod([-3, 0, 3, 7], 2)).toStrictEqual([1, 0, 1, 1]);
	});
	test("Util.mod([4, [9, [16, 25], 144]], [5, 3])", () => {
		expect(Util.mod([4, [9, [16, 25], 144]], [5, 3])).toStrictEqual([ 4, [ 0, [ 1, 1 ], 0 ] ]);
	});

	test("Util.lerp()", () => {
		expect(Util.lerp()).toStrictEqual(0);
	});
	test("Util.lerp()", () => {
		expect(Util.lerp(2, 10, 0.5)).toStrictEqual(6);
	});
	test("Util.lerp()", () => {
		expect(Util.lerp([-2, 4, 6], [10, 20, 30], 0.5)).toStrictEqual([4, 12, 18]);
	});

	test("Util.toArray()", () => {
		expect(Util.toArray()).toStrictEqual([undefined]);
	});
	test("Util.toArray(1)", () => {
		expect(Util.toArray(1)).toStrictEqual([1]);
	});
	test("Util.toArray([1,2,3])", () => {
		expect(Util.toArray([1,2,3])).toStrictEqual([1, 2, 3]);
	});

	test("Util.fromArray()", () => {
		expect(Util.fromArray()).toStrictEqual(undefined);
	});
	test("Util.fromArray(1)", () => {
		expect(Util.fromArray(1)).toStrictEqual(1);
	});
	test("Util.fromArray([1,2,3])", () => {
		expect(Util.fromArray([1,2,3])).toStrictEqual(1);
	});
	test("Util.fromArray([1,2,3], 2)", () => {
		expect(Util.fromArray([1,2,3], 2)).toStrictEqual(3);
	});

	test("Util.length()", () => {
		expect(Util.length()).toStrictEqual(1);
	});
	test("Util.length([1, 2, 3, 4, 5])", () => {
		expect(Util.length([1, 2, 3, 4, 5])).toStrictEqual(5);
	});
	test("Util.size(8)", () => {
		expect(Util.size(8)).toStrictEqual(8);
	});
	test("Util.size(Math.PI)", () => {
		expect(Util.size(Math.PI)).toStrictEqual(3);
	});
	test("Util.size(-Math.PI)", () => {
		expect(Util.size(-Math.PI)).toStrictEqual(1);
	});
	test("Util.size('foo')", () => {
		expect(Util.size('foo')).toStrictEqual(1);
	});

	test("Util.sum([1, 2, 3, 4])", () => {
		expect(Util.sum([1, 2, 3, 4])).toStrictEqual(10);
	});
	test("Util.sum([10, 'foo', 11, 'bar', 22])", () => {
		expect(Util.sum([10, 'foo', 11, 'bar', 22])).toStrictEqual(43);
	});
	test("Util.sum([1,2,[3,4,[5,6],7],8])", () => {
		expect(Util.sum([1,2,[3,4,[5,6],7],8])).toStrictEqual(36);
	});

	test("Util.trunc()", () => {
		expect(Util.trunc()).toStrictEqual([0]);
	});
	test("Util.trunc(3.14)", () => {
		expect(Util.trunc(3.14)).toStrictEqual(3);
	})
	test("Util.trunc([3.14, [5.12, 6.18]])", () => {
		expect(Util.trunc([3.14, [5.12, 6.18]])).toStrictEqual([3, [5, 6]]);
	});
	
	test("Util.norm()", () => {
		expect(Util.norm()).toStrictEqual([0]);
	});
	test("Util.norm(5)", () => {
		expect(Util.norm(5)).toStrictEqual(1);
	});
	test("Util.norm([0, 3, 9, 12, 24])", () => {
		expect(Util.norm([0, 3, 9, 12, 24])).toStrictEqual([ 0, 0.125, 0.375, 0.5, 1 ]);
	});
	test("Util.norm([5, [12, [4, 17]], 3, 1])", () => {
		expect(Util.norm([5, [12, [4, 17]], 3, 1])).toStrictEqual([ 0.25, [ 0.6875, [ 0.1875, 1 ] ], 0.125, 0 ]);
	});
	test("Util.snorm([0, 3, 9, 12, 24])", () => {
		expect(Util.snorm([0, 3, 9, 12, 24])).toStrictEqual([ -1, -0.75, -0.25, 0, 1 ]);
	});
	test("Util.snorm([5, [12, [4, 17]], 3, 1])", () => {
		expect(Util.snorm([5, [12, [4, 17]], 3, 1])).toStrictEqual([ -0.5, [ 0.375, [ -0.625, 1 ] ], -0.75, -1 ]);
	});

	test("Util.arrayCombinations()", () => {
		expect(Util.arrayCombinations()).toStrictEqual([[]]);
	});
	test("Util.arrayCombinations([1, 2], [10, 20])", () => {
		expect(Util.arrayCombinations([1, 2], [10, 20])).toStrictEqual([[1, 10], [2, 20]]);
	});
	test("Util.arrayCombinations([1, 2, 3], [10, 20])", () => {
		expect(Util.arrayCombinations([1, 2, 3], [10, 20])).toStrictEqual([[1, 10], [2, 20], [3, 10], [1, 20], [2, 10], [3, 20]]);
	});
	test("Util.arrayCombinations([1, [2, 3]], [10, 20], [100, 200])", () => {
		expect(Util.arrayCombinations([1, [2, 3]], [10, 20], [100, 200])).toStrictEqual([[1, 10, 100], [[2, 3], 20, 200]]);
	});

	test("Util.map()", () => {
		expect(Util.map()).toStrictEqual(0);
	});
	test("Util.map(0.5, 0, 1, 0, 2)", () => {
		expect(Util.map(0.5, 0, 1, 0, 2)).toStrictEqual(1);
	});
	test("Util.map([5, [12, [4, 17]], 3, 1], 1, 17, 0, 1)", () => {
		expect(Util.map([5, [12, [4, 17]], 3, 1], 1, 17, 0, 1)).toStrictEqual([ 0.25, [ 0.6875, [ 0.1875, 1 ] ], 0.125, 0 ]);
	});

	test("Util.fold()", () => {
		expect(Util.fold()).toStrictEqual(0);
	})
	test("Util.fold([0, [1, [2, 3]], [4, 5], 6], 2, 4)", () => {
		expect(Util.fold([0, [1, [2, 3]], [4, 5], 6], 2, 4)).toStrictEqual([ 4, [ 3, [ 2, 3 ] ], [ 4, 3 ], 2 ]);
	});

	test("Util.constrain()", () => {
		expect(Util.constrain()).toStrictEqual(0);
	})
	test("Util.constrain([0, [1, [2, 3]], [4, 5], 6], 2, 4)", () => {
		expect(Util.constrain([0, [1, [2, 3]], [4, 5], 6], 2, 4)).toStrictEqual([ 2, [ 2, [ 2, 3 ] ], [ 4, 4 ], 4 ]);
	});
	
	test("Util.wrap()", () => {
		expect(Util.wrap()).toStrictEqual(0);
	})
	test("Util.wrap([0, [1, [2, 3]], [4, 5], 6], 2, 5)", () => {
		expect(Util.wrap([0, [1, [2, 3]], [4, 5], 6], 2, 5)).toStrictEqual([ 3, [ 4, [ 2, 3 ] ], [ 4, 2 ], 3 ]);
	});
	
	test("Util.draw(Gen.cosine(25, 3, 0, 10))", () => {
		expect(Util.draw(Gen.cosine(25, 3, 0, 10), {log: false})).toStrictEqual('█▓▒   ░▒▓▓▒    ▒▓▓▒░   ▒▓');
	});
	test("Util.draw(Gen.saw(25, 3, 0, 10), {extend: false})", () => {
		expect(Util.draw(Gen.saw(25, 3, 0, 10), {log: false, extend: false})).toStrictEqual('  ..-==+# ..--==#  .--==+');
	});
}

function tester(f){
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
