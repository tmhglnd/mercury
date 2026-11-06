//====================================================================
// Mercury parser
//
// Parse a textfile of Mercury code and return the .json syntax tree
// written by Timo Hoogland 2021, www.timohoogland.com
//====================================================================

const nearley = require('nearley');
const grammar = require('./mercuryGrammar.js');
const worker = require('./mercuryTraverser.js');

const DEBUG = false;

function mercuryParser(code=''){
	// split multiple lines into array of strings
	let lines = code.includes('\r\n')? code.split('\r\n') : code.split('\n');
	let syntaxTree = { '@main' : [] };
	let errors = [];
	let warnings = [];
	let parseTree = {};
	let parser;

	for (let l=0; l<lines.length; l++){
		// let line = lines[l].trim();
		if (lines[l].trim() !== ''){	
			// create a Parser object from our grammar
			parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar), { keepHistory: false });

			try {
				// parse something!
				parser.feed(lines[l])
				// parser.results is an array of possible parsings.
				if (DEBUG){
					console.log('parsing:', lines[l]);

					if (parser.results.length > 1){
						console.log("Warning, ambiguous grammar!");
						for (var i=0; i<results; i++){
							// console.log("Result", i+1, "of", results, "\n", util.inspect(parser.results[i], { depth: 10 }), "\n");
							console.log(parser.results[i]);
						}
					} else {
						console.log(parser.results[0]);
					}
				}
				// only if not undefined
				if (parser.results[0] !== undefined){
					// add line number and code to new object if it is one
					if (parser.results[0]?.['@object']?.['@new']){
							parser.results[0]['@object']['@new']['@line'] = l+1;
							// parser.results[0]['@object']['@new']['@code'] = lines[l];
					}
					// build the tokenized syntax tree
					syntaxTree['@main'].push(parser.results[0]);

				} else {
					throw new Error();
				}
			} catch (e) {
				// console.error(e);
				let err = `Error at line ${Number(l)+1}`;
				try {
					err += `: Unexpected ${e.token.type}: '${e.token.value}' at ${lines[l].slice(0, e.token.offset)}${e.token.text}<-`;
				} catch (e) {}

				if (DEBUG){
					console.error(err);
				}
				errors.push(err);
			}
		}
	}

	// traverse Syntax Tree and create Intermediate Representation
	parseTree = worker.traverseTreeIR(syntaxTree['@main']);

	errors = parseTree.errors.concat(errors);
	delete parseTree.errors;
	
	warnings = parseTree.warnings;
	delete parseTree.warnings;
	// return both the parseTree and syntaxTree in one object
	return { 
		'parseTree': parseTree, 
		'syntaxTree': syntaxTree,
		'errors': errors,
		'warnings' : warnings
	};
}
exports.mercuryParser = mercuryParser;