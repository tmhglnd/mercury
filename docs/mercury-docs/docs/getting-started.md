---
sidebar_position: 1
---

# 🚀 Getting Started

`Hello, World!` Welcome to the Getting Started guide for Mercury. The various chapters in this guide will get you up and running in no time! Before we get started it is good to know that Mercury currently has 2 versions:

- **MercuryPlayground**, running in the [browser](https://mercury.timohoogland.com/) (Windows/Mac/Linux)
- **Mercury4Max**, running in [Cycling'74's Max8](https://cycling74.com/downloads) (Windows/Mac only)

:::info for everyone
I recommend to use the MercuryPlayground (browser version) first. Please read further in chapter [MercuryPlayground](#mercuryplayground).
:::

If you have experience with Max8 you can also consider using Mercury4Max instead. Please read further in chapter [Mercury4Max](#-mercury4max) for instructions on installing and setting up the environment.

<!-- If you are curious what the pros and cons are between these two versions please read [Browser or Max?](browser-max). -->

## 🌎 MercuryPlayground

The MercuryPlayground runs directly in the browser using WebAudio and WebMIDI technologies based on the JavaScript and the ToneJS framework. This makes it very accessible for everyone, no matter if you're a beginner or an expert.

1. Install a Chromium based browser on your computer (for example Chrome, Brave, Arc, Opera)

2. You can start coding immediately: [https://mercury.timohoogland.com/](https://mercury.timohoogland.com/)

3. Wait till the sounds are loaded (depending on your internet speed this could take some time)

4. You are now ready to start coding your first sounds or follow the tutorials! 🎶💻🎶

<!-- If you experience any issues with installing or running the code, please have a look in the Tutorial or Troubleshooting sections. This Quick Start guide is meant for people who are confident in working with the computer and have some experience with (creative) coding, music technology and music making. -->

### 🌑 Without internet

If you want to run the MercuryPlayground locally (for using without internet, or using the OSC-messages functionality, or when developing extra features) you can follow these steps:

1. Make sure you have [NodeJS installed for your Operating System](https://nodejs.org/en)

2. In the terminal navigate to the folder where you want to install Mercury.

	- Then run: `git clone http://github.com/tmhglnd/mercury-playground`

3. Navigate to the cloned folder with: `cd mercury-playground`

4. Install all the dependencies: `npm install`

5. Build your local version: `npm run build` (or `npm run watch` while developing)

	- You can add your own samples to `/public/assets/samples`

	- When you added samples make sure you `npm run build` again

6. Now start the local server: `npm start`, open a browser and go to [`http://localhost:8080`](http://localhost:8080). 

	Once connected the Terminal will print something like:

	```
	Connected yH0SGEdRHbZD1IACAAAB
	Receive messages from Mercury on port 2440
	Send messages to Mercury on port 4880
	```

	Mercury can now receive OSC-messages on port `4880` *(the portnumber is chosen to not interfere with many other default portnumbers. The number is the diameter in kilometers of the planet Mercury)*

7. You are now ready to start coding your first sounds or follow the tutorials! 🎶💻🎶

## 💻 Mercury4Max

Mercury also runs in Max8 (sometimes also called MaxMSP), a node-based creative coding environment from Cycling'74. 

:::info You do not need to buy a Max-license in order to use Mercury in Max8
:::

### 🛠 System Requirements

These system requirements are recommended to install and run Max8 and Mercury on your computer. Lower specs may work but it's not guaranteed. A dedicated Graphics Card (GPU) is also recommended to run the visuals of Mercury smoothly (the text-editor runs on the graphics card as well). If you don't have a good Graphics Card you can also use an external text-editor like Pulsar or Flok. You can find instructions for using those in .

| OS | CPU | RAM |
| -- | --- | --- |
| Mac OSX 10.13 (at least 10.11.6+) | Intel i5 processor | 8 GB | 
| Windows 10 (7 or 8 may work) | Intel i5 or AMD mult-core processor | 8 GB |

### ⚙️ Install Mercury

Read the [system requirements](#-system-requirements) before getting started.

1. Download Max8 for your Operating System through the link below

- [Download Max8](https://cycling74.com/downloads)

2. Launch Max8 after installing. It will create a `Max 8` folder in your `Documents`. Go inside that folder and create an empty folder named `Projects`. The full path should now look like this: `<User>/Documents/Max 8/Projects`

3. Download the [latest version of Mercury](https://github.com/tmhglnd/mercury/archive/refs/heads/master.zip) by clicking on the green button `code` and `download .zip`. Unzip the entire folder in `~/Documents/Max 8/Projects`.

	- **Or** git-users can clone/fork Mercury to the Projects folder in their Documents.

	```
	$ cd ~/Documents/Max\ 8/Projects
	$ git clone http://github.com/tmhglnd/mercury
	```

4. Now your filepath should look something like: `<User>/Documents/Max 8/Projects/mercury-v.x.x.x`

### 🚀 Launch Mercury4Max

Launch Mercury by double clicking `mercury_ide.maxproj` located in the folder `mercury-v.x.x.x/mercury-ide` **or** by running the following terminal command:

```
$ cd mercury
$ open mercury_ide/mercury_ide.maxproj
```

You can create a shortcut or alias on your desktop or Applications folder if you like for easy access.

- ⏳ Now give it some time to load.
	- **Mac Users**: You may need to give some permissions under Security & Privacy Preferences. Please be on the lookout for any messages popping up.

Once it's ready you will see two windows:

- The `_mercury_main` window 
- The  `mercury` window (still black). 

The *main window* is used to quickly access the most important settings in Mercury such as turning the audio on/off and starting a recording of your sound. When you turn the Rendering on you will start to see the text-editor in the `mercury` window. This editor is rendered in a 3D visual environment called Jitter. This is the window were you can type your code. If your computer can't handle the rendering please use an external editor instead.

- 🔈 Turn the **Audio on**
- 📺 Turn the **Rendering on**

You are now ready to start coding your first sounds! 🎶💻🎶

## 🎹 Play a first sound!

After going to the website or following any of the installation steps you are now ready to make the first sound! In the code editor you can type the following code (if there is already some code there you can `backspace` it or click `empty`):

```js
set tempo 110

new sample kick_house time(1/4)
new sample hat_808 time(1/8)
```

Now click `play` (browser), `Menubar > File > Execute Code` (Max8) or hit `ctrl/alt + enter` to evaluate the code. If all goes well you should hear the sound of a kick go 4 times, while the hihat sound goes 8 times (2x as fast).

:::info help
If you experience any issues, please see the <!-- [Troubleshooting](troubleshooting) -->
:::

### What's next?

You are now ready to play all you want! For example you can listen some random examples or follow the tutorials. You can read the Usage chapter for more info on how to navigate the environment and you can read the Reference for explanation of all the functions. For Max users I also recommended following the interactive tutorials in the [MercuryPlayground](https://mercury.timohoogland.com) before continuing in Max.

- [Usage](category/-usage)
- [Reference](category/-reference)
<!-- - [Examples](category/-examples) -->
<!-- - [Tutorials](category/-tutorials) -->
