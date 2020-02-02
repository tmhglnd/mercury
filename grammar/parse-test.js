// parse-test script
const util = require("util");
const nearley = require("nearley");
const grammar = require("./grammar.js");

function parse(s){
	// create a Parser object from our grammar.
	var parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
	try {
		// parse something!
		parser.feed(s);

		// parser.results is an array of possible parsings.
		var results = parser.results.length;

		if (results > 1){
			console.log(">> Warning, ambiguous grammar!");
			for (var i=0; i<results; i++){
				console.log("Result", i+1, "of", results, "\n", 
				util.inspect(parser.results[i], { depth: 10}), 
				"\n");
			}
		} else {
			console.log("Parse succesful: \n", util.inspect(parser.results[0], { depth: 10}), "\n");
		}
	} catch (e) {
		console.log("Parse failure: \n", e.message);
		// console.log("Error at character " + e.parseError.offset);
	}
}

// @global:
parseNumbers();
// parseComments();
// parseStrings();
// parseKeywords();
// parseSettings();

// @ring:
// parseRing();

// @object:
// parseInst();
// parseSet();
// parseMain();

// Parse numbers
function parseNumbers(){
	parse("012");
	parse("34");
	parse("-56");
	parse("7.89");
	parse("1.0111213141E5");
	parse("12, 34, -56, 7.89;");
	// parse("1 + 2 / 4");
}

// Parse comments
function parseComments(){
	parse("// a comment here");
	parse("# another comment");
	parse("$ also a type of comment");
	// parse("// 1.0111213141E5 < commented");
}

// Parse strings
function parseStrings(){
	parse('"hello world"');
	parse("'also a string'");
	parse("`and another! `");
	parse("'this works?`");
	parse('` this does as well?"');

	// Parse identifier/name
	parse('kick_dub');
	parse('_dub');
	parse('foley-02');
}

// Parse keywords
function parseKeywords(){
	parse("ring");
	parse("new");
	parse("set");

	parse("data");
	parse("add");
	parse("apply");
}

function parseRing(){
	parse("ring myVal  3.14");
	parse("ring myArr [ 1 2 3.4 56 7.89e1 ]");
	parse("ring hats [hat_dub hat_dub_open]");
	parse("ring ring2D [ 1 2 [3 4] 5 [6 [7 8] 9] 10 11 ] ");

	parse("ring beat euclid(16 4 0)")
	parse("ring arpMel clone( palin( spread(5 0 12) ) 0 0 7 3 )");
	parse("ring bsLine clone( spray( bassBt spread(5 0 17) ) )" );
}

function parseInst(){
	parse("new synth saw note(0 0)");
	parse("new sample kick_dub time(0.25 0.5) speed(0.9) ");
	parse("new loop amen-break02 speed(-0.8)");
	parse("new poly_synth triangle");
}

function parseSettings(){
	parse("killall");
	parse("audio 1, record 1, tempo 143 1000");
	// parse("tempo(143 15000) scale(minor-harmonic dis) random-seed(5372)")
	// parse("set tempo 143 15000 ");
	// parse("set tempo(143)");
}

function parseSet(){
	parse("set k gain(0.3)");
	parse("give bass with_fx(delay 3 5 0.3) fx(double)");
	parse("set aname pitch([0 7 12 3] 2) shape(1 200) id(newname)");
	// parse("set tempo 143");
	// parse("scale(minor_harmonic 23) hi_pass(800)");
	parse("tempo(143)");
}

function parseMain(){
	parse("killAll()");
	parse("record(1) killAll()");
}