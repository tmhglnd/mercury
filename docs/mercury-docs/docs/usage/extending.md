---
sidebar_position: 6
---

# 🛠 Extending Mercury

In this page you can find help on how to create your own synths for Mercury4Max or the MercuryPlayground in the engine. For this you will work with Max8 or with JavaScript. It is currently not possible to code new synths with the Mercury language itself.

:::warning EXPERIMENTAL
**These features are still experimental and in the future things might change!**
:::

## Create a synth for Mercury4Max

You can extend Mercury4Max with custom synths and other sound designing patches programmed in Max8. This requires knowledge/experience with the MaxMSP programming paradigm. It also requires you to have a Max8 license so you can edit and save the patches. Follow the steps below to setup your own patch. You can also copy-paste the compressed code on the bottom of the page.

### Create the patch

Create a new patch for your custom sound design. Save the patch in `~/Documents/Mercury/Library/Sound`, if you do not have this folder you should create it. Give the patch an appropriate name, this will also be the name used in the live coding environment. For example: if you name the patch `myCustomSynth.maxpat`, then in Mercury you will type `new synth myCustomSynth`.

:::warning
Don't give your synth a filename with spaces! Instead I recommend using programming conventions such as `camelCase`, `PascalCase` or `snake_case`.
:::

### I/O 

The patch will be loaded inside a `poly~` object. Therefore it is required to use an `[in 1]` object to receive incoming messages and an `[out~ 1]` object to send a signal out.

### Muting

Make sure you include a `[thispoly~]` and send it a `[loadmess mute 1]` to make sure the patcher is muted on initialization of Mercury. This prevents high cpu load and unwanted sound when not using the synth.

### Functions

Use the `[route]` object to route arguments from functions to parts of the patcher that you want to be able to control with the code. For example typing `new synth myCustomSynth freq(100)` will allow you to use `[route freq]` and retrieve the value `100`. This functiong routing has to come after the `[route method]`.

### Trigger

Use the `[route bang]` object to send a trigger to for example a `[line~]` or `[adsr~]` object in parts of the patcher that need to start the sound. The bang is send based on the combined results of the `time()`, `play()`, `warp()` and `ratchet()` methods.

### noteCount

Send a bang to `[pv noteCount]` to retrieve the current count the instrument is at. This count increments based on the rhythm of the combined results of the `time()`, `play()` and `warp()`.

### argListLookup

Use the `[argListLookup]` abstraction to allow Mercury to lookup values from a `list` created in the code. `[argListLookup]` expects the `value` or `name` on the left inlet, and the `[pv noteCount]` on the right inlet to index the correct value from the `list`.

:::tip
While coding in Max it could be that you can't create the `[argListLookup]` object because it is not recognized. To fix this you can add the Mercury folder to the searchpath, or you can save the patcher first and open it when Mercury is open. Another "hack" is to create a `[join 2]` object, make all the connections, than replace the text for `argListLookup`. The connections will stay even tho the object turns orange.
:::

### Example Patcher

Below is copy-compressed code of an example patcher that generates a short sinewave beep with different envelope release times.

```
<pre><code>
----------begin_max5_patcher----------
1673.3oc2ZE0biZCD94jeEpLcllzw0EDfAm25z45SWaenWeJNyMxfrMW.INg
3Rbu4xu8tRB6.mchUB3KYtGhwRVnUe6t5a2UJe9zSblyukV4ft.cI5jS97om
bhtKUGmzz9DmBxsI4jJ8vbR3EETlzYj42jzak59+q+9cu4BjbEEcIQr7sYUx
2x4WWWdEpHa4JIJGZgxytlhxj+TEhwkna3hqyXKQmIno+JWPXKomOBlBhDkU
glSSH0UTzZdMZE4STjjipzOAYTRjIqPYLciDtPPSjnE77Tp.QXoptYnJIQHQ
+IUjTKVuYAmmwnI7ZldUGzzIqtHikSkZH50zYVpFX74e3W7Cctej7Z4lg51z
qd4.P48p0gQa5O0cr6Hje3T0CbXn5wDnOzUMuzBNStfjPUiGq55Kmdp5iQVZ
IlWKkblisPv2Y6hUPJnRp38TFYdNsMP5BuMSioK45RpAaNyAakyVfrGz6g03
0KVqDvAa9Dc0y.nL5M.B1wiqia1dUC3cUC3.mmFTebXNUCSeO8iXCLwuFfo2
PBy3iOJEvJhhVHneDo1gtWb5uKNmreX5+fvbTyeGFt3.suaLtWv8gnKgUVYs
lmifJ3LfZKaIije2OX69YO+mLkjmuFXgdZf4EZLjODkj2.h12sB.ZohMFdB7
uzpJhXshQGn9qS.J7xZDP6qYru2KuCWsukJFr6SVwf80ph.CmE1S2HZXcvy4
jzB.2nBkitmsl4oCJckYGbCNccOFajkfotjmu9NaQH9ItENS4e04gEPNx34O
oWHtjvn4Vu+L5wcCmyEPxJI7btvrR0Vi6+vq01x8gKv5EBbxlw56oZDia8Nl
4uc3gBdZmX8PLbSvebjZVZdskcVR3Qc9n0RRvK4BYFj.hZJGGNfrEAiQ+akI
OOUhFPTAdAZlSJmQm4nHMjhrkKUY5gfkghLAQVHUsyy0uEDxrVMyP+BJRsyi
l1ONkmc9eAlnHdQQ8hT4gTU9iQpbjur7SpLpo+tBXWAIDWLGfYJ5lL4pcxGG
TfyAcDj4m5qpWOG90pMYSunlknrqfxq5dM4XzevEH5sjhxb5EyXyXpWBs3in
KAWQHJhK3K5d0LFPKfpVy.4Vr9ezOUA0OawGOeuVfI1tc5YaALd2ax.Odfo0
aq3slZXXSAMpc1JtGkrUviQ+ldG1LGnxgU7TXenptrDBCYxbivVu0yQ+S2PX
Rk+EIMUukE7rztEcbjLI7oSBZ6Kqq+SMwfS5MhLoDpjaagdoTcMjWXbpBccg
BFU06o7orXdz0epF6Y3P286PFZKkf+y0gzaRXKGxnfA1V4MF8NPWMSWjFXm.
sREETQZVTkVTlUPO6bjwPhNqKYQYNY8YfR8FhnDFjR2JTHgJgVmOioHlyjsI
gkJTtk8vTXtVOunkcln052gftHoUh6F2qxww3mqtep6NUiOfp92rwqVibvgK
Uc7FMG.gQ+RPI0URvRn2LPqx9OHH89zEXaISBd1glBaEYx2eX4EgUxc1mk6S
GCwsKkI.eLxjE7nsF.9CIkdPqrzwwGups0IW0PCnRtZufMXOtbOPQIAGrp6Q
VgbuvlrZmdLv9OemsGhh2SMPsoFdaNwn.rgHZpJu8mMBU0SRVR2MD.BibQ+n
m0.08XbnXFiY3QYuoNZhsvKd+nCe.y3HaNmyFrF0.4WVG1ng2e0vyFzjxR+b
We.7krNIGRM.JgvVbFdrvYiO6j9cNAJj08v4WkYBp6rMTOcIIYsZfaK21amx
fezfOcJT2ybrAQwwX+P02BhbCii6dJBcjlp3d+fot5x5+5uz9sZGjy8oeEBG
7jXO3A3DD09lDb24LKmSRtdIDPik1I17RFGlj7rjqa2sdbT8Hmb+gdz2i8bf
L39u1L33ou.F7l5088+92fie0YvieAL3lXmXyMF9cs816UGit2Kf81uyof7M
0dqkgN4wu5+4A8xTewicbBp30hjM3aSoOPx0aVpozJYFir4Xvu79qZG8PoNX
qjl.yg2ADj5xr6sf7LywgEz8qlsWsfauj7lk+iJZUsI8FiXa.Y32Jko29Uld
81ewJI2aHN0BOyICff7sw6X5PgnCJogPPtVHn3gPP13GFYri8RPgVJm9BnHK
jyPPFFaimf2wfLzZI6NzLG138i2Q2ZBkRJK+DUT0LXsHfLm9fIij3Q5lYLSS
8Mq3HneJay3iz8PDPFBRH8fZgdY4b6DSou5arVvpyZvH.NPj5rxXPxJUkMQ3
0Iuc5WN8+AHUt1FO
-----------end_max5_patcher-----------
</code></pre>
```

## Create a Synth for MercuryPlayground

The Mercury Playground uses the [**ToneJS**](https://tonejs.github.io/) framework for creating the Transport, Sequencer, Synths, Sampler and almost everything WebAudio related. It also uses [**WebMidiJS**](https://webmidijs.org/) for the MIDI related instruments and [**SocketIO**](https://socket.io/) for the OSC related functionalities. Extending the engine with your own synths requires knowledge/experience with JavaScript programming.

### Setup

First clone the project from `https://github.com/tmhglnd/mercury-playground` so you can run it locally. Follow the steps in the [Getting Started](./../getting-started.md#🌑-without-internet)

### Create an Instrument Class

You can create a new `Class` for your instrument. Depending on what you want the instrument to do (Sound, MIDI, Sample, OSC, Polyphonic) you can `extend` your class from the `Sequencer`, the `Instrument` or the `PolyInstrument`.

```js
class MyCustomInstrument extends Sequencer {
	...
}
```

```js
class MyCustomSynth extends Instrument {
	...
}
```

```js
class MyCustomPoly extends PolyInstrument {
	...
}
```

:::tip
You can use the other instrument class files (such as MonoSynth.js) as an example or starting point for making your own
:::

### Add to the language

In the `worker.js` file you can add your instrument to the language so the parser knows what `Class` to use when you type:

```js
new mySynth <name> function()
```

Add the instrument to the `objectMap` like so:

```js
const objectMap = {
	...,
	'mySynth' : (obj) => {
		let type = obj.type;
		let args = obj.functions;			
		let inst = new MyCustomSynth(engine, type, canvas);

		objectMap.applyFunctions(args, inst, type);
		return inst;
	},
	...
}
```