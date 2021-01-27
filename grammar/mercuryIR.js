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
	return { "@identifier" : v }
}

// processing for numbers
function num(obj){
	return { "@number" : Number(obj[0].value) };
}

// processing for division
function division(obj){
	return { "@division" : obj[0]+"/"+obj[2] };
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

function parseTree(tree){
	traverseTree(tree, code, 0);

	console.log(code);
}

function traverseTree(tree, code, level){
	// console.log(`tree at level ${level}`, tree);

	let map = {
		'@global' : (ccode, el) => {
			console.log('@global', el);
			return ccode;
		},
		'@ring' : (ccode, el) => {
			// console.log('@ring', el);
			ccode.variables[el['@name']] = [];
			return ccode;
		},
		'@object' : (ccode, el) => {

		},
		'@number' : (ccode, el) => {
			console.log(el);
		}
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
	// return code;

	// Object.keys(tree).forEach((k) => {
	// 	if (k === '@ring'){
	// 		// code.variables[tree[k]['@name']] = [];
	// 		// console.log(`ring, level ${level} :`, tree[k]);
	// 		traverseTree(tree[k], code, ++level);
	// 	} else {
	// 		traverseTree(tree[k], code, ++level);
	// 	}
	// });
}

module.exports = { identifier, num, parseTree, traverseTree };