# 🐧 Linux Guide

Welcome Linux users! Unfortunately Cycling '74 doesn't provide a Linux version of Max8. However, we can get it to run decently we enough with [Wine](https://www.winehq.org/).

# 🍷 Installing and Setting Up Wine

Follow the instructions to [install Wine](https://wiki.winehq.org/Download) for your distro. Make sure you install 7.0 or newer.

Next follow the instructions to [install winetricks](https://github.com/Winetricks/winetricks#installing) (this part may be optional, but helpful)

Run the following commands to set up and configure Wine:

```
wineboot -u
winetricks corefonts vcrun2010 vcrun2013 vcrun2015
```

Finally run `winecfg` and set the Windows version to Windows 8.1 (because NodeJS requires >=8.1).


# 💻 Install Mercury with Wine

1. Download Max8 through any of the links below.
- [Windows](https://akiaj5esl75o5wbdcv2a-maxmspjitter.s3.amazonaws.com/Max808_x64_190808.zip)
- If links are not working you can go to [https://cycling74.com/downloads/older](https://cycling74.com/downloads/older) and select the Windows version

2. Extract and run the MSI installer with `wine msiexec /i /path/to/Max808_x64_190808.msi`

3. Launch Max with `wine ~/.wine/drive_c/Program\ Files/Cycling\ \'74/Max\ 8/Max.exe`

4. Follow the rest of the instructions in the [Quick Start guide](./quick-start.md) to set up Mercury with Max.
Be patient when launching Mercury, the windows may become unresponsive, but they just need some time to load.


# 🙁 Limitations

There are some known issues with running Mercury on Linux:

1. Alt+Enter does not run the code when using the Visual Editor. You will either need use File > Execute Code, use File > Load External Editor File, or use a tool like [Flok](./collaborate.md).

2. Performance can be poor, try adjusting some of the settings described in the [troubleshooting guide](./08-troubleshooting.md)

If you hit any issues not covered in this guide, see if it's covered in [this Max forum thread](https://cycling74.com/forums/max-on-linux/replies/3).
