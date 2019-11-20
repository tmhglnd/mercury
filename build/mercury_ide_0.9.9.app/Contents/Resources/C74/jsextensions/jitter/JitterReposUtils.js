/* 
	Copyright 2004-2005 - Cycling '74
	R. Luke DuBois luke@cycling74.com
*/

// ReposUtils: javascript module for doing nifty things with repos and other spatial maps


var JitterReposUtils = new JitterReposUtilsInterface();
//max.post("Installed JitterReposUtils \n");

function JitterReposUtilsInterface()
{

	this.interpbits = 8; // how many bits of interpolation we want in our maps

	this.makemap_normal = function(x,y) // generate a normal map
	{
		var s = new JitterMatrix(2, "long", x, y); // long output matrix
		var p = this.genkernel2dfloat32(); // generate float32 kernel
		var q = this.upsample2d(p,x,y); // upsample kernel to full map
		q.op("*", x-1, y-1); // scale map values to reflect dimensions
		q.op("*",(1<<this.interpbits)); // upsample by interpbits
		s.frommatrix(q); // copy float32->long
		return s; // output
	}

	this.makemap_pinch = function(x, y, kx, ky, xpinch, ypinch, xamp, yamp, power) // generate an absolute pinch map
	{
		var s = new JitterMatrix(2, "long", x, y); // long output matrix
		var p = this.genkernel2dfloat32(); // generate float32 kernel
		var q = this.upsample2d(p, kx, ky); // upsample kernel to intermediate map
		var c = this.pinch2dfloat32(q,xpinch,ypinch,xamp,yamp,power); // pinch map
		var d = this.upsample2d(c,x,y); // upsample map to final dimensions
		s.frommatrix(d); // copy float32->long
		var v = this.rel2abs(s); // convert relative map to absolute map (faster compute, plus allows for mixing with other absolute maps)
		/* no need to upsample by interpbits (rel2abs does this for us when it makes a normal map) */
		return v; // output
	}

	this.makemap_multi = function(x, y, xscale, yscale) // generate a multi repos map
	{
		var s = new JitterMatrix(2, "long", x, y); // long output matrix
		var p = this.genkernel2dfloat32(); // generate float32 kernel
		p.op("*", xscale, yscale); // multiply kernel values by desired multi scale
		var q = this.upsample2d(p,x,y); // upsample kernel to full map
		q.op("*", x-1, y-1); // scale map values to reflect dimensions
		q.op("*",256); // upsample by interpbits
		s.frommatrix(q); // copy float32->long
		s.op("%", x*(1<<this.interpbits), y*(1<<this.interpbits)); // modulo to create repeating map
		return s; // output
	}

	this.makemap_cartopol = function(x, y, xscale, yscale) // generate a car2pol repos map
	{
		var s = new JitterMatrix(2, "long", x, y); // long output matrix
		var p = this.genkernel2dfloat32(); // generate float32 kernel
		p.op("*", 2.0); // multiply and...
		p.op("-", 1.0); // offset to get to range {-1, 1}
		var q = this.upsample2d(p,x,y); // upsample kernel to full map
		var r = this.cartopolmatrix2dfloat32(q, xscale, yscale, 0); // convert cartesian map to polar map
		r.op("*", x-1, y-1); // scale map values to reflect dimensions
		r.op("*",(1<<this.interpbits)); // upsample by interpbits
		s.frommatrix(r); // copy float32->long
		return s; // output
	}

	this.genkernel2dfloat32 = function() // make a 2x2 plane with vertices at 0 and 1
	{
		var kern = new JitterMatrix(2, "float32", 2, 2); // new float32 matrix
		// set kernel cells
		kern.setcell2d(0,0,0.0,0.0);
		kern.setcell2d(1,0,1.0,0.0);
		kern.setcell2d(0,1,0.0,1.0);
		kern.setcell2d(1,1,1.0,1.0);
		//kern.setcell2d(0,0,0.0,0.0);
		//kern.setcell2d(1,0,256.0,0.0);
		//kern.setcell2d(0,1,0.0,256.0);
		//kern.setcell2d(1,1,256.0,256.0);
		return kern; // output
	}

	this.upsample1d = function(inmat, l) // upsample a 1d matrix with interpolation
	{
		var uppy = new JitterMatrix(inmat.planecount, inmat.type, l); // new interpolated matrix
		uppy.adapt = 0; // don't adapt to incoming matrix
		uppy.interp = 1; // interpolation on
		uppy.frommatrix(inmat); // upsample with interpolation
		return uppy; // output
	}

	this.upsample2d = function(inmat, x, y) // upsample a 2d matrix with interpolation
	{
		var uppy = new JitterMatrix(inmat.planecount, inmat.type, x, y); // new interpolated matrix
		uppy.adapt = 0; // don't adapt to incoming matrix
		uppy.interp = 1; // interpolation on
		uppy.frommatrix(inmat); // upsample with interpolation
		return uppy; // output
	}

	this.pinch2dfloat32 = function(impulse,xpinch,ypinch,xamp,yamp,power) // pinch a float32 kernel plane
	{
		// create some matrices
		var r = new JitterMatrix();
		r.setinfo(2, impulse.type, impulse.dim);
		var outmat = new JitterMatrix();
		var a = new JitterMatrix();
		var b = new JitterMatrix();
		var dist = new JitterMatrix();
		dist.setinfo(1, impulse.type, impulse.dim);

		impulse.op("!-",xpinch,ypinch); // subtract pinch center from incoming map
		r.frommatrix(impulse); // copy to a new matrix
		r.op("*", 0.1); // scale it down
		this.unpack2plane(r,a,b); // split x and y maps into their own matrices (a and b)
		dist.op("hypot",a,b); // get the hypotenuse
		dist.op("pow", power*-1.); // make it exponential
		outmat = this.pack2plane(dist,dist); // make the hypotenuse a 2-plane matrix
		outmat.op("*", impulse); // multiply it by the original (incoming) map
		outmat.op("*", xamp, yamp); // scale it by the amplitude coefficients
		return outmat; // output
	}

	this.cartopolmatrix2dfloat32 = function(impulse, xs, ys, issigned) // convert a float32 plane from cartesian to polar space
	{
		// create some matrices
		var a = new JitterMatrix();
		var b = new JitterMatrix();
		var dist = new JitterMatrix();
		var theta = new JitterMatrix();
		var outmat = new JitterMatrix();
		dist.setinfo(1, impulse.type, impulse.dim);
		theta.setinfo(1, impulse.type, impulse.dim);

		impulse.op("*", xs, ys); // scale incoming plane
		this.unpack2plane(impulse, a, b); // split x and y maps into their own matrices (a and b)
		dist.op("hypot", a, b); // get the distance plane (hypotenuse)
		theta.op("atan2", b, a); // get the theta plane (arctangent)
		theta.op("/", theta, Math.PI); // scale the theta plane
		if(!issigned) { // scale theta matrix into the positive range
			theta.op("*", theta, 0.5);
			theta.op("+", theta, 0.5);
		}
		outmat = this.pack2plane(dist,theta); // combine distance and theta into a 2-plane matrix
		return outmat; // output	
	}

	this.rel2abs = function(rela) // converts a relative spatial map to an absolute spatial map of the same size
	{
		var abso = new JitterMatrix(); // output matrix
		var norm = JitterReposUtils.makemap_normal(rela.dim[0], rela.dim[1]); // normal map to use as input
		var u = new JitterObject("jit.repos"); // [jit.repos] object to perform the calculation

		abso.setinfo(rela); // set output to the same as input
		u.mode = 1; // tell our [jit.repos] object to interpret spatial map as relative
		u.matrixcalc([norm,rela],abso); // perform the calculation
		return abso; // output the new (absolute) map
	}

	this.pack2plane = function(uno, dos) // pack together two 1-plane matrices into a third 2-plane matrix
	{
		packer = new JitterObject("jit.pack");
		cero = new JitterMatrix(2, uno.type, uno.dim);
		cero.adapt = 0;
		packer.matrixcalc([uno, dos], cero);
		return cero;
	}

	this.unpack2plane = function(cero, uno, dos) // split apart a 2-plane matrix into two 1-plane matrices
	{
		unpacker = new JitterObject("jit.unpack");
		uno.setinfo(1, cero.type, cero.dim);
		dos.setinfo(1, cero.type, cero.dim);
		unpacker.matrixcalc(cero,[uno,dos]);
	}

}



