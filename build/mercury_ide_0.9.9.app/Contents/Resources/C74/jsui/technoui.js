const TECHNOUIVERSION = 3.0;

var initializing = true;

function step(x, at, dc, am, p, c, idxx) {	
	this.hasLeftSlice = false;
	this.hasRightSlice = false;
	this.init = true;
	this.index = idxx;
	step.setStart(this,x);
	step.setAttack(this,at);
	step.setDecay(this,dc);
	step.setAmp(this,am);
	step.setPitch(this,p);
	step.setCurve(this,c);
	this.init=false;		
}

// apparently JS 1.6 requires one to define function object 
// properties outside of the function itself if they are going
// to be used in the outside scope.
step.setStart = function (s,v) {
		if (v != s.x) {
			if (!dumping) {
				if (s.hasLeftSlice)
					if ((s.index!=0)&&(v < s.leftSlice.xLeft))
						return;
				if (s.hasRightSlice)
					if ((s.index!=steps.length-1)&&(s.rightSlice.xRight < v))
						return;
			}
			s.x = v;
			safeOutlet(0,"pos",s.index, s.x);
			if (s.hasLeftSlice) {
				s.leftSlice.xRight = s.x;
				slice.setMouseIdxs(s.leftSlice);	
				if (!dumping)
					slice.recalcAttacksDecaysAndCurves(s.leftSlice);
			}
			if (s.hasRightSlice) {
				s.rightSlice.xLeft = s.x;
				slice.setMouseIdxs(s.rightSlice);
				if (!dumping)
					slice.recalcAttacksDecaysAndCurves(s.rightSlice);
			}
			if (!dumping) 
				notifyclients();	
		}
	}
		
step.setAmp	= function (s,v) {	
		if (s.amp != v) {	
			s.amp = v;		
			if (s.amp < 0) s.amp = 0;
			safeOutlet(0, "amplitude",s.index,s.amp);
			if (!dumping) {
				step.updateAttacks(s);
				step.updateDecays(s);
				notifyclients();
			}
		}
	}	

step.setAttack = function (s,v) {	
		if (s.attack != v) {	
			s.attack = v;		
			if (s.attack < 0) s.attack = 0;	
			safeOutlet(0, "attack",s.index,1./s.attack);
			if (!dumping) {
				step.updateAttacks(s);
				notifyclients();
			}
		}
	}	

step.setDecay = function (s,v) {	
		if (s.decay != v) {	
			s.decay = v;		
			if (s.decay < 0) s.decay = 0;	
			safeOutlet(0, "decay", s.index, 1./s.decay);
			if (!dumping) {
				step.updateDecays(s);
				notifyclients();
			}
		}
	}

step.setCurve = function (s,v) {
		if (s.curve != v) {		
			s.curve = v;		
			if (s.curve < 0) s.curve = 0;	
			safeOutlet(0, "curve", s.index, s.curve);
			if (!dumping) {
				step.updateCurves(s);
				notifyclients();
			}
		}
	}	

step.setPitch = function (s,v) {	
		if (s.pitch != v) {	
			s.pitch = v;		
			safeOutlet(0, "pitch", s.index, s.pitch);
			if (!dumping) {
				step.updatePitch(s);
				notifyclients();
			}
		}
	}
	
step.updateAttacks = function (s) {
		if ((s.hasLeftSlice)&&(!s.init)) 
			slice.recalcAttacks(s.leftSlice);
	}

step.updateDecays = function (s) {
		if ((s.hasRightSlice)&&(!s.init)) 
			slice.recalcDecays(s.rightSlice);
	}

step.updateCurves = function (s) {
		if ((s.hasLeftSlice)&&(!s.init))
			slice.recalcCurves(s.leftSlice);
	}

step.updatePitch = function (s) {
		if (!s.init) {
			if (s.hasLeftSlice)
				slice.recalcCurves(s.leftSlice);
			if (s.hasRightSlice)
				slice.recalcCurves(s.rightSlice);
		}
	}


function slice(prevstep, nextstep) {
	this.prevstep = prevstep;
	this.nextstep = nextstep;
	this.xLeft = prevstep.x;
	if (nextstep.x == XMIN)
		this.xRight = XMAX;
	else
		this.xRight = nextstep.x;
	this.attacks = new Array();
	this.decays = new Array();
	this.curves = new Array();
	this.threeD = new Array();
	this.ampMouseIdx = new Array();	
	this.pitchMouseIdx = new Array();
	slice.setMouseIdxs(this);	
}

// apparently JS 1.6 requires one to define function object 
// properties outside of the function itself if they are going
// to be used in the outside scope.
slice.setMouseIdxs = function (v) {
		mouseWidth = v.xRight-v.xLeft;		
		v.ampMouseIdx[0] = v.xLeft+mouseWidth/8;
		v.ampMouseIdx[1] = (v.xLeft+v.xRight)/2;	
		v.ampMouseIdx[2] = v.xRight-mouseWidth/8;
		v.pitchMouseIdx[0] = v.xLeft+mouseWidth/4;
		v.pitchMouseIdx[1] = v.xRight-mouseWidth/4;
	}	
	
slice.createSlice = function (prevs, nexts) {
		s = new slice(prevs, nexts);
		prevs.rightSlice = s;
		prevs.hasRightSlice = true;
		nexts.leftSlice = s;
		nexts.hasLeftSlice = true;
		slice.recalcAttacksDecaysAndCurves(s);
		return s;
	}
	
slice.redraw = function (s) {
		goDraw(s);
		if ((s.nextstep.hasRightSlice)&&(pointreset==0)) {
			goDraw(s.nextstep.rightSlice);
		}
		if ((s.prevstep.hasLeftSlice)&&(pointreset==0)) {
			goDraw(s.prevstep.leftSlice);
		}
	}
	
slice.recalcAttacks	= function (s) {
		slice.doRecalcAttacks(s);
		slice.doRecalcThreeD(s);
		slice.redraw(s);
	}

slice.recalcDecays = function (s) {
		slice.doRecalcDecays(s);
		slice.doRecalcThreeD(s);
		slice.redraw(s);
	}

slice.recalcCurves = function (s) {
		slice.doRecalcCurves(s);
		slice.doRecalcThreeD(s);
		slice.redraw(s);
	}
		
slice.recalcAttacksDecaysAndCurves = function (s) {
		slice.doRecalcAttacks(s);
		slice.doRecalcDecays(s);
		slice.doRecalcCurves(s);
		slice.doRecalcThreeD(s);
		slice.redraw(s);
	}

slice.doRecalcAttacks = function (s) {	
		var w = s.xRight - s.xLeft;	
		var o = s.xLeft;	
		var h = s.nextstep.amp;	
		var a = s.nextstep.attack;		
		s.attackStart = [o,0,0];
		for (ii=1;ii<=points;ii++) {		
			var x = w*ii/points+o;		
			var y = slice.attackVal(h, ii/points, a);
			var z = 0;
			s.attacks[ii-1] = [x,y,z];
		}
	}

slice.doRecalcDecays = function (s) {
		var w = s.xRight - s.xLeft;	
		var o = s.xLeft;	
		var h = s.prevstep.amp;	
		var d = s.prevstep.decay;	
		s.decayStart = [o, h, 0];
		var ii=1;
		for (ii=1;ii<=points;ii++) {		
			var x = w*ii/points+o;
			var y = slice.decayVal(h, ii/points, d);
			var z = 0;
			s.decays[ii-1] = [x,y,z];
		}
	}

slice.doRecalcCurves = function (s) {	
		var xw = s.xRight - s.xLeft;
		var xo = s.xLeft;
		var zpl = s.prevstep.pitch;
		var zpr = s.nextstep.pitch;
		var c = s.nextstep.curve;
		s.curveStart = [xo, 0, slice.scalez(zpl)];
		var ii=1;
		for (ii=1;ii<=points;ii++) {
			var x = xw*ii/points+xo;
			var y = 0;
			var z = slice.scalez(slice.pitchVal(ii/points,zpl,zpr,c));
			s.curves[ii-1] = [x,y,z];
		}
	}

slice.doRecalcThreeD = function (s) {
		s.threeDStart = [s.xLeft, s.decayStart[1], s.curveStart[2]];
		for (ii=0;ii<points;ii++) {
			s.threeD[ii] = [s.decays[ii][0],
									 s.decays[ii][1]+s.attacks[ii][1],
									 s.curves[ii][2]
									 ];	
		}
	}

slice.attackVal = function (h,xpos,a) {
		return (h*(Math.pow((xpos),a)));
	}

slice.decayVal = function (h, xpos, d) {
		return (h*(Math.pow(1-(xpos),d)));
	}

slice.pitchVal = function (xpos, pitchl, pitchr, curve) {
		return pitchl+(pitchr-pitchl)*Math.pow(xpos, curve);
	}

slice.scalez = function (z) {
		return (ftom(z)-minNote)/(maxNote-minNote);
	}
	
slice.setAttackFromMouse = function (s, pixelx, pixely) {
		x = pixelx/boxWidth;	// 0<x<1
		y = (boxHeight-pixely)/boxHeight// 0<y<1
		v = slice.calcAttack(s, x, y);
		step.setAttack(s.nextstep, v);
		return v;
	}

slice.setDecayFromMouse = function (s, pixelx, pixely) {
		x = pixelx/boxWidth;	// 0<x<1
		y = (boxHeight-pixely)/boxHeight// 0<y<1
		v = slice.calcDecay(s, x, y);
		step.setDecay(s.prevstep, v);
		return v;
	}

slice.setAmpFromMouse = function (s, pixely) {
		v = (boxHeight-pixely)/boxHeight;	
		step.setAmp(s.prevstep, v);
		return v;
	}

slice.setPitchFromMouse = function (s, pixely) {
		thisnote = Math.round((maxNote-minNote)*(boxHeight-pixely)/boxHeight + minNote);
		v = mtof(thisnote);
		step.setPitch(s.prevstep, v);
		return v;
	}

slice.setCurveFromMouse = function (s, pixelx, pixely) {
		//make range x 0:1
		//make range y 0:1		
		x = pixelx/boxWidth;	
		y = (boxHeight-pixely)/boxHeight;	
		v = slice.calcCurve(s, x, y);
		step.setCurve(s.nextstep, v);
		return v;
	}

slice.setStartFromMouse	= function (s,pixelx,pixely) {
		x=pixelx/boxWidth;
		step.setStart(s.prevstep, x);
		//return currentLengthArray();
	}

slice.calcDecay = function (s, x, y) {	
		if (s.prevstep.amp !=0)	{
			x = slice.posInSlice(s,x);	
			x = clip(x, 0.0001, 0.999);
			y = clip(y/s.prevstep.amp, 0.0001, 0.999);
			v = Math.log(y)/Math.log(1-x);
		} else 
			v = s.prevstep.decay;
		return v;
	}

slice.calcAttack = function (s, x, y) {	
		if (s.nextstep.amp !=0)	{
			x = slice.posInSlice(s,x);
			x = clip(x, 0.0001, 0.999);
			y = clip(y/s.nextstep.amp, 0.0001, 0.999);	
			v = Math.log(y)/Math.log(x);
		} else 
			v = s.nextstep.attack;
		return v;
	}

slice.calcCurve	= function (s,x,y) {
		x = slice.posInSlice(s,x);
		x = clip(x, 0.0001, 0.999);
		y = slice.posInCurve(s,y);
		y = clip(y, 0.0001, 0.999);	
		if (s.nextstep.pitch > s.prevstep.pitch)
			v = Math.log(y)/Math.log(x);
		else v = Math.log(1-y)/Math.log(x);
		return v;
	}

slice.posInSlice = function (s, x) {
		if (x < s.xLeft) return 0;
		if (x > s.xRight) return 1;		
		return (x - s.xLeft)/(s.xRight-s.xLeft);	
	}
	
slice.posInCurve = function (s, y) {
		bigpitch = ftom(s.prevstep.pitch);
		smallpitch = ftom(s.nextstep.pitch);
		if (smallpitch > bigpitch) {
			temp = smallpitch;
			smallpitch = bigpitch;
			bigpitch = temp;
		}
		y = y*(maxNote-minNote)+minNote;
		if (y>bigpitch) return 1.;
		else if (y<smallpitch) return 0.;
		else 
			return (y-smallpitch)/(bigpitch-smallpitch);
	}



//////////////////////////////////
/// INPUT
////////////////////


function onidle(x,y,but,cmd,shift,capslock,option,ctrl) {
	determineWhere(x,y,but,cmd,shift,capslock,option,ctrl);
	setDisplayHelper();
}

function onidleout(x,y,but,cmd,shift,capslock,option,ctrl) {
	helperIsActive=false;
	overlay();
}

function onclick(x,y,but,cmd,shift,capslock,option,ctrl){
	determineWhere(x,y,but,cmd,shift,capslock,option,ctrl);
	mousin(x,y);
} 
function ondrag(x,y,but,cmd,shift,capslock,option,ctrl){
	x=clip(x,0,boxWidth);
	y=clip(y,0,boxHeight);
	mousin(x,y);
}
function ondblclick(x,y,but,cmd,shift,capslock,option,ctrl) {
}

function onresize(w,h){	
	boxWidth = w;	
	boxHeight = h;	
	aspectratio = w/h;	
	rendersketch = new Sketch(boxWidth,boxHeight);
	with (rendersketch) {
		default2d();
		fsaa=0;
		glenable(sketch.blend);
		glblendfunc(sketch.src_alpha, sketch.one);
		glenable("line_smooth");  
		glscale(aspectratio*2, 2.0, 1.0);
		gltranslate(-0.5, -0.5, 0.0);
	}
	with (sketch) {
		default2d();
		strokeparam("slices",1);
		strokeparam("order",1);
		fsaa = 0;
		glenable(sketch.blend);
		glblendfunc(sketch.src_alpha, sketch.one);
		glenable("line_smooth");  
		glscale(aspectratio*2, 2.0, 1.0);
		gltranslate(-0.5, -0.5, 0.0);
	}
	if (!initializing) 
		draw();	
}

var curveInFront = false;
function determineWhere(x,y,but,cmd,shift,capslock,option,ctrl) {
	if (shift) 
		findwhereShift(x,y);
	else if (option) {
		findwherePitch(x,y);
		curveInFront = true;
	}
	else {
		findwhereAmp(x,y);
		curveInFront = false;
	}
}

const NADA = -1;
const DECAY=0;
const AMPLITUDE =1;
const ATTACK=2;
const PITCH=3;
const CURVE=4;
const SHIFT=5;

function findwhereAmp(pixelx,pixely) {
	//set range x 0:1 	
	//set range y 0:1	
	xval = pixelx/boxWidth;	
	yval = (boxHeight-pixely)/boxHeight;	
	found = false;	
	chgIdx = 0;	
	while ((!found)&&(chgIdx<slices.length)) { 
		which = 0;
		while ((!found)&&(which<3)) {
			if (xval < slices[chgIdx].ampMouseIdx[which]) 
				found = true;
			else
				which++;
		}
		if (!found) 
			chgIdx++;
	}
	
	if (!found) { 	
		//assume it's in the very last section - amp of step 0
		chgIdx = 0;
		which = 0;
	}
	
	if (which == 0) 
		chgType = AMPLITUDE;
	else if (which == 1) {
		if (slices[chgIdx].prevstep.amp < yval)
			chgType = AMPLITUDE;
		else
			chgType = DECAY;
	}
	else if (which == 2) {
		if (slices[chgIdx].nextstep.amp < yval) {
			chgType = AMPLITUDE;	
			if (++chgIdx >= slices.length) chgIdx = 0;
		}
		else
			chgType = ATTACK;
	}
	return (chgIdx, chgType);
}

function findwherePitch(pixelx,pixely) {
	//set range x 0:1 	
	//set range y 0:1		
	xval = pixelx/boxWidth;	
	yval = (maxNote-minNote)*(boxHeight-pixely)/boxHeight+minNote;	
	found = false;	
	chgIdx = 0;	
	while ((!found)&&(chgIdx<slices.length)) { 
		which = 0;
		while ((!found)&&(which<2)) {
			if (xval < slices[chgIdx].pitchMouseIdx[which]) 
				found = true;
			else
				which++;
		}
		if (!found) 
			chgIdx++;
	}
	
	if (!found) { 
		//assume it's in the very last section - amp of step 0
		chgIdx = 0;
		which = 0;
	}
	
	bigpitch = ftom(slices[chgIdx].prevstep.pitch);
	smallpitch = ftom(slices[chgIdx].nextstep.pitch);
	if (smallpitch > bigpitch) {
		temp = smallpitch;
		smallpitch = bigpitch;
		bigpitch = temp;
	}
	
	if (which == 0) 
		chgType = PITCH;
	else if (which == 1) {
		if ((yval>bigpitch)||(yval<smallpitch)) {
			chgType = PITCH;
			if (xval > slices[chgIdx].ampMouseIdx[2]) 
				if (++chgIdx >= slices.length) chgIdx = 0;
		}
		else
			chgType = CURVE;
	}

	return (chgIdx, chgType);
}

function findwhereShift(pixelx,pixely) {
	//set range x 0:1 	
	xval = pixelx/boxWidth;	
	found = false;	
	chgIdx = 0;	
	while ((!found)&&(chgIdx<slices.length)) { 
		if (xval < slices[chgIdx].pitchMouseIdx[which]) 
			found = true;
		else
			chgIdx++;
	}
	if ((!found)||(chgIdx==0)) 
		chgType = NADA;
	else 
		chgType = SHIFT;
	return (chgIdx, chgType);
}

function mousin(pixelx,pixely) {
	if (chgType==ATTACK) {
		v = slice.setAttackFromMouse(slices[chgIdx],pixelx,pixely);	
	} else if (chgType == DECAY) {
		v = slice.setDecayFromMouse(slices[chgIdx],pixelx,pixely);
	} else if (chgType == AMPLITUDE) {
		v = slice.setAmpFromMouse(slices[chgIdx],pixely);
	} else if (chgType == PITCH) {
		v = slice.setPitchFromMouse(slices[chgIdx],pixely);
	} else if (chgType == CURVE) {
		v = slice.setCurveFromMouse(slices[chgIdx],pixelx,pixely);
	} else if (chgType == SHIFT) {
		slice.setStartFromMouse(slices[chgIdx],pixelx,pixely);
	}
	overlay();
}

onclick.local = 1;
ondrag.local = 1; 
ondblclick.local = 1; 
onresize.local = 1;
findwhereAmp.local = 1;
findwherePitch.local = 1;
mousin.local = 1;

var minNote = 36;
var maxNote = 80;
function noterange(min,max) {
	if ((max>min)&&(min > 0)) {
		minNote = min;
		maxNote = max;
		var i = 0;
		for (i=0;i<slices.length;i++) 
			slice.recalcCurves(slices[i]);
		draw();
	}
}



function pitch(sn,v)
{
	if ((sn < 0)||(sn >= steps.length))
	{
		post("technoui: invalid step number");post();
		return;
	}
	step.setPitch(steps[sn], v);
	draw();
}

function curve(sn,v)
{
	if ((sn < 0)||(sn >= steps.length))
	{
		post("technoui: invalid step number");post();
		return;
	}
	step.setCurve(steps[sn], v);
	draw();
}

function amplitude(sn,p)
{
	if ((sn < 0)||(sn >= steps.length))
	{
		post("technoui: invalid step number");post();
		return;
	}
	step.setAmp(steps[sn], p);
	draw();
}

function attack(sn,p)
{
	if ((sn < 0)||(sn >= steps.length))
	{
		post("technoui: invalid step number");post();
		return;
	}
	step.setAttack(steps[sn], p);
	draw();
}

function decay(sn,p)
{
	if ((sn < 0)||(sn >= steps.length))
	{
		post("technoui: invalid step number"); post();
		return;
	}
	step.setDecay(steps[sn], p);
	draw();
}

function pos(sn,p)
{
	if ((sn < 0)||(sn >= steps.length))
	{
		post("technoui: invalid step number"); post();
		return;
	}
	step.setStart(steps[sn], p);
	draw();
}

function repeatpos() {
	var i;
	var test = 0;
	var argArray = new Array();
	for (i=0; i<arguments.length; i++) {
		if (((arguments[i] >= 1.0)||(arguments[i] <= 0.0))||(arguments[i] <= test)) {
			post("technoui: repeatpos msg requires increasing arguments between 0.0 and 1.0, not inclusive");
			post();
			return;
		}
		test = arguments[i];
		argArray[i] = arguments[i];
	}
	var repeats = (steps.length/(arguments.length+1)).toFixed(0);
	
	if ( steps.length/(arguments.length+1) != repeats ) {
		post("technoui: number of arguments + 1 should be a divisor of the sequence's total length.");
		post();
		return;
	}
	
	safeOutlet(0, "repeatpos", argArray);
	var current = 0;
	var unitlength = 1.0 / repeats;
	var unitstart = 0.;
	dump(1);
	for (i=0; i<steps.length; i++) {
		step.setStart(steps[i], unitstart + unitlength * ((current != 0)?(arguments[current-1]):(0.)));
		if (++current > arguments.length) {
			current = 0;
			unitstart += unitlength;
		}
	}
	dump(0);
}

function quantization() {
	if (arguments.length > 2) {
		if (arguments.length == steps.length) {
			dump(1);
			var i=1;
			for (i=1;i<steps.length;i++) {
				step.setStart(steps[i],arguments[i]);
			}
			dump(0);
		}
	} else if (arguments.length == 2) {
		var n = arguments[0];
		var v = arguments[1];
		if ((n < steps.length)&&(n>0))
			step.setStart(steps[n],v);
		draw();
	}
}

/////////////////////
//////////// DRAW
///////////////////////////////////////////////////////////
////////////////////////////////////
const XMAX = 1;
const XMIN = 0;

var fillShapes = 1;
var boxWidth = this.box.rect[2]-this.box.rect[0]; 
var boxHeight = this.box.rect[3]-this.box.rect[1];
var aspectratio = boxWidth/boxHeight; 

var rendersketch = new Sketch(boxWidth,boxHeight);
with (rendersketch) {
	default2d();
	strokeparam("slices",2);
	fsaa=0;
	glenable(sketch.blend);
	glblendfunc(sketch.src_alpha, sketch.one);
	glenable("line_smooth");  
	glclearcolor(colorBackground);
	glclear();
}

var helperIsActive = false;
var normalLineWidth = 0.002;
var helperLineWidth = 0.005;
var order = 1;
var segments = 1;

onresize(boxWidth, boxHeight);

var phasorVal = 0;
var lastWhere = 0;
function steppos(v) {
	var where = Math.floor(v);
	if (where < slices.length) {
		var inslice = v - where;
		var sliceLeft = slices[where].xLeft;
		var sliceWidth = slices[where].xRight - slices[where].xLeft;
		phasorVal = sliceLeft+inslice*sliceWidth;
		overlay();
	}
	lastWhere = where;
}


function overlay() {
	if (shouldDraw() == 1)
	{
		with (sketch) 
		{
			glcolor(0,0,0,1);
			copypixels(rendersketch,0,0,0,0,boxWidth,boxHeight);
		}
		drawPhasor();
		drawHelper();
		refresh();
	}
}

function drawPhasor() {
	with (sketch) {
		glcolor(colorPhasor);
		moveto(phasorVal,0);
		lineto(phasorVal,1);
	}
}

function fill(f) {
	fillShapes = f;
	draw();
}

var points = 6;
var pointreset = 0;
function numpoints(n) {
	if (n > 2) {
		points = n;
		var i = 0;
		pointreset = 1;
		for (i=0;i<slices.length;i++)
			slice.recalcAttacksDecaysAndCurves(slices[i]);
		pointreset = 0;
		overlay();
	}
}

function draw() {
	doDraw(0, slices.length-1);
}

function drawn(n) {
	doDraw(n,n);
}

function doDraw(firstid, lastid) {	
	var id;
	for (id=firstid;id<=lastid;id++) {
		goDraw(slices[id]);
	}	
	overlay();
}

function goDraw(s) {	
	if (shouldDraw() == 1) 
	{
		//drawVerticalLines(s);
		drawBackground(s);
		if (!curveInFront) {
			drawCurve(s, rendersketch, colorCurveOutline, normalLineWidth);
			drawCurveQuads(s);
			drawAmpEnv(s, rendersketch, colorAmpEnvOutline,normalLineWidth);
			drawAmpEnvQuads(s);
		} else {
			drawAmpEnv(s, rendersketch, colorAmpEnvOutline,normalLineWidth);
			drawAmpEnvQuads(s);	
			drawCurve(s, rendersketch, colorCurveOutline,normalLineWidth);
			drawCurveQuads(s);
		}
	}
}

function shouldDraw() 
{
	if ((initializing == 1) || (dumping == 1))
		return 0;
	else
		return 1;
}
shouldDraw.local = 1;

function shouldOutlet()
{
	if (initializing == 1)
		return 0;
	else
		return 1;
}
shouldOutlet.local = 1;

function safeOutlet()
{
	if (shouldOutlet() == 1)
	{
		switch (arguments.length)
		{
		case 0: 
		case 1:
			break;
		case 2: outlet(arguments[0], arguments[1]); 
			break;
		case 3: outlet(arguments[0], arguments[1], arguments[2]);
			break;
		case 4: outlet(arguments[0], arguments[1], arguments[2], arguments[3]);
			break;
		}
	}
}
safeOutlet.local = 1;

function drawBackground(s) {
	with (rendersketch) {
		glcolor(colorBackground);
		quad(   s.xLeft, 0, 0,
				s.xLeft,1,0,
				s.xRight,1,0,
				s.xRight,0,0);
	}
}

function drawVerticalLines(s) {	
	with (rendersketch) {
		for (k=0;k<3;k++) {			
			moveto(s.ampMouseIdx[k], 0, 0);			
			lineto(s.ampMouseIdx[k], 1, 0);		
		}
	}
}

function drawCurve(s, sk, color, linewidth) {
	with (sk) {
		beginstroke("basic2d");
		strokeparam("slices",segments);
		strokeparam("order",order);
		strokeparam("color",color);	
		strokeparam("scale",linewidth);
		strokepoint(s.curveStart[0],s.curveStart[2]);
		lastpoint = s.curveStart;
		for (j=0;j<points;j++) 
			strokepoint(s.curves[j][0], s.curves[j][2]);
		endstroke();
	}
}

function drawAttack(s, sk, color, linewidth) {
	with (sk) {
		beginstroke("basic2d");
		strokeparam("slices",segments);
		strokeparam("order",order);
		strokeparam("color", color);
		strokeparam("scale", linewidth);
		strokepoint(s.attackStart);
		for (j=0;j<points;j++) 
			strokepoint(s.attacks[j]);
		endstroke();
	}
}

function drawDecay(s, sk, color, linewidth) {
	with (sk) {
		beginstroke("basic2d");
		strokeparam("slices",segments);
		strokeparam("order",order);
		strokeparam("color", color);
		strokepoint(s.decayStart);	
		strokeparam("scale",linewidth);
		for (j=0;j<points;j++) 
			strokepoint(s.decays[j]);	
		endstroke();
	}
} 

function drawAmpEnv(s, sk, color, linewidth) {	
	with (sk) {
		beginstroke("basic2d");
		strokeparam("slices",segments);
		strokeparam("order",order);
		strokeparam("color",color);
		strokeparam("scale",linewidth);
		strokepoint(s.attackStart[0], s.attackStart[1]+s.decayStart[1]);
		for (j=0;j<points;j++) 
			strokepoint(s.attacks[j][0], s.attacks[j][1]+s.decays[j][1]);
		endstroke();
	}
}

function drawCurveQuads(s) {
	if (fillShapes!=0) {
		with (rendersketch) {
			glcolor(colorCurveEnv);
			moveto(s.curveStart[0], s.curveStart[2]);
			lastpoint = s.curveStart;
			for (i=0;i<points;i++) {
				quad(lastpoint[0], lastpoint[2], 0,
					s.curves[i][0], s.curves[i][2], 0, 
					s.curves[i][0], 0, 0, 
					lastpoint[0], 0, 0);
				lastpoint = s.curves[i];
			}
		}
	}
}

function drawAmpEnvQuads(s) {
	if (fillShapes!=0) {
		with (rendersketch) {
			glcolor(colorAmpEnv);	
			lastpoint = [s.attackStart[0], s.attackStart[1]+s.decayStart[1]];
			for (i=0;i<points;i++) {
				quad(lastpoint[0], lastpoint[1], 0, 
					s.attacks[i][0], s.attacks[i][1]+s.decays[i][1], 0,
					s.attacks[i][0], 0, 0,
					lastpoint[0], 0, 0);
			lastpoint = [s.attacks[i][0], s.attacks[i][1]+s.decays[i][1]];
			}
		}
	}
}

var oldChgIdx = -1;
var oldChgType = NADA;
var oldCurveInFront = 0;
function setDisplayHelper() {
	helperIsActive = true;
	if (curveInFront != oldCurveInFront) {
		draw();
		oldCurveInFront = curveInFront;
	}
	if ((oldChgIdx != chgIdx)||(oldChgType != chgType)) {
		oldChgIdx = chgIdx;
		oldChgType = chgType;
		overlay();
	}
}
var textX = 0.01;
var textY = 0.97;
function displayText(str) {
	with (sketch) {
		fontsize(10);
		glcolor(1,1,1,0.5);
		moveto(textX,textY);
		textalign("left","top");
		text(str);
	}
}

function drawHelper() {
	if (helperIsActive == true) {
		with (sketch) {
			glcolor(colorHelper);
			s = slices[chgIdx];
			p = slices[(chgIdx==0)?(slices.length-1):(chgIdx-1)];
			if (chgType == ATTACK) {
				drawAttack(s, sketch, colorHelper, helperLineWidth);
				var idx = (chgIdx==slices.length-1)?(0):(chgIdx+1);
				displayText("attack "+idx+": "+ (1/s.nextstep.attack).toFixed(3));
			} else if (chgType == DECAY) {
				drawDecay(s, sketch, colorHelper, helperLineWidth);
				displayText("decay "+chgIdx+": "+(1/s.prevstep.decay).toFixed(3));
			} else if (chgType == AMPLITUDE) {
				drawAttack(p, sketch, colorHelper, helperLineWidth);
				drawDecay(s, sketch, colorHelper, helperLineWidth);
				displayText("amplitude "+chgIdx+": "+s.prevstep.amp.toFixed(3));
			} else if (chgType == PITCH) {
					beginstroke("basic2d");
					strokeparam("color",colorHelper);
					var vertpos = slice.scalez(steps[chgIdx].pitch);
					strokepoint(0,vertpos);
					strokepoint(1,vertpos);
					endstroke();
					var midinote = ftom(s.prevstep.pitch);
					displayText("pitch "+chgIdx+": "
										+s.prevstep.pitch.toFixed(3)
										+" Hz (midi "
										+midinote.toFixed(0)
										+")");
			} else if (chgType == SHIFT) {
				beginstroke("basic2d");
				strokeparam("color",colorHelper);
				strokepoint(s.prevstep.x+0.003, 1);
				strokepoint(s.prevstep.x+0.003, 0);
				endstroke();
				if (chgIdx==0) {
					beginstroke("basic2d");
					strokeparam("color",colorHelper);
					strokepoint(XMAX-0.003, 1);
					strokepoint(XMAX-0.003, 0);
					endstroke();
				}
				displayText("position "+chgIdx+": "+s.prevstep.x.toFixed(3));
			} else if (chgType == CURVE) {
				drawCurve(s, sketch, colorHelper, helperLineWidth);
				displayText("portomento curve "+chgIdx+": "+s.nextstep.curve.toFixed(3));
			}
		}
	}
}


var colorBackground = [86/255,52/255,0,1.];
var colorAttackOutline = [0,154/255,99/255,1.];
var colorDecayOutline = [0,154/255,99/255,1.];
var colorAmpEnvOutline = [1,253/255,102/255,1.0];
var colorAmpEnv = [238/255,212/255,0,0.5];
var colorCurveEnv = [0, 0/255, 0/255, 0.45];
var colorCurveOutline = [186/255, 239/255, 255/255, 1.0];
var colorHelper = [255/255,159/255,34/255,0.55];
var colorPhasor = [1,1,1,1];
function color(which, r,g,b,a) {
	switch (which) {
		case "background": colorBackground = [r/255,g/255,b/255,a]; break;
		case "attackoutline": colorAttackOutline = [r/255,g/255,b/255,a]; break;
		case "decayoutline": colorDecayOutline = [r/255,g/255,b/255,a]; break;
		case "ampenvoutline": colorAmpEnvOutline = [r/255,g/255,b/255,a]; break;
		case "ampenv": colorAmpEnv = [r/255,g/255,b/255,a]; break;
		case "curveenv": colorCurveEnv = [r/255,g/255,b/255,a]; break;
		case "curveoutline": colorCurveOutline = [r/255,g/255,b/255,a]; break;
		case "helper": colorHelper = [r/255,g/255,b/255,a]; break;
		case "phasor": colorPhasor = [r/255,g/255,b/255,a]; break;
	}
	notifyclients();
	draw();
}

function clip(v,l,h) {
	if (v<l) v=l;
	else if (v>h) v=h;
	return v;
}

function mtof(f) {
	return (440. * Math.exp(.057762265 * (f - 69.)));
}

function ftom(f) {
	if (f>0)
		return (69.0+(1.0/0.057762265)*Math.log(f/440.0));
	else return 0;
}

function currentLengthArray() {
	a = new Array();
	for (i=1;i<steps.length;i++) 
		a[i-1] = steps[i].x;
	return a;
}

function setvalueof()
{
	var i = 0;
	var argIdx = 0;
	var technouiVersion = arguments[argIdx++];
	if (technouiVersion == 1.0) {
		var sequenceLength = arguments[argIdx++];
		if ((arguments.length-2)/6 >= sequenceLength) 
		{
			dump(1);
			length(sequenceLength);
			for (i=0;i<sequenceLength;i++) {
				var att = arguments[argIdx++];
				var dec = arguments[argIdx++];
				var amp = arguments[argIdx++];
				var pit = arguments[argIdx++];
				var cur = arguments[argIdx++];
				var x = arguments[argIdx++];
				note(i, att, dec, amp, pit, cur, x, 0); 
			}
			dump(0);
		}
	} else if (technouiVersion == 2.0) {
		fillShapes = arguments[argIdx++];
		colorBackground = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorAttackOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorDecayOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorAmpEnvOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorAmpEnv = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorCurveEnv = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorCurveOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorHelper = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorPhasor = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		
		var sequenceLength = arguments[argIdx++];
		if ((arguments.length-argIdx)/6 >= sequenceLength) 
		{
			dump(1);
			length(sequenceLength);
			for (i=0;i<sequenceLength;i++) {
				var att = arguments[argIdx++];
				var dec = arguments[argIdx++];
				var amp = arguments[argIdx++];
				var pit = arguments[argIdx++];
				var cur = arguments[argIdx++];
				var x = arguments[argIdx++];
				note(i, att, dec, amp, pit, cur, x, 0); 
			}
			dump(0);
		}
	} else if (technouiVersion == 3.0) {
		points = arguments[argIdx++];
		fillShapes = arguments[argIdx++];
		colorBackground = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorAttackOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorDecayOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorAmpEnvOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorAmpEnv = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorCurveEnv = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorCurveOutline = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorHelper = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		colorPhasor = [arguments[argIdx], arguments[argIdx+1],
							arguments[argIdx+2], arguments[argIdx+3]];
		argIdx += 4;
		
		var sequenceLength = arguments[argIdx++];
		var posArray = new Array();
		if ((arguments.length-argIdx)/6 >= sequenceLength) 
		{
			dump(1);
			length(sequenceLength);
			for (i=0;i<sequenceLength;i++) {
				step.setAttack(steps[i], arguments[argIdx++]);
				step.setDecay(steps[i], arguments[argIdx++]);
				step.setAmp(steps[i], arguments[argIdx++]);
				step.setPitch(steps[i], arguments[argIdx++]);
				step.setCurve(steps[i], arguments[argIdx++]);
				step.setStart(steps[i], arguments[argIdx++]);
				if (i!=0)
					posArray[i-1] = arguments[argIdx - 1];
			}			
			dump(0);
			safeOutlet(0, "repeatpos", posArray);
		}
	}

}

function getvalueof()
{
	var i;
	var data = new Array();
	var dataIdx = 0;
	//versioning to allow for future changes
	data[dataIdx++] = TECHNOUIVERSION;
	data[dataIdx++] = points;
	data[dataIdx++] = fillShapes;
	data[dataIdx++] = colorBackground[0];	
	data[dataIdx++] = colorBackground[1];	
	data[dataIdx++] = colorBackground[2];	
	data[dataIdx++] = colorBackground[3];
	data[dataIdx++] = colorAttackOutline[0];
	data[dataIdx++] = colorAttackOutline[1];
	data[dataIdx++] = colorAttackOutline[2];
	data[dataIdx++] = colorAttackOutline[3];	
	data[dataIdx++] = colorDecayOutline[0];	
	data[dataIdx++] = colorDecayOutline[1];	
	data[dataIdx++] = colorDecayOutline[2];	
	data[dataIdx++] = colorDecayOutline[3];	
	data[dataIdx++] = colorAmpEnvOutline[0];
	data[dataIdx++] = colorAmpEnvOutline[1];
	data[dataIdx++] = colorAmpEnvOutline[2];
	data[dataIdx++] = colorAmpEnvOutline[3];	
	data[dataIdx++] = colorAmpEnv[0];	
	data[dataIdx++] = colorAmpEnv[1];	
	data[dataIdx++] = colorAmpEnv[2];	
	data[dataIdx++] = colorAmpEnv[3];	
	data[dataIdx++] = colorCurveEnv[0];	
	data[dataIdx++] = colorCurveEnv[1];	
	data[dataIdx++] = colorCurveEnv[2];	
	data[dataIdx++] = colorCurveEnv[3];	
	data[dataIdx++] = colorCurveOutline[0];	
	data[dataIdx++] = colorCurveOutline[1];	
	data[dataIdx++] = colorCurveOutline[2];	
	data[dataIdx++] = colorCurveOutline[3];	
	data[dataIdx++] = colorHelper[0];	
	data[dataIdx++] = colorHelper[1];	
	data[dataIdx++] = colorHelper[2];	
	data[dataIdx++] = colorHelper[3];	
	data[dataIdx++] = colorPhasor[0];	
	data[dataIdx++] = colorPhasor[0];	
	data[dataIdx++] = colorPhasor[0];	
	data[dataIdx++] = colorPhasor[0];	
	
	data[dataIdx++] = steps.length;
	for (i=0;i<steps.length;i++) {
		data[dataIdx++] = steps[i].attack;
		data[dataIdx++] = steps[i].decay;
		data[dataIdx++] = steps[i].amp;
		data[dataIdx++] = steps[i].pitch;
		data[dataIdx++] = steps[i].curve;
		data[dataIdx++] = steps[i].x;
	}
	return data;
}


var dumping = 0;
function dump(i) 
{
	dumping = i;
	if (i==0) {
		var c=0;
		for (c=0;c<slices.length;c++)
			slice.recalcAttacksDecaysAndCurves(slices[c]);
		draw();
	}
}

function length(v) 
{
	safeOutlet(0, "length", v);	
	if (v != steps.length) {
		createSteps(v);	
	} 
	draw();
}

var slices = new Array();
var steps = new Array();
function createSteps(newlength) 
{
	var oldlength = steps.length;
	if ((oldlength != newlength)&&(newlength > 0)) {
		var overlap = (newlength>oldlength)?(oldlength):(newlength);
		var timingratio;
		if (oldlength > newlength)
			timingratio = 1./steps[newlength].x;
		else
			timingratio = oldlength/newlength;
		var i;
		var newsteps = new Array();
		var newslices = new Array();
		for (i=0;i<newlength;i++) {
			if (i<overlap) {
				newsteps[i] = steps[i];
				newsteps[i].hasLeftSlice = false;
				newsteps[i].hasRightSlice = false;
				step.setStart(newsteps[i], newsteps[i].x * timingratio);
			} else {
				if (oldlength>0) {
					var xpos = newsteps[i-overlap].x + timingratio;
					if (xpos >= 1)
						xpos = (newsteps[i-1].x + 1.)/2.;
					newsteps[i] = new step(xpos,
										newsteps[i-overlap].attack,
										newsteps[i-overlap].decay,
										newsteps[i-overlap].amp,
										newsteps[i-overlap].pitch,
										newsteps[i-overlap].curve,
										i);
				} else {
					newsteps[i] = new step(i/newlength, 1, 1, 0, 0, 1, i);
				}
			}
			if (i>0) 			
				newslices[i-1] = slice.createSlice(newsteps[i-1], newsteps[i]);
			if (i==newlength-1) 
				newslices[i] = slice.createSlice(newsteps[i], newsteps[0]);
		}
		steps = newsteps;
		slices = newslices;
	}
}
createSteps.local = 1;

function note(i, att, dec, amp, pit, cur, start, end) 
{
	steps[i] = new step(start, att, dec, amp, pit, cur, i);
	if (i>0) 
		slices[i-1] = slice.createSlice(steps[i-1], steps[i]);
	if (i==steps.length-1) 
		slices[i] = slice.createSlice(steps[i], steps[0]);	
	draw();
}


createSteps(1); //one step by default
initializing = false;
draw();
