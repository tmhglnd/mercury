# TOKENIZER
@{%
const moo = require("moo");

const lexer = moo.compile({
	ws:			/[ \t]+/,
	comment:	/(?:[\/\/]|[#]|[$]).*?$/,
	
	instrument:	{
					match: [	/synth\ /, /sample\ /, 
								/poly_synth\ /, /loop\ / ],
					value: x => x.slice(0, x.length-1)
				},

	ring:		[/ring\ /, /array\ /, /data\ /],
	newObject:	[/new\ /, /add\ /],
	setObject:	[/set\ /, /apply\ /, /send\ /],

	number:		/-?(?:[0-9]|[0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/,
	operator:	/[\+\-\*\/]/,

	"(":		'(',
	rParam:		')',
	lArray:		'[',
	rArray:		']',

	string:		{ 
					match: /["|'|\`](?:\\["\\]|[^\n"\\])*["|'|\`]/, 
					value: x => x.slice(1, x.length-1)
				},
	
	identifier:	/[a-zA-Z\_][a-zA-Z0-9\_\-]*/,
	
	// kill:		/kill(?:[A|a])ll/,
	// newln:		{ match: /\n/, lineBreaks: true },
	// myError:		moo.error,
	// error:	 	{match: /[\$?`]/, error: false},
	// ws:			{match: /\s+/, lineBreaks: true},
});
%}

# # Pass your lexer object using the @lexer option:
@lexer lexer

main ->
	_ statement _
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
			// console.log('new', d[2].value, d[4].string);
			return {
				"@new" : d[2].value,
				"@type" : d[4]
			}
		}%}
	|
	%newObject _ %instrument _ name __ objExpression
		{% (d) => {
			return {
				"@new" : d[2].value,
				"@type" : d[4],
				"@args" : d[6]
			}
		}%}
	|
	%setObject _ name __ objExpression
		{% (d) => [d[0], d[2], d[4]] %}

ringStatement ->
	%ring _ %identifier __ ringExpression
		{% (d) => [d[0], d[2], d[4]] %}

statement ->
	%comment
		{% (d) => d[0] %}
	|
	objExpression
		{% (d) => d[0] %}

objExpression ->
	function
		{% (d) => d[0] %}
	|
	function __ objExpression
		{% (d) => [d[0], d[2]] %}

ringExpression ->
	paramElement
		{% (d) => d[0] %}

function ->
	%identifier _ parameterList
		{% (d) => { 
			return { 
				"@function": d[0].value,
				"@params": d[2]
			}
		}%}

parameterList ->
	"(" _ params _ %rParam
		{% (d) => d[2] %}
	|
	"(" _ %rParam
		{% (d) => "empty" %}

array ->
	%lArray _ params _ %rArray
		{% (d) => d[2] %}

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
		{% (d) => { return { "@number" : Number(d[0].value) }} %}
	|
	array
		{% (d) => d[0] %}
	|
	function
		{% (d) => d[0] %}

name ->
	%identifier
		{% (d) => { return { "@string" : d[0].value }} %}
	|
	%string
		{% (d) => { return { "@string" : d[0].value }} %}

# optional whitespace
_  -> 		wschar:* 	{% (d) => null %}
# mendatory whitespace
__ -> 		wschar:+ 	{% (d) => null %}
# whitespace
wschar -> 	%ws 		{% id %}