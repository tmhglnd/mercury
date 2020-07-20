
# Mercury Tutorial 🤓

🚧 **work in progress** 🚧

Welcome to the Mercury livecoding environment! This tutorial will help you to get started with coding sound and music. The tutorial will explain the Mercury syntax, the basics in music theory, the concept of serialism in music and algorithmic composition.

First we will kick off with making a sampler to play a basic sound, changing the timing, changing the tempo, play more samples together and make a rhythm. We will also look into shaping the sound to our liking by changing the playback speed or the position where we start playing.

After that we will focus on creating a synthesizer that allows us to play different pitches. We'll see how we can make a melody with a list of numbers and make sure they stay in tune by applying a scale. With the synthesizer we will also focus on various ways to design the sound to our liking by changing the waveform, adding another waveform and changing the length of the sound. Then we'll look into applying different effects to the sound such as a filter, a echo and a reverb.

# Table of Contents

- 💻 [Install Mercury](#install-mercury-)
- 🚀 [Launch Mercury](#launch-mercury-)
- 💾 [Sampler](#sampler-)

# Install Mercury 💻

1. Mercury runs in Max8 (sometimes also called MaxMSP), a node-based creative coding environment from Cycling'74. You can download Max8 through any of the links below. At the moment Mercury seems to run best in Max8.0.8. **You do not need to buy a license in order to use Mercury!** :sunglasses: 

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

# Launch Mercury 🚀

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

# Sampler 💾

A big part of electronic music (but also many other music genres) is the use of samples. The word sample has a few different meanings in a musical context. 

The first definition of the word sample is a recording of one "hit" or "note" of an instrument. This can for example be the hit of a drum, the plucking of a guitar string or the playing of one piano key. 

The second definition of the word sample is a small portion of a larger recording. For example a recording of a vocal where you cut small pieces out to play, or a piano piece of which you play small pieces (read samples) randomly. 

A third definition of a sample can be a snippet of an original song that is exactly one measure. This can be a drumbeat for example, and by cutting it exactly into one measure you can repeat it. These types of samples are also called `loops` because they can be played over and over seamlessly. 

By playing a sample repeatedly we can make a beat. Layering multiple samples with different timings will create a rhythm. 

## One Sample

Type the following code: 

```c++
new sample kick_house
```

Now hit `alt + return` (or click File > Execute Code). Mercury will now evaluate your code, which is also called execute or running.

You have now created a `new sample` with the filename `kick_house` and hear it play repeatedly. This repetition is also called a `loop`. A cool feature of Mercury is that all the instruments are always immediately `looping` 🔁.

Now hit `alt + .` (or click File > Silence Code). This will turn all the instruments off.

## time()

By default the sample will play its sound once per measure. In most western pop music a measure has four counts (1, 2, 3, 4, 1, 2, 3, 4, 1, etc.). If we want to play this sample four times per measure we use the `time()` fuction. The argument for the function will be the division we want to count, in this case `1/4` because we want four counts in 1 measure.

Change your code and execute:

```c++
new sample kick_house time(1/4)
```

Hear how it has changed its speed? It is now 4 times faster then before. But the cool thing with code is that we don't have to limit ourselves to what we are used to. For example, why not change it to `1/5` or `1/9` so we have 5 or 9 counts per measure. Or maybe change it to `3` or `7`, this will give is a sound once per 3 or 7 measures (so it will play slower).

## More Samples

Let's make things a bit more interesting by adding more samples. For example a drumbeat usually consists of a kick (or bassdrum), a snare (or snaredrum) and a hihat. All this sounds can have a different timing they need to be played to create the beat you want. The most basic beat (or groove) has a kick 4 times per measure, a snare 2 times and a hihat 8 times.

Change your code and execute:
```c++
new sample kick_house time(1/4)
new sample snare_fat time(1/2)
new sample hat_click time(1/8)
```

## beat()

## 

## speed()

## shape()

## 