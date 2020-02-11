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
	- Shared methods
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

- [Emitter](./03-emitter.md)
	- [osc](./03-emitter.md#osc)
	- [name](./03-emitter.md#name)
	- [address](./03-emitter.md#address)

- [FX](./04-fx.md)
	- [chip](./04-fx.md#chip)
	- [delay](./04-fx.md#delay)
	- [double](./04-fx.md#double)
	- [drive](./04-fx.md#drive)
	- [filter](./04-fx.md#filter)
	- [lfo](./04-fx.md#lfo)
	- [reverb](./04-fx.md#reverb)

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

