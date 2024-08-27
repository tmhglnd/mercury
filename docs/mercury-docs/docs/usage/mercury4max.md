---
sidebar_position: 2
id: mercury4max-overview
---

# 🏔 Mercury4Max Overview

This chapter gives an overview of the features in the user interface of Mercury4Max

## Mercury Folder

When you start Mercury4Max for the first time it creates a folder `~/Documents/Mercury` containing a few subdirectories like: `Code Logs`, `Data`, `Library`, `Preferences` and `Recordings`. These folders are used to store various files when you are working in Mercury such as recorded sounds, autosaves of the code you evaluate and dictionaries of the loaded soundfiles.

### Change the `/Mercury` Folder location

You can change the mercury folder location. Go to your download of Mercury4Max, which can be found in `/Users/<User>/Documents/Max 8/Projects/mercury` considering you followed the *Getting Started* steps. In the `/mercury-ide` you will find a file called `mercury.ini`. In the `.ini` file you can adjust `base` to the location of your preference:

```
base = /Documents/Mercury
user = /Users/<yourname>
```

Now restart the `mercury_ide.maxproj` and you can see it generated all the necessary folders in your newly specified location.

:::note
Beware that the `base` is appended to the `user`, so the full location will be: `/Users/<yourname>/Documents/Mercury`
:::

### Sounds

You can add sounds (samples and single-cycle waveforms) to the Mercury file path so you can use them while coding music. Files can be added through the menubar (see below) but can also be added in the `mercury-user.ini` file. Go to your Mercury folder (by default in `~/Documents/Mercury`) and open the `mercury-user.ini` file. In the file you'll see:

```
[samples]
path[] = default

[waveforms]
path[] = default
```

These `path[]`'s are pointing to the default location of the soundfiles included in Mercury. If you like to add a folder of sounds you can add a new line under `[samples]` or `[waveforms]`. Samples are used with `new sample`, waveforms are used with `new synth`. The path must be an absolute path. For example:

```
[samples]
path[] = default
path[] = /Users/<yourusername>/Music/Samples/aSampleFolder/
```

On load the system searches for all `.wav`, `.aiff` and `.mp3` files located in this folder and any subdirectories. Folders are loaded from top to bottom of the page. If a file is loaded with the same name of a file that was already loaded it overwrites the previous file.

:::warning
Folders and all subdirectories are searched for files that match `.wav`, `.aiff` or `.mp3`. Be careful when selecting a folder with many subdirectories and audiofiles.
:::

## Mercury Main Window

The Mercury main window gives you access to the most used settings in the Mercury Environment. For more detailed settings you can use the menubar on top.

### Sound

Start or stop the audio calculations (Digital Signal Processing, DSP). Turning this off will disable all processes that are connected to audio or sequencing.

### Editor / Visuals

Start or stop the rendering of the text-editor. This is an OpenGL environment that renders the responsive texteditor in the second window. The rendering is done at a framerate synced to the screen you use (which usually defaults to 60fps). This rendering is also necessary to use when coding visuals displayed behind the text. You don't have to use this texteditor, you can also use an external editor like Pulsar or Flok.

### CPU and FPS Meter 

This CPU meter shows the current CPU usage of the audio processes running in Mercury. If you experience a very high cpu-usage (more then 70) you can find some info under [Audio Setup](#audio-setup) to help you adjust settings for your computer.

The FPS meter shows the current Frames Per Second that the rendering engine is running at. If you experience a very slow framerate (less then 25fps) you can find some info under [Visual Setup](#visual-setup) to help you adjust settings for your computer.

### Auto Log Sketch

Enabling the Auto Log Code will store a version of your code to the folder `~/Documents/Mercury/Code Logs` for every time you execute your code. This can be helpful to create a history of your code and allow you to look back at your code after a performance.

<!-- ### Auto Copy Sketch

When enabling the 'Auto Copy Sketch' Mercury will copy the full sketch to the clipboard everytime you execute your code. The copy will include a timestamp in the header of the snippet. Paste it in a different text-editor, or use it to send your code in a chat message to someone else. -->

### Record Audio 

Start and stop the recording of the current sound output. The recorded file will be stored to the `~/Documents/Mercury/Recordings` folder with the date and time as the filename.

### Show Variables 

View the current `list`'s that are created from the code in a dictionary. This could be helpful while debugging some code.

### Show Audiofiles

View the loaded soundfiles and waveforms as a system path in a dictionary with their associated name that can be used in Mercury code. Helpful if you want to find the `name` to use in `new sample`

### External Editor

:::warning Use the Pulsar plugin or Flok instead
:::

The external editor allows you to use a textfile from outside the Mercury environment to run as code. Generate a `.txt` file somewhere on your computer. Drag-n-drop the file in the box *drop code file here*. This will automatically enable the *Use External Editor* button. Now you can use a external editor such as Atom, VSCode or Sublime to edit your code. Upon saving the code Mercury will detect the changes and execute the current state of the file.

## Menubar

The menubar gives you access to more functionalities in Mercury such as opening a new file, opening an existing file, saving your code, executing or deleting your code, adding sounds to your library, changing settings for the audio, visuals, editor and keyboard shortcuts and opening examples, documentation and the list of sounds.

### File

Via the File menu you can:

- Create a new file (this will erase all code) : `CMD + N`
- Open a file with a `.txt` extension as a codefile : `CMD + O`
- Save a file from the current code in the editor window : `CMD + S`
- Execute Code : `ALT + RETURN`
- Silence Code : `ALT + .`
- Clear Code (same as new file) : `CMD + N`
- Load External Editor File (see [external editor](#external-editor))

### Sounds

Via the Sounds menu you can add folders of sounds and waveforms to the searchpath of the Mercury environment. The filenames of these sounds can then be used in the code to refer to. This works best if you rename your files to shorter filenames and **don't** use spaces in the name.  These files will be loaded into the RAM, so try to keep the loaded soundfiles under **4 GB**.

:::warning
Folders are searched for all subdirectories for files that match `.wav`, `.aiff` or `.mp3`. Be careful when selecting a folder with many subdirectories and audiofiles.
:::

#### Add

The **Add** option appends all the found audiofiles to the current list of already loaded files. The path is stored in `mercury-user.ini`. A library with the loaded sounds is stored under `~/Documents/Mercury/Data`. 

#### Replace

The **Replace** option removes all the current loaded files from the library and only addes the files that are found in the currently selected folder (and subfolders). The `mercury-user.ini` file and library are updated accordingly.

#### Default

The **Default** option resets the library to the files that are included in the Mercury project by default. These files can be found in the `mercury_ide/media` folder. The `mercury-user.ini` file is updated as well.

#### Show Loaded

The **Show Loaded** option opens the library of loaded soundfiles and waveforms. This will give you insight in if your files were loaded correctly and also shows you the buffername, duration, number of channels and samplerate of the files.

#### Example for file naming
I have a soundfile: `my cool Sound 05.wav` on the computer. 

Using this in Mercury like so:

```js
new sample my cool Sound 05
```

will not work, since it will interpret the spaces as new keywords. Therefore I rename the file with underscores to: `my_cool_Sound_05.wav`. Now I can use this file like so:

```js
new sample my_cool_Sound_05
```

Since I find this filename a bit long to type during a live coding session I decide to rename it a bit shorter like so: `sound05.wav`. Now the code will look like this after importing the sound:

```js
new sample sound05
```

### Audio Setup

The Audio Setup lets you adjust settings for the sound processing in the Mercury environment. You can hover your mouse over the settings to see a small description of the options and their default values.

#### Total Instruments

The Total Instruments determines how many instruments can be used in the code. An instrument is every line of code that starts with `new ...`. The default is 10 instruments, which is usually enough for live coding performances.

#### Driver

Adjust the Audio Driver. For Mac `Core Audio` is recommended, for Windows the `Asio4All` driver (if not available please install).

#### Device

Select your input and output devices for the sounds. This usually defaults to `Built-in Microphone` and `Built-in Output`, but can be changed if you are using an external sound card for example. 

**Bluetooth headphones have been giving some troubles with the samplerate and processing up till now**

#### Samplerate

Adjust the samplerate for the audio processing. A higher samplerate gives a better sound quality but is heavier on the computer (cpu) to process. The default is `44100` Hz, which is in most applications more then enough.

#### Buffersize

Adjust the I/O (input/output) and Signal buffersize. This determines the blocksize of samples that are presented to the cpu to calculate at once. A lower buffersize gives less latency on the audio output, but a higher cpu usage. A higher buffersize gives a lower cpu usage, but there will be more latency. In most cases an buffersize of `256` samples is good.

#### Overdrive / Audio Interrupt

Turn Overdrive on to give priority over midi-events and scheduling. Enable this when audio is your highest priority, disable this when visuals are you highest priority. Enabling is recommended.

When Overdrive is enable the Audio Interrupt can also be enabled. This links the timing of events to the signal buffersize in the audio thread. Enabling this greatly improves the timing accuracy when working with lower buffersizes. Higher buffersize might make it drop a few beats when playing on high tempos. Enabling is recommended.

#### Troubleshoot

In case you are experiencing a very high cpu usage please try the following settings:

- Total instruments: `4`
- Driver: `Core Audio` or `Asio4All`
- Samplerate: `44100`
- I/O Buffersize: `1024`
- Signal Buffersize: `512`
- Overdrive: `on`
- Audio Interrupt: `on`

### Visual Setup

The Visual Setup lets you adjust settings for the visual output in the editor window of the Mercury environment. You can hover your mouse over the settings to see a small description of the options and their default values.

#### Aspect Ratio

Adjust the aspect ratio of the screen. You can choose between a variety of common used aspect ratios:

- 1:1 (Instagram)
- 5:4 (Early Television)
- 4:3 (Television)
- 11:8 (Academy Ratio 1.375:1)
- 1.414:1 (squareroot of 2 / √2)
- 3:2 (35mm Still Photograph)
- 14:9 (Compromise for 4:3 and 16:9)
- 16:10 (Computer Screen / Macbook)
- 1.6180:1 (Golden Ratio phi)
- 16:9 (Widescreen 1.78:1)
- 18:9 (Univisium 2:1)
- 22:10 (70 mm Film)
- 21:9 (Panavision 7:3)
- 47:20 (Cinemascope 2.35:1)
- 2.414:1 (Silver Ratio)
- 69:25 (Ultra Panavision 2.76:1)
- 36:10 (IMAX Ultra 3.6:1)

#### Resolution

Adjust the main visual resolution. This resolution is the height of the window in pixels and the width is adjust according to the aspect ratio. You can choose between a variety of commonly used resolutions such as 720p, 1080p and 4k.

#### Visual Resolution

The visual resolution allows you to keep a clear and sharp text on the foreground while rendering visuals on a lower resolution. This is useful for machines without a dedicated graphics card that still want to process visuals in the background.

#### Window Size

Adjust the size of the window with this message. For fullscreen you can click the toggle at [fullscreen](#fullscreen) or press `ESC` to go in and out of fullscreen.

#### Screens

The number in this box multiplies your width by this value which allows you to stretch the visuals over multiple screens.

#### Always in front

Enable this option to make sure the editor window is always in front of all the other Mercury windows.

#### Window visible

Disable this option if you don't need to see the editor window. For example when you're working with an external editor.

#### Sync to Refreshrate

Syncs the rendering framerate to the refreshrate of your computer display. Disable this option if you want to set the FramesPerSecond manually.

##### FPS

Set the FramesPerSecond for the rendering engine manually. Only possible when Sync to Refreshrate is disabled.

#### Auto Hide cursor

Enable this option if you want the mouse to disappear when it's been idle for 5 seconds.

#### Fullscreen

Go into fullscreen. You can leave fullscreen with the `ESC` key.

#### Syphon output

**Mac only**

Output the visual window as a texture via a syphonserver. This can be used to transfer the visuals to different capture software like OBS for livestream or recording. 

#### Troubleshoot

In case you are experiencing a very laggy editor, slow cursor, low FPS and slow response try the following settings:

- Aspect Ratio: `16:10`
- Resolution: `540`
- Visual Resolution: `270`
- Window Size: `540`
- Sync to Refreshrate: `off`
- FPS: `30`
- Auto Hide Cursor: `off`
- Syphon Output: `off`

For Mac users with Retina display and Max version 8.1.0 or higher and MacOS 10.13 or older.

- Go to `Applications` in the Finder
- Right click `Max.app` (`CMD + Click`)
- Click `Get Info`
- Select `Open in Low Resolution`
- Restart Max and the Mercury project

### Editor Setup

Adjust the look of the texteditor. Change the font, color, blinking color, cursor color and characters and adjust scaling and position.

### Shortkeys Setup

You can customize the shortkeys by opening the `Setup Shortkeys` under `Settings` in the menubar. You can also reset to the default key commands. 

#### Customize Shortkeys

You can customize the shortkeys by opening the `Setup Shortkeys` under `Settings` in the menubar. You can also reset to the default key commands. 

1. Select the key you would like to customize in the dropdown menu on the top.
2. Click `change keycommand`, it now displays `waiting for keys...`.
3. Hit the key combination you would like to use for this command and release the keys to store.
4. Check if stored correctly in the scroll-menu below. Every command displays the shortcut and keycode.

## Explanation

Open a random example, the documentation, the list of sounds and waveforms, the github repository and the published paper.