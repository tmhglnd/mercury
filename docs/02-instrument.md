# Instruments

The following methods apply to all the different types of instruments: `synth`, `sample`, `polySynth` and `loop`

## name

Set the name for this instrument. This can be any string of 2 or more characters. The `name` is used as a reference to the instrument when the `set` method is used to call methods for a specific instrument.

**arguments**
- {Name} -> an instrument name (default=null)

```java
new synth saw name(foo)
	set foo gain(0.8) time(1/16)
new sample kick_909 name(bar)
	set bar gain(1.2) time(1/4)
```

## group

Set the group-name for this instrument. This can be any string of 2 or more characters. The `group` is used as reference to multiple instruments with the same groupname when the `set` method is used.

**arguments**
- {Name} -> a group name used for multiple instruments (default=null)

```java
new sample kick_909 group(drums) time(1/4)
new sample snare_909 group(drums) time(1/2 1/4)
	set drums gain(0.8) fx(reverb 0.9 11)
```

## time 

Set the time interval in which a synth or sample is triggered. This can be an integer, float or expression. `1 = bar`, `1/4 = quarter-note`, `1/12  = 8th triplet`, `3/16 = 3-16th notes` etc. Similarly you can set an offset in the timing. The `time()` will start an internal counter for this instrument, incremented every time it is triggerd (based on the `beat()` method). The counter is used as an index to lookup values from other `ring`'s provided as argument in methods for this instrument.

**arguments**
- {Number/Division} -> the timing division (default=1/4)
- {Number/Division} -> timing offset (optional, default=0)

```java
set tempo 130

new sample kick_909 name(kick)
	set kick time(1/4)

new synth saw name(hat)
	set hat time(1/2 3/16)
```

Alternative function-names: `timing() | t()`

## beat

Provide the beat function with a `ring` consisting of ones and zeroes. For every time interval defined by the `time()` method, the next value in the ring will be used. A one results in a trigger of the instrument and an increment of the internal counter. A zero results in no trigger. An optional second argument resets the internal instrument index after a certain amount of time in n-bars.

**arguments**
- {FloatRing+|Float+} -> the rhythmic pattern of ones and zeroes to play (default=1)

```java
ring aBeat [1 0 0 1 0 1 1 0 0]

new sample hat_909 name(ht)
	set ht time(1/16) beat(aBeat 2)
```

Alternatively you can use floating-point values in a ring which result in a probability that the instrument will play. Here 0 means 0% chance, 1=100% and 0.5 is 50%. Inspired by Nick Collins paper on [Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf).

```java
ring aBeat [1 0.5 0.2 0.8 0.5]

new sample hat_909 name(ht)
	set ht time(1/16) beat(aBeat 2)
new sample kick_909 time(1/4)
```

Alternative function-names: `play() | rhythm() | b()`

## shape

Set the envelope generator of a sound. Various modes are possible depending on the amount of arguments. The attack time is the fade-in for the sound, the release is the fade-out for the sound both in milliseconds. The sustain time holds the sound at a static volume for a while. If the sound is triggered before the end of the envelope, the envelope is canceled, faded to 0 in 1ms and starts over. You can specify the times in absolute values using integer/floating points (in ms) or in relative values using beat divisions.

**arguments**

- {Number/Division} -> Attack time in ms or division (optional, default=2)
- {Number/Division} -> Decay time in ms or division (optional, default=0)
- {Number/Division} -> Release time in ms or division

```java
new synth saw shape(1500) time(1)
//=> default attack of 2 ms, sustain of 0 ms and a release of 1500 ms

new synth saw shape(1000 250) time(1)
//=> attack of 1000 ms, default sustain of 0 ms and a release of 250 ms

new synth saw shape(10 500 50) time(1)
//=> attack of 10 ms, sustain of 500 ms and a release of 50 ms
```

with division:

```java
set tempo 100

new synth saw shape(1/2) time(1)
//=> default release of 1/2 (about 250 ms at 120 bpm)

new synth saw shape(1/4 1/32) time(1)

new synth saw shape(1/64 1/8 1/16) time(1)
```

Alternative function-names: `length() | envelope() | env() | transient() | e()`

## gain

Set the volume for the instrument in floating-point amplitude. Where `1` is the normalized amplitude, `0.5` is the half softer (-6 dBFS) and `2` is twice as loud (+ 6dBFS).

**arguments**
- {Float+} -> the volume of the instrument (default=1)

```java
new sample snare_909 name(sn)
	set sn gain(0.8)
```

Alternative function-names: `amp() | volume() | g() | a() | v()`

## pan

Set the panning position in floating-point for the sound in the stereo-image. `-1` is 100% left channel, `0` is center (both speakers), `1` is 100% right channel. Higher or lower values wrap between -1 and 1. Provide pan with the `random` argument to get a new random panning value every moment of the `time()` counter.

**arguments**
- {Float} -> the panning position between -1 and 1 (default=0)

```java
new sample clap_909 name(hand)
	set hand pan(random)
```

Alternative function-names: `panning() | p()`

## fx

Apply an effect to the sound of the instrument to shape your sounds timbre in many ways. The first argument is always the effectname. The following arguments depend on the selected effect. See [FX Documentation](./04-fx.md#fx) for more details on individual effects.

**arguments**
- {Name} -> the effect name
- {Value+} -> any values based on effectname arguments

```java
new synth square name(bass)
	set bass fx(reverb 0.8 11)
```

The currently available effects are:

```
- chip
- delay
- double
- drive
- filter
- freeze
- lfo
- reverb
```

Alternative function-names: `effect() | with_fx() | add_fx()`

# synth and polySynth only

## note

Set the pitch for the instrument to play a note in a melody or chord. The note is specified as a 2-dimensional coordinate system, where the first argument is the semitone offset (can be positive or negative) and the second argument is the octave offset (can be positive or negative). The origin of the system, `note(0 0)`, corresponds by default with midi-pitch `36` or `C2`. Depending on the `set scale` the coordinate system will shift and result in a different pitch for the origin. A `note()` should therefore not be taken as an absolute value, but rather a relative direction where the melody is going to in relation to the scale and root.

**arguments**
- {Value|RingValue} -> positive or negative semitone note value or ring, x-coordinate (default=0)
- {Value|RingValue} -> positive or negative octave value or ring, y-coordinate (default=0)

```java
set scale major D
new synth sine note(2 2)
//=> results in midi-note 64 > F4
```

Also excepts rings to play a melody over time:

```java
set scale minor A
ring mel [0 5 7 3 2 -2 0]
new synth sine note(mel 1) time(1/16)

```

## useDetune

Allow detuning to have effect on the played note. The detuning is made by adding a floating-point value to the played note, Where the ratio is the amount of detune between one semitone and the next. For example `7.5` results in `7` semitones (mapped to the scale if `set scale` is used) and then a `0.5` semitone is added (= 50 cents). Detuning is applied after mapping the integer semitone to a scale.

**arguments**
- {Bool} -> enable or disable detuning (default=0)

```java
new synth sine shape(1 2000) time(1) note(7.5 2) useDetune(1)
new synth sine shape(1 2000) time(1) note(7 2) 
```

## wave2

Add a second oscillator to the synths sound. This can either be a sine, triangle, square or saw. The second argument sets a multiplication ratio for the second oscillators frequency.

**arguments**
- {Name} -> waveform to add as second wave
- {Float} -> tuning in ratio to note() frequency (default=1)
- {Float} -> tuning offset in Hertz (optional, default=0)

```java
new synth saw note(0 1) time(1/4) wave2(square 0.998)
```

# Sample and Loop only

## speed

Set the playback speed for the sample, where 1 = original speed, 0.5 = half the speed and 2 = twice as fast. Adjusting the playback speed will change the pitch of the sample. A negative value will play the sample backwards starting at the end (or at the `offset()` position)

**arguments**
- {Number} -> playback speed (default=1)

```java
new sample choir time(5) speed(0.5)
new sample choir time(5) speed(-0.5)
set all fx(reverb 2 17)
```

## offset

Set the offset (the start position of the playback) of the sample. 0 = start at the beginning, 0.5 = start midway in the sample. With long decaying samples the offset is very useful if playing the sounds backwards when using for example `speed(-1)`. 

**arguments**
- {Float} -> the playback position between 0 and 1 (default=0)

```java
ring positions randomFloat(8 0 0.5)

new sample choir time(1/16) offset(positions)
```

Alternative function-names: `start() | from() | onset()`

## stretch

Stretch the entire sample to the length of a full bar. Useful for when working with beats that have to be looped. Stretching is the default when working with the `loop` instrument. This is basically a `new sample` with `stretch(1)`. Optionally you can turn timestrechting on with a second argument to preserve the original pitch of the sample. A third optional argument changes the mode of the stretching, choose from: basic, monophonic, rhythmic, general, extremestretch, efficient. The default is set to efficient.

**arguments**
- {Int} -> turn stretch to full bar on/off (default=0 for sample default=1 for loop)
- {Int} -> turn timestretching on when stretching to full bar, preservering the original pitch (default = 0)
- {Name} -> adjust the stretching mode (default=efficient)

```java
new sample chimes stretch(1 1 general) speed(-1)
```

### Stretching modes explained

- `basic` : best option for real-time performance
- `monophonic` : best option for any monophonic source without ambience
- `rhythmic` : best option for drums and percussion when transient preservation is critical
- `general` : balances spectral integrity with transient preservaton
- `extremestretch` : optimized for stretching (slowing down) material, limited to a stretch factor between 0.5 and 4
- `effcient` : best option when CPU efficiency is critical

# Text to Speech (mac-only)

An experimental text-to-speech instrument is added. Using the Mac terminal speech capabilities with the help of the `aka.speech` object developed by Masayuki Akamatsu.

```java
new voice Alex speak("Hello world!") time(2)

new voice Samantha speak("Hi Alex!") time(2 1)
```