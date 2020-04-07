
const max = require('max-api');
const fs = require('fs-extra');

let cwd = process.cwd();
let usr = cwd.split('/').slice(0, 3).join('/');
let name = 'preferences.json';
let path = '/Documents/Mercury/Preferences/';
let prefFile = usr + path + name;

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
	"a_r" : "16 : 9 (1.78:1 Widescreen)",
	"res" : "720 (720p)",
	"v_res" : "720 (720p)",
	"w_size" : "270",
	"screens" : 1,
	"floating" : 1,
	"visible" : 1,
	"sync" : 1,
	"fps" : 60,
	"hidecursor" : 1,
	"fullscreen" : 0,
	"def_font" : "Courier New Bold",
	"font" : "Courier New Bold",
	"exec_color" : [0.2, 0.2, 0.2, 1],
	"cursor_c1" : [0, 1, 1, 1],
	"cursor_c2" : [1, 0, 1, 1],
	"cursor" : "<==",
	"auto_log" : 0,
	"external_editor" : 0,
}

// set the default preferences aside
let defaultPrefs = { ...prefs };

// check if path for preference file exists
// check if file exists, otherwise write the default prefs
// if file exists, read the preferences
fs.pathExists(prefFile, (err, exists) => {
	if (err) console.error(err);
	if (!exists) {
		writePrefs(prefFile, prefs);
	} else {
		fs.readJson(prefFile, (err, obj) => {
			if (err) console.error(err);
			prefs = obj;
			max.outlet("set", prefs);
		});
	}
});

// store a single parameter setting with a value
// auto-write directly to file
max.addHandler('store', (param, value) => {
	if (prefs[param] !== undefined){
		prefs[param] = value;
		max.outlet(prefs);
		writePrefs(prefFile, prefs);
	}
});

// restore preferences to default
// output the preferences to Max
max.addHandler('default', () => {
	prefs = { ...defaultPrefs };
	max.outlet("set", prefs);
	writePrefs(prefFile, prefs);
});

// sync-write the preferences
function writePrefs(file, obj){
	fs.outputJsonSync(file, obj, { spaces: 2 });
	max.post('preferences stored');
}