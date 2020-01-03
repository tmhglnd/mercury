//==============================================================================
// Mercury Intermediate Language
//
// Returns results for the parsing tree when parsing a line of code
//==============================================================================

const bind = require('./bind-functions.gen.json');

function bindFunction(obj){
	var f = obj;
	var b = bind[f];

	if (b === undefined){
		b = f;
		// console.log("undefined return: ", f);
	}
	return b;
}

function num(obj) {
	return { "@number" : Number(obj[0].value) };
}

module.exports = {num, bindFunction};