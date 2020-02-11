# General Syntax

## new

Create a new instance of an instrument or external output. This can be a sample, a synth or an emitter followed by the name of the sample, the name of the waveshape to use for the synth or the type of output for the emitter (currently only supports osc). After that use functions to set parameters for the object.

```
new <synth/sample/emitter> <argument> function(arguments)

new synth <saw/sine/triangle/square>
new sample <sample-filename>
new emitter osc
```

## ring

Create a circular array, named a ring. This ring can hold integers, floats, symbols and arrays (2D). Use these to change parameters over time for functions. The `ring` must be declared with a name before the line before it can be used as an variable in an instrument function. 

```
ring <name> [v0 v1 v2 ... v-n] 

ring someInts [0 10 20 30]
ring someFloats [1.618 3.1415]
ring twoDimensional [0 1 [2 3] 4 [5 6 7]]
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

## set

Use the set function to change Global Settings or call functions for a named instrument-instance, group or all. The instrument must be declared with a `name()` before the `set` is called.

```
set <global_setting> <arguments>

set tempo 125
set volume 0.8
set scale pentatonic_major D
set random_seed 9876
```
```
set <named-instrument> function(arguments)

set bass gain(0.5)
set drums fx(drive 10)
set all fx(reverb 0.8 10)
```

## killAll

Disable all sounds evaluated before this line

```
killAll
```

## audio

Disable/enable the Digital Signal Processing (DSP)

```
audio <1-0>
```
```
audio 1
```