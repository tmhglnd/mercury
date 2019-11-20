/*
 *
 * Andrew Benson - andrewb@cycling74.com
 * Copyright 2005 - Cycling '74
 *
 * GLSL vertex program for doing a standard vertex transform
 * with texture coordinates, also passing the texture dimensions to the fragment shader.
 *
 */

varying vec2 texcoord0;
varying vec2 texcoord1;
varying vec2 texdim0;
varying vec2 texdim1;
varying vec2 texorient0;
varying vec2 texorient1;

void main()
{
    // perform standard transform on vertex
    gl_Position = ftransform();

    // transform texcoords
    texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
    texcoord1 = vec2(gl_TextureMatrix[1] * gl_MultiTexCoord1);
    // extract the x and y scalars from the texture matrix to determine dimensions
    texdim0 = vec2 (abs(gl_TextureMatrix[0][0][0]),abs(gl_TextureMatrix[0][1][1]));
    texdim1 = vec2 (abs(gl_TextureMatrix[1][0][0]),abs(gl_TextureMatrix[1][1][1]));
    // extract the sign for orientation
    texorient0 = vec2 (gl_TextureMatrix[0][0][0]/texdim0.x,gl_TextureMatrix[0][1][1]/texdim0.y);
    texorient1 = vec2 (gl_TextureMatrix[1][0][0]/texdim1.x,gl_TextureMatrix[1][1][1]/texdim1.y);
} 