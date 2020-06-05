# Getting Started

If you haven't installed Mercury yet, please follow the instructions [here](../README.md#install)

## 1 Start

Open `mercury_ide.maxproj`

## 2 Sounds

Load a custom sample library
- `Sounds > Add Sounds` in the menubar
- select a folder with sounds on your computer
- `open` when folder is selected
- `Sounds > Show Loaded Sounds` to view if all the files have been loaded correctly.

Or the default samples (this should be the default when first opening)
- `Sounds > Default Sounds` in the menubar
- `Sounds > Show Loaded Sounds` to view if all the files have been loaded correctly.

## 3 Editor on

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

## 4 Audio on

Turn the audio engine `on` in the main window. You will see the cpu-usage meter showing a percentage.
- Below are some preferred settings for the Audio that work best for most computers:
	- `Settings > Audio Setup`
	- `Driver`: `Asio4All` (Windows)
	- `Driver`: `CoreAudio` (MacOS)
	- `Samplerate`: `44100`
	- `IO Buffersize`: `512` or `1024`
	- `Signal Buffersize`: `256` or `512`
	- `Overdrive`: `On`
	- `Audio Interrupt`: `On`
- Higher `IO Buffersize` and `Signal Buffersize` values will reduce underflow of samples and therefore less clicks, but might affect the timing of events and introduce some latency. You can see the cpu-usage in the main window or in the audio settings. Achieving a cpu usage below 30 is recommended. The usage will grow when adding cpu intensive sound effects like reverb.

## 5 Example code

Now load a random example:
- `Explanation > Random Example`
- **run** the code by pressing:
	- `ALT + Enter` (MacOS)
	- `ALT-GR + Enter` (Windows)
	- `File > Excecute Code` (in the menubar when none of above work)
- In the event of poor performance follow the steps [3](#editor-on) and [4](#audio-on).

## 6 Play!

Now go ahead and play all you want! Also read the rest of the Documentation [here](./README.md)
