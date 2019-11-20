autowatch = 1;
outlets = 2;

var buttons = [];
var rgbaOn = [0., 0.7, 1., 1.0];
var pos = [0,0];
var m = mgraphics;
m.init();
m.autofill = 0;
m.relative_coords = 0;

var current_texture = "Diffuse Map";
var matrix = new JitterObject("jit.matrix", 4, "char", 320, 240);
var thumbnail = null;
var offset = null;

var texture_method_array = new Array();
texture_method_array[0] = "diffuse_texture";
texture_method_array[1] = "specular_texture"; 
texture_method_array[2] = "ambient_texture";
texture_method_array[3] = "emission_texture"; 
texture_method_array[4] = "normals_texture";
texture_method_array[5] = "environment_texture"; 
texture_method_array[6] = "environment_texture";

var texture_methods = {
	"Diffuse Map" : "diffuse_texture", 
	"Specular Map" : "specular_texture", 
	"Ambient Map" : "ambient_texture", 
	"Emission Map" : "emission_texture", 
	"Normals" : "normals_texture", 
	"Environment Map" : "environment_texture", 
	"Cube Map" : "environment_texture",
}

var texture_names = {
	"Diffuse Map" : "diffuse", 
	"Specular Map" : "specular", 
	"Ambient Map" : "ambient", 
	"Emission Map" : "emission", 
	"Normals" : "normals", 
	"Environment Map" : "environment", 
	"Cube Map" : "environment",
}

function texture(name) {
	current_texture = name;
	outlet(0, "get_texture_data", texture_names[current_texture]);
}

function rebuild() {
	texture(current_texture);
}

function import_material() {
	texture(current_texture);
}

function thumbnail_size(size) {
	var w = size[0];
	var h = size[1];
	var bw = box.rect[2]-box.rect[0];
	var bh = box.rect[3]-box.rect[1];
	
	var scale = bw/w;
	var ww = bw;
	var hh = h*scale;

	if(hh > bh) {
		scale = bh/h;
		ww = w*scale;
		hh = bh;
	}
	return [ww, hh];
}

function thumbnail_offset(tsize) {
	var bw = box.rect[2]-box.rect[0];
	var bh = box.rect[3]-box.rect[1];
	
	if(tsize[0] == bw) {
		return [0, 0.5*(bh-tsize[1])];
	}
	else {
		return [0.5*(bw-tsize[0]), 0];
	}
}

function thumbnail_from_image(image) {
	var w = image.size[0];
	var h = image.size[1];
	var bw = box.rect[2]-box.rect[0];
	var bh = box.rect[3]-box.rect[1];
	
	var tsize = thumbnail_size(image.size);
	offset = thumbnail_offset(tsize);
	
	var mg = new MGraphics(tsize[0], tsize[1]);
	mg.image_surface_draw(image, 
		0, 0, w, h, 
		0, 0, tsize[0], tsize[1]
	);
	
	return new Image(mg);
}

function jit_matrix(name) {
	if(name) {
		var image = new Image();
		image.fromnamedmatrix(name);
		thumbnail = thumbnail_from_image(image);
	}
	else {
		thumbnail = null;
	}
	refresh();
}

function read(filename, type) {
	var image = new Image(filename);
	if(image) {
		thumbnail = thumbnail_from_image(image);
		refresh();
		
		matrix.adapt = 1;
		matrix.importmovie(filename);
		
		outlet(1, texture_methods[current_texture], matrix.name);
	}
}

function clear() {
	outlet(1, texture_methods[current_texture])
	thumbnail = null;
	refresh();
}

function clearall() {	
	for(var i=0; i < texture_method_array.length; i++) {
		outlet(1, texture_method_array[i]);
	}
	thumbnail = null;
	refresh();
}

function paint() {
	with(m) {
		set_source_rgba(1.,1.,1.,0.);
		paint();
		
		set_source_rgba(1., 1., 1., 1.);
		if(thumbnail) {
			m.translate(offset[0], offset[1]);
			m.image_surface_draw(thumbnail);
		}
		else {
			set_source_rgba(0.7, 0.7, 0.7, 1.);
			m.select_font_face("Arial");
			m.set_font_size(18);
			
			var text_size = m.text_measure("No Image");
			var w = box.rect[2]-box.rect[0];
			var h = box.rect[3]-box.rect[1];
			m.move_to((w-text_size[0])*0.5, (h-text_size[1])*0.5);
			m.show_text("No Image");
		}
	}
}