# Instruments (synth, sample, polySynth, loop)

The following methods apply to all the different types of instruments: `synth`, `sample`, `polySynth` and `loop`

## name

Set the name for this instrument. This can be any string of 2 or more characters. The `name` is used as reference to the instrument when the `set` method is used to call methods for a specific instrument.

```
new <inst> <type> name(<name>)
```
example
```
new synth saw name(foo)
	set foo gain(0.8) time(1/16)
new sample kick_909 name(bar)
	set bar gain(1.2) time(1/4)
```

## group

Set the group-name for this instrument. This can be any string of 2 or more characters. The `group` is used as reference to multiple instruments with the same groupname when the `set` method is used.

```
new <inst> <type> group(<name>)
```
example
```
new sample kick_909 group(drums) time(1/4)
new sample snare_909 group(drums) time(1/2 1/4)
	set drums gain(0.8) fx(reverb 0.9 11)
```

## time 

Set the time interval in which a synth or sample is triggered. This can be an integer, float or expression. `1 = bar`, `1/4 = quarter-note`, `1/12  = 8th triplet`, `3/16 = 3-16th notes` etc. Similarly you can set an offset in the timing. The `time()` will start an internal counter for this instrument, used as an index to lookup values from other `ring`'s provided as argument in methods for this instrument.

```
set <name> time(<division> <offset>)
```
example
```
set tempo 130

new sample kick_909 name(kick)
	set kick time(1/4)

new synth saw name(hat)
	set hat time(1/2 3/16)
```

Alternative function-names: `timing() | t()`

## beat

Provide the beat function with a `ring` consisting of zeroes and ones. For every trigger at the time interval provided in the `time()` method, the next value in the ring will be given. An optional second argument resets the internal instrument index after a certain amount of time in n-bars.

```
set <name> beat(<ring> <reset>)
```
example
```
ring aBeat [1 0 0 1 0 1 1 0 0]

new sample hat_909 name(ht)
	set ht time(1/16) beat(aBeat 2)
```

Alternatively you can use floating-point values in a ring which result in a probability that the instrument will play. Here 0 means 0% chance, 1=100% and 0.5 is 50%. Inspired by Nick Collins paper on [Algorithmic Composition Methods for Breakbeat Science](https://www.dmu.ac.uk/documents/technology-documents/research/mtirc/nowalls/mww-collins.pdf).

example
```
ring aBeat [1 0.5 0.2 0.8 0.5]

new sample hat_909 name(ht)
	set ht time(1/16) beat(aBeat 2)
new sample kick_909 time(1/4)
```

Alternative function-names: `rhythm() | b()`

## shape

Set the envelope generator of a sound. Various modes are possible depending on the amount of arguments. The attack time is the fade-in for the sound, the release is the fade-out for the sound both in milliseconds. The sustain time holds the sound at a static volume for a while. If the sound is triggered before the end of the envelope, the envelope is canceled, faded to 0 in 1ms and starts over.

```
set <name> shape(<attack, optional (default=2)> <sustain, optional (default=0)> <release>)
```
example
```
new synth saw shape(1500) time(1)
//=> default attack of 2 ms, sustain of 0 ms and a release of 1500 ms

new synth saw shape(1000 250) time(1)
//=> attack of 1000 ms, default sustain of 0 ms and a release of 250 ms

new synth saw shape(10 500 50) time(1)
//=> attack of 10 ms, sustain of 500 ms and a release of 50 ms
```

Alternative function-names: `envelope() | env() | transient() | e()`

## gain

Set the volume for the instrument in floating-point amplitude. Where `1` is the normalized amplitude, `0.5` is the half softer (-6 dBFS) and `2` is twice as loud (+ 6dBFS).

```
set <name> gain(<amplitude>)
```
example
```
new sample snare_909 name(sn)
	set sn gain(0.8)
```

Alternative function-names: `amp() | volume() | g() | a() | v()`

## pan

Set the panning position in floating-point for the sound in the stereo-image. `-1` is 100% left channel, `0` is center (both speakers), `1` is 100% right channel. Higher or lower values wrap between -1 and 1. Provide pan with the `random` argument to get a new random panning value every moment of the `time()` counter.

```
set <name> pan(<position>)
```
example
```
new sample clap_909 name(hand)
	set hand pan(random)
```

Alternative function-names: `panning() | p()`

## fx

Apply an effect to the sound of the instrument. The first argument is always the fx-name. The following arguments depend on the used effect. See [FX Documentation](./04-fx.md#fx) for more details on individual effects.

```
set <name> fx(<fxname> <arg1> <arg2> ... <arg-n>)
```
example
```
new synth square name(bass)
	set bass fx(double)
```

The currently available effects are:
```
- chip
- delay
- double
- drive
- filter
- lfo
- reverb
```

Alternative function-names: `effect() | with_fx() | add_fx()`

# synth and polySynth only

## note

Set the pitch for the instrument to play a note in a melody or chord. The note is specified as a 2-dimensional coordinate system, where the first argument is the semitone offset (can be positive or negative) and the second argument is the octave offset (can be positive or negative). The origin of the system, `note(0 0)`, corresponds by default with midi-pitch `36` or `C2`. Depending on the `set scale` the coordinate system will shift and result in a different pitch for the origin. A `note()` should therefore not be taken as an absolute value, but rather a relative direction where the melody is going to in relation to the scale and root.

```
note(<semi-tone> <octave, optional default=0>)
```
example
```
set scale major D
new synth sine note(2 2)
//=> results in midi-note 64 > F4
```

Also excepts rings to play a melody over time
```
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

```
wave2(<saw/sine/square/triangle> <frequency-ratio>)
```
example
```
new synth saw note(0 1) time(1/4) wave2(square 0.998)
```

# Sample and Loop only

## speed

Set the playback speed for the sample, where 1 = original speed, 0.5 = half the speed and 2 = twice as fast. Adjusting the playback speed will change the pitch of the sample. 

```
speed(<sample-playback-speed-ratio>)
```
example
```
new sample choir time(5) speed(0.5)
new sample choir time(5) speed(-0.5)
set all fx(reverb 2 17)
```

## stretch

Stretch the entire sample to the length of a full bar. Useful for when working with beats that have to be looped.

```
stretch(<0-1>)
```

## offset

Set the offset (the start position of the playback) of the sample. 0 = start at the beginning, 0.5 = start midway in the sample.

```
offset(<position-in-sample-0-1>)
```