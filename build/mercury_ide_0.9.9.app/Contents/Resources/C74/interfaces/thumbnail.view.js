autowatch = 1;
outlets = 1;

var buttons = [];
var rgbaOn = [0., 0.7, 1., 1.0];
var pos = [0,0];
var m = mgraphics;
m.init();
m.autofill = 0;
m.relative_coords = 0;

var loaded_files = {}
var thumbnails = new Array();
var thumbnail_idx = -1;

// view measuremrents
var margin = [5, 6];
var padding = 3;

// thumbnail measurements
var aspect = 160/120;	// thumbnail aspect ratio (defined in jit.gl.material object)
var thumbnail_height = 58;
var thumbnail_size = [thumbnail_height*aspect, thumbnail_height];

// highlight measurements
var highlight_border = 3;
var highlight_size = [thumbnail_size[0]+highlight_border*2, 75];

// coordinate conversion
function indexToX(idx) {
	return margin[0] + padding + idx*(highlight_size[0]+2*padding);
}

function XToIndex(x) {
	return Math.max(0, Math.min(Math.floor(
		(x - (margin[0]+padding))/(highlight_size[0]+2*padding)
	), thumbnails.length-1));
}

function viewWidth() {
	return 2*margin[0] + padding + thumbnails.length*(highlight_size[0]+2*padding);
}

// thumbnail loading
var thumbnailStr = "thumbnail.png";
function is_thumbnail(filename) {
	return filename.length > 0 && 
		filename.substring(filename.length-thumbnailStr.length) == thumbnailStr;
}

function material_filename_from_thumbnail_filename(thumbnail_filename) {
	return thumbnail_filename.substring(0, thumbnail_filename.length-14)
}

function create_thumbnail_image(filename) {
	var image = new Image(filename);
	var w = image.size[0];
	var h = image.size[1];
	
	var mg = new MGraphics(w, h);
	mg.image_surface_draw(image, 
		0, 0, w, h, 
		0, 0, thumbnail_size[0], thumbnail_size[1]
	);
	return new Image(mg);
}

function add_thumbnail_from_file(folder, filename) {
	var image = create_thumbnail_image(folder.pathname+"/"+filename);
	if(image) {
		var patt = /.+jitmtl/
		var name = filename.match(patt)[0];
		name = name.substring(0, name.length-7);
		thumbnails.push({
			filename : filename,
			name : name,
			image : image,
		})
		loaded_files[filename] = true;
	}
}

function alphabetical_sort(a, b) {
	return a.name > b.name;
}

function update_thumbnails() {
	var nthumbnails = thumbnails.length;
	var material_folder = new Folder("C74:/media/jitter/materials");
	material_folder.typelist = ["PNG"];
	
	while(!material_folder.end) {
		var filename = material_folder.filename;
		if(!loaded_files[filename] && is_thumbnail(filename)) {
			add_thumbnail_from_file(material_folder, filename);
		}
		material_folder.next();
	}
	material_folder.close();
	
	if(nthumbnails != thumbnails.length) {
		box.size(viewWidth(), box.rect[3]-box.rect[1]);
		thumbnails.sort(alphabetical_sort);
		refresh();
	}
}

function load_material_thumbnails() {
	var material_folder = new Folder("C74:/media/jitter/materials");
	material_folder.typelist = ["PNG"];
	
	thumbnails = new Array();
	while(!material_folder.end) {
		var filename = material_folder.filename;
		if(is_thumbnail(filename)) {
			add_thumbnail_from_file(material_folder, filename);
		}
		material_folder.next();
	}
	material_folder.close();

	box.size(viewWidth(), box.rect[3]-box.rect[1]);
	thumbnails.sort(alphabetical_sort);
}
load_material_thumbnails();


var dirty = false;
function set_dirty(v) {
	dirty = (v == 1);
}
/*
function onidle(x, y) {
	//post(x + " " + y + "\n");
}
*/
function onclick(x, y) {
	var idx = XToIndex(x);
	if(idx != thumbnail_idx || dirty) {
		thumbnail_idx = idx;
		m.redraw();
		
		var filename = thumbnails[thumbnail_idx].filename;
		var mtl = material_filename_from_thumbnail_filename(filename);
		outlet(0, "import_material", mtl);
	}
}

function paint() {
	with(m) {
		set_source_rgba(1.,1.,1.,0.);
		paint();
		if(thumbnail_idx >= 0) {
			set_source_rgba(rgbaOn);
			var x = indexToX(thumbnail_idx);
			var y = margin[1];
			rectangle_rounded(
				x, y, 
				highlight_size[0], highlight_size[1], 
				12, 12, 12
			);
			fill();
		}
		draw_thumbnails();
		draw_titles();
	}
}

function draw_thumbnails() {
	m.set_source_rgba(1., 1., 1., 1.);
	for(var i=0; i < thumbnails.length; i++) {
		var x = indexToX(i)+highlight_border;
		var y = margin[1]+highlight_border;
		m.translate(x, y);
		m.image_surface_draw(thumbnails[i].image);
		m.translate(-x, -y);
	}
}

function draw_titles() {
	m.set_source_rgba(0., 0., 0., 1.);
	for(var i=0; i < thumbnails.length; i++) {
		m.select_font_face("Arial");
		m.set_font_size(10);
		
		var x = indexToX(i)+highlight_border;
		m.move_to(x, 76);
		var title = thumbnails[i].name;
		if(title.length > 12) {
			m.show_text(title.substring(0, 12) + "...");
		}
		else {
			m.show_text(title);
		}
	}
}
