# Total Serialism

**Visit the [Total Serialism Documentation](http://tmhglnd.github.io/total-serialism) for interactive examples.**

`total-serialism` is a set of methods used for procedurally generating and transforming number sequences. This library is mainly designed with algorithmic composition of music in mind, but can surely be useful for other purposes that involve generation and manipulation of arrays and numbers. The library is a result of my research in algorithmic composition, livecoding and electronic music and was first prototyped with Max/MSP in the [Mercury](http://github.com/tmhglnd/mercury) livecoding environment.

*This library is a work in progress. I'm always interested in receiving inspiration, suggestions, enhancements, literature and more. Feel free to file an [issue here](https://github.com/tmhglnd/total-serialism/issues) or make a pull request and I will gladly look into it!*

# Table of Content

- [Install](#install)
- [Content](#content)
- [Usage](#usage)
	- [Generative Methods](docs/generative-methods.md)
	- [Algorithmic Methods](docs/algorithmic-methods.md)
		- [Euclidean Rhythm](docs/algorithmic-methods.md#euclid)
		- [Hexadecimal Rhythm](docs/algorithmic-methods.md#hexBeat)
		- [Lindenmayer System](docs/algorithmic-methods.md#linden)
		- [Fibonacci Sequence](docs/algorithmic-methods.md#fibonacci)
		- [Pisano Period](docs/algorithmic-methods.md#pisano)
	- [Stochastic Methods](docs/stochastic-methods.md)
		- [Markov Chain](docs/stochastic-methods.md#markov-chain)
	- [Transform Methods](docs/transform-methods.md)
	- [Statistic Methods](docs/statistic-methods.md)
	- [Translate Methods](docs/translate-methods.md)
	- [Utility Methods](docs/utility-methods.md)
- [In Action](#in-action)
- [Inspiration & Further Reading](#inspiration--further-reading)
- [License](#license)

# Install

## Install in node_modules

```
$ npm install total-serialism
```

```js
// entire package
const Srl = require('total-serialism');
// subset of library
const Gen = require('total-serialism').Generative;
```

## Import es5 version

```js
// entire package
const Srl = require('total-serialism/build/ts.es5.js');
// subset of library
const Algo = require('total-serialism/build/ts.es5.js').Algorithmic;
```

## Include in html

Include latest or specific version of bundled minified es5 through url in index.html 

```html
<script src="https://unpkg.com/total-serialism/build/ts.es5.min.js"></script>

<script src="https://unpkg.com/total-serialism@1.6.12/build/ts.es5.min.js"></script>
```

Use in a html `<script>` like so:

```js
// entire package
const Srl = TotalSerialism;
// subset of library
const Rand = TotalSerialism.Stochastic;
```

# Content

The library consists of a few subsets:
- [`Generative`](docs/generative-methods.md) : Basic methods that generate arrays of number sequences, such as methods that generate an ascending array of numbers evenly spread between a low and high value.
- [`Algorithmic`](docs/algorithmic-methods.md) : These are also generative methods, but are in general more complex algorithms, such as euclidean rhythm generation, lindenmayer string expansion, fibonacci sequence, pisano periods and more.
- [`Stochastic`](docs/stochastic-methods.md) : Methods for procedurally generating number sequences based on various types of randomness, such as white noise (evenly distributed), rolling dice, flipping a coin and more. Also includes Markov Chain.
- [`Transform`](docs/transform-methods.md) : Methods that transform the array in some fashion. Think of methods such as reversing, palindrome, duplicating, inversing, interleaving and more.
- [`Statistic`](docs/statistic-methods.md) : A set of methods from Statistics and Probability Theory that allow for analysis of number sequences for statistical purposes. For example getting the average value or the most common value from an array.
- [`Translate`](docs/translate-methods.md) : Translate between different notation systems. For example convert midi values to frequency, or note names to midi integers. Or use a relative semitone notation system and convert to midi. Map values in an Array to a specified scale, and output the relative values in the specified scale, root and octave.
- [`Utility`](docs/utility-methods.md) : Basic arithmetic and methods necessary to run functions in the libraries above. But can also be of help in your own algorithmic processes.

# Newest features

A libary of statistical methods is now included, featuring methods for returning the mean, median and mode from an array

```js
// Get the average (artihmetic mean) value from an array
Stat.average([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//=> 5

// Return the center value (median) from an array
Stat.center([1, 5, 6, 9, 13]);
//=> 6 

// Returns the most common value (mode) from an array as an array
Stat.common([8, 4, 3, 11, 9, 0, 11, 2, 10, 5, 11, 0]);
//=> [ 11 ]
```

Set a global scale and map relative values to that scale to stay in tune

```js
// Set the global scale used with toScale() and toMidi() methods
TL.setScale('minor_harmonic', 'c');

// Map relative numbers to a specified scale class (including root)
// output as midi value. Specify an octave (default = 'C3' = 4 => 48)
TL.toMidi([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4);;
//=> [ 48, 48, 50, 51, 51, 53, 55, 55, 56, 56, 59, 59 ] 
```

Generate Lindenmayer system sequences

```js
// Cantor set as 0's and 1's in an array ruleset
Algo.linden(1, 3, {1: [1, 0, 1], 0: [0, 0, 0]});
//=> [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1 ]
```

Generate Pisano periods and Fibonacci sequences

```js 
Algo.pisano(7);
//=> [ 0, 1, 1, 2, 3, 5, 1, 6, 0, 6, 6, 5, 4, 2, 6, 1 ]

Algo.fibonacci(2, 100);
//=> [ '354224848179261915075', '573147844013817084101' ] 
```

# Usage

The entire library

```js
const Serialism = require('total-serialism');
```
Or an individual section

```js
const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Util = require('total-serialism').Utility;
```
<!--
## Generative Methods

```js
const Gen = require('total-serialism').Generative;
```
```js
// generate an array of 7 ints between range 0-7
Gen.spread(7); 
//=> [ 0, 1, 2, 3, 4, 5, 6 ]

// generate an array of 5 floats between range 0-1
Gen.spreadFloat(5); 
//=> [ 0, 0.2, 0.4, 0.6, 0.8 ]
// Alternative: Gen.spreadF()

// generate an array of 5 ints between range 7-19 (19 inclusive)
Gen.spreadInclusive(5, 7, 19); 
//=> [ 7, 10, 13, 16, 19 ] 
// Alternative: Gen.spreadInc()

// generate an array of 9 floats between -1 - 1 (inclusive)
Gen.spreadInclusiveFloat(9, -1, 1); 
//=> [ -1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1 ]
// Alternative: Gen.spreadIncF()
```

```js
// fill an array with duplicates of a value
Gen.fill(10, 2, 15, 3, 20, 4); 
//=> [ 10, 10, 15, 15, 15, 20, 20, 20, 20 ]
```

```js
// generate 10 ints with 1 period of a sine function
// between a default range of 0-12
Gen.sine(10);
//=> [ 6, 9, 11, 11, 9, 6, 2, 0, 0, 2 ] 

// generate 10 ints with 4 periods a sine function
Gen.sine(11, 4, 0, 7);
//=> [ 3, 6, 0, 5, 4, 0, 6, 2, 1, 6, 0 ]

// generate 7 ints of 1.5 period a cosine function
Gen.cosine(7, 1.5);
//=> [ 12, 7, 0, 2, 9, 11, 4 ] 

// generate 8 floats with 1 period of a cosine function
Gen.sineFloat(8);
//=> [ 0.000, -0.707, -1, -0.707, -0.000, 0.707, 1, 0.707 ] 
// Alternative: Gen.sin();

// generate 8 floats with 1 period of a cosine function
Gen.cosineFloat(8);
//=> [ 1, 0.707, 0.000, -0.707, -1, -0.707, -0.000, 0.707 ] 
// Alternative: Gen.cos();
```

## Algorithmic Methods
```js
const Algo = require('total-serialism').Algorithmic;
```

### Euclidean Rhythm Generator

```js
// generate a euclidean rhythm evenly spacing n-beats amongst n-steps
// inspired by Godfried Toussaints famous paper "The Euclidean 
// Algorithm Generates Traditional Musical Rhythms"
Algo.euclid(16, 9, 1); 
//=> [ 0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1 ]

```

### Hexadecimal Rhythm Generator

Generate hexadecimal rhythms. Hexadecimal beats make use of hexadecimal values (0 - f) that are a base-16 number system. Because one digit in a base-16 number system has 16 possible values (0 - 15) these can be converted to 4 bits that therefore can be seen as groups of 4 16th notes. These hexadecimal values will then represent any permutation of 1's and 0's in a 4 bit number, where 0 = 0 0 0 0, 7 = 0 1 1 1, b = 1 0 1 1, f = 1 1 1 1 and all possible values in between.

```js
// generate a hexadecimal rhythm based on a hexadecimal string (0-f)
// inspired by Steven Yi's implementation in CSound Live Coding
Algo.hexBeat('a9d2');
//=> [ 1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0 ]
```

- [Learn hex beats](https://kunstmusik.github.io/learn-hex-beats/)

### Lindenmayer String Expansion (L-System)

The original Lindenmayer string expansion returns a string of characters based on a set of rules and an axiom specified as strings.

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

### L-System returning Array with Ints

A more useful version that works nicely with the rest of library. By returning an array of integers it can be quickly put to use in combination with other methods and generate rhythms, melodies and more based on custom rulesets.

```js
Algo.linden();
//=> [ 1, 0, 1, 1, 0 ] (default)

// Cantor set as 0's and 1's in an array ruleset
Algo.linden(1, 3, {1: [1, 0, 1], 0: [0, 0, 0]});
//=> [ 1, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 1 ]

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

### Fibonacci Sequence

Generate an array of Fibonacci numbers `F[n] = F[n-1] + F[n-2]`. Numbers are by default represented as Strings in order to allow for bigger numbers than 64-bit integers can represent. The calculations are done using the bignumber.js library. A second argument sets an offset to pick a certain number from the sequence.

```js
// 10 fibonacci numbers, starting from 0, 1, 1 etc...
Algo.fibonacci(12);
//=> [ '0', '1', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89' ] 

// 2 fibonacci numbers, starting from the 100th value
Algo.fibonacci(2, 100);
//=> [ '354224848179261915075', '573147844013817084101' ] 
```

Generate Pisano periods for the Fibonacci sequence. The pisano period is a result of applying a modulo operation on the Fibonacci sequence `F[n] = (F[n-1] + F[n-2]) mod a`. The length of the period differs per modulus value, but the sequence will always have a repetition. 

```js
// the pisano period for mod 7 has a length of 16
Algo.pisano(7);
//=> [ 0, 1, 1, 2, 3, 5, 1, 6, 0, 6, 6, 5, 4, 2, 6, 1 ]

// second argument gives a fixed length output
Algo.pisano(4, 10);
//=> [ 0, 1, 1, 2, 3, 1, 0, 1, 1, 2, 3, 1 ]
```

Other integer sequences based on Fibonacci are also available

```js
Algo.pell(10);
//=> [ '0', '1', '2', '5', '12', '29', '70', '169', '408', '985' ] 

Algo.threeFibonacci(10);
//=> [ '0', '1', '3', '10', '33', '109', '360', '1189', '3927', '12970' ] 

Algo.lucas(10);
//=> [ '2', '1', '3', '4', '7', '11', '18', '29', '47', '76' ] 
```

Set a custom starting pair of numbers to generate an n-bonacci sequence according to the following method: `F[n] = t * F[n-1] + F[n-2]`

```js
// start with 1, 3, then multiply [n-1] by 2 before adding with [n-2]
Algo.nbonacci(10, 1, 3, 2);
//=> [ '1', '3', '7', '17', '41', '99', '239', '577', '1393', '3363' ] 

// this is the same as Algo.fibonacci(10)
Algo.nbonacci(10, 0, 1, 1);
//=> [ '0', '1', '1', '2', '3', '5', '8', '13', '21', '34' ] 
```

## Stochastic Methods

```js
const Rand = require('total-serialism').Stochastic;
```

General randomness

```js
// set the random number generator seed
Rand.seed(19374);

// generate an array of random floats in range -1 to 1
Rand.randomFloat(3, -1, 1); 
//=> [ 0.6291111850577886, 0.15153786227276944, 0.32814801081039646 ]
// Alternative Rand.randomF();

// generate an array of random integers in range
Rand.random(5, 0, 12); 
//=> [ 3, 3, 7, 1, 0 ]

// generate an array of coin tosses
Rand.coin(10); 
//=> [ 0, 1, 0, 1, 0, 1, 0, 0, 1, 0 ]

// generate an array of dice rolls
Rand.dice(4); 
//=> [ 4, 4, 2, 3 ] 

// shuffle the items in an array, influenced by the random seed
Rand.shuffle([0, 5, 7, 12]); 
//=> [ 7, 5, 0, 12 ]

// generate a twelve-tone series, influenced by the random seed
// basically the same as: Mod.shuffle(Gen.spread(12));
Rand.twelveTone(); 
//=> [ 11, 0, 8, 2, 4, 9, 1, 6, 3, 5, 7, 10 ]
```

Pick values from a range of whole numbers randomly

```js
// generate an array with random values picked from an urn
// with default range 0 to 12 (exclusive)
Rand.urn(5);
//=> [ 3, 6, 2, 8, 7 ] 

// set the range with a second argument to 0-7 (exclusive)
// when more values then range are requested the urn 
// refills and reshuffles
Rand.urn(10, 7);
//=> [ 6, 4, 3, 2, 0, 5, 1, 4, 2, 1 ] 

// A third argument sets a lower range replacing the default 0
Rand.urn(12, -3, 3);
//=> [ -3, 1, -1, 2, 0, -2, 2, -2, 0, -1, -3, 1 ]
```

Make a new array by randomly choosing values from another array

```js
// Choose random items from an array provided, uniform distribution
Rand.choose(5, [0, 1, 2, 3, 5, 8, 13]);
//=> [ 3, 0, 13, 3, 2 ] 

// Array can have any datatype
Rand.choose(5, ['c', 'e', 'g']);
//=> [ 'c', 'c', 'g', 'e', 'g' ] 

// Pick random items from an array similar to urn
// no repeating values untill urn is empty
Rand.pick(5, [0, 1, 2, 3, 5, 8, 13]);
//=> [ 2, 5, 8, 1, 3 ] 

// Array can have any datatype
Rand.pick(5, ['c', 'e', ['g', 'd']]);
//=> [ 'e', [ 'g', 'd' ], 'c', [ 'g', 'd' ], 'e' ] 
```

### Markov Chain

Build a Markov Chain from a set of data and use it to generate new values or an array of values based on the probabilities of the transitions in the provided training dataset. A Markov Chain is a model that describes possible next events based on a current state (first order) and sometimes previous states (2nd, 3rd, ... n-order). The Markov Chain is a broadly used method in algorithmic music to generate new material (melodies, rhythms, but even words) based on a set of provided material.

```js
const Rand = require('total-serialism').Stochastic;

var melody = ['c', 'e', 'f', 'e', 'g', 'f', 'a', 'c'];
// make a MarkovChain instance and optionally train with array
let markov = new Rand.MarkovChain(melody);

// add more to the training
var melody2 = ['g', 'a', 'b', 'g', 'a', 'f', 'd', 'e'];
markov.train(melody2);

// view the transition table (stored as dictionary)
console.log(markov.table);
// { c: [ 'e' ],
//   e: [ 'f', 'g' ],
//   f: [ 'e', 'a', 'd' ],
//   g: [ 'f', 'a', 'a' ],
//   a: [ 'c', 'b', 'f' ],
//   b: [ 'g' ],
//   d: [ 'e' ] }

// set the state of the model used as initial value
markov.state('c');

// set the seed for the scoped random number generator
markov.seed(31415);

// go to the next state based on the model probabilities
markov.next();
// => 'e'

// generate an array of 10 values 
markov.chain(10);
// => [ 'f', 'd', 'e', 'g', 'a', 'b', 'g', 'a', 'c', 'e' ]

// clear the model
markov.clear();
```

## Transform Methods

```js
const Mod = require('total-serialism').Transform;
```
```js
// duplicate an array with an offset added to every value
Mod.clone([0, 5, 7], 0, 12, -12); 
//=> [ 0, 5, 7, 12, 17, 19, -12, -7, -5 ] 

// combine multiple numbers/arrays into one
Mod.join([0, 5], 12, [7, 3]); 
//=> [ 0, 5, 12, 7, 3 ] 
// Alternative: Mod.combine()

// duplicate an array certain amount of times
Mod.copy([0, 5, 7], 3); 
//=> [ 0, 5, 7, 0, 5, 7, 0, 5, 7 ]
// Alternative: Mod.duplicate()

// add zeroes to a rhythm to make it play once over a certain amount of bars
Mod.every([1, 0, 1, 0, 1, 1, 0, 1], 2, 8)); 
//=> [ 1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0 ]

// remove values from an array
Mod.filter([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], [3, 8, 10]);
//=> [ 0, 1, 2, 4, 5, 6, 7, 9 ] 

// return only a specific datatype (in this case you specify the type to return)
Mod.filterType([0, 1, [1, 2], 'foo', 2, null, true, {bar: 5}, 3.14, undefined], 'number');
//=> [ 0, 1, 2, 3.14 ] 

// invert an array around a center point
Mod.invert([0, 2, 5, 10, 13], 5); 
//=> [ 10, 8, 5, 0, -3 ]

// interleave multiple arrays into one
Mod.lace([0, 5, 9], [3, 3], [7, 12, 11, -1]); 
//=> [ 0, 3, 7, 5, 3, 12, 9, 11, -1 ]

// merge arrays into a 2D-array
Mod.merge([0, 3, 7], [3, 12], [12, -1, 19, 5]); 
//=> [ [0, 3, 12], [3, 12, -1], [7, 19], [5] ]

// generate a palindrome of an array
Mod.mirror([0, 3, 5, 7]); 
//=> [ 0, 3, 5, 7, 7, 5, 3, 0 ]
// Alternative Mod.palindrome()

// rotate an array in positive or negative direction
Mod.rotate([0, 5, 7, 12], -1); 
//=> [ 5, 7, 12, 0 ] 

// reverse an array
Mod.reverse([0, 5, 7, 12]); 
//=> [ 12, 7, 5, 0 ]

// spray values from one array on the non-zero places of another array
Mod.spray([12, 19, 24], [1, 0, 0, 1, 1, 0, 1, 0.3, 0]);
//=> [ 12, 0, 0, 19, 24, 0, 12, 19, 0 ]

// remove duplicates from an array, leave order of appearance intact
Mod.unique([5, 7, 5, 0, 12, 7, 5]); 
//=> [ 5, 7, 0, 12 ] 
```

## Statistic Methods

A set of methods from Statistics and Probability Theory that allow for analysis of number sequences for statistical purposes.

```js
const Stat = require('total-serialism').Statistic;
```

```js
// Sort an array of numbers ascending 
Stat.sort([-10, 8, 6, -12, -6, -7, 2, 4, 3, 11]);
//=> [ -12, -10, -7, -6, 2, 3, 4, 6, 8, 11 ] 

// Sort an array of numbers descending with negative second argument
Stat.sort([-10, 8, 6, -12, -6, -7, 2, 4, 3, 11], -1);
//=> [ 11, 8, 6, 4, 3, 2, -6, -7, -10, -12 ]

// Sort a mixed array of strings and numbers
Stat.sort([10, 3.14, 'snare', 'kick', 5, -6, 'hat']);
//=> [ -6, 10, 3.14, 5, 'hat', 'kick', 'snare' ] 
```

Measures of central tendencies (Mean, Median, Mode)

```js
// Get the average (artihmetic mean) value from an array
Stat.average([1, 2, 3, 4, 5, 6, 7, 8, 9]);
//=> 5
// Alternative: Stat.mean()

Stat.average([2, -6, 2, 0, 10, 9, -2, 5, -8, -11, 1, -3]);
//=> -0.0833

// Return the center value (median) from an array
Stat.center([1, 5, 6, 9, 13]);
//=> 6 
// Alternative: Stat.median()

// Returns average of 2 middle values for even listlengths
// works with "official" statistics terminology
Stat.center([1, 7, 4, 2, 9, 5]);
//=> 4.5

// Returns the most common value (mode) from an array as an array
Stat.common([8, 4, 3, 11, 9, 0, 11, 2, 10, 5, 11, 0]);
//=> [ 11 ] 

// In the case of a multi-modal system the array contains all common values
Stat.common([8, 4, 3, 9, 9, 0, 2, 10, 5, 11, 0, 11]);
//=> [ 0, 9, 11 ] 
```

```js
// Return the maximum value from an array
Stat.maximum([-38, -53, -6, 33, 88, 32, -8, 73]);
//=> 88 
// Alternative: Stat.max()

// Return the minimum value from an array
Stat.minimum([-38, -53, -6, 33, 88, 32, -8, 73]);
//=> -53 
// Alternative: Stat.min()
```

## Translate Methods

```js
const TL = require('total-serialism').Translate;
```

### Conversion between units

Convert easily between relative-semitones, midinotes, notenames and frequencies with the methods below. Thankfully using the amazing `Tonal.js` package by `@danigb` for various functions.

```js
// Convert Array or Int as midi-number to midi-notenames
TL.midiToNote([60, 67, 70]);
//=> [ 'C4', 'G4', 'Bb4' ]
// Alternative: TL.mton()

// Convert Array of String as midi-notenames to midi-pitch
TL.noteToMidi(['c2','d2','f#2']);
//=> [ 36, 38, 42 ] 
// Alternative: TL.ntom()

// Convert midi-pitches to frequency (A4 = 440 Hz)
TL.midiToFrequency([60, 67, 72]);
//=> [ 261.6255653005986, 391.99543598174927, 523.2511306011972 ] 
// Alternative: TL.mtof()

// Convert midi-notenames to frequency (A4 = 440 Hz)
TL.noteToFrequency(['c2','d2','f#2']);
//=> [ 65.40639132514966, 73.41619197935188, 92.4986056779086 ] 
// Alternative: TL.ntof()

// Convert relative semitone values to midi-numbers
// specify the octave as second argument (default = 'C3' = 4 => 48)
TL.relativeToMidi([-12, 0, 7, 12], 4);
//=> [ 36, 48, 55, 60 ] 
// Alternative: TL.rtom()

// Convert relative semitone values to frequency (A4 = 440 Hz)
// specify the octave as second argument (default = 'C3' = 4 => 48)
TL.relativeToFrequency([-12, 0, 7, 12], 4);
//=> [ 65.40639132514966,
//   130.8127826502993,
//   195.99771799087463,
//   261.6255653005986 ] 
```

Convert between rhythmic notation as divisions or ratios and milliseconds based on the set tempo in the global settings.

```js

// Set the global tempo used with the divisionToMs() method
TL.setTempo(120);

// convert beat division strings to milliseconds use bpm from global settings
TL.divisionToMs(['1/4', '1/8', '3/16', '1/4', '1/6', '2']);
//=> [ 500, 250, 375, 500, 333.33, 4000 ] 
// Alternative: TL.dtoms()

// optional second argument sets bpm
TL.divisionToMs(['1/4', '1/8', '3/16', '1/4', '1/6', '2'], 100);
//=> [ 600, 300, 450, 600, 400, 4800 ] 

// convert beat ratio floats to milliseconds
TL.divisionToMs([0.25, 0.125, 0.1875, 0.25, 0.16667, 2]);
//=> [ 500, 250, 375, 500, 333.33, 4000 ] 

// convert beat division strings to beat ratio floats
TL.divisionToRatio(['1/4', '1/8', '3/16', '1/4', '1/6', '2']);
//=> [ 0.25, 0.125, 0.1875, 0.25, 0.1667, 2 ] 
// Alternative: TL.dtor()
```

### Working with predefined scale and root

```js
// Set the global scale used with toScale() and toMidi() methods
TL.setScale('minor_harmonic', 'a');

// Set only the root for the global scale
TL.setRoot('c');

// Return all the specified settings
TL.getSettings();
//=> { scale: 'minor_harmonic',
//   root: 'Db',
//   rootInt: 1,
//   map: [ 0, 0, 2, 3, 3, 5, 7, 7, 8, 8, 11, 11 ],
//   bpm: 110,
//   measureInMs: 2181.818181818182 }

// Return all the available scale names
TL.scaleNames();
//=> [ 'chromatic', 'major', etc... ] 

// Map relative numbers to a specified scale class (excluding root)
TL.toScale([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);;
//=> [ 0, 0, 2, 3, 3, 5, 7, 7, 8, 8, 11, 11 ] 

// Works with negative relative values
TL.toScale([8, 14, -2, 22, -7, 22, -2, 14]);
//=> [ 8, 14, -1, 23, -7, 23, -1, 14 ] 

// Preserves floating point for detune/microtonality
TL.toScale([0, 4.1, 6.5, 7.1, 9.25]);
//=> [ 0, 3.1, 7.5, 7.1, 8.25 ] 

// Map relative numbers to a specified scale class (including root)
// output as midi value. Specify an octave (default = 'C3' = 4 => 48)
TL.toMidi([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4);;
//=> [ 48, 48, 50, 51, 51, 53, 55, 55, 56, 56, 59, 59 ] 

// Works with negative relative values
TL.toMidi([8, 14, -2, 22, -7, 22, -2, 14], 4);
//=> [ 56, 62, 47, 71, 41, 71, 47, 62 ] 

// Preserves floating point for detune/microtonality
TL.toMidi([0, 4.1, 6.5, 7.1, 9.25], 'c3');
//=> [ 48, 51.1, 55.5, 55.1, 56.25 ] 
```

# Utility Methods

Mapping and scaling methods

```js
// Apply modulus (%) operation to an array
Util.mod([-2, 4, 3, 7], 5);
//=> [ 3, 4, 3, 2 ] 

// Constrain an array between low and high values
Util.bound([-2, 4, 3, 7], 1, 5);
//=> [ 1, 4, 3, 5 ] 

// Scale values from an input range to output range
Util.map([0, 1, 2, 3, 4], 0, 4, -1, 1);
//=> [ -1, -0.5, 0, 0.5, 1 ] 
```

Basic arithmetic methods that accept arrays in both arguments. Outputlength is always the length of the longest list. 

```js
// Add two arrays sequentially
Util.add([1, 2, 3, 4], [1, 2, 3]);
//=> [ 2, 4, 6, 5 ] 

// Subtract two arrays sequentially
Util.subtract([1, 2, 3, 4], [1, 2, 3]);
//=> [ 0, 0, 0, 3 ] 

// Multiply two arrays sequentially
Util.multiply([1, 2, 3, 4], [1, 2, 3]);
//=> [ 1, 4, 9, 4 ] 

// Divide two arrays sequentially
Util.divide([1, 2, 3, 4], [1, 2, 3]);
//=> [ 1, 1, 1, 4 ] 
```

-->

# In Action

The following links redirect to p5.js sketches coded in the p5 browser editor. These sketches demonstrate some of the methods from this library, used in both sound (for algorithmic composing) and visuals. The sketches use the ts.es5.min.js bundled minified version of this package. See [install](#install) for instructions on how to include the minified version in the index.html and script.

- 1. [Simple Melody](https://editor.p5js.org/tmhglnd/sketches/u2RVN7Udt)

A simple synth with a generative melody the notes are generated through chaining of a few methods. Using: `Gen.spreadInclusive(), Mod.duplicate(), Util.add()`

- 2. [Simple Arp](https://editor.p5js.org/tmhglnd/sketches/Q5GpSmArQ)

A simple arpeggiator with a melody generated from multiple periods of a scaled sine function. The period of the function changes over time. using: `Gen.sine()`

- 3. [Euclidean Bass](https://editor.p5js.org/tmhglnd/sketches/oalWyeXp7)

A simple bass synthesizer with a 4 note progression, using euclidean rhythm generators to make a rhythm by adding 2 arrays of euclidean rhythms together. Using: `Algo.euclid(), Util.add()`

- 4. [Hexadecimal Arp](https://editor.p5js.org/tmhglnd/sketches/2aYPOD6Lo)

A arpeggiator that uses a generated melody from multiple periods of a scaled cosine function and plays a rhythm generated by a hexadecimal value. Using: `Algo.hexBeat(), Gen.cosine()`

# Inspiration & Further Reading

This library is inspired by the composition techniques named `Serialism` and `Total Serialism`. The technique approaches the parameters that make up a piece of music as individual series of values. These parameters are (but not limited to) *pitch, duration/rhythm and velocity/dynamic*.

Serialism originated from the `twelve-tone` technique, described in 1919 by Josef Hauer in his published work "Law of the twelve tones". This technique starts out with a randomly ordered set of the twelve chromatic notes. From there on out you can apply transformations on this set, such as reverse/retrograde, inverse, transpose, and combinations between those.

For many of the functions programmed much inspiration was gained from Laurie Spiegels paper on "Manipulation of Musical Patterns" (1981) in which she suggests to *"extract a basic "library" consisting of the most elemental  transformations which have consistently been successfully used on musical patterns, a basic group of "tried-and-true" musical manipulations."*

The euclidean rhythm generator was inspired by the famous paper by Godfried Toussaint and the hexadecimal rhythm generator was inspired by Steven Yi's implementation in the CSound livecoding environment and a workshop given by him during the ICLC 2020 in Limerick.

Inspiration for the sequencing also came from the Live Coding scene and current programming languages available such as Tidal, Extempore, SonicPi and more. In Live Coding the Serialism technique is very common when programming music. In many cases the rhythms, melodies, and other musical expressions are expressed in arrays that are iterated based on the timing of the system.

The inspiration for usage of Integer Sequences came from composers such as Iannis Xenakis, who used the fibonacci formula in his piece *Nomos Alpha* and referred to the technique as *Fibonacci Motion*. Also Xenakis referred to the usuage of set theory for composition as *Symbolic Music*. 

The Hexadecimal rhythm generator was inspired by a workshop by Steven Yi at the International Conference on Live Coding 2020 at the University of Limerick, Ireland.

Some methods from the Transformational and Stochastic library are inspired by objects or functions in the Max/MSP programming environment. Such as the urn, spread and spreadInclusive methods.

- [Serialism on Wikipedia](https://en.wikipedia.org/wiki/Serialism)

- [Twelve-Tone on Wikipedia](https://en.wikipedia.org/wiki/Twelve-tone_technique)

- [Laurie Spiegel - Manipulations of Musical Patterns](http://retiary.org/ls/writings/musical_manip.html)

- [Nick Collins - Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf)

- [Phillip Magnuson - Sound Patterns Ch.45 - Serialism](http://academic.udayton.edu/PhillipMagnuson/soundpatterns/microcosms/serialism.html)

- [Alex McLean - Tidal Pattern Language for Live Coding of Music](https://s3.amazonaws.com/academia.edu.documents/11010319/39.pdf?response-content-disposition=inline%3B%20filename%3DTidal_Pattern_Language_for_Live_Coding_o.pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWOWYYGZ2Y53UL3A%2F20200115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200115T225654Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a1d10c16a032d819fa4b9c8f9bb6f79eacf3a81fb13704d60cd08ef4cd0e1f51)

- [Godfried Toussaint - The Euclidean Algorithm Generates Traditional Musical Rhythms](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

- [Steven Yi - Hexadecimal Beat](https://github.com/kunstmusik/csound-live-code/blob/master/doc/hexadecimal_beats.md)

- [Learn hex beats](https://kunstmusik.github.io/learn-hex-beats/)

- [Bernhard Wagner - Rhythmic Patterns As Binary Numbers](http://bernhardwagner.net/musings/RPABN.html)

- [Iannis Xenakis - Formalized Music, Thought and Mathematics in Music](https://books.google.nl/books?hl=en&lr=&id=y6lL3I0vmMwC&oi=fnd&pg=PR7&dq=symbolic+music+xenakis&ots=W_s_gzotb2&sig=Y6-2zjquOIwju7q8uaoRcPuboC8&redir_esc=y#v=onepage&q=symbolic%20music%20xenakis&f=false)

- [Thomas DeLio - Nomos Alpha: The Dialects of Structure and Materials](https://www.jstor.org/stable/843739?seq=1)

- [Online Encyclopedia of Integer Sequences](https://oeis.org/A000045)

- [Pisano Periods explained on Numberphile](https://www.youtube.com/watch?v=Nu-lW-Ifyec)

- [Markov Chain on wikipedia](https://en.wikipedia.org/wiki/Markov_chain)	

# Missing Something?

This library is a work in progress, and I'm always interested to receive inspiration, suggestions, enhancements, literature and more. Feel free to file an [issue here](https://github.com/tmhglnd/total-serialism/issues) and I will gladly look into it!

## Powered By

Total Serialism is a result of research in algorithmic composition with the Mercury livecoding environment. 

- Mercury has been granted funding from [**Creative Industries Fund NL**](https://stimuleringsfonds.nl/en/)
- Mercury has been granted in-kind funding from [**Creative Coding Utrecht**](https://creativecodingutrecht.nl/)

# License

The MIT License

Copyright (c) 2020 Timo Hoogland

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
