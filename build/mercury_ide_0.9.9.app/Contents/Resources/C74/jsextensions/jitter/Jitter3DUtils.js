
// vector utils: javascript module for doing Jitter 3d stuff
// portions of the following are Copyright SGI -jkc 

/*
 * (c) Copyright 1993, 1994, Silicon Graphics, Inc.
 * ALL RIGHTS RESERVED
 * Permission to use, copy, modify, and distribute this software for
 * any purpose and without fee is hereby granted, provided that the above
 * copyright notice appear in all copies and that both the copyright notice
 * and this permission notice appear in supporting documentation, and that
 * the name of Silicon Graphics, Inc. not be used in advertising
 * or publicity pertaining to distribution of the software without specific,
 * written prior permission.
 *
 * THE MATERIAL EMBODIED ON THIS SOFTWARE IS PROVIDED TO YOU "AS-IS"
 * AND WITHOUT WARRANTY OF ANY KIND, EXPRESS, IMPLIED OR OTHERWISE,
 * INCLUDING WITHOUT LIMITATION, ANY WARRANTY OF MERCHANTABILITY OR
 * FITNESS FOR A PARTICULAR PURPOSE.  IN NO EVENT SHALL SILICON
 * GRAPHICS, INC.  BE LIABLE TO YOU OR ANYONE ELSE FOR ANY DIRECT,
 * SPECIAL, INCIDENTAL, INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY
 * KIND, OR ANY DAMAGES WHATSOEVER, INCLUDING WITHOUT LIMITATION,
 * LOSS OF PROFIT, LOSS OF USE, SAVINGS OR REVENUE, OR THE CLAIMS OF
 * THIRD PARTIES, WHETHER OR NOT SILICON GRAPHICS, INC.  HAS BEEN
 * ADVISED OF THE POSSIBILITY OF SUCH LOSS, HOWEVER CAUSED AND ON
 * ANY THEORY OF LIABILITY, ARISING OUT OF OR IN CONNECTION WITH THE
 * POSSESSION, USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * US Government Users Restricted Rights
 * Use, duplication, or disclosure by the Government is subject to
 * restrictions set forth in FAR 52.227.19(c)(2) or subparagraph
 * (c)(1)(ii) of the Rights in Technical Data and Computer Software
 * clause at DFARS 252.227-7013 and/or in similar or successor
 * clauses in the FAR or the DOD or NASA FAR Supplement.
 * Unpublished-- rights reserved under the copyright laws of the
 * United States.  Contractor/manufacturer is Silicon Graphics,
 * Inc., 2011 N.  Shoreline Blvd., Mountain View, CA 94039-7311.
 *
 * OpenGL(TM) is a trademark of Silicon Graphics, Inc.
 */

/*
 * Trackball code:
 *
 * Implementation of a virtual trackball.
 * Implemented by Gavin Bell, lots of ideas from Thant Tessman and
 *   the August '88 issue of Siggraph's "Computer Graphics," pp. 121-129.
 *
 * Vector manip code:
 *
 * Original code from:
 * David M. Ciemiewicz, Mark Grossman, Henry Moreton, and Paul Haeberli
 *
 * Much mucking with by:
 * Gavin Bell
 */


var Jitter3DUtils = new Jitter3dUtilsInterface();

function Jitter3dUtilsInterface()
{
	// if the ray defined by the line's two points intersects the sphere, 
	// set p1 to the closest point of intersection. 
	//
	// boolean return value
	//
	this.intersect_line_sphere = function (/*t_vec_3d*/ line_a, /*t_vec_3d*/ line_b, /*t_vec_3d*/ center, /*float*/ r, /*t_vec_3d*/ p1)
	{
		var result;
		var	EO = new Array();
		var V = new Array(); 
		var v, disc, d, P;
		
		this.vsub(center, line_a, EO);
		this.vsub(line_b, line_a, V);
		this.vnormal(V);
		
		v = this.vdot(EO, V);
		disc = r*r - (this.vdot(EO, EO) - v*v);
		
		if (disc < 0)
		{
			result = false;
		}
		else
		{
			d = Math.sqrt(disc);
			this.vscale(V, v-d);
			this.vadd(V, line_a, p1);
			result = true;
		}
		return result;
	}


	// set p1 to the point on sphere closest to line segment
	//
	// (x3 - x1)(x2 - x1) + (y3 - y1)(y2 - y1) + (z3 - z1)(z2 - z1) 
	// ----------------------------------------------------------- 
	// (x2 - x1)(x2 - x1) + (y2 - y1)(y2 - y1) + (z2 - z1)(z2 - z1) 
	//
	// no return value
	//
	this.closest_line_sphere = function (/*t_vec_3d*/ line_a, /*t_vec_3d*/ line_b, /*t_vec_3d*/ center, /*float*/ r, /*t_vec_3d*/ p1)
	{
		var x1, x2, x3, y1, y2, y3, z1, z2, z3;
		var u;
		var	ab = new Array();
		var p = new Array(); 
		
		x1 = line_a[0];
		y1 = line_a[1];
		z1 = line_a[2];
		
		x2 = line_b[0];
		y2 = line_b[1];
		z2 = line_b[2];
		
		x3 = center[0];
		y3 = center[1];
		z3 = center[2];
		
		u = ((x3 - x1)*(x2 - x1) + (y3 - y1)*(y2 - y1) + (z3 - z1)*(z2 - z1))/
			((x2 - x1)*(x2 - x1) + (y2 - y1)*(y2 - y1) + (z2 - z1)*(z2 - z1));
			
		this.vsub(line_b, line_a, ab);
		this.vscale(ab, u);
		this.vadd(line_a, ab, p); 	// p is point on line seg closest to sphere
		
		this.vsub(p, center, p);
		this.vnormal(p);
		this.vscale(p, r);
		this.vadd(p, center, p1);

	}

	// return true if the ray defined by the line's two points intersects the quad.  
	// also sets p2 to the point of intersection with the quad plane in object unit 
	// coords, and p1 to the same point in world coords.
	// Quad is defined by the unit quad transformed by position, rotation, scale.
	//
	this.intersect_line_quad = function (line_a, line_b, pos, rot, scale, p1, p2)
	{
		var result;
		var slope = new Array();
		var	z0 = new Array();		// point on ray at at z=0
		var xz0, yz0;				// x and y at z=0
		var q = new Array();	
		var m = new Array();		// rotation matrix
		var d2r = (Math.PI / 180.);
		var result;
		
		var axis = [rot[0], rot[1], rot[2], rot[3]];
		var a = [line_a[0], line_a[1], line_a[2]];
		var b = [line_b[0], line_b[1], line_b[2]];

		// transform to object unit coordinates 
		scale[2] = 1.;		// only interested in plane z=0, so set scale[z] to unity;
		this.vsub(a, pos, a);
		this.vsub(b, pos, b);

		// rotate 
		this.axis_to_quat(axis, q); 	
		this.build_rotmatrix(m, q);
		this.transform_point(a, m);
		this.transform_point(b, m);
		
		// scale
		this.vdiv(a, scale, a);
		this.vdiv(b, scale, b);
		
		// get line xy at z=0
		this.vsub(a, b, slope);
		this.vscale(slope, 1.0/slope[2]);	// dx/dz, dy/dz, 1.
		this.vscale(slope, 0.-a[2]);	
		this.vadd(a, slope, z0);
		
		xz0 = z0[0];
		yz0 = z0[1];
		
		// send useful information even if no intersection
		{
			// set object scale out
			this.vcopy(z0, p2);
			// transform back to world
			this.vmul(z0, scale, z0);
			axis[0] = -axis[0];
			this.axis_to_quat(axis, q); 
			this.build_rotmatrix(m, q);
			this.transform_point(z0, m);
			this.vadd(z0, pos, z0);
			this.vcopy(z0, p1);
		}
		
		result = ((xz0 > 0)&&(xz0 < 1)&&(yz0 > 0)&&(yz0 < 1));
		return result;
	}

	// convert rotation in Euler angles (xyz) to angle/axis rotation.
	this.xyz_to_axis = function (xyz, axis)
	{
		var q1 = new Array();
		var q2 = new Array();
		var q3 = new Array();
		var q4 = new Array();

		var x = xyz[0];
		var y = xyz[1];
		var z = xyz[2];
		
		this.axis_to_quat([x,1.,0.,0.], q1);	

		this.axis_to_quat([y,0.,1.,0.], q2);	
		this.add_quats(q1,q2,q3);

		this.axis_to_quat([z,0.,0.,1.], q2);	
		this.add_quats(q3,q2,q4);
		
		this.quat_to_axis(q4, axis);	
	}

	// convert angle/axis rotation to quaternion.
	this.axis_to_quat = function (axis, quat)
	{
		var d2r = (Math.PI / 180.);
		var phi = axis[0]*d2r;
		var mag;
		var scale;

		mag = Math.sqrt(axis[1]*axis[1] + axis[2]*axis[2] + axis[3]*axis[3]);

		if (mag < 0.0005)
			mag = 1;

		scale = Math.sin(phi/2.0)/mag;

		quat[0] = axis[1]*scale;
		quat[1] = axis[2]*scale;
		quat[2] = axis[3]*scale;
		quat[3] = Math.cos(phi/2.0);
	}

	this.quat_to_axis = function (quat,axis)
	{
		var cos_a, sin_a;
		var r2d = (180. / Math.PI);
		cos_a = quat[3];
		axis[0] = (Math.acos(cos_a) * 2.)*r2d;
		sin_a = Math.sqrt(1.0 - cos_a * cos_a);
		
		if (Math.abs(sin_a) < 0.00005)
			sin_a = 1;
			
		axis[1] = quat[0] / sin_a;
		axis[2] = quat[1] / sin_a;
		axis[3] = quat[2] / sin_a;
	}

	this.add_quats = function (q1,q2,q3)
	{
		var t1 = new Array();
		var t2 = new Array();
		var t3 = new Array();
		var t4 = new Array();
		var tf = new Array();

		this.vcopy(q1,t1);
		this.vscale(t1,q2[3]);

		this.vcopy(q2,t2);
		this.vscale(t2,q1[3]);

		this.vcross(q2,q1,t3);
		this.vadd(t1,t2,tf);
		this.vadd(t3,tf,tf);
		tf[3] = q1[3] * q2[3] - this.vdot(q1,q2);

		q3[0] = tf[0];
		q3[1] = tf[1];
		q3[2] = tf[2];
		q3[3] = tf[3];

		this.normalize_quat(q3);
	}

	this.vzero = function (v)
	{
	    v[0] = 0.0;
	    v[1] = 0.0;
	    v[2] = 0.0;
	}
	
	this.vset = function (v,x,y,z)
	{
	    v[0] = x;
	    v[1] = y;
	    v[2] = z;
	}

	this.vadd = function (src1,src2,dst)
	{
		dst[0] = src1[0] + src2[0];
		dst[1] = src1[1] + src2[1];
		dst[2] = src1[2] + src2[2];
	}

	this.vsub = function (src1,src2,dst)
	{
	    dst[0] = src1[0] - src2[0];
	    dst[1] = src1[1] - src2[1];
	    dst[2] = src1[2] - src2[2];
	}

	this.vmul = function (src1,src2,dst)
	{
	    dst[0] = src1[0] * src2[0];
	    dst[1] = src1[1] * src2[1];
	    dst[2] = src1[2] * src2[2];
	}

	this.vdiv = function (src1,src2,dst)
	{
	    dst[0] = src1[0] / src2[0];
	    dst[1] = src1[1] / src2[1];
	    dst[2] = src1[2] / src2[2];
	}

	this.vcopy = function (v1,v2)
	{
		for (var i=0;i<3;i++)
			v2[i] = v1[i];
	}

	this.vcross = function (v1,v2,cross)
	{
		var temp = new Array();

		temp[0] = (v1[1] * v2[2]) - (v1[2] * v2[1]);
		temp[1] = (v1[2] * v2[0]) - (v1[0] * v2[2]);
		temp[2] = (v1[0] * v2[1]) - (v1[1] * v2[0]);
		this.vcopy(temp, cross);
	}

	this.vlength = function (v)
	{
		return Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
	}

	// cheaper distance-squared function
	this.vlength2 = function (v)
	{
		return v[0]*v[0] + v[1]*v[1] + v[2]*v[2];
	}

	this.vscale = function (v,div)
	{
		v[0] *= div;
		v[1] *= div;
		v[2] *= div;
	}

	this.vnormal = function (v)
	{
		var len = this.vlength(v);
		
		if (len>0.00005)
			this.vscale(v,1.0/len);
	}

	this.vdot = function (v1,v2)
	{
		return v1[0]*v2[0] + v1[1]*v2[1] + v1[2]*v2[2];
	}

	this.normalize_quat = function (q)
	{
		var mag = (q[0]*q[0] + q[1]*q[1] + q[2]*q[2] + q[3]*q[3]);
		if (mag>0.00005) {
			mag = 1./mag;
			for (var i=0;i<4;i++)
				q[i] *= mag;
		}
	}

	// build rotation matrix m for the quaternion q.
	this.build_rotmatrix = function(m, q)
	{
		m[0] = 1.0 - 2.0 * (q[1] * q[1] + q[2] * q[2]);
		m[1] = 2.0 * (q[0] * q[1] - q[2] * q[3]);
		m[2] = 2.0 * (q[2] * q[0] + q[1] * q[3]);
		m[3] = 0.0;
	
		m[4] = 2.0 * (q[0] * q[1] + q[2] * q[3]);
		m[5] = 1.0 - 2.0 * (q[2] * q[2] + q[0] * q[0]);
		m[6] = 2.0 * (q[1] * q[2] - q[0] * q[3]);
		m[7] = 0.0;
	
		m[8] = 2.0 * (q[2] * q[0] - q[1] * q[3]);
		m[9] = 2.0 * (q[1] * q[2] + q[0] * q[3]);
		m[10] = 1.0 - 2.0 * (q[1] * q[1] + q[0] * q[0]);
		m[11] = 0.0;
	
		m[12] = 0.0;
		m[13] = 0.0;
		m[14] = 0.0;
		m[15] = 1.0;
	}
	
	this.transform_point = function(p_in, m)
	{
		var a, b, c, d;
		
		// not really homogeneous coords
		p_in[3] = 1;
		a = m[0] * p_in[0] + m[4] * p_in[1] + m[8] * p_in[2] + m[12] * p_in[3];
		b = m[1] * p_in[0] + m[5] * p_in[1] + m[9] * p_in[2] + m[13] * p_in[3];
		c = m[2] * p_in[0] + m[6] * p_in[1] + m[10] * p_in[2] + m[14] * p_in[3];
		d = m[3] * p_in[0] + m[7] * p_in[1] + m[11] * p_in[2] + m[15] * p_in[3];
		p_in[0] = a;
		p_in[1] = b;
		p_in[2] = c;
		p_in[3] = d;
	}
}