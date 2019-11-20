/*
 * cf.diag5.vp.glsl
 *
 * Derek Gerstmann - derek@cycling74.com
 * Copyright 2005 - Cycling '74
 *
 * GLSL vertex program for a simple 5 tap diagonal convolution filter.
 *
 */
 
uniform float width;

varying vec2 texcoord11;
varying vec2 texcoord00;
varying vec2 texcoord02;
varying vec2 texcoord20;
varying vec2 texcoord22;

void main()
{
	// perform standard transform on vertex
	gl_Position = ftransform();

	// transform texcoord	
	vec2 texcoord = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);

	// get texcoords
	texcoord11 = texcoord;
	texcoord00 = texcoord + vec2(-width, -width);
	texcoord02 = texcoord + vec2( width, -width);
	texcoord20 = texcoord + vec2( width,  width);
	texcoord22 = texcoord + vec2(-width,  width);
}