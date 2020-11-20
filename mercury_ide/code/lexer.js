//=====================================================================
// matrixToString.js
//
// written by Timo Hoogland © 2019
// www.timohoogland.com
//=====================================================================

autowatch = 1;
inlets = 1;
outlets = 1;

function jit_matrix(mat){
	code = new JitterMatrix(mat);
	matrixToString(code);
}

function matrixToString(code){
	// for every line in the matrix
	for (var y = 0; y < code.dim[1]; y++){
		// empty string to start line with
		var line = "";
		
		for (var x = 0; x < code.dim[0]; x++){
			// get the character from the cell
			var ascii = code.getcell(x, y);
			// append to the string
			line += String.fromCharCode(ascii);
		}
		outlet(0, line);
	}
	
	// REMOVED THE COMMENT CHECKING TO 
	// mercury.js IN THE node.script
	// THIS WILL BE DELETED SOON AFTER ENOUGH TESTS
	
	/*var lineComment = false;
	var blockComment = false;
	var prevChar;
	
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
		// line = line.replace(/\s{2,}/g, " ");
			
		if (line != "" && line != " "){
			// post('lexer', line, "\n");
			// outlet(0, line.trim());
		}
		lineComment = false;
	}*/
}
