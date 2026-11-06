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
// const tsIR = require('./totalSerialismIR.js').functionMap;
// included instrument/object defaults
// const instruments = require('../data/objects.js').objects;
// keyword bindings, use custom keywords for functions
const keywords = require('../data/function-aliases.json');
// mini language, use single characters for keywords and functions
// const miniLang = require('../data/mini-functions.json');

let keywordBinds = {};
keywordBinds = keywordBindings(keywords, keywordBinds);
// keywordBinds = keywordBindings(miniLang, keywordBinds);
// keywordBinds = keywordBindings(langDutch, keywordBinds);
// console.log(keywordBinds);

// processing for identifiers
function identifier(obj){
	let v = obj[0].value;
	if (v.match(/^[a-gA-G](?:#+|b+|x)?(?:[0-9])?$/)){
		// is the identifier a note?
		return { "@note" : v }
	} else if (v.match(/^~[^\s]*$/)){
		// is the identifier a signal?
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

// check if the function is part of mapped functions
// else return original value
function keyBind(f){
	return (keywordBinds[f]) ? keywordBinds[f] : f;
}

// Generate a dictionary of keyword and binding pairs based on 
// input dictionary of categorized keybindings 
function keywordBindings(dict, obj){
	// console.log('Generating keyword bindings...');
	let binds = { ...obj };
	Object.keys(dict).forEach((k) => {
		// store itself first
		binds[k] = k;
		dict[k].forEach((b) => {
			if (binds[b]) {
				// if already exists ignore and print warning
				console.log('Warning! Duplicate keyword: [ '+b+' ] \nfor: [ '+binds[b]+' ] and: [ '+k+' ] \n => BIND IGNORED');
			} else {
				// store binding name with resulting keyword
				binds[b] = k;
			}
			// console.log('mapped: [ '+b+' ] to: [ '+k+' ]');
		});
	});
	// console.log('...done!');
	return binds;
}

module.exports = { identifier, division, num, keyBind };