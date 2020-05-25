
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
	'tmp' : os.tmpdir(),
	'type' : os.type(),
	'release' : os.release(),
	'platform' : os.platform(),
	'ip' : os.hostname(),
}
/* if (system.type === 'win32'){
	system.user = slash(system.user);
	system.app = slash(system.app);
}*/
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
	"v_res" : "720 (720p)",
	"res" : "720 (720p)",
	"w_size" : "270",
	"a_r" : "16 : 9 (1.78:1 Widescreen)",
	"screens" : 1,
	"floating" : 1,
	"visible" : 1,
	"sync" : 1,
	"fps" : 60,
	"hidecursor" : 1,
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
	"autoLog" : 0,
	"external_editor" : 0,
}

// the basefolder for all Mercury local files
// const base = system.user + '/Documents/Mercury';
const base = path.join(system.user, '/Documents/Mercury');

// variables for the preferences file
// const prefFile = base + '/Preferences/preferences.json';
const prefFile = path.join(base, '/Preferences/preferences.json');
const defaults = { ...prefs };

// variables for the sample library file
// const sampleFile = base + '/Data/sample-library.json';
const sampleFile = path.join(base, '/Data/sample-library.json');
const defaultSamplePath = path.join(system.app, "../media/samples")
const defaultSamples = loadSamples(defaultSamplePath);
let samples = {};

// directories for storage of code logs, recordings and sketches
const userDirs = ['/Code Logs', '/Recordings', '/Sketches'];

// check if path for preference file exists
// check if file exists, otherwise write the default prefs
// if file exists, read the preferences
max.addHandler('init', () => {
	
	// create path for preferences file and load if exists
	if (fs.pathExistsSync(prefFile)){
		max.post('Loaded preferences.json: '+prefFile);
		prefs = fs.readJsonSync(prefFile);
	} else {
		max.post('Created preferences.json: '+prefFile);
		prefs = { ...defaults };
		writeJson(prefFile, prefs);
	}
	max.outlet('settings', prefs);
	
	// create path for sample file and load if exists
	if (fs.pathExistsSync(sampleFile)){
		max.post('Loaded sample-library.json: '+sampleFile);
		samples = fs.readJsonSync(sampleFile);
	} else {
		max.post('Created sample-library.json: '+sampleFile);
		samples = { ...defaultSamples };
		writeJson(sampleFile, samples);
	}
	max.outlet('samples', samples);

	for (let d in userDirs){
		let f = base + userDirs[d];
		fs.ensureDirSync(f);
		max.outlet('folders', userDirs[d], f);
	}
});

// store a single parameter setting with a value
// auto-write directly to file
max.addHandler('store', (param, ...value) => {
	if (prefs[param] !== undefined){
		value = (value.length > 1)? value : value[0];
		prefs[param] = value;
		writeJson(prefFile, prefs);
	}
});

// restore preferences to default
// output the preferences to Max
max.addHandler('default', () => {
	prefs = { ...defaults };
	max.outlet("settings", prefs);
	writeJson(prefFile, prefs);
});

// load a folder with samples and store 
// names with path in database file
max.addHandler('load', (fold) => {
	samples = Object.assign({}, loadSamples(fold), samples);
	writeJson(sampleFile, samples);
	max.outlet('samples', samples);
});

// replace all samples with the content of a folder 
// and store names with path in database file
max.addHandler('replace', (fold) => {
	samples = loadSamples(fold);
	writeJson(sampleFile, samples);
	max.outlet('samples', samples);
});

function loadSamples(fold){
	let files =	fg.sync(fold+"/**/*.+(wav|aif|aiff)");
	let samples = {};
	
	for (let f in files){
		let file = path.parse(files[f]);
		samples[file.name] = files[f];
	}
	return samples;
}

// restore samplelibrary to default
// output the lib to Max
max.addHandler('defaultSamples', () => {
	samples = { ...defaultSamples };
	max.outlet("samples", samples);
	writeJson(sampleFile, samples);
});

// Sync-write a JSON file to disk
function writeJson(file, obj){
	fs.outputJsonSync(file, obj, { spaces: 2 });
	// max.post('File saved: ' + file);
}