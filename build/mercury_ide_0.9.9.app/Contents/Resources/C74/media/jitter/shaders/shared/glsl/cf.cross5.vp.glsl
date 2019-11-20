/*
 * cf.cross5.vp.glsl
 *
 * Derek Gerstmann - derek@cycling74.com
 * Copyright 2005 - Cycling '74
 *
 * GLSL vertex program for a 5 point cross convolution filter.
 *
 */

uniform float width;
uniform vec4 offset;

varying vec2 texcoord01;
varying vec2 texcoord10;
varying vec2 texcoord11;
varying vec2 texcoord12;
varying vec2 texcoord21;

void main()
{
	// perform standard transform on vertex
	gl_Position = ftransform();

	// transform texcoord	
	vec2 texcoord = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	
	// get sample positions
	texcoord01 = texcoord + vec2(0, -width);
	texcoord10 = texcoord + vec2(-width, 0);
	texcoord11 = texcoord;
	texcoord12 = texcoord + vec2(width, 0);
	texcoord21 = texcoord + vec2(0, width);
}