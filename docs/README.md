# 📖 Mercury Documentation

*Disclaimer: This documentation is not entirely finished and will subject to changes. If you like to contribute or find errors, feel free to report them in the issues or send a pull request*

## Table of Content

- [🏃 Quick Start](./quick-start.md)

- [🤓 Tutorial (work in progress...)](./tutorial.md)

- [💻 Shortkeys](./06-shortkeys.md)

- [⚠️ Troubleshooting](./08-troubleshooting.md)

- [🔊 Settings and Sounds](./07-environment.md)
	- [Mercury Main Window](./07-environment.md#mercury-main-window)
	- [Menubar](./07-environment.md#menubar)
## Code Documentation

- [Actions](./00-general.md)
	- [new](./00-general.md#new)
	- [ring](./00-general.md#ring)
	- [set](./00-general.md#set)
	- [print](./00-general.md#print)
	- [silence](./00-general.md#silence)

- [Global (set)](./01-global.md)
	- [tempo](./01-global.md#tempo)
	- [scale](./01-global.md#scale)
	- [scalar](./01-global.md#scalar)
	- [randomSeed](./01-global.md#randomseed)
	- [volume](./01-global.md#volume)
	- [highPass](./01-global.md#highpass) 
	- [lowPass](./01-global.md#lowpass)
	- [osc](./01-global.md#osc)
	- [midi](./01-global.md#midi-and-midiclock)

- [Synth/Sample/Midi (new)](./02-instrument.md)
	- All instruments (except midi)
		- [name](./02-instrument.md#name)
		- [group](./02-instrument.md#group)
		- [time](./02-instrument.md#time)
		- [beat](./02-instrument.md#beat)
		- [shape](./02-instrument.md#shape)
		- [gain](./02-instrument.md#gain)
		- [pan](./02-instrument.md#pan)
		- [fx](./02-instrument.md#fx)
	- Synth / polySynth
		- [note](./02-instrument.md#note)
		- [useDetune](./02-instrument.md#usedetune)
		- [wave2](./02-instrument.md#wave2)
	- Sample / Loop
		- [speed](./02-instrument.md#speed)
		- [offset](./02-instrument.md#offset)
		- [useNote](./02-instrument.md#usenote)
		- [note](./02-instrument.md#note)
		- [stretch](./02-instrument.md#stretch)
	- Midi
		- [note](./02-instrument.md#note-1)
		- [length](./02-instrument.md#length)
		- [out](./02-instrument.md#out)
		- [chord](./02-instrument.md#chord)
		- [sync](./02-instrument.md#sync)

- [Emitter (osc)](./03-emitter.md)
	- [osc](./03-emitter.md#osc)
	- [name](./03-emitter.md#name)
	- [address](./03-emitter.md#address)

- [Sound Effects (fx)](./04-fx.md)
	- [chip](./04-fx.md#chip)
	- [delay](./04-fx.md#delay)
	- [double](./04-fx.md#double)
	- [drive](./04-fx.md#drive)
	- [filter](./04-fx.md#filter)
	- [lfo](./04-fx.md#lfo)
	- [reverb](./04-fx.md#reverb)

- [Ring functions](./05-ring.md)
	- [Generative Methods](#generative-methods)
		- eg: `spread`, `fill`, `sine`, `cosine`
	- [Algorithmic Methods](#algorithmic-methods)
		- eg: `euclidean`, `hexBeat`, `fibonacci`
	- [Stochastic Methods](#stochastic-methods)
		- eg: `random`, `drunk`, `shuffle`, `choose`
	- [Transformative Methods](#transformative-methods)
		- eg: `join`, `palindrome`, `expand`, `lace`
	- [Translate Methods](#translate-methods)
		- eg: `divisionToMs`, `toScale`
	- [Utility Methods](#utility-methods)
		- eg: `add`, `subtract`, `divide`, `multiply`

## Param Glossary

When describing input argumenst for functions in some cases it is necessary to know if the values can be a number (positive and/or negative), a decimal number (float) or even a name.

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