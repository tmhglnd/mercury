# 🏃 Quick Start

Hi! Welcome to the Quick Start guide. If you experience any issues with installing or running the code, please have a look in the Tutorial or Troubleshooting sections. This Quick Start guide is meant for people who are confident in working with the computer and have some experience with (creative) coding, music technology and music making.

# 💻 Install Mercury

Read the [system requirements](./../README.md#-system-requirements) before getting started.

Mercury runs in Max8 (sometimes also called MaxMSP), a node-based creative coding environment from Cycling'74. **You do not need to buy a Max-license in order to use Mercury!** 😎

1. Download Max8 through any of the links below.

- [Windows](https://akiaj5esl75o5wbdcv2a-maxmspjitter.s3.amazonaws.com/Max808_x64_190808.zip)
- [Mac](https://akiaj5esl75o5wbdcv2a-maxmspjitter.s3.amazonaws.com/Max808_190808.dmg)
- If links are not working you can go to [https://cycling74.com/downloads/older](https://cycling74.com/downloads/older)

2. Launch Max8 after installing. It will create a `Max 8` folder in your `Documents`. In there you may create a folder named `Projects`. The full path should now look like this: `<User>/Documents/Max 8/Projects`

3. Download the [latest release of Mercury](https://github.com/tmhglnd/mercury/releases)

	```
	Download latest release and unzip entire folder in ~/Documents/Max 8/Projects
	```
	
	**Or** for git-users you can clone/fork Mercury to the Projects folder in your Documents.
	
	```
	$ cd ~/Documents/Max\ 8/Projects
	$ git clone http://github.com/tmhglnd/mercury
	```
	
	Now your filepath should look something like: `<User>/Documents/Max 8/Projects/mercury-v.x.x.x`

# 🚀 Launch Mercury

Launch Mercury by double clicking `mercury_ide.maxproj` located in the folder `mercury-v.x.x.x/mercury-ide` **or** by running the following terminal command: 

```
$ cd mercury
$ open mercury_ide/mercury_ide.maxproj
```

You can create a shortcut or alias on your desktop or Applications folder.

- ⏳ Give it some time to load.

<!-- - ⚠ **Mac 10.14+ Users**: Make sure you give permissions under Security & Privacy Preferences. -->

In the `_mercury_main` window:

- 📺 Turn the **Rendering on**
- 🔈 Turn the **Audio on**

In the `mercury` code editor:

- 💻 Type the following code 

	```java
	set tempo 110

	new sample kick_house time(1/4)
	```

- 🔊 Hit `alt + return` or `Menubar > File > Execute Code` 
	- *Mac users: Disable the Alert Volume in `System Preferences > Sounds` to disable the error sound when using shortkeys*

- Adjust shortkey commands under `Menubar > Settings > Shortkeys Setup`

- Adjust settings under `Menubar > Settings`. [For detailed explanation go here](./07-environment.md#settings)

You are now ready to start coding your first sounds! 🎶💻🎶

# 🎲 Play!

Go ahead and play all you want! For further information see:

- View some of the example code via the menu `Explanation > Random Example`
- [Tutorial](./tutorial.md#-the-sampler)
- [Documentation](./table-of-content.md)

# ⚠ Troubleshooting

[**🚧 If you experience any issues, please see the Troubleshooting 🚧**](./08-troubleshooting.md)
