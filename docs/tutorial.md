
# 🤓 Mercury Tutorial

🚧 **work in progress** 🚧

Welcome to the Mercury Livecoding Environment! This tutorial will help you to get started with coding sound and music. The tutorial will explain the Mercury syntax, the basics in music theory, the concept of serialism in music and algorithmic composition.

First we will kick off with making a sampler to play a basic sound, changing the timing, changing the tempo, play more samples together and make a rhythm. We will also look into shaping the sound to our liking by changing the playback speed or the position where we start playing.

After that we will focus on creating a synthesizer that allows us to play different pitches. We'll see how we can make a melody with a list of numbers and make sure they stay in tune by applying a scale. With the synthesizer we will also focus on various ways to design the sound to our liking by changing the waveform, adding another waveform and changing the length of the sound. Then we'll look into applying different effects to the sound such as a filter, a echo and a reverb.

While working on this tutorial you might run into some issues where something is not working as expected or as mentioned in the tutorial. This can have many different reasons. The first thing you can do is go to the [**troubleshooting**]() page and see if you can find your problem there. The next thing you can do is try to restart Mercury and see if that solves the issue. If none of that worked you can check the [**issues**](https://github.com/tmhglnd/mercury/issues) to see if your problem was already reported by someone else. If not, you can file a [new issue](https://github.com/tmhglnd/mercury/issues/new) yourself. An other possibility for the issue is that this tutorial actually has an typ-o or error of some kind. 

**You are welcome to edit this tutorial and make a pull request** :pray:

# Table of Contents

- [Install Mercury](#-install-mercury)
- [Launch Mercury](#-launch-mercury)
- [The Sampler](#-the-sampler)
	- [One `sample`]()
	- [What's the `time()`?]()
	- [More samples]()
	- [Changing `tempo`]()
	- [A `beat()` and `ring`]()
		- [Musical Notation Systems]()
		- [The `ring`]()
		- [To `play(1)` or not to `play(0)`]()
		- [Linear beats]()
	- []()
- [The Synth](#-the-synth)
	- []()
		- []()
- [Power of Algorithms](#-power-of-algorithms)

# 💻 Install Mercury

Mercury runs in Max8 (sometimes also called MaxMSP), a node-based creative coding environment from Cycling'74. **You do not need to buy a Max-license in order to use Mercury!** 😎

1. Please download Max8 through any of the links below.

- [Windows](https://cycling74.com/downloads)
- [Mac](https://cycling74.com/downloads)
- If links are not working you can go to [https://cycling74.com/downloads/older](https://cycling74.com/downloads/older)

2. Once you installed Max8 you can launch it. It will create a `Max 8` folder in your `Documents`. In there you may create a folder named `Projects`. The full path should now look like this: `<User>/Documents/Max 8/Projects`

3. Now [download the latest update]([https://github.com/tmhglnd/mercury/releases](https://github.com/tmhglnd/mercury/archive/refs/heads/master.zip))

	```
	Download latest Mercury version and unzip entire folder in ~/Documents/Max 8/Projects
	```
	
	Now your filepath should look something like: `<User>/Documents/Max 8/Projects/mercury-v.0.13.0-alpha`

# 🚀 Launch Mercury

Launch Mercury by double clicking `mercury_ide.maxproj` located in the folder `mercury-v.x.x.x/mercury-ide`.

- ⏳ Give it some time to load, this might take a bit depending on your computers processor.

Once it's ready you will see two windows:

1. The `_mercury_main` window 
2. The  `mercury` window (still black). 

The main window is used to quickly access the most important functions in Mercury such as turning the audio on/off and starting a recording of your sound. When you turn the Rendering on you will start to see the text-editor in the `mercury` window. This is the window were you will type your code.

- 📺 Turn the **Rendering on**
- 🔈 Turn the **Audio on**

You are now ready to start coding your first sounds! 🎶💻🎶

[**🚧 If you experience any issues, please see the Troubleshooting 🚧**](./08-troubleshooting.md)

# 💾 The Sampler

[skip introduction](#one-sample)

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

Let's make things a bit more interesting by adding more samples. For example a drumbeat usually consists of a kick (or bassdrum), a snare (or snaredrum) and a hihat. All these sounds can have a different timing that creates the beat you want. The most basic beat (or groove) has a kick 4 times per measure (called *four-on-the-floor*), a snare 2 times and a hihat 8 times.

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

You can of course also try other samples that are included in Mercury! A full list of samples is available [here](https://github.com/tmhglnd/mercury/blob/master/mercury_ide/media/README.md). Try for example: `bamboo_g`, `shatter`, `tabla_mid`. And if you want to include your own sounds you can read all about that [here](./07-environment#sounds)

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

## `play()` and `ring`

After a while of playing with these divisions and tempo you will maybe think to yourself: "Would it also be possible to play this sample in the same tempo and timing, but maybe not all the time?"

This is where we will introduce `ring`'s and the `play()` function. But before we start making rhythms, let's first have a quick look at various forms of music notation systems.

### Musical notation systems

[*skip history lesson*](#the-ring)

Maybe you are familiar with the modern western [music notation](https://en.wikipedia.org/wiki/Musical_notation). A notation system consisting of five horizontal lines stretching over the paper. At the beginning of the lines a so called clef is drawn, denoting the position of the note G or F depending on the type of clef. From that point onwards notes can be written down by using various symbols on the paper (usually oval shaped), where the vertical position of the symbol (on or between the lines) determines the pitch (how high or low is the note), the horizontal position together with the symbol itself determines the timing and length of the note (when is it played and for how long).

This western notation system is a form of musical representation originating from [Neume](https://en.wikipedia.org/wiki/Neume) in 800 CE. But other parts of the world like [India](https://www.google.com/search?q=india+traditional+musical+notation&tbm=isch&ved=2ahUKEwiA95P_ht7qAhX3wAIHHW8DBmsQ2-cCegQIABAA&oq=india+traditional+musical+notation&gs_lcp=CgNpbWcQA1DvA1jvA2DqBWgAcAB4AIABLogBLpIBATGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=cbgWX8D6KveBi-gP74aY2AY&bih=821&biw=1440), [Russia](https://www.google.com/search?q=russian+musical+notation&tbm=isch&ved=2ahUKEwjxtMDoht7qAhUGG-wKHTtuDFoQ2-cCegQIABAA&oq=russian+musical+notation&gs_lcp=CgNpbWcQAzIECAAQGDoGCAAQBxAeOggIABAIEAcQHlD_Z1j1bGDVbmgAcAB4AIABQ4gB7AKSAQE3mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=QrgWX_GLDIa2sAe73LHQBQ&bih=821&biw=1440) and [China](https://www.google.com/search?q=chinese+traditional+musical+notation&tbm=isch&ved=2ahUKEwiJ9u31ht7qAhXaOewKHbbZBCYQ2-cCegQIABAA&oq=chinese+traditional+musical+notation&gs_lcp=CgNpbWcQA1CqEFiTIWDfImgBcAB4AIABSIgBgQWSAQIxM5gBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=XrgWX4nPDNrzsAe2s5OwAg&bih=821&biw=1440) developed there own notations over the centuries. In the 50's and later many composers have been experimenting with other forms of notation as well, named [graphic notation](https://en.wikipedia.org/wiki/Graphic_notation_(music)), to find new ways of capturing musical expression that does not work in the modern western notation. Have a look at some of these [graphical notations](https://www.google.com/search?q=graphical+music+notation&tbm=isch&ved=2ahUKEwiFwM6Oh97qAhUFt6QKHZ4uCloQ2-cCegQIABAA&oq=graphical+music+notation&gs_lcp=CgNpbWcQAzoCCAA6BggAEAUQHjoGCAAQCBAeOgQIABAYOgYIABAKEBg6CAgAEAgQBxAeUKEOWPAuYP8vaAFwAHgAgAE4iAHNA5IBAjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=krgWX4WvB4XukgWe3ajQBQ&bih=821&biw=1440). They are already a piece of art even without the musical output.

Around 1920 a new form of composition technique, [*Serialism*],(https://en.wikipedia.org/wiki/Serialism) was described by Josef Hauer and used avidly by composer Arnold Schoenberg. Serialism uses series (or sequences) of values to describe various musical parameters. A series could hold for example pitch information (such as note names c e g f), but could also have rhythmical information. In this way all components (pitch, length, dynamics, articulation and more) of a note can be captured in a series and used to compose with. More on this will be discussed in the section [Algorithmic Composition](#algorithmic-composition)

### The `ring`

Mercury has its roots in the concept of *Serialism*, where parameters such as pitch and rhythm are expressed in a series of values that adjust the instruments state over time. This series in Mercury is refered to as a `ring`. It is called a ring because the serie (or sequence) is circular. Every instrument has an internal counter. This counter increments for every time an instrument triggers its sound. This is also called the sequencer. When a ring is added as argument the instrument uses its count as a lookup-position (index) taking the corresponding value in the serie. As soon as the index is higher then the amount of values in the serie it will return to the beginning and start over, hence a circular array or `ring`.

In order to create a ring you type the following code:
```java
ring myFirstRing [0.25 0.5 0 2 4 8 16 32]
```

The line starts with the code `ring`, followed by the name of the ring. The name can be any characters you like except for numerical values. All values between the `[` and `]` (square brackets) are part of the ring. Every value separated by a space is considered a new value. In this example the ring has 8 values starting at `0.25` and ending at `32`.

### To `play(1)` or not to `play(0)`

In order to create a rhythm for an instrument we can make a ring consisting of zeroes and ones. The `1` represents a `TRUE` value, resulting in the triggering of the sound, the `0` a `FALSE` value that will not play. Now lets put this into practice. In order to keep it simple for now we erase the previous code and work with only one instrument. 

Type the following and execute:
```java
set tempo 115

new sample hat_click time(1/16) play(1)
```

This will sound similar to what we heard before. This is because the `play()` function only has a single `1` as argument, which means all notes are played. This is actually the default and was already the case in the code above. Now we create a ring with zeroes and ones and apply the name of the ring as argument in the function.

Change your code and execute:
```java
set tempo 115

ring aRhythm [1 0 0 1 0 1 1 0]

new sample hat_909 time(1/16) play(aRhythm)
```

Hear how the rhythm is applied to the sample. Every 16th note (`1/16`) the internal counter from that instrument looks up a value from the `ring aRhythm`. When it is a `1` it is played, when it is a `0` it is not. 

Now try some different rhythms of different lengths, for example: `[0 1 0 0 1]`, `[1 1 0 1 1 0 0]`, `[1 1 1 0]`.

>In Mercury most functions have synonyms, meaning that different words do the same thing. This originated from the fact that people come from different backgrounds and are used to using different words with the same meaning. For example `play()` can also be written as `beat()` and `rhythm()`. This may sound confusing, but eventually this might help you remember and recall functions easier via a word that fits your way of thinking.

## Combining rhythms

In order to make more complex rhythms we can take a step back to our pop beat from [more samples](#more-samples). Now instead of using different `time()` arguments to make a rhythm, we will use the power of `ring`'s to look up a `1` or `0` to let it play the sound or not. First we make sure that all instruments play in the same time.

Make the following code:

```java
set tempo 95

new sample kick_house time(1/16) play(1)
new sample snare_fat time(1/16) play(1)
new sample hat_click time(1/16) play(1)
```

Execute this code and you will hear all samples play all 16th notes. Now we create different rings for the different instruments. Notice the rings don't have to be the same length. They will each *loop* individually. This allows you to quickly create quite complex rhythms that change over time with just a few lines of code!

Adjust and execute:
```java
set tempo 95

ring kickBeat [1 0 0]
ring snareBeat [0 0 0 0 1 0 0 0]
ring hatBeat [1 1 0 1 1 0 1]

new sample kick_house time(1/16) play(kickBeat)
new sample snare_fat time(1/16) play(kickBeat)
new sample hat_click time(1/16) play(kickBeat)
```

## Linear beats

Instead of using multiple instruments to create our beat, we can also use one sampler and let it play different sounds. For this we need to declare a ring with the names of the samples in the order we want to play them. The playing of samples without any overlap or playing at the same time is sometimes called a *linear beat*. For example we want to play kick, hat, snare, hat. 

Now our code will look like this:
```java
set tempo 110

ring theSounds [kick_house hat_click snare_fat hat_click]

new sample theSounds time(1/8)
```

Now to make this a bit more interesting we can combine this technique with another ring that holds some zeroes and ones to play a rhythm at a time of `1/16`.

For example like so:
```java
set tempo 110

ring theSounds [kick_house hat_click snare_fat hat_click]
ring rhythm [1 0 1 0 0 1 0 1]

new sample theSounds time(1/16) play(rhythm)
```

Give yourself some time to experiment with all the code so far to get yourself comfortable with the different functions and their arguments and making of rings. Try some different rhythms in various lengths, try some different samples in different orders as well. Have fun!

There is still so much to do with just the sampler, but for now we'll first introduce another instrument in Mercury: the Synthesizer.

<!-- ## speed() -->

<!-- ## shape() -->

<!-- ## offset() -->

<!-- ## fx() -->

<!-- ## time() 2nd argument -->

<!-- ## beat() resets 2nd argument -->

# 🎹 The Synth

[skip introduction]()

A synthesizer is an electronic musical instrument that generates its sound through analog electrical circuits or in a digital manner through chips and computer code. Generating sounds in these ways is called synthesis. The first instrument that was defined as a synthesizer ([the Moog](https://en.wikipedia.org/wiki/Moog_synthesizer)) was introduced in 1964, but before that there were already other electrical instruments available such as the [Theremin](https://en.wikipedia.org/wiki/Theremin) (1928) and the [Hammond Organ](https://en.wikipedia.org/wiki/Hammond_organ) (1935). 

The basic building blocks needed to do synthesis are one or multiple oscillators (audio signal generators), methods to add or multiply signals and filters to remove parts of a signal. By combining these in different ways you can perform a wide variety of synthesis techniques, such as [additive synthesis](https://en.wikipedia.org/wiki/Additive_synthesis), [subtractive synthesis](https://en.wikipedia.org/wiki/Subtractive_synthesis), [amplitude modulation synthesis](https://en.wikipedia.org/wiki/Amplitude_modulation), [ring modulation synthesis](https://en.wikipedia.org/wiki/Ring_modulation), [frequency modulation synthesis](https://en.wikipedia.org/wiki/Frequency_modulation), [physical modelling synthesis](https://en.wikipedia.org/wiki/Physical_modelling_synthesis), [analyse synthesis](https://en.wikipedia.org/wiki/Vocoder) (or resynthesis), [wavetable synthesis](https://en.wikipedia.org/wiki/Wavetable_synthesis) and [sample-based synthesis](https://en.wikipedia.org/wiki/Sample-based_synthesis). On top of that different techniques can of course be combined to generate even more sounds.

An oscillator is a signal generator that produces a periodic wave. This periodic wave is what drives your speaker (move it back and forth) and produces airpressure differences that you will perceive as sound. The four most common [waveforms](https://en.wikipedia.org/wiki/Waveform) are a sine-, sawtooth-, square- and triangle-wave. The name describes the shape of the wave if you would plot it in a graph of time against amplitude. The sinewave is a pure tone consisting of a single frequency. The pitch (how high or low does it sound) is called the Frequency and is expressed in Hertz (Hz). The other waveforms have a richer sound because they consist of more frequencies called harmonics. [Harmonics](https://en.wikipedia.org/wiki/Harmonic) can be defined as a range of stacked sinewaves of different frequencies on top of the [*fundamental* frequency](https://en.wikipedia.org/wiki/Fundamental_frequency). The relationship between these frequencies is different between the three waves (saw, square and triangle) and determines the *color* of the sound (also called [*timbre*](https://en.wikipedia.org/wiki/Timbre)). The timbre is that what makes an instrument sound like a flute, violin, guitar or voice, even if they play or sing the same note. 

## Play the `synth`

Now lets create our first synthesizer. For this we type the following code and execute it:

```java
new synth saw
```

You now hear the sawtooth waveform play a note. The default `time()` for the synth is `1`, the same as with the `sample`. Now try the other waveforms as well: `square`, `triangle`, `sine`. Notice that the triangle sounds a bit darker, this is because its harmonics aren't as loud as with the square and the saw. Also notice that the sine is almost impossible to hear (depending on your headphones or speakers). This is because the sine is just a single frequency, no harmonics. And the default frequency for the synth is quite low. 

## A `note()`

For now lets stick with the `sine` oscillator for a while and try to make some different pitches. In a moment we will look into how the notes work in Mercury, but first lets just try some different values to get a feeling of what happens to the sound.

Try these following code snippets and hear how the pitch changes, you can try as many other values as you want of course:

```java
new synth sine note(0 1)
```
```java
new synth sine note(7 1)
```
```java
new synth sine note(0 2)
```
```java
new synth sine note(7 2)
```

### 12-TET system

In our western music the most common tuning system is the so called 12-Tone Equal Temperament, or 12-TET. This means that we divide a full octave into 12 equal steps.

You've maybe heard of [Pythagoras](https://en.wikipedia.org/wiki/Pythagoras), a greek philospher and mathematician famous for the pythagorean theorem. He discoverd around 500 BCE that when you take a string (like a guitar) and make another string with half the distance, that string sounds twice as high in pitch. This doubling of pitch is called an Octave. This means that if you have a string with a frequency of 200 Hz, a string that is half that long will have a pitch of 400 Hz. Phytagoras took this idea and expanded it by taking a third of that string, a fourth, a fifth and so on. This let to the discovery of the harmonic series (for example 100 Hz, 200, 300, 400, 500...). 

The distance of an octave is quite big, and we can fit more pitches of different intervals in between two octaves. Pythagoras build its [tuning system](https://en.wikipedia.org/wiki/Pythagorean_tuning) based on stacking perfect fifths (ratio 3:2) and scaling down octaves to fit in one octave. This system had a slight problem that the octaves were slightly out of tune.

### Scales

Our current note name system - C D E F G A B - started out around the 12th century. At that time there was not really a notation system and scales (a ascending sequence of notes). The different scales were referred to as modes and all ended and started at a different note. These were later on defined as do, re, mi, fa, sol, la, ti and do again. Later on these became A up till G. The do's are both the same note only an octave higher, so they need to have the same name. In the past this was notated as A, a, aa for three octaves. Sometimes when the mode starts on a different letter, some notes are supposed to sound higher or lower. This is where the accidentals came in to play. If a not is made a bit lower, it is called flat (b) and a bit higher it is called sharp (#). This completed the 12 tone system that we know now. C, C#/Db, D D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B. You will notice that some notes don't have a sharp or flat note in between (E-F and B-C), this is because these notes are already a half-step apart, while all the other notes are actually a whole-step apart.

Since the 18th century the [12-Tone Equal Temperament](https://en.wikipedia.org/wiki/Equal_temperament) is used. In this system all the octaves are completely consonant over the entire range of the keyboard, and all the notes in between are at an equal distance from eachother. Because of this manner of tuning some notes are every so slightly out of tune when compared with the harmonic series ratios, but the system allows for quick switching between scales and tonal centre, and therefore it is still used mostly today. There are other tuning systems in the world as well, for example [Slendro](https://en.wikipedia.org/wiki/Slendro) is a 5-TET tuning system from Indonesia. 

From our tuning-system we can make various scales. The scale that has all the notes is called the [*chromatic*](https://en.wikipedia.org/wiki/Chromatic_scale) scale. Other scales usually consist of 7 notes picked from those 12 (originating from the modes). The distances between the 12 tones in the chromatic scale are called semitones (half steps). Most scales have a combination of tones and semitones (full and half steps). This is what is called a Diatonic scale. The most famous scales are the major and minor scale. The major scale when starting from C has no accidentals (C D E F G A B, with steps W W H W W W H), but when starting this same series from A you get a minor scale (A B C D E F G, with steps W H W W H W).

### Mercury Notation System

Now let's go back to our coding of notes. In Mercury the notes are not written down as letters, but as numbers. These numbers are added as arguments to the `note()` method. The arguments consist of 2 numbers, the first number is the tone-step in the chromatic 12-TET system, the second number is an octave-step. Later on we'll see how we can work with scales and changing the tonal centre as well. 

By default Mercury works with `C` as the tonal centre (or root) and `Chromatic` as the scale used. This means that the `note(0 0)` corresponds to the 1st note (counting starts at 0) in the 12-TET system (which is `C`) and the second `0` is the default octave. Now a `note(0 2)` would also be a `C`, only 2 octaves higher. A `note(7 1)` would be the 8th note in the 12-TET system starting at `C`, one octave higher, resulting in `G`

## A melody

Now that we know which numbers make up which notes we can make a melody. By putting the numbers in a ring and giving the name of the ring as argument to the `note()` function.

```java
ring myMelody [0 4 7 5 7 9 4 5]

new synth sine note(myMelody 2) time(1/8)
```

Try different numbers to hear which ones sound nice and which ones don't. You can also try different octaves as well or different waveforms of course. Maybe make a rhythm as well? It's all up to you! 🎶

## Harmony

When two or more melodic instruments play together you hear multiple pitches at the same time. This is called a harmony. We can make two instances of a `synth` and make different notes for them to play, like so:

```java
ring myMelody [0 4 7 5 7 9 4 5]
ring melodyTwo [7 7 5 5 4 4 0 0]

new synth sine note(myMelody 3) time(1/8)
new synth sine note(melodyTwo 2) time(1/8)
```

Or we can use the same melody from one `ring` but let the instruments play at different `time()` intervals.

```java
ring myMelody [0 4 7 5 7 9 4 5]

new synth sine note(myMelody 2) time(1/8)
new synth sine note(myMelody 1) time(1/6)
```

By adding a rhythm for the synths as well we can make more interesting compositions. The rhythm makes sure that every time a synth is played the next note from the ring is picked and the pitch is changed.

```java
ring myMelody [0 4 7 5 7 9 4 5]
ring myRhythm [1 0 0 1 0 0 1 0]

new synth sine note(myMelody 3) time(1/16) play(myRhythm)
new synth sine note(myMelody 2) time(1/12) play(myRhythm)
```

<!-- ## shape()

##  -->

# 🌈 Color the sounds

<!-- ## filter

## envelope filter

## drive

## reverb

## chip

## lfo -->

# 🎲 Power of Algorithms

### Algorithmic Composition

For many years composers have also been experimenting with ways to create new musical pieces. For example in 1792 the famous classical composer Mozart used a game called [*Muzikalisches Würfelspiel*](https://en.wikipedia.org/wiki/Musikalisches_W%C3%BCrfelspiel) (german for "musical dice game"), where he would first compose 176 short pieces of music with the length of one measure. Then by rolling some dice he would decide which pieces come after one another. This is a form of what is called [*Algorithmic Composition*](https://en.wikipedia.org/wiki/Algorithmic_composition). Composing music based on a predefined set of rules also called an algorithm. More on Algorithmic Composition will be explained further ahead.

Around 1920 a new form of composition technique was described, namely `Serialism`. Serialism originated from the `twelve-tone` technique, described in 1919 by Josef Hauer in his published work "Law of the twelve tones". This technique starts out with a randomly ordered set of the twelve chromatic notes. From there on out you can apply transformations on this set, such as reverse/retrograde, inverse, transpose, and combinations between those.
