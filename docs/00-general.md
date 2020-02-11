# General Syntax

## new

Create a new instance of an instrument or external output. This can be a `sample`, a `synth`, a `loop`, a `polySynth` or an `emitter` followed by the name of the sample, the type of the waveshape to use for the synth or the type of output for the emitter (currently only supports `osc`). After that use functions to set parameters for the object.

```
new <synth/sample/emitter> <argument> function(arguments)
```
example
```
new synth <saw/sine/triangle/square>
new sample <sample_filename>
new emitter osc
```

## ring

Create a circular array, which is called a `ring`. This ring can hold integers, floats, symbols and arrays (2-dimensional). Use these to change parameters over time for instruments. The `ring` must be declared with a name before it can be used as a variable in an instrument function. 

```
ring <name> [v0 v1 v2 ... v-n] 
```
example
```
ring someInts [0 10 20 30]
ring someFloats [1.618 3.1415]
ring twoDimensional [0 1 [2 3] 4 [5 6 7]]
ring someSamples [kick_909 hat_909 snare_909 hat_909]
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

## set

Use the set function to change Global Settings or call functions for an instrument-instance `name`, `group` or `all`. The instrument must be declared with a `name()` or `group()` before the `set` is called.

For global settings:
```
set <global_setting> <arguments>
```
example
```
set tempo 125
set volume 0.8
set scale pentatonic_major D
set random_seed 9876
```

Or for using with instruments:
```
set <named-instrument> function(arguments)
```
example
```
new synth saw name(bass)
new sample kick_909 group(drums)
new sample snare_909 group(drums)

set bass gain(0.5)
set drums fx(drive 10)
set all fx(reverb 0.8 10)
```

## killAll

Disable all sounds evaluated **before** this line

```
killAll
```

## audio

Disable/enable the Digital Signal Processing (DSP) engine.

```
audio <1-0>
```