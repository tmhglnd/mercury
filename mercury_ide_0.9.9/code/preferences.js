
const max    = require('max-api');
const os     = require('os');
const fs     = require('fs-extra');
const path   = require('path');
const slash  = require('slash');
const walker = require('folder-walker');

// the system info from the user
let system = {
	'user' : os.homedir(),
	'platform' : os.platform(),
	'type' : os.type(),
	'release' : os.release(),
}
if (system.type === 'win32'){
	system.user = slash(system.user);
}
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
	"exec_color" : [0.2, 0.2, 0.2, 1],
	"cursor_c1" : [0, 1, 1, 1],
	"cursor_c2" : [1, 0, 1, 1],
	"cursor" : "<==",
	"autoLog" : 0,
	"external_editor" : 0,
}

// the basefolder for all Mercury local files
const base = system.user + '/Documents/Mercury';

// variables for the preferences file
const prefFile = base + '/Preferences/preferences.json';
const defaults = { ...prefs };

// variables for the sample library file
const sampleFile = base + '/Data/sample-library.json';
let samples = {};

// directories for storage of code logs, recordings and sketches
const userDirs = ['/Code Logs', '/Recordings', '/Sketches'];

// check if path for preference file exists
// check if file exists, otherwise write the default prefs
// if file exists, read the preferences
max.addHandler('init', () => {
	max.post('Load Preference from: ', prefFile);
	max.post('Load Samples from: ', sampleFile);
	
	// create path for preferences file and load if exists
	if (fs.pathExistsSync(prefFile)){
		prefs = fs.readJsonSync(prefFile);
	} else {
		prefs = { ...defaults };
		writeJson(prefFile, prefs);
	}
	max.outlet('settings', prefs);

	// create path for sample file and load if exists
	if (fs.pathExistsSync(sampleFile)){
		samples = fs.readJsonSync(sampleFile);
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
max.addHandler('store', (param, value) => {
	if (prefs[param] !== undefined){
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


// load a folder with samples and store names with path in database
max.addHandler('load', (fold) => {
	let stream = walker(fold);
	
	stream.on('data', (data) => {
		let file = path.parse(data.filepath);
		let ext = file.ext;
		if (ext === '.wav' || ext === '.aif' || ext === '.aiff') {
			samples[file.name] = data.filepath;
		}
	});
	
	stream.on('end', () => { 
		writeJson(sampleFile, samples); 
		max.outlet('samples', samples);
	});
});

// Sync-write a JSON file to disk
function writeJson(file, obj){
	fs.outputJsonSync(file, obj, { spaces: 2 });
	// max.post('File saved: ' + file);
}