/*

rounded text label

arguments: text labelred labelgreen labelblue textred textgreen textblue bgred bggreen bgblue font fontsize roundness padding;
(fontsize is specified as a percentage of height 0.-1.),

*/

outlets = 1;
sketch.default2d();
var mytext = " ";
var mybrgb = [1,1,1,1];
var myfrgb = [0.2,0.2,0.2,1.];
var myrgb2 = [1,1,1,1];

var myfont = "Sans Serif";  // Geneva on Mac, Arial on PC
var myfontsize = 0.7; // relative to height
var myround = 1;
var mypadding = 0.15;

// process arguments
if (jsarguments.length>1)
	mytext = jsarguments[1];
if (jsarguments.length>2)
	myfrgb[0] = jsarguments[2]/255.;
if (jsarguments.length>3)
	myfrgb[1] = jsarguments[3]/255.;
if (jsarguments.length>4)
	myfrgb[2] = jsarguments[4]/255.;
if (jsarguments.length>5)
	myrgb2[0] = jsarguments[5]/255.;
if (jsarguments.length>6)
	myrgb2[1] = jsarguments[6]/255.;
if (jsarguments.length>7)
	myrgb2[2] = jsarguments[7]/255.;
if (jsarguments.length>8)
	mybrgb[0] = jsarguments[8]/255.;
if (jsarguments.length>9)
	mybrgb[1] = jsarguments[9]/255.;
if (jsarguments.length>10)
	mybrgb[2] = jsarguments[10]/255.;
if (jsarguments.length>11)
	myfont = jsarguments[11];
if (jsarguments.length>12)
	myfontsize = jsarguments[12];
if (jsarguments.length>13)
	myround = jsarguments[13];
if (jsarguments.length>14)
	mypadding = jsarguments[14];

draw();

function round(v)
{
	myround = v;
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

function rgb2(r,g,b)
{
	myrgb2[0] = r/255.;
	myrgb2[1] = g/255.;
	myrgb2[2] = b/255.;
	draw();
	refresh();
}


function fsaa(v)
{
	sketch.fsaa = v;
	draw();
	refresh();
}

function text(v)
{
	mytext = v.toString();
	draw();
	refresh();
}

function font(v)
{
	myfont = v.toString();
	draw();
	refresh();
}

function fontsize(v)
{
	myfontsize = v;
	draw();
	refresh();
}

function padding(v)
{
	mypadding = v;
	draw();
	refresh();
}

function draw()
{
	var str,width,height,aspect;

	height = box.rect[3] - box.rect[1]; 
	width = box.rect[2] - box.rect[0]; 
	aspect = width/height;

	with (sketch) {
		//erase background
		glclearcolor(mybrgb);
		glclear();
	
		glcolor(myfrgb);
		moveto(0,0)
		roundedplane(myround,aspect-mypadding,1-mypadding)

		glcolor(myrgb2);
		font(myfont);
		fontsize(myfontsize*height);
		textalign("center","center");		
		text(mytext);
	}
}

function bang()
{
	draw();
	refresh();
	outlet(0,"bang");
}

function onresize(w,h)
{
	draw();
	refresh();
}
onresize.local = 1; //private

function onclick()
{
	bang();
}
onclick.local = 1; //private
