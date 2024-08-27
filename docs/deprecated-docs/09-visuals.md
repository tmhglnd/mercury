# Visuals

Mercury has some options to add visuals to your live coding performance. These visuals are pre-coded and stored in seperate Max patch files. You can add extra visuals by putting the visual patches in the folder `~Documents/Mercury/Library`. For the visual to work you should make use of the `template.maxpat` provided in `mercury/mercury_ide/patchers/visual/`.

## new visual

Add a new visual with the keywords `new visual` followed by the name of the patcher file.

```java
new visual meshwave
```

## analyzer

The visuals make use of amplitude and frequency analysis of the played sounds for audioreactive results. The settings for this can be adjust in the analyzer. Also the responsiveness can be displayed via de analyzer.

#### gui

Display the gui of the analyzer (on/off)

```java
set analyzer gui on
```

#### gain

Adjust the input gain for the analyzer (default=1)

```java
set analyzer gain 0.9
```

#### lo

Adjust the cutoff, attack and release times in milliseconds for the lowpass audio analysis. Lowpass is the low frequency range of the sum of the Left and Right channels. 

**arguments**

- cutoff -> (default = 120)
- attack -> (default = 2)
- release -> (default = 40)

```java
set analyzer lo cutoff 120
set analyzer lo attack 10
set analyzer lo release 150
```

#### hi

Adjust the cutoff, attack and release times in milliseconds for the highpass audio analysis. Highpass is the high frequency range of the sum of the Left and Right channels. 

**arguments**

- cutoff -> (default = 1600)
- attack -> (default = 1)
- release -> (default = 150)

```
set analyzer mid attack 10
set analyzer mid release 150
```

#### mid

Adjust the attack and release times in milliseconds for the mid audio analysis. Mid is the sum of the Left and Right channels.

**arguments**

- attack (default = 5)
- release (default = 40)

```java
set analyzer mid attack 10
set analyzer mid release 150
```

#### side

Adjust the attack and release times in milliseconds for the side audio analysis. Side is the difference between the Left and Right channels.

**arguments**

- attack (default = 2)
- release (default = 110)

```java
set analyzer side attack 10
set analyzer side release 150
```

## set visual

Adjust settings for visuals or effects with the keywords `set visual` followed by what settting you would like to adjust

```java
set visual brightness 0.5
```

## external

Use an external texture via Syphon on some of the visuals that allow the usage of textures (for example `plane`).

```java
set visual external on
// turn on the texture input

set visual external getServers
// get available getServers

set visual external server Max
// set the server for Syphon

set visual external dim 512 512
// change the resolution of the texture

set visual external width 0.8
// adjust the width of the texture
```

