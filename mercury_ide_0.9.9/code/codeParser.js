autowatch = 1;
inlets = 1;
outlets = 1;

var textArray = new Array();

function jit_matrix(mat){
	code = new JitterMatrix(mat);
	var dimX = code.dim[0];
	var dimY = code.dim[1];

	// post("input", code.dim[0], code.dim[1], "\n");
	textArray = Array2D(dimY, dimX);

	for (var y = 0; y < code.dim[1]; y++){
		var line = "";
		for (var x = 0; x < code.dim[0]; x++){
			var ascii = code.getcell(x, y);

			if (ascii > 31){
				line += String.fromCharCode(code.getcell(x, y));
			}
		}
		if (line != ""){
		// post(line, "\n");
			outlet(0, line);
		}
	}
}

function Array2D(y, x){
	var arr = new Array(y);
	for (var i = 0; i < y; i++){
		arr[y] = new Array(x);
		for (var k = 0; k < x; k++){
			arr[y][k] = 0;
		}
	}
	return arr;
}//Array2D()
