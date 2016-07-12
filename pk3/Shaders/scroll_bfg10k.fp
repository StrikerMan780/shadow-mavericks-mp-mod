uniform float timer;

vec4 Process(vec4 color)
{
	vec2 basetex = gl_TexCoord[0].st;
   
	basetex.x -= timer * 0.5;
	basetex.y -= timer * 0.25;

	vec4 finalTexel = getTexel(basetex);
	
	return finalTexel;
}