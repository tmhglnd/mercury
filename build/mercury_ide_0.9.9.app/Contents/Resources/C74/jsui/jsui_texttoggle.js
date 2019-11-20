/*

simple texttoggle example 

*/

outlets = 2;
sketch.default2d();
var mybrgb = [0.8,0.8,0.8,1.];
var myfrgb = [0.,0.,0.,1.];
var mytexton = "on";
var mytextoff = "off";
var myfontsize = 0.7; 
var myfont = "Sans Serif"; 
var myval = 0;

// process arguments
if (jsarguments.length>1)
	mytextoff = jsarguments[1];
if (jsarguments.length>2)
	mytexton = jsarguments[2];
if (jsarguments.length>3)
	myfrgb[0] = jsarguments[3]/255.;
if (jsarguments.length>4)
	myfrgb[1] = jsarguments[4]/255.;
if (jsarguments.length>5)
	myfrgb[2] = jsarguments[5]/255.;
if (jsarguments.length>6)
	mybrgb[0] = jsarguments[6]/255.;
if (jsarguments.length>7)
	mybrgb[1] = jsarguments[7]/255.;
if (jsarguments.length>8)
	mybrgb[2] = jsarguments[8]/255.;
if (jsarguments.length>9)
	myfont = jsarguments[9];
if (jsarguments.length>10)
	myfontsize = jsarguments[10];
	
draw();
refresh();

function draw()
{
	var str;

	with (sketch) {
		fontsize(myfontsize*(box.rect[3]-box.rect[1]));
		font(myfont);
		glclearcolor(mybrgb);
		glclear();			
		glcolor(myfrgb);
		textalign("center","center");		
		moveto(0,0)
		if (myval)
			text(mytexton);
		else 
			text(mytextoff);
	}
}

function msg_int(v)
{
	if (v==0)
		myval = 0;
	else
		myval = 1;
	draw();
	refresh();
	notifyclients();
	if (myval)
		outlet(1,mytexton);
	else
		outlet(1,mytextoff);
	outlet(0,myval);
}

function set(v)
{
	if (v==0)
		myval = 0;
	else
		myval = 1;
	draw();
	refresh();
	notifyclients();
}

function bang()
{
	myval = 1 - myval; // toggle 0/1
	msg_int(myval);
}

function setvalueof(v)
{
	msg_int(v);
}

function getvalueof()
{
	return myval;
}

function texton(v)
{
	mytexton = v.toString();
	draw();
	refresh();
}

function textoff(v)
{
	mytextoff = v.toString();
	draw();
	refresh();
}

function fontsize(v)
{
	myfontsize = v;
	draw();
	refresh();
}

function font(v)
{
	myfont = v;
	draw();
	refresh();
}

function frgb(r,g,b)
{
	myfrgb[0] = r/255.;
	myfrgb[1] = g/255.;
	myfrgb[2] = b/255.;
	draw();
	refresh();
}

function brgb(r,g,b)
{
	mybrgb[0] = r/255.;
	mybrgb[1] = g/255.;
	mybrgb[2] = b/255.;
	draw();
	refresh();
}

function fsaa(v)
{
	sketch.fsaa = v;
	draw();
	refresh();
}

function onresize(w,h)
{
	draw();
	refresh();
}
onresize.local = 1; //private

// not using any mouse args
function onclick()
{
	bang();
}
onclick.local = 1; //private

