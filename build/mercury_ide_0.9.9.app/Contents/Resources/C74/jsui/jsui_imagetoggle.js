/*

image based toggle button

arguments: fileoff fileon blend bgred bggreen bgblue;
(bgcolor only appropriate works if image file has an alpha channel and blend is enabled)

*/

sketch.default2d();
sketch.fsaa=0; // no benefit from antialiasing in this example
var mybrgb = [1,1,1,1];
var myfileon = "defimagetoggle_on.tif";
var myfileoff = "defimagetoggle_off.tif";
var myval = 0;
var myblend = 0;
var imgon;	
var imgoff;	

// process arguments
if (jsarguments.length>1)
	myfileoff = jsarguments[1];
if (jsarguments.length>2)
	myfileon = jsarguments[2];
if (jsarguments.length>3)
	myblend = jsarguments[3];
if (jsarguments.length>4)
	mybrgb[0] = jsarguments[4]/255.;
if (jsarguments.length>5)
	mybrgb[1] = jsarguments[5]/255.;
if (jsarguments.length>6)
	mybrgb[2] = jsarguments[6]/255.;

imagecalc();
draw();
refresh();

function imageon(v)
{
	myfile = v;
	imagecalc();
	draw();
	refresh();
}

function imageoff(v)
{
	myfile = v;
	imagecalc();
	draw();
	refresh();
}

function blend(v)
{
	myblend = v;
	draw();
	refresh();
}

function imagecalc()
{
	imgon = new Image(myfileon);
	imgon.scale(box.rect[2]-box.rect[0],box.rect[3]-box.rect[1]);
	imgoff = new Image(myfileoff);
	imgoff.scale(box.rect[2]-box.rect[0],box.rect[3]-box.rect[1]);
}


function draw()
{
	with (sketch) {
		if (myblend) {
			glclearcolor(mybrgb);
			glclear();
			glenable("blend");
		} else {
			gldisable("blend");
		}
		if (myval)
			copypixels(imgon);
		else 
			copypixels(imgoff);
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

function brgb(r,g,b)
{
	mybrgb[0] = r/255.;
	mybrgb[1] = g/255.;
	mybrgb[2] = b/255.;
	draw();
	refresh();
}

function onresize(w,h)
{
	imagecalc();
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


