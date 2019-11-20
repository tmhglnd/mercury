///////////////////////////////////////////////////////////////////////////////
//
// Copyright 2003, ATI Technologies, Inc., All rights reserved.
//
// Permission to use, copy, modify, and distribute this software and its 
// documentation for any purpose and without fee is hereby granted,
// provided that the above copyright notice appear in all copies and derivative
// works and that both the copyright notice and this permission notice appear in
// support documentation, and that the name of ATI Technologies, Inc. not be used
// in advertising or publicity pertaining to distribution of the software without
// specific, written prior permission.
//
///////////////////////////////////////////////////////////////////////////////

/*
 * GL SL basic vertex shader
 * (using Ashli native global varying variables)
 */

// vertex to fragment shader io
varying vec4 P;
varying vec4 Pdev;
varying vec3 N;
varying vec3 I;
varying vec4 Cs;
varying vec4 Os;
varying vec4 T;
varying vec2 TC;

/*
varying vec4 dPdu;
varying vec4 dPdv;
varying vec4 P10, P01;
varying vec3 N10, N01;
varying vec4 dPdu10, dPdu01, dPdv10, dPdv01;
varying vec4 Pobj, Pobj10, Pobj01;
varying vec3 Nobj, Nobj10, Nobj01;
varying vec4 Plight0_1_0;
varying vec4 Plight0_2_0;
varying vec4 Plight0_3_0;
varying vec4 Plight0_4_0;
varying vec4 Plight0_5_0;
varying vec4 Plight0_6_0;
varying vec4 Plight0_7_0;
varying vec4 Plight0_8_0;
*/

// entry point
void 
main()
{
    // position in eye space
    P = gl_ModelViewMatrix * gl_Vertex;

    // position in clip space
    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;

    // position in normalized device space (0 to 1)
    Pdev = gl_Position / gl_Position[3];
    Pdev = vec4 (.5, .5, 1., 1.) * (Pdev + vec4 (1., 1., .0, .0));

    // normal transform (transposed model-view inverse)
    N = gl_NormalMatrix * gl_Normal;

    // incident vector
    I = vec3(P - vec4 (0));

    // color
    Cs = gl_Color;
    Os = gl_SecondaryColor;

    // texture
    T = gl_TextureMatrix[0] * gl_MultiTexCoord0;
	TC = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	
/*
    // the following is left for reference, but commented out to
    // decrease program instruction count for more HW support
    // tangent and binormal
    dPdu = gl_ModelViewMatrix * gl_MultiTexCoord1;
    dPdv = gl_ModelViewMatrix * gl_MultiTexCoord2;

    // neighbors
    P10 = gl_ModelViewMatrix * gl_MultiTexCoord1;
    P01 = gl_ModelViewMatrix * gl_MultiTexCoord2;
    //N10 = gl_NormalMatrix * gl_MultiTexCoord3;
    //N01 = gl_NormalMatrix * gl_MultiTexCoord4;

    // tangent and binormal neighbors
    dPdu10 = gl_ModelViewMatrix * gl_MultiTexCoord4;
    dPdu01 = gl_ModelViewMatrix * gl_MultiTexCoord5;
    dPdv10 = gl_ModelViewMatrix * gl_MultiTexCoord6;
    dPdv01 = gl_ModelViewMatrix * gl_MultiTexCoord7;

    // position and neighbors in object space
    Pobj = gl_Vertex;
    Pobj10 = gl_MultiTexCoord1;
    Pobj01 = gl_MultiTexCoord2;

    // normal and neighbors in object space
    Nobj = gl_Normal;
    //Nobj10 = gl_MultiTexCoord3;
    //Nobj01 = gl_MultiTexCoord4; 

    // shadow
    vec4 lgt1 = gl_TextureMatrix[0] * gl_Vertex;
    vec4 lgt2 = gl_TextureMatrix[1] * gl_Vertex;
    vec4 lgt3 = gl_TextureMatrix[2] * gl_Vertex;
    vec4 lgt4 = gl_TextureMatrix[3] * gl_Vertex;
    vec4 lgt5 = gl_TextureMatrix[4] * gl_Vertex;
    vec4 lgt6 = gl_TextureMatrix[5] * gl_Vertex;
    vec4 lgt7 = gl_TextureMatrix[6] * gl_Vertex;
    vec4 lgt8 = gl_TextureMatrix[7] * gl_Vertex;

    Plight0_1_0 = lgt1 * vec4 (.5, .5, 1., 1.) + 
                  lgt1[3] * vec4 (.5, .5, .0, .0);
    Plight0_2_0 = lgt2 * vec4 (.5, .5, 1., 1.) + 
                  lgt2[3] * vec4 (.5, .5, .0, .0);
    Plight0_3_0 = lgt3 * vec4 (.5, .5, 1., 1.) + 
                  lgt3[3] * vec4 (.5, .5, .0, .0);
    Plight0_4_0 = lgt4 * vec4 (.5, .5, 1., 1.) + 
                  lgt4[3] * vec4 (.5, .5, .0, .0);
    Plight0_5_0 = lgt5 * vec4 (.5, .5, 1., 1.) + 
                  lgt5[3] * vec4 (.5, .5, .0, .0);
    Plight0_6_0 = lgt6 * vec4 (.5, .5, 1., 1.) + 
                  lgt6[3] * vec4 (.5, .5, .0, .0);
    Plight0_7_0 = lgt7 * vec4 (.5, .5, 1., 1.) + 
                  lgt7[3] * vec4 (.5, .5, .0, .0);
    Plight0_8_0 = lgt8 * vec4 (.5, .5, 1., 1.) + 
                  lgt8[3] * vec4 (.5, .5, .0, .0);

*/
}


