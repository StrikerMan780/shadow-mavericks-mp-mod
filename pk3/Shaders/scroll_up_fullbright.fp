uniform float timer;

vec4 Process(vec4 color)
{
	vec2 basetex = gl_TexCoord[0].st;
   
	basetex.y += timer * 0.5;

	vec4 finalTexel = getTexel(basetex);
   
	return finalTexel;
}