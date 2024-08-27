---
sidebar_position: 1
---

# Actions

The action keywords are used to start a line of Mercury code with. Only lines starting with these keywords are valid. The keywords are: `new`, `list`, `set`, `print` and `silence`.

## new

Create a new instance of an instrument object. For example this can be a `sample`, `synth`, `loop`, `polySynth` or `midi` object, followed by the name of the sample, the name of the waveshape to use for the synth, the or the midi device name (See [Instrument Functions](instruments) for more details). Use instrument methods to set parameters for that object on the same line.

**arguments**

- `Instrument` -> the instrument type (eg. sample, synth, loop, polySynth, midi, modulator)
    - `Source` -> selected sample or synth source (based on loaded files)
        - `Functions+` -> instrument functions seperated by spaces (optional)

```js
new synth saw shape(20 500)

new sample kick_909 time(1/8)

new midi "AU DLS Synth 1" note(3 1)
```

<!-- Alias: `make`, `sound` -->

By default Mercury has a small library of samples included in the environment. It is possible to include your own sounds as well:

- [Load sounds in Mercury4Max](./../usage/mercury4max.md#sounds)
- [Load sounds in MercuryPlayground](./../usage/mercury-playground.md#add-sounds)
- [Full list of all the included sounds](./../usage/sounds.md)

## list

Create a list, which is sometimes called a `circular array` or `ring`. This list can contain many types of items such as whole numbers (integers), decimal numbers (floats), names, strings, fractions and other rings (2-dimensional). Use these to change parameters over time for instruments. The `list` must be declared with a `name` before it can be used as a variable in an instrument function. Read more about all the algorithmic functions available for generating and transforming lists under [List Functions](list-functions).

**arguments**
- `Name` -> list `name`
    - `Values` -> one or more values between brackets `[ ]`
    - `Function` -> a `list-function`

```js
list someValues [ 0 1.618 21 3.14 ]

list someSounds [ kick_909 hat_909 snare_909 hat_909 ]

list fromFunction random(20 0 100)
```

:::tip
Use clear descriptive variable names for lists to keep your code readable for yourself and for anyone you share it with. For example a list with a rhythm for a hihat can be called `hatBeat`, and a list with a melodic phrase for a verse could be named `verseNotes`. Using names that are also functions is not advised (eg. `gain`, `shape`, `random` etc.)
:::

:::warning
Some variable names are not allowed because they are part of the reserved names for datastructures. These are: `bang, int, float, mode, zlclear, zlmaxsize, new, list, set, print`.
:::

:::note Deprecated: `ring`
In earlier versions this was called a `ring` because it refers to a *circular array*, however `list` is more accessible when learning programming.
:::

## set

Use the set action to change global settings in the environment or append instrument-functions for an instance of an instrument via `name`, `group-name` or `all`. The instrument must be declared with a `name()` or `group()` before `set` is called.

**arguments**
- `Name` -> parameter or instrument name to set with value or function
    - `Value` -> value to apply to the setting
    - `Function` -> instrument-function to apply

```js
set tempo 125

new synth saw name(bass)
    set bass time(1/16)

new sample kick_909 group(drums)
new sample snare_909 group(drums)
    set drums fx(drive)

    set all fx(reverb)
```

:::tip
The 4-spaces indent with `tab` in the example above is not mandatory but can help to keep your code readable
:::

<!-- Alias: `give`, `apply` -->

## print

Use the print action to view the content of a `list` or the result of a `list-function`. The result is printed in the console window.

```js
list rnd random(12)
list sin spread(10 0 100)

print rnd
print sin
```

## silence

Use silence to disable all sounds. Alternatively you can hit the `Alt/Ctrl + .` shortkey to disable everything. 

<!-- *Note* : Silencing the instruments is not the same as disabling the Audio (below). In this case the instruments are deleted, but the signal-chain is still processing in order to be able to quickly start the sound when a new instrument is generated. -->

```js
silence
```

:::tip
In a performance situation this code is usually not desirable to use. Instead use `gain(0)` to (temporarily) pause instruments or use `//` to comment instruments and disable them.
:::

:::note
**Deprecated:** `killAll`

In earlier versions this was named `killAll`, but: **make love, not war ✌️☮️✌️**
:::
<!-- ## console

Show the console to see the printed output or other error messages from the code. Clear the console as well.

```js

console show
console empty
```

## audio

Disable/enable the Digital Signal Processing (DSP) engine. This can also be done via the interface and is usually not desirable to use during coding sessions.

```
audio <1-0>
``` -->