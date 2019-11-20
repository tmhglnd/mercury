/*

gradient panel

arguments: fgred fggreen fgblue bgred bggreen bgblue direction

*/

outlets = 0;
sketch.default2d();
sketch.fsaa=0; // no benefit from antialiasing in this example
var mybrgb = [0.2,0.2,0.2,1.];
var myfrgb = [0.8,0.8,0.8,1.];
var mydirection = 1; 
// 0=east, 1=southeast, 2=south, 3=southwest 
// 4=west, 5=northwest, 6=north, 7=northeast

// process arguments
if (jsarguments.length>1)
	myfrgb[0] = jsarguments[1]/255.;
if (jsarguments.length>2)
	myfrgb[1] = jsarguments[2]/255.;
if (jsarguments.length>3)
	myfrgb[2] = jsarguments[3]/255.;
if (jsarguments.length>4)
	mybrgb[0] = jsarguments[4]/255.;
if (jsarguments.length>5)
	mybrgb[1] = jsarguments[5]/255.;
if (jsarguments.length>6)
	mybrgb[2] = jsarguments[6]/255.;
if (jsarguments.length>7)
	mydirection = jsarguments[7];

draw();

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

function direction(v)
{
	mydirection = v;
	draw();
	refresh();
}

function draw()
{
	var str,width,height,aspect,down;
	var cmid = new Array();
	var c1,c2,c3,c4;
	
	height = box.rect[3] - box.rect[1]; 
	width = box.rect[2] - box.rect[0]; 
	aspect = width/height;
	
	
	cmid[0] = (mybrgb[0] + myfrgb[0])/2;
	cmid[1] = (mybrgb[1] + myfrgb[1])/2;
	cmid[2] = (mybrgb[2] + myfrgb[2])/2;

	mydirection = mydirection%8;
	if (mydirection<0)
		mydirection += 8;

	// c1 = bottom left	
	// c2 = top left	
	// c3 = top right	
	// c4 = bottom right	
	switch (mydirection)
	{
	case 7: //northeast
		c1 = myfrgb;
		c2 = cmid;
		c3 = mybrgb;
		c4 = cmid;
		break;
	case 6: //north
		c1 = myfrgb;
		c2 = mybrgb;
		c3 = mybrgb;
		c4 = myfrgb;
		break;
	case 5: //northwest
		c1 = cmid;
		c2 = mybrgb;
		c3 = cmid;
		c4 = myfrgb;
		break;
	case 4: //west
		c1 = mybrgb;
		c2 = mybrgb;
		c3 = myfrgb;
		c4 = myfrgb;
		break;
	case 3: //southwest
		c1 = mybrgb;
		c2 = cmid;
		c3 = myfrgb;
		c4 = cmid;
		break;
	case 2: //south
		c1 = mybrgb;
		c2 = myfrgb;
		c3 = myfrgb;
		c4 = mybrgb;
		break;
	case 1: //southeast
		c1 = cmid;
		c2 = myfrgb;
		c3 = cmid;
		c4 = mybrgb;
		break;
	default: //east
		c1 = myfrgb;
		c2 = myfrgb;
		c3 = mybrgb;
		c4 = mybrgb;
	}

	with (sketch) {
		glbegin("tri_strip");
			glcolor(c1);
			glvertex(-aspect,-1);
			glcolor(c2);
			glvertex(-aspect,1);
			glcolor(c4);
			glvertex(aspect,-1);		
			glcolor(c3);
			glvertex(aspect,1);
		glend();
	}
}

function onresize(w,h)
{
	draw();
	refresh();
}
onresize.local = 1; //private
