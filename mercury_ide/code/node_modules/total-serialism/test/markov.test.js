const exp = require('constants');
const fs = require('fs');

// test with different builds
let entryPoint = "../index";
// entryPoint = "../build/ts.bundle.js";
// entryPoint = "../build/ts.es5.js";
let es5build = "../build/ts.es5.min.js";

// load library from index.js;
let TS = require(entryPoint);

// run full test with ./index.js
fullTest(TS);

// reload library with es5.min.js build
TS = require(es5build);

// and run full test with es5.min.js build;
fullTest(TS);

function fullTest(Srl){
	const Rand = Srl.Stochastic;

	test("Markov init", () => {
		let m = new Rand.MarkovChain();
		expect(m).toBeDefined();
	});

	test("Train markov", () => {
		let m = new Rand.MarkovChain();
		m.train([1, 2, 3, 6, 2, 6, 7]);
		expect(m.table[2]).toStrictEqual([3, 6]);
		expect(m.table[6]).toStrictEqual([2, 7]);
	});

	test("Train with strings", () => {
		let m = new Rand.MarkovChain(['c', 'e', 'f', 'e', 'g', 'f', 'a', 'c']);
		m.train(['g', 'a', 'b', 'g', 'a', 'f', 'd', 'e']);
		m.state('c');
		m.seed(1618);
		expect(m.chain(5)).toStrictEqual([ 'e', 'f', 'e', 'f', 'd' ]);
	});

	test("Generating", () => {
		let m = new Rand.MarkovChain();
		m.train([1, 2, 3, 4]);
		m.state(1);
		expect(m._state).toBe(1);

		m.next();
		expect(m._state).toBe(2);
	});

	test("Unfound state", () => {
		let m = new Rand.MarkovChain();
		m.train([1, 2, 3, 4]);
		m.next();
		expect(m._state).toBeDefined();
	});

	test("Random state", () => {
		let m = new Rand.MarkovChain();
		m.train([1, 2, 3, 4]);
		m.state(3);
		m.next();
		m.next();
		const p = [2, 3, 4];
		expect(p).toContain(m._state);
	});

	test("Seeding", () => {
		let m = new Rand.MarkovChain();
		m.train([1, 2, 1, 3, 1, 4, 1, 5, 1]);
		Rand.seed(3141);
		m.state(1);
		let v = m.chain(6);
		expect(v).toStrictEqual([2, 1, 2, 1, 5, 1]);
		Rand.seed(3141);
		m.state(1);
		v = m.chain(6);
		expect(v).toStrictEqual([2, 1, 2, 1, 5, 1]);
	});

	test("Deep Markov init", () => {
		let markov = new Rand.DeepMarkovChain();
		expect(markov).toBeDefined();
	});

	test("training works", () => {
		let markov = new Rand.DeepMarkovChain();
		markov.train([1, 2, 3, 4, 5, 6, 1, 2, 4], 2);
		expect(markov._table.get(JSON.stringify([1, 2]))).toStrictEqual([3, 4]);
		expect(markov._table.get(JSON.stringify([2, 3]))).toStrictEqual([4]);
		expect(markov._table.get(JSON.stringify([3, 4]))).toStrictEqual([5]);
		expect(markov._table.get(JSON.stringify([4, 5]))).toStrictEqual([6]);
	});

	test("iterating works", () => {
		let markov = new Rand.DeepMarkovChain();
		markov.train([1, 2, 3, 4], 2);
		markov.state([1, 2]);
		expect(markov._state).toBe(JSON.stringify([1, 2]));

		markov.next();
		expect(markov._state).toBe(JSON.stringify([2, 3]));
	});

	test("unfound state can be handled", () => {
		let markov = new Rand.DeepMarkovChain();
		markov.train([1, 2, 3, 4], 2);
		markov.next();
		expect(markov._state).toBeDefined();
	});

	test("random state", () => {
		let markov = new Rand.DeepMarkovChain();
		markov.train([1, 2, 3, 4], 3);
		markov.randomState();

		const possible = [
			JSON.stringify([1, 2, 3]),
			JSON.stringify([2, 3, 4])
		]
		expect(possible).toContain(markov._state);
	});
}