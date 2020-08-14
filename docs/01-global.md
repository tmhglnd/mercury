# Global Settings (set)

## tempo

Change the global tempo in Beats Per Minute (BPM), counted in quarter-notes. Second argument sets a ramptime in milliseconds to gradually change the tempo over the provided amount of time (*!WARNING: experimental and may lag/glitch!*)

**arguments**
- {Number+} -> The BPM as a positive number
- {Number} -> The ramptime (optional/experimental)

```java
set tempo 128

set tempo 80 5000
```

## scale

Set the scale in a 12-TET system for which all the played notes will be mapped to. An optional second argument sets the tone-center (or root) for the scale. The default scale and root is `chromatic c`

**arguments**
- {Name} -> the scale name
- {Name} -> the root (optional, default=c)

```java
set scale major D#

set scale minor_harmonic Eb
```

Currently available scales are:
```
"chromatic" :            [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,  10, 11],
"major" :                [0, 0, 2, 2, 4, 5, 5, 7, 7, 9,  9,  11],
"minor" :                [0, 0, 2, 3, 3, 5, 7, 7, 8, 8,  10, 10],
"minor_melodic" :        [0, 0, 2, 3, 3, 5, 7, 7, 9, 9,  11, 11],
"minor_harmonic" :	     [0, 0, 2, 3, 3, 5, 7, 7, 8, 8,  11, 11],
"dorian" :               [0, 0, 2, 3, 3, 5, 5, 7, 7, 9,  10, 10],
"phrygian" :             [0, 1, 1, 3, 3, 5, 7, 7, 8, 8,  10, 10],
"lydian" :               [0, 0, 2, 4, 4, 6, 6, 7, 7, 9,  11, 11],
"myxolydian" :           [0, 0, 2, 4, 4, 5, 5, 7, 7, 9,  10, 10],
"locrian" :              [0, 1, 1, 3, 3, 5, 6, 6, 8, 8,  10, 10],
"hungarian" :            [0, 0, 2, 3, 3, 6, 6, 7, 8, 8,  11, 11],
"gypsy" :                [0, 1, 1, 4, 4, 5, 5, 7, 8, 8,  11, 11],
"major_neapolitan" :     [0, 1, 1, 3, 3, 5, 7, 7, 8, 8,  11, 11],
"minor_neapolitan" :     [0, 1, 1, 3, 3, 5, 7, 7, 9, 9,  11, 11],
"hexatonic" :            [0, 0, 2, 2, 4, 4, 6, 6, 8, 8,  10, 10],
"hexatonic_blues" :      [0, 0, 2, 2, 4, 4, 6, 6, 7, 7,  10, 10],
"hexatonic_prometheus" : [0, 0, 2, 2, 4, 4, 6, 6, 9, 9,  10, 10],
"major_pentatonic" :     [0, 0, 2, 2, 4, 4, 7, 7, 7, 9,  9,  9],
"minor_pentatonic" :     [0, 0, 3, 3, 3, 5, 5, 7, 7, 10, 10, 10]
```

The naming convention and offsets for the roots are:
```
-6 gb Gb ges Ges
-5 g  G
-4 g# G# gis Gis
-4 ab Ab as  As
-3 a  A
-2 a# A# ais Ais
-2 bb Bb bes Bes
-1 b  B 
-1 cb Cb ces Ces
+0  b# B# bis Bis
+0  c  C
+1  c# C# cis Cis
+1  db Db des Des
+2  d  D
+3  d# D# dis Dis
+3  eb Eb es  Es
+4  e  E
+4  fb Fb fes Fes
+5  e# E# eis Eis
+6  f  F
```

## scalar

Scalar transposition, All the current notes are shifted up or down a certain amount of semitones but remaps the notes to the set scale. This is different from transposing the scales.

**arguments**
- {Int} -> scalar to shift notes by

```java
set scalar 2
```

## randomSeed

Set the random seed as integer for the psuedorandom number generators used in all functions across the environment. Setting the seed to a fixed integer will help make sure random values keep the same sequence every time you re-evaluate the code. A second optional argument resets the seed every n-bar, which can be useful for random arguments used outside ring generation, such as `pan(random)` or `beat(0.5)`

**arguments**
- {Int+} -> the seed for the psudeorandom number generators (default=0)
- {Number} -> reset time in n-bars, or divisions (optional, default=null)

```java
set randomSeed 31415
set randomSeed 1618 2
```

## volume

Set the global volume in floating-point amplitude for all instruments across the entire environment. Additional ramptime in milliseconds can be provided to create fade-in/fade-out or smooth transitions to for dynamics.

**arguments**
- {Float} -> attenuate the total volume of all instruments (default=1)
- {Int+} -> ramptime in milliseconds (optional, default=0)

```java
set volume 0.5 5000
```

## highPass

Set the global highPass filter cutoff in Hz for all instruments across the entire environment. Additional ramptime in milliseconds can be provided to create smooth transitions from one value to another.

**arguments**
- {Float+} -> cutoff frequenzy in Hertz
- {Int+} -> ramptime in milliseconds (optiona, default=0)

```java
set highPass 900 5000
```

## lowPass

Set the global low-pass filter cutoff in Hz for all instruments across the entire environment. Additional ramptime in milliseconds can be provided to create smooth transitions from one value to another.

**arguments**
- {Float+} -> cutoff frequenzy in Hertz
- {Int+} -> ramptime in milliseconds (optiona, default=0)

```java
set lowPass 900 5000
```

## osc

Set the ip-address, in-port and out-port number for the network to transmit OSC-messages over using UDP. Default settings are 8000 (in-port), 9000 (out-port), localhost (127.0.0.1) (ip).

**arguments**
- {Int+} -> receiving port (default=8000)
- {Int+} -> sending port (default=9000)
- {Name} -> ip-address in the form of xxx.xxx.xxx.xxx or localhost (default=localhost)

```java
set osc default

set osc 8000 9000 127.0.0.1

set osc ip 127.0.0.1
set osc in 8000
set osc out 9000
```

## midiClock

Output midi clock sync message to sync an external device to the tempo of Mercury.

**arguments**
- {Name} -> getports, the midi portname or off (default=off)

```java
set midiclock getports
// returns port names in console

set midiclock midiPortName
// turn the clock on and 
// outputs clock-sync to midiport of that name

set midiclock off
// turn the clock off (default)
```
