# Total Serialism

**Visit the [Total Serialism Documentation](http://tmhglnd.github.io/total-serialism) for interactive examples.**

`total-serialism` is a set of methods used for procedurally generating and transforming number sequences. This library is mainly designed with algorithmic composition of music in mind, but can surely be useful for other purposes that involve generation and manipulation of arrays and numbers. The library is a result of my research in algorithmic composition, livecoding and electronic music and was first prototyped with Max/MSP in the [Mercury](http://github.com/tmhglnd/mercury) livecoding environment.

*This library is a work in progress. I'm always interested in receiving inspiration, suggestions, enhancements, literature and more. Feel free to file an [issue here](https://github.com/tmhglnd/total-serialism/issues) or make a pull request and I will gladly look into it!*

# Table of Content

- [Newest Features](#newest-features)
- [Install](#install)
- [Content](#content)
- [Usage](#usage)
	- [Generative Methods](docs/generative-methods.md)
		- [spread / spreadFloat](docs/generative-methods.md#spread)
		- [spreadInclusive / spreadInclusiveFloat](docs/generative-methods.md#spreadinclusive)
		- [fill](docs/generative-methods.md#fill)
		- [sine / cosine](docs/generative-methods.md#sine--cosine)
		- [sineFloat / cosineFloat](docs/generative-methods.md#sinefloat--cosinefloat)
	- [Algorithmic Methods](docs/algorithmic-methods.md)
		- [Euclidean Rhythm](docs/algorithmic-methods.md#euclid)
		- [Hexadecimal Rhythm](docs/algorithmic-methods.md#hexBeat)
		- [Lindenmayer System](docs/algorithmic-methods.md#linden)
		- [Fibonacci Sequence](docs/algorithmic-methods.md#fibonacci)
		- [Pisano Period](docs/algorithmic-methods.md#pisano)
	- [Stochastic Methods](docs/stochastic-methods.md)
		- [Markov Chain](docs/stochastic-methods.md#markov-chain)
		- [random](docs/stochastic-methods.md#random)
		- [urn](docs/stochastic-methods.md#urn)
		- [drunk](docs/stochastic-methods.md#drunk)
		- [coin](docs/stochastic-methods.md#coin) 
		- [dice](docs/stochastic-methods.md#dice)
		- [shuffle](docs/stochastic-methods.md#shuffle)
		- [pick](docs/stochastic-methods.md#pick)
		- [choose](docs/stochastic-methods.md#choose)
	- [Transform Methods](docs/transform-methods.md)
		- [clone](docs/transform-methods.md#clone)
		- [join / combine](docs/transform-methods.md#join)
		- [copy / duplicate](docs/transform-methods.md#copy)
		- [every](docs/transform-methods.md#every)
		- [filter / filterType](docs/transform-methods.md#filter)
		- [invert](docs/transform-methods.md#invert)
		- [lace](docs/transform-methods.md#lace)
		- [merge](docs/transform-methods.md#merge)
		- [mirror / palindrome](docs/transform-methods.md#palindrome)
		- [reverse](docs/transform-methods.md#reverse)
		- [rotate](docs/transform-methods.md#rotate)
		- [sort](docs/transform-method.md#sort)
		- [spray](docs/transform-methods.md#spray)
		- [unique](docs/transform-methods.md#unique)
	- [Statistic Methods](docs/statistic-methods.md)
		- [sort](docs/statistic-methods.md#sort)
		- [maximum](docs/statistic-methods.md#maximum)
		- [minimum](docs/statistic-methods.md#minimum)
		- [mean](docs/statistic-methods.md#mean)
		- [median](docs/statistic-methods.md#median)
		- [mode](docs/statistic-methods.md#mode)
	- [Translate Methods](docs/translate-methods.md)
		- [Scala Tuning](docs/translate-methods.md#using-scala-tuning-format)
			- parse
			- tune
			- center
			- scalaToFreq
			- chart
			- data
			- names
			- search
		- [Conversion between units](docs/translate-methods.md#conversion-between-units)
			- midiToNote / mton
			- noteToMidi / ntom
			- midiToFreq / mtof
			- noteToFreq / ntof
			- relativeToMidi / rtom
			- relativeToFreq / rtof
			- divisionToMs / dtoms
			- divisionToRatio / dtor
		- [Working with predefined scale and root](docs/translate-methods.md#working-with-predefined-scale-and-root)
			- setTempo
			- setScale
			- setRoot
			- getSettings
			- scaleNames
			- toScale
			- toMidi
	- [Utility Methods](docs/utility-methods.md)
		- [wrap](docs/utility-methods.md#wrap)
		- [constrain](docs/utility-methods.md#constrain)
		- [fold](docs/utility-methods.md#fold)
		- [map](docs/utility-methods.md#map)
		- [add](docs/utility-methods.md#add)
		- [subtract](docs/utility-methods.md#subtract)
		- [multiply](docs/utility-methods.md#multiply)
		- [divide](docs/utility-methods.md#divide)
		- [mod](docs/utility-methods.md#mod)
		- [plot](docs/utility-methods.md#plot)
- [In Action](#in-action)
- [Inspiration & Further Reading](#inspiration--further-reading)
- [License](#license)

# Newest features

Use the `new TL.Scala()` class to import a *.scl* file (Scala tuning format) to work with custom tuning systems apart from the Western 12-TET (Equal Temperament) tuning or use one of the tunings from a database with over 5000 tunings from [Stichting Huygens-Fokker](http://www.huygens-fokker.org/scala/).

```js
// Create an instance of a Scala class
let scl = new TL.Scala();

scl.scalaToFreq([60, 63, 67, 69, 72, 81, 36, 48]);
//=> [ 261.63, 311.13, 392.00, 440.00, 523.25, 880.00, 65.41, 130.81 ]

// Get the entire list of names from the library
scl.names;
// [ '05-19',
//   '05-22',
//   '05-24',
//   '06-41',
//   '07-19',
//   '07-31',
//   '07-37',
//   '08-11',
//   '08-13',
//   '08-19', ... and 5000 more]
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
```

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
