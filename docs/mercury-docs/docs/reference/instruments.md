---
sidebar_position: 3
---

# Instrument Functions

An instrument is the main sound or sequencing source in Mercury. Instruments can produce sounds natively in Mercury by means of synthesis or sampling, but can also send out MIDI or OSC-messages to trigger external devices or plugins, and are able to take input from for example your microphone. The following functions apply to all the types of instruments such as `synth`, `sample`, `loop`, `polySynth`, `polySample`, `midi`, `osc` and `input`.

For detailed explanation of the syntax see: [Syntax](syntax) and [`list`](actions#list) under [Actions](actions).

**Available instruments:**

- [`synth`](#synth)
- [`sample`](#sample)
- [`loop`](#loop)
- [`polySynth`](#polysynth)
- [`polySample`](#polysample) *MercuryPlayground only*
- [`input`](#input)
- [`midi`](#midi)
- [`osc`](#osc)
- [`modulator`](#modulator) *Mercury4Max only*
<!-- - [`emitter`](#emitter) -->

## All Instruments

The following functions apply to all instruments.

### name

Set the `name` for this instrument. This can be any string of 3 or more characters. The `name` is used as a reference to the instrument when the `set` action is used to call functions for a specific instrument. The name is also used to generate an OSC-message that is send out from Mercury to trigger external things in sync with the instrument.

**arguments**
- `Name` -> an instrument name (default=random character string)

```js
new synth saw name(bob)
    set bob gain(0.8) time(1/16)

new sample kick_909 name(alice)
    set alice gain(1.2) time(1/4)
```

```js title="expected osc messages:"
/bob 1
/alice 1
```

### group 

:::warning Currently (and hopefully temporarily) not working<!-- MercuryPlayground only! -->
:::

Set one or more `group-name`(s) for this instrument. This can be any string of 3 or more characters. With the `group` you can apply a line of code to multiple instruments at the same time. The `group` is **not** like a mixing bus, so using for example `gain()` will overwrite the `gain()` function on the line of the instrument. If you use the `name()` function you have to make sure the name is set before the group is applied otherwise the reference won't work correctly.

**arguments**
- `Name` -> a group name used for multiple instruments (default=none)

```js
// the hihat is not included in the group so will 
// not get the gain(0.8) and fx(reverb 0.9 11)
new sample hat_909 time(1/8)

new sample kick_909 group(drums) time(1/4)
new sample snare_909 group(drums) time(1/2 1/4)
    set drums gain(0.8) fx(reverb 0.9 11)
```

### time 

Set the time interval at which the internal clock for an instrument runs and the synth or sample is triggered. This can be an `integer`, `float` or `fraction`. `1` = 1measure, `1/4` = quarter-note, `1/12` = 8th triplet, `3/16` = 3-16th notes, etc. Similarly you can set an offset in the timing. The `time()` will start an internal counter for this instrument, incremented every time it is triggerd (based on the `play()` function). The counter is used as an index to lookup values from other `list` provided as argument in functions for this instrument. 

Setting the first argument to `free` allows the use of external triggering via OSC-messages. The trigger reacts when a value greater than `0` is received. When another instrument in the code has a `name()`, that name can be used as OSC-message trigger for another instrument to synchronize them.

**arguments**
- `Number/Fraction` -> the timing fraction or `free` (default=1/4)
- `Number/Fraction` -> timing offset or osc-message when `free` (optional, default=0)

```js
set tempo 130

new sample kick_909 time(1/4)
new synth saw time(1/2 3/16)
```
```js title="external trigger"
new sample snare_dnb time(free '/snareOSC/amplitude')
```

```js title="triggering from other instrument"
new sample kick_909 time(3/16) name(kick)
new synth saw time(free '/kick')
```

:::warning You can not (yet) use `list`s to modulate the `time()` parameters
:::

<!-- **Alias**: `timing()` -->

### once

With once you can disable the looping mode of an instrument being triggered for every `time()` interval. When the code is evaluated the instrument will only trigger `1` time and stop after that. It will always trigger once every time the code is evaluated, so if you like the instrument to not play anymore after that you can either set `gain(0)` or comment `//` it.

**arguments**
- `Bool` -> enable triggering the instrument once (default=off)

```js
new sample gong_lo time(2/1) once(on)
// a sample for reference in time
new sample tabla_hi time(1/4)
```

```js title="trigger once on a bar multiple of 2 with offset of 7/8"
new sample harp_down once(on) time(2/1 7/8)
// a sample for reference in time
new sample hat_808 time(1/4)
```

### play

Provide the play function with a `list` containing 1's and 0's. For every time interval defined by the `time()` function, the next value in the list is checked. A one results in a trigger of the instrument and an increment of the internal counter. A zero results in no trigger. An optional second argument resets the internal instrument index after a certain amount of time in `fraction`.

**arguments**
- `Float+(List)` -> a rhythmic pattern of ones and zeroes to play (default=1)
- `Number/Fraction` -> reset internal time() counter after specified time (optional, default=off)

```js
list hatBeat [1 0 0 1 0 1 1 0 0]

new sample hat_909 time(1/16) play(hatBeat)
```

Alternatively you can use floating-point values in a list which result in a probability that the instrument will play. Here 0 means 0% chance, 1=100% and 0.5 is 50%. Inspired by Nick Collins paper on [Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf).

```js title="using probabilities"
list hatBeat [1 0.5 0.2 0.8 0.5]

new sample hat_909 time(1/16) play(hatBeat 2)
new sample kick_909 time(1/4)
```

Alias: `beat()`

### shape

Set the shape generator of a sound (in synthesis also called envelope). The shape is the trajectory of volume over time on the sound (eg. fade-in, fade-out). Various modes are possible depending on the amount of arguments. The attack time is the fade-in for the sound, the release is the fade-out for the sound, both in milliseconds or `fraction`. The sustain time holds the sound at a static volume for a while. If the sound is triggered before the end of the envelope, the envelope is canceled, faded to 0 in 1ms and retriggered (in the case of monophonic instruments). You can specify the times in absolute values using integer/floating points (in ms) or in relative values using beat fractions.

**arguments**

- `Number+(List)/Fraction(List)` -> Attack time in ms or fraction (optional, default=2)
- `Number+(List)/Fraction(List)` -> Decay time in ms or fraction (optional, default=0)
- `Number+(List)/Fraction(List)` -> Release time in ms or fraction

```js
new synth saw shape(1500)
// default attack of 2 ms, sustain of 0 ms and a release of 1500 ms

new synth saw shape(1000 250)
// attack of 1000 ms, default sustain of 0 ms and a release of 250 ms

new synth saw shape(10 500 50)
// attack of 10 ms, sustain of 500 ms and a release of 50 ms
```

```js title="shape with fractions"
set tempo 100

new synth saw shape(1/2)
// default release of 1/2 (about 250 ms at 120 bpm)

new synth saw shape(1/4 1/32)

new synth saw shape(1/64 1/8 1/16)
```

```js title="modulate duration with a list"
list durs [50 200 500]
new synth saw shape(durs)
```

Alias: `length()`, `envelope()`

<!-- Alias: `length() / duration() / envelope() / env()` -->

### gain

Set the volume for the instrument in floating-point amplitude. Where `1` is the default amplitude of the sample or synth, `0.5` is the half louder (-6 dB) and `2` is twice as loud (+ 6dB). An optional second argument sets the sliding time to go to the next gain value in milliseconds or `fraction`.

**arguments**
- `Float+(List)` -> the (start) volume of the instrument (default=1)
- `Number+(List)` -> the sliding time in fraction or ms (optional, default=0)
- `Bool` -> mute the instrument but still use named sends (default=0) *Mercury4Max only*
<!-- - `Float+` -> the end volume of the instrument to generate a ramp (optional, default=previous-gain-value) -->

```js
new sample snare_909 gain(0.8)
```

```js title="modulate gain with a list"
list gains [0 0.5 0.2 0.9]
new synth saw gain(gains 500) time(1/1)
// ramps between gain values over 500ms every trigger 1/1
```

:::info Important for midi
When using the `midi` instrument the gain will be multiplied by `127` to create a velocity message. `gain(0.5)` therefore maps to `63` and `gain(1)` to `127`
:::

Alias: `amp()`, `volume()`, `velocity()`

### pan

Set the panning position in floating-point for the sound in the stereo-image. `-1` is 100% left channel, `0` is center (both speakers), `1` is 100% right channel. Higher or lower values wrap between `-1` and `1`. Provide pan with the `random` argument to get a new random panning value every trigger of the instrument.

**arguments**
- `Float` -> the panning position between -1 and 1 (default=0)

```js
new synth saw pan(-1)
new synth square pan(1)
// two synths hard-panned left and right

new sample clap_909 pan(random) time(1/8)
// random panning every trigger
```

```js title="modulate panning with a list
list positions [-1 0 1 0 1 -1 -1]
new sample hat_808 time(1/16) pan(positions)
```

Alias: `panning()`

:::note Multi-speaker output is not (yet) supported
:::

### effect

Add an effect to the sound of the instrument to manipulate the sounds timbre in different ways. The first argument is always the `effect-name`. The arguments that follow depend on the selected effect. `fx()` can be used as an alias to reduce some typing. See [Effects](./effects.md) for more details and an up-to-date list of all the available effects for both *Mercury4Max* and the *MercuryPlayground*.

**arguments**
- `Name` -> the effect name
- `Value+/List+` -> values or lists depending on effectname arguments order (optional)

```js
new synth square effect(distort) effect(reverb)
```

Alias: `fx()`, <!-- `add_fx()` `with_fx()`-->

**static vs. dynamic effect-chains**

The Mercury4Max version has a static effects-chain. This means the order in the effects under the hood is fixed. The order is documented under [Effects](./effects.md). Because of this there is:

- No option to change the order of effects with the code
- No option to use effects multiple times in one instrument

```js title="static fx-chain"
new synth saw fx(reverb) fx(filter low 2000) fx(distort) fx(filter low 300)
// filter and distortion are fixed before reverb in the chain, the order of 
// the code doesn't matter. There is only one filter in the chain, the first 
// filter is therefore overwritten by the other
```

The MercuryPlayground version has a dynamic effects-chain. This means the order in the effects is determined by how you type the code. Because of this there is:

- Decide the order of effects by the order of the code you type
- Use effects multiple times on one instrument

```js title="dynamic fx-chain"
new synth saw fx(reverb) fx(filter low 2000) fx(distort) fx(filter low 300)
// the reverb will be filtered, then distorted and then filtered again
// the resulting sound is filtered twice
```

:::info
There are differences in sound between the *Mercury4Max* and *MercuryPlayground* versions. Parameters may need some tweaking when you port from one environment to the other.
:::

:::warning
Not all effects from *Mercury4Max* are available in the *MercuryPlayground* because some are in the process of being ported, and some are sadly not as easy to implement with Web Audio.
:::

### ratchet

:::warning Mercury4Max only
:::

Add a ratcheting effect (doubling/tripling/quadrupling of hits) with a probability. A technique that introduces some variety in rhythm that originated with electronic music from groups such as Tangerine Dream. The first argument sets the probability a note will be repeated. The second argument sets the amount of repetitions within the time, effectively doubling, tripling or more.

**arguments**
- `Float+` -> probability of ratchet happening (default=0.1)
- `Int+/IntList+` -> amount of repetitions (default=2)

```js
new sample hat_909 time(1/8) ratchet(0.3 2)
```

```js title="using a ratchet list"
list rtc [2 3 2 4 8]
new sample hat_909 time(1/4) ratchet(1 rtc)
```

### timediv

:::warning Mercuryplayground only
:::

Add subdivisions to `time()`. Documentation to do...

```js
list div [1 2 3 4]
new sample hat_808 time(1/4) timediv(div)
```

### warp

:::warning Mercury4Max only
:::

Warp `time()` in a more complex way. Documentation to do...

```js
list warp [1 2 3 4]
new sample hat_808 time(1/1) warp(warp)
```

### wait

:::warning MercuryPlayground only
:::

This function is similar to the offset parameter in the `time()` function except that it allows you to set an additional waiting time (or delay) for an instrument in milliseconds. This function is useful to align/synchronize instruments with external peripherals such as sending MIDI notes or OSC messages.

**arguments**

- `Int+/Fraction` -> specify the waiting time in milliseconds or fraction (default=null)

```js
new sample kick_909 time(1/4)
// the hihat plays 100ms later than the kick
new sample hat_909 time(1/4) wait(100)
```

<!-- Alias: `delay` -->

## synth

The `synth` and `polySynth` instruments allow you to play synthesized sounds using a single cycle waveform. These waveforms are loaded in memory and can be accessed by their filename (without the extension). The default waveforms are `sine`, `triangle`, `square` and `saw`.

```js
new synth <waveform>
```

:::note
The waveforms in MercuryPlayground are currently not created with single-cycle soundfiles but via WebAudio's `PeriodicWave`, constructing a waveform from a Fourier Series.
:::

### note

Set the pitch for the instrument to play a note in a melody or chord. The note is specified as a 2-dimensional coordinate system, where the first argument is the semitone offset (positive or negative) and the second argument is the octave offset (positive or negative). 

The origin of the system, `note(0 0)`, corresponds by default with midi-pitch `36` or `C2`. Depending on the `set scale` the coordinate system will shift and result in a different pitch for the origin. A `note()` should therefore not be taken as an absolute value, but rather a relative direction where the melody is going to in relation to the scale and root. 

Detuning/pitchbending can be done by providing a `float` note number. The value behind the decimal point is the amount of detuning from one semitone to the next. For example `7.5` results in `7` semitones (and mapped to `scale` if used) and then a `0.5` semitone is added (= 50 cents). Detuning is applied after mapping the integer semitone to a scale.

The mapping of the notes is as follows with `set scale chromatic c` (default)

|`note(x y)`|...|-1 |0     |1  |2  |3  |4  |...|9  |10 |11 |12    |13 |...|
|-----------|---|---|------|---|---|---|---|---|---|---|---|------|---|---|
|3          |...|B# |C `72`|C# |D  |D# |E  |...|A  |A# |B  |C `84`|C# |...|
|2          |...|B# |C `60`|C# |D  |D# |E  |...|A  |A# |B  |C `72`|C# |...|
|1          |...|B# |C `48`|C# |D  |D# |E  |...|A  |A# |B  |C `60`|C# |...|
|0          |...|B# |C `36`|C# |D  |D# |E  |...|A  |A# |B  |C `48`|C# |...|
|-1         |...|B# |C `24`|C# |D  |D# |E  |...|A  |A# |B  |C `36`|C# |...|

**arguments**
- `Number(List)` -> positive or negative semitone note value or list, x-coordinate (default=0)
- `Number(List)` -> positive or negative octave value or list, y-coordinate (default=0)

```js
set scale major d
new synth sine note(2 2)
//=> results in midi-note 64 > F4
```

```js title="play a melody with lists"
set scale minor A

list mel [0 5 7 3 2 -2 0]
list oct [0 1 2]
new synth sine note(mel oct) time(1/16)
```

<!-- Alias: `pitch()` -->

<!-- ### useDetune

:::warning Removed
Detune is now combined with the `note()` function by providing a `float` note number. The value behind the decimal point is the amount of detuning.
::: -->

### slide

A portamento/sliding/gliding effect. This will make the synthesizers' oscillator slowly slide from the current frequency to the new played one over a defined period of `number` in milliseconds or `fraction`. The sliding is logarithmically (meaning it will slide from midi-note to midi-note linearly, but after conversion to frequency slides logarithmically. This sounds slightly different from sliding linearly between frequencies).

**arguments**
- `Number+/Fraction(List)` -> sliding time in milliseconds or fraction (default=50)

```js
list notes [0 7 3]
new synth saw note(notes 1) time(1/2) slide(1/8)
```

Alias: `glide()`, `portamento()`

### super

Add multiple oscillators in unison with a detuning factor to create a *SuperSaw* effect. One oscillator will always be the base frequency of the `note()`, the others are tuned above and below in incremental steps based on the detuning factor. The first argument sets the amount of oscillators (minum of 1, default=1), the second argument sets the detuning factor in semi-tones, the third optional argument sets the oscillator type for the odd numbered oscillators.

**arguments**
- `Int+(List)` -> number of oscillators (default=1, maximum=64)
- `Float+(List)` -> detuning factor in semi-tone, 12=octave
- `Name` -> the name of the odd numbered oscillators (optional, default=main oscillator) *Mercury4Max only*

```js
new synth saw super(5 0.031415)
```

```js
new synth saw super(11 0.0618 square) 
```

```js title="modulate detuning with a list"
list voices [3 5 9 21]
list detune [0.1 0.5 0.9 12.01 0.3]

new synth saw time(1/4) shape(-1) super(voices detune)
```

Alias: `unison()`

<!-- **backwards compatible with wave2()**

Using the previous syntax of `wave2()` now calls the `super()` function like so

```js
new synth saw note(0 1) wave2(square 0.998)
// is translated and equivalant to:
new synth saw note(0 1) super(2 -0.03 square)
``` -->

### wave2

:::warning REMOVED
use [super()](#super) instead
:::

<!-- Add a second oscillator to the synths sound. This can either be a sine, triangle, square or saw. The second argument sets a multiplication ratio for the second oscillators frequency.

**arguments**
- `Name` -> waveform to add as second wave
- `Float` -> tuning in ratio to note() frequency (default=1)
- `Float` -> tuning offset in Hertz (optional, default=0)

```js
new synth saw note(0 1) time(1/4) wave2(square 0.998)
```

Alias: `osc2()` `super` -->

### sub

:::warning Mercury4Max only
:::

Add a second sinewave oscillator to the synth. The oscillator is tuned one octave lower than the `note()` played to create a sub frequency.

**arguments**
- `Float+(List)` -> amplitude for the sub oscillator (default=off)

```js
new synth sine note(5 1) sub(0.8)
```

### noise

:::warning Mercury4Max only
:::

Add a noise oscillator to the synth sound. The first argument is the *amplitude* (gain), the second argument is the *"color"* of the noise between 0 and 1 (1 = white noise, lower values give a more darker/downsampled noise sound). When the modulation mode is turned on (with 1) the noise is modulated by the source of the oscillator (or oscillators if `super()` and `sub()` are used).

**arguments**
- `Float+(List)` -> amplitude of the noise (default=0)
- `Float+(List)` -> color of the noise 0-1 (default=0.8)
- `Bool(List)` -> modulation mode (default=0)

```js
new synth saw note(0 1) noise(0.3 0.8 1)
```

## sample

The sample instrument allows you to play sound-recordings and loops. These so called "samples" are loaded in memory and can be accessed by their filename (without the extension).

```js
new sample <sample-name>
```

- [Load sounds in Mercury4Max](./../usage/mercury4max.md#sounds)
- [Load sounds in MercuryPlayground](./../usage/mercury-playground.md#add-sounds)
- [Full list of all the included sounds](./../usage/sounds.md)

### speed

Set the playback speed for the sample, where 1 = original speed, 0.5 = half the speed and 2 = twice as fast. Adjusting the playback speed will change the pitch of the sample. A negative value will play the sample backwards starting at the end (or at the `start()` position)

**arguments**
- `Float(List)` -> playback speed (default=1)

```js
new sample choir time(5) speed(0.5)
new sample choir time(5) speed(-0.3)

set all fx(reverb 2 17)
```

Alias: `rate()`

:::warning Reversed speed is not supported (yet) in the MercuryPlayground
:::

### start

Set the start position (the offset position of the playback) of the sample. 0 = start at the beginning, 0.5 = start midway in the sample. With long decaying samples the offset is very useful if playing the sounds backwards when using for example `speed(-1)`. 

**arguments**
- `Float+(List)` -> the playback position between 0 and 1 (default=0)

```js
list positions randomFloat(8 0 0.5)

new sample choir time(1/16) start(positions)
```

Alias: `offset()`

<!-- ### useNote

:::warning REMOVED
use [`note()`](#note-1) instead.
::: -->

### note

<!-- *Mercury Playground only* -->

The `note` function allows you to tune the sample to a specific pitch. This is easier than trying to set the playback speed with the `speed()` function if you need to pitch the sample for melodic content. The function works the same as the `note` function explained under the `synth`. Please see [`note()`](#note) for further information.

```js
list notes [0 7 5 3]
new sample xylo_c4 time(1/8) note(notes 1)
```

### tune

<!-- *Mercury Playground only* -->

Set the base note midi value for the sample to determine how the `note()` function changes the playback speed in relation to this note. For example if your sample was recorded as an `a4` then you will set tune to `69` (midi value of `a4`). `note(0 2)` is the same as the `tune()` value in the case of a scale set to have `c` as the root.

**arguments**
- `Number+` -> midi pitch as base for tuning (optional, default=60)

```js
set scale minor c

list notes [0 7 5 3]
// tune the kalimba to a3
new sample kalimba_a time(1/4) note(notes 2) tune(57)
```

### stretch

Stretch the entire sample to the length of a full bar. Useful for when working with beats that have to be looped. Stretching is the default when working with the `loop` instrument. This is the same as a `new sample stretch(1)`. Optionally you can turn timestretching on with a second argument to preserve the original pitch of the sample. A third optional argument changes the mode of the stretching, choose from: basic, monophonic, rhythmic, general, extremestretch, efficient. The default is set to `efficient`.

**arguments**
- `Bool` -> turn stretch to full bar on/off (default=0 for sample default=1 for loop)
- `Bool` -> turn timestretching on when stretching to full bar, preservering the original pitch (default = 0)
- `Name` -> adjust the stretching mode (default=efficient)

```js
new sample chimes stretch(1 1 general) speed(-1)
```

:::tip
If your `loop` is longer than `1` bar use `speed()` to decrease the playback speed by `1 / n-bars`. Set `time()` to the bar amounts.

```js
new loop loopOfFourBars time(4/1) speed(0.25)
```
:::

:::warning Timestretching is only supported in Mercury4Max
:::

**Stretching modes explained**

- `basic` : best option for real-time performance
- `monophonic` : best option for any monophonic source without ambience
- `rhythmic` : best option for drums and percussion when transient preservation is critical
- `general` : balances spectral integrity with transient preservaton
- `extremestretch` : optimized for stretching (slowing down) material, limited to a stretch factor between 0.5 and 4
- `effcient` : best option when CPU efficiency is critical

## loop

The `loop` instrument is basically the `sample` instrument but with `stretch(1)` enabled by default, making all the loaded samples stretch to 1 full bar. For all available `instrument-functions` of `loop` see [`sample`](#sample) above.

```js
new loop <sample-name>
```

## polySynth

The polySynth functions the same as the `synth` instrument in the sense that you choose a waveform, apply a `note()`, add a `shape()`, etc. For explanation of those functions see [`synth`](#synth).

The extra feature of the polySynth is that it allows for overlapping notes to generate chords. Notes provided to the `note()` function as a 2-dimensional list will be played on the same time as a chord. By default there are 8 voices available at the same time. Voice stealing is `on` by default meaning that if a new note is played while all voices are busy the "oldest" triggered note will be removed.

```js
new polySynth <waveform> note([ [chord1] [chord2] ... [chord-n] ])
```

You can think of a 2D list like so:

```js
list chords [ [ 0 3 7 ] [ 2 5 9 ] [ 3 6 10 13 ] ]

list chords [ 0  2  3  ]
              3  5  6 
              7  9  10
                    13 
```

So the list `chords` has `3` "items", and those `3` items again contain a `list`

```js
list chords [ [ 0 3 7 ] [ 2 5 9 ] [ 3 6 10 13 ] ]

new polySynth sine note(chord 2) time(1/2) shape(1 1/4) 
```

### steal

With steal you can choose the behaviour of what happens when new notes are triggered while all voices are in use. When steal is `on` (the default) every new note will be triggered and old notes will be overwritten by the new ones. If steal is `off` new notes are not triggered while all voices are busy. You'll have to wait till some voice is done playing, based on the `shape()` before a note can be triggered again.

**arguments**
- `Bool/Name` -> turn voice stealing `on` or `off` (optional, default=on)

```js
list notes spread(16 0 36)

new polySynth sine note(notes 2) time(1/16) shape(1 1/1) steal(off)
```

:::warning
If you use `steal(off)` but also set `shape(off)` you won't be able to trigger any new notes after all voices are filled because there is no shape to stop any voice from sounding.
:::

### spread

:::warning Mercury4Max only
:::

Use the spread function to add little delays with optional randomness between every note in a chord, resulting in the chord to sound broken up in time (spread out).

**arguments**
- `Number+/Fraction(List)` -> the delaytime between note triggers in ms or fraction (default=0)
- `Number+/Fraction(List)` -> random delaytime offset added to the delaytime in ms or fraction (default=0)

```js
list notes [ [0 3 7 11 12] ]

new polySynth sine note(notes 2) shape(1 1/1) time(1/1) spread(150 50)
```

### voices

:::warning not (yet) supported
:::

## polySample

:::warning Mercury Playground only
:::

The polySample functions the same as the `sample` in the sense that you choose a sample file, set a `speed()`, add a `shape()`, etc. For explanation of those functions see [`sample`](#sample).

The extra feature of the polySample is that it allows for overlapping sounds. For example useful when generating chords. Notes provided to the `note()` function as a 2-dimensional list will be played at the same time as a chord. By default there are 8 voices available at the same time.

For explanation of using `2D-list`'s in `note()` for polyphony see [`polySynth`](#polysynth) voice-stealing see [`steal`](#steal) under `polySynth`. For setting voice-amount see [`voices`](#voices).

```js
set tempo 100
set scale dorian eb

list notes shuffle(spread(24))
new polySample piano_e time(1/16) note(notes 1) shape(1 1/2) steal(off) tune(64)
```

## midi

The `midi` instrument allows you to send MIDI messages (notes, pitchbend, controlchange, programchange) to other external devices or virtual devices in your computer. The `<midi-device-name>` is the literal name as a `string` of the device as it shows up when connected to the computer. For example this can be something like `"My MIDI Device"`. You can also choose `default` to set the instrument to the first midi device in the list. The name is written as a `string` between `" "` and is sensitive to upper and lower cases. To setup a basic midi instrument use:

```js
new midi <midi-device-name>
```

**arguments**
- `Name` -> `default` or MIDI Device name as a `string`

Functions `note()`, `time()`, `name()`, `group()`, `once()`, `play()`, `ratchet()`, `timediv()`, `warp()`, `wait()` all work the same for the `midi` instrument. There are some differences when using the `shape()` and `gain()` functions.

### note

The `note` function allows you to play a midinote. The function works the same as the `note` function explained under the `synth`. Please see [`note()`](#note) for further information.

```js
set scale major D

list notes [0 7 5 3]

new midi default note(notes 2)
// plays the midi notes 62 69 67 64
```

### length

Replaces the `shape()` function of `synth` and `sample`. Set the duration of the midi-note. This means it will send a `note-off` message after a `number` of milliseconds or `fraction`. If the instrument is triggered before the end of the duration, the note-off is canceled and a new note-off is scheduled.

**arguments**

- `Number/Fraction(List)` -> Duration time in ms or fraction

```js
new midi default length(1500) time(1)
```

with fraction:

```js
new midi default length(1/2) time(1)
//=> duration of 1/2 (1200 ms at 100 bpm)
```

Alias: `duration()`, `shape()`

### channel

Set the midi-channel output for the midi-note to be send to. `out()` can be used as an alias to reduce some typing.

**arguments**

- `Number+(List)` -> Channel to send the midi-note to

```js
new midi default note(7 2) channel(1)
new midi default note(0 0) channel(2)
```

Alias: `out()`

### chord

By default the `midi` instrument's output is monophonic. You can turn the chord output (polyphony) on for a midi instrument with this function. This allows you to use `2D-list`s where the 2nd dimension is used to generate chords. Read more about chords under [`polySynth`](#polySynth).

**arguments**

- `Bool` -> Turn chord output on/off

```js
list chords [[0 4 7] [2 5 9] [5 9 0]]

new midi default note(chords 1) chord(on)
```

<!-- Alias: `poly()` -->

### program

Send program change messages to the specified midi-channel of the instrument. The channel number is based on the `out()` function (see [`channel`](#channel)). The default channel `1` is used if no channel is selected. The program change value is zero-based, an integer from `0` - `127` and can be sequenced as a list. If no value is provided there is no program change send. The value is **only** send when it changes based on the previous value. This is done because some midi devices react every time a program change is received (for example cutting of notes), even if the value stays the same.

**arguments**

- `Int+(List)` -> Program change value 0-127 (default=off)

```js
list notes spread(5 0 12)
list changes [0 10 20]

new midi default note(notes 1) out(1) program(changes)
```

Alias: `pgm()`

### change

Send control change (CC) messages to the midi device. This function replaces the `effect()` function of an instrument and can have multiple calls in the same instrument, every call can be a different control number. The first argument is the `number` for the control, the second argument is the `number` for the controller value or a list of controller values. You can use `cc()` as an alias to reduce typing.

**arguments**

- `Int+` -> controller number between 0-127
- `Int+(List)` -> controller value between 0-127

```js
list ccValues [10 20 30 40 50]

new midi default time(1/8) change(13 100) change(21 ccValues)
```

Alias: `cc()`

### sync

:::warning Mercury4Max only
:::

Turn the midiclock syncing on/off for an individual instrument and send it to the selected port/device from that instrument.

**arguments**

- `Bool` -> Turn syncing on/off

```js
new midi "My Midi Device" sync(on)
new midi "Another Device" sync(off)
```

Alias: `clock()`

<!-- 
# Text to Speech (mac-only)

An experimental text-to-speech instrument is added. Using the Mac terminal speech capabilities with the help of the `aka.speech` object developed by Masayuki Akamatsu.

```js
new voice Alex speak("Hello world!") time(2)

new voice Samantha speak("Hi Alex!") time(2 1)
``` -->

## input

Use the input from the soundcard (ADC, Analog Digital Converter) as the source for an instrument. The sound can be modified by all the various `fx()`'s. The volume can be adjusted with `gain()`. An envelope can be applied on the sound with `shape()` and this envelope can be triggered with `time()` just as with the regular instruments `sample`, `synth`, etc. Use the words `in1`, `in2`, ..., `inx` to choose the input source. Use `default` to pick the first input in the list.

```js
new input <input-number>
```

**arguments**
- `Name` -> `default` or the input channel number as a string `inX`

```js
// use the default input, in most cases channel 1
new input default gain(1)

// use a specific channel
new input in3 gain(0.9) 

// add functions like shape, time and fx
new input in4 gain(0.9) time(1/16) shape(1 100) fx(reverb) fx(distort)
```

:::info
In the browser you will need to give permission to use the microphone. Afterwards you might need to refresh the page.
:::

## osc

<!-- :::warning MercuryPlayground only (currently)
For sending osc from Mercury4Max use [`emitter`](#emitter)
::: -->

Create an instrument that sends OSC-messages. The `<address-name>` is used to set the opening address of the message to `/<address-name>`. Any arbitrary function name is used to set as second address in the osc-string. If no name is provided it will default to a unique number for every instrument instance. By adding other functions with any arbitrary name you can send a message with the address in the form of `/<address-name>/<function> <arguments>`

```js
new osc <address-name>
```

```js
list params [0.25 0.5 0.75]
list values [3 1]

new osc "myOSC" time(1/4) someParam(params) anotherParam(values)

// sends => /myOSC/someParams 0.25
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.5
//          /myOSC/anotherParam 1
//          etc...
```

The messages also support multiple arguments up to a length of 256. Multiple arguments can be provided as `list`s, `string`s, `float`s or `int`s.

```js
list val1 [0.25 0.5 0.75]
list val2 [3 1]

new osc myOSC time(1/4) aMessage(0.1 val1 val2 100)

// emits => /myOSC/aMessage 0.1 0.25 3 100
//          /myOSC/aMessage 0.1 0.5 1 100
//          /myOSC/aMessage 0.1 0.75 3 100
//          etc...
```

:::tip
If you want multiple `osc` to send to the same address, you can use the same `<address-name>` but use different `name()`s for reference in the code. Useful if you want to send messages to the same address, but with different timing-intervals.

```js
list params [0.25 0.5 0.75]
list values [3 1 4]

new osc myOSC name(osc1) time(1/4) 
    set osc1 someParam(params)

new osc myOSC name(osc2) time(1/2)
    set osc2 anotherParam(values)
```
:::

<!-- ### address

:::warning Mercury4Max Only
:::

Alternatively, if you want multiple emitters to send to the same address, you can use the `address()` method. The `address` is prepended as first address in the osc-message in the format: `/<address>/<function> argument`. Useful if you want to send messages to the same address, but with different timing-intervals.

```js
list params [0.25 0.5 0.75]
list values [3 1 4]

new emitter osc name(osc1) address(myOSC) time(1/4) 
    set osc1 someParam(params)

new emitter osc name(osc2) address(myOSC) time(1/2)
    set osc2 anotherParam(values)

// emits => /myOSC/someParams 0.25
//          /myOSC/someParams 0.5
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.75
//          /myOSC/someParams 0.25
//          /myOSC/anotherParam 1
//          etc...
```

### sendOSC

You can enable/disable sending messages with the sendOSC function

```js
new emitter osc name(osc3) sendOSC(0)
``` -->

### receiving

You can use osc adresses as arguments for other functions by putting the address as argument in the form: `/<address>/<tag>/<etc.>`. For example to control the `gain()` of a `sample` and the `note()` value of a `synth` enter the following:

```js
new sample kick_909 time(1/4) gain(/myOSC/sliderValue1)
new synth saw note(/myOSC/sliderValue2) shape(1 100) time(1/8)
```

It is possible to scale the incoming osc value to a different range by using `{}` after the address inputting a low and high output range separated by a colon `:`. The scaling function considers an incoming range of `0 - 1` floatingpoint values. For example to control the `note()` and `shape()` ranges in a `synth` enter the following:

```js
new synth saw note(/myOsc/sliderValue3{2:19} 0) shape(1 /myOsc/sliderValue4{50:500}) 
// => converts incoming slider values from 0-1 to 2-19 for note and 0-1 to 50-500 for note length
```

## modulator

:::warning Mercury4Max only
:::

The modulator allows you to send a modulation signal as an argument to parameters in `instrument-function`s of other instruments. These parameters are continuously modulated at a specific rate with a specific waveform. The modulation rate is independent from the instruments `time()` (in comparison when using a list as an argument). It is also possible to send the modulation signal directly out to the connected soundcard on a specific DAC channel (Digital Analog Converter). This can for example be used for CV-modulations.

**arguments**
- `Name` -> modulator waveform type: `sine`/`sin`, `sawUp`/`phasor`, `sawDown`/`saw`, `square`/`rect`, `triangle`/`tri`, `random`/`rand`, `randomLine`/`randL`, `trigger`/`gate`

```js
new modulator <waveform-type> name(<name>) range(<lo> <hi> <exp>) time(<fraction>) out(<channel>)
```

### name

Replaces the `name()` function. Set the name for the modulator, this name can be used as argument in the functions of an instrument like `synth` and `sample`

**arguments**
- `Name` -> the modulator `name` for reference in other functions

```js
// set the name to myModulator
new modulator sine name(myModulator)

// the synth uses the modulator in the gain function
new synth saw gain(myModulator)
```

### time

Replaces the `time()` function. Set the modulation speed as a `fraction` or `float+`. The default is `1/1` (one period per bar).

**arguments**
- `Fraction/Float+` -> The time interval for one period of the modulation waveform (optional, default=1/1)
- `Fraction/Float+` -> The time offset for the modulation (optional, default=0)

```js
// modulate a sinewave at a period of one per 4 bars
new modulator sine time(4/1)
```

### range

Set the modulation range between a lower and upper value with an optional exponential value. The default range is `0` to `1`.

**arguments**
- `Number` -> The low output range (optional, default=0)
- `Number` -> The high output range (optional, default=1)
- `Number` -> The scaling exponent (optional, default=1)

```js
// set the range from 200 to 5000, for example to modulate a filter cutoff in Hz
new modulator sine range(200 5000)

// include the third argument to set the exponential in the scaling
new modulator sine range(200 5000 3)
```

### out

Set the output channel from your connected soundcard to send the modulation signal directly to. The default is 0 (no output to DAC). Currently the maximum number of channels that can be used is 16. If the modulation signal is only used for direct output it is not necessary to also `name()` the modulator.

**arguments**
- `Number+` -> The channel number from 1 till number of outputs available, maximum of 16 (default=0)

```js
// send a sinewave modulator signal to DAC channel 3
new modulator sine range(-1 1) out(3)
```

:::warning
Be careful when sending DC signals with large ranges to your DAC, this could damage your speakers if you choose the wrong output!
:::

### trigger

When using the mode `trigger`/`gate` the modulator functions like the sequencer in the other instruments. Meaning that you can include the `play()` function to add a rhythm list, use `ratchet()` to add a list of timing subdivisions with probability and use `warp()` to add a list of time warpings.

**arguments**
- `Name` -> `trigger`/`gate` sets the intrument to use the stepsequencer (default=off)

```js
// generate a euclidean rhythm and use it in the trigger
list rtm euclid(16 11)
new modulator trigger time(1/8) play(rtm) ratchet(0.1 2)
```

### hold

The hold function transforms the `trigger` into a gate that goes open and closes after a certain amount of time. The time value can be either `ms` or a `fraction`. If the hold time is longer than the time interval between triggers the gate stays open. A hold of `0` results in the click from the default trigger.

**arguments**
- `Number+` -> hold time in ms or fraction (default=0)

```js
// trigger every 8th note, and leave the gate open for the length of 50ms
new modulator trigger time(1/8) hold(50)

// trigger every 8th note, and leave the gate open for the length of a 16th
new modulator trigger time(1/8) hold(1/16)
```

## emitter

:::warning Deprecated in Mercury4Max
Use [`osc`](#osc) instead (similar as in MercuryPlayground now)
:::
<!-- 
:::warning
Soon to be deprecated in Mercury4Max, then use [`osc`](#osc) instead (similar as in MercuryPlayground now)
::: -->

Create an emitter object. Use this object to send messages to other platforms. The emitter object works similarly to the Instruments in the sense that it also has the `time`, `beat` and `name` functions by default. The `time` determines the time-interval at which messages are send. The `beat` can turn send moments on or off.

<!-- ### osc

Create an emitter object of type `osc`. The `name(<name>)` method is used to set the opening address of the message to `/<name>`. Any arbitrary function name is used to set as second address in the osc-string. If no name is provided it will default to a unique number for every instrument instance. By adding other functions with any arbitrary name you can send a message with the address in the form of `/<name>/<function> <arguments>`

```js
new emitter osc name(<name>) time(<division><offset>)
```
example
```js
list params [0.25 0.5 0.75]
list values [3 1]

new emitter osc name(myOSC) time(1/4) 
    set myOSC someParam(params) anotherParam(values)

// emits => /myOSC/someParams 0.25
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.5
//          /myOSC/anotherParam 1
//          /myOSC/someParams 0.75
//          /myOSC/anotherParam 3
//          /myOSC/someParams 0.25
//          etc...
```

The messages also support multiple arguments up to a length of 256. Multiple arguments can be provided as rings, symbols, floats or integers.

```js
list val1 [0.25 0.5 0.75]
list val2 [3 1]

new emitter osc name(myOSC) time(1/4)
    set myOSC aMessage(0.1 val1 val2 100)

// emits => /myOSC/aMessage 0.1 0.25 3 100
//          /myOSC/aMessage 0.1 0.5 1 100
//          /myOSC/aMessage 0.1 0.75 3 100
//          /myOSC/aMessage 0.1 0.25 1 100
//          etc...
```

**Note:** Some variable names are not allowed because they are part of the built-in names for datastructures. These are: `bang, int, float, list, mode, zlclear, zlmaxsize`

### name

Set the name for the OSC emitter. This can be any string of 2 or more characters. The `name` is used as reference to the instrument when the `set` method is used to call methods for a specific object. The `name` is also prepended as first address in the osc-message of the format `/<name>/<function> argument`. -->
