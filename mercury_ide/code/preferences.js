
const max    = require('max-api');
const os     = require('os');
const fs     = require('fs-extra');
const path   = require('path');
const slash  = require('slash');
const fg     = require('fast-glob');

// the system info from the user
let system = {
	'user' : os.homedir(),
	'app' : process.cwd(),
	'platform' : os.platform()
	// 'tmp' : os.tmpdir(),
	// 'type' : os.type(),
	// 'release' : os.release(),
	// 'ip' : os.hostname(),
}
// convert windows paths to posix
if (system.platform === 'win32'){
	system.user = slash(system.user);
	system.app = slash(system.app);
}
max.post("system-info", system);
max.outlet("system", system);

// the default preferences and object to store prefs
let prefs = {
	"driver" : "coreaudio",
	"input" : "Built-in Microphone",
	"output" : "Built-in Output",
	"samplerate": 44100,
	"iovs": 512,
	"sigvs": 256,
	"overdrive" : 1,
	"interrupt" : 1,
	"voices" : 10,
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
	"autoCopy" : 1,
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
	"up" : [ "alt-w", 8721 ],
	"down" : [ "alt-s", 223 ],
	"left" : [ "alt-a", 229 ],
	"right" : [ "alt-d", 8706 ]
}

// the basefolder for all Mercury local files
// const base = system.user + '/Documents/Mercury';
const base = path.posix.join(system.user, '/Documents/Mercury');
max.post('Located Mercury folder in: ', base);

// variables for the preferences file
// const prefFile = base + '/Preferences/preferences.json';
const prefFile = path.posix.join(base, '/Preferences/preferences.json');
const defaults = { ...prefs };

// variables for shortkey preferences file
const shortkeysFile = path.posix.join(base, '/Preferences/shortkeys.json');
const defaultShortkeys = { ...shortkeys };

// variables for the sample library file
// const sampleFile = base + '/Data/sample-library.json';
const sampleFile = path.posix.join(base, '/Data/sample-library.json');
const defaultSamplePath = path.posix.join(system.app, "../media/samples/");
const defaultSamples = loadAudioFiles(defaultSamplePath);
let samples = {};
max.post('Located default samples in: ' + defaultSamplePath);

// variables for the wavetable library
const wfFile = path.posix.join(base, '/Data/waveform-library.json');
const defaultWFPath = path.posix.join(system.app, '../media/waveforms/');
const defaultWF = loadAudioFiles(defaultWFPath);
let waveforms = {};
max.post('Located default waveforms in: ' + defaultWFPath);

// variables for the example files
const examplesPath = path.posix.join(system.app, '../../examples/');
const examples = loadFiles(examplesPath, '**/*.txt');
max.post('Located examples in: ' + examplesPath);

// variables for library files (requires for synths, dsp, visuals)
// const libPath = path.posix.join(base, '/Library');
const libPath = path.posix.join(system.app, '../patchers/visual/');
const libFile = path.posix.join(base, '/Data/code-library.json');
let library = {};

const soundLibPath = path.posix.join(system.app, '../patchers/sound/');
const soundLibFile = path.posix.join(base, '/Data/sound-extensions.json');
let soundLibrary = {};
const visualLibPath = path.posix.join(system.app, '../patchers/visual/');
const visualLibFile = path.posix.join(base, '/Data/visual-extensions.json');
let visualLibrary = {};

// directories for storage of code logs, recordings and sketches
const userDirs = ['/Code Logs', '/Recordings', '/Library'/*, '/Sketches'*/];

// check if path for preference file exists
// check if file exists, otherwise write the default prefs
// if file exists, read the preferences
max.addHandler('init', () => {
	// create file for shortkeys and load if exists
	if (fs.pathExistsSync(shortkeysFile)){
		shortkeys = fs.readJsonSync(shortkeysFile);
		max.post('Loaded shortkeys: '+shortkeysFile);
	} else {
		shortkeys = { ...defaultShortkeys };
		writeJson(shortkeysFile, shortkeys);
		max.post('Created shortkeys: '+shortkeysFile);
	}
	max.outlet('shortkeys', shortkeys);
	
	// create path for sample file and load if exists
	if (fs.pathExistsSync(sampleFile)){
		samples = fs.readJsonSync(sampleFile);
		max.post('Loaded sample library: '+sampleFile);
	} else {
		samples = { ...defaultSamples };
		writeJson(sampleFile, samples);
		max.post('Created sample library: '+sampleFile);
	}
	max.outlet('samples', samples);

	// create path for wavetablefile and load if exists
	if (fs.pathExistsSync(wfFile)){
		waveforms = fs.readJsonSync(wfFile);
		max.post('Loaded wavetable library: '+wfFile);
	} else {
		waveforms = { ...defaultWF };
		writeJson(wfFile, waveforms);
		max.post('Created wavetable library:' +wfFile);
	}
	max.outlet('wf', waveforms);

	for (let d in userDirs){
		let f = base + userDirs[d];
		fs.ensureDirSync(f);
		max.outlet('folders', userDirs[d], f);
	}

	// create path for requires and load if exists
	// library = loadFiles(libPath, '**/*.maxpat');
	// library = Object.assign({}, loadFiles(path.posix.join(base, '/Library'), '**/*.maxpat'), library);

	soundLibrary = loadFiles(soundLibPath, '**/*.maxpat');
	soundLibrary = Object.assign({}, loadFiles(path.posix.join(base, '/Library/Sound'), '**/*.maxpat'), soundLibrary);
	visualLibrary = loadFiles(visualLibPath, '**/*.maxpat');
	visualLibrary = Object.assign({}, loadFiles(path.posix.join(base, '/Library/Visual'), '**/*.maxpat'), visualLibrary);
	// max.post('soundLib', soundLibrary);
	// max.post('visualLib', visualLibrary);

	writeJson(soundLibFile, soundLibrary);
	writeJson(visualLibFile, visualLibrary);

	// writeJson(libFile, library);
	// max.post('Created code library: '+libFile);
	// max.outlet('lib', library);
	max.outlet('vlib', visualLibrary);
	max.outlet('slib', soundLibrary);
	max.post('Visual library imported: '+visualLibFile);
	max.post('Sound library imported: '+soundLibFile);

	// create path for preferences file and load if exists
	if (fs.pathExistsSync(prefFile)){
		prefs = fs.readJsonSync(prefFile);
		Object.keys(defaults).forEach((p) => {
			if (prefs[p] === undefined) {
				prefHandlers.store(p, defaults[p]);
				max.post('new preferences added: '+p);
			}	
		});
		max.post('Loaded preferences: '+prefFile);
	} else {
		prefs = { ...defaults };
		writeJson(prefFile, prefs);
		max.post('Created preferences: '+prefFile);
	}
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
	// restore samplelibrary to default
	// output the lib to Max
	'defaultSmps': () => {
		samples = { ...defaultSamples };
		max.outlet("samples", samples);
		writeJson(sampleFile, samples);
		max.post('Samples are reset to default');
	},
	// load a folder with samples and store 
	// names with path in database file
	'loadSmps': (fold) => {
		samples = Object.assign({}, loadAudioFiles(fold), samples);
		writeJson(sampleFile, samples);
		max.outlet('samples', samples);
		max.post('Included samples from: '+fold);
	},
	// replace all samples with the content of a folder 
	// and store names with path in database file
	'replaceSmps': (fold) => {
		samples = loadAudioFiles(fold);
		writeJson(sampleFile, samples);
		max.outlet('samples', samples);
		max.post('Replaced samples with: '+fold);
	}
}
max.addHandlers(sampleHandlers);

const wfHandlers = {
	// restore wavetable library to default
	// output the library to Max
	'defaultWF': () => {
		waveforms = { ...defaultWF };
		max.outlet('wf', waveforms);
		writeJson(wfFile, waveforms);
		max.post('Waveforms are reset to default');
	},
	// load a folder with waveforms and store 
	// names with path in database file
	'loadWF': (fold) => {
		waveforms = Object.assign({}, loadAudioFiles(fold), waveforms);
		writeJson(wfFile, waveforms);
		max.outlet('wf', waveforms);
		max.post('Included waveforms from: '+fold);
	},
	// replace all samples with the content of a folder 
	// and store names with path in database file
	'replaceWF': (fold) => {
		waveforms = loadAudioFiles(fold);
		writeJson(wfFile, waveforms);
		max.outlet('wf', waveforms);
		max.post('Replaced waveforms with: '+fold);
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

function loadAudioFiles(fold){
	// Load audio files (.wav, .aif, .mp3)
	let glob = "**/*.+(wav|WAV|aif|AIF|aiff|AIFF|mp3|MP3|m4a|M4A|flac|FLAC)";
	return loadFiles(fold, glob);
}

// Load files into a dictionary based on a 
// fast-glob search string
function loadFiles(fold, glob){
	let files = fg.sync(fold + glob);
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