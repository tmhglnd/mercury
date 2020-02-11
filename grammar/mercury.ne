# TOKENIZER
@{%
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

	signal:		/~[a-zA-Z\_][a-zA-Z0-9\_\-]*/,
	
	identifier:	/[a-zA-Z0-9\_][a-zA-Z0-9\_\-]*/,
	ws:			/[ \t]+/,
});
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

main ->
	_ statement _
		{% (d) => d[1] %}

statement ->
	_ globalStatement _
		{% (d) => d[1] %}
	|
	_ objectStatement _
		{% (d) => d[1] %}
	|
	_ ringStatement _
		{% (d) => d[1] %}

objectStatement ->
	%newObject _ %instrument _ name
		{% (d) => {
			return {
				"@new" : d[2].value,
				"@type" : d[4]["@string"]
			}
		}%}
	|
	%newObject _ %instrument _ name __ objExpression
		{% (d) => {
			return {
				"@new" : d[2].value,
				"@type" : d[4]["@string"],
				"@args" : d[6]
			}
		}%}
	|
	%setObject _ name __ objExpression
		{% (d) => {	
			return {
				"@set" : d[2]["@string"],
				"@args" : d[4]
			}
		}%}

ringStatement ->
	%ring _ %identifier __ ringExpression
		{% (d) => {
			return {
				"@varname" : d[2].value,
				"@params" : d[4]
			}
		} %}

globalStatement ->
	%comment
		{% (d) => { return { "@comment": d[0].value }} %}
	|
	objExpression
		{% (d) => d[0] %}
	|
	objExpression _ %seperator:?
		{% (d) => d[0] %}
	|
	objExpression _ %seperator _ statement
		{% (d) => [d[0], d[4]] %}

objExpression ->
	paramElement
		{% (d) => d[0] %}
	|
	paramElement __ objExpression
		{% (d) => [d[0], d[2]] %}

ringExpression ->
	paramElement
		{% (d) => d[0] %}

function ->
	%identifier parameterList
		{% (d) => {
			return { 
				"@function": IR.bindFunction(d[0].value),
				//"@function": d[0].value,
				"@params": d[1]
			}
		}%}

parameterList ->
	%lParam _ params _ %rParam
		{% (d) => d[2] %}
	|
	%lParam _ %rParam
		{% (d) => "empty" %}

array ->
	%lArray _ params _ %rArray
		{% (d) => {
			return {
				"@array" : d[2]
			}
		}%}

params ->
	paramElement
		{% (d) => d[0] %}
	|
	paramElement _ params
		{% (d) => [d[0], d[2]] %}

paramElement ->
	name
		{% (d) => d[0] %}
	|
	%number
		{% (d) => { return { "@number" : d[0].value }} %}
	|
	array
		{% (d) => d[0] %}
	|
	function
		{% (d) => d[0] %}

name ->
	%identifier
		{% (d) => { return { "@identifier" : d[0].value }} %}
	|
	%string
		{% (d) => { return { "@string" : d[0].value }} %}
	|
	%signal
		{% (d) => { return { "@signal" : d[0].value }} %}

# optional whitespace
_  -> 		wschar:* 	{% (d) => null %}
# mendatory whitespace
__ -> 		wschar:+ 	{% (d) => null %}
# whitespace
wschar -> 	%ws 		{% id %}