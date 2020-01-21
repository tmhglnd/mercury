//=======================================================================
// function-parse.js
// 
// Combine a method-function dictionary and a function-keywords 
// dictionary into one lookup table for the parser
//=======================================================================

// require jsonfile for read/write
const jsonFile = require('jsonfile');
// require dictionary class
const Dict = require('./dict.js');

// in/out filenames and relative path
const bind_func = './bind-functions.json';
const inst_meth = './instrument-methods.json';
const outFile = './bind-functions.gen.json';

let binds = new Dict();

// convert the function binding json to an 
// inverted json dictionary for quicker lookup
jsonFile.readFile(bind_func, (err, funcs) => {
	if (err){ 
		console.error(err);
	} else {
		jsonFile.readFile(inst_meth, funcs, (err, insts) => {
			if (err){
				console.error(err);
			} else {
				// get instruments with functions
				let instKeys = Object.keys(insts);

				// for all instruments
				for (var i=0; i<instKeys.length; i++){
					// temp-dictionary
					let tDict = new Dict();
					let methods = insts[instKeys[i]];

					for (var j=0; j<methods.length; j++){
						let mFuncs = funcs[methods[j]];

						for (var k=0; k<mFuncs.length; k++){
							// get all optional keywords for method
							let key = funcs[methods[j]][k];
							if (tDict.has(key)){
								// warning when duplicate keys
								console.error('Warning! Duplicate keyword:', key, "\n at:", tDict.get(key), "and:", methods[j], "\n");
							} else {
								tDict.set(key, methods[j]);
							}
						}
					}
					binds.set(instKeys[i], tDict.items);
				}
				// console.log(JSON.stringify(binds.items));
				// console.log(binds.items);
				jsonFile.writeFile(outFile, binds.items, { spaces: 2 }, (err) => {
					if (err){
						console.log(err);
					} else {
						console.log("\n => conversion completed");
					}
				})
			}
		})
	}
})