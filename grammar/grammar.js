// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');
const IR = require('./mercuryIR.js');

const lexer = moo.compile({
	comment:	/(?:\/\/|\$).*?$/,
	
	instrument:	{
					match: [/synth\ /, /sample\ /, /polySynth\ /, /loop\ /,/emitter\ / ],
					value: x => x.slice(0, x.length-1)
				},

	ring:		[/ring\ /, /array\ /, /data\ /],
	newObject:	[/new\ /, /add\ /],
	setObject:	[/set\ /, /apply\ /, /send\ /, /give\ /],
	//kill:		/kill[\-|_]?[a|A]ll/,

	//seperator:	/[\,\;]/,
	
	//note:		/[a-gA-G](?:[0-9])?(?:#+|b+|x)?/,
	number:		/[+-]?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
	// hex:		/0x[0-9a-f]+/,
	
	divider:	/[/:]/,

	lParam:		'(',
	rParam:		')',
	lArray:		'[',
	rArray:		']',
	// lFunc:		'{',
	// rFunc:		'}'
	
	string:		{ 
					match: /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/, 
					value: x => x.slice(1, x.length-1)
				},
	
	// identifier:	/[a-zA-Z\_\-][a-zA-Z0-9\_\-\.]*/,
	// identifier:	/[a-zA-Z\_\-][^\s]*/,
	identifier:	/[^0-9\s][^\s]*/,

	// signal:		/~(?:\\["\\]|[^\n"\\ \t])+/,
	// osc:		/\/(?:\\["\\]|[^\n"\\ \t])*/,

	ws:			/[ \t]+/,
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "globalStatement", "_"], "postprocess": (d) => { return { "@global" : d[1] }}},
    {"name": "main", "symbols": ["_", "ringStatement", "_"], "postprocess": (d) => { return { "@ring" : d[1] }}},
    {"name": "main", "symbols": ["_", "objectStatement", "_"], "postprocess": (d) => { return { "@object" : d[1] }}},
    {"name": "objectStatement$subexpression$1", "symbols": ["name"]},
    {"name": "objectStatement$subexpression$1", "symbols": ["array"]},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), "_", (lexer.has("instrument") ? {type: "instrument"} : instrument), "_", "objectStatement$subexpression$1"], "postprocess":  (d) => {
        	return {
        		"@new" : d[2].value,
        		"@type" : d[4]
        	}
        }},
    {"name": "objectStatement$subexpression$2", "symbols": ["name"]},
    {"name": "objectStatement$subexpression$2", "symbols": ["array"]},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), "_", (lexer.has("instrument") ? {type: "instrument"} : instrument), "_", "objectStatement$subexpression$2", "__", "objExpression"], "postprocess":  (d) => {
        	return {
        		"@new" : d[2].value,
        		"@type" : d[4],
        		"@funcs" : d[6]
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("setObject") ? {type: "setObject"} : setObject), "_", "name", "__", "objExpression"], "postprocess":  (d) => {	
        	return {
        		"@set" : d[2],
        		"@args" : d[4]
        	}
        }},
    {"name": "ringStatement$ebnf$1", "symbols": ["paramElement"], "postprocess": id},
    {"name": "ringStatement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "ringStatement", "symbols": [(lexer.has("ring") ? {type: "ring"} : ring), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "_", "ringStatement$ebnf$1"], "postprocess":  (d) => {
        	return {
        		"@name" : d[2].value,
        		"@params" : d[4]
        	}
        } },
    {"name": "globalStatement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": (d) => { return { "@comment": d[0].value }}},
    {"name": "globalStatement", "symbols": ["objExpression"], "postprocess": (d) => d[0]},
    {"name": "objExpression", "symbols": ["paramElement"], "postprocess": (d) => d[0]},
    {"name": "objExpression", "symbols": ["paramElement", "__", "objExpression"], "postprocess": (d) => [d[0], d[2]]},
    {"name": "function", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "functionArguments"], "postprocess":  (d) => {
        	return { 
        		//"@function": IR.bindFunction(d[0].value),
        		"@function": d[0].value,
        		"@args": d[1]
        	}
        }},
    {"name": "functionArguments$ebnf$1", "symbols": ["params"], "postprocess": id},
    {"name": "functionArguments$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionArguments", "symbols": [(lexer.has("lParam") ? {type: "lParam"} : lParam), "_", "functionArguments$ebnf$1", "_", (lexer.has("rParam") ? {type: "rParam"} : rParam)], "postprocess": (d) => d[2]},
    {"name": "array$ebnf$1", "symbols": ["params"], "postprocess": id},
    {"name": "array$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array", "symbols": [(lexer.has("lArray") ? {type: "lArray"} : lArray), "_", "array$ebnf$1", "_", (lexer.has("rArray") ? {type: "rArray"} : rArray)], "postprocess": (d) => { return { "@array" : d[2] }}},
    {"name": "params", "symbols": ["paramElement"], "postprocess": (d) => d[0]},
    {"name": "params", "symbols": ["paramElement", "_", "params"], "postprocess": (d) => [d[0], d[2]]},
    {"name": "paramElement", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return { "@number" : d[0].value }}},
    {"name": "paramElement", "symbols": ["name"], "postprocess":  (d) => {
        	return d[0]
        } },
    {"name": "paramElement", "symbols": ["array"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["function"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["division"], "postprocess": (d) => d[0]},
    {"name": "division", "symbols": [(lexer.has("number") ? {type: "number"} : number), (lexer.has("divider") ? {type: "divider"} : divider), (lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return { "@division" : d[0]+"/"+d[2] }}},
    {"name": "name", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": (d) => { return IR.identifier(d) }},
    {"name": "name", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (d) => { return { "@string" : d[0].value }}},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": (d) => null},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", "wschar"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": (d) => null},
    {"name": "wschar", "symbols": [(lexer.has("ws") ? {type: "ws"} : ws)], "postprocess": id}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
