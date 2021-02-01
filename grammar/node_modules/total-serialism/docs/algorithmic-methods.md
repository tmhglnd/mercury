# Algorithmic Methods

These are also generative methods, but are in general more complex algorithms, such as euclidean rhythm generation, lindenmayer string expansion, fibonacci sequence, pisano periods and more.

- [euclid](#euclid)
- [hexBeat](#hexbeat)
- [linden](#linden)
- [cellular automaton](#cellular-automaton)
- [fibonacci](#fibonacci)
- [pisano](#pisano)
- [pell](#pell)
- [threeFibonacci](#threefibonacci)
- [lucas](#lucas)

## Include

```js
const Algo = require('total-serialism').Algorithmic;
```

## euclid

Generate a euclidean rhythm evenly spacing n-beats amongst n-steps.Inspired by Godfried Toussaints famous paper "The Euclidean Algorithm Generates Traditional Musical Rhythms".

**arguments**
- {Int+} -> length of array (optional, default=8)
- {Int+} -> beats (optional, default=4)
- {Int} -> rotate (optional, default=0)

```js
Algo.euclid(16, 9, 1); 
//=> [ 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/xS8sKejzG" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## hexBeat

Generate hexadecimal rhythms. Hexadecimal beats make use of hexadecimal values (0 - f) that are a base-16 number system. Because one digit in a base-16 number system has 16 possible values (0 - 15) these can be converted to 4 bits that therefore can be seen as groups of 4 16th notes. These hexadecimal values will then represent any permutation of 1's and 0's in a 4 bit number, where 0 = 0 0 0 0, 7 = 0 1 1 1, b = 1 0 1 1, f = 1 1 1 1 and all possible values in between.

**arguments**
- {String} -> hexadecimal characters (0 t/m f) (optional, default=8)

```js
// generate a hexadecimal rhythm based on a hexadecimal string (0-f)
// inspired by Steven Yi's implementation in CSound Live Coding
Algo.hexBeat('a9d2');
//=> [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/2iav0oh9K" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

- [Learn hex beats by Steven Yi](https://kunstmusik.github.io/learn-hex-beats/)

## linden

The original Lindenmayer string expansion returns a string of characters based on a set of rules and an axiom specified as strings.

**arguments**
- {Value} -> The axiom to start with (generation 0)
- {Int+} -> The number of generations to iterate
- {Object} -> The object or reference to object with rules

```js
// Koch curve
Algo.linden('F', 2, {F: 'F+F-F-F+F'});
//=> 'F+F-F-F+F+F+F-F-F+F-F+F-F-F+F-F+F-F-F+F+F+F-F-F+F'

// Cantor set
Algo.linden('A', 3, {A: 'ABA', B: 'BBB'});
//=> 'ABABBBABABBBBBBBBBABABBBABA'

// Sierpinski Triangle
Algo.linden('F-G-G', 1, {'F': 'F−G+F+G−F', 'G' : 'GG'});
//=> 'F−G+F+G−F-GG-GG'
```

## L-System returning Array with Ints

A more useful version that works nicely with the rest of library. By returning an array of integers it can be quickly put to use in combination with other methods and generate rhythms, melodies and more based on custom rulesets.

```js
Algo.linden();
//=> [ 1, 0, 1, 1, 0 ] (default)

// Cantor set as 0's and 1's in an array ruleset
Algo.linden(1, 3, {1: [1, 0, 1], 0: [0, 0, 0]});
//=> [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/1jFaQ3vuG" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

```js
// Set more complex rules for generating semitones for example
var complexRules = {
	0: [0, 3, 7],
	3: [-1, 0],
	7: [12, 19, 0],
	12: [12, 0, 0, 5], 
	5: [0, -3, 0]
}

Algo.linden(0, 2, complexRules);
//=> [ 0, 3, 7, -1, 0, 12, 19, 0, -1, 0, 3, 7, 12, 0, 0, 5, 19, 0, 3, 7 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/_X0duWOvn" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## cellular automaton

Generate an Elementary Cellular Automaton class. This is an one dimensional array (collection of cells) with states that are either dead or alive (0/1). By following a set of rules the next generation is calculated for every cell based on its neighbouring cells. Invoke the next() method to iterate the generations. Set the first generation with the feed() method (usually random values work quite well). Change the rule() based on a decimal number or an array of digits.

**methods**

- @constructor {length, rule} -> generate the CA
- @get state -> return the current generations as array
- @get table -> return the table of rules
- @method rule() -> set the rule based on decimal number or array
- @method feed() -> feed the initial generation with an array
- @method next() -> generate the next generation and return

```js 
let ca = new Algo.Automaton();
// feed with 40 randomly generated values 0-1
ca.feed(Rand.coin(40));
// set the rule with a decimal representation
ca.rule(122);
// generate the next generation and store in array
let gen = ca.next();

// create multiple generations in a forloop
let gens = [];
for (let i=0; i<10; i++){
	gens.push(ca.next());
}
Util.draw(gens);

//  ███ ██ █   █ ██ █ █████   ██ ████ ██   
// ██ █████ █ █ ████ ██   ██ █████  █████  
// ████   ██ █ ██  █████ █████   ████   ███
//    ██ ████ ██████   ███   ██ ██  ██ ██  
//   █████  ███    ██ ██ ██ ██████████████ 
//  ██   ████ ██  ███████████            ██
// ████ ██  ███████         ██          ███
//    ███████     ██       ████        ██  
//   ██     ██   ████     ██  ██      ████ 
//  ████   ████ ██  ██   ████████    ██  ██
```

Different rules hold different patterns:

```js 
ca.rule(120);

//  ██  ████ ████ █  ███ █    █  ██    █ ██
// ████ █  ███  ██ █ █ ██ █    █ ███    ███
//    ██ █ █ ██ ███ █ ████ █    ██ ██   █  
//    ███ █ █████ ██ ██  ██ █   ██████   █ 
//    █ ██ ██   ████████ ███ █  █    ██   █
// █   ███████  █      ███ ██ █  █   ███   
//  █  █     ██  █     █ █████ █  █  █ ██  
//   █  █    ███  █     ██   ██ █  █  ████ 
//    █  █   █ ██  █    ███  ███ █  █ █  ██
// █   █  █   ████  █   █ ██ █ ██ █  █ █ ██

ca.rule(9);

//    █            ████ █  █         █  █  
// ██   ██████████ █         ███████      █
//    █ █            ███████ █       ████ █
//  █     ██████████ █         █████ █     
//    ███ █            ███████ █       ████
//  █ █     ██████████ █         █████ █   
//      ███ █            ███████ █       ██
//  ███ █     ██████████ █         █████ █ 
//  █     ███ █            ███████ █       
//    ███ █     ██████████ █         ██████

```

## fibonacci

Generate an array of Fibonacci numbers `F[n] = F[n-1] + F[n-2]`. Numbers are by default represented as Strings in order to allow for bigger numbers than 64-bit integers can represent. The calculations are done using the bignumber.js library. A second argument sets an offset to pick a certain number from the sequence.

`OEIS: A000045` (Online Encyclopedia of Integer Sequences)

**arguments**
- {Int+} -> output length of ring
- {Int+} -> offset, start the sequence at nth-fibonacci number (optional, default=0)
- {Bool} -> numbers as strings (optional, default=false)

```js
// 10 fibonacci numbers, starting from 0, 1, 1 etc...
Algo.fibonacci(12);
//=> [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ] 

// 2 fibonacci numbers, starting from the 100th value
Algo.fibonacci(2, 100, true);
//=> [ '354224848179261915075', '573147844013817084101' ] 
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/5dICbZv7b" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## pisano

Generate Pisano periods for the Fibonacci sequence. The pisano period is a result of applying a modulo operation on the Fibonacci sequence `F[n] = (F[n-1] + F[n-2]) mod a`. The length of the period differs per modulus value, but the sequence will always have a repetition. 

**arguments**
- {Int+} -> modulus for pisano period (optional, default=12)
- {Int+} -> output length of array (optional, defaults to pisano-period length)

```js
// the pisano period for mod 7 has a length of 16
Algo.pisano(7);
//=> [ 0, 1, 1, 2, 3, 5, 1, 6, 0, 6, 6, 5, 4, 2, 6, 1 ]

// second argument gives a fixed length output
Algo.pisano(4, 10);
//=> [ 0, 1, 1, 2, 3, 1, 0, 1, 1, 2, 3, 1 ]
```

<iframe src="https://editor.p5js.org/tmhglnd/embed/gputPJXWN" width="100%" height="250px" frameBorder="0" scrolling="no"></iframe>

## pell

Other integer sequences based on Fibonacci are also available

```js
Algo.pell(10);
//=> [ 0, 1, 2, 5, 12, 29, 70, 169, 408, 985 ] 
```

## threeFibonacci

```js
Algo.threeFibonacci(10);
//=> [ 0, 1, 3, 10, 33, 109, 360, 1189, 3927, 12970 ] 
```

## lucas

```js
Algo.lucas(10);
//=> [ 2, 1, 3, 4, 7, 11, 18, 29, 47, 76 ]  
```

Set a custom starting pair of numbers to generate an n-bonacci sequence according to the following method: `F[n] = t * F[n-1] + F[n-2]`

```js
// start with 1, 3, then multiply [n-1] by 2 before adding with [n-2]
Algo.nbonacci(10, 1, 3, 2);
//=> [ 1, 3, 7, 17, 41, 99, 239, 577, 1393, 3363 ]

// this is the same as Algo.fibonacci(12)
Algo.nbonacci(12, 0, 1, 1);
//=> [ 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 ]  
```