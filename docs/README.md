# Mercury Documentation

*Disclaimer: This documentation is most certainly not finished and will subject to changes. If you find errors, feel free to report them*

## Table of Content

- [Tutorial (work in progress...)](./tutorial.md)

- [Getting Started](./getting-started.md)

- [Shortkeys](./06-shortkeys.md)

- [General Syntax](./00-general.md)
	- [new](./00-general.md#new)
		- synth
		- polySynth
		- sample
		- loop
		- emitter
	- [ring](./00-general.md#ring)
	- [set](./00-general.md#set)
	- [silence](./00-general.md#silence)

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

- [Ring Methods Transformational (ring)](./05-ring.md)
	- join
	- thin
	- palin
	- clone
	- spray
	- every

## Param Glossary

**Values**

- `Value` -> Any Number or Name
	- `Number` -> Int+, Int or Float
		- `Bool` -> 0 or 1 (true or false)
		- `Int+` -> A positive whole number, bigger than 0
		- `Int` -> A whole number, negative or positive, including 0
		- `Float` -> A floating-point number, negative or positive, including 0
	- `Name` -> A combination of letter-characters, may include capital letter, underscores and digits

**Rings**

- `Ring` -> A ring with `Value`'s
	- `NumberRing` -> A ring with `Number`'s
		- `IntRing+` -> A ring with `Int+`'s
		- `IntRing` -> A ring with `Int`'s
		- `FloatRing` -> A ring with `Float`'s
	- `NameRing` -> A ring with `Name`'s