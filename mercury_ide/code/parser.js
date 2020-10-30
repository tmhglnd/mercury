autowatch = 1;
inlets = 1;
outlets = 1;

var dict = new Dict("variables");

function anything(){
	// var line = arrayfromargs(messagename, arguments);
	var line = arrayfromargs(messagename, arguments).join(' ').split('');
	var isFunction = false;
	var arrayDepth = 0;

	var tmpItems = []; // array for ascii storage
	var args = ""; // string of arguments
	var len = line.length;

	// iterate through all the characters in a codeline
	for (var i=0; i<len; i++){
		// var ascii = String.fromCharCode(line[i]);
		var ascii = line[i];

		if (ascii == "["){
			if (!arrayDepth){
				tmpItems.push(args); // add array items
				args = "";
			} else {
				args += ascii;
			}
			arrayDepth++;
		}
		else if (ascii == "]"){
			arrayDepth--;
			if (arrayDepth <= 0){
				tmpItems.push(args); // add array items as a string
				args = "";
			} else {
				args += ascii;
			}
		}
		else if (ascii == "("){
			if (!isFunction){
				isFunction = true;
				tmpItems.push(args); // add function name
				args = "";
			}
		}
		else if (ascii == ")"){
			isFunction = false;
			tmpItems.push(args);
			args = "";
		}
		else {
			args += ascii;
		}
	}
	//post("items", tmpItems, "\n");
	
	// output the interpreted content
	for (var i = 0; i < tmpItems.length / 2; i++){
		outlet(0, tmpItems[i*2] + " " + tmpItems[i*2+1]);
	}
}//lexer()

function str_arr2d(name, s){
	if (dict.contains(name)){
		dict.remove(name);
	}

	var depth = 0;
	var tok = "";
	var arr = [];
	
	for (var i=0; i<s.length; i++){
		var ascii = s[i];

		if (ascii === "[" || ascii === "("){
			// open bracket, add depth
			depth += 1;
			if (depth > 1){
				post("warning: 3D array not allowed, stored as 2D \n");
			}
		} 
		else if (ascii === "]" || ascii === ")"){
			// close bracket, add to dict
			if (tok !== ""){
				arr.push(toNumber(tok));
				tok = "";
			}
			// when array depth is greater then 0
			if (depth < 2){
				if (arr.length){
					add_dict(dict, name, arr);
					arr = [];
				}
			}
			depth -= 1;
		}
		// space adds tok to array
		else if (ascii === " "){
			if (tok !== ""){
				// if no empty string
				tok = toNumber(tok);

				if (depth === 0){
					add_dict(dict, name, tok);
				} else {
					arr.push(tok);
				}
				tok = "";
			}
		} else {
			// post("added char:", ascii, "to", tok, "\n");
			tok += ascii;
		}
	}

	if (tok !== ""){
		add_dict(dict, name, toNumber(tok));
	}

	if (depth > 0){
		post("warning: ] missing after element list \n");
	}
	outlet(0, "dictionary", dict.name);
}//str_arr2d()

function add_dict(dct, nm, tk){
	var tmp = new Dict();
	tmp.set("array", tk);
	// tmp.set("length", tmp.getsize("array"));
	dct.append(nm, tmp);
}//add_dict()

function toNumber(str){
	return !isNaN(Number(str)) ? Number(str) : str;
}//toNumber()

function arr2d_dict(name, arr){
	if (dict.contains(name)){ 
		dict.remove(name) 
	}

	for (var i=0; i<arr.length; i++){
		var tmp = new Dict();
		tmp.set("array", arr[i]);
		dict.append(name, tmp);
	}
}//arr2dtodict()

function get(name, v){
	if (dict.contains(name)){
		v = wrap(v, 0, dict.getsize(name));
		var arg = name + "[" + v + "]::array";
		outlet(0, "get", dict.contains(arg) ? dict.get(arg) : 0);
	} else {
		outlet(0, "get", 0);
	}
}//get()

function get_length(name, v){
	var arg = name + "[" + v + "]::length";
	outlet(0, "len", dict.contains(name) ? dict.get(arg) : 0);
}//get_length()

function wrap(v, lo, hi){
	if (hi < lo){
		var tmp = lo;
		lo = hi;
		hi = tmp;
	}
	var range = hi - lo;
	return (((v - lo) % range) + range) % range + lo;
}//wrap()