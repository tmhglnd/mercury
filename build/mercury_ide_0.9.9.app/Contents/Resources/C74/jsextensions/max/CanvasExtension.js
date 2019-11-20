/* 
    Canvas-Api for Max

	Copyright 2010 - Cycling '74
	Silvio C. Haedrich ein.selbst@gmail.com
*/

function MaxCanvas(jsui)
{
    if (!jsui || !(jsui instanceof js)) {
        post("missing or wrong argument for MaxCanvas, call \"new MaxCanvas(this);\"\n");
        return;
    }
    jsui.mgraphics.init();
    jsui.mgraphics.relative_coords = 0;
    jsui.mgraphics.autofill = 0;

    this.context = new CanvasRenderingContext2D(jsui);
    var that = this;

    jsui.onresize = function(w, h)
    {
        that.context.aspect = w/h;
        that.context.width  = w;
        that.context.height = h;
        if (jsui.onresizeCanvas)
            jsui.onresizeCanvas(w,h);
    }
    return this;
}

MaxCanvas.prototype.getContext = function(type)
{
    if (type == 'max-2d')
        return this.context;
        
    post("context-type not supported, use 'max-2d'");
}

function CanvasRenderingContext2D(maxCanvas)
{
    var r = maxCanvas.box.rect;
    this.mg = maxCanvas.mgraphics;
    
    this.width  = r[2]-r[0];
    this.height = r[3]-r[1];
    this.aspect = this.width / this.height; // do I need it?
    this.stateStack = [];
    this.fontlist   = [];
    
    // compositing
    this.globalAlpha = 1.0;
    //this.globalCompositeOperation = "source-over"; // not supported

    // colors and styles
    this.fillStyle      = "rgba(0,0,0,1.0)";
    this.strokeStyle    = "rgba(0,0,0,1.0)";
    
    // line caps/joins
    this.lineWidth  = 1;
    this.lineCap    = "butt";  // "butt", "round", "square"
    this.lineJoin   = "miter"; // "round", "bevel", "miter"
    //this.miterLimit = 10;    // not supported

    // shadows (problem with second shadow drawn over foreground (see opera demo))
    this.shadowOffsetX  = 0;
    this.shadowOffsetY  = 0;
    //this.shadowBlur     = 0;    // not supported
    this.shadowColor    = "rgba(0,0,0,1.0)"; // (default transparent black)

    // text
    this.font   = "10px Arial"; // no support for generic font families (e.g. sans-serif), use case-sensitive font-family name e.g. Verdana
    this.textAlign = "start";           // "start" == "left", "end" == "right", "center"
    this.textBaseline = "alphabetic";   // "top" == "hanging", "middle", "alphabetic", "bottom" == "ideographic"           

    // back-reference to the canvas
    maxCanvas.canvas = this;

    // state
    this.save = function ()
	{
        var currentState = [];
        currentState[0] = this.strokeStyle;
        currentState[1] = this.fillStyle;
        currentState[2] = this.globalAlpha;
        currentState[3] = this.lineWidth;
        currentState[4] = this.lineCap;
        currentState[5] = this.lineJoin;
//        currentState[6] = this.miterLimit;
        currentState[7] = this.shadowOffsetX;
        currentState[8] = this.shadowOffsetY;
//        currentState[9] = this.shadowBlur;
        currentState[10] = this.shadowColor;
//        currentState[11] = this.globalCompositeOperation;
        currentState[12] = this.font;
        currentState[13] = this.textAlign;
        currentState[14] = this.textBaseline;
        this.stateStack.push(currentState);
	    this.mg.save();
	}

    this.restore = function ()
	{
        var lastState = this.stateStack.pop();
        this.strokeStyle = lastState[0];
        this.fillStyle = lastState[1];
        this.globalAlpha = lastState[2];
        this.lineWidth = lastState[3];
        this.lineCap = lastState[4];
        this.lineJoin = lastState[5];
//        this.miterLimit = lastState[6];
        this.shadowOffsetX = lastState[7];
        this.shadowOffsetY = lastState[8];
//        this.shadowBlur = lastState[9];
        this.shadowColor = lastState[10];
//        this.globalCompositeOperation = lastState[11];
        this.font = lastState[12];
        this.textAlign = lastState[13];
        this.textBaseline = lastState[14];
	    this.mg.restore();
	}

    // transformations (default transform is the identity matrix)
    this.scale = function (x, y)
    {
        this.mg.scale(x, y);
    }
    
    this.rotate = function (x)
    {
        this.mg.rotate(x);
    }
    
    this.translate = function (x, y)
    {
        this.mg.translate(x, y);
    }
    
    this.transform = function (m11, m12, m21, m22, dx, dy)
    {
        this.mg.transform(m11, m12, m21, m22, dx, dy);
    }
    
    this.setTransform = function (m11, m12, m21, m22, dx, dy)
    {
        this.mg.set_matrix(m11, m12, m21, m22, dx, dy);
    }

    // colors and styles
    this.createLinearGradient = function (x0, y0, x1, y1)
    {
        if (isNaN(x1) || isNaN(x1) || isNaN(y1) || x1 == Infinity || y1 == Infinity || x1 == -Infinity || y1 == -Infinity) {
            post("createLinearGradient: NOT_SUPPORTED_ERR\n");
            return;
        } else if (isNaN(x0) || isNaN(y0) || x0 == Infinity || y0 == Infinity || x0 == -Infinity || y0 == -Infinity) {
            post("createLinearGradient: NOT_SUPPORTED_ERR\n");
            return;
        } else if (x0 == x1 && y0 == y1)
            var pattern = this.mg.pattern_create_radial(0., 0., 0., 0.);
        else
            var pattern = this.mg.pattern_create_linear(x0, y0, x1, y1);
        return new CanvasGradient(pattern, 0.);
    }
    
    this.createRadialGradient = function (x0, y0, r0, x1, y1, r1)
    {
        var radialHelper = 0.;
        
        if (isNaN(r1) || isNaN(x1) || isNaN(y1) || r1 == Infinity || x1 == Infinity || y1 == Infinity || r1 == -Infinity || x1 == -Infinity || y1 == -Infinity) {
            post("createLinearGradient: NOT_SUPPORTED_ERR\n");
            return;
        } else if (isNaN(r0) || isNaN(x0) || isNaN(y0) || r0 == Infinity || x0 == Infinity || y0 == Infinity || r0 == -Infinity || x0 == -Infinity || y0 == -Infinity) {
            post("createLinearGradient: NOT_SUPPORTED_ERR\n");
            return;
        } else if (r0 < 0 && r1 < 0) {
            post("createLinearGradient: INDEX_SIZE_ERR\n");
            return;
        } else if (x0 == x1 && y0 == y1 && r0 == r1)
            var pattern = this.mg.pattern_create_radial(0., 0., 0., 0.);
        else {
            //var pattern = this.mg.pattern_create_radial(x0, y0, r0, x1, y1, r1); // when jgraphics-radialGradient is working
            // but until then, to achive an effect somehow like it should be:
            if (r0<r1)
                radialHelper = r0/r1;
            else {  // we always want to use the bigger of the two circles
                radialHelper = r1/r0;
                x1 = x0;
                y1 = y0;
            }
            var pattern = this.mg.pattern_create_radial(x1, y1, 0., x1, y1+r1, 0.);
            pattern.add_color_stop_rgba(1.,0.,0.,0.,0.);    // don't draw anything outside of the bigger circle
        }
        return new CanvasGradient(pattern, radialHelper);
    }
    
    this.createPattern = function (image, repetition)
    {
        var rep = "repeat-y";

        if (repetition && repetition == "repeat" || repetition == "repeat-x" || repetition == "repeat-y" || repetition == "no-repeat")
            rep = repetition;
        else if (repetition) {
            post("createPattern: SYNTAX_ERR\n");
            return;
        }            
        if (!(image instanceof Image)) {
            post("createPattern: TYPE_MISMATCH_ERR\n");
            return;
        }
        var rx = image.size[0];
        var ry = image.size[1];
        if (rep == "repeat-y" || rep == "no-repeat")
            rx = this.width * 2;    // just because I think that might be big enough
        if (rep == "repeat-x" || rep == "no-repeat")
            ry = this.height * 2;
        
        var tmp = new Image(rx, ry);
        tmp.clear(0.,0.,0.,0.);
        tmp.copypixels(image);
        var pattern = this.mg.pattern_create_for_surface(tmp);
        return new CanvasPattern(pattern, rep);
    }
    
    //CanvasPattern createPattern(in HTMLCanvasElement image, in DOMString repetition);
    //CanvasPattern createPattern(in HTMLVideoElement image, in DOMString repetition);

    // rects
    // Clears all pixels on the canvas in the given rectangle to transparent black.
    this.clearRect = function (x, y, w, h) 
	{
        this.mg.set_source_rgba(1.,1.,1.,1.);
        this.mg.rectangle(x, y, w, h);
        this.mg.fill();
  	}
        
    this.fillRect = function (x, y, w, h) 
	{
        if (this.shadowOffsetX != 0 || this.shadowOffsetY != 0) {
            this.mg.save();
            this.setSource(this.shadowColor);
            this.mg.transform(1, 0, 0, 1, this.shadowOffsetX, this.shadowOffsetY);
            this.mg.rectangle(x, y, w, h);
            this.mg.fill_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
        this.setSource(this.fillStyle);
        this.mg.rectangle(x, y, w, h);
        this.mg.fill_with_alpha(this.globalAlpha);
	}

    this.strokeRect = function (x, y, w, h) 
	{
        this.mg.set_line_width(this.lineWidth);
        this.mg.set_line_cap(this.lineCap);
        this.mg.set_line_join(this.lineJoin);

        if (this.shadowOffsetX != 0 || this.shadowOffsetY != 0) {
            this.mg.save();
            this.setSource(this.shadowColor);
            this.mg.transform(1, 0, 0, 1, this.shadowOffsetX, this.shadowOffsetY);
            this.mg.rectangle(x, y, w, h);
            this.mg.stroke_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
        this.setSource(this.strokeStyle);
        this.mg.rectangle(x, y, w, h);
        this.mg.stroke_with_alpha(this.globalAlpha);
	}

    // path API
    // Resets the current path.
    this.beginPath = function ()
    {
        this.mg.new_path();
    }

    // Marks the current subpath as closed, and starts a new subpath 
    // with a point the same as the start and end of the newly closed subpath.
    this.closePath = function ()
    {
        this.mg.close_path();
        var pt = this.mg.get_current_point();
        if(pt)
            this.mg.move_to(pt[0], pt[1]);
    }
    
    // Creates a new subpath with the given point.
    this.moveTo = function (x, y)
    {
        this.mg.move_to(x, y);
    }
    
    this.lineTo = function (x, y)
    {
        this.mg.line_to(x, y);
    }
    
    this.quadraticCurveTo = function (cpx, cpy, x, y)
    {
        this.mg.curve_to(cpx, cpy, cpx, cpy, x, y);
    }
    
    this.bezierCurveTo = function (cp1x, cp1y, cp2x, cp2y, x, y)
    {
        this.mg.curve_to(cp1x, cp1y, cp2x, cp2y, x, y);
    }
    
    this.arcTo = function (x1, y1, x2, y2, radius)
    {
        if (!radius || !y2 || !x2 || !y1 || !x1) {
            post("arcTo: missing argument\n");
            return;
        } else if (radius < 0) {
            post("arcTo: INDEX_SIZE_ERR\n");
            return;
        }
        var pt = this.mg.get_current_point();
        if (!pt[0]) {
            this.mg.new_path();
            this.mg.move_to(x1, y1);
            pt = this.mg.get_current_point();
        }
        var m = 0;
        if ((x2 - x1) != 0)
            m = (y2 - y1) / (x2 - x1);
        var n = y1 - m * x1;
        
        if ((x1 == pt[0] && y1 == pt[1]) || (x1 == x2 && y1 == y2) || (radius == 0)) {
            this.mg.line_to(x1, y1);
            return;
        } else if (pt[1] == (m * pt[0] + n && x1 != x2) || (pt[0] == x1 && x1 == x2) || (pt[1] == y1 && y1 == y2)) {
            this.mg.line_to(x1, y1);
            return;
        } else {
            var radius1 = radius;
            var radius2 = radius;
            
            if ((pt[0] > x1 && pt[1] < y1) || (pt[0] <= x1 && pt[1] <= y1))
                radius1 = - radius;
            if ((x1 < x2 && y1 > y2) || (x1 >= x2 && y1 >= y2))
                radius2 = - radius;

            var m1 = 0;
            if ((x1 - pt[0]) != 0)
                m1 = (y1 - pt[1]) / (x1 - pt[0]);

            var norm1 = 1;
            var s1x = x1 + radius1;
            var s1y = y1;
            if (m1 != 0) {
                norm1 = 1 / (Math.sqrt(1 + Math.pow(1/m1,2)));
                s1x = x1 + radius1 * norm1 * (1/m1);
                s1y = y1 + radius1 * norm1;
            } else if ((x1 - pt[0]) == 0) {
                s1x = x1;
                s1y += radius1;
            }
            var norm2 = 1;
            var s2x = x1;
            var s2y = y1 + radius2;
            if (m!=0) {
                norm2 = 1 / (Math.sqrt(1 + Math.pow(1/m,2)));
                s2x = x1 + radius2 * norm2 * (1/m);
                s2y = y1 + radius2 * norm2;
            } else if ((y1 - y2) == 0) {
                s2x += radius2;
                s2y = y1;
            }
            var d = Math.sqrt(Math.pow(s1x-s2x,2) + Math.pow(s1y-s2y,2));
            var d1 = Math.sqrt(Math.pow(s1x-(x1+radius),2) + Math.pow(s1y-y1,2));
            var d2 = Math.sqrt(Math.pow(s2x-(x1+radius),2) + Math.pow(s2y-y1,2));
            var gamma = Math.acos((2*radius*radius - d*d) / (2*radius*radius));
            var gamma2 = Math.PI*2 - gamma;
            var alpha1 = Math.acos((2*radius*radius - d1*d1) / (2*radius*radius));

            var h1x = x1 + radius * Math.cos(alpha1);
            var h1y = y1 + radius * Math.sin(alpha1);
            var phi1 = alpha1+gamma;
            var h2x = x1 + radius * Math.cos(phi1);
            var h2y = y1 + radius * Math.sin(phi1);

            var startCircle = 2*Math.PI - alpha1;
            var anticlockwise = false;
            if (Math.round(h1x*100000) == Math.round(s1x*100000) && Math.round(h1y*100000) == Math.round(s1y*100000)) {
                startCircle = alpha1;
                anticlockwise = !anticlockwise;
            }
            var endCircle = startCircle+gamma;
            if (Math.round(h2x*100000) == Math.round(s2x*100000) && Math.round(h2y*100000) == Math.round(s2y*100000))
                anticlockwise = !anticlockwise;
            if ((Math.round(h1x*100000) != Math.round(s1x*100000) || Math.round(h1y*100000) != Math.round(s1y*100000)) &&
                (Math.round(h2x*100000) != Math.round(s2x*100000) || Math.round(h2y*100000) != Math.round(s2y*100000)))
                anticlockwise = !anticlockwise;
            if (anticlockwise)
                endCircle = startCircle + gamma2;

            this.mg.line_to(s1x, s1y);
            this.arc (x1, y1, radius, startCircle, endCircle, anticlockwise);
            this.mg.line_to(x2, y2);
        }
    }

    this.rect = function (x, y, w, h)
    {
        this.mg.rectangle(x, y, w, h);
    }    
    
    this.arc = function (x, y, r, startAngle, endAngle, anticlockwise)
    {
        if (r < 0)
            post("arc: INDEX_SIZE_ERR");
            
        if (anticlockwise == true)
            this.mg.arc_negative(x, y, r, startAngle, endAngle);
        else
            this.mg.arc(x, y, r, startAngle, endAngle);
    }
    
    // "Paths, when filled or stroked, must be painted without affecting the current path"
    this.fill = function ()
    {
        this.mg.save();
        // TODO: close ALL open subpaths, not only the current
        var origPath = this.mg.copy_path();
        this.mg.close_path();
        var path = this.mg.copy_path();
        this.mg.new_path();
        this.mg.identity_matrix();

        if (this.shadowOffsetX != 0 || this.shadowOffsetY != 0) {
            this.mg.save();
            this.setSource(this.shadowColor);
            this.mg.translate(this.shadowOffsetX, this.shadowOffsetY);
            this.mg.append_path(path);
            this.mg.fill_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
        this.setSource(this.fillStyle);
        this.mg.append_path(path);
        this.mg.fill_with_alpha(this.globalAlpha);
        //this.mg.append_path(origPath);
        this.mg.restore();
    }
 
    this.stroke = function ()
    {
        this.mg.save();
        var path = this.mg.copy_path();
        this.mg.new_path();
        this.mg.identity_matrix();

        this.mg.set_line_width(this.lineWidth);
        this.mg.set_line_cap(this.lineCap);
        this.mg.set_line_join(this.lineJoin);

        if (this.shadowOffsetX != 0 || this.shadowOffsetY != 0) {
            this.mg.save();
            this.setSource(this.shadowColor);
            this.mg.translate(this.shadowOffsetX, this.shadowOffsetY);
            this.mg.append_path(path);
            this.mg.stroke_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
        this.setSource(this.strokeStyle);
        this.mg.append_path(path);
        //this.mg.stroke_preserve();
        this.mg.stroke_with_alpha(this.globalAlpha);
        this.mg.restore();
    }

    //void clip();
    
    //Points on the path itself are considered to be inside the path. -> not true for the underlying juce method
    this.isPointInPath = function (x, y)
    {
        if (isNaN(x) || isNaN(y) || x == Infinity || y == Infinity || x == -Infinity || y == -Infinity)
            return false;
        if (this.mg.in_fill(x, y) == 0)
            return false;
        return true;
    }
    

    // focus management
    //boolean drawFocusRing(in Element element, in float xCaret, in float yCaret, in optional boolean canDrawCustom);


    // text
    this.fillText = function (text, x, y, maxWidth)
    {
        this.mg.save(); // because of the scaling for maxWidth
        var fontProp = this.parseFontString(this.font);
        if (!text) {
            post("fillText: missing textstring\n");
            return;
        }
   	    this.setSource(this.fillStyle);
        this.mg.select_font_face(fontProp[0], fontProp[1], fontProp[2]);
        this.mg.set_font_size(fontProp[3]);

        var xOffset = this.getTextAlign(text);
        var yOffset = this.getTextBaseline();
        if (x)
            xOffset += x;
        if (y)
            yOffset += y;
        if (maxWidth)
            this.mg.scale(this.getTextScale(maxWidth, text), 1.0);

        if (this.shadowOffsetX != 0 || this.shadowOffsetY != 0) {
            this.mg.save();
            this.setSource(this.shadowColor);
            this.mg.move_to(xOffset+this.shadowOffsetX, yOffset+this.shadowOffsetY);
            this.mg.text_path(text);
            this.mg.fill_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
        this.mg.move_to(xOffset, yOffset);
        this.mg.text_path(text);
        this.mg.fill_with_alpha(this.globalAlpha);
        this.mg.restore();
    }

    this.strokeText = function (text, x, y, maxWidth) 
    {
        this.mg.save();
        var fontProp = this.parseFontString(this.font);
        if (!text) {
            post("strokeText: missing textstring\n");
            return;
        }
   	    this.setSource(this.strokeStyle);
        this.mg.select_font_face(fontProp[0], fontProp[1], fontProp[2]);
        this.mg.set_font_size(fontProp[3]);
        
        this.mg.set_line_width(this.lineWidth);
        this.mg.set_line_cap(this.lineCap);     // do we want this here?
        this.mg.set_line_join(this.lineJoin);   // do we want this here?

        var xOffset = this.getTextAlign(text);
        var yOffset = this.getTextBaseline();
        if (x)
            xOffset += x;
        if (y)
            yOffset += y;
        if (maxWidth)
            this.mg.scale(this.getTextScale(maxWidth, text), 1.0);

        if (this.shadowOffsetX != 0 || this.shadowOffsetY != 0) {
            this.mg.save();
            this.setSource(this.shadowColor);
            this.mg.move_to(xOffset+this.shadowOffsetX, yOffset+this.shadowOffsetY);
            this.mg.text_path(text);
            this.mg.stroke_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
        this.mg.move_to(xOffset, yOffset);
        this.mg.text_path(text);
        this.mg.stroke_with_alpha(this.globalAlpha);
        this.mg.restore();
    }
    
    this.measureText = function (text)
    {
        if (!text) {
            post("measureText: missing textstring\n");
            return;
        }
        var fontProperties = this.parseFontString(this.font);
        this.mg.select_font_face(fontProperties[0], fontProperties[1], fontProperties[2]);
        this.mg.set_font_size(fontProperties[3]);
        var textSize = this.mg.text_measure(text);
        
        return textSize[0];
    }

    // drawing images
    this.drawImage = function (image, arg1, arg2, arg3, arg4, arg5, arg6, arg7, arg8)
    {
        if (!(image instanceof Image)) {
            post("drawImage: TYPE_MISMATCH_ERR");
            return;
        } else if (image.size[0] <= 0 || image.size[1] <= 0) {
            post("drawImage: INVALID_STATE_ERROR");
            return;
        } else if (arg8) {
            var sx = arg1;
            var sy = arg2;
            var sw = arg3;
            var sh = arg4;
            var dx = arg5;
            var dy = arg6;
            var dw = arg7;
            var dh = arg8;
        } else if (arg4) {
            var dx = arg1;
            var dy = arg2;
            var dw = arg3;
            var dh = arg4;
            var sx = 0;
            var sy = 0;
            var sw = image.size[0];
            var sh = image.size[1];
        } else if (arg2) {
            var dx = arg1;
            var dy = arg2;
            var dw = image.size[0];
            var dh = image.size[1];
            var sx = 0;
            var sy = 0;
            var sw = image.size[0];
            var sh = image.size[1];
        } else {
            post("drawImage: missing arguments\n");
            return;
        }
        if (sx < 0 || sy < 0 || sw <= 0 || sh <= 0 || (sx+sw) > image.size[0] || (sy+sh) > image.size[1]) {
            post("drawImage: INDEX_SIZE_ERR");
            return;
        }
        var matrix = this.mg.get_matrix();
        
        if (matrix[1] == 0 && matrix[2] == 0) {
            this.mg.set_source_rgba(1., 1., 1., this.globalAlpha);
            this.mg.image_surface_draw(image, sx, sy, sw, sh, dx, dy, dw, dh);
        } else {
            var pat = this.mg.pattern_create_for_surface(image);
            this.mg.save();
            this.mg.translate(dx, dy);
            this.mg.scale(dw/image.size[0], dh/image.size[1]);
            this.mg.rectangle(0, 0, image.size[0], image.size[1]);
            this.mg.scale(image.size[0]/sw, image.size[1]/sh);
            this.mg.translate(-sx, -sy);
            this.mg.set_source(pat);
            this.mg.fill_with_alpha(this.globalAlpha);
            this.mg.restore();
        }
    }

/*  void drawImage(in HTMLCanvasElement image, in float dx, in float dy, in optional float dw, in float dh);
    void drawImage(in HTMLCanvasElement image, in float sx, in float sy, in float sw, in float sh, in float dx, in float dy, in float dw, in float dh);
    void drawImage(in HTMLVideoElement image, in float dx, in float dy, in optional float dw, in float dh);
    void drawImage(in HTMLVideoElement image, in float sx, in float sy, in float sw, in float sh, in float dx, in float dy, in float dw, in float dh);
*/

    // pixel manipulation
    //ImageData createImageData(in float sw, in float sh);
    //ImageData createImageData(in ImageData imagedata);
    this.createImageData = function (arg1, arg2)
    {
        if (arg2)
            var sketchimage = new Image(arg1, arg2);
        else if (arg1)
            var sketchimage = new Image(arg1.width, arg1.height);
        else {
            post("createImageData: missing argument\n");
            return;
        }
        sketchimage.clear();

        return new ImageData(sketchimage);
    }

    //ImageData getImageData(in float sx, in float sy, in float sw, in float sh);
    this.getImageData = function ()
    {
        // TODO...
    }
    
    //void putImageData(in ImageData imagedata, in float dx, in float dy, in optional float dirtyX, in float dirtyY, in float dirtyWidth, in float dirtyHeight);
    this.putImageData = function (imagedata, dx, dy, dirtyX, dirtyY, dirtyWidth, dirtyHeight)
    {
        // TODO...
        this.drawImage(imagedata.source, dx, dy);
    }


    // the following 7 methods are not part of the canvas-api and may be removed in the future
    this.redraw = function ()
    {
        this.mg.redraw();
    }

    this.paint = function ()
    {
        this.mg.paint();
    }

    this.roundedRect = function (x, y, w, h, ow, oh)
    {
        this.mg.rectangle_rounded(x, y, w, h, ow, oh);
    }

    this.setTimeout = function (expression, timeout)
    {
        var funWrapper = function (expression)
        {
            expression.call();
            arguments.callee.task.cancel();
        }
        var tsk = new Task(funWrapper, this, expression);
        tsk.repeat(1,timeout);
        //tsk.schedule(timeout);
        return tsk;
    }

    this.clearTimeout = function (task)
    {
        if (task instanceof Task)
            task.cancel();
        else
            post("clearTimeout: TIMER_ID_ERR");
    }

    this.setInterval = function (expression, interval)
    {
        var tsk = new Task(expression);
        tsk.interval = interval;
        tsk.repeat();
        return tsk;
    }

    this.clearInterval = function (task)
    {
        if (task instanceof Task)
            task.cancel();
        else
            post("clearInterval: TIMER_ID_ERR");
    }
    
    // helper methods
    this.setSource = function (style)
    {
        if (style instanceof CanvasPattern)
            this.mg.set_source(style.pattern);
        else if (style instanceof CanvasGradient)
            this.mg.set_source(style.pattern);
        else if (typeof style == "string") {
            var color = new RGBAColor(style);
            if (color.ok)
                this.mg.set_source_rgba(color.r,color.g,color.b,color.a);
            else
                post("SYNTAX_ERR: could not parse color string \"" + style + "\" successfully\n");
        } else 
            post("problem setting source to " + style + "\n");
    }

    this.parseFontString = function (font)
    {
        var fontProperties = [];

        fontProperties[0] = "Arial";   //  font-family
        fontProperties[1] = "normal";  //  slant
        fontProperties[2] = "normal";  //  weight
        fontProperties[3] = 10;        //  font-size

        font = font.replace(/normal/i,'');

        if (font.match(/italic/)) {
            fontProperties[1] = "italic";
            font = font.replace(/italic/,'');
        }
        if (font.match(/bold/)) {
            fontProperties[2] = "bold";
            font = font.replace(/bold/,'');
        }
        if (font.match(/px/i)) {
            var re = /\d+px/;
            var match = re.exec(font);
            if (match){
                fontProperties[3] = parseInt(match[0].replace(/px/g,''));
                font = font.replace(match[0],'');
            }
        }
        font = font.replace(/^\s+/g,'').replace(/\s+$/g,'');

        if (font) {
            if (this.fontlist.length == 0)
                this.fontlist = this.mg.getfontlist();
            if (this.fontlist.indexOf(font) != -1)
                fontProperties[0] = font;
            else
                post("font \"" + font + "\" not available, using default\n");
        }
        return fontProperties;
    }

    this.getTextAlign = function (textString)
    {
        if (this.textAlign == "left" || this.textAlign == "start")
            return 0;
            
        var width = this.mg.text_measure(textString);

        if (this.textAlign == "right" || this.textAlign == "end")
            return -width[0];
        else if (this.textAlign == "center" || this.textAlign == "middle") // leaving "middle", which erroneously was supported and not "center" in earlier versions
            return -width[0]/2;
        
        return 0; //default to "start" if some other value
    }

    this.getTextBaseline = function ()
    {
        if (this.textBaseline == "alphabetic")
            return 0;
            
        var fontMeasure = this.mg.font_extents();
        
        if (this.textBaseline == "top" || this.textBaseline == "hanging")
            return fontMeasure[0];
        else if (this.textBaseline == "bottom" || this.textBaseline == "ideographic")
            return -fontMeasure[1];
        else if (this.textBaseline == "middle")
            return -fontMeasure[1] + (fontMeasure[0]+fontMeasure[1]) / 2;        

        return 0; //default to "alphabetic" if some other value
    }
    
    this.getTextScale = function (maxWidth, text)
    {
        var textSize = this.mg.text_measure(text);
        if (textSize[0] > maxWidth)
            return maxWidth/textSize[0];
        return 1.0;
    }
};


//interface CanvasGradient
function CanvasGradient(patternObj, radiHelper)
{
    this.pattern = patternObj;
    this.radialHelper = radiHelper;
    var that = this;
    
    this.addColorStop = function (offset, color)
    {
        if (offset < 0 || offset > 1 || offset == Infinity || offset == -Infinity || isNaN(offset)) {
            post("addColorStop: INDEX_SIZE_ERR");
            return;
        }
        var color = new RGBAColor(color);
        that.pattern.add_color_stop_rgba(offset, color.r, color.g, color.b, color.a);

        // to achive the effect of an inner circle with a constant color...
        if (that.radialHelper != 0. && offset == 0.)
            that.pattern.add_color_stop_rgba(that.radialHelper, color.r, color.g, color.b, color.a);
    }
};

//interface CanvasPattern
function CanvasPattern(pat, rep)
{
    this.pattern = pat;
    this.repetition = rep;
}

//interface TextMetrics {  readonly attribute float width;};

/*
interface ImageData {
  readonly attribute unsigned long width;
  readonly attribute unsigned long height;
  readonly attribute CanvasPixelArray data;
};*/
function ImageData (sketchimage)
{
    this.width  = sketchimage.size[0];
    this.height = sketchimage.size[1];
    this.data   = [];
    this.source = sketchimage;
    
    for (var i = 0; i < sketchimage.size[1]; i++) {
        for (var j = 0; j < sketchimage.size[0]; j++) {
            var pixel = sketchimage.getpixel(j, i);
            for (var k = 0; k < pixel.length; k++) {
                this.data.push[pixel[k]*255];
                //post("pixel: " + pixel[k]*255 + "\n");
            }
        }
    }
    
    this.set = function (index, value)
    {
        var channel = index%4;
        var pos = index/4;
        var x = pos%this.width;
        var y = pos/this.width;
        var pixelpos = index-channel
        var pixel = [this.data[pixelpos]/255,
                     this.data[pixelpos+1]/255,
                     this.data[pixelpos+2]/255,
                     this.data[pixelpos+3]/255];

        pixel[channel] = value/255;
        this.source.setpixel(x, y, pixel[0], pixel[1], pixel[2], pixel[3])
    }
}


/*
interface CanvasPixelArray {
  readonly attribute unsigned long length;
  getter octet (in unsigned long index);
  setter void (in unsigned long index, in octet value);
);*/
function CanvasPixelArray(val){
    this.length = val;
    this.array = [];
}


/**
 * The following code is based on an example from Stoyan Stefanov <sstoo@gmail.com>.
 * Added supported for alpha channel.
 * @author Silvio Haedrich for c74, 6th of july 2010
 * @original link:   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @original license: Use it if you like it
 */
function RGBAColor(color_string, globalAlpha) 
{
    this.ok = false;

    if (color_string.charAt(0) == '#')
        color_string = color_string.slice(1);    // strip any leading #
    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();
    color_string = color_string.replace(/%/g,'');    // remove %-sign in hsl-strings

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    for (var key in simple_colors) {
        if (color_string == key) {
            color_string = simple_colors[key];
        }
    }
    // end of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3]),
                    1.0
                ];
            }
        },
        {
            re: /^hsl\((\d{1,}.\d+),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['hsl(123, 34, 100)', 'hsl(25,23%,25%)'],
            process: function (bits){
                return hslToRgba(
                            parseFloat(bits[1])/360,
                            parseInt(bits[2])  /100,
                            parseInt(bits[3])  /100,
                            1.0
                        );
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16),
                    1.0
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16),
                    1.0
                ];
            }
        },
        {
            re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0-1]?\.?\d*)\)$/,
            example: ['rgb(123, 234, 45, 0.1)', 'rgb(255,234,245,0.5)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3]),
                    parseFloat(bits[4])
                ];
            }
        },
        {
            re: /^hsla\((\d{1,}.\d+),\s*(\d{1,3}),\s*(\d{1,3}),\s*([0-1]\.?\d*)\)$/,
            example: ['hsla(123, 34, 100, 0.798)', 'hsla(25,23%,25%,0.8)'],
            process: function (bits){
                return hslToRgba(
                            parseFloat(bits[1])/360,
                            parseInt(bits[2])  /100,
                            parseInt(bits[3])  /100,
                            parseFloat(bits[4])
                        );
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00dd', '336699ee'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16),
                    (parseInt(bits[4], 16)/255)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb04', 'f0fa'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16),
                    (parseInt(bits[4] + bits[4], 16)/255)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0]/255;
            this.g = channels[1]/255;
            this.b = channels[2]/255;
            this.a = channels[3];
            this.ok = true;
        }
    }
    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    this.a = (this.a < 0. || isNaN(this.a)) ? 0. : ((this.a > 1.) ? 1. : this.a);

    //post("final color: " + this.r + ", " + this.g + ", " + this.b + ", " + this.a + "\n");

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }
}

/**
 * The following code is from:
 * http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   Number  h       The hue
 * @param   Number  s       The saturation
 * @param   Number  l       The lightness
 * @return  Array           The RGB representation
 */
hslToRgba = function (h, s, l, a) {
    var r, g, b;
    if (s == 0) {
        r = g = b = l; // achromatic
    } else {
        function hue2rgb(p, q, t) {
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }
    return [r * 255, g * 255, b * 255, a];
}
