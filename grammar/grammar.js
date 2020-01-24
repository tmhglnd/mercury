// Generated automatically by nearley, version 2.19.0
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');
const IR = require('./mercuryIR.js');

const lexer = moo.compile({
	comment:	/(?:[\/\/]|[#]|[$]).*?$/,
	
	instrument:	{
					match: [/synth\ /, /sample\ /, /poly_synth\ /, /loop\ / ],
					value: x => x.slice(0, x.length-1)
				},

	ring:		[/ring\ /, /array\ /, /data\ /],
	newObject:	[/new\ /, /add\ /],
	setObject:	[/set\ /, /apply\ /, /send\ /, /give\ /],
	//kill:		/kill[\-|_]?[a|A]ll/,

	seperator:	/[\,\;]/,
	number:		/-?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
	operator:	/[\+\-\*\/]/,

	lParam:		'(',
	rParam:		')',
	lArray:		'[',
	rArray:		']',

	string:		{ 
					match: /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/, 
					value: x => x.slice(1, x.length-1)
				},
	
	identifier:	/[a-zA-Z\_][a-zA-Z0-9\_\-]*/,
	ws:			/[ \t]+/,
});
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main", "symbols": ["_", "statement", "_"], "postprocess": (d) => { return { "@global" : d[1] }}},
    {"name": "main", "symbols": ["_", "objectStatement", "_"], "postprocess": (d) => { return { "@object" : d[1] }}},
    {"name": "main", "symbols": ["_", "ringStatement", "_"], "postprocess": (d) => { return { "@ring" : d[1] }}},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), "_", (lexer.has("instrument") ? {type: "instrument"} : instrument), "_", "name"], "postprocess":  (d) => {
        	return {
        		"@new" : d[2].value,
        		"@type" : d[4]["@string"]
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), "_", (lexer.has("instrument") ? {type: "instrument"} : instrument), "_", "name", "__", "objExpression"], "postprocess":  (d) => {
        	return {
        		"@new" : d[2].value,
        		"@type" : d[4]["@string"],
        		"@args" : d[6]
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("setObject") ? {type: "setObject"} : setObject), "_", "name", "__", "objExpression"], "postprocess":  (d) => {	
        	return {
        		"@set" : d[2]["@string"],
        		"@args" : d[4]
        	}
        }},
    {"name": "ringStatement", "symbols": [(lexer.has("ring") ? {type: "ring"} : ring), "_", (lexer.has("identifier") ? {type: "identifier"} : identifier), "__", "ringExpression"], "postprocess":  (d) => {
        	return {
        		"@varname" : d[2].value,
        		"@params" : d[4]
        	}
        } },
    {"name": "statement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": (d) => { return { "@comment": d[0].value }}},
    {"name": "statement$ebnf$1", "symbols": [(lexer.has("seperator") ? {type: "seperator"} : seperator)], "postprocess": id},
    {"name": "statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "statement", "symbols": ["objExpression", "_", "statement$ebnf$1"], "postprocess": (d) => d[0]},
    {"name": "statement", "symbols": ["objExpression", "_", (lexer.has("seperator") ? {type: "seperator"} : seperator), "_", "statement"], "postprocess": (d) => [d[0], d[4]]},
    {"name": "objExpression", "symbols": ["paramElement"], "postprocess": (d) => d[0]},
    {"name": "objExpression", "symbols": ["paramElement", "__", "objExpression"], "postprocess": (d) => [d[0], d[2]]},
    {"name": "ringExpression", "symbols": ["paramElement"], "postprocess": (d) => d[0]},
    {"name": "function", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "parameterList"], "postprocess":  (d) => {
        	return { 
        		"@function": IR.bindFunction(d[0].value),
        		//"@function": d[0].value,
        		"@params": d[1]
        	}
        }},
    {"name": "parameterList", "symbols": [(lexer.has("lParam") ? {type: "lParam"} : lParam), "_", "params", "_", (lexer.has("rParam") ? {type: "rParam"} : rParam)], "postprocess": (d) => d[2]},
    {"name": "parameterList", "symbols": [(lexer.has("lParam") ? {type: "lParam"} : lParam), "_", (lexer.has("rParam") ? {type: "rParam"} : rParam)], "postprocess": (d) => "empty"},
    {"name": "array", "symbols": [(lexer.has("lArray") ? {type: "lArray"} : lArray), "_", "params", "_", (lexer.has("rArray") ? {type: "rArray"} : rArray)], "postprocess":  (d) => {
        	return {
        		"@array" : d[2]
        	}
        }},
    {"name": "params", "symbols": ["paramElement"], "postprocess": (d) => d[0]},
    {"name": "params", "symbols": ["paramElement", "_", "params"], "postprocess": (d) => [d[0], d[2]]},
    {"name": "paramElement", "symbols": ["name"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return { "@number" : d[0].value }}},
    {"name": "paramElement", "symbols": ["array"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["function"], "postprocess": (d) => d[0]},
    {"name": "name", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": (d) => { return { "@string" : d[0].value }}},
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
