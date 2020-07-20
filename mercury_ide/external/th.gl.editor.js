//====================================================================
// th.gl.editor.js
// A responsive texteditor for the opengl environment

// written by Timo Hoogland (c) 2020
// www.timohoogland.com
// License
// GNU LGPL v.3

// FUNCTIONALITIES:
// - add characters by typing
// - capslock sensitive
// - move with cursors or shortkeys
// - backspace a character and a line
// - enter an extra line of text
// - use tab to input 4 spaces as indentation
// - copy insert a line of code to an other line
// - copy replace a line of code on an other line
// - delete a line of code and remove the line
// - console for display error messages
// - read a previous mercury file
// - write a mercury file every time the code runs

// TO DO:
// undo/redo history (matrixset?)
//====================================================================

autowatch = 1;
inlets = 1;
outlets = 2;

// GENERAL SETTINGS:
var CRSR = "<<";
var CMMT = "//";
var INDENTATION = 4;
var EDITOR_LINES = 30;
var MAX_CHARS = 80;
var LINE_CHARS = 140;
// var UNDO_HISTORY = 5;
// var CNSL_LINES = 40;
// var CNSL_CHARS = 24;
var OUT_MAT = 0;

var POST_FLAG = 1;

// load keybindings from json file
var sKeys = new Dict(jsarguments[2]);

// fixed keybindings
var keys = {
	"space" : -2,
	"escape" : -3,
	"return" : -4,
	"tab" : -5,
	"delete" : -6,
	"backspace" : -7,
	"up" : -9,
	"down" : -10,
	"left" : -11,
	"right" : -12
}

var key;
var curLine, curCharacter, totalLines;
var lineLengths;
var isDisabled;

var CRSR_CHARS = [];
var CMMT_CHARS = [];

var UNIQ = Date.now();

var textMtx, crsrMtx, nmbrMtx;
// var histMtxSet, hIndex;
// var cnslMtx, cnslText = [];

function loadbang(){
	init();
}

function init(){
	if (jsarguments.length>1) {
		drawto(jsarguments[1]);

	}
	clear();
	isDisabled = false;

	font("Courier New Bold");
	fontsize(100);
	leadscale(0.94);
	tracking(1);
	line_length(999999);
	alpha(1);	
	
	cursor("<<");
	comment("//");

	draw();
}

function clear(){
	curCharacter = 0;
	curLine = 0;
	totalLines = 1;
	lineLengths = new Array(totalLines);
	lineLengths[curLine] = 0;
	
	emptyMatrix(totalLines);
	draw();
}

/* EXPERIMENTAL

function max_linelength(v){
	MAX_CHARS = Math.max(1, Math.min(Math.floor(v), LINE_CHARS - 40));
	init();
}

function max_lines(v){
	EDITOR_LINES = Math.max(1, Math.min(Math.floor(v), 40));
	init();
}*/

function emptyMatrix(lines){
	textMtx = new JitterMatrix("text"+UNIQ, 1, "char", LINE_CHARS, lines);
	crsrMtx = new JitterMatrix("crsr"+UNIQ, 1, "char", LINE_CHARS, lines);
	nmbrMtx = new JitterMatrix("nmbr"+UNIQ, 1, "char", 3, lines);
	// cnslMtx = new JitterMatrix("cnsl"+UNIQ, 1, "char", LINE_CHARS, CNSL_LINES);
	textMtx.setall(0);
}

// output the parsed code if output_matrix is disabled
function run(){
	outlet(0, "jit_matrix", textMtx.name);
	if (!OUT_MAT){
		outlet(0, mtxToSymbol(textMtx));
	}
}

// enable the output_matrix flag
function output_matrix(v){
	OUT_MAT = v != 0;
}

// convert the matrix to an array of strings per line
function mtxToSymbol(mat){
	var text = [];
	for (var y=0; y<mat.dim[1]; y++){
		var line = "";
		for (var x=0; x<mat.dim[0]; x++){
			line += String.fromCharCode(mat.getcell(x, y));
		}
		if (line != ""){
			text.push(line.replace(/\s\s+/g, ' ').trim());
		}
	}
	return text;
}

// draw the text and output all info
function draw(){
	drawCursor(); //set the cursorposition
	drawNumbers(); //store the numbers in the matrix
	matrixToText(); //set the matrices to the gl text objects
	// drawHighlight();

	var len = getMaxChar();
	outlet(1, "lines", totalLines);
	outlet(1, "line", curLine);
	outlet(1, "length", len);
	outlet(1, "nLength", len/MAX_CHARS);
	outlet(1, "nLines", (totalLines-1)/(EDITOR_LINES-1));
}

// load a dictionary of keybindings
function keybindings(n){
	sKeys = new Dict(n);
}

// choose method based on keypress
function keyPress(k){
	// post("@char", k, "\n");

	if (k == sKeys.get("disable-editor")[1]){
		disableText();
	}
	else if (!isDisabled){
		// CHARACTER KEYS
		if (k > 32 && k <= 126){ addChar(k); }
		else if (k == keys["space"]){ addChar(32); }
		
		// FUNCTION KEYS
		else if (k == keys["return"]){ newLine(); }
		// Backspace Win = 8, Mac = 127
		// Delete Win = 127, Mac = 127
		else if (k == keys["backspace"]){ backSpace(); }
		// arrow keys Platform-independent
		else if (k == keys["tab"]){ addTab(); }
		else if (k == keys["up"] || k == keys["down"]){ 
			gotoLine(1-(k+10)); 
		} 
		else if (k == keys["left"] || k == keys["right"]){
			gotoCharacter(1-(k+12)); 
		}
		
		// arrow keys ASCII
		// else if (k == 30 || k == 31){ gotoLine(k-30); }
		// else if (k == 28 || k == 29){ gotoCharacter(k-28); }
		
		// SHORTKEYS
		else if (k == sKeys.get("comment")[1]){ commentLine(); }
		
		else if (k == sKeys.get("delete-line")[1]){ deleteLine(); }
		else if (k == sKeys.get("copy-line")[1]){ copyLine(); }
		else if (k == sKeys.get("paste-line")[1]){ pasteInsertLine(); }
		else if (k == sKeys.get("paste-replace-line")[1]){ pasteReplaceLine(); }
		
		// else if (k == ALT_B){ backSpace(); }
		
		// Jump Top/Bottom/Start/End with ALT + Arrow Keys
		else if (k == sKeys.get("jump-top")[1]){ jumpTo(2); }
		else if (k == sKeys.get("jump-bottom")[1]){ jumpTo(3); }
		else if (k == sKeys.get("jump-begin")[1]){ jumpTo(0); }
		else if (k == sKeys.get("jump-end")[1]){ jumpTo(1); }

		// Navigate the editor with ASDW
		else if (k == sKeys.get("left")[1]){ gotoCharacter(0); }
		else if (k == sKeys.get("right")[1]){ gotoCharacter(1); }
		else if (k == sKeys.get("down")[1]){ gotoLine(1); }
		else if (k == sKeys.get("up")[1]){ gotoLine(0); }

		// Jumpt to top/bottom
		// else if (k == ALT_Q){ jumpTo(2); }
		// else if (k == ALT_SHFT_Q){ jumpTo(3); }
		
		// TO-DO
		// else if (k == ALT_J){ gotoWord(0); }
		// else if (k == ALT_L){ gotoWord(1); }
		// else if (k == ALT_Z){ getHistory(); }
	}
	draw();
}

// add multiple spaces to the text (tab)
function addTab(){
	var numSpaces = INDENTATION - (curCharacter % INDENTATION);
	for(var i = 0; i < numSpaces; i++){
		addChar(32);
	}
}

// add a character (alpha-numeric, numeric, special characters)
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
}

// backspace a character
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
}

// return the amount of characters in one line
function getCharCount(mat, line){
	var charCount = 0;
	var len = mat.dim[0];
	for (var i = 0; i < len; i++){
		if (mat.getcell(i, line) < 32){
			return charCount;
		}
		charCount++;
	}
}

// set an array of amount of characters per line
function countChars(){
	var rows = textMtx.dim[1];
	// empty the array to reset count
	lineLengths = [];
	for (var y = 0; y < rows; y++){
		lineLengths[y] = getCharCount(textMtx, y);
	}
}

// return the highest number of characters in one line
function getMaxChar(){
	var sortArr = lineLengths.slice(0);
	sortArr.sort(function(a,b){ return b-a });

	return sortArr[0];
}

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
}

/*function gotoWord(k){
	// var cnt = 0;
	gotoCharacter(k);
	var char = textMtx.getcell(curCharacter, curLine);
	
	post("@num", curCharacter);
	post("@lines", totalLines);
	post("@line", curLine);
	post("@char", char, "\n");

	if (char > 32 && curLine > 0){
		gotoWord(k);
	}
}*/

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
}

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
}

function newLine(){
	if (endOfLines()){
		return;
	}
	totalLines = textMtx.dim[1] + 1;
	// copy the matrix
	var copyMtx = new JitterMatrix(1, "char", LINE_CHARS, textMtx.dim[1]);
	copyMtx.frommatrix(textMtx.name);
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
}

function removeLine(){
	totalLines = Math.max(1, textMtx.dim[1] - 1);
	// copy the matrix
	var copyMtx = new JitterMatrix(1, "char", LINE_CHARS, textMtx.dim[1]);
	copyMtx.frommatrix(textMtx.name);
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
}

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
		copyMtx.frommatrix(textMtx.name);
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
}

// global pastebin variable to store a line of text
var pasteBin;

function copyLine(){
	pasteBin = new JitterMatrix(1, "char", LINE_CHARS, 1);
	// copy characters from current line to pastebin
	for (var i = 0; i < lineLengths[curLine]; i++){
		pasteBin.setcell2d(i, 0, textMtx.getcell(i, curLine));
	}
}

function pasteReplaceLine(){
	if (pasteBin !== null){
		// replace current text with text from pasteBin
		for (var x = 0; x < pasteBin.dim[0]; x++){
			textMtx.setcell2d(x, curLine, pasteBin.getcell(x, 0));
		}
		// restore character counts in every row
		countChars();
		// jump to end of new line
		jumpTo(1);
	}
}

function pasteInsertLine(){
	if (!endOfLines()){
		jumpTo(0);
		newLine();
		gotoLine(0);
		return pasteReplaceLine();
	}
}

function endOfLines(){
	var isEnd = totalLines >= EDITOR_LINES;
	if (isEnd){
		post("WARNING: End of lines reached \n");
	}
	return isEnd;
}

function cursor(c){
	// post("@cursor: ", c, "\n");
	CRSR = c.toString();
	CRSR_CHARS = [];
	for (var i=0; i<CRSR.length; i++){
		CRSR_CHARS.push(CRSR[i].charCodeAt(0));
	}
	draw();
}

function comment(c){
	// post("@comment: ", c, "\n");
	CMMT = c.toString();
	CMMT_CHARS = [];
	for (var i=0; i<CMMT.length; i++){
		CMMT_CHARS.push(CMMT[i].charCodeAt(0));
	}
	CMMT_CHARS = CMMT_CHARS.concat(32);
	draw();
}

function drawCursor(){
	crsrMtx.setall(32);
	// draw at least something at the end of the matrix.
	for (var i = 0; i < totalLines; i++){
		crsrMtx.setcell2d(LINE_CHARS-1, i, 46);
	}
	for (var c = 0; c < CRSR_CHARS.length; c++){
		crsrMtx.setcell2d(curCharacter+c, curLine, CRSR_CHARS[c]);
	}
}

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
}

/*function drawHighlight(){
	highlightMtx.setall(0);
	for (var i = 0; i < totalLines; i++){
		if (i == curLine){
			highlightMtx.setcell2d(0, i, 1.);
		}
	}
}*/

function commentLine(){
	var isCommented = 0;
	var comment = CMMT_CHARS;
	var len = CMMT_CHARS.length-1;
	var move = CMMT_CHARS.length;

	// check if the line starts with the comment characters
	for (var i = 0; i < len; i++){
		isCommented += textMtx.getcell(i, curLine) == comment[i];
	}
	// if true remove the comment sign
	if (isCommented == len){
		// check if extra space is present
		if (textMtx.getcell(len, curLine) == comment[len]){
			len += 1;
		}
		// replace all characters in the line and move position
		for (var i = 0; i < lineLengths[curLine]; i++){
			textMtx.setcell2d(i, curLine, textMtx.getcell(i+len, curLine));
		}
		// reposition cursor
		curCharacter = Math.max(0, curCharacter - len);
	} else {
		// reposition all the characters 3 steps further
		for (var i = lineLengths[curLine]-1; i >= 0; i--){
			textMtx.setcell2d(i+move, curLine, textMtx.getcell(i, curLine));
		}
		// add the comment sign symbols
		for (var i = 0; i < move; i++){
			textMtx.setcell2d(i, curLine, comment[i]);
		}
		// reposition cursor
		curCharacter += move;
	}
	countChars();
	return true;
}

// read a textfile from disk to the editor
function readFile(mat){
	fillText(mat);
	countChars();
	jumpTo(2);
	jumpTo(0);
	draw();
}

// fill the matrix with the text from disk
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
}

/*function fillConsole(mess){
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
}

function emptyConsole(){
	cnslText = [];
	cnslMtx.setall(0);
	draw();
}*/

//====================================================================
// GL TEXT OBJECTS
//====================================================================

var MAIN_CTX = "CTX";
var NODE_CTX = "node" + UNIQ;
var ANIM_NODE = "anim" + UNIQ;
var CAM_CAP = "cam" + UNIQ;

var SCALING = 1;
var FONT_SIZE = 100;

// the main node that all text is drawn to
// for display on videoplane through camera capture
var textNode = new JitterObject("jit.gl.node");
textNode.fsaa = 1;
textNode.type = "float32";
textNode.name = NODE_CTX;
textNode.adapt = 0;

function drawto(v){
	MAIN_CTX = v;
	textNode.drawto = MAIN_CTX;
	glVid.drawto = MAIN_CTX;
}

// the main anim node to position all text according to screensize
var animNode = new JitterObject("jit.anim.node");
animNode.name = ANIM_NODE;
animNode.position = [0, 0, 0];

// the text position
function position(x, y){
	animNode.position = [x, y, 0];
}

// the text scaling
function scale(s){
	SCALING = s * 100/FONT_SIZE;
	animNode.scale = [SCALING, SCALING, 0];
}

// the anim node and text for the command line
var textAnim = new JitterObject("jit.anim.node");
textAnim.anim = ANIM_NODE;
textAnim.position = [0.9, 0, 0];

var glText = new JitterObject("jit.gl.text");
glText.drawto = NODE_CTX;
glText.anim = textAnim.name;
glText.gl_color = [1, 1, 1, 1];
glText.screenmode = 0;
glText.cull_face = 1;

var textColor = [1, 1, 1, 1];
var runColor = [0, 0, 0, 1];

function color(){
	args = arrayfromargs(arguments);
	if (args.length !== 4){
		error("th.gl.editor: Expected an RGBA value in floating-point \n");
	} else {
		textColor = args;
		glText.gl_color = args;
	}
}

function run_color(){
	args = arrayfromargs(arguments);
	if (args.length !== 4){
		error("th.gl.editor: Expected an RGBA value in floating-point \n");
	} else {
		runColor = args;
	}
}

function runBlink(t){

	var c = [];
	for (var i=0; i<textColor.length; i++){
		c[i] = textColor[i] * (1-t) + runColor[i] * t;
	}
	glText.gl_color = c;

	// if (t){
	// 	glText.gl_color = runColor;
	// } else {
	// 	glText.gl_color = textColor;
	// }
}

// the anim node and text for the cursor
var crsrAnim = new JitterObject("jit.anim.node");
crsrAnim.anim = ANIM_NODE;
crsrAnim.position = [0.9, 0, 0];

var glCrsr = new JitterObject("jit.gl.text");
glCrsr.drawto = NODE_CTX;
glCrsr.anim = crsrAnim.name;
glCrsr.screenmode = 0;
glCrsr.cull_face = 1;
glCrsr.layer = 10;

// the anim node and text for the line numbers
var nmbrAnim = new JitterObject("jit.anim.node");
nmbrAnim.anim = ANIM_NODE;

var glNmbr = new JitterObject("jit.gl.text");
glNmbr.drawto = NODE_CTX;
glNmbr.anim = nmbrAnim.name;
glNmbr.gl_color = [0.6, 0.6, 0.6, 1];
glNmbr.screenmode = 0;
glNmbr.cull_face = 1;
glNmbr.layer = 10;

function number_color(){
	args = arrayfromargs(arguments);
	if (args.length !== 4){
		error("th.gl.editor: Expected an RGBA value in floating-point", "\n");
	} else {
		glNmbr.gl_color = args;
	}
}

var useBlink = true;
var blinkToggle = 0;
var cursorColor = [1, 0.501961, 0, 1];
var blinkColor = [0.4, 0.8, 1, 1];

function blink(){
	if (useBlink){
		blinkToggle = 1 - blinkToggle;
		if (blinkToggle){
			glCrsr.gl_color = blinkColor;
		} else {
			glCrsr.gl_color = cursorColor;
		}
	} else {
		glCrsr.gl_color = cursorColor;
	}
}

function blink_enable(v){
	useBlink = v != 0;
}

function cursor_color(){
	args = arrayfromargs(arguments);
	if (args.length !== 4){
		error("th.gl.editor: Expected an RGBA value in floating-point", "\n");
	} else {
		cursorColor = args;
	}
	blink();
}

function blink_color(){
	args = arrayfromargs(arguments);
	if (args.length !== 4){
		error("th.gl.editor: Expected an RGBA value in floating-point", "\n");
	} else {
		blinkColor = args;
	}
}

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
/*
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
*/

// add all objects to array for easy access when
// changing multiple parameters
// var allTextObj = [glText, glCrsr, glNmbr, glCnsl];
var allTextObj = [glText, glCrsr, glNmbr];

function font(f){
	for (var i = 0; i < allTextObj.length; i++){
		allTextObj[i].font(f);
	}
}

function fontsize(s){
	FONT_SIZE = s;
	for (var i = 0; i < allTextObj.length; i++){
		allTextObj[i].size(FONT_SIZE);
	}
	scale(SCALING);
	// textAnim.position = [0.9, 0, 0];
	// crsrAnim.position = [0.9, 0, 0];
}

function leadscale(l){
	for (var i=0; i<allTextObj.length; i++){
		allTextObj[i].leadscale = l;
	}
}

function tracking(t){
	for (var i=0; i<allTextObj.length; i++){
		allTextObj[i].tracking = t;
	}
}

function line_length(l){
	for (var i=0; i<allTextObj.length; i++){
		allTextObj[i].line_length = l;
	}
}

function line_width(w){
	for (var i=0; i<allTextObj.length; i++){
		allTextObj[i].line_length = w;
	}
}

var textAlpha = 1;

function alpha(a){
	textAlpha = Math.max(0, Math.min(1, a));

	for (var i = 0; i < allTextObj.length; i++){
		var c = allTextObj[i].gl_color;
		c[3] = textAlpha;
		allTextObj[i].gl_color = c;
	}
}

function cull_face(c){
	for (var i=0; i<allTextObj.length; i++){
		allTextObj[i].cull_face = c;
	}
}

function disableText(){
	isDisabled = 1 - isDisabled;
	alpha(1.0 - isDisabled * 0.5);
}

function matrixToText(){
	glText.jit_matrix(textMtx.name);
	glCrsr.jit_matrix(crsrMtx.name);
	glNmbr.jit_matrix(nmbrMtx.name);
	// glCnsl.jit_matrix(cnslMtx.name);
}

// the camera for capture
var glCam = new JitterObject("jit.gl.camera");
glCam.drawto = NODE_CTX;
glCam.out_name = CAM_CAP;
glCam.erase_color = [0, 0, 0, 0];
glCam.capture = 1;
glCam.ortho = 2;

// the videoplane for display in world
var glVid = new JitterObject("jit.gl.videoplane");
glVid.texture = CAM_CAP;
glVid.transform_reset = 2;
glVid.blend_enable = 1;
glVid.depth_enable = 0;
glVid.layer = 1000;

//====================================================================
// written by Timo Hoogland (c) 2020
// 
// License
// The GNU LGPL v.3
//====================================================================