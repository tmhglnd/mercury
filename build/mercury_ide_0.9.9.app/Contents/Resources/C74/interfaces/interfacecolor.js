/*
	returns colors from maxinterface.json

	Cycling '74 - ej
*/

const OUTLET_RGBA = 0;
const OUTLET_COLOR_LIST	= 1;

outlets = 2;
setoutletassist(OUTLET_RGBA, "colorname { RGBA }");
setoutletassist(OUTLET_COLOR_LIST, "color list in umenu format");

// if argument is provided set the name of the color we search
var color = jsarguments.length > 1 ? jsarguments[1] : undefined;

function loadbang()
{
	if (color)	//  there's no need to complain if js argument isn't set
		searchColor();
}

function bang()
{
	searchColor();
}

function anything()
{
	color = messagename;
	searchColor();
}

function getcolorlist()
{
}

function searchColor()
{
	if (color) {
		outlet(0, "oncolor", max.getcolor(color));
	}
}
