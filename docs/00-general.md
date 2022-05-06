# General Syntax

## new

Create a new instance of an instrument or external output. This can be a `sample`, a `synth`, a `loop`, a `polySynth`, `midi` or an `emitter` for osc followed by the name of the sample, the name of the waveshape to use for the synth, the emitter type (currently only supports `osc`) or the midi device name. After that use functions to set parameters for the object.

**arguments**
- {Instrument} -> the instrument type (sample, synth, loop, polySynth, emitter)
	- {Type} -> selected sample or synth waveform (based on loaded files)
		- {Functions+} -> instrument methods seperated by spaces (optional)

```java
new synth saw

new sample kick_909

new emitter osc

new midi "AU DLS Synth 1"
```

Alias: `make`, `sound`

By default Mercury has a small library of samples and single-cycle waveforms included in the environment. A full list of these samples and waveforms can be found here: [Sounds in Mercury](/mercury_ide/media/README.md)

## ring / list

Create a circular array, which is called a `ring` or `list`. This ring can hold integers, floats, symbols and other rings (2-dimensional). Use these to change parameters over time for instruments. The `ring` must be declared with a name before it can be used as a variable in an instrument function. 

**arguments**
- {Name} -> ring name
	- {Values} -> one or more values 
	- {Function} -> a ring function

```java
ring someValues [0 1.618 21 3.14]

list someSamples [kick_909 hat_909 snare_909 hat_909]

list fromFunction random(20 0 100)
```

Alias: `list`, `array`

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

Read more about all the algorithmic methods available for generating and transforming lists in Mercury under [Ring Methods](./05-ring.md#ring-methods).

## set

Use the set function to change Global Settings or call functions for an instrument-instance `name`, `group` or `all`. The instrument must be declared with a `name()` or `group()` before the `set` is called.

**arguments**
- {Name} -> parameter or instrument name to set value
	- {Value} -> value to set
	- {Function} -> instrument function to apply

global settings:

```java
set tempo 125
set volume 0.8
set scale pentatonic_major D
set random_seed 9876
```

Or for using with instruments:

```java
new synth saw name(bass)
new sample kick_909 group(drums)
new sample snare_909 group(drums)

set bass gain(0.5)
set drums fx(drive 10)
set all fx(reverb 0.8 10)
```

Alias: `give`, `apply`

## print

Print the output of a list to the console to see its output.

```java
console show

list rnd random(12)
list sin sine(10 5.4)

print rnd
print sin

//=> PRINT: rnd 11 7 21 11 9 8 4 6 3 8 23 10
//=> PRINT: sin 6 7 2 10 0 11 0 11 1 8 5 5
```

## console

Show the console to see the printed output or other error messages from the code. Clear the console as well.

```java

console show
console empty
```

## silence

Disable all sounds that are evaluated **before** this line. Alternatively you can hit the `Alt + .` shortkey to disable the instruments. 

*Note* : Silencing the instruments is not the same as disabling the Audio (below). In this case the instruments are deleted, but the signal-chain is still processing in order to be able to quickly start the sound when a new instrument is generated.

```java
silence
```

Alias: `mute`, `killAll` (deprecated)

## audio

Disable/enable the Digital Signal Processing (DSP) engine.

```
audio <1-0>
```
