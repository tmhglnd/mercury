# TOKENIZER
@{%
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
	//action:		[/ring\ /, /new\ /, /set\ /],
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
	
	//identifier:	/[a-zA-Z\_\-][a-zA-Z0-9\_\-\.]*/,
	//identifier:	/[a-zA-Z\_\-][^\s]*/,
	identifier:	/[^0-9\s][^\s\(\)\[\]]*/,

	// signal:		/~(?:\\["\\]|[^\n"\\ \t])+/,
	// osc:		/\/(?:\\["\\]|[^\n"\\ \t])*/,

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
	|
	_ objectStatement _
		{% (d) => { return { "@object" : d[1] }} %}
	# |
	# _ %newObject | %setObject | %ring _
	# 	{% (d) => {
	# 		console.log('not enough arguments for message');
	# 		return null; 
	# 	}%}

objectStatement ->
	%newObject _ %instrument _ (name|array)
		{% (d) => {
			return {
				"@new" : d[2].value,
				"@type" : d[4]
			}
			return d;
		}%}
	|
	%newObject _ %instrument _ (name|array) __ objExpression
		{% (d) => {
			return {
				"@new" : d[2].value,
				"@type" : d[4],
				"@funcs" : d[6]
			}
		}%}
	|
	%setObject _ name __ objExpression
		{% (d) => {	
			return {
				"@set" : d[2],
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
	# |
	# objExpression
	# 	{% (d) => d[0] %}
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
	# %signal
	# 	{% (d) => { return { "@signal" : d[0].value }} %}
	# |
	# %osc
	# 	{% (d) => { return { "@address" : d[0].value }} %}
	# |
	%number
		{% (d) => { return IR.num(d) } %}
		# {% (d) => { return IR.num(d) } %}
	|
	# %note
	# 	{% (d) => { return { "@note" : d[0].value }} %}
	# |
	name
		{% (d) => {
			return d[0]
		} %}
	|
	array
		{% (d) => d[0] %}
	|
	function
		{% (d) => d[0] %}
	|
	division
		{% (d) => d[0] %}

division ->
	%number %divider %number
		{% (d) => { return IR.division(d) } %}

name ->
	%identifier
		{% (d) => { return IR.identifier(d) } %}
	|
	%string
		{% (d) => { return { "@string" : d[0].value }} %}

# optional whitespace
_  -> 		wschar:* 	{% (d) => null %}
# mendatory whitespace
__ -> 		wschar:+ 	{% (d) => null %}
# whitespace
wschar -> 	%ws 		{% id %}