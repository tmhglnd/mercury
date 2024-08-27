---
sidebar_position: 0
---

# Syntax Overview

Mercury is a minimal and human-readable language for the live coding of algorithmic electronic music. All elements of the language are designed around making code more accessible and less obfuscating for both the programmer-performer and the audience alike. This motivation stretches down to the coding-style itself which uses clear descriptive names for functions and a simple clear syntax. Mercury provides the performer with an extensive library of algorithms to generate or transform sequences that can modulate musical parameters, such as (but not limited to) melody and rhythm, over time. The environment focuses on creating sound in the first place, but is not limited to that and can for example also output MIDI, OSC to control other processes such as visuals.

## Evaluation

Mercury code is evaluated as an `entire page`, `per line` and from `top to bottom`. One of the main reasons the entire code page is evaluated is that this allows the code to always be a direct reflection of the state of the system and therefore what you hear. This helps to keep an overview what is going on in the system. The downside is that it is more difficult to prepare snippets of code in the same file without evaluating them. Code that you don't want to hear can therefore be `commented`, or you can store it in a separate file.

## Syntax Structure

The following chart gives an overview of how the syntax is structured when you type code in Mercury. There are of course many combinations of instruments, lists, methods and functions possible. Please refer to the specific functions in the reference and the tutorials for more concrete examples.

```
new   <instrument-type>   <name>  function(value1 value2 ... value-n)
                                  function1() function2() ... function-n()
```
```
list  <list-name>         [ value1 value2 ... value-n ]
                          [ list1 list2 ... list-n ]
                          function(value1 value2 ... value-n)
```
```
set   <global-name>       value
      <instrument-name>   function(...)
                          function1() function2() ... function-n()
      all                 function(...)
                          function1() function2() ... function-n()
```
```
print <list-name>
      function(...)
```


## Syntax Vocabulary

- `linebreak`
	- Linebreaks `enters` are used to separate lines of code
- `space`
	- Spaces ` ` are used to separate keywords, functions, arguments, list-items and more
- `parenthesis`
	- Parenthesis `( )` are used to denote the opening and closing of a `function` call
- `brackets`
	- Brackets `[ ]` are used to denote the opening and closing of a `list`
- `comment`
	- A comment `//` is created by starting with 2 forward slashes
	- Comments can be started at a later point in a line
	- Multiple lines have to be commented separately
- `action`
	- A word used as an action to start a line of code with
	- Example: `new`, `set`, `list`, `print`
- `name` 
	- A name is a group of 3 or more characters (`A-Z a-z - _ 0-9`), but may not start with any number
	- Names can be used for for example instrument instances, lists and sample-files
	- Example: `kick_909`, `polySynth`, `melody`
- `string` 
	- A string is a collection of any character including spaces between `" "` or `' '`
	- Strings are also used for OSC messages in the form of `/address/tag`
	- Example: `"hello, world!"`
- `number` 
	- A number is any whole number or decimal number, 64-bit, positive or negative.
	- Example: `0`, `21`, `-144`, `3.1415`, `-6.18`
- `fraction`
	- A fraction is a combination of a whole number, a forward slash, and a whole number `0-9/0-9`
	- Fractions are used to denote time intervals in a more precise manner
	- Example: `1/4`, `3/16`, `3/1`
- `notename`
	- A notename is a combination of a letter `a-g` followed by an octave number `0-7`.
	- The notename can have a modifier for flat (`b`) or sharp (`#`) notes between the letter and octave
	- Example: `g4`, `eb3`, `f#2`
- `function` 
	- A function is a `name` followed by an opening parenthesis `(`, zero, one or more arguments and a closing parenthesis `)`
	- A function executes some process to generate an output or control a behaviour based on arguments
	- Example: `random(4)`, `spread(10 300 1000)`, `time(1/4)`
- `list-function` 
	- A list-function returns a list that can be stored in a named `list`
	- Example: `new list coin(8)`
- `instrument-function`
	- An instrument-function is like a `function` but is part of an instance created with `new` (in most cases an instrument)
	- Instrument-functions are specific to that instance only and can not be used outside that scope
	- Example: `new sample kick_min speed(0.8) gain(1.1) fx(reverb)`
- `list`
	- A list is a collection of values (eg. `number`'s, `name`'s, `string`'s or `list`'s) seperated by spaces ` `
	- A list always has a `name`
	- A list is created with an opening bracket `[`, followed by some values, and closed with a closing bracket `]`
	- A list can also be created with a list-`function` instead of using brackets
	- Example: `list notes [0 3 12 5]`, `list rhythm euclid(8 5)`
- `new` 
	- Creates a `new` instance of for example an instrument such as `sample` or `synth`
	- Example: `new sample harp_down`, `new synth saw`
- `set` 
	- Set the value for a global setting or append instrument-functions to a named instrument
	- Example: `set tempo 100`, `set mySynth gain(0.4)`
- `print` 
	- Print allows you to show the content of a `list` or result of a `list-function` in the console window

## Param Glossary

When describing input arguments for functions it is useful to know if the values can be a number (positive and/or negative), a decimal number (float), a name or string or a boolean value (0/1). Below is an overview what words are used for these various scenarios.

### Value Types

- `value` -> Any Number or Name
	- `number` -> Int+, Int or Float
		- `bool` -> 0 or 1 (sometimes `on` or `off`)
		- `int+` -> a positive whole number (integer), bigger than 0
		- `int` -> a whole number, negative or positive, including 0
		- `float+` -> a positive decimal number (floating-point), bigger than 0
		- `float` -> a decimal number, positive or negative, including 0
	- `name` -> A combination of letter-characters, may include capital letter, underscores and digits
	- `string` -> A combination of letters between `" "` or `' '`

### List Types

- `list` -> A list with `value`'s
	- `number-list` -> A list with `number`'s
		- `int-list+` -> A list with `int+`'s
		- `int-list` -> A list with `int`'s
		- `floatList` -> A list with `float`'s
	- `name-list` -> A list with `name`'s
