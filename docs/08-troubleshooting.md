
# ⚠ Troubleshooting

If you are having issues please follow the steps below:

1. Check this [troubleshooting page](#table-of-content)
2. Check if your problem was already reported in the [issues](https://github.com/tmhglnd/mercury/issues)
3. If not, please file a [new issue](https://github.com/tmhglnd/mercury/issues/new)
4. Ask help on the [Mercury Discord](https://discord.gg/vt59NYU)
5. Or fix the bug yourself and send me a pull request 🙏 (much appreciated!)

# Table of Content

- [My sounds are not playing](#my-sounds-are-not-playing)
- [I hear an Alert sound when I execute the code](#i-hear-an-alert-sound-when-i-execute-the-code)
- [My CPU usage is very high](#my-cpu-usage-is-very-high)
- [My editor is very laggy (low FPS)](#my-editor-is-very-laggy-low-fps)
- [Mercury keeps crashing when I execute code](#mercury-keeps-crashing-when-i-execute-code)

## My sounds are not playing

When the soundfiles don't load correctly the first time you start Mercury you will not hear any sounds playing (for both the `sample` and `synth`).

You can add the soundfiles manually by going to `Sounds > Replace Sounds`, then select the folder `/mercury_v.0.13.0-alpha/mercury_ide/media/samples`. 

Do the same for the waveforms: `Sounds > Replace Waveforms`, then select the folder `/mercury_v.0.13.0-alpha/mercury_ide/media/waveforms`

## I hear an Alert sound when I execute the code

Most Mac users will hear an Alert sound when they hit keycommands that the operating system does not recognize. You can disable the Alert Volume in `System Preferences > Sounds > Sound Effects`.

## My CPU usage is very high

In case you are experiencing a very high cpu usage (resulting in clicks/pops/glitches) please try the following settings in `Settings > Audio`:

- Total instruments: `4`
- Driver: `Core Audio` or `Asio4All`
- Samplerate: `44100`
- I/O Buffersize: `1024`
- Signal Buffersize: `512`
- Overdrive: `on`
- Audio Interrupt: `on`

For a detailed explanation of all the Audio Settings please go [here](./07-environment.md#audio-setup)

## My editor is very laggy (low FPS)

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

For a detailed explanation of all the Visual Settings please go [here](./07-environment.md#visual-setup)

## Mercury keeps crashing when I execute code

This can indicate that the computer is not able to display the editor or visual extensions correctly. If you are using Mercury just for the sound/sequencing, please try to following steps:

1. Install an external texteditor software (like for example Atom, Visual Studio Code, Sublime)
2. Create a simple `.txt` file somewhere on the computer.
3. Drag-and-drop that file in the Mercury main window right from `Use External Editor`. 
4. Once the file is loaded the toggle will enable. 

Now every time you save your file after coding it will execute the current version of that code.