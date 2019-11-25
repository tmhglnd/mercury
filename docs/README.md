# Mercury Documentation

*Disclaimer: This documentation is most certainly not finished and will subject to changes. If you find errors, feel free to report them*

## Getting Started

If you haven't installed Mercury yet, follow the instructions [here](../README.md#install)

1. Open `mercury_ide_x.x.x.maxproj`

2. Link the included sample library 
	- `File > Load Sample Library` in menubar of main window
	- select `samples` folder under `mercury/mercury_ide_x.x.x/media`
	- `open` when folder is selected
	- `Show Audiofiles` in the main window to see if the filepaths are correct.

3. Turn the rendering engine `on` in the main window. You will see the text-editor appear and the cursor starts blinking.
	- In the event of a laggy editor, slow cursor and/or low FPS change the visual settings:
		- `Settings > Visual Setup`
		- `Resolution`: `540`
		- `Sync to Refreshrate`: `Off`
		- `FPS`: `30`

4. Turn the audio engine `on` in the main window. You will see the cpu-usage meter showing a percentage.
	- In the event of no audio, laggy audio and/or clicky audio change the audio settings:
		- `Settings > Audio Setup`
		- `Driver > Asio4All` (Windows)
		- `Driver > CoreAudio` (MacOS)
		- `IO Vectorsize`: `512/1024`
		- `Signal Vectorsize`: `256/512`
		- `Overdrive`: `On`
		- `Audio Interrupt`: `On`

5. Type the following code in the code editor (focus on the window):
	- `new sample kick_909 time(1/4) gain(1)`. 
	- **run** the code by pressing:
		- `CMD + R` or `ALT + Enter` (MacOS)
		- `ALT + R` or `ALT + Enter` (Windows)
		- `File > Excecute Code` (when none of above work)
	- In the event of poor performance follow settings steps above.

## Table of Content for Syntax

- General Syntax
	- new
	- ring
	- set
	- killAll
- Global Settings (set)
	- tempo
	- scale
	- scalar
	- random_seed
	- volume
	- hipass 
	- lopass 
- Synth/Sample Functions (new)
	- name
	- group
	- time
	- note
	- beat
	- shape
	- gain
	- pan
	- fx
- FX
	- reverb 
	- delay 
	- filter 
	- lfo 
	- double 
	- drive 
	- chip 
- Ring Methods Generative (ring)
	- spread
	- spreadinclusive 
	- spreadFloat
	- spreadinclusiveFloat
	- random 
	- randomFloat
	- euclid 
- Ring Methods Transformational (ring)
	- join
	- thin
	- palin
	- clone
	- spray
	- every 

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

## Global Settings (set)

### tempo

Change the global tempo in Beats Per Minute (BPM), counted in quarter-notes. Second argument sets a ramptime in milliseconds to gradually change the tempo over the provided amount of time (!WARNING: experimental and may lag/glitch!)

```
set tempo <bpm> <ramptime>

set tempo 128
set tempo 80 5000
```

### scale

Set the scale as string where all notes are mapped to. An optional second argument sets the root for the scale. 

```
set scale <scale_name> <root>

set scale minor Eb
```

### scalar

Transpose the current scale up or down in semitones integer value.

```
set scalar <transpose-by>

set scalar 2
```

### random_seed

Set the random seed as integer for the psuedorandom number generators used in all functions across the environment. Setting the seed to a fixed integer will help make sure random values keep the same sequence every time you re-evaluate the code.

```
set random_seed <integer>

set random_seed 31415
```

### volume

Set the global volume in floating-point amplitude for all instruments across the entire environment. Additional ramptime in milliseconds can be provided to create fade-in/fade-out or smooth transitions to for dynamics.

```
set volume <amplitude> <ramptime>

set volume 0.5 5000
```

### hipass

Set the global high-pass filter cutoff in Hz for all instruments across the entire environment. Additional ramptime in milliseconds can be provided to create smooth transitions from one value to another.

```
set hipass <cutoff> <ramptime>

set hipass 900 5000
```

### lopass

Set the global low-pass filter cutoff in Hz for all instruments across the entire environment. Additional ramptime in milliseconds can be provided to create smooth transitions from one value to another.

```
set lopass <cutoff> <ramptime>

set lopass 900 5000
```

## Synth/Sample Functions

### name

Set the name for this instrument. This can be any string of 2 or more characters. The `name` is used as reference to the instrument when the `set` method is used to call methods for a specific instrument.

```
new <inst> <type> name(<name>)
```
```
new synth saw name(foo)
new sample kick_909 name(bar)
	set foo gain(0.8)
```

### group

Set the group-name for this instrument. This can be any string of 2 or more characters. The `group` is used as reference to multiple instruments with the same groupname when the `set` method is used.

```
new <inst> <type> group(<name>)
```
```
new sample kick_909 group(drums)
new sample snare_909 group(drums)
	set drums gain(0.8)
```

### time 

Set the time interval in which a synth or sample is triggered. This can be an integer, float or expression. `1 = bar`, `1/4 = quarter-note`, `1/12  = 8th triplet`, `3/16 = 3-16th notes` etc. Similarly you can set an offset in the timing. The `time()` will start an internal counter for this instrument, used as an index to lookup values from other ring's provided as argument in methods for this instrument.

```
set <name> time(<division> <offset>)
```
```
set tempo 130

new sample kick_909 name(kick)
	set kick time(1/4)

new synth saw name(hat)
	set hat time(1/2 3/16)
```

Alternative function-names: `timing() | t()`

### beat

Provide the beat function with a `ring` consisting of zeroes and ones. For every trigger at the time interval provided in the `time()` method, the next value in the ring will be given. An optional second argument resets the internal instrument index after a certain amount of time in n-bars.

```
set <name> beat(<ring> <reset>)
```
```
ring aBeat [1 0 0.2 1 0.5]

new sample hat_909 name(ht)
	set ht time(1/16) beat(aBeat 2)
```

Alternative function-names: `rhythm() | b()`

### shape

Set the attack and release time of a sound. The attack time is the fade-in for the sound, the release is the fade-out for the sound both in milliseconds.

```
set <name> shape(<attack> <release>)
```
```
new synth saw name(lead)
	set lead shape(5 150) time(3/16)
```

Alternative function-names: `envelope() | env() | transient() | e()`

### gain

Set the volume for the instrument in floating-point amplitude. Where `1` is the normalized amplitude, `0.5` is the half softer (-6 dBFS) and `2` is twice as loud (+ 6dBFS).

```
set <name> gain(<amplitude>)
```
```
new sample snare_909 name(sn)
	set sn gain(0.8)
```

Alternative function-names: `amp() | volume() | g() | a() | v()`

### pan

Set the panning position in floating-point for the sound over the stereo-image. `-1` is 100% left, `0` is center, `1` is 100% right. Higher or lower values wrap between -1 and 1. Provide pan with `random` to get a new random panning value every count of the `time()`.

```
set <name> pan(<position>)
```
```
new sample clap_909 name(hand)
	set hand pan(random)
```

Alternative function-names: `panning() | p()`

### fx

Apply an effect to the sound of the instrument. The first argument is always the fx-name as a string. The arguments depend on the chosen effect. All effects are listed under FX.

```
set <name> fx(<fxname> <arg1> <arg2> ... <arg-n>)
```
```
new synth square name(bass)
	set bass fx(double)
```

Alternative function-names: `effect() | with_fx() | add_fx()`

## Synth Only

### note 

```
set <name> note(<semi-tone> <octave>)
```

### wave2

```
set <name> wave2(<saw/sine/square/triangle> <frequency-ratio>)
```

## Sample Only

### speed

```
set <name> speed(<sample-playback-speed-ratio>)
```

### stretch

```
set <name> stretch(<0-1>)
```

### offset

```
set <name> offset(<position-in-sample-0-1>)
```

## fx

### reverb

```
set <name> fx(reverb <amplitude> <reverb-length-0-19>)
```

### delay

```
set <name> fx(delay <time-division1> <time-division2> <feedback-0-1> <cutoff-0-1>)
```

### filter

static filter:

```
set <name> fx(filter <type=low/band/high> <cutoff-frequency> <resonance-0-1>)
```

modulated filter:

```
set <name> fx(filter <type> <time-division> <cutoff-hi> <cutoff-lo> <res-0-1> <shape-tilt-0-1> <exponential-curve-0-1>)
```

### lfo

```
set <name> fx(lfo <time-division>)
```

### double

```
set <name> fx(double)
```

### drive

```
set <name> fx(drive <drive-amount >= 0>)
```

### chip

```
set <name> fx(chip <degrade-samplerate-0-1>)
```

## Ring Methods Generative

### spread

```
ring myRing spread(<listlength> <low-bound> <high-bound>)
```

### spreadinclusive

```
ring myRing spreadinclusive(<listlength> <low-bound> <high-bound>)
```

### spreadFloat

```
ring myRing spreadFloat(<listlength> <low-bound> <high-bound>)
```

### spreadinclusiveFloat

```
ring myRing spreadinclusiveFloat(<listlength> <low-bound> <high-bound>)
```

### random

```
ring myRing random(<listlength> <low-bound> <high-bound>)
```

### randomFloat

```
ring myRing randomFloat(<listlength> <low-bound> <high-bound>)
```

### euclid

```
ring myRing euclid(<listlength> <amount-of-hits> <rotate>)
```



## Ring Methods Transformational

### join

```
ring joined join(<ring1> <ring2> ... <ring-n>)
```

### thin

```
ring thined thin(<ring>)
```

### palin

```
ring palinated palin(<ring>)
```

### duplicate

```
ring duped duplicate(<ring> <amount>)
```

### clone

```
ring cloned clone(<ring> <dup-offset1> <dup-offset2> ... <dup-offset-n>) 
```

### spray

```
ring sprayed spray(<ring-beat> <ring-melody>)
```

### every

```
ring sometimes every(<ring> <when> <beat-division>)
```

