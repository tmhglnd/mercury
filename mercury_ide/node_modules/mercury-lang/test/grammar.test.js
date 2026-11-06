// 
// Extensive grammar testing file
//

const Mercury = require('../index.js');
// const Mercury = require('./../build/mercury.es5.min.js');

test('Empty Parse', () => {
	let expected = {
		'parseTree' : {
			'global' : {
				'randomSeed' : [ 0 ],
				'highPass' : [ 5, 0 ],
				'lowPass' : [ 18000, 0 ],
				'silence' : false,
			},
			'variables' : {},
			'objects' : {},
			'groups' : {
				'all' : []
			},
			'print' : [],
			'display' : [],
			'comments' : [],
		},
		'syntaxTree' : { '@main' : [] },
		'errors' : [],
		'warnings' : []
	}
	expect(Mercury('')).toStrictEqual(expected);
});

test('Parse Numbers', () => {
	let expected = [ 12,  34, -56, 7.89, 1011.121, 0.4321, 12. ];
	let code = 'print 012 34 -56 +7.89 1.011121E3 0.4321 12.';
	expect(Mercury(code).parseTree.print).toStrictEqual(expected);
});

test('Parse Notenames', () => {
	let expected = [ 'a#', 'A', 'b', 'B', 'c1', 'C', 'd', 'Dx', 'e', 'E', 'fbb', 'F5', 'g', 'G2' ];

	let code = 'print a# A b B c1 C d Dx e E fbb F5 g G2';
	expect(Mercury(code).parseTree.print).toStrictEqual(expected);
});

test('Parse Divisions', () => {
	let expected = [ '1/4', '3/16', '7/16', '4/5', '3/1' ];
	let code = 'print 1/4 3/16 7/16 4:5 3:1';
	expect(Mercury(code).parseTree.print).toStrictEqual(expected);
});

test('Parse Strings', () => {
	let expected = [ 'hello world', 'hello world2', "hello '3'" ];
	let code = `print "hello world" 'hello world2' "hello '3'"`;
	expect(Mercury(code).parseTree.print).toStrictEqual(expected);
});

test('Parse Identifiers', () => {
	let expected = [ 'a_bcd', 'abc_12', 'abc-12.xyz', '-abc' ];
	let code = `print a_bcd abc_12 abc-12.xyz -abc`;
	expect(Mercury(code).parseTree.print).toStrictEqual(expected);
});

test('Parse Lists', () => {
	let expected = { 
		l0: 3.1415,
		l1: [ 1, 2, 3.1415 ],
		l2: [ 1, 2, [1, 2, 3.1415], 56 ],
		l3: [ 'a_bcd', 'abc_12', 'abc-12.xyz' ],
		l4: [ "hello 'world'!", 'foo "bar"' ],
		l5: [ 1, 2, [3, 4], 5, [6, [7, 8], 9], 10, 11],
		l6: []
	}

	let code = `
		list l0 3.1415
		list l1 [ 1 2 l0 ]
		list l2 [ 1 2 l1 56 ]
		list l3 [ a_bcd abc_12 abc-12.xyz ]
		list l4 [ "hello 'world'!" 'foo "bar"' ]
		list l5 [ 1 2 [3 4] 5 [6 [7 8] 9] 10 11 ]
		list l6 []`

	expect(Mercury(code).parseTree.variables).toStrictEqual(expected);
});

test('Generate Lists', () => {
	let expected = {
		l0: [ 1, 0, 0, 1, 0, 0, 1, 0 ],
		l1: [ 'a', 'a', 'b', 'b', 'c', 'c' ],
		l2: [ 0, 3, 6, 9, 9, 6, 3, 0 ],
		l3: [[0, 1, 2, 3], [0, 1, 2]],
		l4: [ 0, 1, 2, 3, 3, 2, 1, 0 ]
	}

	let code = `
		list l0 euclid(8 3 0)
		list l1 repeat([a b c] 2)
		list l2 palin( spread(4 0 12) )
		array l3 [ spread(4) spread(3) ]
		ring l4 palin([0 1 2 3])`
	
	expect(Mercury(code).parseTree.variables).toStrictEqual(expected);
});

test('Global Settings', () => {
	let expected = {
		'tempo' : [ 143, 1000 ],
		'scale' : ['major', 'g#'],
		'nonSetting' : [ 999 ],
		'randomSeed' : [ 9876 ],
		'highPass' : [ 500, 3000 ],
		'lowPass' : [ 2000, 500 ],
		'crossFade' : [ 100 ],
		'foobar' : [ [0, 1] ],
		'silence' : false
	}

	let code = `
		set randomSeed 9876
		set tempo 143 1000
		set scale major g#
		set hipass 500 3000
		set lopass 2000 500
		set crossFade 100
		set nonSetting 999
		set foobar spread(2)`
	
	// console.log(Mercury(code).warnings);
	expect(Mercury(code).parseTree.global).toStrictEqual(expected);
});

test('Default Synth', () => {
	let expected = {
		's0' : {
			'object' : 'synth',
			'type' : 'saw',
			'functions' : {
				'name' : ['s0'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'note' : [ 0, 0 ],
				'env' : [ 1, 250 ],
				'amp' : [ 0.7 ],
				'pan' : [ 0 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 1
		}
	};

	let code = `new synth saw name(s0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Default Sample', () => {
	let expected = {
		's0' : {
			'object' : 'sample',
			'type' : 'kick_909',
			'functions' : {
				'name' : ['s0'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'speed' : [ 1 ],
				'note' : [ 'off' ],
				'env' : [ -1 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 0.9 ],
				'pan' : [ 0 ],
				'note' : [ "off" ],
				'tune' : [ 60 ],
				'stretch': [0, 1, 1],
				'add_fx' : [],
			},
			'line' : 1
		}
	};

	let code = `new sample kick_909 name(s0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Default Midi', () => {
	let expected = {
		'm0' : {
			'object' : 'midi',
			'type' : 'default',
			'functions' : {
				'name' : [ 'm0' ],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 1 ],
				'note' : [ 0, 0 ],
				'env' : [ 250 ],
				'out' : [ 1 ],
				'chord' : 'off',
				'sync' : 'off',
				'add_fx' : []
			},
			'line' : 1
		}
	};

	let code = `new midi default name(m0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Default Input', () => {
	let expected = {
		'i0' : {
			'object' : 'input',
			'type' : 'default',
			'functions' : {
				'name' : [ 'i0' ],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'note' : [ 'off' ],
				'pan' : [ 0 ],
				'env' : [ -1 ],
				'amp' : [ 0.9 ],
				'add_fx' : []
			},
			'line' : 1
		}
	};

	let code = `new input default name(i0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Default Loop', () => {
	let expected = {
		'l0' : {
			'object' : 'loop',
			'type' : 'amen',
			'functions' : {
				'name' : ['l0'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'speed' : [ 1 ],
				'note' : [ 'off' ],
				'tune' : [ 60 ],
				'env' : [ -1 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 0.9 ],
				'pan' : [ 0 ],
				'stretch': [ 1, 1, 1 ],
				'add_fx' : [],
			},
			'line' : 1
		}
	};

	let code = `new loop amen name(l0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Default PolySynth', () => {
	let expected = {
		'p0' : {
			'object' : 'polySynth',
			'type' : 'saw',
			'functions' : {
				'name' : ['p0'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'note' : [ 0, 0 ],
				'env' : [ 1, 250 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 0.7 ],
				'pan' : [ 0 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 1
		}
	};

	let code = `new polySynth saw name(p0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Default OSC', () => {
	let expected = {
		'o0' : {
			'object' : 'osc',
			'type' : 'default',
			'functions' : {
				'name' : [ 'o0' ],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 1 ],
				'note' : [ 0, 0 ],
				'env' : [ 1, 250 ],
				'group' : [],
				'add_fx' : [],
			},
			'line' : 1
		}
	};

	let code = `new osc default name(o0)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Instruments With Functions', () => {
	let expected = {
		'bob' : {
			'object' : 'synth',
			'type' : 'saw',
			'functions' : {
				'name' : ['bob'],
				'group' : [],
				'time' : [ '1/8' ],
				'note' : [ [0, 3, 7], 0 ],
				'env' : [ 1, 50 ],
				'beat' : [ 1, -1 ],
				'pan' : [ 0 ],
				'amp' : [ 0.7 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 2
		},
		'alice' : {
			'object' : 'sample',
			'type' : 'kick',
			'functions' : {
				'name' : ['alice'],
				'group' : [],
				'time' : [ 0.25, 0.5 ],
				'speed' : [ 1 ],
				'note' : [ "off" ],
				'tune' : [ 60 ],
				'env' : [ -1 ],
				'pan' : [ 0 ],
				'beat' : [[ 1, 0, 1, 1 ]],
				'amp' : [ 0.9 ],
				'stretch': [0, 1, 1],
				'add_fx' : [],
			},
			'line' : 3
		},
		'simon' : {
			'object' : 'synth',
			'type' : 'square',
			'functions' : {
				'name' : ['simon'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'note' : [[ 6, 10, 0, 10 ]],
				'env' : [ 1, 250 ],
				'beat' : [[ 1, 0, 0, 1, 0 ]],
				'amp' : [ 0.7 ],
				'pan' : [ 0 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 4
		}
	}

	let code = `
	new synth saw note([0 3 7] 0) time(1/8) shape(1 50) name(bob)
	new sample kick time(0.25 0.5) play([1 0 1 1]) name(alice)
	new synth square note(sine(4 5.512 0 12)) play(euclid(5 2)) name(simon)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Unkown instrument, not part of defaults', () => {
	let expected = {
		s0 : {
			'object' : 'sound',
			'type' : 'unique',
			'functions' : {
				'name' : ['s0'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 1 ],
				'note' : [ 0, 0 ],
				'env' : [ 1, 250 ],
				'add_fx' : []
			},
			'line' : 1
		},
	}

	let code = `new sound unique name(s0)`;
	// console.log(Mercury(code).parseTree.objects);
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Chain FX', () => {
	let expected = {
		s0: {
			object: 'synth',
			type: 'saw',
			functions: {
				group: [],
				time: [ '1/1', 0 ],
				note: [ 0, 0 ],
				env: [ 1, 250 ],
				beat: [ 1, -1 ],
				amp: [ 0.7 ],
				pan: [ 0 ],
				wave2: [ 'saw', 0 ],
				add_fx: [ 
					[ 'drive', 4 ], 
					[ 'reverb', 0.5, 5 ], 
					[ 'shift', 7 ] ],
				name: [ 's0' ]
			},
			'line' : 1
		}
	}

	let code = `new synth saw name(s0) fx(drive 4) fx(reverb 0.5 5) fx(shift 7)`;
	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Set FX to named Synths', () => {
	let expected = {
		s0: {
			object: 'synth',
			type: [ 'saw', 'triangle', 'sine' ],
			functions: {
				group: [],
				time: [ '1/1', 0 ],
				note: [ 0, 0 ],
				env: [ 1, 250 ],
				beat: [ 1, -1 ],
				amp: [ 0.7 ],
				pan: [ 0 ],
				wave2: [ 'saw', 0 ],
				add_fx: [ 
					[ 'drive', 4 ], 
					[ 'reverb', 0.5, 5 ], 
					[ 'shift', 7 ] ],
				name: [ 's0' ]
			},
			'line' : 2
		}
	}

	let code = `
		new synth [saw triangle sine] name(s0) 
		set s0 fx(drive 4) fx(reverb 0.5 5) fx(shift 7)`;

	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Using groups to apply functions', () => {
	let expected = {
		'bob' : {
			'object' : 'synth',
			'type' : 'saw',
			'functions' : {
				'name' : [ 'bob' ],
				'group' : [ 'bus1', 'bus2' ],
				'time' : [ '1/8' ],
				'note' : [[ 6, 10, 0, 10 ]],
				'env' : [ 1, 250 ],
				'beat' : [[ 1, 0, 1, 1 ]],
				'pan' : [ 0 ],
				'amp' : [ 0.7 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 2
		},
		'alice' : {
			'object' : 'sample',
			'type' : 'kick',
			'functions' : {
				'name' : [ 'alice' ],
				'group' : [ 'bus1', 'bus3' ],
				'time' : [ 0.25, 0.5 ],
				'speed' : [ 1 ],
				'note' : [ "off" ],
				'tune' : [ 60 ],
				'env' : [ -1 ],
				'pan' : [ 0 ],
				'beat' : [[ 1, 0, 1, 1 ]],
				'amp' : [ 0.3 ],
				'stretch': [0, 1, 1],
				'add_fx' : [],
			},
			'line' : 3
		},
		'simon' : {
			'object' : 'synth',
			'type' : 'square',
			'functions' : {
				'name' : [ 'simon' ],
				'group' : [ 'bus2', 'bus3' ],
				'time' : [ '1/1', 0 ],
				'note' : [[ 6, 10, 0, 10 ]],
				'env' : [ 1, 250 ],
				'beat' : [[ 1, 0, 0, 1, 0 ]],
				'amp' : [ 0.3 ],
				'pan' : [ 0 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 4
		}
	}

	let code = `
		new synth saw time(1/8) name(bob) group(bus1 bus2) 
		new sample kick time(0.25 0.5) name(alice) group(bus1 bus3)
		new synth square play(euclid(5 2)) name(simon) group(bus2 bus3)
		
		set bus1 play([1 0 1 1])
		set bus2 note(sine(4 5.512 0 12))
		set bus3 gain(0.3)
	`;

	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
});

test('Using functions to generate instrument types', () => {
	let expected = {
		's0' : {
			'object' : 'sample',
			'type' : [ 'kick_909', 'snare_909', 'hat_909' ],
			'functions' : {
				'name' : ['s0'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'speed' : [ 1 ],
				'note' : [ 'off' ],
				'env' : [ -1 ],
				'beat' : [ 1, -1 ],
				'amp' : [ 0.9 ],
				'pan' : [ 0 ],
				'note' : [ "off" ],
				'tune' : [ 60 ],
				'stretch': [0, 1, 1],
				'add_fx' : [],
			},
			'line' : 3
		}, 
		's1' : {
			'object' : 'synth',
			'type' : [ 'square', 'square', 'saw' , 'saw' ],
			'functions' : {
				'name' : ['s1'],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'note' : [ 0, 0 ],
				'env' : [ 1, 250 ],
				'amp' : [ 0.7 ],
				'pan' : [ 0 ],
				'wave2' : [ 'saw', 0 ],
				'add_fx' : [],
			},
			'line' : 4
		},
		'i0' : {
			'object' : 'input',
			'type' : [ 'in0', 'in1', 'in2', 'in3' ],
			'functions' : {
				'name' : [ 'i0' ],
				'group' : [],
				'time' : [ '1/1', 0 ],
				'beat' : [ 1, -1 ],
				'note' : [ 'off' ],
				'pan' : [ 0 ],
				'env' : [ -1 ],
				'amp' : [ 0.9 ],
				'add_fx' : []
			},
			'line' : 5
		}
	}

	let code = `
		set randomSeed 1111
		new sample add([kick snare hat] _909) name(s0)
		new synth choose(4 [saw square]) name(s1)
		new input add(in spread(4)) name(i0)
	`

	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
})

// test('Instruments with Array Synth/Sample names', () => {
// 	let expected = {
// 		'bob' : {
// 			'object' : 'synth',
// 			'type' : [ 'square', 'saw', 'saw', 'square', 'sine' ],
// 			'functions' : {
// 				'name' : ['bob'],
// 				'group' : [],
// 				'time' : [ '1/1', 0 ],
// 				'note' : [ 0, 0 ],
// 				'env' : [ 1, 250 ],
// 				'beat' : [ 1, -1 ],
// 				'pan' : [ 0 ],
// 				'amp' : [ 0.7 ],
// 				'wave2' : [ 'saw', 0 ],
// 				'add_fx' : [],
// 			}
// 		},
// 		'alice' : {
// 			'object' : 'sample',
// 			'type' : [ ['s', 'h' ], ['s', 'h' ], 'k', ['s', 'h' ], 'k' ],
// 			'functions' : {
// 				'name' : ['alice'],
// 				'group' : [],
// 				'time' : [ '1/1', 0 ],
// 				'speed' : [ 1 ],
// 				'note' : [ "off" ],
// 				'tune' : [ 60 ],
// 				'env' : [ -1 ],
// 				'pan' : [ 0 ],
// 				'beat' : [ 1, -1 ],
// 				'amp' : [ 0.9 ],
// 				'stretch': [ 0, 1, 1 ],
// 				'add_fx' : [],
// 			}
// 		}
// 	}

// 	let code = `
// 	set randomSeed 4832
// 	new synth choose(5 [saw sine square]) name(bob)
// 	new sample choose(5 [k [s h]]) name(alice)`;
// 	expect(Mercury(code).parseTree.objects).toStrictEqual(expected);
// });

test('Silence code', () => {
	expect(Mercury(`silence`).parseTree.global.silence).toStrictEqual(true);
});

