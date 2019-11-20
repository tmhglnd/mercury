var m = mgraphics;
m.init();
m.autofill = 0;
m.relative_coords = 0;

var icon_margin = 3;
var selected_icon = -1;

function create_thumbnail_image(filename) {
	var image = new Image(filename);
	var w = image.size[0];
	var h = image.size[1];
	
	var bw = box.rect[2]-box.rect[0];
	bw -= icon_margin*2;
	
	var mg = new MGraphics(w, h);
	mg.image_surface_draw(image, 
		0, 0, w, h, 
		0, 0, w, h
	);
	return new Image(mg);
}

var shapes = new Array();
shapes[0] = "sphere";
shapes[1] = "torus";
shapes[2] = "cube";
shapes[3] = "opencylinder";
shapes[4] = "capsule";

var thumbnails = new Array();
thumbnails[0] = create_thumbnail_image("materials.browser.sphere.png");
thumbnails[1] = create_thumbnail_image("materials.browser.torus.png");
thumbnails[2] = create_thumbnail_image("materials.browser.cube.png");
thumbnails[3] = create_thumbnail_image("materials.browser.cylinder.png");
thumbnails[4] = create_thumbnail_image("materials.browser.capsule.png");

function paint() {
	var bw = box.rect[2]-box.rect[0];
	var bh = box.rect[3]-box.rect[1];
	
	with(m) {
		set_source_rgba(1.,1.,1.,0.);
		rectangle(0, 0, bw, bh);
		fill();


		for(var i=0; i < 5; i++) {
			rectangle(0, 0, bw, bw);

			var ptn = pattern_create_linear(0, 0, 0, bw);
			if(i == selected_icon) {
				ptn.add_color_stop_rgba(0, .29, .45, .71, 1.);
				ptn.add_color_stop_rgba(1, 0.37, 0.54, 0.80, 1);
			}
			else {
				ptn.add_color_stop_rgba(0, 0.75, 0.75, 0.75, 1);
				ptn.add_color_stop_rgba(1, 0.5, 0.5, 0.5, 1);
			}
			set_source(ptn);
			fill();

			if(thumbnails[i]) {
				var image = thumbnails[i];
				var iw = image.size[0];
				var wmargin = (bw-iw)*0.5;
				var ih = image.size[1];
				var hmargin = (bw-ih)*0.5-2;

				set_source_rgba(1., 1., 1., 1.);
				translate(wmargin, hmargin);
				image_surface_draw(image);
				translate(-wmargin, -hmargin);
			}

			translate(0, bw);
		}
	}
}

function onclick(x, y) {
	var bw = box.rect[2]-box.rect[0];
	var idx = Math.floor(y/bw);

	if(selected_icon != idx) {
		selected_icon = idx;
		refresh();
		outlet(0, "shape", shapes[idx]);
	}
}
onclick.local = 1;
