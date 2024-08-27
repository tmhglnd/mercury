---
sidebar_position: 7
---

# 👩‍💻👨‍💻 Collaborative Coding

You can code together in Mercury by using the amazing [**Flok**](https://flok.cc/) live coding environment for the browser developed by Damián Silvani (a.k.a. Munshkr). Flok is a web-based P2P collaborative editor for live coding music and graphics. Similar to Etherpad, but focused on code evaluation for livecoding.

There are 3 options for how you can use Flok with Mercury:
1. Use Flok to combine Mercury with Hydra visuals (or other languages like Tidal, Foxdot and SuperCollider) on a localhost
2. Collaborate together in the same physical room (only requires 1 computer to run Mercury)
3. Collaborate remotely over a network (all computers need to run Mercury)

## Table of Content

- [Flok & MercuryPlayground](#flok--mercuryplayground) *recommended*
- [Flok & MercuryPlayground Locally](#flok--mercuryplayground-locally)
- [Flok & Mercury4Max](#flok--mercury4max)
	- [Localhost](#localhost)
	- [Collaborate](#collaborate)
- [Combine Mercury with Hydra (Audioreactive Visuals)](#combine-mercury-with-hydra)
	- [flok.cc with `mercury-web`](#flokcc-with-mercury-web)
	- [Mac (with Mercury local or Mercury Playground)](#for-mac)
	- [Windows (with Mercury local or Mercury Playground)](#for-windows)

## Flok & MercuryPlayground

Follow these steps if you are a beginner and have been using the MercuryPlayground at [mercury.timohoogland.com](https://mercury.timohoogland.com)

1. Open a Chromium based browser (eg. Brave, Arc) and go to [https://flok.cc/](https://flok.cc/)
2. Choose a username.
3. Select the `mercury-web` target from the dropdown menu in the topleft corner
4. Start typing some code! 🎵
	- `Ctrl/Alt + Enter` to play
	- `Ctrl/Alt + .` to silence

:::info
The first time you evaluate you might get a message `Mercury engine still loading`. Just wait a little bit for all the soundfiles to load and the code will start as soon as the message `Mercury engine ready!` pops up.
:::

## Flok & MercuryPlayground Locally

1. Install NodeJS [for Mac](https://nodejs.org/en) or [for Windows](https://nodejs.org/en).
2. Download the Mercury Playground via the Terminal. Navigate to the folder you want to install Mercury. Then run: `git clone http://github.com/tmhglnd/mercury-playground`, or [download and unzip](https://github.com/tmhglnd/mercury-playground/archive/refs/heads/main.zip)
	- Navigate to the folder with: `cd mercury-playground` (or `cd mercury-playground-main` if downloaded)
	- Start the local server: `npm start`, open a browser and go to [`http://localhost:8080`](http://localhost:8080).
3. Install Flok via the Terminal/Command Prompt with `npm install -g flok-repl` (or `sudo npm install -g flok-repl`)
	- Open Google Chrome and go to [https://flok.cc/](https://flok.cc/)
	- Setup Flok with target `mercury` and click **Create session**.
	- Copy the `flok-repl -H xxx -s xxx -t mercury` command, paste in the terminal and run.
	- **Join** the Flok with your nickname.
4. Now start typing some code! 🎵
	- `Ctrl/Alt + Enter` to play
	- `Ctrl/Alt + .` to silence
	- Flok will send the entire code via OSC messaging to port `4880`. Mercury is listening to this port automatically.

## Flok & Mercury4Max

*Follow these steps for local use, advanced use or if you're already familiar with the Mercury standalone in Max8*

1. Install NodeJS [for Mac](https://nodejs.org/en) or [for Windows](https://nodejs.org/en).
2. Install the latest version of Mercury via the [quick start guide](https://github.com/tmhglnd/mercury/blob/master/docs/quick-start.md).
3. Install Flok repl and web via the Terminal with `npm install -g flok-web flok-repl`

### Localhost

1. Run `flok-web` in the terminal
2. Open Google Chrome and go to `localhost:3000`
3. Setup Flok with target `mercury` (and optionally other targets like `hydra`) and click **Create session**.
4. Copy the `flok-repl -H xxx -s xxx -t mercury` command and run in the terminal.
5. **Join** the Flok with your nickname.

### Collaborate

Now follow these steps for a succesful setup.
1. Open Google Chrome and go to [https://flok.cc/](https://flok.cc/)
1. Setup Flok with target `mercury` and click **Create session**.
2. Copy the `flok-repl -H xxx -s xxx -t mercury` command and run in the terminal.
4. **Join** the Flok with your nickname.

Now start typing some code! 🎵

- `Ctrl/Alt + Return` to evaluate
- `Ctrl/Alt + .` to silence

Flok will send the entire code via OSC messaging to port 4880. Mercury should be listening to this port automatically.

### Combine Mercury with Hydra

For creating Audioreactive Visuals. Follow this guide if you like to let Hydra react to the sounds that you code with Mercury when using Flok. 

#### flok.cc with `mercury-web`

1. Open a panel for `mercury-web` and a panel for `hydra`
2. Create some code in mercury that generates sound and run it
3. The amplitude of the total sound is stored in the variable `m`, this can be used in Hydra
4. Use the variable in a function with: `() => m`

```js
osc(10, 0, () => m * 4 ).out()
```

#### for Mac

**With Mercury local or Mercury Playground**

1. Install [blackhole](https://existential.audio/blackhole/) for virtual audio routing
2. Open `Audio MIDI Setup` in your Applications
3. Click `+` in left-bottom corner and then `Create Multi-Output Device`
4. Select both `Built-in Output` and `Blackhole` (if blackhole is not listed restart the computer first)
5. Start Mercury and under `Settings` > `Audio Setup` change the output to the `Multi-Output Device`
6. Open Google Chrome and setup Flok as described under [Collaborate](#collaborate)
7. Click the `Microphone` icon and selecte `Manage`
8. Select `Blackhole (Virtual)` 

#### for Windows 

**with Mercury local or Mercury Playground**

1. Install [vbcables](https://vb-audio.com/Cable/index.htm) for virtual audio routing
2. More steps are needed but this has not been tested on Windows, please contribute to this documentation if you know the steps

**Both**

Now start coding some Mercury and Hydra code! 📟

To create audio reactive visuals with hydra use the FFT audio object accessible via the `a` object. Below is some example code for hydra that you can use.

```js
a.show() 
//=> show the FFT bins audio amplitude

a.setBins(6)
//=> set the amount of FFT bins to extract from the sound (low -> high frequencies)

osc(10, 0, () => a.fft[0]*4 ).out()
//=> choose a bin index and modulate a parameter with function return
```
