/*
 * cf.box8.vp.glsl
 *
 * Derek Gerstmann - derek@cycling74.com
 * Copyright 2005 - Cycling '74
 *
 * GLSL vertex program for an 8 or 9 point box convolution filter
 *
 */
uniform float width;

varying vec2 texcoord00;
varying vec2 texcoord01;
varying vec2 texcoord02;
varying vec2 texcoord10;
varying vec2 texcoord12;
varying vec2 texcoord20;
varying vec2 texcoord21;
varying vec2 texcoord22;

void main()
{
	// perform standard transform on vertex
	gl_Position = ftransform();

	// transform texcoord	
	vec2 texcoord = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);

	// get sample positions
	texcoord00 = texcoord + vec2(-width, -width);
	texcoord01 = texcoord + vec2( 0,       -width);
	texcoord02 = texcoord + vec2( width, -width);
	texcoord10 = texcoord + vec2(-width,  0);
	texcoord12 = texcoord + vec2( width,  0);
	texcoord20 = texcoord + vec2(-width,  width);
	texcoord21 = texcoord + vec2( 0,        width);
	texcoord22 = texcoord + vec2( width,  width);
}


