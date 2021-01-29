//==========================================================================
// Mercury Intermediate Language
//
// Returns results for the parsing tree when parsing a line of code
//==========================================================================

// const bind = require('./bind-functions.gen.json');

// processing for identifiers
function identifier(obj){
	// console.log('identifier():', obj);
	let v = obj[0].value;
	// is the identifier a note?
	if (v.match(/^[a-gA-G](?:[0-9])?(?:#+|b+|x)?$/)){
		return { "@note" : v }
	} else if (v.match(/^~[^\s]*$/)){
		return { "@signal" : v }
	}
	return v;
}

// processing for numbers
function num(obj){
	return Number(obj[0].value);
}

// processing for division
function division(obj){
	return `${obj[0]}/${obj[2]}`;
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

let code = {
	'global' : {},
	'variables' : {},
	'objects' : {}
}

const util = require('util');

function parseTree(tree){
	code = traverseTree(tree, code);

	console.log(code);
	// console.log(util.inspect(code, {showHidden: false, depth: null}))
}

function traverseTree(tree, code){
	// console.log(`tree at level ${level}`, tree);

	let map = {
		'@global' : (ccode, el) => {
			// console.log('@global', el);
			return ccode;
		},
		'@list' : (ccode, el) => {
			// console.log('@ring', el);
			let r = traverseTree(el['@params'], ccode);
			// r = (Array.isArray(r))? r : [r];

			ccode.variables[el['@name']] = r;
			return ccode;
		},
		'@object' : (ccode, el) => {

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
	}

	if (Array.isArray(tree)) {
		tree.map((el) => {
			Object.keys(el).map((k) => {
				code = map[k](code, el[k]);
			});
		})
	} else {
		Object.keys(tree).map((k) => {
			// console.log(k);
			code = map[k](code, tree[k]);
		});
	}
	return code;
}

module.exports = { identifier, num, parseTree, traverseTree };