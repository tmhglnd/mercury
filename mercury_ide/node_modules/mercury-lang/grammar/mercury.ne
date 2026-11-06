# TOKENIZER
@{%
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

%}

# Pass your lexer object using the @lexer option:
@lexer lexer

main ->
	globalStatement %comment:?
		{% (d) => { return { "@global" : d[0] }} %}
	|
	listStatement %comment:?
		{% (d) => { return { "@list" : d[0] }} %}
	|
	objectStatement %comment:?
		{% (d) => { return { "@object" : d[0] }} %}

objectStatement ->
	%newObject %identifier objectIdentifier
		{% (d) => {
			return {
				"@new" : {
					"@inst" : d[1].value,
					"@type" : d[2]
				}
			}
		}%}
	|
	%newObject %identifier objectIdentifier objExpression
		{% (d) => {
			return {
				"@new" : {
					"@inst" : d[1].value,
					"@type" : d[2],
					"@functions" : d[3]
				}
			}
		}%}
	|
	%setObject %identifier objExpression
		{% (d) => {	
			return {
				"@set" : {
					"@name" : d[1].value,
					"@functions" : d[2]
				}
			}
		}%}

# an identifier can be a name or a 'string'
objectIdentifier ->
	name
		{% id %}
	|
	array
		{% id %}
	|
	function
		{% (d) => d[0] %}

# lists in the form of: list identifier [ params ]
listStatement ->
	%list %identifier paramElement
		{% (d) => {
			return {
				"@name" : d[1].value,
				"@params" : d[2]
			}
		} %}

# make a comment or print a value/function
globalStatement ->
	%comment
		{% (d) => { return { "@comment" : d[0].value }} %}
	|
	%print objExpression
		{% (d) => { return { "@print" : d[1] }} %}
	|
	%display objExpression
		{% (d) => { return { "@display" : d[1] }}%}
	|
	name
		{% (d) => { return { "@settings" : d[0] }} %}
	# |
	# objExpression
		# {% (d) => { return { "@print" : d[0] }} %}
	# |
	# objExpression _ %seperator:?
	# 	{% (d) => d[0] %}
	# |
	# objExpression _ %seperator _ statement
	# 	{% (d) => [d[0], d[4]] %}

# an expression can be one or multiple functions or elements
objExpression ->
	paramElement
		{% (d) => [d[0]] %}
	|
	paramElement objExpression
		{% (d) => [d[0], d[1]].flat(Infinity) %}

# ringExpression ->
# 	paramElement
# 		{% (d) => d[0] %}

# function in the form of: identifier( arguments )
function ->
	%identifier functionArguments
		{% (d) => {
			return { 
				//"@function": IR.bindFunction(d[0].value),
				"@function": { 
					"@name": IR.keyBind(d[0].value),
					"@args": d[1]
				}
			}
		}%}

# arguments start with '(', some optional params, end with ')'
functionArguments ->
	%lParam params:? %rParam
		{% (d) => d[1] %}

# array starts with '[', some optional params, ends with ']'
array ->
	%lArray params:? %rArray
		{% (d) => { return { "@array" : d[1] }} %}

# parameters can be param element or element followed by more params
params ->
	paramElement
		{% (d) => [d[0]] %}
	|
	paramElement params
		{% (d) => [d[0], d[1]].flat(Infinity) %}

# parameter elements can be:
# number, name, string, array, function, division
paramElement ->
	%number
		{% (d) => { return IR.num(d) } %}
	|
	name
		{% (d) => d[0] %}
	|
	array
		{% (d) => d[0] %}
	|
	function
		{% (d) => d[0] %}
	|
	division
		{% (d) => d[0] %}
	# |
	# targetParam
	# 	{% (d) => d[0] %}
	# |	
	# osc
	# 	{% (d) => d[0] %}
	# |
	# timing
	# 	{% (d) => d[0] %}

# any division value in the form of xx/xx or xx:xx
division ->
	%number %divider %number
		{% (d) => { return IR.division(d) } %}

# targetParam ->
# 	%identifier %is %paramElement
# 		{% (d) => { return IR.targetParam(d) } %}

# osc ->
# 	%divider %identifier
# 		{% (d) => d[0]) %}
# 	|
# 	%divider %identifier osc
# 		{% (d) => d[0]) %}

# a timevalue syntax in the form of \d+[nm](dt.)? (eg. 8n, 16nt, 4nd)
# timing ->
# 	%number %timevalue
# 		{% (d) => { return IR.identifier(d) } %}

# any string or identifier
# other identifiers: note (c g# eb ax), signal (~)
name ->
	%identifier
		{% (d) => { return IR.identifier(d) } %}
	|
	%string
		{% (d) => { return { "@string" : d[0].value }} %}

# optional whitespace
# _  -> 		wschar:* 	{% (d) => null %}
# mendatory whitespace
# __ -> 		wschar:+ 	{% (d) => null %}
# whitespace
# wschar -> 	%ws 		{% id %}
