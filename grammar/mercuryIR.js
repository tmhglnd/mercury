//==========================================================================
// Mercury Intermediate Language
//
// Returns results for the parsing tree when parsing a line of code
//==========================================================================

// const bind = require('./bind-functions.gen.json');
const tsIR = require('./totalSerialismIR.js').functionMap;

// processing for identifiers
function identifier(obj){
	let v = obj[0].value;
	if (v.match(/^[a-gA-G](?:#+|b+|x)?(?:[0-9])?$/)){
		// is the identifier a note?
		return { "@note" : v }
	} else if (v.match(/^~[^\s]*$/)){
		// is the identiefer a signal?
		return { "@signal" : v }
	}
	return { "@identifier" : v };
}

// processing for division
function division(obj){
	// concatenate division numbers to string
	return { "@division" : obj[0].value + '/' + obj[2].value };
}

// processing for numbers
function num(obj){
	// parse string to number
	return { "@number" : Number(obj[0].value) };
}

/*function bindFunction(obj){
	var f = obj;
	var b = bind[f];

	if (b === undefined){
		b = f;
		// console.log("undefined return: ", f);
	}
	return b;
}*/

const instruments = {
	'synth' : {
		'type' : 'saw',
		'functions' : {
			'note' : [ 0, 0 ],
			'time' : [ '1', 0 ],
			'env' : [ 5, 500 ],
			'beat' : 1,
			'amp' : 0.7,
			'wave2' : [ 'saw', 0 ],
			'add_fx' : [],
		}
	}
}

let code = {
	'global' : {
		'tempo' : 90,
		'scale' : 'chromatic',
		'root' : 'c',
		'randomSeed' : 0
	},
	'variables' : {},
	'objects' : {}
}

function traverseTreeIR(tree){
	tree.map((t) => {
		// console.log(t);
		code = traverseTree(t, code);
	})
	return code;
}

function traverseTree(tree, code, level){
	// console.log(`tree at level ${level}`, tree);
	let map = {
		'@global' : (ccode, el) => {
			// console.log('@global', el);
			return ccode;
		},
		'@list' : (ccode, el) => {
			// console.log('@list', el);
			let r = traverseTree(el['@params'], ccode, '@list');
			ccode.variables[el['@name']] = r;
			return ccode;
		},
		'@object' : (ccode, el) => {
			// console.log('@object', el);
			if (el['@action'] === 'new'){
				let inst = JSON.parse(JSON.stringify(instruments[el['@new']]));

			}
			return ccode;
		},
		'@function' : (ccode, el, level) => {
			// console.log('@func', el);
			let args = [];
			if (el['@args'] !== null){
				el['@args'].map((e) => {
					Object.keys(e).map((k) => {
						args.push(map[k](code, e[k], level));
					});
				});
			}
			// console.log('@func', el, '@args', args, '@level', level);
			if (tsIR[el['@name']]){
				if (args){
					return tsIR[el['@name']](...args);
				}
				return tsIR[el['@name']]();
			} else if (level === '@list'){
					console.error(`Unknown list function: ${el['@name']}`);
					return [0];
			} else {
				el['@args'] = args;
				return el;
			}
		},
		'@array' : (ccode, el) => {
			let arr = [];
			el.map((e) => {
				Object.keys(e).map((k) => {
					arr.push(map[k](code, e[k]));
				});
			});
			return arr;
		},
		'@identifier' : (ccode, el) => {
			if (code.variables[el]){
				return code.variables[el];
			}
			return el;
		},
		'@string' : (ccode, el) => {
			return el;
		},
		'@number' : (ccode, el) => {
			return el;
		},
		'@division' : (ccode, el) => {
			return el;
		},
		'@note' : (ccode, el) => {
			return el;
		}
	}

	if (Array.isArray(tree)) {
		tree.map((el) => {
			Object.keys(el).map((k) => {
				code = map[k](code, el[k], level);
			});
		})
	} else {
		Object.keys(tree).map((k) => {
			// console.log(k);
			code = map[k](code, tree[k], level);
		});
	}
	return code;
}

module.exports = { identifier, division, num, traverseTreeIR };