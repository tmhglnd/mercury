
// require jsonfile for read/write
const jsonFile = require('jsonfile');
// require dictionary class
const Dict = require('./dict.js');

// in/out filenames and relative path
const file = './bind-functions.json';
const outFile = './bind-functions.gen.json';

let binds = new Dict();

// convert the function binding json to an 
// inverted json dictionary for quicker lookup
jsonFile.readFile(file, (err,obj) => {
	if (err){ 
		console.error(err);
	} else {
		let keys = Object.keys(obj);

		for (var i=0; i<keys.length; i++){
			for (var k=0; k<obj[keys[i]].length; k++){
				var key = obj[keys[i]][k];
				if (binds.has(key)){
					console.error('Warning! Duplicate keyword:', key, 
					"\n at:", binds.get(key), "and:", keys[i], "\n");
				} else {
					binds.set(key, keys[i]);
				}
			}
		}

		console.log(JSON.stringify(binds.items));
		jsonFile.writeFile(outFile, binds.items, { spaces: 2 }, (err) => {
			if (err){
				console.log(err);
			} else {
				console.log("\n conversion completed");
			}
		})
	}
})