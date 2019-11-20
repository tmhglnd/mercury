/*

3d dial

arguments: fgred fggreen fgblue bgred bggreen bgblue dialred dialgreen dialblue mode

*/

sketch.ortho3d(); //like default3d but uses orthographic projection
var val = 0;
var vbrgb = [1.,1.,1.,1.];
var vfrgb = [0.3,0.3,0.6,1.];
var vrgb2 = [0.7,0.7,0.7,1.];
var last_x = 0;
var last_y = 0;
var vmode = 0;
var vwire = 0;

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

draw();

function draw()
{
	var theta;
	var width = box.rect[2] - box.rect[0];

	switch(vmode) {
	case 1: // 3d torus
		with (sketch) {
			glenable("depth_test");			
			shapeslice(10,40);
			glcullface("back");			
			// wireframe on/off
			if (vwire) {	
				glpolygonmode("front","line");			
				glpolygonmode("back","line");			
			} else {
				glpolygonmode("front","fill");			
				glpolygonmode("back","fill");			
			}
			// erase background
			glclearcolor(vbrgb);
			glclear();			
			// fill bg torus			
			glcolor(vrgb2);
			moveto(0,0,0);
			torus(0.6,0.2,0,180);						
			glclear("depth");			
			// fill fg arc
			glcolor(vfrgb);
			torus(0.6,0.2,0,180,-90-val*360,-90);						
			// draw arc outline
			glenable("line_smooth");			
			gldisable("depth_test");			
			shapeslice(80,1);
			glcolor(0,0,0,1);
			gllinewidth(1);
			framecircle(0.8,-90-val*360,-90);	
			framecircle(0.4,-90-val*360,-90);	
			glcolor(0,0,0,1);
			moveto(0,-0.4);
			lineto(0,-0.8);
			moveto(0,0);
			theta = (0.75-val)*2*Math.PI;
			moveto(0.4*Math.cos(theta),0.4*Math.sin(theta));		
			lineto(0.8*Math.cos(theta),0.8*Math.sin(theta));		
		}
		break;
	default: // 3d sphere
		with (sketch) {
			glenable("depth_test");			
			shapeslice(40,10);
			glcullface("back");		
			// wireframe on/off
			if (vwire) {	
				glpolygonmode("front","line");			
				glpolygonmode("back","line");			
			} else {
				glpolygonmode("front","fill");			
				glpolygonmode("back","fill");			
			}
			// erase background
			glclearcolor(vbrgb);
			glclear();			
			// fill bg sphere			
			glcolor(vrgb2);
			moveto(0,0,0);
			sphere(0.8,0,360,0,90);						
			// fill fg arc
			glclear("depth");			
			glcolor(vfrgb);
			sphere(0.8,-90-val*360,-90,0,90);						
			// draw arc outline
			gldisable("depth_test");			
			glenable("line_smooth");			
			shapeslice(80,1);
			glcolor(0,0,0,1);
			framecircle(0.8,-90-val*360,-90);	
			glcolor(0,0,0,1);
			moveto(0,0);
			lineto(0,-0.8);
			moveto(0,0);
			theta = (0.75-val)*2*Math.PI;
			lineto(0.8*Math.cos(theta),0.8*Math.sin(theta));		
		}
	}
}

function mode(v)
{
	vmode = v;
	draw();
	refresh();
}

function wireframe(v)
{
	vwire = v;
	draw();
	refresh();
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

function brgb(r,g,b)
{
	vbrgb[0] = r/255.;
	vbrgb[1] = g/255.;
	vbrgb[2] = b/255.;
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

function setvalueof(v)
{
	msg_float(v);
}

function getvalueof()
{
	return val;
}

function onresize(w,h)
{
	draw();
	refresh();
}
onresize.local = 1; //private

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
}
onclick.local = 1; //private. could be left public to permit "synthetic" events

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var f,dy;
	
	// calculate delta movements
	dy = y - last_y;
	if (shift) { 
		// fine tune if shift key is down
		f = val - dy*0.001; 
	} else {
		f = val - dy*0.01;
	}
	msg_float(f); //set new value with clipping + refresh
	// cache mouse position for tracking delta movements
	last_x = x;
	last_y = y;
}
ondrag.local = 1; //private. could be left public to permit "synthetic" events
