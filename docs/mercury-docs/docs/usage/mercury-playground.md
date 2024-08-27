---
sidebar_position: 1
id: playground-overview
---

# 🛝 MercuryPlayground Overview

This chapter gives an overview of the features in the user interface of the MercuryPlayground. The settings are described from left-right from top-bottom on the page.

## Top Menu

The top menu contains: `play`, `silence`, `empty`, `example`, `save`, `record`, `light/dark mode`

### Play

Click the `play` button to evaluate the code, and if there are no errors the code will be translated to sound. This button is also the interaction you need to have with the page to give permission to start sound. 

You can also use the shortkey: `Option/Alt/Ctrl` `Enter`

### Silence

Click the `silence` button to stop the sequencer and the playing sounds.

You can also use the shortkey: `Option/Alt/Ctrl` `.`

### Empty

Click `empty` if you want to remove all the code from the editor.

### Example

Clicking `example` will load a random example in the editor and immediately play the sound. The random examples are made beforehand, they are not generated. Feel free to submit your creation as an example via the issues page or as a pull request!

### Save

Save the current code as a text file to your downloads folder.

### Record

Start recording the current sound. Clicking once starts the recording making the button flash in red. Clicking again stops the recording and saves the recording to your downloads folder. The file is recorded as a `.webm` file. You can use some online converters to convert the sound from `.webm` to for example `.wav` or `.aiff`.

### Light/Dark Mode

Click this little square to change the editor from Dark to Light mode.

## Editor

The editor is the window where you type all your code. While focused on this window you can use the shortkeys for `play`, `silence`, `comment` and other regular shortkeys for editing code such as copy-pasting.

If you want to load a file from your computer in the editor you can simply drag-n-drop it in.

## Bottom Menu

The bottom menu contains: `tutorials`, `sounds`, `help`, `collaborate`, `add sounds`, `hide menu`, `use hydra`

### Tutorials

Load various interactive tutorials from this menu. Clicking a tutorial will replace the current code for the tutorial code and automatically evaluate the code that is in the tutorial.

### Sounds

See the list of all the sounds included in Mercury. If you click on the sound the text will be pasted in the editor on the location of your cursor. If you first select a part of text in the code (for example another sound name) you can click on a new sound from the list and replace the selected text with the new sound.

For a full overview of the included sounds see [Sounds in Mercury](sounds).

### Help

Clicking help opens a new tab with the Mercury documentation.

### Collaborate

Open a new [**Flok**](https://flok.cc) session to start collaborating with `mercury` or `mercury-web`.

### Add Sounds

You can add sounds from your computer to the web version. This is temporarily, sounds are not uploaded to any server but just played locally from your device. If you refresh or restart the browser you have to add the files again. You can select multiple files at once before clicking `open`. The files you can use are `.wav` and `.mp3`. If the loading is succesful you see a log in the console with something like: `sound added as: <name>`. The `<name>` is what you'll have to use in the code after `new sample <name>`

When you run the application locally you can also replace or add any sounds to the public/assets/samples folder and run npm run build, this creates a new database of soundfiles in src/data/samples.json.

### Hide Menu

Hide the menu so you only see the code-editor. Useful for performance situations where you like to focus on the code and nothing more. You can also show/hide the code-editor with `Ctrl Shift H`. This is useful when you have Hydra visuals running in the background and you'd like to only see those.

### Use Hydra

It is possible to include [**Hydra visuals**](https://hydra.ojack.xyz) from the Hydra live coding language created by Olivia Jack as a background in the Mercury Playground. Go to the Hydra website and start editing the code. When you're done you can copy all the code and past it in the little textarea that says: `<paste hydra code for background visuals>`. Click outside the textarea to make the visuals.