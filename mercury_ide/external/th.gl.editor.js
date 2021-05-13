//===================================================================
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
//===================================================================

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
var curLine, curChar, totalLines;
var isDisabled;

var CRSR_CHARS = [];
var CMMT_CHARS = [];

var UNIQ = Date.now();

// matrices for text display
var textMtx, crsrMtx, nmbrMtx;
// arrays for strings;
var textBuf;

// var histMtxSet, hIndex;
// var cnslMtx, cnslText = [];

function loadbang(){
	init();
}

function init(){
	textBuf = [''];

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
	curChar = 0;
	curLine = 0;
	totalLines = 1;
	
	empty(totalLines);
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

function empty(lines){
	textBuf = [''];
	// textMtx = new JitterMatrix("text"+UNIQ, 1, "char", LINE_CHARS, lines);
	// crsrMtx = new JitterMatrix("crsr"+UNIQ, 1, "char", LINE_CHARS, lines);
	// nmbrMtx = new JitterMatrix("nmbr"+UNIQ, 1, "char", 3, lines);
	// cnslMtx = new JitterMatrix("cnsl"+UNIQ, 1, "char", LINE_CHARS, CNSL_LINES);
	// textMtx.setall(0);
}

// output the parsed code if output_matrix is disabled
function run(){
	outlet(0, "jit_matrix", textMtx.name);
	if (!OUT_MAT){
		var out = textBuf.map(function(t){
			return t.replace(/\s+/g, ' ').trim();
		})
		outlet(0, out);
		// outlet(0, mtxToSymbol(textMtx));
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
	// update number of lines
	totalLines = textBuf.length;
	
	drawText(); //place the strings as text in a matrix
	drawCursor(); //set the cursorposition
	drawNumbers(); //store the numbers in the matrix
	matrixToText(); //set the matrices to the gl text objects
	// drawHighlight();

	var len = getMaxChar();
	outlet(1, "lines", textBuf.length);
	outlet(1, "line", curLine);
	outlet(1, "length", len);
	outlet(1, "nLength", len/MAX_CHARS);
	outlet(1, "nLines", (textBuf.length-1)/(EDITOR_LINES-1));
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
		else if (k == keys["delete"]){ deleteChar(); }
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

		else if (k == sKeys.get("jump-word-left")[1]){ gotoWord(0); }
		else if (k == sKeys.get("jump-word-right")[1]){ gotoWord(1); }
		
		// Jump to top/bottom
		// else if (k == ALT_Q){ jumpTo(2); }
		// else if (k == ALT_SHFT_Q){ jumpTo(3); }
		
		// TO-DO
		// else if (k == ALT_Z){ getHistory(); }
	}
	draw();

	// for (var t=0; t<textBuf.length; t++){
	// 	post('line: '+ t + "| ", textBuf[t], "\n");
	// }
}

// remove a charachter at index
String.prototype.removeCharAt = function(i){
    var tmp = this.split('');
    tmp.splice(i, 1);
    return tmp.join(''); 
}

// instert a character at index
String.prototype.insertCharAt = function(i, c){
	var l = this.slice(0, i);
	var r = this.slice(i);
	return l + c + r;
}

// add multiple spaces to the text (tab)
function addTab(){
	var numSpaces = INDENTATION - (curChar % INDENTATION);
	for (var i = 0; i < numSpaces; i++){
		addChar(32);
	}
}

// add a character (alpha-numeric, numeric, special characters)
function addChar(k){
	if (curChar >= MAX_CHARS){
		if (endOfLines()) {
			return;
		} else {
			newLine();
		}
	}
	// ascii code to string
	var c = String.fromCharCode(k);
	// insert character at index
	textBuf[curLine] = textBuf[curLine].insertCharAt(curChar, c);
	// increment current character
	curChar++;
}

// backspace a character
function backSpace(){
	// decrement character index
	curChar = Math.max(-1, (curChar-=1));

	if (curChar >= 0){
		// remove character at index
		textBuf[curLine] = textBuf[curLine].removeCharAt(curChar);
	} else if (curLine > 0){
		// remove line if at beginning of line
		removeLine();
	} else {
		// else index is 0
		curChar = 0;
	}
}

// delete a character (oposite of backspace)
function deleteChar(){
	if (curChar < textBuf[curLine].length){
		textBuf[curLine] = textBuf[curLine].removeCharAt(curChar);
	} else {
		if (curLine < textBuf.length-1){
			gotoLine(1);
			removeLine();
		}
	}
}

// ===========
// Deprecated

// return the amount of characters in one line
// function getCharCount(mat, line){
// 	var charCount = 0;
// 	var len = mat.dim[0];
// 	for (var i = 0; i < len; i++){
// 		if (mat.getcell(i, line) < 32){
// 			return charCount;
// 		}
// 		charCount++;
// 	}
// }

// set an array of amount of characters per line
// function countChars(){
// 	var lines = textBuf.length;
// 	lineLengths = [];
// 	for (var l=0; l<lines; l++){
// 		lineLengths[l] = textBuf[l].length;
// 	}
// }
// ===========

// return the highest number of characters in one line
function getMaxChar(){
	var lengths = [];
	for (var l=0; l<textBuf.length; l++){
		lengths[l] = textBuf[l].length;
	}
	var sortArr = lengths.slice(0);
	sortArr.sort(function(a,b){ return b-a });

	return sortArr[0];
}

// move one character to the right or left
function gotoCharacter(k){
	curChar = curChar + (k * 2 - 1);
	var len = textBuf[curLine].length;

	if (curChar < 0 && curLine > 0){
		gotoLine(0);
		jumpTo(1);
	} else if (curChar > len && curLine != totalLines-1){
		gotoLine(1);
		jumpTo(0);
	} else {
		curChar = Math.min(len, Math.max(0, curChar));
	}
}

// move one line up or down
function gotoLine(k){
	k = k * 2 - 1;
	var prevLen = textBuf[curLine].length;

	curLine = Math.min(Math.max(0, (curLine+k)), totalLines-1);
	var len = textBuf[curLine].length;

	curChar = Math.min(len, curChar);

	if (curChar == prevLen){
		curChar = len;
	} else {
		curChar = Math.min(len, curChar);
	}
}

// jump to the next or previous word (looks for seprated by spaces)
function gotoWord(k){
	if (k === 0){
		var l = textBuf[curLine].slice(0, curChar);
		if (l.match(/\ +[^ ]*$/g)){
			var move = l.match(/\s+[^\s]*(\s?)+$/g)[0].length;
			curChar -= move;
		} else {
			jumpTo(0);
			gotoCharacter(0);
		}
	} else if (k === 1){
		var l = textBuf[curLine].slice(curChar);
		if (l.match(/^[^ ]*\ +/g)){
			var move = l.match(/^(\s?)+[^\s]*/g)[0].length;
			curChar += move;
		} else {
			jumpTo(1);
			gotoCharacter(1);
		}
	}
}

// jump to beginning/end of line or top/bottom
function jumpTo(k){
	var len = textBuf[curLine].length;
	switch(k){
		// beginning of line
		case 0: curChar = 0; break;
		// end of line
		case 1: curChar = len; break;
		// to beginning (top)
		case 2: curLine = 0;
				len = textBuf[curLine].length;
				curChar = Math.min(len, curChar); break;
		// to end (bottom)
		case 3: curLine = textBuf.length - 1;
				len = textBuf[curLine].length;
				curChar = Math.min(len, curChar); break;
	}
}

function newLine(){
	if (endOfLines()){
		return;
	}
	// split array in left and right of cursor
	var line = textBuf[curLine];
	var l = line.slice(0, curChar);
	var r = line.slice(curChar);
	
	// store line left on current line
	textBuf[curLine] = l;
	
	// update the line position
	curLine++;
	
	// insert new line on right side of cursor
	var u = textBuf.slice(0, curLine);
	u = Array.isArray(u)? u : [u];
	u.push(r);
	// store to array
	textBuf = u.concat(textBuf.slice(curLine));
	// jump to beginning of line
	jumpTo(0);
}

function removeLine(){
	// cursors at end of previous line
	curChar = textBuf[curLine-1].length;

	// add current line to line above
	textBuf[curLine-1] += textBuf[curLine];
	// remove item from array at index
	textBuf.splice(curLine, 1);

	// update the line position
	curLine = Math.max(0, curLine-1);	
}

function deleteLine(){
	if (totalLines == 1){
		empty();
		curLine = 0;
		jumpTo(2);
		jumpTo(0);
	} else {
		// for the textBufay
		textBuf.splice(curLine, 1);

		if (curLine == textBuf.length){
			curLine--;
		}
		// place cursor
		curChar = Math.min(textBuf[curLine].length, curChar);
	}
}

// global pastebin variable to store a line of text
var pasteBin;

function copyLine(){
	pasteBin = textBuf[curLine];
}

function pasteReplaceLine(){
	if (pasteBin !== null){
		// replace string with pastebin string
		textBuf[curLine] = pasteBin;
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

// set the cursor characters
function cursor(c){
	// post("@cursor: ", c, "\n");
	CRSR = c.toString();
	CRSR_CHARS = [];
	for (var i=0; i<CRSR.length; i++){
		CRSR_CHARS.push(CRSR[i].charCodeAt(0));
	}
	draw();
}

// set the comment characters
function comment(c){
	//post("@comment: ", c, "\n");
	CMMT = c.toString();
	CMMT_CHARS = [];
	for (var i=0; i<CMMT.length; i++){
		CMMT_CHARS.push(CMMT[i].charCodeAt(0));
	}
	CMMT_CHARS = CMMT_CHARS.concat(32);
	draw();
}

// Add or remove comment at start of line
function commentLine(){
	// add comment-characters to regex
	// escape special characters
	var esc = CMMT.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
	
	var rgx = new RegExp('^ *' + esc + ' ?', 'g');
	// if has comment remove it, else add
	if (textBuf[curLine].match(rgx)){
		textBuf[curLine] = textBuf[curLine].replace(rgx, '');
	} else {
		textBuf[curLine] = CMMT + ' ' + textBuf[curLine];
	}
	curChar = textBuf[curLine].length;
	// return true;
}

// draw the text to a jitter matrix as ascii
function drawText(){
	textMtx = new JitterMatrix("text"+UNIQ, 1, "char", LINE_CHARS, textBuf.length);
	textMtx.setall(0);
	// draw all the characters as ascii code in a matrix
	for (var l=0; l<textBuf.length; l++){
		// check if not an empty line/string
		if (!textBuf[l].match(/^[ \t]*$/g)){	
			for (var c=0; c<textBuf[l].length; c++){
				textMtx.setcell2d(c, l, textBuf[l].charCodeAt(c));
			}
		}
	}
}

// draw the cursor to a jitter matrix as ascii
function drawCursor(){
	crsrMtx = new JitterMatrix("crsr"+UNIQ, 1, "char", LINE_CHARS, totalLines);
	
	crsrMtx.setall(32);
	// draw at least something at the end of the matrix.
	for (var i = 0; i < totalLines; i++){
		crsrMtx.setcell2d(LINE_CHARS-1, i, 46);
	}
	for (var c = 0; c < CRSR_CHARS.length; c++){
		crsrMtx.setcell2d(curChar+c, curLine, CRSR_CHARS[c]);
	}
}

// draw the numbers to a jitter matrix as ascii
function drawNumbers(){
	nmbrMtx = new JitterMatrix("nmbr"+UNIQ, 1, "char", 3, totalLines);
	
	for (var i = 0; i < totalLines; i++){
		var digits = new Array(2);
		digits[0] = String(Math.floor((i)/ 10));
		digits[1] = String((i) % 10);
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

// read a textfile from disk to the editor
function readFile(mat){
	fillText(mat);
	// jump to top and beginning
	jumpTo(2);
	jumpTo(0);

	draw();
}

// fill the matrix with the text from disk
function fillText(mat){
	file = new JitterMatrix(mat);
	dimX = Math.min(MAX_CHARS, file.dim[0]);
	totalLines = Math.min(EDITOR_LINES, file.dim[1]);
	// empty(totalLines);
	textBuf = [];

	for (var l=0; l<totalLines; l++){
		textBuf[l] = '';
		for (var c=0; c<dimX; c++){
			// read cell ascii value
			var v = file.getcell(c, l);
			// filter out values below 31
			textBuf[l] += (v > 31) ? String.fromCharCode(v) : '';
		}
	}
}

// replace all the text with the incoming arguments
// this can be a list of symbols for every line
function set(){
	var text = arrayfromargs(arguments);
	totalLines = Math.min(EDITOR_LINES, text.length);
	text = text.slice(0, totalLines);
	// empty buffer
	textBuf = [];
	textBuf = Array.isArray(text)? text : [text];

	curLine = textBuf.length-1;
	jumpTo(2);
	jumpTo(1);
	draw();
}

// append a line of text or multiple symbols per line
function append(){
	var text = arrayfromargs(arguments);
	text = Array.isArray(text)? text : [text];

	if (totalLines + text.length > EDITOR_LINES){
		post('append(): maximum number of lines reached \n');
		return;
	}
	textBuf = textBuf.concat(text);
	jumpTo(2);
	jumpTo(1);
	draw();
}

// append a line of text or multiple symbols per line
function prepend(){
	var text = arrayfromargs(arguments);
	text = Array.isArray(text)? text : [text];

	if (totalLines + text.length > EDITOR_LINES){
		post('append(): maximum number of lines reached \n');
		return;
	}
	textBuf = text.concat(textBuf);
	jumpTo(2);
	jumpTo(1);
	draw();
}

// remove a line of text at a specified index
function remove(idx){
	if (idx === undefined){ idx = textBuf.length-1; }
	curLine = idx;
	deleteLine();
	draw();
}

// insert a line of text or multiple symbols at a specified index
// a list of symbols will inserte one line per symbol
function insert(){
	var args = arrayfromargs(arguments);
	if (isNaN(args[0])){
		post('insert(): index is not a number \n');
		return;
	}
	var idx = Math.min(EDITOR_LINES, args[0]);
	var text = args.slice(1);
	text = Array.isArray(text)? text : [text];

	// exit if doesn't fit in editor
	if (totalLines + text.length > EDITOR_LINES){
		post('insert(): maximum number of lines reached \n');
		return;
	}
	// if insert between totalLines
	if (idx < totalLines){	
		var u = textBuf.slice(0, Math.max(0, idx));
		u = Array.isArray(u)? u : [u];
		u = u.concat(text);
		textBuf = u.concat(textBuf.slice(idx));
	} else {
		// else append to code and insert empty strings
		var diff = idx - totalLines;
		for (var d=0; d<diff; d++){
			textBuf.push('');
		}
		textBuf = textBuf.concat(text);
	}
	draw();
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

//===================================================================
// GL TEXT OBJECTS
//===================================================================

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