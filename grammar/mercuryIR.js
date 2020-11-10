//==========================================================================
// Mercury Intermediate Language
//
// Returns results for the parsing tree when parsing a line of code
//==========================================================================

// const bind = require('./bind-functions.gen.json');

// postprocessing for identifiers
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

/*function bindFunction(obj){
	var f = obj;
	var b = bind[f];

	if (b === undefined){
		b = f;
		// console.log("undefined return: ", f);
	}
	return b;
}*/

function num(obj) {
	return { "@number" : Number(obj[0].value) };
}

// function traverseTree(t, code, level){
	
// }

module.exports = { identifier, num, traverseTree };