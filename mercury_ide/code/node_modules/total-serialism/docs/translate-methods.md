## Translate

Translate between different notation systems. For example convert midi values to frequency, or note names to midi integers. Or use a relative semitone notation system and convert to midi. Map values in an Array to a specified scale, and output the relative values in the specified scale, root and octave.

Use the `new TL.Scala()` class to import a *.scl* file (Scala tuning format) to work with custom tuning systems apart from the Western 12-TET (Equal Temperament) tuning. 

## Include

```js
const TL = require('total-serialism').Translate;
```

## Usage

- [Conversion between pitch units](#conversion-between-pitch-units)
- [Conversion between time units](#conversion-between-time-units)
- [Working with predefined scale and root](#working-with-fixed-scale-and-root)
- [Using Scala tuning format](#using-scala-tuning-format)

# Methods

- midiToNote (mton)
- midiToFreq (mtof)
- noteToMidi (ntom)
- noteToFreq (ntof)
- freqToMidi (ftom)
- freqToNote (fton)
- relativeToMidi (rtom)
- relativeToFreq (rtof)
- chromaToRelative (ctor)
- chordsFromNumerals (chords)
- chordsFromNames
- ratioToCent (rtoc)
- setTempo
- divisionToMs (dtoms)
- divisionToRatio (dtor)
- divisionToTicks (dtotk)
- timevalueToRatio (ttor)
- timevalueToTicks (ttotk)
- setScale
- setRoot
- getSettings
- scaleNames
- toScale
- toMidi
- toFreq
- Scala
- Scala.tune
- Scale.center
- Scala.parse
- Scala.scalaToFreq

## Conversion between pitch units

Convert easily between relative-semitones, midinotes, notenames, chord-numerals, chordnames and frequencies with the methods below. Thankfully using the amazing `Tonal.js` package by `@danigb` for various functions.

```js
// Convert Array or Int as midi-number to midi-notenames
TL.midiToNote([60, [63, 67, 69], [57, 65]]);
//=> [ 'c4', [ 'eb4', 'g4', 'a4' ], [ 'a3', 'f4' ] ] 
// Alias: mton()

// Convert midi-pitches to frequency (A4 = 440 Hz)
TL.midiToFreq([60, [63, 67, 69], [57, 65]]);
//=> [ 261.63, [ 311.13, 391.995, 440 ], [ 220, 349.23 ] ] 
// Alias: mtof()

// Convert Array of String as midi-notenames to midi-pitch
TL.noteToMidi(['c4', ['eb4', 'g4', 'a4'], ['a3', 'f4']]);
//=> [ 60, [ 63, 67, 69 ], [ 57, 65 ] ] 
// Alias: ntom()

// Convert midi-notenames to frequency (A4 = 440 Hz)
TL.noteToFreq(['c4', ['eb4', 'g4', 'a4'], ['a3', 'f4']]);
//=> [ 261.63, [ 311.13, 391.995, 440 ], [ 220, 349.23 ] ] 
// Alias: ntof()

// Convert frequency to nearest midi note
TL.freqToMidi([ 261, [ 311, 391, 440 ], [ 220, 349 ] ]);
//=> [ 60, [ 63, 67, 69 ], [ 57, 65 ] ] 
// Alias: ftom()

// Set detune flag to true to get floating midi output for pitchbend
TL.freqToMidi([ 261, [ 311, 391, 440 ], [ 220, 349 ] ], true);
//=> [ 59.959, [ 62.993, 66.956, 69 ], [ 57, 64.989 ]] 

// Convert frequency to nearest midi note name
TL.freqToNote([ 261, [ 311, 391, 440 ], [ 220, 349 ] ]);
//=> [ 'c4', [ 'eb4', 'g4', 'a4' ], [ 'a3', 'f4' ] ] 
// Alias: fton()

// Convert relative semitone values to midi-numbers
// specify the octave as second argument (default = 'C4' = 4 => 48)
TL.relativeToMidi([[-12, -9, -5], [0, 4, 7], [2, 5, 9]], 'c4');
//=> [ [ 48, 51, 55 ], [ 60, 64, 67 ], [ 62, 65, 69 ] ]
// Alias: rtom()

// Convert relative semitone values to frequency (A4 = 440 Hz)
// specify the octave as second argument (default = 'C4' = 4 => 48)
TL.relativeToFreq([[-12, -9, -5], [0, 4, 7], [2, 5, 9]], 'c4');
//=> [ [ 130.81, 155.56, 196 ], [ 261.62, 329.63, 392 ], [ 293.66, 349.23, 440 ] ]
// Alias: rtof()

// Convert a chroma value to a relative note number
// Can also include octave offsets with -/+, case-insensitive
TL.chromaToRelative(['c', ['eb', 'G', 'Ab'], ['a+', 'f-']]); 
//=> [ 0, [ 3, 7, 8 ], [ 21, -7 ] ]
// Alias: ctor()

// Convert ratio to relative cents
TL.ratioToCent(['2/1', ['3/2', ['4/3', '5/4']], '9/8']);
//=> [ 1200, [ 701.95, [ 498.04, 386.31 ] ], 203.91 ] 
// Alias: rtoc()

// Convert a chord progression from roman numerals to semitones
TL.chordsFromNumerals(['I', 'IIm', 'IVsus2', 'V7', 'VIm9']);
// => [[ 0, 4, 7 ],
//     [ 2, 5, 9 ],
//     [ 5, 7, 0 ],
//     [ 7, 11, 2, 5 ],
//     [ 9, 0, 4, 7, 11 ]] 
// Alias: chords()

// Add a root for the chord progression as optional argument
TL.chordsFromNumerals(['I', 'IIm', 'IVsus2', 'V7'], 'eb');
// => [[ 3, 7, 10 ],
//     [ 5, 8, 0 ],
//     [ 8, 10, 3 ],
//     [ 10, 2, 5, 8 ],
//     [ 0, 3, 7, 10, 2 ]]

// Convert a chord progression from chordnames to semitones
TL.chordsFromNames(['C', 'Dm', 'Fsus2', 'G7', 'Am9']);
//=> [[ 0, 4, 7 ],
//    [ 2, 5, 9 ],
//    [ 5, 7, 0 ],
//    [ 7, 11, 2, 5 ],
//    [ 9, 0, 4, 7, 11 ]] 
```

## Conversion between time units

Convert between rhythmic notation such as divisions or ratios and milliseconds based on the set tempo in the global settings.

```js
// Set the global tempo used with the divisionToMs() method
TL.setTempo(120);

// convert beat division strings to milliseconds use bpm from global settings
TL.divisionToMs(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2']);
//=> [ 500, [ 250, [ 375, 500 ] ], 333.33, 4000 ] 
// Alias: TL.dtoms()

// optional second argument sets bpm
TL.dtoms(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2'], 100);
//=> [ 600, [ 300, [ 450, 600 ] ], 400, 4800 ]

// convert beat division strings to beat ratio floats
TL.divisionToRatio(['1/4', '1/8', '3/16', '1/4', '1/6', '2']);
//=> [ 0.25, 0.125, 0.1875, 0.25, 0.167, 2 ] 
// Alias: TL.dtor()

// convert beat ratio floats to milliseconds
TL.ratioToMs([0.25, [0.125, [0.1875, 0.25]], 0.1667, 2], 100);
//=> [ 600, [ 300, [ 450, 600 ] ], 400.08, 4800 ] 
// Alias: TL.rtoms()

// convert beat division strings to ticks (1 tick = 1/480th quarter note)
TL.divisionToTicks(['1/4', ['1/8', ['3/16', '1/4']], '1/6', '2']);
//=> [ 480, [ 240, [ 360, 480 ] ], 320, 3840 ] 
// Alias: TL.dtotk()

// convert beat ratio to ticks (1 tick = 1/480th quarter note)
TL.ratioToTicks([0.25, [0.125, [0.1875, 0.25]], 0.16667, 2]);
//=> [ 480, [ 240, [ 360, 480 ] ], 320.00640000000004, 3840 ] 
// Alias: TL.rtotk()

// convert timevalue syntax to beat ratio floats
TL.timevalueToRatio(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m']);
//=> [ 0.25, [ 0.08333333333333333, [ 0.09375, 0.75 ] ], 0.03125, 3 ] 
// Alias: TL.ttor()

// convert timevalue syntax to milliseconds at 100 BPM
TL.timevalueToMs(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m'], 100);
//=> [ 600, [ 200, [ 225, 1800 ] ], 75, 7200 ] 
// Alias. TL.ttoms()

// conver timevalue syntax to ticks (1 tick = 1/480th quarter note)
TL.timevalueToTicks(['4n', ['8nt', ['16nd', '2nd']], '32n', '3m']);
//=> [ 480, [ 160, [ 180, 1440 ] ], 60, 5760 ]
// Alias: TL.ttotk()
```

## Working with fixed scale and root

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

// Map relative semitones to a specified scale class (including root)
// output as frequencies. Specify an octave offset (default = 'C3' = 4)
TL.toFreq([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 4);;
//=> [ 146.83, 146.83, 164.81, 164.81, 184.99, 195.99, 195.99, 220, 220, 246.94, 246.94, 277.18 ]

```

## Using Scala tuning format

Scala is a powerful tool for experimentation with musical tunings, such as just intonation scales, equal and historical temperaments, microtonal and macrotonal scales, and non-Western scales. Scala is ideal for the exploration of tunings and becoming familiar with the concepts involved. The `Scala` class supports:

- Loading of a *.scl* file
- Searching through the included scala-library (containing 5000+ scales and tunings) with filters for scale size, ratios/cents, text from description
- Setting tuning center in Hz and integer value (eg. 440Hz = 69)
- Customizing the scale by changing the range and cents array
- Converting numbers to frequencies
- Return the full chart of frequencies for a specified range of integers

```js
// Create an instance of a Scala class
let scl = new TL.Scala();

// Change the center note tuning
scl.tune(261.6255653);

// Change the center note number
scl.center(60);

// Load and parse a .scl file as a String of text with fs.readFileSync()
scl.parse(fs.readFileSync('12-TET.scl', 'utf8'));

// Get the current loaded Scala file data
scl.data;
//=> { description: ' 12-TET or Tone Equal Temperatement 
//                  divides an octave into 12 equal steps',
//   size: 12,
//   tune: 261.6255653,
//   center: 60,
//   range: 1200,
//   cents: [ 0, 100, 200, 300, 400, 500, 600, 
//            700, 800, 900, 1000, 1100 ] }

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

- Credit for text, scala library and format: [Stichting Huygens-Fokker](http://www.huygens-fokker.org/scala/)

- More about the [Scala Format](http://www.huygens-fokker.org/scala/scl_format.html)