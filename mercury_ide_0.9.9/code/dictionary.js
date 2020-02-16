// A simple dictionary where arrays can be stored
// With a key as variable name for reference in other functions
class Dictionary {
	constructor() {
		// empty dictionary
	  	this.items = {};
	}
	has(key) {
		// return true if key is in dictionary
	  	return key in this.items;
	}
	get(key) {
		// if key is not-a-number
		if (isNaN(key)){
			// if key is in the dictionary
			if (this.has(key)){
				// return contents of key
				return this.items[key];
			} else {
				// return array of one zero
				return [0];
			}
		} else {
			// return the key when number
			return [key];
		}
	}
	set(key, value) {
		// set a value for a key
	  	this.items[key] = value;
	}
	delete(key) {
		// if key is in dictionary delete it
	  	if (this.has(key)){
			delete this.items[key];
			return true;
		}
		// if not in dictionary return false
	  	return false;
	}
	clear() {
		// clear the entire dictionary
		this.items = {};
	}
}//Dictionary()
module.exports = Dictionary;