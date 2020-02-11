# Mercury Documentation

*Disclaimer: This documentation is most certainly not finished and will subject to changes. If you find errors, feel free to report them*

## Table of Content

- [Getting Started](./getting-started.md)

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

- [Synth/Sample Functions (new)](./02-instrument.md)
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

- [Ring Methods Generative (ring)](./05-ring.md)
	- spread
	- spreadInclusive 
	- spreadFloat
	- spreadInclusiveFloat
	- random 
	- randomFloat
	- euclid

- [Ring Methods Transformational (ring)](./05-ring.md))
	- join
	- thin
	- palin
	- clone
	- spray
	- every