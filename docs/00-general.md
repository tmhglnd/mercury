# General Syntax

## new

Create a new instance of an instrument or external output. This can be a `sample`, a `synth`, a `loop`, a `polySynth` or an `emitter` followed by the name of the sample, the type of the waveshape to use for the synth or the type of output for the emitter (currently only supports `osc`). After that use functions to set parameters for the object.

**arguments**
- {Instrument} -> the instrument
	- {Type} -> selected instruments type or sample
		- {Functions+} -> instrument methods seperated by spaces (optional)

```java
new synth saw

new sample kick_909
```

## ring

Create a circular array, which is called a `ring`. This ring can hold integers, floats, symbols and other rings (2-dimensional). Use these to change parameters over time for instruments. The `ring` must be declared with a name before it can be used as a variable in an instrument function. 

**arguments**
- {Name} -> ring name
	- {Values} -> one or more values 
	- {Function} -> a ring function

```java
ring someValues [0 1.618 21 3.14]

ring someSamples [kick_909 hat_909 snare_909 hat_909]

ring fromFunction random(20 0 100)
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

Read more about all the algorithmic methods available for generating and transforming rings in Mercury under [Ring Methods](./05-ring.md#ring-methods).

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

## silence

Disable all sounds that are evaluated **before** this line. Alternatively you can hit the `Alt + .` shortkey to disable the instruments. 

*Note* : Silencing the instruments is not the same as disabling the Audio (below). In this case the instruments are deleted, but the signal-chain is still processing in order to be able to quickly start the sound when a new instrument is generated.

```java
silence
```

## audio

Disable/enable the Digital Signal Processing (DSP) engine.

```
audio <1-0>
```
