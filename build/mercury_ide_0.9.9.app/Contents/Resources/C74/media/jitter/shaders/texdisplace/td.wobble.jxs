<jittershader name="wobble">
	<description>
	Shader for wobbling a texture
	</description>
	<param name="lightpos" type="vec3" default="0.0 0.0 4.0" />
	<param name="image" type="int" default="0" />
	<param name="freq" type="vec2" default="0.05 0.05" />
	<param name="amp" type="vec2" default="10 10" />
	<param name="radius" type="float" default="1" />
	<language name="glsl" version="1.0">
		<bind param="lightpos" program="vp" />
		<bind param="image" program="fp" />
		<bind param="freq" program="fp" />
		<bind param="amp" program="fp" />
		<bind param="radius" program="fp" />
		<program name="vp" type="vertex">
<![CDATA[
//
// Vertex shader for wobbling a texture
//
// Author: Antonio Tejada
//
// Copyright (c) 2002-2005 3Dlabs Inc. Ltd. 
//
// See 3Dlabs-License.txt for license information
//

varying float lightintensity;
uniform vec3 lightpos;

const float ks = 0.1;
const float kd  = 1.0 - ks;

void main(void)
{
    vec3 pos = vec3 (gl_ModelViewMatrix * gl_Vertex);
    vec3 tnorm      = normalize(gl_NormalMatrix * gl_Normal);
    vec3 lightVec   = normalize(lightpos - pos);
    vec3 reflectVec = reflect(-lightVec, tnorm);
    vec3 viewVec    = normalize(-pos);

    float spec      = clamp(dot(reflectVec, viewVec), 0.0, 1.0);
    spec            = pow(spec, 16.0);

    lightintensity  = kd * max(dot(lightVec, tnorm), 0.0)
                      + ks * spec;

    gl_TexCoord[0]  = gl_TextureMatrix[0] * gl_MultiTexCoord0;
    gl_Position     = ftransform();
}
]]>
		</program>
		<program name="fp" type="fragment">
<![CDATA[
//
// Fragment shader for wobbling a texture
//
// Author: Antonio Tejada
//
// Copyright (c) 2002-2005 3Dlabs Inc. Ltd. 
//
// See 3Dlabs-License.txt for license information
//

// Constants
const float C_PI    = 3.1415;
const float C_2PI   = 2.0 * C_PI;
const float C_2PI_I = 1.0 / (2.0 * C_PI);
const float C_PI_2  = C_PI / 2.0;

varying float lightintensity;

uniform float radius;
uniform vec2  freq;
uniform vec2  amp;

uniform sampler2DRect image;

void main (void)
{
    vec2  perturb;
    float rad;
    vec3  color;

    // Compute a perturbation factor for the x-direction
    rad = (gl_TexCoord[0].s + gl_TexCoord[0].t - 1.0 + radius) * freq.x;

    // Wrap to -2.0*PI, 2*PI
    rad = rad * C_2PI_I;
    rad = fract(rad);
    rad = rad * C_2PI;

    // Center in -PI, PI
    if (rad >  C_PI) rad = rad - C_2PI;
    if (rad < -C_PI) rad = rad + C_2PI;

    // Center in -PI/2, PI/2
    if (rad >  C_PI_2) rad =  C_PI - rad;
    if (rad < -C_PI_2) rad = -C_PI - rad;

    perturb.x  = (rad - (rad * rad * rad / 6.0)) * amp.x;

    // Now compute a perturbation factor for the y-direction
    rad = (gl_TexCoord[0].s - gl_TexCoord[0].t + radius) * freq.y;

    // Wrap to -2*PI, 2*PI
    rad = rad * C_2PI_I;
    rad = fract(rad);
    rad = rad * C_2PI;

    // Center in -PI, PI
    if (rad >  C_PI) rad = rad - C_2PI;
    if (rad < -C_PI) rad = rad + C_2PI;

    // Center in -PI/2, PI/2
    if (rad >  C_PI_2) rad =  C_PI - rad;
    if (rad < -C_PI_2) rad = -C_PI - rad;

    perturb.y  = (rad - (rad * rad * rad / 6.0)) * amp.y;

    color = vec3 (texture2DRect(image, perturb + gl_TexCoord[0].st));

    gl_FragColor = vec4 (color * lightintensity, 1.0);
}
]]>
	</program>
    </language>
</jittershader>