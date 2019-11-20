varying vec2 texcoord0;

void main( void )
{
	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
	texcoord0 = vec2(gl_TextureMatrix[0] * gl_MultiTexCoord0);
}
