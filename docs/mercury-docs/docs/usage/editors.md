---
sidebar_position: 4
id: editors
---

# ⌨️ External Editors

Instead of using the built-in editor that comes with Mercury4Max (an editor that is running with OpenGL in the Jitter visual environment) or the CodeMirror editor that is running in the MercuryPlayground, you can also work with external code editors and just use Mercury4Max as the sound engine.

## 👾 Flok

[**Flok**](https://flok.cc/) is a web-based P2P collaborative editor for live coding music and graphics developed by Damián Silvani (a.k.a. Munshkr). Similar to Etherpad, but focused on code evaluation for livecoding. While the main focus is on collaborative coding, you can also use flok as an external editor for your solo coding.

- [**Start using Flok with the manual in 👩‍💻👨‍💻 Collaborative Coding**](./../collaborate)

## ⚛️ Pulsar

[**Pulsar**](https://pulsar-edit.dev/) is a Community-led Hyper-Hackable Text Editor that you can install for Windows, OSX and Linux. You can extend the editor with custom plugins. 

After installing the `mercury-pulsar` plugin you can type code in the editor and send it via OSC-messages as `/mercury-code "<code here>"` over UDP to port `4880`.

### 💻 Install (OSX/Linux)

Make sure that `ppm` (Pulsar Package Manager) is installed. On linux, it should be automatically installed with Atom. On OSX, go to the `Pulsar` menu and click `Install Shell Commands`.

1. Download the [**plugin**](http://github.com/tmhglnd/mercury-pulsar) or clone via `$ git clone http://github.com/tmhglnd/mercury-pulsar`
2. Navigate to the directory `$ cd mercury-pulsar` and install the dependencies `ppm install`
3. Load the package `$ ppm link .`
4. Restart Pulsar

#### 💾 Install (Windows)

Windows doesn't support `ppm`, instead use `npm` and the following steps:

1. Download this repository via `$ git clone http://github.com/tmhglnd/mercury-pulsar`
2. Navigate to the directory and install the dependencies with `npm` instead of `ppm`:
	- `$ cd mercury-pulsar` and `npm install`
3. Manually copy-paste the entire folder `mercury-pulsar` to `C:\Users\<username>\.pulsar\packages`

### 🎮 Usage

1. Start Mercury4Max or the MercuryPlayground (running locally!, [**see instructions here**](./../getting-started.md#🌑-without-internet))
2. Create an empty file in Pulsar and write your code. This can be a plain `.txt` file.
3. Go to `Menu` > `Packages` > `Open Package Manager`, find the `mercury` package and click on `Enable`.
4. The package should be automatically activated
	- You can also toggle the package on/off with `cmd + shift + p`
	- Search for `mercury:toggle` and `enter`.
5. Type some code and:
	- Evaluate with `cmd/ctrl/alt + enter` 
	- Silence the sound with `cmd/ctrl/alt + .`
	- Randomize variables `cmd/ctrl/alt + shift + r`

<!-- - [Follow the instructions here for the Pulsar Plugin](https://github.com/tmhglnd/mercury-pulsar#-mercury-plugin-for-pulsar) -->
<!-- - [Follow the instructions here for other editors](https://github.com/tmhglnd/mercury/blob/master/docs/07-environment.md#external-editor) -->