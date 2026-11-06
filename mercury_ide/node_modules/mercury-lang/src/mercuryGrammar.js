// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
(function () {
function id(x) { return x[0]; }

const moo = require('moo');
const IR = require('./mercuryIR.js');

const lexer = moo.compile({
	comment:	/(?:\/\/).*?$/,
	//nl:			{ match: /[\n|\r\n]+/, lineBreaks: true },
	
	//list:		[/ring /, /array /, /list /],
	//newObject:	[/new /, /make /],
	//setObject:	[/set /, /apply /, /give /, /send /],
	//print:		[/print /, /post /, /log /],
	//global:		[/silence/, /mute/, /killAll/],

	//seperator:	/,/,
	//newLine:	/[&;]/,
	
	//note:		/[a-gA-G](?:[0-9])?(?:#+|b+|x)?/,
	//number:		/[+-]?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
	number:		/[+-]?(?:[0-9]+)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?/,
	//hex:		/0x[0-9a-f]+/,
	
	divider:	/[/:]/,
	//is:			'=',
	//timevalue:	/[nm]/,

	lParam:		'(',
	rParam:		')',
	lArray:		'[',
	rArray:		']',
	//lFunc:		'{',
	//rFunc:		'}'
	
	string:		{ 
					match: /"[^"\n]*"|'[^'\n]*'|`[^\n]*`/, 
					// match: /["'`](?:\\["\\]|[^\n"'``])*["'`]/, 
					value: x => x.slice(1, x.length-1)
				},
	
	//identifier:	/[a-zA-Z\_\-][a-zA-Z0-9\_\-\.]*/,
	//identifier:	/[a-zA-Z\_\-][^\s]*/,
	identifier:	{ 
					match: /[^0-9\s][^\s\(\)\[\]]*/,
					type: moo.keywords({
						list: ['ring', 'array', 'list'],
						newObject: ['new', 'make'],
						setObject: ['set', 'apply', 'give'],
						print: ['print', 'post', 'log'],
						display: ['display', 'view']
						// global: ['silence']
					})
				},

	//signal:		/~(?:\\["\\]|[^\n"\\ \t])+/,
	//osc:		/\/(?:\\["\\]|[^\n"\\ \t])*/,

	ws:			/[ \t]+/
});

lexer.next = (next => () => {
    let tok;
    while ((tok = next.call(lexer)) && tok.type === "ws") {}
    return tok;
})(lexer.next);

var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "main$ebnf$1", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "main$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["globalStatement", "main$ebnf$1"], "postprocess": (d) => { return { "@global" : d[0] }}},
    {"name": "main$ebnf$2", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "main$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["listStatement", "main$ebnf$2"], "postprocess": (d) => { return { "@list" : d[0] }}},
    {"name": "main$ebnf$3", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": id},
    {"name": "main$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "main", "symbols": ["objectStatement", "main$ebnf$3"], "postprocess": (d) => { return { "@object" : d[0] }}},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), (lexer.has("identifier") ? {type: "identifier"} : identifier), "objectIdentifier"], "postprocess":  (d) => {
        	return {
        		"@new" : {
        			"@inst" : d[1].value,
        			"@type" : d[2]
        		}
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("newObject") ? {type: "newObject"} : newObject), (lexer.has("identifier") ? {type: "identifier"} : identifier), "objectIdentifier", "objExpression"], "postprocess":  (d) => {
        	return {
        		"@new" : {
        			"@inst" : d[1].value,
        			"@type" : d[2],
        			"@functions" : d[3]
        		}
        	}
        }},
    {"name": "objectStatement", "symbols": [(lexer.has("setObject") ? {type: "setObject"} : setObject), (lexer.has("identifier") ? {type: "identifier"} : identifier), "objExpression"], "postprocess":  (d) => {	
        	return {
        		"@set" : {
        			"@name" : d[1].value,
        			"@functions" : d[2]
        		}
        	}
        }},
    {"name": "objectIdentifier", "symbols": ["name"], "postprocess": id},
    {"name": "objectIdentifier", "symbols": ["array"], "postprocess": id},
    {"name": "objectIdentifier", "symbols": ["function"], "postprocess": (d) => d[0]},
    {"name": "listStatement", "symbols": [(lexer.has("list") ? {type: "list"} : list), (lexer.has("identifier") ? {type: "identifier"} : identifier), "paramElement"], "postprocess":  (d) => {
        	return {
        		"@name" : d[1].value,
        		"@params" : d[2]
        	}
        } },
    {"name": "globalStatement", "symbols": [(lexer.has("comment") ? {type: "comment"} : comment)], "postprocess": (d) => { return { "@comment" : d[0].value }}},
    {"name": "globalStatement", "symbols": [(lexer.has("print") ? {type: "print"} : print), "objExpression"], "postprocess": (d) => { return { "@print" : d[1] }}},
    {"name": "globalStatement", "symbols": [(lexer.has("display") ? {type: "display"} : display), "objExpression"], "postprocess": (d) => { return { "@display" : d[1] }}},
    {"name": "globalStatement", "symbols": ["name"], "postprocess": (d) => { return { "@settings" : d[0] }}},
    {"name": "objExpression", "symbols": ["paramElement"], "postprocess": (d) => [d[0]]},
    {"name": "objExpression", "symbols": ["paramElement", "objExpression"], "postprocess": (d) => [d[0], d[1]].flat(Infinity)},
    {"name": "function", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier), "functionArguments"], "postprocess":  (d) => {
        	return { 
        		//"@function": IR.bindFunction(d[0].value),
        		"@function": { 
        			"@name": IR.keyBind(d[0].value),
        			"@args": d[1]
        		}
        	}
        }},
    {"name": "functionArguments$ebnf$1", "symbols": ["params"], "postprocess": id},
    {"name": "functionArguments$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "functionArguments", "symbols": [(lexer.has("lParam") ? {type: "lParam"} : lParam), "functionArguments$ebnf$1", (lexer.has("rParam") ? {type: "rParam"} : rParam)], "postprocess": (d) => d[1]},
    {"name": "array$ebnf$1", "symbols": ["params"], "postprocess": id},
    {"name": "array$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "array", "symbols": [(lexer.has("lArray") ? {type: "lArray"} : lArray), "array$ebnf$1", (lexer.has("rArray") ? {type: "rArray"} : rArray)], "postprocess": (d) => { return { "@array" : d[1] }}},
    {"name": "params", "symbols": ["paramElement"], "postprocess": (d) => [d[0]]},
    {"name": "params", "symbols": ["paramElement", "params"], "postprocess": (d) => [d[0], d[1]].flat(Infinity)},
    {"name": "paramElement", "symbols": [(lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return IR.num(d) }},
    {"name": "paramElement", "symbols": ["name"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["array"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["function"], "postprocess": (d) => d[0]},
    {"name": "paramElement", "symbols": ["division"], "postprocess": (d) => d[0]},
    {"name": "division", "symbols": [(lexer.has("number") ? {type: "number"} : number), (lexer.has("divider") ? {type: "divider"} : divider), (lexer.has("number") ? {type: "number"} : number)], "postprocess": (d) => { return IR.division(d) }},
    {"name": "name", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": (d) => { return IR.identifier(d) }},
    {"name": "name", "symbols": [(lexer.has("string") ? {type: "string"} : string)], "postprocess": (d) => { return { "@string" : d[0].value }}}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();
