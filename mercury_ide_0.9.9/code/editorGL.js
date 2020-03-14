//======================================================================
// editorGL.js
//
// written by Timo Hoogland © 2019
// www.timohoogland.com
//======================================================================

// FUNCTIONALITIES:
// add characters by typing
// capslock sensitive
// move with cursors or shortkeys
// backspace a character and a line
// enter an extra line of text
// use tab to input 4 spaces as indentation
// copy insert a line of code to an other line
// copy replace a line of code on an other line
// delete a line of code and remove the line
// console for display error messages
// read a previous mercury file
// write a mercury file every time the code runs

// TO DO:
// undo/redo history (matrixset?)

//======================================================================

// GENERAL SETTINGS:
var CRSR = "<==";
var UNDO_HISTORY = 5;
var INDENTATION = 4;

var EDITOR_LINES = 30;
var MAX_CHARS = 80;
var LINE_CHARS = 128;

var CNSL_LINES = 40;
var CNSL_CHARS = 24;

var POST_FLAG = 1;

// KEY BINDINGS:
var ALT_A = 2277; //back one character
var ALT_S = 2271; //down one line
var ALT_D = 10754; //forward one character
var ALT_W = 10769; //up one line

var ALT_Q = 2387; //move to top of page
var ALT_SHFT_Q = 2386; //move to bottom of page

var ALT_Z = 2985; //undo edit
var ALT_SHFT_Z = 2267; //redo edit

var ALT_X = 10824; //delete a line of code
var ALT_C = 2279; //copy a line of code
var ALT_V = 10778; //paste-insert a line of code
var ALT_P = 3008; //copy+paste line

var ALT_B = 10795; //backspace a character
var ALT_FS = 2295; //(un)comment a line of code
//======================================================================

// include("lexer.js");
autowatch = 1;
inlets = 1;
outlets = 2;

var key;
var curLine, curCharacter, totalLines;
var lineLengths;
var isDisabled;

var CRSR_CHARS = [];
for (var i=0; i<CRSR.length; i++){
	CRSR_CHARS.push(CRSR[i].charCodeAt(0));
}

var UNIQ = Date.now();

var textMtx, crsrMtx, nmbrMtx, cnslMtx;
var histMtxSet, hIndex;
var cnslText = [];

function loadbang(){
	init();
}//loadbang()

function init(){
	curCharacter = 0;
	curLine = 0;
	totalLines = 1;
	lineLengths = new Array(totalLines);
	lineLengths[curLine] = 0;
	isDisabled = false;

	hIndex = 0;
	histMtxSet = new Array(UNDO_HISTORY);

	setFont(FONT);
	setSize(SIZE);
	setLeadScale(0.94);
	setAlpha(1);

	emptyMatrix(totalLines);

	if (jsarguments.length>1) {
		drawto(jsarguments[1]);
	}

	draw();
}//init()

// custom print function with debug enable/disable functionality
function println(){
	if (POST_FLAG){
		post(arrayfromargs(arguments), "\n");
	}
}//print()

function emptyMatrix(lines){
	textMtx = new JitterMatrix("text"+UNIQ, 1, "char", LINE_CHARS, lines);
	crsrMtx = new JitterMatrix("crsr"+UNIQ, 1, "char", LINE_CHARS, lines);
	nmbrMtx = new JitterMatrix("nmbr"+UNIQ, 1, "char", 3, lines);
	cnslMtx = new JitterMatrix("cnsl"+UNIQ, 1, "char", LINE_CHARS, CNSL_LINES);

	textMtx.setall(0);
}//emptyMatrix()

function runCode(){
	emptyConsole();
	outlet(0, "jit_matrix", textMtx.name);
}//runCode()

function draw(){
	drawCursor(); //set the cursorposition
	drawNumbers(); //store the numbers in the matrix
	// drawHighlight();
	matrixToText(); //set the matrices to the gl text objects

	outlet(1, "lines", totalLines);
	outlet(1, "line", curLine);
	outlet(1, "length", getMaxChar());
	// post("curChar", curCharacter, "line", curLine, "\n");
}//draw()

function keyPress(k){
	if (k == 96){
		disableText();
	}
	else if (!isDisabled){
		var hst = false;

		if (k != 27){
			// CHARACTER KEYS
			if (k >= 32 && k <= 126){ hst = addChar(k); }

			// FUNCTION KEYS
			else if (k == 13){ hst = newLine(); }
			// Backspace Win = 8, Mac = 127
			// Delete Win = 127, Mac = 127
			else if (k == 127 || k == 8){ hst = backSpace(); }
			else if (k == 30 || k == 31){ gotoLine(k-30); }
			else if (k == 28 || k == 29){ gotoCharacter(k-28); }
			else if (k == 9){ hst = addTab(); }
			else if (k >= 2076 && k <= 2079){ jumpTo(k-2076); }

			// SHORTKEYS
			else if (k == ALT_FS){ hst = commentLine(); }

			else if (k == ALT_X){ hst = deleteLine(); }
			else if (k == ALT_C){ copyLine(); }
			else if (k == ALT_V){ hst = pasteInsertLine(); }
			else if (k == ALT_P){ hst = pasteReplaceLine(); }

			else if (k == ALT_B){ hst = backSpace(); }

			// TO-DO
			// else if (k == ALT_Z){ getHistory(); }

		 	else if (k == ALT_A){ gotoCharacter(0); }
			else if (k == ALT_D){ gotoCharacter(1); }
			else if (k == ALT_S){ gotoLine(1); }
			else if (k == ALT_W){ gotoLine(0); }

			else if (k == ALT_Q){ jumpTo(2); }
			else if (k == ALT_SHFT_Q){ jumpTo(3); }

			/*if (hst){
				addHistory();
			}*/
		}
	}
	draw();
}//keyPress()

function addTab(){
	var numSpaces = INDENTATION - (curCharacter % INDENTATION);
	for(var i = 0; i < numSpaces; i++){
		addChar(32);
	}
	return true;
}//addTab()

function addChar(k){
	if (curCharacter >= MAX_CHARS){
		if (endOfLines()) {
			return;
		} else {
			newLine();
		}
	}
	var len = lineLengths[curLine];

	if (curCharacter < len){
		for (var i = len; i > curCharacter-1; i--){
			textMtx.setcell2d(i+1, curLine, textMtx.getcell(i, curLine));
		}
	}
	textMtx.setcell2d(curCharacter, curLine, k);
	curCharacter += 1;
	lineLengths[curLine] = getCharCount(textMtx, curLine);
	return true;
}//addChar()

function backSpace(k){
	curCharacter = Math.max(-1, (curCharacter-=1));

	if (curCharacter >= 0){
		var len = lineLengths[curLine];
		for (var i = curCharacter; i < len; i++){
			textMtx.setcell2d(i, curLine, textMtx.getcell(i+1, curLine));
		}
	} else if (curLine > 0){
		removeLine();
	} else {
		curCharacter = 0;
	}
	lineLengths[curLine] = getCharCount(textMtx, curLine);
	return true;
}//backSpace()

function getCharCount(mat, line){
	// return amount of characters in one line;
	var charCount = 0;
	var len = mat.dim[0];
	for (var i = 0; i < len; i++){
		if (mat.getcell(i, line) < 32){
			return charCount;
		}
		charCount++;
	}
}//getCharCount()

function countChars(){
	// restore character counts in every row
	var rows = textMtx.dim[1];
	// empty the array to reset count
	lineLengths = [];
	for (var y = 0; y < rows; y++){
		lineLengths[y] = getCharCount(textMtx, y);
	}
}//countChars()

function getMaxChar(){
	// return the highest amount of characters in one line
	var sortArr = lineLengths.slice(0);
	sortArr.sort(function(a,b){ return b-a });

	return sortArr[0];
}//getCharLength

function gotoCharacter(k){
	k = k * 2 - 1;
	curCharacter = curCharacter + k;
	if (curCharacter < 0 && curLine > 0){
		curCharacter = lineLengths[curLine];
		gotoLine(0);
	} else if (curCharacter > lineLengths[curLine] && curLine != totalLines-1){
		gotoLine(1);
		curCharacter = 0;
	} else {
		curCharacter = Math.min(lineLengths[curLine], Math.max(0, curCharacter));
	}
}//gotoCharacter()

function gotoLine(k){
	k = k * 2 - 1;
	var prevLen = lineLengths[curLine];

	curLine = Math.min(Math.max(0, (curLine+k)), totalLines-1);
	var len = lineLengths[curLine];

	curCharacter = Math.min(len, curCharacter);

	if (curCharacter == prevLen){
		curCharacter = len;
	} else {
		curCharacter = Math.min(len, curCharacter);
	}
}//gotoLine()

function jumpTo(k){
	switch(k){
		// beginning of line
		case 0: curCharacter = 0; break;
		// end of line
		case 1: curCharacter = lineLengths[curLine]; break;
		// to beginning (top)
		case 2: curLine = 0;
				curCharacter = lineLengths[curLine]; break;
		// to end (bottom)
		case 3: curLine = totalLines-1;
				curCharacter = lineLengths[curLine]; break;
	}
}//jumpTo()

function newLine(){
	if (endOfLines()){
		return;
	}

	totalLines = textMtx.dim[1] + 1;
	// copy the matrix
	var copyMtx = new JitterMatrix(1, "char", LINE_CHARS, textMtx.dim[1]);
	copyMtx.frommatrix(textMtx);
	emptyMatrix(totalLines);
	// store everything before cursor in text matrix
	for (var y = 0; y < curLine; y++){
		for (var x = 0; x < copyMtx.dim[0]; x++){
			textMtx.setcell2d(x, y, copyMtx.getcell(x, y));
		}
	}
	for (var x = 0; x < curCharacter; x++){
		if (x < curCharacter){
			textMtx.setcell2d(x, curLine, copyMtx.getcell(x, curLine));
		}
	}
	// update the line position
	curLine++;
	// place everything behind cursor in next line matrix
	for (var x = curCharacter; x < copyMtx.dim[0]; x++){
		textMtx.setcell2d(x-curCharacter, curLine, copyMtx.getcell(x, curLine-1));
	}
	for (var y = copyMtx.dim[1]-1; y >= curLine; y--){
		for (var x = 0; x < copyMtx.dim[0]; x++){
			textMtx.setcell2d(x, y+1, copyMtx.getcell(x, y));
		}
	}
	// restore character counts in every row
	countChars();
	// jump to beginning
	curCharacter = 0;
	return true;
}//newLine()

function removeLine(){
	totalLines = Math.max(1, textMtx.dim[1] - 1);
	// copy the matrix
	var copyMtx = new JitterMatrix(1, "char", LINE_CHARS, textMtx.dim[1]);
	copyMtx.frommatrix(textMtx);
	emptyMatrix(totalLines);
	// store all lines before cursor in text matrix
	for (var y = 0; y < curLine; y++){
		for (var x = 0; x < copyMtx.dim[0]; x++){
			textMtx.setcell2d(x, y, copyMtx.getcell(x, y));
		}
	}
	// update the line position
	curLine = Math.max(0, curLine-1);
	// place everything behind cursor in next line matrix
	for (var x = 0; x < lineLengths[curLine+1]; x++){
		textMtx.setcell2d(x + lineLengths[curLine], curLine, copyMtx.getcell(x, curLine+1));
	}
	// jump to beginning
	curCharacter = lineLengths[curLine];
	for (var y = curLine+2; y < copyMtx.dim[1]; y++){
		for (var x = 0; x < copyMtx.dim[0]; x++){
			textMtx.setcell2d(x, y-1, copyMtx.getcell(x, y));
		}
	}
	// restore character counts in every row
	countChars();
}//removeLine()

function deleteLine(){
	if (totalLines == 1){
		emptyMatrix(totalLines);
		countChars();
		curLine = 0;
		curCharacter = 0;
	} else {
		totalLines = Math.max(1, textMtx.dim[1] - 1);
		// copy the matrix
		var copyMtx = new JitterMatrix(1, "char", LINE_CHARS, textMtx.dim[1]);
		copyMtx.frommatrix(textMtx);
		emptyMatrix(totalLines);
		// store all lines before cursor in text matrix
		for (var y = 0; y < curLine+1; y++){
			for (var x = 0; x < copyMtx.dim[0]; x++){
				textMtx.setcell2d(x, y, copyMtx.getcell(x, y));
			}
		}
		// update the line position
		// curLine = Math.max(0, curLine-1);
		for (var y = curLine+1; y < copyMtx.dim[1]; y++){
			for (var x = 0; x < copyMtx.dim[0]; x++){
				textMtx.setcell2d(x, y-1, copyMtx.getcell(x, y));
			}
		}
		// restore character counts in every row
		countChars();
		// jump to beginning
		if (curLine == totalLines){
			curLine--;
		}
		curCharacter = lineLengths[curLine];
	}
	return true;
}//deleteLine()

// global pastebin variable to store a line of text
var pasteBin;

function copyLine(){
	pasteBin = new JitterMatrix(1, "char", LINE_CHARS, 1);
	// copy characters from current line to pastebin
	for (var i = 0; i < lineLengths[curLine]; i++){
		pasteBin.setcell2d(i, 0, textMtx.getcell(i, curLine));
	}
}//copyOneLine()

function pasteReplaceLine(){
	// replace current text with text from pasteBin
	for (var x = 0; x < pasteBin.dim[0]; x++){
		textMtx.setcell2d(x, curLine, pasteBin.getcell(x, 0));
	}
	// restore character counts in every row
	countChars();
	// jump to end of new line
	jumpTo(1);
	return true;
}//pasteLine()

function pasteInsertLine(){
	if (!endOfLines()){
		jumpTo(0);
		newLine();
		gotoLine(0);
		return pasteReplaceLine();
	}
}//copyPasteLine();

function endOfLines(){
	var isEnd = totalLines >= EDITOR_LINES;
	if (isEnd){
		post("WARNING: end of lines reached \n");
	}
	return isEnd;
}//endOfLines()

function drawCursor(){
	crsrMtx.setall(32);
	// draw at least something at the end of the matrix.
	for (var i = 0; i < totalLines; i++){
		crsrMtx.setcell2d(LINE_CHARS-1, i, 46);
	}
	for (var c = 0; c < CRSR_CHARS.length; c++){
		crsrMtx.setcell2d(curCharacter+c, curLine, CRSR_CHARS[c]);
	}
}//drawCursor()

function drawNumbers(){
	for (var i = 0; i < totalLines; i++){
		var digits = new Array(2);
		digits[0] = String(Math.floor((i+1)/ 10));
		digits[1] = String((i+1) % 10);
		if (digits[0] == 0){
			digits[0] = " ";
		}
		// post(digit1.charCodeAt(0), digit2.charCodeAt(0));
		for (var n = 0; n < 2; n++){
			nmbrMtx.setcell2d(n, i, digits[n].charCodeAt(0));
		}
	}

	nmbrMtx.setcell2d(0, curLine, 62);
	nmbrMtx.setcell2d(1, curLine, 62);
}//drawNumbers()

function drawHighlight(){
	highlightMtx.setall(0);

	for (var i = 0; i < totalLines; i++){
		if (i == curLine){
			highlightMtx.setcell2d(0, i, 1.);
		}
	}
}//drawHighlight()

function commentLine(){
	var isCommented = 0;
	var move = 2;
	var comment = [47, 47, 32];
	// check if the line starts with the comment characters
	for (var i = 0; i < 2; i++){
		isCommented += textMtx.getcell(i, curLine) == comment[i];
	}
	// if true remove the comment sign
	if (isCommented == 2){
		// check if extra space is present
		if (textMtx.getcell(2, curLine) == comment[2]){
			move = 3;
		}
		// replace all characters in the line and move position
		for (var i = 0; i < lineLengths[curLine]; i++){
			textMtx.setcell2d(i, curLine, textMtx.getcell(i+move, curLine));
		}
		// reposition cursor
		curCharacter -= move;
	} else {
		// reposition all the characters 3 steps further
		for (var i = lineLengths[curLine]-1; i >= 0; i--){
			textMtx.setcell2d(i+3, curLine, textMtx.getcell(i, curLine));
		}
		// add the comment sign symbols
		for (var i = 0; i < 3; i++){
			textMtx.setcell2d(i, curLine, comment[i]);
		}
		// reposition cursor
		curCharacter += 3;
	}
	countChars();
	return true;
}//commentLine()

function readFile(mat){
	fillText(mat);

	countChars();
	jumpTo(2);
	draw();
}//readFile()

function fillText(mat){
	file = new JitterMatrix(mat);
	dimX = Math.min(MAX_CHARS, file.dim[0]);
	totalLines = Math.min(EDITOR_LINES, file.dim[1]);
	emptyMatrix(totalLines);

	for (var y = 0; y < totalLines; y++){
		for (var x = 0; x < dimX; x++){
			textMtx.setcell2d(x, y, file.getcell(x, y));
		}
	}
}//fillText()

function fillConsole(mess){
	mess = mess + " ";
	var dashes = CNSL_CHARS - (mess.length % CNSL_CHARS);
	for (var i = 0; i < dashes; i++){
		mess += "-";
	}

	for (var i = mess.length-1; i >= 0; i--){
		cnslText.unshift(mess.charCodeAt(i));
	}

	cnslText = cnslText.slice(0, CNSL_LINES*CNSL_CHARS);
	for (var i = 0; i < cnslText.length; i++){
		cnslMtx.setcell2d(i%CNSL_CHARS, Math.floor(i/CNSL_CHARS), cnslText[i]);
	}
	draw();
}//fillConsole()

function emptyConsole(){
	cnslText = [];
	cnslMtx.setall(0);
	draw();
}//emptyConsole()
/*
function addHistory(mat){
	post("addHist()", hIndex, "\n");

	var tMat = new JitterMatrix();
	tMat.frommatrix(mat);

	histMtxSet[hIndex] = tMat;
	hIndex = (hIndex+1)%UNDO_HISTORY;
}//addHistory()

function getHistory(){
	hIndex = Math.max(0, hIndex-1);
	post("undoHist()", hIndex, "\n");

	fillText(histMtxSet[hIndex].name);
	countChars();
	draw();
}//getHistory()
*/
//======================================================================
// GL TEXT OBJECTS
//======================================================================

var MAIN_CTX = "editorGL";
var NODE_CTX = "node" + UNIQ;
var ANIM_NODE = "anim" + UNIQ;
var CAM_CAP = "cam" + UNIQ;

var FONT = "IBM Plex Mono SemiBold";
// var FONT = "Andale mono";
var SIZE = 100;
var LEAD_SCALE = 0.98;
var LOGO_TEXT = "written by timo © 2019 | www.timohoogland.com";

// the main node that all text is drawn to
// for display on videoplane through camera capture
var textNode = new JitterObject("jit.gl.node");
textNode.fsaa = 1;
textNode.type = "float32";
textNode.name = NODE_CTX;

function drawto(v){
	MAIN_CTX = v;
	textNode.drawto = MAIN_CTX;
	glVid.drawto = MAIN_CTX;
}

// the main anim node to position all text according to screensize
var animNode = new JitterObject("jit.anim.node");
animNode.name = ANIM_NODE;
animNode.position = [-2.435, 1.2, 0];

function position(x, y, z){
	animNode.position = [x, y, z];
}//position()

function scale(x, y, z){
	animNode.scale = [x, y, z];
}//scale()

// the anim node and text for the command line
var textAnim = new JitterObject("jit.anim.node");
textAnim.anim = ANIM_NODE;
textAnim.scale = [0.6, 0.6, 0.6];
textAnim.position = [0.5, 0, 0];

var glText = new JitterObject("jit.gl.text");
glText.drawto = NODE_CTX;
glText.anim = textAnim.name;
glText.gl_color = [1, 1, 1, 1];
glText.leadscale = 1.2;
glText.screenmode = 0;

// the anim node and text for the cursor
var crsrAnim = new JitterObject("jit.anim.node");
crsrAnim.anim = ANIM_NODE;
crsrAnim.scale = [0.6, 0.6, 0.6];
crsrAnim.position = [0.5, 0, 0];

var glCrsr = new JitterObject("jit.gl.text");
glCrsr.drawto = NODE_CTX;
glCrsr.anim = crsrAnim.name;
glCrsr.leadscale = 1.2;
glCrsr.face("bold");
glCrsr.screenmode = 0;
glCrsr.layer = 10;

// the anim node and text for the line numbers
var nmbrAnim = new JitterObject("jit.anim.node");
nmbrAnim.anim = ANIM_NODE;
nmbrAnim.scale = [0.6, 0.6, 0.6];

var glNmbr = new JitterObject("jit.gl.text");
glNmbr.drawto = NODE_CTX;
glNmbr.anim = nmbrAnim.name;
glNmbr.gl_color = [0.6, 0.6, 0.6, 1];
glNmbr.leadscale = 1.2;
glNmbr.face = "italic";
glNmbr.screenmode = 0;
glNmbr.layer = 10;

var blinkTog = 0;
var blinkColor1 = [1, 1, 0];
var blinkColor2 = [0, 1, 1];

function blink(){
	blinkTog = 1 - blinkTog;
	if (blinkTog){
		var c = blinkColor1;
	} else {
		var c = blinkColor2;
	}
	c[3] = alpha;
	glCrsr.gl_color = c;
}//blink()

/*
var barAnim = new JitterObject("jit.anim.node");
barAnim.anim = ANIM_NODE;
barAnim.scale = [15, 0.12, 1];
barAnim.position = [0, -0.06, 0];
barAnim.anchor = [0, 0.12, 0];

var glTextBar = new JitterObject("jit.gl.gridshape");
glTextBar.drawto = NODE_CTX;
glTextBar.anim = barAnim.name;
glTextBar.color = [0, 0, 0, 0.5];
glTextBar.shape = "plane";
*/

// the anim node and text for console
var cnslAnim = new JitterObject("jit.anim.node");
cnslAnim.anim = ANIM_NODE;
cnslAnim.inherit_scale = 0;
cnslAnim.inherit_position = 0;
cnslAnim.scale = [0.12, 0.12, 0.12];
cnslAnim.position = [0, -1.75, 0];

var glCnsl = new JitterObject("jit.gl.text");
glCnsl.drawto = NODE_CTX;
glCnsl.anim = cnslAnim.name;
glCnsl.gl_color = [1, 0.3, 0.4, 0.8];
glCnsl.screenmode = 0;
glCnsl.align = 2;

function positionCnsl(x, y, z){
	glCnsl.position = [x, y, z];
}

function scaleCnsl(x, y, z){
	glCnsl.scale = [x, y, z];
}

/*
logoEnable(0);
// the anim node and text for logo
var logoAnim = new JitterObject("jit.anim.node");
logoAnim.anim = ANIM_NODE;
logoAnim.scale = [0.2, 0.2, 0.2];
logoAnim.position = [0, -2.7, 0];

var glLogo = new JitterObject("jit.gl.text");
glLogo.drawto = NODE_CTX;
glLogo.anim = logoAnim.name;
glLogo.gl_color = [1, 1, 1, 0.7];
glLogo.screenmode = 0;

function logoEnable(v){
	glLogo.enable = Math.floor(v);
}//logoEnalbe()
*/

// add all objects to array for easy access when
// changing multiple parameters
// var allTextObj = [glText, glCrsr, glHist, glCnsl, glLogo];
var allTextObj = [glText, glCrsr, glNmbr, glCnsl];

function setFont(f){
	FONT = f;
	for (var i = 0; i < allTextObj.length; i++){
		allTextObj[i].font(f);
	}
}//setFont()

function setSize(s){
	SIZE = s;
	for (var i = 0; i < allTextObj.length; i++){
		allTextObj[i].size(s);
	}
}//setSize()

function setLeadScale(l){
	for (var i = 0; i < allTextObj.length; i++){
		allTextObj[i].leadscale = l;
	}
}//setLeadScale()

var alpha = 1;

function setAlpha(a){
	alpha = Math.max(0, Math.min(1, a));

	for (var i = 0; i < allTextObj.length; i++){
		var c = allTextObj[i].gl_color;
		c[3] = alpha;
		allTextObj[i].gl_color = c;
	}
}//setAlpha()

function runBlink(){
	c = arrayfromargs(arguments);
	glText.gl_color = c;
}//runBlink()

function disableText(){
	isDisabled = 1 - isDisabled;
	setAlpha(1.0 - isDisabled * 0.5);
}//disableText()

function matrixToText(){
	glText.jit_matrix(textMtx.name);
	glCrsr.jit_matrix(crsrMtx.name);
	glNmbr.jit_matrix(nmbrMtx.name);
	glCnsl.jit_matrix(cnslMtx.name);
	// glLogo.text(LOGO_TEXT);
}//matrixToText()

// the camera for capture
var glCam = new JitterObject("jit.gl.camera");
glCam.drawto = NODE_CTX;
glCam.out_name = CAM_CAP;
glCam.locklook = 1;
glCam.lookat = [0, 0, 0];
glCam.capture = 1;
glCam.position = [0, 0, 4];
glCam.erase_color = [1, 1, 1, 0];
glCam.near_clip = 1;
glCam.ortho = 1;
glCam.lens_angle = 80;

function cam(ortho, angle){
	glCam.ortho = ortho;
	glCam.lens_angle = angle;
}//cam()

// the videoplane for display
var glVid = new JitterObject("jit.gl.videoplane");
glVid.texture = CAM_CAP;
glVid.transform_reset = 2;
glVid.blend_enable = 1;
glVid.depth_enable = 0;
glVid.layer = 1000;

function blend(b){
	glHist.blend = b;
}//blend()

//init();

//======================================================================
// licensed under a
// Creative Commons Attribution 4.0 International License
//
// www.timohoogland.com
//======================================================================
