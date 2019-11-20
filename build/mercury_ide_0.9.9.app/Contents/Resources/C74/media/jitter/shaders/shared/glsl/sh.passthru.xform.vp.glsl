/*
 *
 * Derek Gerstmann - derek@cycling74.com
 * Copyright 2005 - Cycling '74
 *
 * GLSL vertex program for doing a standard vertex transform and 
 * with texture coordinates.
 *
 */
 
varying vec2 texcoord0;
varying vec2 texcoord1;
varying vec2 texcoord2;
varying vec2 texcoord3;
varying vec2 texcoord4;
varying vec2 texcoord5;
varying vec2 texcoord6;
varying vec2 texcoord7;

void main()
{
	// perform standard transform on vertex
	gl_Position = ftransform();
    
	// transform texcoords
	texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	texcoord1 = vec2(gl_TextureMatrix[1] * gl_MultiTexCoord1);
	texcoord2 = vec2(gl_TextureMatrix[2] * gl_MultiTexCoord2);
	texcoord3 = vec2(gl_TextureMatrix[3] * gl_MultiTexCoord3);
	texcoord4 = vec2(gl_TextureMatrix[4] * gl_MultiTexCoord4);
	texcoord5 = vec2(gl_TextureMatrix[5] * gl_MultiTexCoord5);
	texcoord6 = vec2(gl_TextureMatrix[6] * gl_MultiTexCoord6);
	texcoord7 = vec2(gl_TextureMatrix[7] * gl_MultiTexCoord7);
}