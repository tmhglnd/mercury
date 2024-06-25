// 
// Mercury preferences and file loading script
// 

const max = require('max-api');
const os = require('os');
const fs = require('fs-extra');
const path = require('path');
const slash = require('slash');
const fg = require('fast-glob');
const { parse, stringify } = require('ini');

// the system info from the user
let system = {
	'user' : os.homedir(),
	'app' : process.cwd(),
	'platform' : os.platform(),
}
// convert windows paths to posix
if (system.platform === 'win32'){
	system.user = slash(system.user);
	system.app = slash(system.app);
}
max.post("system-info", system);
max.outlet("system", system);

// Read a mercury.ini file from the /mercury_ide folder
// Create the file if there is none present yet
// User can adjust this themselves if prefered
let configDefault = `
; Adjust base if you want to use a different location for /Mercury
base = /Documents/Mercury
user = null
app  = null

[default]
samples   = ../media/samples/
waveforms = ../media/waveforms/
examples  = ../../examples/
sounds    = ../patchers/sounds/
visuals   = ../patchers/visual/
`;
if (!fs.existsSync('../mercury.ini')){
	fs.writeFileSync('../mercury.ini', configDefault);
}

// config ini file default in mercury (default paths)
let config = parse(fs.readFileSync('../mercury.ini', 'utf-8'));
const iniOptions = { whitespace: true, align: true, comment: true };
max.post('ini:', config);

if (!config.user){ config.user = system.user; }
if (!config.app){ config.app = system.app; }
fs.writeFileSync('../mercury.ini', stringify(config, iniOptions));

// the basefolder for all Mercury local files
// >> the path can be changed in the mercury.ini file if you prefer
const base = join(config.user, config.base);
max.post('located /Mercury folder: ' + base);

// config ini file for user (custom paths)
let user;
const configPath = join(base, './mercury-user.ini');

// the default preferences and object to store prefs
let prefs = {
	"driver" : "coreaudio",
	"input" : "Built-in Microphone",
	"output" : "Built-in Output",
	"samplerate": 44100,
	"iovs": 256,
	"sigvs": 256,
	"overdrive" : 1,
	"interrupt" : 1,
	"voices" : 8,
	"evaluateAfter": 0,
	"v_res" : "720 (720p)",
	"res" : "720 (720p)",
	"w_size" : "270",
	"a_r" : "16 : 10 (Computer Screen / Macbook)",
	"screens" : 1,
	"floating" : 0,
	"visible" : 1,
	"sync" : 1,
	"fps" : 60,
	"hidecursor" : 0,
	"fullscreen" : 0,
	"syphon" : 0,
	"def_font" : "Courier New Bold",
	"font" : "Courier New Bold",
	"tracking" : 0.95,
	"leadscale" : 0.95,
	"scale" : 1,
	"position" : [0, 0],
	"text_color": [1, 1, 1, 1],
	"cursor_color": [1, 0.5, 0, 1],
	"blink_color": [0, 0.5, 1, 1],
	"run_color": [0.2, 0.2, 0.2, 1],
	"number_color": [0.3, 0.3, 0.3, 1],
	"blink_enable" : 1,
	"blink_time" : 300,
	"cursor" : "<<",
	"ignore_keys": 0,
	"slide_time": 15,
	"autoLog" : 1,
	"extEditor" : 0,
	"osc_ip" : "localhost",
	"osc_in" : 8000,
	"osc_out" : 9000
}

// the default shortkeys for mac
let shortkeys = {
	"execute" : [ "alt-return", 2044 ],
	"silence" : [ "alt-.", 8805 ],
	"comment" : [ "alt-/", 247 ],
	"disable-editor" : [ "alt-,", 8804 ],
	"delete-line" : [ "alt-x", 8776 ],
	"copy-line" : [ "alt-c", 231 ],
	"paste-line" : [ "alt-v", 8730 ],
	"paste-replace-line" : [ "alt-p", 960 ],
	"jump-top" : [ "alt-up", 2039 ],
	"jump-bottom" : [ "alt-down", 2038 ],
	"jump-begin" : [ "alt-left", 2037 ],
	"jump-end" : [ "alt-right", 2036 ],
	"jump-word-left" : [ undefined, null ],
	"jump-word-right" : [ undefined, null ],
	"up" : [ "alt-w", 8721 ],
	"down" : [ "alt-s", 223 ],
	"left" : [ "alt-a", 229 ],
	"right" : [ "alt-d", 8706 ]
}

// variables for the preferences file
const prefFile = join(base, '/Preferences/preferences.json');
const defaults = { ...prefs };

// variables for shortkey preferences file
const shortkeysFile = join(base, '/Preferences/shortkeys.json');
const defaultShortkeys = { ...shortkeys };

// variables for the sample library file
// const sampleFile = base + '/Data/sample-library.json';
const sampleFile = join(base, '/Data/sample-library.json');
const defaultSamplePath = join(system.app, config.default.samples);
const defaultSamples = loadAudioFiles(defaultSamplePath);
let samples = {};
max.post('located default samples: ' + defaultSamplePath);

// variables for the wavetable library
const wfFile = join(base, '/Data/waveform-library.json');
const defaultWFPath = join(system.app, config.default.waveforms);
const defaultWF = loadAudioFiles(defaultWFPath);
let waveforms = {};
max.post('located default waveforms: ' + defaultWFPath);

// variables for the example files
const examplesPath = join(system.app, config.default.examples);
const examples = loadFiles(examplesPath, '/**/*.txt');
max.post('Located examples: ' + examplesPath);

// variables for library files (requires for synths, dsp, visuals)
// const libPath = join(base, '/Library');
// const libPath = join(system.app, '../patchers/visual/');
// const libFile = join(base, '/Data/code-library.json');
// let library = {};

const soundLibPath = join(system.app, config.default.sounds);
const soundLibFile = join(base, '/Data/sound-extensions.json');
let soundLibrary = {};

const visualLibPath = join(system.app, config.default.visuals);
const visualLibFile = join(base, '/Data/visual-extensions.json');
let visualLibrary = {};

// directories for storage of code logs, recordings and sketches
const userDirs = ['/Code Logs', '/Recordings', '/Library'/*, '/Sketches'*/];

// init mercury with all the files from different folders
max.addHandler('init', () => {
	// create user directories in prefered /Mercury location
	for (let d in userDirs){
		let f = join(base + userDirs[d]);
		fs.ensureDirSync(f);
		max.outlet('folders', userDirs[d], f);
	}

	// create user.ini file with defaults that can be adjusted 
	// with custom paths to samples, waveforms, etc
	let configUser = "[samples]\npath[] = default\n\n[waveforms]\npath[] = default\n";
	if (!fs.existsSync(configPath)){
		fs.writeFileSync(configPath, configUser, iniOptions);
	}
	user = parse(fs.readFileSync(configPath, 'utf-8'));
	max.post('user ini:', user);

	// load all the other samples based on file paths
	// files with the same name overwrite previous loaded files
	loadSamplesFromIni();

	// load all waveforms from the mercury-user.ini file path
	// files with the same name overwrite previous loaded files
	loadWaveformsFromIni();

	// create file for shortkeys and load if exists
	if (fs.pathExistsSync(shortkeysFile)){
		shortkeys = fs.readJsonSync(shortkeysFile);
	} else {
		shortkeys = { ...defaultShortkeys };
		writeJson(shortkeysFile, shortkeys);
	}
	max.outlet('shortkeys', shortkeys);
	max.post('loaded shortkeys: ' + shortkeysFile);

	// library = loadFiles(libPath, '**/*.maxpat');
	// library = Object.assign({}, loadFiles(join(base, '/Library'), '**/*.maxpat'), library);
	
	// load require files from defaults and if the folders exist
	// in /Documents/Mercury/Library/(Sound|Visual)/
	soundLibrary = loadFiles(soundLibPath, '**/*.maxpat');
	soundLibrary = Object.assign({}, loadFiles(join(base, '/Library/Sound'), '**/*.maxpat'), soundLibrary);
	writeJson(soundLibFile, soundLibrary);

	visualLibrary = loadFiles(visualLibPath, '**/*.maxpat');
	visualLibrary = Object.assign({}, loadFiles(join(base, '/Library/Visual'), '**/*.maxpat'), visualLibrary);
	writeJson(visualLibFile, visualLibrary);

	max.outlet('vlib', visualLibrary);
	max.outlet('slib', soundLibrary);
	max.post('visual library imported: ' + visualLibFile);
	max.post('sound library imported: ' + soundLibFile);

	// check if preferences exist, otherwise write the default prefs
	// if file exists, read the preferences
	if (fs.pathExistsSync(prefFile)){
		prefs = fs.readJsonSync(prefFile);
		Object.keys(defaults).forEach((p) => {
			if (prefs[p] === undefined) {
				prefHandlers.store(p, defaults[p]);
				max.post('new preferences added: '+p);
			}
		});
	} else {
		prefs = { ...defaults };
		writeJson(prefFile, prefs);
	}
	max.post('loaded preferences: ' + prefFile);
	max.outlet('settings', prefs);
});

const prefHandlers = {
	// store a single parameter setting with a value
	// auto-write directly to file
	'store' : (param, ...value) => {
		value = (value.length > 1)? value : value[0];
		prefs[param] = value;
		writeJson(prefFile, prefs);
	},
	// restore preferences to default
	// output the preferences to Max
	'default' : () => {
		prefs = { ...defaults };
		max.outlet("settings", prefs);
		writeJson(prefFile, prefs);
	}
}
max.addHandlers(prefHandlers);

const keyHandlers = {
	// store the keybinding settings when changed
	'storeKeys': (dict) => {
		shortkeys = { ...dict };
		writeJson(shortkeysFile, shortkeys);
	},
	// restore the keyshortcuts to the default
	// output the preferences to Max
	'defaultKeys': () => {
		shortkeys = { ...defaultShortkeys };
		max.outlet('shortkeys', shortkeys);
		writeJson(shortkeysFile, shortkeys);
	}
}
max.addHandlers(keyHandlers);

const sampleHandlers = {
	'samples' : (action, fold) => {
		// clear or add path to ini file depending on action
		// default = reset buffers to default files
		// replace = replace the files with the loaded folder
		// load = add the folder to the paths
		if (action !== 'load'){
			user.samples.path = [];
		}
		if (action === 'default'){
			user.samples.path.push('default');
		} else {
			user.samples.path.push(fold);
		}
		// write to config to the ini file
		writeConfig();

		// add files to dict and load in polybuffer
		loadSamplesFromIni();

		// print a message to the console
		if (action !== 'default'){
			max.post('added samples from: ' + fold)
		} else {
			max.post('samples reset to default');
		}
	}
}
max.addHandlers(sampleHandlers);

const wfHandlers = {
	'wf' : (action, fold) => {
		// clear or add path to ini file depending on action
		// default = reset buffers to default files
		// replace = replace the files with the loaded folder
		// load = add the folder to the paths
		if (action !== 'load'){
			user.waveforms.path = [];
		}
		if (action === 'default'){
			user.waveforms.path.push('default');
		} else {
			user.waveforms.path.push(fold);
		}
		// write to config to the ini file
		writeConfig();

		// add files to dict and load in polybuffer
		loadWaveformsFromIni();

		// print a message to the console
		if (action !== 'default'){
			max.post('added waveforms from: ' + fold)
		} else {
			max.post('waveforms reset to default');
		}
	}
}
max.addHandlers(wfHandlers);

let exampleFiles = [];
let prevExample;
max.addHandler('randomExample', () => {
	let l = exampleFiles.length;
	if (l < 1){
		exampleFiles = Object.keys(examples);
		l = exampleFiles.length;
	}
	let n = Math.floor(Math.random() * l);
	if (prevExample === n){
		n = (n + 1) % l;
	}
	prevExample = n;
	let path = examples[exampleFiles[n]];
	max.post('Opened example: ' + exampleFiles[n]);

	exampleFiles.splice(n, 1);
	max.outlet('example', path);
});

// use the mercury-user.ini file to load all the folders into memory
function loadSamplesFromIni(){
	loadAudioFromIni('samples', samples, defaultSamples, sampleFile);
}
// use the mercury-user.ini file to load all the folders into memory
function loadWaveformsFromIni(){
	loadAudioFromIni('waveforms', waveforms, defaultWF, wfFile);
}

// load audiofiles from ini file, also checking default
function loadAudioFromIni(type, dict, defaults, file){
	user[type].path?.forEach((path) => {
		if (path === 'default'){
			// load the default samples
			dict = Object.assign({}, dict, defaults);
		} else if (path){
			dict = Object.assign({}, dict, loadAudioFiles(path));
		}
	});
	writeJson(file, dict);
	max.outlet(`${type}`, dict);
	// max.post(`loaded ${type} library: ` + file);
}

// Load audio files (.wav, .aif, .mp3)
function loadAudioFiles(fold){
	let glob = "**/*.+(wav|WAV|aif|AIF|aiff|AIFF|mp3|MP3|m4a|M4A|flac|FLAC)";
	return loadFiles(fold, glob);
}

// Load files into a dictionary based on a 
// fast-glob search string
function loadFiles(fold, glob){
	// use posix.join and slash to make sure no double-slashes on win
	let files = fg.sync(join(slash(fold), glob));
	let dict = {};

	for (let f in files){
		// max.post(files[f]);
		let file = path.parse(files[f]);
		dict[file.name] = files[f];
	}
	return dict;
}

// Sync-write a JSON file to disk with spaces
function writeJson(file, obj){
	fs.outputJsonSync(file, obj, { spaces: 2 });
}

// Join two or more paths together
function join(){
	return path.posix.join(...arguments);
}

// write the user config file to disk
function writeConfig(){
	fs.writeFileSync(configPath, stringify(user, iniOptions));
}