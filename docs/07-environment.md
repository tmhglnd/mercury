# Environment

- [Mercury Main Window](mercury-main-window)
	- [Rendering](#rendering)
	- [Audio](#audio)
	- [FPS CPU Meter](#fps-and-cpu-meter)
	- [Auto Log Code](#auto-log-code)
	- [Record Audio](#record-audio)
	- [Show Variables](#show-variables)
	- [Show Audiofiles](#show-audiofiles)
	- [External Editor](#external-editor)
- [Menubar](#menubar)
	- [File](#file)
	- [Sounds](#sounds)
	- [Settings](#settings)
		- [Audio Setup](#audio-setup)
		- [Visual Setup](#visual-setup)
		- [Editor Setup](#editor-setup)
		- [Shortkeys Setup](#shortkeys-setup)
	- [Explanation](#explanation)

# Mercury Main Window

The Mercury main window gives you access to the most used settings in the Mercury Environment. For more detailed settings you can use the menubar.

## Rendering

Start or stop the rendering of the text-editor. This is an OpenGL environment that renders the responsive texteditor in the second window. The rendering is done at a framerate synced to the screen you use (which usually defaults to 60fps). This rendering is also necessary to use when coding visuals displayed behind the text.

## Audio

Start or stop the audio calculations (Digital Signal Processing). Turning this off will disable all processes that are considered audio.

## FPS and CPU Meter 

The FPS meter shows the current Frames Per Second that the rendering engine is running at. If you experience a very slow framerate (less then 25fps) you can find some info under [Visual Setup](#visual-setup) to help you adjust settings for your computer. 

This CPU meter shows the current CPU usage of the audio processes running in Mercury. If you experience a very high cpu-usage (more then 70) you can find some info under [Audio Setup](#audio-setup) to help you adjust settings for your computer.

## Auto Log Code

Enabling the Auto Log Code will store a version of your code to the folder `~/Documents/Mercury/Code Logs` for every time you execute your code. This can be helpful to create a history of your code and allow you to look back at your code after a performance.

## Record Audio 

Start and stop the recording of the current sound output. The recorded file will be stored to the `~/Documents/Mercury/Recordings` folder with the date and time as the filename.

## Show Variables 

View the current `ring`'s that are created in a dictionary.

## Show Audiofiles

View the loaded soundfiles and waveforms as a system path in a dictionary with their associated name that can be used in Mercury code. 

## External Editor

The external editor allows you to use a textfile from outside the Mercury environment to run as code. Generate a `.txt` file somewhere on your computer. Drag-n-drop the file in the box *drop code file here*. This will automatically enable the *Use External Editor* button. Now you can use a external editor such as Atom, VSCode or Sublime to edit your code. Upon saving the code Mercury will detect the changes and execute the current state of the file.

# Menubar

The menubar gives you access to more functionalities in Mercury such as opening a new file, opening an existing file, saving your code, executing or deleting your code, adding sounds to your library, changing settings for the audio, visuals, editor and keyboard shortcuts and opening examples, documentation and the list of sounds.

## File

Via the File menu you can:

- Create a new file (this will erase all code) : `CMD + N`
- Open a file with a `.txt` extension as a codefile : `CMD + O`
- Save a file from the current code in the editor window : `CMD + S`
- Execute Code : `ALT + RETURN`
- Silence Code : `ALT + .`
- Clear Code (same as new file) : `CMD + N`
- Load External Editor File (see [external editor](#external-editor))

## Sounds

Via the Sounds menu you can add folders of sounds and waveforms to the searchpath of the Mercury environment. The filenames of these sounds can then be used in the code to refer to. This works best if you rename your files to shorter filenames and **don't** use spaces in the name. It will recursively search for all the files that match `.wav`, `.aiff` or `.mp3`, so be careful with selecting a folder with many subdirectories and audiofiles. These files will be loaded into the RAM, so try to keep the loaded soundfiles under **4 GB**.

### Add

The **Add** option appends all the found audiofiles to the current list of already loaded files. A library with the loaded sounds is stored under `~/Documents/Mercury/Data`. 

### Replace

The **Replace** option removes all the current loaded files from the library and only addes the files that are found in the currently selected folder. The library is updated accordingly.

### Default

The **Default** option resets the library to the files that are included in the Mercury project by default. These files can be found in the `mercury_ide/media` folder

### Show Loaded

The **Show Loaded** option opens the library of loaded soundfiles. This will give you insight in if your files were loaded correctly and also shows you the buffername, duration, number of channels and samplerate of the files.

### Example for file naming
I have a soundfile: `my cool Sound 05.wav` on the computer. 

Using this in Mercury like so:

```java
new sample my cool Sound 05
```

will not work, since it will interpret the spaces as new keywords. Therefore I rename the file with underscores to: `my_cool_Sound_05.wav`. Now I can use this file like so:

```java
new sample my_cool_Sound_05
```

Since I find this filename a bit long to type during a live coding session I decide to rename it a bit shorter like so: `sound05.wav`. Now the code will look like this after importing the sound:


```java
new sample sound05
```

## Settings

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

Adjust the aspect ratio of the screen. You can choose between a variety of common used aspect ratios such as:

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

#### Visual Resolution

#### Window Size

#### Screens

#### Always in front

#### Window visible

#### Sync to Refreshrate

#### FPS

#### Auto Hide cursor

#### Fullscreen

#### Syphon output


Turn the rendering engine `on` in the main window. You will see the text-editor appear and the cursor starts blinking.
- In the event of a laggy editor, slow cursor and/or low FPS first run Max in low-resolution mode (Mac Retina-display only 10.13 or lower)
	- Go to `Applications` in the Finder
	- Right click `Max.app`
	- Click `Get Info`
	- Select `Open in Low Resolution`
	- Restart Max and the Mercury project
- Other settings you can change for the visuals:
	- `Settings > Visual Setup`
	- `Resolution`: `540`
	- `Visual Resolution`: `270`
	- `Sync to Refreshrate`: `Off`
	- `FPS`: `30` or `25`
- In the event that the cursor is not aligned with the text, change the visual settings:
	- `Settings > Visual Setup`
	- `Preselected Fonts`: `Courier New`
- Try some different fonts if Courier New is not working, you can also select a font from the `Font Library`

## Explanation