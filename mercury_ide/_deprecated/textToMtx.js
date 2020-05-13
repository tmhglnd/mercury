//======================================================================
// textToMtx.js
//
// written by Timo Hoogland © 2018
// www.timohoogland.com
//======================================================================
//
// FUNCTIONALITIES:
// add characters by typing
// move with cursors or shortkeys
// backspace a character and a line
// enter an extra line of text
// use tab to input 4 spaces as indentation
// copy a line of code to a new line
// delete a line of code from a line
//
// TO DO:
//
//======================================================================
// KEY CODES:
// alt L 2076
// alt R 2077
// alt U 2078
// alt D 2079
//
// alt A back 2277
// alt S next-line 2271
// alt D forward 10754
// alt W previous-line 10769
//
// alt Q start 2387
// alt Z end 2985
//
// alt X delete-line 10824
// alt C copy-line 2279
//
// alt B backspace 10795
//
// alt / comment line 2295
//======================================================================

autowatch = 1;
inlets = 1;
outlets = 1;

var key;
var curLine, curCharacter, totalLines;
var lineLengths;
var cursorPos;
var isHidden;

var INDENTATION = 4;
var MAX_LINES = 30;
var MAX_CHARS = 127;
var LINE_CHARS = 128;

var textMtx;
var cursorMtx;
var numbersMtx;

var objectNames = [];
var currentWord = [];

function loadbang(){
	// loadbang is better then init in global scope
	init();
}//loadbang()

function init(){
	curCharacter = 0;
	curLine = 0;
	totalLines = 1;
	lineLengths = new Array(totalLines);
	lineLengths[curLine] = 0;
	cursorPos = [0, 0];
	isHidden = false;

	emptyMatrix(totalLines);
	draw();
}//init()
/*
function setObjectNames(){
	objectNames = arrayfromargs(arguments);

	post("received all function names");
	for (var i = 0; i < objectNames.length; i++){
		post(objectNames[i]);
	}
}//setObjectNames()

function autoComplete(k){
	if (k == 32){
		currentWord = [];
	} else {
		currentWord.push(k);
		post("current typing:", currentWord, "\n");
	}
}
*/
function emptyMatrix(lines){
	textMtx = new JitterMatrix("textMtx", 1, "char", LINE_CHARS, lines);
	cursorMtx = new JitterMatrix("cursorMtx", 1, "char", LINE_CHARS, lines);
	// cursorBox = new JitterMatrix("cursorBox", 1, "float32", LINE_CHARS, MAX_LINES);
	highlightMtx = new JitterMatrix("hiliMtx", 1, "float32", 1, MAX_LINES);
	numbersMtx = new JitterMatrix("numbersMtx", 1, "char", 3, lines);

	textMtx.setall(0);
}

function draw(){
	drawCursor();
	drawNumbers();
	drawHighlight();

	outlet(0, "lines", totalLines);
	outlet(0, "line", curLine);
	outlet(0, "length", getMaxChar());
	// post("curChar", curCharacter, "line", curLine, "\n");
}//draw()

function keyPress(k){
	if (k == 96){
		isHidden = 1 - isHidden;
		outlet(0, "hide", isHidden);
	}
	else if (!isHidden){
		// NORMAL KEYS
		if (k == 9){ addTab(); }

		if (k >= 32 && k <= 126){
			// autoComplete(k);
			addChar(k);
		}

		if (k == 30 || k == 31){ gotoLine(k-30); }
		if (k == 28 || k == 29){ gotoCharacter(k-28); }
		if (k == 127){ backSpace(); }
		if (k == 13){ newLine(); }
		if (k >= 2076 && k <= 2079){ jumpTo(k-2076); }

		// SHORTKEYS
		// alt A back 2277
		if (k == 2277){ gotoCharacter(0); }
		// alt D forward 10754
		if (k == 10754){ gotoCharacter(1); }
		// alt S next-line 2271
		if (k == 2271){ gotoLine(1); }
		// alt W previous-line 10769
		if (k == 10769){ gotoLine(0); }
		// alt Q start 2387
		if (k == 2387){ jumpTo(2); }
		// alt Z end 2985
		if (k == 2985){ jumpTo(3); }
		// alt X delete-line 10824
		if (k == 10824){ deleteLine(); }
		// alt C copy-line 2279
		if (k == 2279){ copyLine(); }
		// alt B backspace 10795
		if (k == 10795){ backSpace(); }
		// alt / comment line 2295
		if (k == 2295){ commentLine(); }
	}
	draw();
}//keyPress()

function addTab(){
	var numSpaces = INDENTATION - (curCharacter % INDENTATION);
	for(var i = 0; i < numSpaces; i++){
		addChar(32);
	}
}//addTab()

function addChar(k){
	if (curCharacter == MAX_CHARS){
		return;
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
	if (totalLines == MAX_LINES){
		// maximum line length is 26 for now
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
}//deleteLine()

function copyLine(){
	if (totalLines == 26){
		return; // maximum line length is 26 for now
	}
	totalLines = textMtx.dim[1] + 1;

	// copy the matrix
	var copyMtx = new JitterMatrix(1, "char", LINE_CHARS, textMtx.dim[1]);
	copyMtx.frommatrix(textMtx);
	emptyMatrix(totalLines);

	var xDim = copyMtx.dim[0];
	var yDim = copyMtx.dim[1];

	// store all lines including line where cursor sits
	for (var y = 0; y <= curLine; y++){
		for (var x = 0; x < xDim; x++){
			textMtx.setcell2d(x, y, copyMtx.getcell(x, y));
		}
	}

	// update the line position
	curLine++;

	// copy all text to the next rows
	for (var y = curLine; y < totalLines; y++){
		for (var x = 0; x < xDim; x++){
			textMtx.setcell2d(x, y, copyMtx.getcell(x, y-1));
		}
	}

	// restore character counts in every row
	countChars();

	// jump to end of new line
	curCharacter = lineLengths[curLine];
}

function drawCursor(){
	cursorPos[0] = curCharacter;
	cursorPos[1] = curLine;
	// textMtx.setcell2d(cursorPos[0], cursorPos[1], 60);
	// cursorMtx.setall(95);
	cursorMtx.setall(32);
	// cursorBox.setall(0);

	// draw at least something at the end of the matrix.
	for (var i = 0; i < totalLines; i++){
		cursorMtx.setcell2d(LINE_CHARS-1, i, 95);
	}
	cursorMtx.setcell2d(cursorPos[0]+1, cursorPos[1], 61);
	cursorMtx.setcell2d(cursorPos[0]+2, cursorPos[1], 61);
	cursorMtx.setcell2d(cursorPos[0], cursorPos[1], 60);

	// for (var i = curCharacter+1; i < 100; i++){
	// 	cursorMtx.setcell2d(i, cursorPos[1], 61);
	// }
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
			numbersMtx.setcell2d(n, i, digits[n].charCodeAt(0));
		}
	}

	numbersMtx.setcell2d(0, curLine, 62);
	numbersMtx.setcell2d(1, curLine, 62);
	// post("\n");
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
}//commentLine()

//======================================================================
// licensed under a
// Creative Commons Attribution 4.0 International License
//
// tm//hglnd
// www.timohoogland.com
//
// created on: 2018-03-05
// modified on: 2018-03-05
//======================================================================
