# Mercury Documentation

*Disclaimer: This documentation is most certainly not finished and will subject to changes. If you find errors, feel free to report them*

## Table of Content

- General Syntax
	- new
	- ring
	- set
	- killAll
- Global Settings
	- tempo
	- scale
	- tonic
	- random_seed
	- volume
	- hipass 
	- lopass 

## General Syntax

### new

Create a new instance of an instrument. This can be a sample or a synth followed by the name of the sample or the name of the waveshape to use for the synth. After that functions can set parameters for the instrument

```
new <synth/sample> <argument> function(arguments)

new synth <saw/sine/triangle/square>
new sample <sample-filename>
```

### ring

Create a circular array, named a ring. This ring can hold integers, floats, symbols and arrays (2D). Use these to change parameters over time for functions. The `ring` must be declared with a name before the line before it can be used as an variable in an instrument function.

```
ring <name> [v0 v1 v2 ... v-n] 

ring someInts [0 10 20 30]
ring someFloats [1.618 3.1415]
ring twoDimensional [0 1 [2 3] 4 [5 6 7]]
```

### set

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

### killAll

Disable all sounds evaluated before this line

```
killAll
```

## Global Settings

### tempo

Change the global tempo in Beats Per Minute (BPM), counted in quarter-notes. Second argument sets a ramptime to gradually change the tempo over the provided amount of time (experimental and may lag!)

```
set tempo <bpm> <ramptime-in-ms>

set tempo 128
set tempo 80 5000
```

### scale

Set the scale all notes are mapped to. 

```
set scale <scale_name> <tonic>

set scale minor Eb
```

### tonic

Set the root of the scale without setting the scale.

```
set tonic <root-note>

set tonic A#
```

### random_seed

Set the random seed for the psuedorandom number generators used in all functions across the environment. Setting the seed to a fixed integer will help make sure random values keep the same sequence every time you re-evaluate the code.

```
set random_seed <integer-value>

set random_seed 31415
```

### volume

Set the global volume for all instruments across the entire environment. Additional ramptime can be provided to create fade-in/fade-out or smooth transitions to for dynamics.

```
set volume <amplitude-in-float> <ramptime-in-ms>

set volume 0.5 5000
```

### hipass

Set the global high-pass filter cutoff for all instruments across the entire environment. Additional ramptime can be provided to create smooth transitions from one value to another.

```
set hipass <cutoff-in-Hz> <ramptime-in-ms>

set hipass 900 5000
```

### lopass

Set the global low-pass filter cutoff for all instruments across the entire environment. Additional ramptime can be provided to create smooth transitions from one value to another.

```
set lopass <cutoff-in-Hz> <ramptime-in-ms>

set lopass 900 5000
```