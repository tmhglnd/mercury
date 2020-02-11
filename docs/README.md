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
		- `Driver`: `Asio4All` (Windows)
		- `Driver`: `CoreAudio` (MacOS)
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

## Table of Content

- [General Syntax](./00-general.md)
	- [new](./00-general.md#new)
		- synth
		- polySynth
		- sample
		- loop
		- emitter
	- [ring](./00-general.md#ring)
	- [set](./00-general.md#set)
	- [killAll](./00-general.md#killAll)

- [Global Settings (set)](./01-global.md)
	- [tempo](./01-global.md#tempo)
	- [scale](./01-global.md#scale)
	- [scalar](./01-global.md#scalar)
	- [randomSeed](./01-global.md#randomseed)
	- [volume](./01-global.md#volume)
	- [highPass](./01-global.md#highpass) 
	- [lowPass](./01-global.md#lowpass)
	- [osc](./01-global.md#osc)
	- [midiClock](./01-global.md#midiclock)

- [Synth/Sample Functions](./02-instrument.md)
	- [name](./02-instrument.md#name)
	- [group](./02-instrument.md#group)
	- [time](./02-instrument.md#time)
	- [beat](./02-instrument.md#beat)
	- [shape](./02-instrument.md#shape)
	- [gain](./02-instrument.md#gain)
	- [pan](./02-instrument.md#pan)
	- [fx](./02-instrument.md#fx)
	- Synth only
		- [note](./02-instrument.md#note)
		- [wave2](./02-instrument.md#wave2)
	- Sample only
		- [speed](./02-instrument.md#speed)
		- [stretch](./02-instrument.md#stretch)
		- [offset](./02-instrument.md#offset)

- [Emitter](#emitter)
	- osc
	- name

- [FX](#fx-1)
	- reverb 
	- delay 
	- filter 
	- lfo 
	- double 
	- drive 
	- chip 

- [Ring Methods Generative (ring)](#ring-methods-generative)
	- spread
	- spreadInclusive 
	- spreadFloat
	- spreadInclusiveFloat
	- random 
	- randomFloat
	- euclid

- [Ring Methods Transformational (ring)](#ring-methods-transformational)
	- join
	- thin
	- palin
	- clone
	- spray
	- every 


## Emitter

Create an emitter object. Use this object to send messages to other platforms. The emitter objects works similarly to the instruments in the sense that it also has the `time`, `beat` and `name` functions by default. The `time` determines the time-interval at which messages are send. The `beat` can turn send moments on or off. See under [Synth/Sample](#synthsample-functions) for further detail.

### osc

Create an emitter object of type `osc`. The `name(<name>)` method is used to set the opening address of the message to `/<name>`. Any arbitrary function name is used to set as second address in the osc-string. If no name is provided it will default to a unique number for every instrument instance. By adding other functions with any arbitrary name you can send a message with the address in the form of `/<name>/<function> <arguments>`

```
new emitter osc name(<name>) time(<division><offset>)
```
```
ring params [0.25 0.5 0.75]
ring values [3 1]

new emitter osc name(myOSC) time(1/4) 
	set myOSC someParam(params) anotherParam(values)

// emits => /myOSC/someParams 0.25
            /myOSC/anotherParam 3
            /myOSC/someParams 0.5
            /myOSC/anotherParam 1
            /myOSC/someParams 0.75
            /myOSC/anotherParam 3
            /myOSC/someParams 0.25
            etc...
```

The messages also support multiple arguments up to a length of 256. Multiple arguments can be provided as rings, symbols, floats or integers.

```
ring val1 [0.25 0.5 0.75]
ring val2 [3 1]

new emitter osc name(myOSC) time(1/4)
	set myOSC aMessage(0.1 val1 val2 100)

// emits => /myOSC/aMessage 0.1 0.25 3 100
            /myOSC/aMessage 0.1 0.5 1 100
            /myOSC/aMessage 0.1 0.75 3 100
            /myOSC/aMessage 0.1 0.25 1 100
            etc...
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

### name

Set the name for the OSC emitter. This can be any string of 2 or more characters. The `name` is used as reference to the instrument when the `set` method is used to call methods for a specific object. The `name` is also prepended as first address in the osc-message of the format `/<name>/<function> argument`.

### address

Alternatively, if you want multiple emitters to send to the same address, you can use the `address()` method. The `address` is prepended as first address in the osc-message in the format: `/<address>/<function> argument`. Useful if you want to send messages to the same address, but with different timing-intervals.

```
ring params [0.25 0.5 0.75]
ring values [3 1 4]

new emitter osc name(osc1) address(myOSC) time(1/4) 
	set osc1 someParam(params)

new emitter osc name(osc2) address(myOSC) time(1/2)
	set osc2 anotherParam(values)

// emits => /myOSC/someParams 0.25
            /myOSC/someParams 0.5
            /myOSC/anotherParam 3
            /myOSC/someParams 0.75
            /myOSC/someParams 0.25
            /myOSC/anotherParam 1
            etc...
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

