# All Instruments

The following methods apply to all the types of instruments: `synth`, `sample`, `loop`, `polySynth`, `polySample`, `midi` and `input`.

For instrument specific functions see below:

- [Synth](#synth)
- [Sample / Loop](#sample-and-loop)
- [polySynth](#polysynth)
- [polySample](#polysample) *MercuryPlayground only*
- [Midi](#midi)
- [Input](#input)
- [Modulator](#modulator) *Mercury4Max only*
<!-- - text to speech -->

## name

Set the name for this instrument. This can be any string of 2 or more characters. The `name` is used as a reference to the instrument when the `set` method is used to call methods for a specific instrument. The name is also used to generate an OSC message that is send out from Mercury to trigger external things in sync with the instrument.

**arguments**
- {Name} -> an instrument name (default=null)

```js
new synth saw name(bob)
	set bob gain(0.8) time(1/16)
new sample kick_909 name(alice)
	set alice gain(1.2) time(1/4)
```

```
// expected osc messages:
/bob 1
/alice 1
```

## group 

*MercuryPlayground only!*

Set one or more group-name(s) for this instrument. This can be any string of 3 or more characters. With the `group` you can apply a line of code to multiple instruments at the same time. The `group` is **not** like a mixing bus, so using for example `gain()` will overwrite the `gain()` function on the line of the instrument. If you use the `name()` function you have to make sure the name is set before the group is applied otherwise the reference won't work correctly.

**arguments**
- {Name} -> a group name used for multiple instruments (default=none)

```js
// the hihat is not included in the group so will 
// not get the gain(0.8) and fx(reverb 0.9 11)
new sample hat_909 time(1/8)

new sample kick_909 group(drums) time(1/4)
new sample snare_909 group(drums) time(1/2 1/4)
	set drums gain(0.8) fx(reverb 0.9 11)
```

## time 

Set the time interval in which a synth or sample is triggered. This can be an integer, float or expression. `1 = bar`, `1/4 = quarter-note`, `1/12  = 8th triplet`, `3/16 = 3-16th notes` etc. Similarly you can set an offset in the timing. The `time()` will start an internal counter for this instrument, incremented every time it is triggerd (based on the `beat()` method). The counter is used as an index to lookup values from other `list`'s provided as argument in methods for this instrument. Setting the first argument to `free` allows to use external triggering via osc messages. The trigger reacts when a value greater than `0` is received. When another instrument in the code has a `name()` that name can be used as osc-message input trigger for another instrument to synchronize the triggering.

Alias: `timing()`

**arguments**
- {Number/Division} -> the timing division or `free` (default=1/4)
- {Number/Division} -> timing offset or osc-message when `free` (optional, default=0)

```js
set tempo 130

new sample kick_909 name(kick)
	set kick time(1/4)

new synth saw name(syn)
	set syn time(1/2 3/16)

new sample snare_dnb name(snare)
	set snare time(free "/snareOSC/amplitude")

new sample kick_909 time(1/8) play(0.3) name(kick)
new synth saw note(0 0) time(free "/kick")
```

## play

Provide the beat function with a `list` consisting of ones and zeroes. For every time interval defined by the `time()` method, the next value in the list will be used. A one results in a trigger of the instrument and an increment of the internal counter. A zero results in no trigger. An optional second argument resets the internal instrument index after a certain amount of time in n-bars.

Alias: `beat() / rhythm()`

**arguments**
- {FloatList+/Float+} -> a rhythmic pattern of ones and zeroes to play (default=1)

```js
list aBeat [1 0 0 1 0 1 1 0 0]

new sample hat_909 name(ht)
	set ht time(1/16) play(aBeat 2)
```

Alternatively you can use floating-point values in a list which result in a probability that the instrument will play. Here 0 means 0% chance, 1=100% and 0.5 is 50%. Inspired by Nick Collins paper on [Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf).

```js
list aBeat [1 0.5 0.2 0.8 0.5]

new sample hat_909 name(ht)
	set ht time(1/16) play(aBeat 2)
new sample kick_909 time(1/4)
```

## ratchet

Add a ratcheting effect (doubling/tripling of hits) with a probability. A technique that introduces some variety in rhythm that originated with electronic music of Tangerine Dream. The first argument sets the probality a note will be repeated. The second argument sets the amount of repetitions within the time, effectively doubling, tripling or more.

**arguments**
- {Float+} -> probability of ratchet happening (default=0.1)
- {Int+/IntList+} -> amount of repetitions (default=2)

```js
new sample hat_909 time(1/8) ratchet(0.3 2)
```

```js
list rtc [2 3 2 4 8]
new sample hat_909 time(1/4) ratchet(1 rtc)
```

## timediv

*MercuryPlayground only*

Documentation to do...

## warp

*Mercury4Max only*

Warp a rhythm in more complex ways. More documentation to do...

## wait

*MercuryPlayground only*

This function is similar to the offset parameter in the `time()` method except that it allows you to set an additional waiting time (or delay) for an instrument in milliseconds. This function is useful to allign/synchronize instruments with external peripherals such as sending MIDI notes or OSC messages.

**arguments**

- {Int+/Division} -> specify the waiting time in milliseconds or division (default=null)

```js
new sample kick_909 time(1/4)
// the hihat plays 100ms later than the kick
new sample hat_909 time(1/4) wait(100)
```

<!-- Alias: `delay` -->

## shape

Set the envelope generator of a sound. Various modes are possible depending on the amount of arguments. The attack time is the fade-in for the sound, the release is the fade-out for the sound both in milliseconds. The sustain time holds the sound at a static volume for a while. If the sound is triggered before the end of the envelope, the envelope is canceled, faded to 0 in 1ms and starts over. You can specify the times in absolute values using integer/floating points (in ms) or in relative values using beat divisions.

Alias: `length() / duration() / envelope() / env()`

**arguments**

- {Number+/Division/NumberList} -> Attack time in ms or division (optional, default=2)
- {Number+/Division/NumberList} -> Decay time in ms or division (optional, default=0)
- {Number+/Division/NumberList} -> Release time in ms or division

```js
new synth saw shape(1500) time(1)
//=> default attack of 2 ms, sustain of 0 ms and a release of 1500 ms

new synth saw shape(1000 250) time(1)
//=> attack of 1000 ms, default sustain of 0 ms and a release of 250 ms

new synth saw shape(10 500 50) time(1)
//=> attack of 10 ms, sustain of 500 ms and a release of 50 ms
```

with division:

```js
set tempo 100

new synth saw shape(1/2) time(1)
//=> default release of 1/2 (about 250 ms at 120 bpm)

new synth saw shape(1/4 1/32) time(1)

new synth saw shape(1/64 1/8 1/16) time(1)
```

## gain

Set the volume for the instrument in floating-point amplitude. Where `1` is the normalized amplitude, `0.5` is the half softer (-6 dBFS) and `2` is twice as loud (+ 6dBFS). An optional second argument sets the sliding time to go to the next gain value in milliseconds.

Alias: `amp() / volume() / velocity()`

**arguments**
- {Float+} -> the (start) volume of the instrument (default=1)
- {Number+} -> the sliding time in division or ms (optional, default=0)
- {Bool} -> mute the instrument but still use named sends (default=0)
<!-- - {Float+} -> the end volume of the instrument to generate a ramp (optional, default=previous-gain-value) -->

```js
new sample snare_909 name(sn)
	set sn gain(0.8)
```

**Note:** When using the `midi` instrument the gain will be multiplied by `127` to construct a velocity message. A `gain(0.5)` therefore maps to `63` and a `gain(1)` to `127`

## pan

Set the panning position in floating-point for the sound in the stereo-image. `-1` is 100% left channel, `0` is center (both speakers), `1` is 100% right channel. Higher or lower values wrap between -1 and 1. Provide pan with the `random` argument to get a new random panning value every moment of the `time()` counter.

Alias: `panning()`

**arguments**
- {Float} -> the panning position between -1 and 1 (default=0)

```js
new sample clap_909 name(hand)
	set hand pan(random)
```

## fx

Apply an effect to the sound of the instrument to manipulate your sounds timbre in many ways. The first argument is always the `effectname`. The following arguments depend on the selected effect. See [FX Documentation](./04-fx.md) for more details and an up-to-date list of all the available effects for both Mercury4Max and the Mercury Playground.

Alias: `effect() / with_fx() / add_fx()`

**arguments**
- {Name} -> the effect name
- {Value+} -> any values based on effectname arguments

```js
new synth square name(bass)
	set bass fx(reverb 0.8 11)
```

# synth

The synth and polySynth instruments allow you to play synthesized sounds using a single cycle waveform. These waveforms are loaded in RAM and can be accessed by their filename (without the extension). The default waveforms are `sine`, `triangle`, `square` and `saw`.

- [How to load other waveforms into Mercury](./07-environment.md#sounds)
- [Full list of all the included waveforms](https://github.com/tmhglnd/mercury/blob/master/mercury_ide/media/README.md)

## note

Set the pitch for the instrument to play a note in a melody or chord. The note is specified as a 2-dimensional coordinate system, where the first argument is the semitone offset (can be positive or negative) and the second argument is the octave offset (can be positive or negative). The origin of the system, `note(0 0)`, corresponds by default with midi-pitch `36` or `C2`. Depending on the `set scale` the coordinate system will shift and result in a different pitch for the origin. A `note()` should therefore not be taken as an absolute value, but rather a relative direction where the melody is going to in relation to the scale and root. Detuning/pitchbending can be done by providing a floating-point note number. The value behind the decimal point is the amount of detuning from one semitone to the next. For example `7.5` results in `7` semitones (mapped to the scale if `set scale` is used) and then a `0.5` semitone is added (= 50 cents). Detuning is applied after mapping the integer semitone to a scale.

|`note(x y)`|-… |-3 |-2 |-1 |0     |1  |2  |3  |4  |5  |6  |7  |8  |9  |10 |11 |12   |13 |…  |
|---------|---|---|---|---|------|---|---|---|---|---|---|---|---|---|---|---|------|---|---|
|4        |…  |A# |B  |B# |C `84`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `96`|C# |…  |
|3        |…  |A# |B  |B# |C `72`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `84`|C# |…  |
|2        |…  |A# |B  |B# |C `60`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `72`|C# |…  |
|1        |…  |A# |B  |B# |C `48`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `60`|C# |…  |
|0        |…  |A# |B  |B# |C `36`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `48`|C# |…  |
|-1       |…  |A# |B  |B# |C `24`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `36`|C# |…  |
|-2       |…  |A# |B  |B# |C `12`|C# |D  |D# |E  |F  |F# |G  |G# |A  |A# |B  |C `24`|C# |…  |


**arguments**
- {Value/ListValue} -> positive or negative semitone note value or list, x-coordinate (default=0)
- {Value/ListValue} -> positive or negative octave value or list, y-coordinate (default=0)

```js
set scale major D
new synth sine note(2 2)
//=> results in midi-note 64 > F4
```

Also excepts lists to play a melody over time:

```js
set scale minor A
list mel [0 5 7 3 2 -2 0]
new synth sine note(mel 1) time(1/16)

```

Alias: `pitch()`

## useDetune

**REMOVED**

Detune is now done in the `note()` method by providing a floating-point note number. The value behind the decimal point is the amount of detuning from one semitone to the next. For example `7.5` results in `7` semitones (mapped to the scale if `set scale` is used) and then a `0.5` semitone is added (= 50 cents). Detuning is applied after mapping the integer semitone to a scale.

## slide

A portamento/sliding/gliding effect. This will make the synthesizers oscillators slowly slide from one frequency to the next one over a defined period in milliseconds or division. The sliding is logarithmically (meaning it wil slide from midi note to midi note linearly, and when converted to frequency slide logarithmically. This sounds slightly different then when sliding linearly between two frequencies)

Alias: `glide`, `portamento`

**arguments**
- {Number/Division} -> sliding time in milliseconds or division (default=50)

```js
list notes [0 7 3]
new synth saw note(notes 1) time(1/2) slide(1/8)
```

## super

Add multiple oscillators in unison with a detuning factor to create a *SuperSaw* effect. One oscillator will always be the base frequency of the `note()`, the others are tuned above and below in incremental steps based on the detuning factor. The first argument sets the amount of oscillators (minum of 1, default=1), the second argument sets the detuning factor in semi-tones, the third optional argument sets the oscillator type for the odd numbered oscillators.

Alias: `unison`

**arguments**
- {Int+} -> number of oscillators (default=1, maximum=64)
- {Float/FloatList} -> detuning factor in semi-tone, 12=octave
- {Name} -> the name of the odd numbered oscillators (optional, default=main oscillator)

```js
new synth saw note(0 1) shape(-1) super(5 0.031415)
```

```js
new synth saw note(0 1) shape(-1) super(11 0.0618 square) 
```

Detuning can be changed in time with a `list`

```js
list voices [3 5 9 21]
list detune [0.1 0.5 0.9 12.01 0.3]

new synth saw note(0 1) time(1/4) shape(-1) super(voices detune)
```

<!-- **backwards compatible with wave2()**

Using the previous syntax of `wave2()` now calls the `super()` method like so

```js
new synth saw note(0 1) wave2(square 0.998)
// is translated and equivalant to:
new synth saw note(0 1) super(2 -0.03 square)
``` -->

## sub

Add a second sinewave oscillator one octave lower than the note played for a sub frequency.

**arguments**
- {Float+} -> amplitude for the sub oscillator (default=0)

```js
new synth sine note(0 2) time(1/4) sub(0.8)
```

## wave2

**DEPRECATED, use super() instead**

Add a second oscillator to the synths sound. This can either be a sine, triangle, square or saw. The second argument sets a multiplication ratio for the second oscillators frequency.

**arguments**
- {Name} -> waveform to add as second wave
- {Float} -> tuning in ratio to note() frequency (default=1)
- {Float} -> tuning offset in Hertz (optional, default=0)

```js
new synth saw note(0 1) time(1/4) wave2(square 0.998)
```

Alias: `osc2()` `super`

## noise

Add a noise oscillator to the synth sound. The first argument is the amplitude (gain), the second argument is the "color" of the noise between 0 and 1 (1 = white noise, lower values give a more darker noise sound). When the modulation mode is turned on (with 1) the noise is modulated by the source of the oscillator (or oscillators if super and sub are used).

**arguments**
- {Float+} -> amplitude of the noise (default = 0)
- {Float+} -> color of the noise 0-1 (default = 0.8)
- {Bool} -> modulation mode (default = 0)

```js
new synth saw note(0 1) time(1/4) noise(0.3 0.8 1)
```

# Sample and Loop

The sample and loop instruments allow you to play sound-recordings and loops. These so called "samples" are loaded in RAM and can be accessed by their filename (without the extension). 

- [How to load other sounds into Mercury](./07-environment.md#sounds)
- [How to load sounds in the Mercury Playground](./01-global.md#samples)
- [Full list of all the included sounds](https://github.com/tmhglnd/mercury/blob/master/mercury_ide/media/README.md)

## speed

Set the playback speed for the sample, where 1 = original speed, 0.5 = half the speed and 2 = twice as fast. Adjusting the playback speed will change the pitch of the sample. A negative value will play the sample backwards starting at the end (or at the `offset()` position)

Alias: `rate()`

**arguments**
- {Number} -> playback speed (default=1)

```js
new sample choir time(5) speed(0.5)
new sample choir time(5) speed(-0.5)
set all fx(reverb 2 17)
```

## start

Set the start (the offset position of the playback) of the sample. 0 = start at the beginning, 0.5 = start midway in the sample. With long decaying samples the offset is very useful if playing the sounds backwards when using for example `speed(-1)`. 

Alias: `offset`

**arguments**
- {Float} -> the playback position between 0 and 1 (default=0)

```js
list positions randomFloat(8 0 0.5)

new sample choir time(1/16) start(positions)
```

## useNote

**REMOVED**

## note

<!-- *Mercury Playground only* -->

The `note` method allows you to tune the sample to a specific pitch instead of using the `speed()` function. The function works the same as the `note` function explained under the `synth`. Please look there for further information.

## tune

<!-- *Mercury Playground only* -->

Set the base note as a MIDI value for the sample to determine how the `note()` function changes the playback speed. For example if your sample was recorded as a `a4` then you will set tune to `69`. `note(0 2)` will be the same as the `tune()` value in the case of a scale set to have `c` as the root.

**arguments**
- {Number+} -> MIDI pitch as base for tuning (optional, default=60)

```js
set scale minor c

list notes [0 7 5 3]
// tune the kalimba to a3
new sample kalimba_a time(1/4) note(notes 2) tune(57)
```

## stretch

Stretch the entire sample to the length of a full bar. Useful for when working with beats that have to be looped. Stretching is the default when working with the `loop` instrument. This is basically a `new sample` with `stretch(1)`. Optionally you can turn timestrechting on with a second argument to preserve the original pitch of the sample. A third optional argument changes the mode of the stretching, choose from: basic, monophonic, rhythmic, general, extremestretch, efficient. The default is set to efficient.

**arguments**
- {Int} -> turn stretch to full bar on/off (default=0 for sample default=1 for loop)
- {Int} -> turn timestretching on when stretching to full bar, preservering the original pitch (default = 0)
- {Name} -> adjust the stretching mode (default=efficient)

```js
new sample chimes stretch(1 1 general) speed(-1)
```

### Stretching modes explained

*Mercury4Max only*

- `basic` : best option for real-time performance
- `monophonic` : best option for any monophonic source without ambience
- `rhythmic` : best option for drums and percussion when transient preservation is critical
- `general` : balances spectral integrity with transient preservaton
- `extremestretch` : optimized for stretching (slowing down) material, limited to a stretch factor between 0.5 and 4
- `effcient` : best option when CPU efficiency is critical

# polySynth

The polySynth functions the same as the synth in the sense that you choose a waveform, set a `note()`, add a `shape()`, etc. For explanation of those functions see above.

The extra feature of the polySynth is that it allows for overlapping notes to generate for example chords. Notes provided to the `note()` function as a 2-dimensional list will be played at the same time as a chord. By default there are 8 voices available at the same time. Voice stealing is `on` by default meaning if a new note is played while all voices are busy the oldest triggered note will be removed.

```js
// note the double [[ ]] to generate a 2d-list
list chord [ [ 0 4 5 7 8 10 12 ] ]

new polySynth sine note(chord 2) time(1/2) shape(1 1/4) 
```

## steal

If new notes are triggered while all voices are still in use they will not be played. This behaviour can be changed by setting the stealing to `on` or `1`.

**arguments**
- {Bool/Name} -> turn voice stealing `on` or `off` (optional, default=on)

```js
list notes spread(16 0 36)

new polySynth sine note(notes 2) time(1/16) shape(1 1/1) steal(off)
```

## voices

**not implemented yet**

## spread

Use the spread function to add little delays with optional randomness between every note from a chord, resulting in the chord sounding broken up in time.

**arguments**
- {Number+/Division} -> the delaytime between note triggers in ms or division (default=0)
- {Number+/Division} -> random delaytime offset added to the delaytime in ms or division (default=0)

```js
list notes [[0 3 7 11 12]]

new polySynth sine note(notes 2) shape(1 1/1) time(1/1) spread(150 50)
```

# polySample

*Mercury Playground only*

The polySample functions the same as the sample in the sense that you choose a sample file, set a `speed()`, add a `shape()`, etc. For explanation of those functions see `sample` above.

The extra feature of the polySample is that it allows for overlapping sounds. For example useful when generating chords. Notes provided to the `note()` function as a 2-dimensional list will be played at the same time as a chord. By default there are 8 voices available at the same time.

For voice-stealing see `steal` under `polySynth`. For setting voice-amount see `voices` under `polySynth`.

```js
set tempo 100
set scale dorian eb

list notes shuffle(spread(24))
new polySample piano_e time(1/16) note(notes 1) shape(1 1/2) steal(off) tune(64)
```

# Midi

The midi instrument allows you to send midi-note messages to other devices or virtual devices on your computer. To setup a basic midi instrument use:

```js

set midi getPorts
//=> prints the available devices to the console

new midi "AU DLS Synth 1" time(1/4) note(0 0) length(100) gain(0.8)
```

## note

Set the pitch for the instrument to play a note in a melody or chord. The note is specified as a 2-dimensional coordinate system, where the first argument is the semitone offset (can be positive or negative) and the second argument is the octave offset (can be positive or negative). The origin of the system, `note(0 0)`, corresponds by default with midi-pitch `36` or `C2`. Depending on the `set scale` the coordinate system will shift and result in a different pitch for the origin. A `note()` should therefore not be taken as an absolute value, but rather a relative direction where the melody is going to in relation to the scale and root. For a detailed table of the note coordinates see `note` under [synth and polySynth only](#synth-and-polysynth-only).

**arguments**
- {Value/RingValue} -> positive or negative semitone note value or list, x-coordinate (default=0)
- {Value/RingValue} -> positive or negative octave value or list, y-coordinate (default=0)

```js
set scale major D

new midi "AU DLS Synth 1" note(2 2)
//=> results in midi-note 64 > F4
```

Also excepts lists to play a melody over time:

```js
set scale minor A
list mel [0 5 7 3 2 -2 0]

new midi "AU DLS Synth 1" note(mel 1) time(1/16)
```

## length

Replaces the `shape()` function for Synth and Sample. Set the duration of the midi note for it to send the note-off message in milliseconds or division. If the instrument is triggered before the end of the duration, the note-off is canceled and a new note-off is send.

**arguments**

- {Number/Division} -> Duration time in ms or division

```js
new midi "AU DLS Synth 1" length(1500) time(1)
//=> duration of 1500 ms triggered once per bar
```

with division:

```js
set tempo 100

new midi "AU DLS Synth 1" length(1/2) time(1)
//=> duration of 1/2 (1200 ms at 100 bpm)
```

Alias: `duration()`

## out

Set the channel output for the midi-note to be send to. 

**arguments**

- {Number} -> Channel to send the midi-note to

```js
new midi "AU DLS Synth 1" note(7 2) out(1)
new midi "AU DLS Synth 1" note(0 0) out(2)
```

Alias: `channel()`

## chord

Turn the chord output (polyphony) on for a midi instrument. This allows you to use 2-dimensional lists where the 2nd dimension is used to generate chords. 

**arguments**

- {Bool} -> Turn chord output on/off

```js
list chords [[0 4 7] [2 5 9] [5 9 0]]

new midi "AU DLS Synth 1" note(chords 1) chord(on)
```

Alias: `poly`

## program

Send program change messages to the specified midi channel of the instrument. The channel number is based on the `out()` method (see above). The default channel `1` is used if no channel is selected. The program change value is an integer from `0` - `127` and can be sequenced as a list. If no value is provided there is no program change send. The value is **only** send when it changes based on the previous value. This is done because some midi devices react every time a program change is received (for example cutting of notes), even if the value stays the same.

**arguments**

- {Int+} -> Program change value 0-127 (default=off)

```js
list notes spread(5 0 12)
list changes [0 10 20]

new midi default note(notes 1) out(1) program(changes)
```

<!-- Alias: `pgm`, `pc` -->

## sync

Turn midiclock syncing on/off for an individual instrument and send it to the selected port/device from that instrument.

**arguments**

- {Bool} -> Turn syncing on/off

```js
new midi "aMidiDevice" sync(on)
new midi "otherDevice" sync(off)
```

Alias: `clock()`

## change

Send control change messages to the midi device. This function can have multiple calls in the same instrument, every call can be a different control number. The first argument is the control number, the second argument is the controller value or a list of controller values.

**arguments**

- {Int+} -> Midi controller number between 0-127
- {Int+/RingInt+} -> Midi controller value between 0-127

```js
list ccValues [10 20 30 40 50]

new midi "device" change(13 100) change(21 ccValues)
```

Alias: `cc`

<!-- 
# Text to Speech (mac-only)

An experimental text-to-speech instrument is added. Using the Mac terminal speech capabilities with the help of the `aka.speech` object developed by Masayuki Akamatsu.

```js
new voice Alex speak("Hello world!") time(2)

new voice Samantha speak("Hi Alex!") time(2 1)
``` -->

# Input

Use the input from the soundcard (ADC) as the source for an instrument. The sound can be modified by all the various `fx()`. The volume can be adjusted with `gain()`. An envelope can also be applied on the sound with `shape()` and this envelope can be triggered with `time()` just as with the regular instruments `sample`, `synth`, etc. Use the words `in1`, `in2`, ..., `inx` to choose the input source. 

*In the browser version you will need to give permission to use the microphone and afterwards you might need to refresh the page*

**arguments**
- {Name} -> `default` or the input channel number as a string `inX`

```js
// use the default input, in most cases channel 1
new input default gain(1)

// use a specific channel
new input in3 gain(0.9) 

// add functions like shape, time and fx
new input in4 gain(0.9) time(1/16) shape(1 100) fx(reverb) fx(distort)
```

# Modulator

The modulator allows you to send a modulation signal as an argument to parameters from functions of other instruments. These parameters are continuously modulated at a specific rate with a specific waveform. The modulation rate is independent from the instruments `time()` (in comparison when using a list as an argument). It is also possible to send the modulation signal directly out to the connected soundcard on a specific channel. This can for example be used for cv modulations.

**arguments**
- {Name} -> waveform type: `sine`/`sin`, `sawUp`/`phasor`, `sawDown`/`saw`, `square`/`rect`, `triangle`/`tri`, `random`/`rand`, `randomLine`/`randL`, `trigger`/`gate`

```js
new modulator <waveform-type> name(<name>) range(<lo> <hi> <exp>) time(<division>) out(<channel>)
```

## modulator name

Set the name for the modulator, this name can be used as argument in the functions of an instrument like `synth` and `sample`

**arguments**
- {Name} -> the modulator name for reference in other functions

```js
// set the name to myModulator
new modulator sine name(myModulator)
// the synth uses the modulator in the gain function
new synth saw gain(myModulator)
```

## modulator time

Set the modulation speed in division. The default is `1/1` (one period per bar).

**arguments**
- {Division} -> The time interval for one period of the modulation waveform (optional, default=1/1)
- {Division} -> The time offset for the modulation (optional, default=0)

```js
// modulate a sinewave at a period of one per 4 bars
new modulator sine time(4/1)
```

## modulator range

Set the modulation range between a low and high value with an option exponential value. The default range is 0 to 1.

**arguments**
- {Number} -> The low output range (optional, default=0)
- {Number} -> The high output range (optional, default=1)
- {Number} -> The scaling exponent (optional, default=1)

```js
// set the range from 200 to 5000, for example to modulate a filter cutoff
new modulator sine range(200 5000)

// include the third argument to set the exponential in the scaling
new modulator sine range(200 5000 3)
```

## modulator out

**Warning: be careful when sending DC signals with large ranges to your DAC, this could damage your speakers if you choose the wrong output!**

Set the output channel from your connected soundcard to send the modulation signal directly to. The default is 0 (no output to DAC). Currently the maximum number of channels that can be used is 16. If the modulation signal is only used for direct output it is not necessary to also `name()` the modulator.

**arguments**
- {Number+} -> The channel number from 1 till number of outputs available, maximum of 16 (default=0)

```js
// send a sinewave modulator signal to DAC channel 3
new modulator sine range(-1 1) out(3)
```

## modulator trigger

When using the mode `trigger`/`gate` the modulator functions like the sequencer in the instruments. Meaning it is also possible to use `play()` to add a rhythm list, use `ratchet()` to add a list of timing subdivisions with probability, use `warp()` to add a list of time warpings.

**arguments**
- {Name} -> `trigger`/`gate` sets the intrument to use the stepsequencer

```js
// generate a euclidean rhythm and use it in the trigger
list rtm euclid(16 11)
new modulator trigger time(1/8) play(rtm) ratchet(0.1 2)
```

## modulator hold

The hold function transforms the `trigger` into a gate that goes open and closes after a certain amount of time. The time value can be either `ms` or a `division`. If the hold time is longer than the time interval between triggers the gate stays open. A hold of `0` results in the click from the default trigger.

**arguments**
- {Number+} -> hold time in ms or division (default=0)

```js
// trigger every 8th note, and leave the gate open for the length of 50ms
new modulator trigger time(1/8) hold(50)

// trigger every 8th note, and leave the gate open for the length of a 16th
new modulator trigger time(1/8) hold(1/16)
```