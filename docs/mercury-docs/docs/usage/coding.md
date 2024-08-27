---
sidebar_position: -1
---

# 🤓 Coding in Mercury

Now that you got everything setup and are ready to start coding you're probably wondering: "How does this actually work?"

This short introduction will help you to get started with coding your first sounds and music. The guide will explain the Mercury *syntax*, some basics in (western) *music theory*, the concept of *serialism* in music and *algorithmic composition*.

First we will look briefly at what *Live Coding* is and how this works in Mercury. Then we will make a sampler to play a basic sound, changing the timing, changing the tempo, play more samples together and make a rhythm. We'll look at how we can create these rhythms with functions too to make the compisition *algorithmic*. After that we will focus on creating a synthesizer that allows us to play melodies. We'll see how we can make a melody with a list of numbers and apply a scale. We can also play chords and adjust the sound to our liking by changing the waveform,  changing the length of the sound and applying different effects such as a filter, a echo and a reverb. If you run into an issue please see the [**Troubleshooting**](troubleshooting) page.

:::tip More tutorials
**You can find many more bite-sized tutorials in the [Mercury Playground](https://mercury-playground.pages.dev/) in the bottom left corner drop down menu.**
:::

<!-- We will also look into shaping the sound to our liking by changing the playback speed or the position where we start playing. -->

## 👩🏽‍💻👨🏻‍💻👨🏾‍💻👩🏼‍💻 Live Coding

Live coding is about making software live, sometimes called *on-the-fly* or *just-in-time* programming. It is a form of peformance art where the artist is typing code on stage, this code is interpreted by the computer in real time and translated to sound or visuals (or sometimes even something else completely, like controlling robots). Live coding is not a specific genre, but can be applied across many art disciplines. There are dance events where live coding is used to create electronic music, these are usually called Algorave's. Live coding is also about openness, inclusion and accessibility, showing your code to the audience via a projection and thinking and improvising with it publically. Creating a welcoming environment where people can try and fail collectively. Sharing your code and knowledge and learning from others. And after all this live coding is still much more. You can read all about it in the book: ["Live Coding, A user's manual"](https://livecodingbook.toplap.org/), openly available as pdf and epub.

There are more people involved in live coding around the world! You can find them here: 

- TOPLAP Home: https://blog.toplap.org/
- Algorave Site: https://algorave.com/
- Eulerroom Youtube Livestreams: https://www.youtube.com/eulerroom
- Mercury Discord Server: https://discord.gg/vt59NYU

Live coding is not necessarily easy, but just like with playing an instrument such as guitar or drums, you can learn it by trying and practicing often. By following tutorials, visiting events, watching videos, listening music, you name it, you can find inspiration and ideas to make your own code and sounds.

Mercury was made with the idea to abstract away some more difficult parts of coding electronic music, and provide you (the artist/performer) with functions that get you to make music quickly.

## 💾 Playing a sample

A big part of electronic music (but for sure also in many other music genres) is the use of samples. The word sample can have different meanings accross various musical contexts. A sample can be a recording of a note of an instrument, or a small portion of a larger recording, or a snippet of an original song. 

### One `sample`

Empty the editor and type the following code and press `play` or use the shortkey `Alt + Enter`. Mercury will evaluate your code and start making sound (if there aren't any errors).

```js
new sample kick_house
```

:::info
Be aware of the spaces "` `" in the code between words, these are important!
:::

Because Mercury is made for live coding you will hear this sample and it is already playing repeatedly by default for you! This repetition is also called a *loop*. A cool feature is that all the instruments are always immediately *looping* 🔁.

You don't have to stop the sound when you make adjustments to the code. You can keep typing and every time just hit *evaluate*. The old sound will be replaced by the new sound automatically 🎉. For example add some other sounds on the lines below, evaluate, and hear the sounds play together. Mercury evaluates code `line-per-line`, so you have to start a new line with a new "action".

```js
new sample kick_house
new sample hat_min
new sample snare_808
```

:::tip
You can comment `//` a line to "mute" the instrument. Comments are parts of text in the code that are not evaluated when you click play. This is useful during live performances if you want to stop a sound from playing without removing the code.

```js
new sample kick_house
// the hihat is removed from the code
// new sample hat_min 
new sample snare_808
```
:::

### What's the `time()`?

By default every instrument will play its sound once per measure. In most western pop music a measure has four counts (1, 2, 3, 4, 1, 2, 3, 4, 1, etc.). If we want to play this sample four times per measure we use an `instrument-function` named `time()`. The argument for the function will be the `fraction` we want to count, in this case `1/4` if we want four counts in 1 measure. We can apply this function for the different samples to create a beat. The most basic beat (or groove) has a kick 4 times per measure (called *four-on-the-floor*), a snare 2 times and a hihat 8 times.

```js
new sample kick_house time(1/4)
new sample hat_min time(1/8)
new sample snare_808 time(1/2)
```

Now you hear a basic drumbeat that you are likely familiar with. Try making it more interesting by changing any of the `time()` arguments to different `fraction`'s. 

```js
new sample kick_house time(1/4)
new sample hat_min time(3/16)
new sample snare_808 time(5/8)
```

:::tip
You can use a second argument in `time()` to apply an offset, a short delay of the sound.
```js
new sample kick_house time(1/4)
// the hihat's time is 1/4, the same the kick, but the offset is 1/8
// so you'll hear exactly between every kick sound
new sample hat_min time(1/4 1/8)
```
:::

### Other sounds

You can of course also try other samples that are included in Mercury! A full list of samples is available in [**Sounds in Mercury**](sounds). Try for example: `bamboo_g`, `shatter`, `tabla_mid`.

### Changing `tempo`

When you hear this beat it might sound great, but maybe you want it to play faster or slower all together. You can change the overall (*global*) tempo of the environment with a `set` action.

```js
set tempo 80

new sample kick_house time(1/4)
new sample hat_min time(3/16)
new sample snare_808 time(5/8)
```

Try a tempo of `110`, `140`, `180`, and even `300`! All the different tempos give the groove a different feeling as well and may change your perception on rhythm of all the instruments combined. This perception is called a *composite rhythm*.

The tempo is definited in BPM, or *Beats Per Minute* on a quarter note (`1/4`). This means that when the tempo is `100`, you can fit 100 quarter notes in one minute. The time between these notes will therefore be `60000 ms / 100 beats = 600 ms`. When the tempo goes higher (read faster) the time between notes will get shorter. Eg. the time-interval with a tempo of `140` is `60000 ms / 150 beats = 400 ms`

>The `set` command is a command that allows you to change parameters of global settings such as the tempo. Later on we'll see how to use it for instruments as well.

### `play()` and `list`

After a short while of playing the tempo and time you maybe think to yourself: *"Is it also possible to play this sample in the same tempo and timing, but maybe with a different rhythm?"*

This is where we will introduce `list`'s as arguments to functions and the `play()` function. But before we start making rhythms, let's first have a quick look at various forms of music notation systems.

<details>
<summary>A brief history on Musical Notation Systems</summary>
<div>
Maybe you are familiar with the modern western [music notation](https://en.wikipedia.org/wiki/Musical_notation). A notation system consisting of five horizontal lines stretching over the paper. At the beginning of the lines a so called clef is drawn, denoting the position of the note G or F depending on the type of clef. From that point onwards notes can be written down by using various symbols on the paper (usually oval shaped), where the vertical position of the symbol (on or between the lines) determines the pitch (how high or low is the note), the horizontal position together with the symbol itself determines the timing and length of the note (when is it played and for how long).

This western notation system is a form of musical representation originating from [Neume](https://en.wikipedia.org/wiki/Neume) in 800 CE. But other parts of the world like [India](https://www.google.com/search?q=india+traditional+musical+notation&tbm=isch&ved=2ahUKEwiA95P_ht7qAhX3wAIHHW8DBmsQ2-cCegQIABAA&oq=india+traditional+musical+notation&gs_lcp=CgNpbWcQA1DvA1jvA2DqBWgAcAB4AIABLogBLpIBATGYAQCgAQGqAQtnd3Mtd2l6LWltZ8ABAQ&sclient=img&ei=cbgWX8D6KveBi-gP74aY2AY&bih=821&biw=1440), [Russia](https://www.google.com/search?q=russian+musical+notation&tbm=isch&ved=2ahUKEwjxtMDoht7qAhUGG-wKHTtuDFoQ2-cCegQIABAA&oq=russian+musical+notation&gs_lcp=CgNpbWcQAzIECAAQGDoGCAAQBxAeOggIABAIEAcQHlD_Z1j1bGDVbmgAcAB4AIABQ4gB7AKSAQE3mAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=QrgWX_GLDIa2sAe73LHQBQ&bih=821&biw=1440) and [China](https://www.google.com/search?q=chinese+traditional+musical+notation&tbm=isch&ved=2ahUKEwiJ9u31ht7qAhXaOewKHbbZBCYQ2-cCegQIABAA&oq=chinese+traditional+musical+notation&gs_lcp=CgNpbWcQA1CqEFiTIWDfImgBcAB4AIABSIgBgQWSAQIxM5gBAKABAaoBC2d3cy13aXotaW1nwAEB&sclient=img&ei=XrgWX4nPDNrzsAe2s5OwAg&bih=821&biw=1440) developed there own notations over the centuries. In the 50's and later many composers have been experimenting with other forms of notation as well, named [graphic notation](https://en.wikipedia.org/wiki/Graphic_notation_(music)), to find new ways of capturing musical expression that does not work in the modern western notation. Have a look at some of these [graphical notations](https://www.google.com/search?q=graphical+music+notation&tbm=isch&ved=2ahUKEwiFwM6Oh97qAhUFt6QKHZ4uCloQ2-cCegQIABAA&oq=graphical+music+notation&gs_lcp=CgNpbWcQAzoCCAA6BggAEAUQHjoGCAAQCBAeOgQIABAYOgYIABAKEBg6CAgAEAgQBxAeUKEOWPAuYP8vaAFwAHgAgAE4iAHNA5IBAjEwmAEAoAEBqgELZ3dzLXdpei1pbWfAAQE&sclient=img&ei=krgWX4WvB4XukgWe3ajQBQ&bih=821&biw=1440). They are already a piece of art even without the musical output.

Around 1920 a new form of composition technique, [*Serialism*](https://en.wikipedia.org/wiki/Serialism) was described by Josef Hauer and used avidly by composer Arnold Schoenberg. Serialism uses series (or sequences) of values to describe various musical parameters. A series could hold for example pitch information (such as note names c e g f), but could also have rhythmical information. In this way all components (pitch, length, dynamics, articulation and more) of a note can be captured in a series and used to compose with. More on this will be discussed in the section [Algorithmic Composition](#algorithmic-composition)
</div>
</details>

### The `list`

Mercury finds its roots in the concept of *Serialism*, a musical composition style where all parameters such as pitch, rhythm and dynamics are expressed in a series of values that adjust the instruments state over time. This series in Mercury is refered to as a `list`. Every instance of an instrument has an internal counter. This counter increments (0, 1, 2, 3,... etc) when an instrument triggers an event based on the time-interval from `time()`. This is also called a step-sequencer. When a `list` is added as argument to an `instrument-function` the instrument uses its count as a lookup-position (index) taking the corresponding value from the list. As soon as the index is higher then the amount of values in the `list` it will return to the beginning and start over, therefore the `list` is circular/looping.

```js
list <name> [ value0 value1 ... value-n ]
list <name> function()
```

The line starts with the code `list`, followed by the `name` of the list. The name can be any 3 or more characters you like. All values between the `[` and `]` (square brackets) are part of the list. Every value must be separated by a space "` `".

:::info 
Lists have to be created on a line **before** they are used, because the code is evaluated from top to bottom.
:::

### To `play(1)` or not to `play(0)`

In order to create a rhythm for an instrument we can make a list consisting of zeroes and ones. The `1` represents a `true`/`on` value, resulting in the triggering of the sound, the `0` a `false`/`off` value that will not play. Let's put this into practice.

```js
set tempo 110

new sample hat_min time(1/16) play(1)
```

This sounds the same to what we heard before. This is because the `play()` function only has a single `1` as argument, which means all notes are played. This is the *default* and was already the case in the code above. But let's now create a list with `0`s and `1`s and apply the name of the list as argument in the function.

```js
set tempo 110

list hatBeat [1 0 0 1 0 1 1 0]

new sample hat_min time(1/16) play(hatBeat)
```

You can hear how the rhythm is applied to the sample. Every 16th note (`1/16`) the internal counter from that instrument looks up a value from the `list hatBeat`. When it is a `1` it is played, when it is a `0` it is not. Try some different rhythms of different lengths, for example: `[0 1 0 0 1]`, `[1 1 0 1 1 0 0]`, `[1 1 1 0]`.

<!-- >In Mercury most functions have synonyms, meaning that different words do the same thing. This originated from the fact that people come from different backgrounds and are used to using different words with the same meaning. For example `play()` can also be written as `beat()` and `rhythm()`. This may sound confusing, but eventually this might help you remember and recall functions easier via a word that fits your way of thinking. -->

:::tip kick with a chance of hat
The `1` or `0` in `play()` is actually not a binairy value but a percentage where 0=0% and 1=100%. You can add some chance to your instruments by choosing for example `0.5` (50%) or `0.9` (90%) of playing

```js
new sample kick_house time(1/4) play(0.9) // play 90% of the time
new sample hat_min time(1/16) play(0.5) // play 50% of the time
```
:::

### Combining rhythms

In order to make more complex rhythms we can go back to our pop beat, but instead of using different `time()` arguments to make a rhythm, we will use the power of `list`'s to look up a `1` or `0` to let it play the sound or not. First we make sure that all instruments play in the same time of 1/16th notes.

```js
set tempo 100

new sample kick_house time(1/16) play(1)
new sample snare_fat time(1/16) play(1)
new sample hat_click time(1/16) play(1)
```

Execute this code and you will hear all samples play all 16th notes. Now we add lists for the different instruments. Note the lists don't have to be the same length. They will each *loop* individually. This allows you to quickly create quite complex rhythms that phase over time with just a few lines of code!

```js
set tempo 100

list kickBeat [1 0 0]
list snareBeat [0 0 0 0 1 0 1 0]
list hatBeat [1 1 0 1 1 0 1]

new sample kick_house time(1/16) play(kickBeat)
new sample snare_808 time(1/16) play(snareBeat)
new sample hat_min time(1/16) play(hatBeat)
```

### Linear beats

Instead of using multiple instruments to create our beat, we can also use one sampler and let it play different sounds sequentially. For this we need to create a list with the names of the samples in the order we want to play them. The playing of samples without any overlap or playing at the same time is sometimes called a *linear beat*. For example we want to play kick, hat, snare, hat. Now our code will look like this:

```js
set tempo 110

list drumSounds [kick_house hat_click snare_fat hat_click]

new sample drumSounds time(1/8)
```

Now to make this a bit more interesting we can combine this technique with another list that has some zeroes and ones to play a rhythm at a time of `1/16`. For example:

```js
set tempo 110

list theSounds [kick_house hat_click snare_fat hat_click]
list rhythm [1 0 1 0 0 1 0 1]

new sample theSounds time(1/16) play(rhythm)
```

Give yourself some time to experiment with all the code so far to get comfortable with the different functions and their arguments and making of lists. Try some different rhythms in various lengths, try some different samples in different orders as well. Have fun!

There is still so much to do with just the sampler, but for now we'll first introduce another instrument in Mercury: the Synthesizer.

## 🎹 The Synth

A synthesizer generates its sound through an electrical circuit or a digital chip running some computer code. This code produces a periodic waveshape, an oscillator. The amplitude value of the oscillator controls the motion of your speaker. The synth can therefore be used to create sounds in many different ways and control the pitch to play melodies, basslines, chords and more.

<details>
<summary>What is a synthesizer and synthesis?</summary>
<div>
A synthesizer is an electronic musical instrument that generates its sound through analog electrical circuits or in a digital manner through chips and computer code. Generating sounds in these ways is called synthesis. The first instrument that was defined as a synthesizer ([the Moog](https://en.wikipedia.org/wiki/Moog_synthesizer)) was introduced in 1964, but before that there were already other electrical instruments available such as the [Theremin](https://en.wikipedia.org/wiki/Theremin) (1928) and the [Hammond Organ](https://en.wikipedia.org/wiki/Hammond_organ) (1935). 

The basic building blocks needed to do synthesis are one or multiple oscillators (audio signal generators), methods to add or multiply signals and filters to remove parts of a signal. By combining these in different ways you can perform a wide variety of synthesis techniques, such as [additive synthesis](https://en.wikipedia.org/wiki/Additive_synthesis), [subtractive synthesis](https://en.wikipedia.org/wiki/Subtractive_synthesis), [amplitude modulation synthesis](https://en.wikipedia.org/wiki/Amplitude_modulation), [ring modulation synthesis](https://en.wikipedia.org/wiki/Ring_modulation), [frequency modulation synthesis](https://en.wikipedia.org/wiki/Frequency_modulation), [physical modelling synthesis](https://en.wikipedia.org/wiki/Physical_modelling_synthesis), [analyse synthesis](https://en.wikipedia.org/wiki/Vocoder) (or resynthesis), [wavetable synthesis](https://en.wikipedia.org/wiki/Wavetable_synthesis) and [sample-based synthesis](https://en.wikipedia.org/wiki/Sample-based_synthesis). On top of that different techniques can of course be combined to generate even more sounds.

An oscillator is a signal generator that produces a periodic wave. This periodic wave is what drives your speaker (move it back and forth) and produces airpressure differences that you will perceive as sound. The four most common [waveforms](https://en.wikipedia.org/wiki/Waveform) are a sine-, sawtooth-, square- and triangle-wave. The name describes the shape of the wave if you would plot it in a graph of time against amplitude. The sinewave is a pure tone consisting of a single frequency. The pitch (how high or low does it sound) is called the Frequency and is expressed in Hertz (Hz). The other waveforms have a richer sound because they consist of more frequencies called harmonics. [Harmonics](https://en.wikipedia.org/wiki/Harmonic) can be defined as a range of stacked sinewaves of different frequencies on top of the [*fundamental* frequency](https://en.wikipedia.org/wiki/Fundamental_frequency). The relationship between these frequencies is different between the three waves (saw, square and triangle) and determines the *color* of the sound (also called [*timbre*](https://en.wikipedia.org/wiki/Timbre)). The timbre is that what makes an instrument sound like a flute, violin, guitar or voice, even if they play or sing the same note. 
</div>
</details>

### Play the `synth`

Lets create our first synthesizer. For this we type the following code and execute it:

```js
new synth saw
```

You will hear the sawtooth waveform play a note. The default `time()` for the synth is `1`, the same as with the `sample`. Now try the other waveforms as well: `square`, `triangle`, `sine`. Notice that the triangle sounds a bit darker, this is because its overtones (harmonics) aren't as loud as with the square and the saw. Also notice that the sine is almost impossible to hear (depending on your headphones or speakers). This is because the sine is only a single frequency, no overtones. And the default frequency for the synth is quite low.

### A `note()`

For now lets stick with the `sine` oscillator for a while and try to make some different pitches. In a moment we will look into how the notes work in Mercury, but first let's try some different values to get a feeling of what happens to the sound.

Try these following code snippets and hear how the pitch changes, you can try as many other values as you want of course:

```js
new synth sine note(0 1)
```
```js
new synth sine note(7 1)
```
```js
new synth sine note(0 2)
```
```js
new synth sine note(7 2)
```

#### 12-TET system

In western music the most common tuning system is the so called 12-Tone Equal Temperament, or 12-TET. This means that we divide a full octave (an octave is a range of one frequency to the doubling of that frequency, for example 200 to 400 Hz) into 12 equal steps: C, C#/Db, D, D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B, C (octave higher)

<details>
<summary>Pythagorean tuning</summary>
<div>
You've maybe heard of [Pythagoras](https://en.wikipedia.org/wiki/Pythagoras), a greek philospher and mathematician famous for the pythagorean theorem. He discoverd around 500 BCE that when you take a string (like a guitar) and make another string with half the distance, that string sounds twice as high in pitch. This doubling of pitch is called an Octave. This means that if you have a string with a frequency of 200 Hz, a string that is half that long will have a pitch of 400 Hz. Phytagoras took this idea and expanded it by taking a third of that string, a fourth, a fifth and so on. This let to the discovery of the harmonic series (for example 100 Hz, 200, 300, 400, 500...). 

The distance of an octave is quite big, and we can fit more pitches of different intervals in between two octaves. Pythagoras build its [tuning system](https://en.wikipedia.org/wiki/Pythagorean_tuning) based on stacking perfect fifths (ratio 3:2) and scaling down octaves to fit in one octave. This system had a slight problem that the octaves were slightly out of tune though.
</div>
</details>

<details>
<summary>Scales in the 12-TET system</summary>
<div>
Our current note name system - C D E F G A B - started out around the 12th century. At that time there was not really a notation system and scales (a ascending sequence of notes). The different scales were referred to as modes and all ended and started at a different note. These were later on defined as do, re, mi, fa, sol, la, ti and do again. Later on these became A up till G. The do's are both the same note only an octave higher, so they need to have the same name. In the past this was notated as A, a, aa for three octaves. Sometimes when the mode starts on a different letter, some notes are supposed to sound higher or lower. This is where the accidentals came in to play. If a not is made a bit lower, it is called flat (b) and a bit higher it is called sharp (#). This completed the 12 tone system that we know now. C, C#/Db, D D#/Eb, E, F, F#/Gb, G, G#/Ab, A, A#/Bb, B. You will notice that some notes don't have a sharp or flat note in between (E-F and B-C), this is because these notes are already a half-step apart, while all the other notes are actually a whole-step apart.

Since the 18th century the [12-Tone Equal Temperament](https://en.wikipedia.org/wiki/Equal_temperament) is used. In this system all the octaves are completely consonant over the entire range of the keyboard, and all the notes in between are at an equal distance from eachother. Because of this manner of tuning some notes are every so slightly out of tune when compared with the harmonic series ratios, but the system allows for quick switching between scales and tonal centre, and therefore it is still used mostly today. There are other tuning systems in the world as well, for example [Slendro](https://en.wikipedia.org/wiki/Slendro) is a 5-TET tuning system from Indonesia. 

From our tuning-system we can make various scales. The scale that has all the notes is called the [*chromatic*](https://en.wikipedia.org/wiki/Chromatic_scale) scale. Other scales usually consist of 7 notes picked from those 12 (originating from the modes). The distances between the 12 tones in the chromatic scale are called semitones (half steps). Most scales have a combination of tones and semitones (full and half steps). This is what is called a Diatonic scale. The most famous scales are the major and minor scale. The major scale when starting from C has no accidentals (C D E F G A B, with steps W W H W W W H), but when starting this same series from A you get a minor scale (A B C D E F G, with steps W H W W H W).
</div>
</details>

#### The Mercury Notation System

Now let's go back to our coding of notes. In Mercury the notes are not written down as letters, but as numbers. These numbers are added as arguments to the `note()` method. The arguments consist of 2 numbers, the first number is the tone-step (semitone) in the chromatic 12-TET system, the second number is an octave-step. Later on we'll see how we can work with `scale`s and changing the root (tonal centre) as well. 

By default Mercury works with `C` as the root and `chromatic` as the scale used. This means that the `note(0 0)` corresponds to the 1st note (counting starts at 0) in the 12-TET system (which is `C`) and the second `0` is the default octave. `note(0 0)` therefore corresponds with MIDI-note `36`. Now a `note(0 2)` would also be a `C`, only 2 octaves higher. A `note(7 1)` would be the 8th note in the 12-TET system starting at `C`, one octave higher, resulting in `G`.

### A melody

Now that we know which numbers make up which notes we can make a melody. By putting the numbers in a list and giving the name of the list as argument to the `note()` function. You can try different numbers to hear which ones sound nice and which ones don't. You can also try different octaves as well or different waveforms of course. Maybe add a rhythm too? It's all up to you! 🎶

```js
list myMelody [0 4 7 5 7 9 4 5]

new synth sine note(myMelody 2) time(1/8)
```

### Set a `scale`

It can be tough to know all the various scales that can be used and which numbers belong to these scales. In order to help you code melodies and harmonies that fit within a specific scale you can specify the global `scale` via the `set` action. Applying a scale to the entire environment will force all numbers that don't fit in a scale to be replaced by a number that is closest to them. This happens at runtime (so when the note gets played). The content of the list doesn't change. Some scale names are for example: `major`, `minor`, `dorian`.

```js
set scale minor c

list myMelody [0 1 2 3 4 5 6 7 8 9 10 11 12]
new synth sine note(myMelody 2) time(1/8)
```

As you can see and hear in the example above there is a list of all the 12 notes in an octave. But when you play it you will hear some notes double. This is because some numbers are not part of the `minor` scale. For example `1` and `4` are not part of this scale, therefore they are mapped to a number closest that does fit, like `2` and `3`.

By changing the *root* behind the name of the scale it is possible to offset what the `0` means in the `note(0)`. By default the `0` corresponds with the `c`. But if we set the scale to for example `e`, the `note(0 0)` will correspond with `e`, 4 semitons higher, MIDI-note `40`.

```js
set scale major a

list myMelody [0 1 2 3 4 5 6 7 8 9 10 11 12]
new synth sine note(myMelody 2) time(1/8)
```

:::tip scales with randomness
It is especially helpful to use `set scale` when you start generating lists with functions such as `random()`. More on lists functions in a later chapter. But you can already try this:

```js
set scale dorian

list randomMelody random(16 0 12)
new synth sine note(randomMelody) time(1/16)
```
:::

### Harmony

When two or more melodic instruments play together you hear multiple pitches at the same time. This is called a harmony. We can make two instances of a `synth` and make different notes for them to play, or we can use one list for multiple instruments and let them play at the same time. We use the `octave` argument in `note()` to move the instruments to different hights.

```js
set tempo 100
set scale minor a

list myMelody [0 4 7 5 7 9 4 5]
list melodyTwo [7 7 5 5 4 4 0 0]

new synth sine note(myMelody 0) time(1/6)
new synth sine note(melodyTwo 1) time(1/8)
new synth sine note(myMelody 2) time(1/8)
```

### `shape`-ing the sound

As you may have noticed the synth has by default quite a short sound. This is because the default synth has a so called *envelope*, which we refer to in Mercury as the `shape`. The shape describes the fade-in and fade-out time of the synth's source (the oscillator). The shape is necessary, because without it the oscillator would continue sounding forever. We can adjust the fade-in and fade-out times with arguments in the `shape()` function. The argument can be a `number`, which describe the fade time in milliseconds, or it can be a `fraction` which describes the fade time relative to the `tempo`.

```js
set tempo 100

// fade-in of 5ms and fade-out of 100ms
new synth saw time(1/4) shape(5 100)

// fade in and out exactly in the time of 1/2
new synth square time(1/2) shape(1/4 1/4) 
```

Just like with `play()` and `note()` we can also use a `list` in the `shape()` function to apply different fade-in and fade-out times for the synth per trigger of the note. This gives us more flexibility in creating interesting synthesizer parts.

```js
set tempo 130

list notes [0 0 3 12 7]
list lengths [40 100 40 1/8 40 1/1]
list rhythm [1 0 1 1 0 1 0 1]

new synth saw time(1/16) note(notes 0) shape(lengths) play(rhythm)
```

:::tip Shape a sample
It is also possible to shape the `sample`. This is useful in the case you have a sample that sounds quite long.

```js
set tempo 100

new sample harp_down shape(1 1/8)
new sample gong_hi shape(1/2 1/2)
```
:::

## 🎲 Power of Algorithms

In this chapter we'll look at Algorithmic Composition. This is a way of composing music (or other forms of art) through the means of algorithms. An algorithm is a set of steps (or rules) that you or the system follows in order to gain a result. The result in this case is the composition.

<details>
<summary>A brief history on Algorithmic Composition</summary>
<div>

For many years composers have been experimenting with ways to create new musical pieces. For example J.S. Bach published the Musikalisches Opfer (Musical Offerings) in 1747, which included many fugues that were "generated" (by hand) based on the rules of counterpoint (a polyphonic composition technique). It also included the [*Canon Cancrizans* (Crab Canon)](https://www.youtube.com/watch?v=DAIc1XvnPkI), a musical piece of two voices that are a mirror image of each other, played forward and backwards at the same time.

Another example is from the famous classical composer Mozart in 1792 who used a game called [*Muzikalisches Würfelspiel*](https://en.wikipedia.org/wiki/Musikalisches_W%C3%BCrfelspiel) (german for "musical dice game"), where he would first compose 176 short pieces of music with the length of one measure. Then by rolling some dice he would decide which pieces come after one another. This is a form of what is called [*Algorithmic Composition*](https://en.wikipedia.org/wiki/Algorithmic_composition). Composing music based on a predefined set of rules also called an algorithm. More on Algorithmic Composition will be explained further ahead.

Around 1920 a new form of composition technique was described, namely `Serialism`. Serialism originated from the `twelve-tone` technique, described in 1919 by Josef Hauer in his published work "Law of the twelve tones". This technique starts out with a randomly ordered set of the twelve chromatic notes. From there on out you can apply transformations on this set, such as reverse/retrograde, inverse, transpose, and combinations between those.

In the 60's the Greek Iannis Xenakis published the book Formalized Music containing many techniques and his philosophy on composing music with mathematics and stochastic functions (forms of randomness). An example in his work is the piece [Pithoprakta](https://www.youtube.com/watch?v=nvH2KYYJg-o), using brownian motion, the stochastic movement of particles bumping into each other, to compose a piece.

Later in the 70's we've seen composers such as Laurie Spiegel work on musical pieces generated with computer code such as her work [Harmony of the Worlds](https://www.youtube.com/watch?v=fKX21xp6hhA), a sonification of the motion of the planets, based on the research of Johannes Kepler. She also wrote the paper [*Manipulation of Musical Patterns*](https://github.com/calpicasso/Manipulations-of-musical-patterns/blob/master/Manipulations%20of%20Musical%20Patterns.md) (1981) in which she suggests to *"extract a basic "library" consisting of the most elemental  transformations which have consistently been successfully used on musical patterns, a basic group of "tried-and-true" musical manipulations."* beyond that which already exists in such a way as to preserve continuity with it.

After that there have been more and more examples of musicians using electronic instruments (such as modular synthesizers) and computers to generate electronic music algorithmically. Books such as [Algorithmic Composition](https://books.google.nl/books?id=jaowAtnXsDQC&printsec=frontcover&dq=Nierhaus+Algorithmic+composition&hl=en&sa=X&redir_esc=y#v=onepage&q=Nierhaus%20Algorithmic%20composition&f=false), [Oxford Handbook on Algorithmic Composition](https://academic.oup.com/edited-volume/28278), [Oxford Handbook of Computer Music](https://academic.oup.com/edited-volume/28207?login=false), [Live Coding: A User's Manual](https://direct.mit.edu/books/oa-monograph/5495/Live-CodingA-User-s-Manual) and many more give great insights in various techniques that can be used in algorithmic composition.

Artists/composers such as Alvin Lucier, Pauline Oliveros, Terry Riley, Daphne Oram, Lilian Schwartz, Aphex Twin, Autechre, Suzanne Ciani, Caterina Barbieri, Robert Henke, Emptyset, Holly Herndon, Rian Treanor, Mark Fell, Dawn of Midi, Zoë McPherson, Jlin, Björk, Gábor Lázar, James Holden, Portrait XO, and many more have for example all been working with algorithms in their audio(visual) compositions in one way or the other.

</div>
</details>

### `random`ising rhythms and melodies

So far we've been creating `list`s manually by typing all the numbers we want. This is one we to go about composing, thinking about all the details exactly how you want them to be. An other way of composing is using the computational power of your computer. With this you can generate lists with `list-function`s. These lists can be generated randomly or with other types of algorithms.

We start by looking at generating a list of random notes. The `list-function` we will use is `random()`. Random is a *generator* function. It takes a few arguments, the length of the list, the lowest possible value, the highest possible value (excluding). For example we can generate 8 random notes between 0 and 13. This gives us the options 0 up and including 12. We can use the `print` action to also see what the result of the `list-function` is.

```js
list randomNotes random(8 0 13)
print randomNotes

new synth saw time(1/8) note(randomNotes 1)
```

This `random()` function can be used for many other things in the code. For example we can use it to generate a random rhythm of `0`'s and `1`'s, or create random note-lengths. Also we can include the `scale` to make sure the random notes stay within a specific scale even tho there is randomness involved.

```js
set tempo 110
set scale minor c

list randomNotes random(4 0 13)
list randomRhythm random(16 0 2) // 2 because this value is excluded, so the options are 0/1
list randomLengths random(5 40 500)

print randomNotes randomRhythm randomLengths

new synth saw time(1/16) play(randomRhythm) note(randomNotes) shape(2 randomLengths)
```

### Predicting Randomness

You'll notice that every time you evaluate the code in the example above, the notes, rhythm and lengths change. This is because the numbers are generated randomly. But actually there is no such thing as true randomness, the random numbers are generated by a deterministic process (psuedo-randomness), an algorithm that has a specific mathematical function and is seeded by a starting point. We only perceive it as random because we can't see any pattern.

Once you know the starting-point, called the *seed*, that initializes this process, you can reproduce the sequence of random output of the algorithm over and over. We can do this by setting the so called `randomSeed`. Using a `number` will make sure random values keep the same sequence every time you re-evaluate the code. The algorithm will use this fixed `number` as a "seed" to start the calculations. A value of `0` sets to unpredictable seeding (which is the default). For example try the same code again, but now swap between the 2 seeds (or choose some yourself) and you'll notice every time you evaluate with the same seed the randomness doesn't change. 

```js
set tempo 110
set scale minor c
set randomSeed 4829
// set randomSeed 9282

list randomNotes random(4 0 13)
list randomRhythm random(16 0 2) // 2 because this value is excluded, so the options are 0/1
list randomLengths random(5 40 500)

print randomNotes randomRhythm randomLengths

new synth saw time(1/16) play(randomRhythm) note(randomNotes) shape(2 randomLengths)
```

:::tip
The `randomSeed` works for all the `list-function`s that use some form of randomness. For example also `shuffle()`, `drunk()`, `expand()`. You can read all about these functions in the [Reference](./../reference/list-functions.md).
:::

<!-- ⚠️ **The following chapters have never been finished, and since Mercury moved to the browser version the tutorials there are much more extensive. Please visit [mercury.timohoogland.com](https://mercury.timohoogland.com) to continue** ⚠️ -->

## 🌈 Coloring your sounds

Coming soon...

## 🎼 Composition Strategies

Coming soon...
