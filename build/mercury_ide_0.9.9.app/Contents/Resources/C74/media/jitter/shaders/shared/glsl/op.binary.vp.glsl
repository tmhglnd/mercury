varying vec2 texcoord0;
varying vec2 texcoord1;

void main( void )
{
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
	texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
	texcoord1 = vec2(gl_TextureMatrix[1] * gl_MultiTexCoord1);
}
