//=====================================================================
// lexer.js
//
// written by Timo Hoogland © 2019
// www.timohoogland.com
//=====================================================================

autowatch = 1;
inlets = 1;
outlets = 1;

var lineComment = false;
var blockComment = false;
var prevChar;

function jit_matrix(mat){
	code = new JitterMatrix(mat);
	lexer(code);
}

function lexer(code){
	outlet(0, "SOF", "\n");
	for (var y = 0; y < code.dim[1]; y++){
		var line = "";

		for (var x = 0; x < code.dim[0]; x++){
			var ascii = code.getcell(x, y);

			if (ascii > 31){
				if (ascii == 47 && prevChar == 47){
					lineComment = true;
					line = line.slice(0, line.length-2);
				}
				else if (ascii == 42 && prevChar == 47){
					blockComment = true;
					line = line.slice(0, line.length-2);
				}
				else if (!lineComment && !blockComment){
					line += String.fromCharCode(code.getcell(x, y));
				}
				else if (ascii == 47 && prevChar == 42){
					blockComment = false;
				}
			}
			prevChar = ascii;
		}

		if (line != ""){
			outlet(0, line);
		}

		lineComment = false;
	}
	outlet(0, "EOF", "\n");
}//lexer()

//=====================================================================
// licensed under a
// Creative Commons Attribution 4.0 International License
//
// www.timohoogland.com
//=====================================================================
