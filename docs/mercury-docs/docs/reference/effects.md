---
sidebar_position: 4
---

# Instrument Effects

You can add one ore multiple effects to the sound of the instrument to manipulate the sounds timbre in different ways. The first argument is always the `effect-name`. The arguments that follow depend on the selected effect. `fx()` can be used as an alias to reduce some typing. For ease of use some arguments can be skipped to access the most used arguments. How this works is explained per effect if applicable.

```js
new synth saw fx(<effect-name> <value1> <value2> ... <value-n>)
```

## Static vs. Dynamic FX-Chains

The *Mercury4Max* version has a static effects-chain. This means the order in the effects under the hood is fixed. The order is documented under [Static FX Chain](#static-fx-chain). Because of this there is:

- No option to change the order of effects with the code
- No option to use effects multiple times in one instrument

```js title="static fx-chain"
new synth saw fx(reverb) fx(filter low 2000) fx(distort) fx(filter low 300)
// filter and distortion are fixed before reverb in the chain, the order of 
// the code doesn't matter. There is only one filter in the chain, the first 
// filter is therefore overwritten by the other
```

The *MercuryPlayground* version has a dynamic effects-chain. This means the order in the effects is determined by how you type the code. Because of this there is:

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

## Static FX-Chain

```
instrument (eg. sample, synth, input)
|
freeze (spectral freezer)
|
shift (pitchshifter)
|
vibrato (pitch modulation)
|
triggerFilter (envelope modulated filter)
|
kink (distortion)
|
distort (distortion)
|
filter (low/hi/band filter with optional LFO modulation)
|
comb (combfiltering)
|
degrade (downsampling)
|
squash (basic compression/distortion)
|
gain (the volume of the sound) -> sender
|
panning (mono to stereo)
||
double / chorus
||
|| >> vv
||    +
||    reverb (stereo)
++ << <<
||
lfo (low frequency oscillator)
||
delay (stereo pingpong delay)
||
output
```

```js title="Channels"
|  mono
-  mono
|| stereo
=  stereo
++ sum
```

## chorus

Add a Chorus effect to the sound. The original sound is played in the center and two delayed version are played left and right, of which the delaytimes are slightly modulated. Arguments are the modulation speed in fraction, the modulation depth in milliseconds, the modulation wave `sine` or `random`, the dry-wet ratio between `0` and `1` and a detune factor between left and right modulation wave in floating.

**arguments**
- `Fraction(List)` -> modulation rate (default=4/1)
- `Number+(List)` -> modulation depth in ms (default=8 for double, default=45 for chorus)
- `Name(List)` -> modulation wave, sine or random (default=random)
- `Float+(List)` -> dry-wet (default=1 for double, default=0.5 for chorus)
- `Float+(List)` -> modulation rate detune (default=0.94562)

```js
fx(chorus)
fx(chorus <rate>)
fx(chorus <rate> <depth> <wave> <dry-wet> <detune>)
```

```js
new synth saw fx(chorus 5/1 30) shape(1 1/4) time(1/2) note(0 1)
```

:::warning MercuryPlayground

There are some small differences for this effect in the browser version:

- `Fraction` -> modulation rate (default=8/1)
- `Number+` -> modulation depth in ms (default=8 for double, default=45 for chorus)
- `Float+` -> dry-wet (default=1 for double, default=0.5 for chorus)

```js
fx(chorus)
fx(chorus <rate>)
fx(chorus <rate> <depth> <dry-wet>)
```
:::

## comb

:::warning Mercury4Max only
:::

A combfilter effect. This combines a small delayed version of the sound with the original sound resulting in a combfilter, giving a metallic quality to the sound. The first argument is the semitone the filter is tuned at (synced to the scale and allowing for detuning with floating points), the second optional argument is a feedback amount.

**arguments**
- `Number+(List)` -> filter frequency as note semiton (default=0)
- `Float+(List)` -> filter feedback between 0 and 0.99 (default=0.8)
- `Float+(List)` -> dry-wet factor 0-1 (optional, default=0.5)

```js
new synth saw fx(comb 7 0.4)
```

## degrade

A downsampling/8bit/chiptune effect. The signal is downsampled by a factor, where `0` means no downsampling (original samplerate) and `0.5` is half the samplerate etc (e.g. 44100 * 0.5 = 22050). 

**arguments**
- `Float+(List)` -> downsampling amount between 0-1 (default = 0.5)
- `Float+(List)` -> dry-wet factor 0-1 (optional, default=1)

```js
new synth saw fx(degrade 0.75)
```

Alias: `chip`

## delay

Add a pingpong delay effect to the sound. The effect has 4 arguments, the left delaytime, the right delaytime, the feedback and the damping. The delaytime is specified in bar time fractions, where `0.25` (or `1/4`) is a quarter note. The feedback is specified as a value between `0` and `1`. Positive feedback is allowed and internally compressed/distorted, but watch out for your ears just in case. The damping is a onepole lowpass filter for which the cutoff is specified between `0` and `1` where 0 means full damping, and 1 means none (filter open).

**arguments**
- `Fraction(List)` -> delaytime for left (optional, default=3/16)
- `Fraction(List)` -> delaytime for right (optional, default=2/8)
- `Float+(List)` -> feedback 0-1 (optional, default=0.8)
- `Float+(List)` -> damping 0-1 (optional, default=0.5)
- `Float+(List)` -> drywet 0-1 (optional, 1=100% wet, default=0.5)

```js
fx(delay) (defaults)
fx(delay <timeLR>)
fx(delay <timeLR> <fb>)
fx(delay <timeL> <timeR> <fb>)
fx(delay <timeL> <timeR> <fb> <damp>)
fx(delay <timeL> <timeR> <fb> <damp> <drywet>)
```

```js
new sample hat_909 time(1/2) fx(delay 3/16 7/16 0.5 0.7)
```

Alias: `echo`

## distort

A distortion/overdrive/soft-clipping effect. Uses the `tanh(x * g)` algorithm and a `1.0/sqrt(g)` for gain compensation.

**arguments**
- `Number+(List)` -> distortion amount, greater then 0 (optional, default=2)
- `Float+(List)` -> dry-wet factor 0-1 (optional, default=1)

```js
new sample kick_909 fx(drive 15 0.4)
```

Alias: `drive`

## double

Add an Automated-Double-Tracking (ADT) effect to the sound. It will sound like two versions of the sound are created, one left and one right. This effect is the `chorus` effect but with `wet = 1`. See [`chorus`](#chorus) for more info about all the parameters.

```js
new sample clap_808 fx(double) time(1/4)
```

## filter

Add a filter to the sound. This can be a static filter or a modulated filter depending on the amount of arguments you provide. The filter-type can be a `low`, `high` or `band`-pass filter. The second argument is the cutoff frequency in Hz and the third argument is the resonance between `0` and `1`. Passing a single argument only sets the cutoff, passing two arguments sets the cutoff and resonances. The filter then defaults to `lowpass`.

**arguments**
- `Name` -> filter type, low, high, band (default=low)
- `Number+(List)` -> cutoff frequency in Hz (default=1200)
- `Float+(List)` -> resonance between 0-1 (default=0.45)

```js
fx(filter)
fx(filter <cutoff>)
fx(filter <cutoff> <resonance>)
fx(filter <type> <cutoff> <resonance>)
```

```js
new synth saw note(0 1) shape(-1) fx(filter low 800 0.6)
```

### filter modulation

You can provide extra arguments to have the filter modulate between a low and high cutoff-frequency. In this case the arguments are as follows (in order): The filter-type `low / high / band`. The modulation speed in float/fraction where `0.25` or `1/4` = a quarter note. The upper cutoff in Hz, the lower cutoff in Hz the resonance between `0` and `0.99`. The modulation shape tilt between `0` and `1`, where 0 is ramp-down, 1 is ramp-up and 0.5 is triangle form (although the ramp-up and down can change if you swap the upper and lower cutoff values). The exponential curve for the filter as floating point `0` - `100`.

**arguments**
- `Name` -> filter type, low, high, band (default=low)
- `Fraction(List)` -> modulation ratio (default=1/1)
- `Number+(List)` -> low modulation frequency in Hz (default=200)
- `Number+(List)` -> high modulation frequency in Hz (default=3000)
- `Float+(List)` -> resonance between 0-1 (default=0.45)
- `Float+(List)` -> modulation slope 0-1 (up, triangle, down) (default=0.5)
- `Float+(List)` -> exponential scaling (default=2)

```js
new synth saw note(0 0) fx(filter low 1/4 100 3500 0.55 0 4)
```

## freeze

:::warning Mercury4Max only
:::

Create an FFT-freeze effect on the sound. This will result in a "frozen-in-time"-like sound, where the timbre is still clearly audible. The freezer is triggered at the time interval of the `time()` function. The trigger can be set with a float to give it a probability of triggering, or a list can be provided to let the freezing occor in a rhythmic pattern. The second optional argument determines the sliding time between 2 freeze frames (in n-frames), and the third optional argument sets the amount of frames to store (one frame is 1024 samples).

**arguments**
- `Number(List)` -> freeze rhythm or probability (default=1)
- `Int(List)` -> interpolation between frames (default=0)
- `Int(List)` -> number of frames stored in freezer (default=8)

```js
list playHarp [1 0 0 0 0 0 0 0]
list trigger [1 0 0 0 0]

new sample harp_up time(1/4) beat(playHarp) name(harp)
    set harp fx(freeze trigger)
```

## kink

:::warning Mercury4Max only
:::

A kink distortion algorithm. Creates a bend or "kink" in the audio signal.  

**arguments**
- `Number+(List)` -> distortion amount, greater then 0 (optional, default=5)
- `Float+(List)` -> dry-wet factor 0-1 (optional, default=1)

```js
new sample violin_c time(1) fx(kink 15)
```

## lfo

Add a Low Frequency Oscillator effect to the sound. This results in a rapidly fading in/out sounding effect (a tremolo, or sometimes called "helicopter" sound). Various arguments allow to shape the speed and type of wave for modulation. The first argument is the rate as `fraction`. The second argument is the shape type `square`, `up`, `down` or  `sine`. With the third argument you can change the lowest amplitude of the modulation and with the optional fourth argument you can change the width (only works with the square)

Alias: `tremolo`

**arguments**
- `Fraction(List)` -> speed of the LFO (default=1/16)
- `Name(List)` -> type of the wave, square, up, down or sine (default=square)
- `Float+(List)` -> dry-wet factor 0-1 (optional, default=1)
- `Float+(List)` -> width of the square wave between 0-1 (optional, default=0.5)
- `Float+(List)` -> offset of the waveform 0-1 (optional, default=0) *Mercury4Max only*

```js
fx(lfo)
fx(lfo <time-fraction>)
fx(lfo <time> <type>)
fx(lfo <time> <type> <dry-wet> <width> <offset>)
```

```js
new loop amen fx(lfo 1/16)
```

## reverb

Add a reverberation effect to the sound, making it sound like it's in a room or big hall. The effect has 2 arguments, the amplitude of the reverb and the reverb-size. The amplitude is specified as floating-point amplitude and the length is a value between `0` and `18` (choosing between 19 presets). The default is `0.5` amplitude and `10` length.

**arguments**
- `Float+(List)` -> amplitude of reverb (default=0.5)
- `Number+(List)` -> size of reverb 0-18 in seconds (default=10)
- `Number+(List)` -> slide time in milliseconds when size is changed (default=10) *Mercury4Max only*
- `Float+(List)` -> drywet 0-1 (optional, 1=100% wet, default=0.5) *Mercury4Max only*

```js
fx(reverb)
fx(reverb <size>)
fx(reverb <amount> <size>)
fx(reverb <amount> <size> <slide> <dry-wet>)
```

```js
new sample snare_909 time(1) fx(reverb 0.93 15)
```

Alias: `hall`

## shift

Make a time-domain pitchshifting effect to change the pitch of the sound. The first argument sets the shift in semitones (this can also be a floating-point value to create microtonal shifts). The second value sets the dry-wet ratio (default = 1) to combine the original with the shifted sound. You can change the shifting quality (higher quality sounds better but uses more cpu).

**arguments**
- `Number(List)` -> shifting factor (positive/negative) in semitones (optional, default=-12)
- `Float+(List)` -> dry-wet mix between 0-1 (optional, default=1)
- `Name` -> shifting settings `basic`, `good`, `better`, `best` (optional, default=basic) 

```js
new sample violin_c time(1/4) fx(shift 7 0.5)
```

## squash

A simple compression/distortion algorithm based on a design by Peter McCulloch. Raise the amount to squash the incoming signal, first creating some kind of compression, but quickly introduces nice distortion harmonics.

**arguments**
- `Number+(List)` -> input gain amount, greater than 1 (optional, default=4)
- `Float+(List)` -> dry-wet factor 0-1 (optional, default=1)
<!-- - `Float` -> compression factor greater than 0 (optional, default=0.28) -->

```js
new sample piano_e time(1) fx(squash 2.3)
```

## triggerFilter

A filter with an envelope that is controlled by the trigger of the instrument. Whenever the sequencer triggers an event that causes the instrument to sound this will also be the event that triggers the start of this filter. The filter has various types, a low and high frequency value for the envelope to move between, an attack and release time in ms or fraction value and an optional exponent for the slope of the filter.

**arguments**
- `Name` -> filter type, `low`, `high`, `band` (default=low)
- `Number+/Fraction(List)` -> attack time in ms or fraction (default=1)
- `Number+/Fraction(List)` -> release time in ms or fraction (default=1/16)
- `Number+(List)` -> upper frequency point in the envelope (default=4000)
- `Number+(List)` -> lower frequency point in the envelope (default=100)
- `Float+(List)` -> exponent for the envelope curve (default=1)

```js
list beat euclid(8 3)
new synth saw note(0 1) time(1/8) play(beat) fx(triggerFilter low 10 1/4 1000 150 0.5)
```

## vibrato

:::warning Mercury4Max only
:::

Add a vibrato effect to the incoming signal by modulating a short delayline with a sinewave. The depth sets the delayline length in ms, the rate sets the frequency of the sinewave in Hz.

**arguments**
- `Number+(List)` -> vibrato rate in Hz (optional, default=2)
- `Number+(List)` -> vibrato depth in ms (optional, default=5)

```js
new sample violin_c time(1/4) fx(vibrato 4 5)
```

## vocoder

:::warning Mercury4Max only
:::

A classic vocoder effect consisting of 16 resonant bandpass filters spread logarithmically between a low and high frequency range with a specified resonance Q factor. The input sound will be analyzed through the bands with an amplitude follower (with variable release time) and the carrier sound will be used to output the synthesized result. The carrier is noise by default, but can be set to receive from an other named synth or sample. For this use the `name()` method. Optionally a threshold can adjust which bands are passed through, only if their amplitude is loud enough.

**arguments**
- `Name` -> carrier source name of other instrument (default=noise)
- `Number+` -> bandpass filter resonance 0-100 (default=15)
- `Number+` -> amplitude following release time in ms (default=50)
- `Float+` -> wet dry ratio 0-1 (default=1)
- `Number+` -> lowest frequency of the filterbank (default=50)
- `Number+` -> highest frequency of the filterbank (default=10000)
- `Float+` -> band threshold 0-1 (default=0)

```js
new synth saw name(bass) note(0 0) shape(-1) gain(1 0 1)

new loop amen fx(vocoder bass 20 100 1 50 5000)
```