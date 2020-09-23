# TOKENIZER
@{%
const moo = require('moo');
const IR = require('./mercuryIR.js');

const lexer = moo.compile({
	comment:	/(?:\/\/|\#|\$).*?$/,
	
	instrument:	{
					match: [/synth\ /, /sample\ /, /polySynth\ /, /loop\ / ],
					value: x => x.slice(0, x.length-1)
				},

	ring:		[/ring\ /, /array\ /, /data\ /],
	newObject:	[/new\ /, /add\ /],
	setObject:	[/set\ /, /apply\ /, /send\ /, /give\ /],
	//kill:		/kill[\-|_]?[a|A]ll/,

	seperator:	/[\,\;]/,
	
	number:		/[+-]?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
	// hex:		/0x[0-9a-f]+/,
	
	// operator:	/[\+\-\*\/]/,

	lParam:		'(',
	rParam:		')',
	lArray:		'[',
	rArray:		']',
	// lFunc:		'{',
	// rFunc:		'}'

	identifier:	/[a-zA-Z\_\-][a-zA-Z0-9\_\-\.]*/,
	// signal:		/~[a-zA-Z\_][a-zA-Z0-9\_\-]*/,
	// osc:			/\/[a-zA-Z\_][a-zA-Z0-9\_\-]*/,

	string:		{ 
					match: /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/, 
					value: x => x.slice(1, x.length-1)
				},
	
	ws:			/[ \t]+/,
});
%}

# Pass your lexer object using the @lexer option:
@lexer lexer

main ->
	_ globalStatement _
		{% (d) => { return { "@global" : d[1] }} %}
	|
	_ ringStatement _
		{% (d) => { return { "@ring" : d[1] }} %}
	# |
	# _ objectStatement _
	# 	{% (d) => { return { "@object" : d[1] }} %}

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
	%ring _ %identifier _ paramElement:?
		{% (d) => {
			return {
				"@name" : d[2].value,
				"@params" : d[4]
			}
		} %}

globalStatement ->
	%comment
		{% (d) => { return { "@comment": d[0].value }} %}
	|
	objExpression
		{% (d) => d[0] %}
	# |
	# objExpression _ %seperator:?
	# 	{% (d) => d[0] %}
	# |
	# objExpression _ %seperator _ statement
	# 	{% (d) => [d[0], d[4]] %}

objExpression ->
	paramElement
		{% (d) => d[0] %}
	|
	paramElement __ objExpression
		{% (d) => [d[0], d[2]] %}

# ringExpression ->
# 	paramElement
# 		{% (d) => d[0] %}

function ->
	%identifier functionArguments
		{% (d) => {
			return { 
				//"@function": IR.bindFunction(d[0].value),
				"@function": d[0].value,
				"@args": d[1]
			}
		}%}

functionArguments ->
	%lParam _ params:? _ %rParam
		{% (d) => d[2] %}

array ->
	%lArray _ params:? _ %rArray
		{% (d) => { return { "@array" : d[2] }} %}

params ->
	paramElement
		{% (d) => d[0] %}
	|
	paramElement _ params
		{% (d) => [d[0], d[2]] %}
		# {% (d) => d[0].join(d[2]) %}

paramElement ->
	%number
		{% (d) => { return { "@number" : d[0].value }} %}
	|
	name
		{% (d) => d[0] %}
	|
	array
		{% (d) => d[0] %}
	|
	function
		{% (d) => d[0] %}
	# |
	# %signal
	# 	{% (d) => { return { "@signal" : d[0].value }} %}

name ->
	%identifier
		{% (d) => { return { "@identifier" : d[0].value }} %}
	|
	%string
		{% (d) => { return { "@string" : d[0].value }} %}

# optional whitespace
_  -> 		wschar:* 	{% (d) => null %}
# mendatory whitespace
__ -> 		wschar:+ 	{% (d) => null %}
# whitespace
wschar -> 	%ws 		{% id %}