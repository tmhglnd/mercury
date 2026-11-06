//
// List functions testing file
//

const Mercury = require('../index.js');
// const Mercury = require('../build/mercury.es5.min.js');

// Float arrays not included because results can not StrictEqual 
// (rounding errors with Floats)

test('Generative List Methods', () => {
	expect(Mercury(`print spread(5 0 12)`).parseTree.print[0]).toStrictEqual([0, 2, 4, 7, 9]);

	expect(Mercury(`print spreadF(4)`).parseTree.print[0]).toStrictEqual([0, 0.25, 0.5, 0.75]);

	expect(Mercury(`print spread(5 12 0)`).parseTree.print[0]).toStrictEqual([12, 9, 7, 4, 2]);

	expect(Mercury(`print spreadInclusive(5 0 12)`).parseTree.print[0]).toStrictEqual([0, 3, 6, 9, 12]);

	expect(Mercury(`print spreadIncF(3)`).parseTree.print[0]).toStrictEqual([0, 0.5, 1]);

	expect(Mercury(`print fill(10 2 15 3 20 4)`).parseTree.print[0]).toStrictEqual([10, 10, 15, 15, 15, 20, 20, 20, 20]);
	
	expect(Mercury(`print fill(abc 2 xyz 3)`).parseTree.print[0]).toStrictEqual(['abc', 'abc', 'xyz', 'xyz', 'xyz']);
	
	expect(Mercury(`print fill([10 2 15 3 20 4])`).parseTree.print[0]).toStrictEqual([10, 10, 15, 15, 15, 20, 20, 20, 20]);

	expect(Mercury(`print fill([10 20] 2 [30 40] 3 50 4)`).parseTree.print[0]).toStrictEqual([[10, 20], [10, 20], [30, 40], [30, 40], [30, 40], 50, 50, 50, 50]);

	expect(Mercury(`print sine(10)`).parseTree.print[0]).toStrictEqual([6, 9, 11, 11, 9, 6, 2, 0, 0, 2]);

	expect(Mercury(`print sine(10 1 -12 12)`).parseTree.print[0]).toStrictEqual([0, 7, 11, 11, 7, 0, -7, -11, -11, -7]);

	expect(Mercury(`print sine(10 2 0 5)`).parseTree.print[0]).toStrictEqual([2, 4, 3, 1, 0, 2, 4, 3, 1, 0]);

	expect(Mercury(`print sineFloat()`).parseTree.print[0]).toStrictEqual([0]);

	expect(Mercury(`print sineF()`).parseTree.print[0]).toStrictEqual([0]);

	expect(Mercury(`print cosine(10)`).parseTree.print[0]).toStrictEqual([12, 10, 7, 4, 1, 0, 1, 4, 7, 10]);

	expect(Mercury(`print cosine(10 1 -12 12)`).parseTree.print[0]).toStrictEqual([12, 9, 3, -3, -9, -12, -9, -3, 3, 9]);

	expect(Mercury(`print cosine(10 2 0 5)`).parseTree.print[0]).toStrictEqual([5, 3, 0, 0, 3, 5, 3, 0, 0, 3]);

	expect(Mercury(`print cosineFloat()`).parseTree.print[0]).toStrictEqual([1]);

	expect(Mercury(`print cosF()`).parseTree.print[0]).toStrictEqual([1]);

	expect(Mercury(`print binary(358)`).parseTree.print[0]).toStrictEqual([1, 0, 1, 1, 0, 0, 1, 1, 0]);

	expect(Mercury(`print binary(4 3 5)`).parseTree.print[0]).toStrictEqual([1, 0, 0, 1, 1, 1, 0, 1]);

	expect(Mercury(`print spacing(2 3 2)`).parseTree.print[0]).toStrictEqual([1, 0, 1, 0, 0, 1, 0]);

});

test('Algorithmic List Methods', () => {
	expect(Mercury(`print euclid(8 3)`).parseTree.print[0]).toStrictEqual([1,0,0,1,0,0,1,0]);

	expect(Mercury(`print hex(8892)`).parseTree.print[0]).toStrictEqual([1,0,0,0,1,0,0,0,1,0,0,1,0,0,1,0]);

	expect(Mercury(`print hex("fb")`).parseTree.print[0]).toStrictEqual([1,1,1,1,1,0,1,1]);

	expect(Mercury(`print fibonacci(8)`).parseTree.print[0]).toStrictEqual([0, 1, 1, 2, 3, 5, 8, 13]);

	expect(Mercury(`print fibonacci(5 7)`).parseTree.print[0]).toStrictEqual([13, 21, 34, 55, 89]);

	expect(Mercury(`print pisano(8)`).parseTree.print[0]).toStrictEqual([0, 1, 1, 2, 3, 5, 0, 5, 5, 2, 7, 1]);
	
	expect(Mercury(`print pisano(5 10)`).parseTree.print[0]).toStrictEqual([0, 1, 1, 2, 3, 0, 3, 3, 1, 4]);

	expect(Mercury(`print pell(8)`).parseTree.print[0]).toStrictEqual([0, 1, 2, 5, 12, 29, 70, 169]);
	
	expect(Mercury(`print lucas(8)`).parseTree.print[0]).toStrictEqual([2, 1, 3, 4, 7, 11, 18, 29]);

	expect(Mercury(`print threeFibonacci(8)`).parseTree.print[0]).toStrictEqual([0, 1, 3, 10, 33, 109, 360, 1189]);

	expect(Mercury(`print collatz()`).parseTree.print[0]).toStrictEqual([1, 2, 4, 8, 16, 5, 10, 3, 6]);
	
	expect(Mercury(`print collatzMod()`).parseTree.print[0]).toStrictEqual([1, 0, 0, 0, 0, 1, 0, 1, 0]);
});

test('Stochastic List Methods', () => {
	
	expect(Mercury(`set randomSeed 1234`).parseTree.global.randomSeed).toStrictEqual([ 1234 ]);

	expect(Mercury(`print getSeed()`).parseTree.print[0]).toStrictEqual(1234);
	
	let code = `
	set randomSeed 31415
	print random(5)
	print random(5 12)
	print random(5 -12 12)`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[9, 4, 8, 3, 9], [10, 6, 5, 7, 2], [-7, 3, 8, 3, -5]]);
	
	code = `
	set randomSeed 31415
	print drunk(10 5 0 24)
	print drunk(10 4 0 12 6 false)
	`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[13, 15, 19, 21, 22, 19, 22, 20, 23, 22], [5, 9, 11, 9, 6, 3, 4, 2, 1, 0]]);
	
	code = `
	set randomSeed 31415
	print urn(5)
	print urn(8 4)
	print urn(8 10 14)`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[9, 3, 6, 2, 11],[2, 3, 1, 0, 1, 3, 2, 0],[12, 13, 10, 11, 10, 11, 13, 12]]);
	
	code = `
	set randomSeed 31415
	print coin(5)
	print dice(5)
	print clave(5)
	print twelveTone()`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[1, 0, 1, 0, 1], [6, 4, 3, 4, 2], [1, 0, 1, 0, 0], [2, 9, 0, 6, 1, 11, 5, 8, 4, 3, 7, 10]]);
	
	code = `
	set randomSeed 31415
	print choose(4 spread(10))
	print pick(4 spread(10))
	print shuffle(spread(4))
	print expand([0 3 2 5] 8)
	`

	expect(Mercury(code).parseTree.print).toStrictEqual([[7, 3, 6, 3], [7, 9, 4, 3], [1, 3, 0, 2], [0, 3, 2, 5, 4, 7, 10, 13]]);

	code = `
	set randomSeed 1234
	list mkv markovTrain([1 2 3 4 3 2 1 3 1 4 2 3 2 4] 4)
	print markovChain(10 mkv)
	`

	expect(Mercury(code).parseTree.print).toStrictEqual([[ 3, 1, 4, 2, 3, 2, 4, 4, 2, 3 ]]);
	
	code = `
	set randomSeed 1234
	list mkv markovTrain([1 2 3 4 3 2 1 3 1 4 2 3 2 4])
	print markovChain(10 mkv)
	`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[ 2, 4, 2, 3, 2,
		1, 3, 1, 4, 2 ]]);

});

test('Transform List Methods', () => {
	let code = `
	print clone([0 3 7] 3 7)
	print join([1 2 3] [10 11 12])
	print copy([0 3 7] 3)
	print every(euclid(8 5) 2 8 0 1)
	print pad([3 7 9] 8)
	print pad([c e g] 8 - 4)
	`

	expect(Mercury(code).parseTree.print).toStrictEqual([[3, 6, 10, 7, 10, 14],[1, 2, 3, 10, 11, 12],[0, 3, 7, 0, 3, 7, 0, 3, 7], [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 1, 0, 1], [3, 7, 9, 0, 0, 0, 0, 0], ['-', '-', '-', '-', 'c', 'e', 'g', '-']]);

	code = `
	print flat([1 [2 3 [ 4 ] 5] 6])
	print invert([0 3 7 12])
	print flip([0 3 7 12] 5)
	print invert([0 3 7 12] 3 10)
	print lace([0 3 7] [12 19])
	print lookup([0 1 1 2 0] [10 11 12])
	print get([8 -5 144 3.14] [c e g])
	print palin([0 3 7 12])
	print mirror([0 3 7 12] 1)
	print repeat([0 3 7] 4)
	print repeat([0 3 7] [2 3])
	print repeat([c e g] [2 3])
	print reverse([1 2 3 4])
	print rotate([1 2 3 4] 2)
	print rot([1 2 3 4] -1)
	print filter([1 2 3 4] 3)
	`

	expect(Mercury(code).parseTree.print).toStrictEqual([[1, 2, 3, 4, 5, 6],[12, 9, 5, 0],[10, 7, 3, -2],[13, 10, 6, 1],[0, 12, 3, 19, 7],[10, 11, 11, 12, 10],['g', 'e', 'c', 'c'],[0, 3, 7, 12, 12, 7, 3, 0],[0, 3, 7, 12, 7, 3],[0, 0, 0, 0, 3, 3, 3, 3, 7, 7, 7, 7],[0, 0, 3, 3, 3, 7, 7],['c', 'c', 'e', 'e', 'e', 'g', 'g'],[4, 3, 2, 1],[3, 4, 1, 2],[2, 3, 4, 1],[1, 2, 4]]);
	
	code = `
	print sort(shuffle(spread(5)))
	print slice(spread(8) 3)
	print slice(spread(8) [3 2] 0)
	print split(spread(8) 3)
	print split(spread(8) [3 2])
	print cut(spread(8) 3)
	print cutLast(spread(8) 3)
	print spray(spread(5 10 20) euclid(8 5))
	print stretch([1 10 5] 9)
	print thin([1 1 2 2 3 3])
	print unique([10 10 20 20 30 30])`

	expect(Mercury(code).parseTree.print).toStrictEqual([[0, 1, 2, 3, 4], [[0, 1, 2], [3, 4, 5, 6, 7]], [[0, 1, 2], [3, 4]], [[0, 1, 2], [3, 4, 5], [6, 7]], [[0, 1, 2], [3, 4], [5, 6, 7]], [0, 1, 2], [3, 4, 5, 6, 7], [10, 0, 12, 0, 14, 16, 0, 18], [1, 3, 5, 7, 10, 8, 7, 6, 5], [1, 2, 3], [10, 20, 30]]);

	code = `
	print pinky([0 3 7 12 19])
	print pinkyUp([0 3 7 12 19])
	print pinkyDown([0 3 7 12 19])
	print pinkyUpDown([0 3 7 12 19])`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[0, 19, 3, 19, 7, 19, 12, 19], [0, 19, 3, 19, 7, 19, 12, 19], [12, 19, 7, 19, 3, 19, 0, 19], [0, 19, 3, 19, 7, 19, 12, 19, 7, 19, 3, 19]]);

	code = `
	print thumb([0 3 7 12 19])
	print thumbUp([0 3 7 12 19])
	print thumbDown([0 3 7 12 19])
	print thumbUpDown([0 3 7 12 19])`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[0, 3, 0, 7, 0, 12, 0, 19], [0, 3, 0, 7, 0, 12, 0, 19], [0, 19, 0, 12, 0, 7, 0, 3], [0, 3, 0, 7, 0, 12, 0, 19, 0, 12, 0, 7]]);
});

test('Utility List Methods', () => {
	let code = `
	print add([1 2 3 4] [1 2 3])
	print add([1 [2 3]] [10 [20 30 40]])
	print subtract([1 2 3 4] [1 2 3])
	print sub([1 [2 3]] [10 [20 30 40]])
	print multiply([1 2 3 4] [1 2 3])
	print mul([1 [2 3]] [10 [20 30 40]])
	print divide([1 2 3 4] [1 2 3])
	print div([1 [2 3]] [10 [20 30 40]])
	print normalize([0 1 2 3 4])
	print norm([5 [12 [4 17]] 3 1])
	print snorm([5 [12 [4 17]] 3 1])
	print mod([-2 [4 [3 7]]] 5)
	print int(spreadF(5 2 4))
	print floor(spreadF(5 2 4))
	print ceil(spreadF(5 2 4))
	print round(spreadF(5 2 4))
	`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[2, 4, 6, 5], [11, [22, 33, 42]], [0, 0, 0, 3], [-9, [-18, -27, -38]], [1, 4, 9, 4], [10, [40, 90, 80]], [1, 1, 1, 4], [0.1, [0.1, 0.1, 0.05]], [0, 0.25, 0.5, 0.75, 1], [0.25, [0.6875, [0.1875, 1]], 0.125, 0], [-0.5, [0.375, [-0.625, 1]], -0.75, -1], [3, [4, [3, 2]]], [2, 2, 2, 3, 3], [2, 2, 2, 3, 3], [2, 3, 3, 4, 4], [2, 2, 3, 3, 4]]);

	code = `
	print sum([1 2 3 4 5])
	print reduce([1 2 3 4 5])
	print size(spread(5))
	print euclid(8 size([1 2 3]))`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([ 15, 15, 5, [1, 0, 0, 1, 0, 0, 1, 0] ]);

	code = `
	print wrap(spread(7) 2 5)
	print clip(spread(7) 2 5)
	print fold(spread(7) 3 5)
	print map(spread(4) 0 5 10 20)
	`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[3, 4, 2, 3, 4, 2, 3], [2, 2, 2, 3, 4, 5, 5], [4, 5, 4, 3, 4, 5, 4], [10, 12, 14, 16]]);
	
	code = `
	print equals([0 2 3 4])
	print equals([1 2 3 4] [1 20 30 4])
	print eq([hat kick snare] [hatt kick snare])
	print notEquals([1 2 3 4] [1 20 30 4])
	print neq([hat kick snare] [hatt kick snare])
	print greater([1 2 3 5] [1 20 30 4])
	print gt([1 2 3 5] [1 20 30 4])
	print greaterEquals([1 2 3 5] [1 20 30 4])
	print gte([1 2 3 5] [1 20 30 4])
	print less([1 2 3 5] [1 20 30 4])
	print lt([1 2 3 5] [1 20 30 4])
	print lessEquals([1 2 3 5] [1 20 30 4])
	print lte([1 2 3 5] [1 20 30 4])
	`

	expect(Mercury(code).parseTree.print).toStrictEqual([[1, 0, 0, 0], [1, 0, 0, 1], [0, 1, 1], [0, 1, 1, 0], [1, 0, 0], [0, 0, 0, 1], [0, 0, 0, 1], [1, 0, 0, 1], [1, 0, 0, 1], [0, 1, 1, 0], [0, 1, 1, 0], [1, 1, 1, 0], [1, 1, 1, 0]]);

	code = `
	print cowsay()
	print cowthink()
	print cowsay('hi there!' 'random')
	print cowthink('what to do next?')
	print cowthink([1 2 3 4])
	`

	Mercury(code).parseTree.print.forEach(p => console.log(p));
});

test('Translate List Methods', () => {
	code = `
	print midiToNote([60 63 67 69])
	print noteToMidi([c4 eb4 g4 a4])
	print freqToMidi([ 261 311 391 440 ])
	print freqToNote([ 261 311 391 440 ])
	print relativeToMidi([-12 -5 0 4 2 9] c4)`
		
	expect(Mercury(code).parseTree.print).toStrictEqual([['c4', 'eb4', 'g4', 'a4'], [60, 63, 67, 69], [60, 63, 67, 69], ['c4', 'eb4', 'g4', 'a4'], [48, 55, 60, 64, 62, 69]]);

	code = `
	print int(midiToFreq([60 63 67 69]))
	print int(noteToFreq([c4 eb4 g4 a4]))
	print int(freqToMidi([ 261 311 391 440 ] true))
	print int(relativeToFreq([-12 -5 0 4 2 9] c4))
	print int(ratioToCent([2/1 3/2 4/3 5/4 9/8]))
	`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([[261, 311, 391, 440],[261, 311, 391, 440],[59, 62, 66, 69],[130, 195, 261, 329, 293, 440], [ 1200, 701, 498, 386, 203 ]]);
	
	code = `
	print chromaToRelative([c eb G Ab a+ f-]) 
	print chordsFromNumerals([I IIm IVsus2 V7 VIm9])
	print chordsFromNames([C Dm Fsus2 G7 Am9])`

	expect(Mercury(code).parseTree.print).toStrictEqual([[0, 3, 7, 8, 21, -7], [[0, 4, 7], [2, 5, 9], [5, 7, 0], [7, 11, 2, 5], [9, 0, 4, 7, 11]], [[0, 4, 7], [2, 5, 9], [5, 7, 0], [7, 11, 2, 5], [9, 0, 4, 7, 11]]]);

	expect(Mercury(`set scale minor d`).parseTree.global.scale).toStrictEqual(['minor', 'd']);

	expect(Mercury(`print scaleNames()`).parseTree.print[0]).toHaveLength(101);

	code = `
	set scale minor a
	set root c
	print getScale()
	print getRoot()
	print getScaleMap()
	print toScale([0 1 2 3 4 5 6 7 8 9 10 11])
	print toScale([8 13 -1 20 -6 21 -4 12])
	print int(toScale([0 4.1 6.5 7.1 9.25]))
	print toScale([0 1 2 3 4 5 6 7 8 9 10 11] major)
	print toScale([0 1 2 3 4 5 6 7 8 9 10 11] minor eb)
	`

	expect(Mercury(code).parseTree.print).toStrictEqual([ 'minor', 'c', [0, 0, 2, 3, 3, 5, 5, 7, 8, 8, 10, 10], [0, 0, 2, 3, 3, 5, 5, 7, 8, 8, 10, 10], [8, 12, -2, 20, -7, 20, -4, 12], [0, 3, 5, 7, 8], [ 0, 0, 2, 2, 4, 5, 5, 7, 7, 9, 9, 11 ], [ 3, 3, 5, 6, 6, 8, 8, 10, 11, 11, 13, 13 ]]);
	
	code = `
	set tempo 120
	print getTempo()
	print divisionToRatio([1/4 1/8 3/16 1/4 2])
	print ratioToMs([0.25 [0.125 [0.1875 0.25]] 2])
	print ratioToMs([0.25 [0.125 [0.1875 0.25]] 2] 100)`
	
	expect(Mercury(code).parseTree.print).toStrictEqual([120, [0.25, 0.125, 0.1875, 0.25, 2], [500, [250, [375, 500]], 4000], [600, [300, [450, 600]], 4800]]);

	code = `
	print textCode(bach)
	print textCode('bach cage')
	print textCode([bach cage])`

	expect(Mercury(code).parseTree.print).toStrictEqual([ [ 98, 97, 99, 104 ], [ 98, 97, 99, 104, 32, 99, 97, 103, 101 ], [[ 98, 97, 99, 104], [99, 97, 103, 101]] ]);
});
