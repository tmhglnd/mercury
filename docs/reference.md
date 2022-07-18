# 📖 Mercury Function Reference

*Disclaimer: This documentation is not entirely finished and will subject to changes. If you like to contribute or find errors, feel free to report them in the issues or send a pull request*

## Code Documentation

- [Actions](./00-general.md)
	- [new](./00-general.md#new)
	- [list](./00-general.md#list)
	- [set](./00-general.md#set)
	- [print](./00-general.md#print)
	- [silence](./00-general.md#silence)
	- [audio](./00-general.md#audio)

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
	- [click](./01-global.md#click)

- [Synth/Sample/Midi (new)](./02-instrument.md)
	- All instruments (except midi)
		- [name](./02-instrument.md#name)
		- [group](./02-instrument.md#group)
		- [time](./02-instrument.md#time)
		- [play](./02-instrument.md#beat)
		- [shape](./02-instrument.md#shape)
		- [gain](./02-instrument.md#gain)
		- [pan](./02-instrument.md#pan)
		- [fx](./02-instrument.md#fx)
	- Synth / polySynth
		- [note](./02-instrument.md#note)
		- [useDetune](./02-instrument.md#usedetune)
		<!-- - [wave2](./02-instrument.md#wave2) -->
		- [super](./02-instrument.md#super)
	- Sample / Loop
		- [speed](./02-instrument.md#speed)
		- [offset](./02-instrument.md#offset)
		<!-- - [useNote](./02-instrument.md#usenote) -->
		<!-- - [note](./02-instrument.md#note) -->
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

- [List functions](./05-ring.md)
	- [Generative Methods](./05-ring.md#generative-methods)
		- eg: `spread`, `fill`, `sine`, `cosine`
	- [Algorithmic Methods](./05-ring.md#algorithmic-methods)
		- eg: `euclidean`, `hexBeat`, `fibonacci`
	- [Stochastic Methods](./05-ring.md#stochastic-methods)
		- eg: `random`, `drunk`, `shuffle`, `choose`
	- [Transformative Methods](./05-ring.md#transformative-methods)
		- eg: `join`, `palindrome`, `expand`, `lace`
	- [Translate Methods](./05-ring.md#translate-methods)
		- eg: `divisionToMs`, `toScale`
	- [Utility Methods](./05-ring.md#utility-methods)
		- eg: `add`, `multiply`, `wrap`, `fold`

## Param Glossary

When describing input arguments for functions in some cases it is necessary to know if the values can be a number (positive and/or negative), a decimal number (float) or a name (string).

**Values**

- `Value` -> Any Number or Name
	- `Number` -> Int+, Int or Float
		- `Bool` -> 0 or 1 (true or false)
		- `Int+` -> A positive whole number, bigger than 0
		- `Int` -> A whole number, negative or positive, including 0
		- `Float` -> A floating-point number, negative or positive, including 0
	- `Name` -> A combination of letter-characters, may include capital letter, underscores and digits

**Lists**

- `List` -> A list with `Value`'s
	- `NumberList` -> A list with `Number`'s
		- `IntList+` -> A list with `Int+`'s
		- `IntList` -> A list with `Int`'s
		- `FloatList` -> A list with `Float`'s
	- `NameList` -> A list with `Name`'s
