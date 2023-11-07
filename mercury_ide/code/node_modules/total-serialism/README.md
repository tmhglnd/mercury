# Total Serialism

**A Toolbox full of Algorithmic Composition methods**

[**🙏 Support Total Serialism by becoming a Patron**](https://www.patreon.com/bePatron?u=9649817) 

*Visit the [Total Serialism Documentation](http://tmhglnd.github.io/total-serialism) for interactive examples.*

`total-serialism` is a set of methods used for procedurally generating and transforming number sequences (mainly in the form of arrays). This library does not output anything else then numbers, but can therefore be nicely integrated with frameworks like [P5js](https://editor.p5js.org/), [ToneJS](https://tonejs.github.io/), [Node4Max](https://cycling74.com/products/extendmax), [Hydra](https://hydra.ojack.xyz/) and any other javascript based project you want to generate arrays for. This library focusses mainly on algorithmic composition of music, but is absolutely not limited to only that and will be useful for any project that involves generation and manipulation of arrays and numbers. The library is a result of my research in algorithmic composition, livecoding and electronic music and was first prototyped with Max/MSP in the [Mercury](http://github.com/tmhglnd/mercury) livecoding environment. It is now also used in the web based [Mercury Playground](https://github.com/tmhglnd/mercury-playground)

*This library is a work in progress. I'm always interested in receiving inspiration, suggestions, enhancements, literature and more. Feel free to file an [issue here](https://github.com/tmhglnd/total-serialism/issues) or make a pull request and I will gladly look into it!*

# 📋 Table of Content

- [👾 Newest Features](#-newest-features)
- [🚀 Install](#-install)
- [🔭 Content](#-content)
- [📟 Usage](#-usage)
- [📖 Documentation](/docs/README.md)
- [🎮 In Action](#-in-action)
- [✨ Inspiration & Bibliography](#-inspiration--bibliography)
- [📄 License](#-license)

# 👾 Newest features

## Binary & Spacing

Generative rhythmical patterns of 1's and 0's by converting a number to binary or using the integer value as spacing between onsets

```js
const Gen = require('total-serialism').Generative;

Gen.binary(358);
//=> [1, 0, 1, 1, 0, 0, 1, 1, 0]

Gen.space(2, 3, 2)
//=> [1, 0, 1, 0, 0, 1, 0]
```

## n-Order Markov Chain

This is an identical approach to the `MarkovChain` while also offering the possibility of training to create n-order chains. In theory, longer chains preserve the original structure of the model, but won't generate as diverse outputs. Thanks to [James Bradbury](https://www.jamesbradbury.net/)

```js
const Rand = require('total-serialism').Stochastic;

let pattern = [1, 2, 3, 1, 2, 4, 1, 2, 5, 2, 3, 4];
// make a MarkovChain instance and optionally train with array
// an optional second argument sets the order of the markov (default=2)
let markov = new Rand.DeepMarkov(pattern, 2);

// view the transition table (stored as Map())
// Keys are stored as stringis derived via JSON.stringify()
console.log(markov.table);
// Map(7) {
//   '[1,2]' => [ 3, 4, 5 ],
//   '[2,3]' => [ 1, 4 ],
//   '[3,1]' => [ 2 ],
//   '[2,4]' => [ 1 ],
//   '[4,1]' => [ 2 ],
//   '[2,5]' => [ 2 ],
//   '[5,2]' => [ 3 ]
// }

// set the state of the model used as initial value
markov.state([1, 2]);

// generate an array of 10 values 
markov.chain(10);
// => [ 2, 3, 1, 2, 5, 2, 3, 4, 1, 2 ]
```

## Chord progressions

Generate chord progressions as 2d-array's of semitones from an array of Roman Numerals and an optional root note.

```js
const TL = require('total-serialism').Translate;

// Convert a chord progression from roman numerals to semitones
TL.chordsFromNumerals(['I', 'IIm', 'IVsus2', 'V7', 'VIm9'], 'c');
// => [[ 0, 4, 7 ],
//     [ 2, 5, 9 ],
//     [ 5, 7, 0 ],
//     [ 7, 11, 2, 5 ],
//     [ 9, 0, 4, 7, 11 ]] 
```

## Support for n-dimensional arrays

Most of the transform, translate and utility functions now support calculations with n-dimensional arrays.

```js 
const TL = require('total-serialism').Translate;
const Mod = require('total-serialism').Transform;

TL.noteToMidi(['c4', ['eb4', 'g4', 'a4'], ['a3', 'f4']]);
//=> [ 60, [ 63, 67, 69 ], [ 57, 65 ] ] 

Mod.clone(['c', ['e', 'g']], ['4', '5', '#3']);
//=> [ 'c4', [ 'e4', 'g4' ], 'c5', [ 'e5', 'g5' ], 'c#3', [ 'e#3', 'g#3' ] ]

TL.relativeToMidi([[-12, -9, -5], [0, 4, 7], [2, 5, 9]], 'c4');
//=> [ [ 36, 39, 43 ], [ 48, 52, 55 ], [ 50, 53, 57 ] ] 

Stat.compare(['c', ['e', 'g']], ['c', ['e', 'g']]);
//=> true 

Mod.flatten([1, [2, 3, [ 4 ], 5], 6]);
//=> [ 1, 2, 3, 4, 5, 6 ] 

Mod.lookup([0, [1, 1, [2, 3], 0], 2], ['c4', 'e4', 'f4', 'g4']);
//=> [ 'c4', [ 'e4', 'e4', [ 'f4', 'g4' ], 'c4' ], 'f4' ] 
```

## cellular automaton

Generate an Elementary Cellular Automaton class. This is an one dimensional array (collection of cells) with states that are either dead or alive (0/1). By following a set of rules the next generation is calculated for every cell based on its neighbouring cells.

```js 
const Algo = require('total-serialism').Algorithmic;
const Rand = require('total-serialism').Stochastic;

let ca = new Algo.Automaton();
// feed with 40 randomly generated values 0-1
ca.feed(Rand.coin(40));
// set the rule with a decimal representation
ca.rule(120);
// generate the next generation and store in array
let gen = ca.next();

// create multiple generations in a forloop
let gens = [];
for (let i=0; i<10; i++){
	gens.push(ca.next());
}
Util.draw(gens);

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
```

## Scale tuning

Use the `new TL.Scala()` class to import a *.scl* file (Scala tuning format) to work with custom tuning systems apart from the Western 12-TET (Equal Temperament) tuning or use one of the tunings from a database with over 5000 tunings from [Stichting Huygens-Fokker](http://www.huygens-fokker.org/scala/).

```js
const { Scala } = require('total-serialism').Translate;

// Create an instance of a Scala class
let scl = new Scala();

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

## Random clave patterns

Use the `Rand.clave()` to generate binary beats with clave patterns

```js
const { clave } = require('total-serialism').Stochastic;

clave(16, 4);
//=> [ 1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1 ] 
//=> █   █ █   █  █ █

clave(16, 3, 1);
//=> [ 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1 ] 
//=> █  █  ██  █ █  █
```

# 🚀 Install

## Install in node_modules

```
$ npm install total-serialism
```

```js
// entire package
const Srl = require('total-serialism');

// subset of library
const Gen = require('total-serialism').Generative;

// specific methods
const { spread, fill } = require('total-serialism').Generative;
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

# 🔭 Content

The library consists of a few subsets:
- [`Generative`](docs/generative-methods.md) : Basic methods that generate arrays of number sequences, such as methods that generate an ascending array of numbers evenly spread between a low and high value.
- [`Algorithmic`](docs/algorithmic-methods.md) : These are also generative methods, but are in general more complex algorithms, such as a euclidean rhythm generator, lindenmayer string expansion, cellular automaton, fibonacci sequence, pisano periods and more.
- [`Stochastic`](docs/stochastic-methods.md) : Methods for procedurally generating number sequences based on various types of randomness, such as white noise (uniformly distributed), rolling a die, flipping a coin and more. Also includes a n-order Markov Chain.
- [`Transform`](docs/transform-methods.md) : Methods that transform arrays. Think of methods such as reversing, palindrome, duplicating, inversing, interleaving and more.
- [`Statistic`](docs/statistic-methods.md) : A set of methods from Statistics and Probability Theory that allow for analysis of number sequences for statistical purposes. For example getting the average value or the most common value from an array.
- [`Translate`](docs/translate-methods.md) : Translate between different notation systems and tunings with Scala. For example convert midi values to frequency, or note names to midi integers. Or use a relative semitone notation system and convert to midi. Map values in an Array to a specified scale, and output the relative values in the specified scale, root and octave.
- [`Utility`](docs/utility-methods.md) : Basic arithmetic and methods necessary to run functions in the libraries above. But can also be of help in your own algorithmic processes.

# 📟 Usage

The entire library

```js
const TS = require('total-serialism');

// function calls look like:
TS.Generative.spread(4);
TS.Stochastic.random(4);
```
Or an individual section

```js
const Gen  = require('total-serialism').Generative;
const Algo = require('total-serialism').Algorithmic;
const Mod  = require('total-serialism').Transform;
const Rand = require('total-serialism').Stochastic;
const Util = require('total-serialism').Utility;

// function calls look like:
Gen.spread(4);
Rand.random(4);
```

Or an individual function

```js
const { spread } = require('total-serialism').Generative;
const { random } = require('total-serialism').Stochastic;

// function calls look like:
spread(4);
random(4);
```

It's also possible to expose entire subsets to the main package 

```js
// expose multiple sub-libraries to the main package with
const TS = require('total-serialism');
Object.assign(TS, TS.Generative, TS.Stochastic);

// function calls look like:
TS.spread(4);
TS.random(4);
```

Or expose entire subsets to the global namespace. (not recommended, this can lead to name collisions with other functions/packages)

```js
// expose multiple sub-libraries to the global scope
const TS = require('total-serialism');
Object.assign(globalThis, TS.Generative, TS.Stochastic);

// function calls look like:
spread(4);
random(4);
// etc...
```

# 🎮 In Action

The following links redirect to p5.js sketches coded in the p5 browser editor. These sketches demonstrate some of the methods from this library, used in both sound (for algorithmic composing) and visuals. The sketches use the ts.es5.min.js bundled minified version of this package. See [install](#install) for instructions on how to include the minified version in the index.html and script.

- 1. [Simple Melody](https://editor.p5js.org/tmhglnd/sketches/u2RVN7Udt)

A simple synth with a generative melody the notes are generated through chaining of a few methods. Using: `Gen.spreadInclusive(), Mod.duplicate(), Util.add()`

- 2. [Simple Arp](https://editor.p5js.org/tmhglnd/sketches/Q5GpSmArQ)

A simple arpeggiator with a melody generated from multiple periods of a scaled sine function. The period of the function changes over time. using: `Gen.sine()`

- 3. [Euclidean Bass](https://editor.p5js.org/tmhglnd/sketches/oalWyeXp7)

A simple bass synthesizer with a 4 note progression, using euclidean rhythm generators to make a rhythm by adding 2 arrays of euclidean rhythms together. Using: `Algo.euclid(), Util.add()`

- 4. [Hexadecimal Arp](https://editor.p5js.org/tmhglnd/sketches/2aYPOD6Lo)

A arpeggiator that uses a generated melody from multiple periods of a scaled cosine function and plays a rhythm generated by a hexadecimal value. Using: `Algo.hexBeat(), Gen.cosine()`

# ✨ Inspiration & Bibliography

This library is inspired by the composition techniques named `Serialism` and `Total Serialism`. The technique approaches the parameters that make up a piece of music as individual series of values. These parameters are (but not limited to) *pitch, duration/rhythm and velocity/dynamics*.

Serialism originated from the `twelve-tone` technique, described in 1919 by Josef Hauer in his published work "Law of the twelve tones". This technique starts out with a randomly ordered set of the twelve chromatic notes. From there on out you can apply transformations on this set, such as reverse/retrograde, inverse, transpose, and combinations between those.

- [Serialism on Wikipedia](https://en.wikipedia.org/wiki/Serialism)

- [Twelve-Tone on Wikipedia](https://en.wikipedia.org/wiki/Twelve-tone_technique)

- [Phillip Magnuson - Sound Patterns Ch.45 - Serialism](http://academic.udayton.edu/PhillipMagnuson/soundpatterns/microcosms/serialism.html)

For many of the functions programmed much inspiration was gained from Laurie Spiegels paper on "Manipulation of Musical Patterns" (1981) in which she suggests to *"extract a basic "library" consisting of the most elemental  transformations which have consistently been successfully used on musical patterns, a basic group of "tried-and-true" musical manipulations."* Specifically the stretch and expand methods were inspired by Laurie Spiegels writings in this paper. Stretch is a method that is *"inserting a smooth ramp between discretely separated values"* and expand is an interpretation of *"Extension beyond that which already exists in such a way as to preserve continuity with it, to project from it"* 

- [Laurie Spiegel - Manipulations of Musical Patterns](http://retiary.org/ls/writings/musical_manip.html)

The euclidean rhythm generator was inspired by the famous paper by Godfried Toussaint.

- [Godfried Toussaint - The Euclidean Algorithm Generates Traditional Musical Rhythms](http://cgm.cs.mcgill.ca/~godfried/publications/banff.pdf)

The clave rhythm generator was inspired by another paper by Godfried Toussaint.

- [Godfried Toussaint - A mathematical analysis of African, Brazilian, and Cuban clave rhythms](http://cgm.cs.mcgill.ca/~godfried/publications/bridges.pdf)
- [Comparative Musicology - Musical Rhythm and Mathematics](http://cgm.cs.mcgill.ca/~godfried/rhythm-and-mathematics.html)

Inspiration for the sequencing also came from the Live Coding scene and current programming languages available such as Tidal, Extempore, SonicPi and more. In Live Coding the Serialism technique is very common when programming music. In many cases the rhythms, melodies, and other musical expressions are expressed in arrays that are iterated based on the timing of the system.

- [Alex McLean - Tidal Pattern Language for Live Coding of Music](https://s3.amazonaws.com/academia.edu.documents/11010319/39.pdf?response-content-disposition=inline%3B%20filename%3DTidal_Pattern_Language_for_Live_Coding_o.pdf&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAIWOWYYGZ2Y53UL3A%2F20200115%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200115T225654Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=a1d10c16a032d819fa4b9c8f9bb6f79eacf3a81fb13704d60cd08ef4cd0e1f51)

The inspiration for usage of Integer Sequences came from composers such as Iannis Xenakis, who used the fibonacci formula in his piece *Nomos Alpha* and referred to the technique as *Fibonacci Motion*. Also Xenakis referred to the usuage of set theory for composition as *Symbolic Music*.

- [Iannis Xenakis - Formalized Music, Thought and Mathematics in Music](https://books.google.nl/books?hl=en&lr=&id=y6lL3I0vmMwC&oi=fnd&pg=PR7&dq=symbolic+music+xenakis&ots=W_s_gzotb2&sig=Y6-2zjquOIwju7q8uaoRcPuboC8&redir_esc=y#v=onepage&q=symbolic%20music%20xenakis&f=false)

- [Thomas DeLio - Nomos Alpha: The Dialects of Structure and Materials](https://www.jstor.org/stable/843739?seq=1)

The Online Encyclopedia of Integer Sequences is a great resource for number sequences that can be derived from a wide variety of mathematical functions. A famous sequence is the Fibonacci sequence. An interesting approach used with integer sequences in algorithmic composition is applying a modulo operation. For the fibonacci sequence this results in the Pisano periods.

- [Online Encyclopedia of Integer Sequences](https://oeis.org/A000045)

- [Pisano Periods explained on Numberphile](https://www.youtube.com/watch?v=Nu-lW-Ifyec)

The Hexadecimal rhythm generator was inspired by a workshop by Steven Yi at the International Conference on Live Coding 2020 at the University of Limerick, Ireland.

- [Steven Yi - Hexadecimal Beat](https://github.com/kunstmusik/csound-live-code/blob/master/doc/hexadecimal_beats.md)

- [Learn hex beats](https://kunstmusik.github.io/learn-hex-beats/)

- [Bernhard Wagner - Rhythmic Patterns As Binary Numbers](http://bernhardwagner.net/musings/RPABN.html)

Some methods from the Transformational and Stochastic library are inspired by objects or functions in the Max/MSP programming environment. Such as the urn, spread and spreadInclusive methods.

The collatz conjecture algorithm was inspired by a Numberphile and Coding Train video on youtube. The conjecture allows for very organic graphs when drawing the even-odd numbers in sequence as small rotations in angles of lines.

- [Collatz Conjecture on Numberphile](https://youtu.be/LqKpkdRRLZw)

The Infinity Series is based on the work by composer Per Nørgård. The method takes its name from the endlessly self-similar nature of the resulting musical material, comparable to fractal geometry. Mathematically, the infinity series is an integer sequence. A great explanation can be found here:

- [Per Nørgård's Infinity Series](https://www.lawtonhall.com/blog/2019/9/9/per-nrgrds-infinity-series#:~:text=Coding%20the%20Infinity%20Series)

Some other interesting resources and papers that have been used for some of the methods within this library.

- [Nick Collins - Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf)

- [Markov Chain on wikipedia](https://en.wikipedia.org/wiki/Markov_chain)

# 🤓 Missing Something?

This library is a work in progress, and I'm always interested to receive inspiration, suggestions, enhancements, literature and more. Feel free to file an [issue here](https://github.com/tmhglnd/total-serialism/issues) and I will gladly look into it!

## 🔋 Powered By

Total Serialism is a result of research in algorithmic composition with the [Mercury](https://github.com/tmhglnd/mercury) live coding environment. 

- Mercury has been granted funding from [**Creative Industries Fund NL**](https://stimuleringsfonds.nl/en/)
- Mercury has been granted in-kind funding from [**Creative Coding Utrecht**](https://creativecodingutrecht.nl/)

# 📄 License

The MIT License

Copyright (c) 2020 Timo Hoogland

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
