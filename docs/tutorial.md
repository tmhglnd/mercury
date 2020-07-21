
# Mercury Tutorial 🤓

🚧 **work in progress** 🚧

Welcome to the Mercury Livecoding Environment! This tutorial will help you to get started with coding sound and music. The tutorial will explain the Mercury syntax, the basics in music theory, the concept of serialism in music and algorithmic composition.

First we will kick off with making a sampler to play a basic sound, changing the timing, changing the tempo, play more samples together and make a rhythm. We will also look into shaping the sound to our liking by changing the playback speed or the position where we start playing.

After that we will focus on creating a synthesizer that allows us to play different pitches. We'll see how we can make a melody with a list of numbers and make sure they stay in tune by applying a scale. With the synthesizer we will also focus on various ways to design the sound to our liking by changing the waveform, adding another waveform and changing the length of the sound. Then we'll look into applying different effects to the sound such as a filter, a echo and a reverb.

# Table of Contents

- [Install Mercury](#-install-mercury)
- [Launch Mercury](#-launch-mercury)
- [Sampler](#-sampler)

# 💻 Install Mercury

1. Mercury runs in Max8 (sometimes also called MaxMSP), a node-based creative coding environment from Cycling'74. You can download Max8 through any of the links below. At the moment Mercury seems to run best in Max8.0.8. **You do not need to buy a license in order to use Mercury!** 😎

- [Windows](https://akiaj5esl75o5wbdcv2a-maxmspjitter.s3.amazonaws.com/Max808_x64_190808.zip)
- [Mac](https://akiaj5esl75o5wbdcv2a-maxmspjitter.s3.amazonaws.com/Max808_190808.dmg)
- If links are not working you can go to [https://cycling74.com/downloads/older](https://cycling74.com/downloads/older)

2. Once you installed Max8 you can launch it. It will create a Max8 folder in your Documents. In here you can locate the Projects folder. `~/Documents/Max 8/Projects`

3. Now you can [download the latest release](https://github.com/tmhglnd/mercury/releases) or clone/fork Mercury to the Projects folder in your Documents.

	```
	Download zip and unpack in ~/Documents/Max 8/Projects
	```
	Or via commandline
	```
	$ cd ~/Documents/Max\ 8/Projects
	$ git clone http://github.com/tmhglnd/mercury
	```

# 🚀 Launch Mercury

Launch Mercury by double clicking `mercury_ide.maxproj`.

- ⏳ Give it some time to load, this might take a bit depending on your computers processor.

Once it's ready you will see 2 windows. The `_mercury_main` window and a (still black) window named `mercury`. The main window is used to quickly access the most important functions in Mercury such as turning the audio on/off and starting a recording of your sound. When you turn the Rendering on you will start to see the text-editor in the `mercury` window. This is the window were you will type your code.

<!-- 
## _mercury_main window

The main window is used to quickly access some of the most important functions in Mercury. From here you can do the following:

- Enable Rendering
	- Turn the rendering on/off, this will show the text-editor in the `mercury` window, and also optionally show the visuals when you choose to code those.
- Enable Audio
	- Turn the audio on/off, this will turn the audio processing which allows you to hear the sound that is generated.
- Volume
	- Adjust the volume with the slider if necessary.
- Auto Log Code
	- Turn the code logging mode on/off. This will store a .txt of your code every time you execute it.
- Start Record Audio 
	- Start a recording of the sound that you currently hear. Click again to stop the recording. The file is stored in your Documents in the folder Mercury.
- Show Variables
- Show Audiofiles
- Use External Editor -->

- 📺 Turn the **Rendering on**
- 🔈 Turn the **Audio on**

You are now ready to start coding your first sounds! 🎶💻🎶

# 💾 The sampler

A big part of electronic music (but for sure also in many other music genres) is the use of samples. The word sample can have different meanings accross various musical contexts. 

The first definition of the word sample is a recording of one "hit" or "note" of an instrument. This can for example be the hit of a drum, the plucking of a guitar string or the playing of one piano key. 

The second definition of the word sample is a small portion of a larger recording. For example a recording of a vocal where you cut small pieces out to play, or a piano piece of which you play small pieces (read samples) randomly. 

A third definition of a sample can be a snippet of an original song that is exactly one measure. This can be a drumbeat for example, and by cutting it exactly into one measure you can repeat it. These types of samples are also called `loops` because they can be played over and over seamlessly. 

By playing a sample repeatedly we can make a beat. Layering multiple samples with different timings will create a rhythm. 

## One `sample`

Type the following code: 
```java
new sample kick_house
```

Now hit `alt + return` (or click File > Execute Code). Mercury will now evaluate your code, which is also called execute or running.

You have now created a `new sample` with the filename `kick_house` and hear it play repeatedly. This repetition is also called a `loop`. A cool feature of Mercury is that all the instruments are always immediately `looping` 🔁.

Now hit `alt + .` (or click File > Silence Code). This will turn all the instruments off.

## What's the `time()`?

By default the sample will play its sound once per measure. In most western pop music a measure has four counts (1, 2, 3, 4, 1, 2, 3, 4, 1, etc.). If we want to play this sample four times per measure we use the `time()` fuction. The argument for the function will be the division we want to count, in this case `1/4` because we want four counts in 1 measure.

Change your code and execute:
```java
new sample kick_house time(1/4)
```

Hear how it has changed its speed? It is now 4 times faster then before. But the cool thing with coding is that we don't have to limit ourselves to what we are used to. For example, why not change it to `1/5` or `1/9` so we have 5 or 9 counts per measure. Or maybe change it to `3` or `7`, this will give us a sound once per 3 or 7 measures (playing slower).

## More samples

Let's make things a bit more interesting by adding more samples. For example a drumbeat usually consists of a kick (or bassdrum), a snare (or snaredrum) and a hihat. All this sounds can have a different timing they need to be played to create the beat you want. The most basic beat (or groove) has a kick 4 times per measure, a snare 2 times and a hihat 8 times.

Change your code and execute:
```java
new sample kick_house time(1/4)
new sample snare_fat time(1/2)
new sample hat_click time(1/8)
```

Now you hear a basic drumbeat that you are probably familiar with. Try making it more interesting by changing any of the `time()` arguments. 

For example:
```java
new sample kick_house time(3/16)
new sample snare_fat time(3/4)
new sample hat_click time(1/12)
```

### Other sounds

You can of course also try other samples that are included in Mercury! A full list of samples is available [here](https://github.com/tmhglnd/mercury/blob/master/mercury_ide/media/README.md). Try for example: `bamboo_g`, `shatter`, `tabla_mid`

## Changing `tempo`

Now when you hear this beat it might sound great, but maybe you want it to play a bit faster or slower all together. It would be very hard to find the correct `time()` values for different speeds in such a way that the rhythm still sounds the same. Luckily you can change the global tempo of the environment which affects all the playing instruments.

Change your code to the following and execute:
```java
set tempo 80

new sample kick_house time(3/16)
new sample snare_fat time(3/4)
new sample hat_click time(1/12)
```

Try a tempo of `110`, `140`, `180`, and even `300`! All the different tempos give the groove a different feeling as well and may change your perception on rhythm of all the instruments combined. This rhythm is called a composite rhythm.

The tempo is definited in BPM, or Beats Per Minute on a quarter note (`1/4`). This means that when the tempo is `100`, you can fit 100 quarter notes in one minute. The time between these notes will therefore be `60000 ms / 100 beats = 600 ms`. When the tempo goes higher (read faster) the time between notes will get shorter. Eg. the time-interval with a tempo of `140` is `60000 ms / 150 beats = 400 ms`

>The `set` command is a command that allows you to change parameters of global settings such as the tempo. Later on we'll see how to use it for instruments as well.

## A `beat()` and `ring`

After a while of playing with these divisions and tempo you will maybe think to yourself: 

>"Would it also be possible to play this sample in the same tempo and timing, but maybe not all the time?"

This is where we will introduce `ring`'s and the `beat()` function.

### Musical notation systems

[*skip history lesson*](#the-ring)

Maybe you are familiar with the modern western [music notation](https://en.wikipedia.org/wiki/Musical_notation). A notation system consisting of five horizontal lines stretching over the paper. At the beginning of the lines a so called clef is drawn, denoting the position of the note G or F depending on the type of clef. From that point onwards notes can be written down by using various symbols on the paper (usually oval shaped), where the vertical position of the symbol (on or between the lines) determines the pitch (how high or low is the note), the horizontal position together with the symbol itself determines the timing and length of the note (when is it played and for how long).

This western notation system is a form of musical representation originating from [Neume](https://en.wikipedia.org/wiki/Neume) in 800 CE. But other parts of the world like [India](https://www.google.com/search?q=india+traditional+musical+notation&tbm=isch&ved=2ahUKEwiA95P_ht7qAhX3wAIHHW8DBmsQ2-cCegQIABAA&oq=india+traditional+musical+notation&gs_lcp=CgNpbWcQA1DvA1jvA2DqBWgAcAB4AIABLogBLpIBATGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=cbgWX8D6KveBi-gP74aY2AY&bih=821&biw=1440), [Russia](https://www.google.com/search?q=russian+musical+notation&tbm=isch&ved=2ahUKEwjxtMDoht7qAhUGG-wKHTtuDFoQ2-cCegQIABAA&oq=russian+musical+notation&gs_lcp=CgNpbWcQAzIECAAQGDoGCAAQBxAeOggIABAIEAcQHlD_Z1j1bGDVbmgAcAB4AIABQ4gB7AKSAQE3mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=QrgWX_GLDIa2sAe73LHQBQ&bih=821&biw=1440) and [China](https://www.google.com/search?q=chinese+traditional+musical+notation&tbm=isch&ved=2ahUKEwiJ9u31ht7qAhXaOewKHbbZBCYQ2-cCegQIABAA&oq=chinese+traditional+musical+notation&gs_lcp=CgNpbWcQA1CqEFiTIWDfImgBcAB4AIABSIgBgQWSAQIxM5gBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=XrgWX4nPDNrzsAe2s5OwAg&bih=821&biw=1440) developed there own notations over the centuries. In the 50's and later many composers have been experimenting with other forms of notation as well, named [graphic notation](https://en.wikipedia.org/wiki/Graphic_notation_(music)), to find new ways of capturing musical expression that does not work in the modern western notation. Have a look at some of these [graphical notations](https://www.google.com/search?q=graphical+music+notation&tbm=isch&ved=2ahUKEwiFwM6Oh97qAhUFt6QKHZ4uCloQ2-cCegQIABAA&oq=graphical+music+notation&gs_lcp=CgNpbWcQAzoCCAA6BggAEAUQHjoGCAAQCBAeOgQIABAYOgYIABAKEBg6CAgAEAgQBxAeUKEOWPAuYP8vaAFwAHgAgAE4iAHNA5IBAjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=krgWX4WvB4XukgWe3ajQBQ&bih=821&biw=1440). They are already a piece of art even without the musical output.

Around 1920 a new form of composition technique, [*Serialism*],(https://en.wikipedia.org/wiki/Serialism) was described by Josef Hauer and used avidly by composer Arnold Schoenberg. Serialism uses series (or sequences) of values to describe various musical parameters. A series could hold for example pitch information (such as note names c e g f), but could also have rhythmical information. In this way all components (pitch, length, dynamics, articulation and more) of a note can be captured in a series and used to compose with. More on this will be discussed in the section [Algorithmic Composition](#algorithmic-composition)

## The `ring`

Mercury is heavily based on the concept of *Serialism*. Therefore parameters such as pitch and rhythm can be expressed in a series of values. This series is refered to as a `ring`. It is called a ring because the serie (sequence) is circular. Every instrument has an internal counter. This counter increments for every time it plays based on the time-interval from `time()`. This is also called the sequencer. When a ring is added as argument the instrument uses its count as a lookup-position (index) taking the corresponding value in the serie. As soon as the index is higher then the amount of values in the serie it will return to the beginning and start over, hence a circular array or `ring`. 

## speed()

## shape()

## 

### Algorithmic Composition

For many years composers have also been experimenting with ways to create new musical pieces. For example in 1792 the famous classical composer Mozart used a game called [*Muzikalisches Würfelspiel*](https://en.wikipedia.org/wiki/Musikalisches_W%C3%BCrfelspiel) (german for "musical dice game"), where he would first compose 176 short pieces of music with the length of one measure. Then by rolling some dice he would decide which pieces come after one another. This is a form of what is called [*Algorithmic Composition*](https://en.wikipedia.org/wiki/Algorithmic_composition). Composing music based on a predefined set of rules also called an algorithm. More on Algorithmic Composition will be explained further ahead.

Around 1920 a new form of composition technique was described, namely `Serialism`. Serialism originated from the `twelve-tone` technique, described in 1919 by Josef Hauer in his published work "Law of the twelve tones". This technique starts out with a randomly ordered set of the twelve chromatic notes. From there on out you can apply transformations on this set, such as reverse/retrograde, inverse, transpose, and combinations between those.
