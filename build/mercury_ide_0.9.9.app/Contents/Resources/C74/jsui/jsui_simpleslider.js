/*

a simple slider

arguments: fgred fggreen fgblue bgred bggreen bgblue linered linegreen lineblue mode

*/

sketch.default2d();
var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.2,0.2,0.2,1.];
var vrgb2 = [0.5,0.5,0.5,1.];
var vmode = 0;
var voutline = 1;

// process arguments
if (jsarguments.length>1)
	vfrgb[0] = jsarguments[1]/255.;
if (jsarguments.length>2)
	vfrgb[1] = jsarguments[2]/255.;
if (jsarguments.length>3)
	vfrgb[2] = jsarguments[3]/255.;
if (jsarguments.length>4)
	vbrgb[0] = jsarguments[4]/255.;
if (jsarguments.length>5)
	vbrgb[1] = jsarguments[5]/255.;
if (jsarguments.length>6)
	vbrgb[2] = jsarguments[6]/255.;
if (jsarguments.length>7)
	vrgb2[0] = jsarguments[7]/255.;
if (jsarguments.length>8)
	vrgb2[1] = jsarguments[8]/255.;
if (jsarguments.length>9)
	vrgb2[2] = jsarguments[9]/255.;
if (jsarguments.length>10)
	vmode = jsarguments[10];
if (jsarguments.length>11)
	voutline = jsarguments[11];

draw();

function draw()
{
	var width = box.rect[2] - box.rect[0];
	var height = box.rect[3] - box.rect[1];
	var aspect = width/height;
	
	with (sketch) {
		//scale everything to box size
		glmatrixmode("modelview");
		glpushmatrix();
		glscale(aspect,1,1);
		glenable("line_smooth");

		// erase background
		glclearcolor(vbrgb);
		glclear();			

		//draw line
		glcolor(vrgb2);
		shapeslice(1,1);
		moveto(0,0);
		plane(0.15,0.8);
		if (voutline) {
			glcolor(0,0,0);
			glpolygonmode("front_and_back","line");
			plane(0.15,0.8);
			glpolygonmode("front_and_back","fill");
		}
		
		// draw marker
		glcolor(vfrgb);
		switch (vmode) {
		case 2: // triangle		
			shapeslice(1,1);		
			moveto(0.5,1.6*val-0.8); //on screen in range -0.8 to 0.8	
			plane(0.2,0.,0.2,0.1); //triangle
			if (voutline) {
				glcolor(0,0,0);
				glpolygonmode("front_and_back","line");
				plane(0.2,0.,0.2,0.1); //triangle
				glpolygonmode("front_and_back","fill");
			}
			break;		
		case 1: // ellipse		
			shapeslice(40,1);		
			moveto(0,1.6*val-0.8); //on screen in range -0.8 to 0.8	
			ellipse(0.6,0.05);
			if (voutline) {
				glcolor(0,0,0);
				frameellipse(0.6,0.05);
			}
			break;		
		default: // rectangle		
			shapeslice(1,1);		
			moveto(0.,1.6*val-0.8); //on screen in range -0.8 to 0.8	
			plane(0.8,0.05); 
			if (voutline) {
				glcolor(0,0,0);
				glpolygonmode("front_and_back","line");
				plane(0.8,0.05); 
				glpolygonmode("front_and_back","fill");
			}
		} 
		//reset transformation matrix
		glmatrixmode("modelview");
		glpopmatrix();
	}
}

function bang()
{
	draw();
	refresh();
	outlet(0,val);
}

function msg_float(v)
{
	val = Math.min(Math.max(0,v),1);
	notifyclients();
	bang();
}

function set(v)
{
	val = Math.min(Math.max(0,v),1);
	notifyclients();
	draw();
	refresh();
}

function fsaa(v)
{
	sketch.fsaa = v;
	bang();
}

function frgb(r,g,b)
{
	vfrgb[0] = r/255.;
	vfrgb[1] = g/255.;
	vfrgb[2] = b/255.;
	draw();
	refresh();
}

function rgb2(r,g,b)
{
	vrgb2[0] = r/255.;
	vrgb2[1] = g/255.;
	vrgb2[2] = b/255.;
	draw();
	refresh();
}

function brgb(r,g,b)
{
	vbrgb[0] = r/255.;
	vbrgb[1] = g/255.;
	vbrgb[2] = b/255.;
	draw();
	refresh();
}

function mode(v)
{
	vmode = v;
	draw();
	refresh();
}

function outline(v)
{
	voutline = v;
	draw();
	refresh();
}

function setvalueof(v)
{
	msg_float(v);
}

function getvalueof()
{
	return val;
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
}
onclick.local = 1; //private. could be left public to permit "synthetic" events

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var f,a;

	a = sketch.screentoworld(x,y);
	f = (a[1]+0.8)/1.6; //on screen in range -0.8 to 0.8	
	msg_float(f); //set new value with clipping + refresh
}
ondrag.local = 1; //private. could be left public to permit "synthetic" events

function onresize(w,h)
{
	draw();
	refresh();
}
onresize.local = 1; //private
