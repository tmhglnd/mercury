---
sidebar_position: 5
id: troubleshooting
---

# 🚧 Troubleshooting

If you are having issues please follow the steps below:

1. Check if your issue is part of this troubleshooting page
2. Check if your problem was already reported in the [issues](https://github.com/tmhglnd/mercury/issues)
4. Ask help from the community on the [Mercury Discord](https://discord.gg/vt59NYU)
3. In case you don't find an answer, please file a [new issue](https://github.com/tmhglnd/mercury/issues/new)
5. Or fix the bug yourself and send me a pull request 🙏 (much appreciated!)

## My sounds are not playing

**in Mercury4Max**

First make sure you have selected the correct output for your sound in the Audio Settings. Then make sure you have clicked Audio to `on`.

When the soundfiles don't load correctly the first time you start Mercury you will not hear any sounds playing (for both the `sample` and `synth`).

You can add the soundfiles manually by going to `Sounds > Replace Sounds`, then select the folder `/mercury_v.0.13.0-alpha/mercury_ide/media/samples`. 

Do the same for the waveforms: `Sounds > Replace Waveforms`, then select the folder `/mercury_v.0.13.0-alpha/mercury_ide/media/waveforms`

**in MercuryPlayground**

First make sure you have selected the correct output for your browser to send the sound to. Usually this is the same as your system output.

When the `loading sounds...` message doesn't seem to stop you can try refreshing the page, sometimes it can get stuck.

Check your internet connection speed, loading the sounds can take a bit of time.

If the website doesn't seem to work for you you can try installing it locally. For that see the [Getting Started Guide](./../getting-started)

## I hear an Alert sound when I execute the code on Mac

Most Mac users will hear an Alert sound when they hit keycommands that the operating system does not recognize. You can disable the "Alert Volume" in `System Preferences > Sounds > Sound Effects`.

## My CPU usage is very high

In case you are experiencing a very high cpu usage (resulting in clicks, pops, glitches, crackling, stutter or anything that doesn't sound like it is supposed to) please try:

**in Mercury4Max**

Go to the settings in `Settings > Audio`:

- Total instruments: `4`
- Driver: `Core Audio` or `Asio4All`
- Samplerate: `44100`
- I/O Buffersize: `1024`
- Signal Buffersize: `512`
- Overdrive: `on`
- Audio Interrupt: `on`

For a detailed explanation of all the Audio Settings please go [here](./../usage/mercury4max.md#audio-setup)

**in MercuryPlayground**

The browser version sadly doesn't have much settings that can be adjusted. The best to do is try using less resources in the code. 

`reverb` is an effect that requires quite some processing. Applying reverbs to all instruments can increase the processing and memory usage. Try removing all reverbs to see if that makes a difference. Using less instruments is another good place to start.

## My editor in Mercury4Max is very laggy (low FPS)

In case you are experiencing a very laggy editor, slow cursor, low FPS and slow response you can try the following settings:

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

For a detailed explanation of all the Visual Settings please go [here](./../usage/mercury4max.md#visual-setup)

You can also consider using an [External Editor](./../usage/editors) instead.

## Mercury4Max keeps crashing when I execute code

This can indicate that the computer is not able to display the editor or visual extensions correctly. If you are using Mercury just for the sound/sequencing, please try:

- Install an [External Editor](./../usage/editors) to work with Mercury4Max
- Use the [MercuryPlayground](./../getting-started.md#-mercuryplayground) instead of Max8
