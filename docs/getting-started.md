# Getting Started

If you haven't installed Mercury yet, follow the instructions [here](../README.md#install)

1. Open `mercury_ide_x.x.x.maxproj`

2. Link the included sample library 
	- `File > Load Sample Library` in menubar of main window
	- select `samples` folder under `mercury/mercury_ide_x.x.x/media`
	- `open` when folder is selected
	- `Show Audiofiles` in the main window to see if the filepaths are correct.

3. Turn the rendering engine `on` in the main window. You will see the text-editor appear and the cursor starts blinking.
	- In the event of a laggy editor, slow cursor and/or low FPS change the visual settings:
		- `Settings > Visual Setup`
		- `Resolution`: `540`
		- `Sync to Refreshrate`: `Off`
		- `FPS`: `30`

4. Turn the audio engine `on` in the main window. You will see the cpu-usage meter showing a percentage.
	- In the event of no audio, laggy audio and/or clicky audio change the audio settings:
		- `Settings > Audio Setup`
		- `Driver`: `Asio4All` (Windows)
		- `Driver`: `CoreAudio` (MacOS)
		- `IO Vectorsize`: `512/1024`
		- `Signal Vectorsize`: `256/512`
		- `Overdrive`: `On`
		- `Audio Interrupt`: `On`

5. Type the following code in the code editor (focus on the window):
	- `new sample kick_909 time(1/4) gain(1)`. 
	- **run** the code by pressing:
		- `CMD + R` or `ALT + Enter` (MacOS)
		- `ALT + R` or `ALT + Enter` (Windows)
		- `File > Excecute Code` (when none of above work)
	- In the event of poor performance follow settings steps above.

6. Now go ahead and play all you want! Also read the rest of the Documentation [here](./README.md)