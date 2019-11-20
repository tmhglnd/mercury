/*

draw using max messages for the sketch api  

*/

outlets = 5;
setoutletassist(4,"various");
setoutletassist(3,"world coordinates for idle mouse events");
setoutletassist(2,"idle mouse events");
setoutletassist(1,"world coordinates for active mouse events");
setoutletassist(0,"active mouse events");

sketch.default2d();
draw();
refresh();

function fsaa(v)
{
	sketch.fsaa = v;
	refresh();
}

function draw()
{
	sketch.glclear();
}

function anything()
{
	var a = arrayfromargs(arguments); // need to make an ordinary array, but don't include message name
	
	// pass all other messages on to sketch
	sketch[messagename](a);
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl)
{
	ondrag(x,y,but,cmd,shift,capslock,option,ctrl);
}
onclick.local = 1; //private

function ondrag(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var w = sketch.screentoworld(x,y);
	outlet(1,w);
	outlet(0,x,y,but,cmd,shift,capslock,option,ctrl);
}
ondrag.local = 1; //private

function onidle(x,y,but,cmd,shift,capslock,option,ctrl)
{
	var w = sketch.screentoworld(x,y);
	outlet(3,w);
	outlet(2,x,y,but,cmd,shift,capslock,option,ctrl);
}
onidle.local = 1; //private

function onidleout()
{
	outlet(4,"idleout");
}
onidleout.local = 1; //private

function onresize(w,h)
{
	draw();
	refresh();
	outlet(4,"resize",w,h);
}
onresize.local = 1; //private
