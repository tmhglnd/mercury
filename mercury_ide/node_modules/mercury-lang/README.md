# 🌕 Mercury Parser

This Package does not generate any sound or visuals. This package only parses Mercury code and returns a JSON formatted parse tree. This is used in the [Mercury](https://github.com/tmhglnd/mercury) environment to translate the code to sound and visual objects. This is also used in the [Mercury-Playground](https://github.com/tmhglnd/mercury-playground), a browser based lite version of the environment.

## 📟 Mercury? 

**Mercury is a minimal and human-readable language for the live coding of algorithmic electronic music.** 

[**🚀 Go to the full Mercury Project**](https://github.com/tmhglnd/mercury)

[**👾 Or start sketching in the browser:**](https://mercury.timohoogland.com)

[**🙏 Support Mercury by becoming a Patron**](https://www.patreon.com/bePatron?u=9649817) 

[**💬 Join the Discord Community!**](https://discord.gg/vt59NYU)

# How to use this parser

1. `git clone` and run `npm install`

2. Open the `mercury.ne` file to view the grammar in the Nearley language including the moo tokenizer.

3. Run `npm run build`

	- Generates the the `grammar.js` parser file
	- Generates a minified es5 browser version in `/build`
	- Generates the railroad graph

4. Run a test with `npm test` and view result in `/test/tree`

# Use via require

## Install in node_modules

```
$ npm install mercury-lang
```

```js
const Mercury = require('mercury-lang');
```

## Import es5 version

```js
const Mercury = require('mercury-lang/build/mercury.es5.min.js');
```

## Include in html

Include latest or specific version of bundled minified es5 through url in index.html 

```html
<script src="https://unpkg.com/mercury-lang@1.0.0/build/mercury.es5.min.js"></script>
```

Use in a html `<script>` like so:

```js
// entire package
const Mercury = MercuryParser;
```

## Example

A small code file of Mercury below

```java
// A small example for the Mercury parser
set tempo 140
set nonSetting 10

list myBeat euclidean(8 5 1)

new synth saw time(1/8) play(myBeat) name(s1)
	give s1 fx(reverb 0.9 7)

list notes random 16 0 12)
```

Input the code in the Mercury parser

```js
const mercury = require('mercury-lang');
const code = fs.readFileSync('example.txt', 'utf-8');

const result = mercury(code);
```

The result is a JS object consisting of a `parseTree`...



```js
console.log(result.parseTree);

{
	global: {
		tempo: [ 140 ],
		scale: [ 'chromatic', 'c' ],
		root: [ 'c' ],
		randomSeed: [ 0 ],
		highPass: [ 20000, 0 ],
		lowPass: [ 1, 0 ],
		silence: false
	},
	variables: { 
		myBeat: [
			0, 1, 0, 1,
			1, 0, 1, 1
		] 
	},
	objects: {
		s1: {
		object: 'synth',
		type: 'saw',
		functions: {
			group: [],
			time: [ '1/8' ],
			note: [ 0, 0 ],
			env: [ 5, 500 ],
			beat: [
			[
				0, 1, 0, 1,
				1, 0, 1, 1
			]
			],
			amp: [ 0.7 ],
			wave2: [ 'saw', 0 ],
			add_fx: [ [ 'reverb', 0.9, 7 ] ],
			name: [ 's1' ]
		}
		line: 7
		}
	},
	groups: { all: [ 's1' ] },
	print: [],
	comments: [ '// A small example for the Mercury parser' ]
}
```

... a `syntaxTree`...

```js
console.log(result.syntaxTree);

{
	'@main': [
		{
		'@global': { '@comment': '// A small example for the Mercury parser' }
		},
		{
		'@object': {
			'@set': { '@functions': [ { '@number': 140 } ] }
		}
		},
		{
		'@list': {
			'@name': 'myBeat',
			'@params': {
			'@function': {
				'@name': 'euclidean',
				'@args': [ { '@number': 8 }, { '@number': 5 }, { '@number': 1 } ]
			}
			}
		}
		},
		{
		'@object': {
			'@new': {
			'@type': { '@identifier': 'saw' },
			'@functions': [
				{
				'@function': {
					'@name': 'time',
					'@args': [ { '@division': '1/8' } ]
				}
				},
				{
				'@function': {
					'@name': 'beat',
					'@args': [ { '@identifier': 'myBeat' } ]
				}
				},
				{
				'@function': {
					'@name': 'name',
					'@args': [ { '@identifier': 's1' } ]
				}
				}
			]
			},
			'@line': 7
		}
		},
		{
		'@object': {
			'@set': {
			'@functions': [
				{
				'@function': {
					'@name': 'add_fx',
					'@args': [
					{ '@identifier': 'reverb' },
					{ '@number': 0.9 },
					{ '@number': 7 }
					]
				}
				}
			]
			}
		}
		}
	]
}
```

an `errors` array with encountered syntax errors

```js
"errors": [
    "Syntax error at line 9 col 19: Unexpected number: 16 at list notes random 16<-"
  ]
```

...and a `warnings` array with warnings that may cause issues

```js
"warnings" : [
	"Warning: Unkown setting name: nonSetting"
]
```

## NPM dependencies

- [Nearley Parser Toolkit](https://nearley.js.org/)
- [Moo! Tokenizer/Lexer Generator](https://www.npmjs.com/package/moo)

# License

The GNU GPL-v.3
