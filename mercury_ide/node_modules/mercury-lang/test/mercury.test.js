//====================================================================
// mercury.test.js
//
// Parse a textfile of Mercury code and return the .json syntax tree
// written by Timo Hoogland 2021, www.timohoogland.com
//====================================================================

const path = require('path');
const fs = require('fs-extra');
const util = require('util');

let verbose = false;
let entryPoint = "../index.js";
// entryPoint = "../build/mercury.es5.min.js";

const Mercury = require(entryPoint);

test('Test with File input', () => {
	parseFile('./test/test-grammar.txt');
	parseFile('./test/test-dev.txt');
	parseFile('./test/test-errors.txt');
	parseFile('./test/test-small.txt');
	parseFile('./test/test-synth.txt');
	parseFile('./test/test-sample.txt');
	parseFile('./test/test-mini.txt');
	parseFile('./test/test-rings.txt');

	// // write to disk for check
	// fs.outputJSONSync(`./test/tree/${name}.json`, result, { spaces: 1 });
});

function parseFile(f){
	let file = fs.readFileSync(f, 'utf-8');
	let name = path.parse(f).name;
	// console.log(`\nParsing: ${name}\n`);

	// start time of parsing
	// let time = Date.now();

	// store syntax tree result in variable
	let result = Mercury(file);
	
	// end time of parsing
	// time = Date.now() - time;

	// if (result.errors.length == 0){
	// 	console.log(`\nParsed code succesful within: ${time} ms\n`);
	// }
	// else{
	// 	console.log(`\nParsed code unsuccesful, having ${result.errors.length} errors, within: ${time} ms\n`);
	// }
	
	if (verbose){
		console.log(util.inspect(result.parseTree, { showHidden: false, depth: null, colors: true }));
		// console.log(util.inspect(result.syntaxTree, { showHidden: false, depth: null, colors: true }));
		console.log(util.inspect(result.errors, { showHidden: false, depth: null, colors: true }));
		// console.log(util.inspect(result, { showHidden: false, depth: null, colors: true }));
	}
	return [name, result];
}
