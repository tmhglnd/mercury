# Total Serialism

`total-serialism` is a set of methods used for procedurally generating and transforming number sequences. This library is mainly designed with algorithmic composition of music in mind, but can surely be useful for other purposes that involve generation and manipulation of arrays and numbers.

- [Content](#content)
- [Install](#install)
- [Usage](#usage)
	- [Generative Methods](#generative-methods)
	- [Stochastic Methods](#stochastic-methods)
	- [Transformative Methods](#transformative-methods)
- [Inspiration & Further Reading](#inspiration--further-reading)
- [Missing Something?](#missing-something)
- [License](#license)

## Content

The library consists of a few subsets:
- `Generative` : Basic methods that generate arrays of number sequences, such as methods that generate an ascending array of numbers evenly spread between a low and high value.
- `Algorithmic` : More complex methods to generate number sequences, such as euclidean rhythm generation, lindenmayer string expansion, fibonacci sequence, pisano periods and more.
- `Transform` : Methods that transform the array in some fashion. Think of methods such as reversing, palindrome, duplicating, inversing, interleaving and more.
- `Stochastic` : Methods for procedurally generating number sequences based on various types of randomness, such as white noise (evenly distributed), rolling dice, flipping a coin and more.
- `Utility` : Methods necessary to run functions in the libraries above.

## Install

```
$ npm install total-serialism
```

## Usage

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

## Examples

### Generative Methods

```js
const Gen = require('total-serialism').Generative;

// generate an array of 7 ints between range 0-7
Gen.spread(7); //=> [0, 1, 2, 3, 4, 5, 6]

// generate an array of 5 ints between range 7-19
Gen.spread(5, 7, 19); //=> [7, 9, 11, 14, 16]

// generate an array of 9 floats between -1 - 1 (inclusive)
Gen.spreadInclusiveFloat(9, -1, 1); //=> [-1, -0.75, -0.5, -0.25, 0, 0.25, 0.5, 0.75, 1]

// fill an array with duplicates of a value
Gen.fill(10, 2, 15, 3, 20, 4); //=> [10, 10, 15, 15, 15, 20, 20, 20, 20]
```

### Algorithmic Methods
```js
const Algo = require('total-serialism').Algorithmic;

// generate a euclidean rhythm evenly spacing n-beats amongst n-steps
Algo.euclid(16, 9, 1); 
//=> [0, 1, 0, 1, 0, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1]
// inspired by Godfried Toussaints famous paper "The Euclidean Algorithm Generates Traditional Musical Rhythms"

// generate a hexadecimal rhythm based on a hexadecimal string (0-f)
Algo.hexBeat('a9d2');
//=> [1, 0, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 0, 0, 1, 0]
// inspired by Steven Yi's implementation in CSound
```

- [Learn hex beats](https://kunstmusik.github.io/learn-hex-beats/)

### Stochastic Methods

```js
const Rand = require('total-serialism').Stochastic;

// set the random number generator seed
Rand.seed(19374);

// generate an array of random floats in range -1 to 1
Rand.randomFloat(3, -1, 1); //=>  [0.6291111850577886, 0.15153786227276944, 0.32814801081039646]

// generate an array of random integers in range
Rand.random(5, 0, 12); //=>  [3, 3, 7, 1, 0]

// generate an array of coin tosses
Rand.coin(10); //=> [0, 1, 0, 1, 0, 1, 0, 0, 1, 0]

// generate an array of dice rolls
Rand.dice(4); //=>  [4, 4, 2, 3] 

// shuffle the items in an array, influenced by the random seed
Rand.shuffle([0, 5, 7, 12]); //=>  [7, 5, 0, 12]
```

### Transformative Methods

```js
const Mod = require('total-serialism').Transform;

// duplicate an array with an offset added to every value
Mod.clone([0, 5, 7], 0, 12, -12); //=>  [0, 5, 7, 12, 17, 19, -12, -7, -5] 

// combine multiple numbers/arrays into one
Mod.combine([0, 5], 12, [7, 3]); //=>  [0, 5, 12, 7, 3] 

// duplicate an array certain amount of times
Mod.duplicate([0, 5, 7], 3); //=> [0, 5, 7, 0, 5, 7, 0, 5, 7]

// add zeroes to a rhythm to make it play once over a certain amount of bars
Mod.every([1, 0, 1, 0, 1, 1, 0, 1], 2, 8)); // => [1, 0, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]

// invert an array around a center point
Mod.invert([0, 2, 5, 10, 13], 5); //=>  [10, 8, 5, 0, -3]

// interleave multiple arrays into one
Mod.lace([0, 5, 9], [3, 3], [7, 12, 11, -1]); //=>  [0, 3, 7, 5, 3, 12, 9, 11, -1]

// merge arrays into a 2D-array
Mod.merge([0, 3, 7], [3, 12], [12, -1, 19, 5]); //=>  [[0, 3, 12], [3, 12, -1], [7, 19], [5]]

// generate a palindrome of an array
Mod.palindrome([0, 3, 5, 7]); //=> [0, 3, 5, 7, 7, 5, 3, 0]

// rotate an array in positive or negative direction
Mod.rotate([0, 5, 7, 12], -1); //=>  [5, 7, 12, 0] 

// reverse an array
Mod.reverse([0, 5, 7, 12]); //=>  [12, 7, 5, 0]

// spray values from one array on the non-zero places of another array
Mod.spray([12, 19, 24], [1, 0, 0, 1, 1, 0, 1, 0.3, 0]);
//=>  [12, 0, 0, 19, 24, 0, 12, 19, 0]

// remove duplicates from an array, leave order of appearance intact
Mod.unique([5, 7, 5, 0, 12, 7, 5]); //=>  [5, 7, 0, 12] 

```

## Inspiration & Further Reading

This library is inspired by the composition techniques named `Serialism` and `Total Serialism`. The technique approaches the parameters that make up a piece of music as individual series of values. These parameters are (but not limited to) *pitch, duration/rhythm and velocity/dynamic*.

Serialism originated from the `twelve-tone` technique, described in 1919 by Josef Hauer in his published work "Law of the twelve tones". This technique starts out with a randomly ordered set of the twelve chromatic notes. From there on out you can apply transformations on this set, such as reverse/retrograde, inverse, transpose, and combinations between those.

For many of the functions programmed much inspiration was gained from Laurie Spiegels paper on "Manipulation of Musical Patterns" (1981) in which she suggests to *"extract a basic "library" consisting of the most elemental  transformations which have consistently been successfully used on musical patterns, a basic group of "tried-and-true" musical manipulations."*

The euclidean rhythm generator was inspired by the famous paper by Godfried Toussaint and the hexadecimal rhythm generator was inspired by Steven Yi's implementation in the CSound livecoding environment and a workshop given by him during the ICLC 2020 in Limerick.

Inspiration for the sequencing also came from the Live Coding scene and current programming languages available such as Tidal, Extempore, SonicPi and more. In Live Coding the Serialism technique is very comming when programming the music. In many cases the rhythms, melodies, and more are expressed in some form of arrays that is iterated through based on the timing of the system.

- [Serialism on Wikipedia](https://en.wikipedia.org/wiki/Serialism)

- [Twelve-Tone on Wikipedia](https://en.wikipedia.org/wiki/Twelve-tone_technique)

- [Laurie Spiegel - Manipulations of Musical Patterns](http://retiary.org/ls/writings/musical_manip.html)

- [Nick Collins - Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf)

- [Phillip Magnuson - Sound Patterns Ch.45 - Serialism](http://academic.udayton.edu/PhillipMagnuson/soundpatterns/microcosms/serialism.html)

- [Alex McLean - Tidal Pattern Language for Live Coding of Music](https://s3.amazonaws.com/academia.edu.documents/11010319/39.pdf?response-content-disposition=inline%3B%20filename%3DTidal_Pattern_Language_for_Live_Coding_o.pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWOWYYGZ2Y53UL3A%2F20200115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200115T225654Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a1d10c16a032d819fa4b9c8f9bb6f79eacf3a81fb13704d60cd08ef4cd0e1f51)

- [Godfried Toussaint - The Euclidean Algorithm Generates Traditional Musical Rhythms](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

- [Steven Yi - Hexadecimal Beat](https://github.com/kunstmusik/csound-live-code/blob/master/doc/hexadecimal_beats.md)

- [Bernhard Wagner - Rhythmic Patterns As Binary Numbers](http://bernhardwagner.net/musings/RPABN.html)

## Missing Something?

This library is a work in progress, and I'm always interested to receive inspiration, suggestions, enhancements, literature and more. Feel free to file an [issue here](https://github.com/tmhglnd/total-serialism/issues) and I will gladly look into it!

## License

The MIT License

Copyright (c) 2020 Timo Hoogland

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.