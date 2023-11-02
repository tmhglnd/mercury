# 📖 Mercury Function Reference

**Disclaimer: This documentation is not entirely finished and will subject to changes. If you like to contribute or find errors, please report them in the issues or correct them yourself and send a pull request**

**Disclaimer: There are differences between the Mercury Browser version and the Mercury for Max8 version. Please be aware that this may be the reason some functions are not working**

## Code Documentation

- [Actions](./00-general.md)
	- [new](./00-general.md#new)
	- [list](./00-general.md#list)
	- [set](./00-general.md#set)
	- [print](./00-general.md#print)
	- [silence](./00-general.md#silence)
	- [audio](./00-general.md#audio)  *(Mercury4Max only)*

- [Global (set)](./01-global.md)
	- [tempo](./01-global.md#tempo)
	- [scale](./01-global.md#scale)
	- [scalar](./01-global.md#scalar)  *(Mercury4Max only)*
	- [randomSeed](./01-global.md#randomseed)
	- [volume](./01-global.md#volume)
	- [highPass](./01-global.md#highpass) 
	- [lowPass](./01-global.md#lowpass)
	- [osc](./01-global.md#osc)  *(Mercury4Max only)*
	- [midi](./01-global.md#midi-and-midiclock)  *(Mercury4Max only)*
	- [click](./01-global.md#click)  *(Mercury4Max only)*

- [Synth/Sample/Midi (new)](./02-instrument.md)
	- All instruments (except midi)
		- [name](./02-instrument.md#name)
		- [group](./02-instrument.md#group)
		- [time](./02-instrument.md#time)
		- [play](./02-instrument.md#play)
		- [shape](./02-instrument.md#shape)
		- [gain](./02-instrument.md#gain)
		- [pan](./02-instrument.md#pan)
		- [fx](./02-instrument.md#fx)
	- Synth / polySynth
		- [note](./02-instrument.md#note)
		- [useDetune](./02-instrument.md#usedetune) *deprecated*
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
	- Input
		- [input](./02-instrument.md#input)
	- Modulator *(Mercury4Max only)*
		- [name](./02-instrument.md#modulator-name)
		- [time](./02-instrument.md#modulator-time)
		- [range](./02-instrument.mdmodulator-range)

- [Emitter (osc)](./03-emitter.md) *(Mercury4Max only)*
	- [osc](./03-emitter.md#osc)
	- [name](./03-emitter.md#name)
	- [address](./03-emitter.md#address)

- [Sound Effects (fx)](./04-fx.md)
	- [freeze](./04-fx.md#freeze)  *(Mercury4Max only)*
	- [shift](./04-fx.md#shift)
	- [triggerFilter](./04-fx.md#envFilter)
	- [kink](./04-fx.md#kink)  *(Mercury4Max only)*
	- [drive / distort](./04-fx.md#distort)
	- [filter](./04-fx.md#filter) 
	- [degrade / chip](./04-fx.md#degrade)
	- [comb](./04-fx.md#comb) \*
	- [squash](./04-fx.md#squash)
	- [double / chorus](./04-fx.md#double--chorus) *(Mercury4Max only)*
	- [hall / reverb](./04-fx.md#reverb)
	- [lfo](./04-fx.md#lfo)
	- [echo / delay](./04-fx.md#delay)

- [List functions](./05-ring.md)
	- [Generative Methods](./05-ring.md#generative-methods)
		- [spread / spreadFloat](./05-ring.md#spread-spreadfloat)
		- [spreadInclusive / spreadInclusiveFloat](./05-ring.md#spreadInclusive-spreadInclusiveFloat)
		- [fill](./05-ring.md#fill)
		- [sine / cosine](./05-ring.md#sine-cosine)
		- [sineFloat / cosineFloat](./05-ring.md#sineFloat-cosineFloat)
		- [saw / sawFloat](./05-ring.md#saw-sawFloat)
		- [square / squareFloat](./05-ring.md#square-squareFloat)
	- [Algorithmic Methods](./05-ring.md#algorithmic-methods)
		- [euclidean](./05-ring.md#euclidean)
		- [hexBeat](./05-ring.md#hexbeat)
		- [fibonacci](./05-ring.md#fibonacci)
		- [pisano](./05-ring.md#pisano)
		- [pell](./05-ring.md#pell)
		- [lucas](./05-ring.md#lucas)
		- [threeFibonacci](./05-ring.md#threefibonacci)
	- [Stochastic Methods](./05-ring.md#stochastic-methods)
		- [randomSeed](./05-ring.md#randomseed)
		- [random](./05-ring.md#random)
		- [randomFloat](./05-ring.md#randomfloat)
		- [drunk](./05-ring.md#drunk)
		- [drunkFloat](./05-ring.md#drunkfloat)
		- [urn](./05-ring.md#urn)
		- [coin](./05-ring.md#coin)
		- [dice](./05-ring.md#dice)
		- [clave](./05-ring.md#clave)
		- [twelveTone](./05-ring.md#twelvetone)
		- [choose](./05-ring.md#choose)
		- [pick](./05-ring.md#pick)
		- [shuffle](./05-ring.md#shuffle)
		- [expand](./05-ring.md#expand)
	- [Transformative Methods](./05-ring.md#transformative-methods)
		- [clone](./05-ring.md#clone)
		- [join](./05-ring.md#combine)
		- [copy](./05-ring.md#copy)
		- [pad](./05-ring.md#pad)
		- [every](./05-ring.md#every)
		- [flat](./05-ring.md#flat)
		- [invert](./05-ring.md#invert)
		- [lace](./05-ring.md#lace)
		- [lookup](./05-ring.md#lookup)
		- [merge](./05-ring.md#merge)
		- [palindrome](./05-ring.md#palindrome)
		- [repeat](./05-ring.md#repeat)
		- [reverse](./05-ring.md#reverse)
		- [rotate](./05-ring.md#rotate)
		- [slice](./05-ring.md#slice)
		- [split](./05-ring.md#split)
		- [cut](./05-ring.md#cut)
		- [spray](./05-ring.md#spray)
		- [stretch](./05-ring.md#stretch)
		- [unique](./05-ring.md#unique)
	- [Translate Methods](./05-ring.md#translate-methods)
		- midiToNote
		- midiToFreq
		- noteToMidi
		- noteToFreq
		- freqToMidi
		- freqToMidi
		- freqToNote
		- relativeToMidi
		- relativeToFreq
		- chromaToRelative 
		- ratioToCent
		- chordsFromNumerals
		- chordsFromNames
		- [divisionToMs](./05-ring.md#divisiontoms)
		- divisionToRatio
		- ratioToMs
		- scaleNames
		- toScale
	- [Utility Methods](./05-ring.md#utility-methods)
		- [wrap](./05-ring.md#wrap)
		- [clip](./05-ring.md#clip)
		- [fold](./05-ring.md#fold)
		- [map](./05-ring.md#map)
		- [mod](./05-ring.md#mod)
		- [add](./05-ring.md#add)
		- [subtract](./05-ring.md#subtract)
		- [multiply](./05-ring.md#multiply)
		- [divide](./05-ring.md#divide)
		- [normalize](./05-ring.md#normalize)


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
