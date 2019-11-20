/*

tiling or stretched image panel

arguments: imagefile tile blend bgred bggreen bgblue;
(bgcolor only appropriate works if image file has an alpha channel and blend is enabled)

*/

outlets = 0;
sketch.default2d();
sketch.fsaa=0; // no benefit from antialiasing in this example
var mybrgb = [1,1,1,1];
var myfile = "defimagepanel.tif"; 
var mytile = 0; 
var myblend = 0; 

// process arguments
if (jsarguments.length>1) 
	myfile = jsarguments[1];
if (jsarguments.length>2)
	mytile = jsarguments[2];
if (jsarguments.length>3)
	myblend = jsarguments[3];
if (jsarguments.length>4)
	mybrgb[0] = jsarguments[4]/255.;
if (jsarguments.length>5)
	mybrgb[1] = jsarguments[5]/255.;
if (jsarguments.length>6)
	mybrgb[2] = jsarguments[6]/255.;

var img = new Image(myfile);
var scaleimg;
imagecalc();
draw();

function brgb(r,g,b)
{
	mybrgb[0] = r/255.;
	mybrgb[1] = g/255.;
	mybrgb[2] = b/255.;
	draw();
	refresh();
}

function image(v)
{
	myfile = v;
	img = new Image(myfile);
	imagecalc();
	draw();
	refresh();
}


function imagecalc()
{
	if (mytile) {
		scaleimg = 0;
	} else {
		scaleimg = new Image(img);
		scaleimg.scale(box.rect[2]-box.rect[0],box.rect[3]-box.rect[1])
	}	
}
function tile(v)
{
	mytile = v;
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

function draw()
{
	var width,height,aspect;
	var i,j,numrows,numcols;
			
	with (sketch) {
		if (myblend) {
			glclearcolor(mybrgb);
			glclear();
			glenable("blend");
		} else {
			gldisable("blend");
		}
				
		if (mytile) {
			height = box.rect[3] - box.rect[1]; 
			width = box.rect[2] - box.rect[0]; 
			numrows = height/img.size[1];
			if (height%img.size[1]) numrows++;
			numcols = width/img.size[0];
			if (width%img.size[0]) numcols++;
			for (i=0;i<numrows;i++) {
				for (j=0;j<numcols;j++) {
					copypixels(img,j*img.size[0],i*img.size[1]);
				}
			}
		} else {
			copypixels(scaleimg);
		}
	}
}

function onresize(w,h)
{
	imagecalc();
	draw();
	refresh();
}
onresize.local = 1; //private
