# Instruments (synth, sample, polySynth, loop)

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
ring aBeat [1 0 0.2 1 0.5]

new sample hat_909 name(ht)
	set ht time(1/16) beat(aBeat 2)
```

Alternative function-names: `rhythm() | b()`

## shape

Set the envelope generator of a sound. Various modes are possible depending on the amount of arguments. The attack time is the fade-in for the sound, the release is the fade-out for the sound both in milliseconds. The sustain time holds the sound at a static volume for a while. If the sound is triggered before the end of the envelope, the envelope is canceled, faded to 0 in 1ms and starts over.

```
set <name> shape(<attack> <sustain> <release>)
```
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
```
new sample snare_909 name(sn)
	set sn gain(0.8)
```

Alternative function-names: `amp() | volume() | g() | a() | v()`

## pan

Set the panning position in floating-point for the sound over the stereo-image. `-1` is 100% left, `0` is center, `1` is 100% right. Higher or lower values wrap between -1 and 1. Provide pan with `random` to get a new random panning value every count of the `time()`.

```
set <name> pan(<position>)
```
```
new sample clap_909 name(hand)
	set hand pan(random)
```

Alternative function-names: `panning() | p()`

## fx

Apply an effect to the sound of the instrument. The first argument is always the fx-name as a string. The arguments depend on the chosen effect. All effects are listed under FX.

```
set <name> fx(<fxname> <arg1> <arg2> ... <arg-n>)
```
```
new synth square name(bass)
	set bass fx(double)
```

Alternative function-names: `effect() | with_fx() | add_fx()`

# Synth Only

## note 

```
set <name> note(<semi-tone> <octave>)
```

## wave2

```
set <name> wave2(<saw/sine/square/triangle> <frequency-ratio>)
```

# Sample Only

## speed

```
set <name> speed(<sample-playback-speed-ratio>)
```

## stretch

```
set <name> stretch(<0-1>)
```

## offset

```
set <name> offset(<position-in-sample-0-1>)
```