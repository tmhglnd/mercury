---
sidebar_position: 3
---

# 🎮 Quick Features Overview

Below is a brief overview of several things you can do with Mercury. But this is of course just scratching the surface!

---

Quick access to playback of samples and change timing and tempo of samples or synthesizers

```js
set tempo 89

new sample kick_909 time(1/4)
new sample hat_909 time(3/16)
```

Make rhythmic patterns with sequences of numbers and probabilities

```js
list loBeat [1 0 0 1 0.5]
list hiBeat [0 1 0.2 0]

new sample tabla_lo time(1/8) play(loBeat)
new sample tabla_hi time(1/8) play(hiBeat)
```

Generate psuedorandom melodic content for a synthesizer in a range and set a scale

```js
set scale minor d
set randomSeed 31415

list melody random(16 0 24)

new synth saw note(melody) time(1/16) shape(4 100)
```

Design sounds with various effects

```js
new sample chimes time(2) speed(0.25) fx(reverb 0.3 15) fx(drive 10) fx(lfo 1/8 sine)
```

Easily give multiple instruments the same effects

```js
new sample chimes time(2)
new sample harp_down time(3)
new sample gong_lo time(5)

set all fx(lfo 1/16) fx(delay) fx(reverb 0.5 11)
```

Sync audio loops to the tempo of your music

```java
set tempo 97

new loop amen time(1)
new sample kick_house time(1/4)
```

Generate sequences algorithmically by combining list-functions to compose complex structures and choose from an extensive library of algorithms to work with

```js
set scale minor a 

list rhythm euclidean(32 13)

list melody spread(5 0 24)
list melody palinedrome(melody)
list melody clone(melody 0 5 7 3)
list melody lace(melody melody)

new synth triangle note(melody 1) shape(1 80) play(rhythm)
```

Control external midi devices or applications by sending midi and cc <!--and use clock sync-->

```java
new midi "Your Awesome Midi Device" time(1/16) note(7 1) name(mDev)
    set mDev length(1/16) gain(0.8) chord(off)
    set mDev control(10 [20 50 100])
```

Control other environments via OSC-messages

```js
list params [0.25 0.5 0.75]

new emitter osc address(yourDevice) theParam(params) time(1/4)

// emits => /yourDevice/theParam 0.25
//          /yourDevice/theParam 0.5
//          /yourDevice/theParam 0.75
//          /yourDevice/theParam 0.25
//          etc...
```

Easily control parameters in Mercury via external OSC-messages (*only when running MercuryPlayground [localhost](#-install) or Mercury4Max*)

```js
new synth triangle fx(reverb '/synth/verb') fx(filter low '/synth/cutoff' 0.4) time(1) shape(1 'synth/length')
```

Sequence Hyrda visuals with instruments (*experimental and MercuryPlayground only*)

```java
list hydras ['osc(10,0.1,2).out()' 'osc(20,-0.5,5).out()' 'osc(5,1,12).out()']

new sample kick_min time(1/16) play([1 0 0 1 0]) visual(hydras)
```