var m = mgraphics;
m.init();
m.relative_coords = 0;

autowatch = 1;

var _usepct = true;
var _total = 0;
var _pct = 0;
var _font = "Sans Serif";  // Geneva on Mac, Arial on PC
var _fontsize = 0.7; // relative to height
var _margin = 4;
var _show = false;
var _cancelled = false;
var _textcolor = [0, 0, 0, 1];
var _brgb = [0.91, 0.91, 0.91, 0];
var _barcolor = [0.19, 0.68, 0.92, 1];
var _cancelcolor = [1, 0.2, 0.2, 1];

function paint() {
	var width = box.rect[2] - box.rect[0]; 
	var height = box.rect[3] - box.rect[1]; 
	var aspect = width/height;

	with(m) {
		// erase background
		set_source_rgba(_brgb);
		rectangle(0, 0, width, height);
		fill();
	
		if(_cancelled) set_source_rgba(_cancelcolor);
		else if(_show) set_source_rgba(_textcolor);
		
		if(_cancelled || _show) {
			move_to(_margin, _margin);
			line_to(width-_margin, height-_margin);
			move_to(_margin, height-_margin);
			line_to(width-_margin, _margin);
			set_line_width(1.5);
			set_line_cap("round");
			stroke();
		}
	}
}

function onidle() {
	_show = true;
	m.redraw();
}

function onidleout() {
	_show = false;
	m.redraw();
}

function onclick() {
	if(!_cancelled) {
		_cancelled = true;
		notifyclients();	// to cancel transfer
		m.redraw();
	}
}
