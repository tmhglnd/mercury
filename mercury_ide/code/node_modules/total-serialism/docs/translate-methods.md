## Translate Methods

Translate between different notation systems. For example convert midi values to frequency, or note names to midi integers. Or use a relative semitone notation system and convert to midi. Map values in an Array to a specified scale, and output the relative values in the specified scale, root and octave.

## Include

```js
const TL = require('total-serialism').Translate;
```

## Usage

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

Convert between rhythmic notation such as divisions or ratios and milliseconds based on the set tempo in the global settings.

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
