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
		console.log("Parse failed: \n", e.message);
		// console.log("Error at character " + e.parseError.offset);
	}
}

// @global:
// parseNumbers();
// parseComments();
// parseStrings();
// parseIdentifier();
// parseKeywords();
// parseSettings();

// @ring:
parseRing();

// @object:
// parseInst();
// parseSet();
// parseMain();

// Parse numbers
function parseNumbers(){
	parse("012");
	parse("34");
	parse("-56");
	parse("+7.89");
	parse("1.0111213141E5");
	parse("0.4321");
	// parse("12, 34, -56, 7.89;");
	parse("12 34 -56 7.89");
	// parse("1 + 2 / 4");
	parse("[ 1 2 3.14 5 foo bar 'to_to t1T1' ]");
	parse("[   ]");
}

// Parse comments
function parseComments(){
	parse("// a comment here");
	// parse("/ also a comment?");
	parse("# another comment");
	parse("$ also a type of comment");
	// parse("not a type of comment");
	// parse("// 1.0111213141E5 < commented");
}

// Parse strings
function parseStrings(){
	// valid strings start and end with: "" '' ``
	// or a combination of those works as well

	parse('"hello world"');
	parse("'also a string'");
	parse("`and another! `");
	parse("'this works?`");
	parse('` this does as well?"');
	parse('"1 +2 /3.14* 45.67 "');
}

function parseIdentifier(){
	// Parse identifier/name
	// valid identifiers start with characters [a-zA-Z]
	// can have _ - . and numbers [0-9]

	parse('Kick_dub');
	parse('dub_15');
	parse('foLey-02.wav');
	parse('Keywords -followed by 3.14 and other 1 5 4 numbers');
}

function parseSignal(){
	// Signal modulation strings
	parse('~mySig');
	parse('~my-sig');
	parse('~my_Sig');
	parse('"~my Sig"');
}

function parseOSC(){
	// Parsing osc type strings
	// parse();
}

// Parse keywords
function parseKeywords(){
	parse("ring");
	parse("new");
	parse("set");

	parse("array");
	parse("data");
	parse("add");
	parse("apply");
}

function parseRing(){
	parse("ring myVal 3.14");
	parse("ring myArr [ 1 2 3.4 56 7.89e-13 ]");
	parse("ring hats [hat_dub hat_dub_open]");
	// parse("ring ring2D [ 1 2 [3 4] 5 [6 [7 8] 9] 10 11 ] ");

	// parse("ring beat euclid(16 4 0)")
	// parse("ring grv choose(8 [hat kick snare])")
	// parse("ring arpMel clone( palin( spread(5 0 12) ) 0 0 7 3 )");
	// parse("ring bsLine clone( spray( bassBt spread(5 0 17) ) )" );
	parse("ring bsLine clone( spray( bassBt spread(5 0 17) )" );
}

function parseInst(){
	parse("new synth saw note(0 0)");
	parse("new sample kick_dub time(0.25 0.5) speed(0.9) ");
	parse("new loop amen-break02 speed(-0.8)");
	parse("new poly_synth triangle");
}

function parseSettings(){
	parse("silence");
	parse("tempo(125)");
	parse("print(aRing)");
	parse("print(random(10 5 50) )");
	parse("audio()");
	// parse("audio 1, record 1, tempo 143 1000");
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