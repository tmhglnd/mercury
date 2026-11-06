//====================================================================
// Mercury Intermediate Representation
// written by Timo Hoogland (c) www.timohoogland.com
//
// Returns results for the parsing tree when parsing a line of code
// Inspired by the SEMA language Intermediate Representation by
// Chris Kiefer, Thor Magnuson & Francesco Bernardo
//====================================================================

// const bind = require('./bind-functions.gen.json');

// total-serialism library functions
const tsIR = require('./totalSerialismIR.js').functionMap;
// mercury IR
const keyBind = require('./mercuryIR.js').keyBind;
// included instrument/object defaults
const instruments = require('../data/instrument-defaults.js').instrumentDefaults;
// mini language, use single characters for keywords and functions
// const miniLang = require('../data/mini-functions.json');

// code accepted global parameters
const globals = 'tempo signature amp scale root randomSeed highPass lowPass silence sound crossFade'.split(' ');

// code defaults and parsetree
let code = {
	'global' : {
		// 'tempo' : [ 90 ],
		// 'volume' : [ 0.8 ],
		// 'scale' : [ 'chromatic', 'c' ],
		// 'root' : [ 'c' ],
		// 'signature' : [ '4/4' ],
		'randomSeed' : [ 0 ],
		'highPass' : [ 5, 0 ],
		'lowPass' : [ 18000, 0 ],
		'silence' : false,
	},
	'variables' : {},
	'objects' : {},
	'groups' : {
		'all' : []
	},
	'print' : [],
	'display' : [],
	'comments' : [],
	'errors' : [],
	'warnings' : []
}

function deepCopy(o){
	return JSON.parse(JSON.stringify(o));
}

function traverseTreeIR(tree){
	// deepcopy the syntax tree
	let tmp = deepCopy(tree);
	// deepcopy the code template
	let ccode = deepCopy(code);
	tmp.map((t) => {
		// console.log('@tree', t);
		tmp = traverseTree(t, ccode);
	})
	return ccode;
}

function traverseTree(tree, code, level, obj){
	// console.log(`traversing`, tree);
	let map = {
		'@global' : (el, ccode) => {
			// if global code (comments, numbers, functions)
			// console.log({'global =>':el});
			return traverseTree(el, ccode, '@setting');
		},
		'@comment' : (el, ccode) => {
			// console.table({ '@comment' : el });
			// if a comment, just return
			ccode.comments.push(el);
			return ccode;
		},
		'@print' : (el, ccode) => {
			// console.log({'print =>':el});
			el.map((e) => {
				Object.keys(e).forEach((k) => {
					let p = map[k](e[k], ccode);
					ccode.print.push(p);
				});
			});
			return ccode;
		},
		'@display' : (el, ccode) => {
			ccode.display.push(traverseTree(el, ccode));
			return ccode;
		},
		'@settings' : (el, ccode) => {
			// console.log('@settings', traverseTree(el, ccode));
			let name = keyBind(traverseTree(el, ccode));
			if (globals.includes(name)){
				ccode.global[name] = true;
			} else {
				ccode.warnings.push(`Warning: Unkown setting name: ${name}`);
			}
			return ccode;
		},
		'@list' : (el, ccode) => {
			// if list/ring/array is instantiated store in variables
			// console.log({'list =>':el});
			let r = traverseTree(el['@params'], ccode, '@list');
			ccode.variables[el['@name']] = r;
			return ccode;
		},
		'@object' : (el, ccode) => {
			// if object is instantiated or set (new/make, set/apply)
			// console.log({'@object =>':el});
			return traverseTree(el, ccode);
		},
		'@new' : (el, ccode) => {
			// when new instrument check for instrument 
			// console.log({'@new =>':el});
			let inst = map['@inst'](el['@inst'], ccode);
			delete el['@inst'];
			
			// add the line number and code to the object for later use
			inst.line = map['@line'](el['@line']);
			delete el['@line'];

			// inst.code = map['@code'](el['@code']);
			// delete el['@code'];

			// generate unique ID name for object before checking the name()
			// this ID is used for groups if there are any
			inst.functions.name = [ uniqueID(8) ];

			Object.keys(el).forEach((k) => {
				inst = map[k](el[k], ccode, '@object', inst);
			});
			// add the name to the all group
			ccode.groups.all.push(inst.functions.name[0]);

			// generate unique ID name for object if no name()
			// if (!inst.functions.name){
			// 	inst.functions.name = [ uniqueID(8) ];
			// }
			// console.log('code', ccode);
			// add object to complete code
			ccode.objects[inst.functions.name] = inst;
			return ccode;
		},
		'@set' : (el, ccode) => {
			// set instrument, all or global parameters
			// console.log({'set =>':el});
			let name = keyBind(el['@name']);
			delete el['@name'];

			if (ccode.objects[name]){
				// if part of current instrument objects
				let inst = ccode.objects[name];
				Object.keys(el).forEach((k) => {
					inst = map[k](el[k], ccode, '@object', inst);
				});
				ccode.objects[inst.functions.name] = inst;
			} else if (code.groups[name]){ //name === 'all' 
				// if set all, set all instrument objects
				code.groups[name].forEach((o) => {
					let inst = ccode.objects[o];
					if (inst){
						Object.keys(el).forEach((k) => {
							inst = map[k](el[k], ccode, '@object', inst);
						});
						ccode.objects[inst.functions.name] = inst;
					}
				});

				// console.log(ccode.objects);

				// Object.keys(ccode.objects).forEach((o) => {
				// 	let inst = ccode.objects[o];
				// 	Object.keys(el).forEach((k) => {
				// 		inst = map[k](el[k], ccode, '@object', inst);
				// 	});
				// 	ccode.objects[inst.functions.name] = inst;
				// });
			} else {
				// if name is part of global settings
				let args;
				Object.keys(el).forEach((k) => {
					args = map[k](el[k], ccode, '@setting', args);
				});
				// if name is a total-serialism function
				if (tsIR[name]){
					if (args){
						tsIR[name](...args);
					} else {
						tsIR[name]();
					}
				}
				if (!globals.includes(name)){
					ccode.warnings.push(`Warning: Unkown instrument or setting: ${name}`);
				}
				ccode.global[name] = args;
			} 
			// else {
			// }
			return ccode;
		},
		'@inst' : (el, ccode) => {
			// check instruments for name and then deepcopy to output
			// if not a valid instrument return empty instrument
			// console.log({'@inst =>': el});
			let inst;
			if (!instruments[el]){
				inst = deepCopy(instruments['empty']);
				inst.type = el;
				ccode.warnings.push(`Warning: Unknown instrument type: ${el}`);
			} else { 
				inst = deepCopy(instruments[el]);
			}
			inst.object = el;
			return inst;
		},
		'@type' : (el, ccode, level, inst) => {
			// return the value of the type, can be identifier, string, array
			// console.log({'@type':el, '@inst':inst});
			inst.type = traverseTree(el, ccode);
			return inst;
		},
		'@functions' : (el, ccode, level, inst) => {
			// add all functions to object or parse for settings
			// console.log({'@functions =>':el, '@l':level, '@i':inst});
			if (level === '@setting'){
				// set arguments from global settings
				let args = [];
				el.map((e) => {
					Object.keys(e).map((k) => {
						args.push(map[k](e[k], ccode));
					});
				});
				return args;
			}

			let funcs = inst.functions;
			// for every function in functions list
			el.map((e) => {
				Object.keys(e).map((k) => {
					funcs = map[k](e[k], ccode, '@object', funcs);
				});
			});
			inst.functions = funcs;
			return inst;
		},
		'@function' : (el, ccode, level, funcs) => {
			// for every function check if the keyword maps to other
			// function keyword from keyword bindings.
			// if function is part of ts library execute and parse results
			// console.log({'@f':el, '@l':level, '@fs':funcs});
			let args = [];
			let func = keyBind(el['@name']);

			if (el['@args'] !== null){
				// fill arguments if not null
				el['@args'].map((e) => {
					Object.keys(e).map((k) => {
						args.push(map[k](e[k], ccode, '@list'));
					});
				});
			}

			if (tsIR[func] && level !== '@object'){
				// if function is part of TS and not in @object level
				try {
					if (args){
						return tsIR[func](...args);
					}
					return tsIR[func]();
				} catch (e) {
					ccode.errors.push(`Error in arguments for function: ${func}`)
					return [0];
				}
			}
			else if (level === '@list'){
				// if not part of TS and in @list level
				ccode.errors.push(`Unknown list function: ${func}`);
				return [0];
			} 
			else if (level === '@object'){
				// if in @object level ignore TS functions
				if (func === 'add_fx'){
					funcs[func].push(args);
				} else {
					// if (func === 'name'){
						// ccode.groups.all.push(...args);
					// } else 
					if (func === 'group'){
						args.forEach((a) => {
							// add empty array if the group doesn't exist yet
							if (!ccode.groups[a]) { ccode.groups[a] = []; }
							// add the name of the inst to the group array
							ccode.groups[a].push(funcs.name[0]);
						});
					}
					funcs[func] = args;
				}
				return funcs;
			} else {
				el['@args'] = args;
				return el;
			}
		},
		'@array' : (el, ccode) => {
			// console.log({'@array':el});
			let arr = [];
			// if not an empty array parse all items
			if (el){
				el.map((e) => {
					Object.keys(e).map((k) => {
						arr.push(map[k](e[k], ccode));
					});
				});
			}
			return arr;
		},
		'@identifier' : (el, ccode) => {
			// if identifier is variable return the content
			if (ccode.variables[el]){
				return ccode.variables[el];
			}
			return el;
		},
		'@string' : (el) => { return el; },
		'@number' : (el) => { return el; },
		'@division' : (el) => { return el; },
		'@note' : (el) => { return el; },
		'@signal' : (el) => { return el; },
		'@line' : (el) => { return el; },
		'@code' : (el) => { return el; }
	}

	if (Array.isArray(tree)) {
		// console.log('array process of', tree);
		tree.map((el) => {
			Object.keys(el).map((k) => {
				code = map[k](el[k], code, level, obj);
			});
		});
	} else {
		// console.log('object process of', tree);
		if (tree){
			Object.keys(tree).map((k) => {
				code = map[k](tree[k], code, level, obj);
			});
		}
	}
	return code;
}

function uniqueID(length){
	let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('');
	let s = '';

	for (let l=0; l<length; l++){
		s += chars[Math.floor(Math.random() * chars.length)];
	}
	return s;
}

module.exports = { traverseTreeIR };