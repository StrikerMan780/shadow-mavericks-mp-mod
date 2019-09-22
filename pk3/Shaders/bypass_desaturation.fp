uniform float timer;

vec4 getTexel_noDesat(vec2 st)
{
	vec4 texel = texture2D(tex, st);

	return texel;
}

vec4 Process(vec4 color)
{
	vec2 basetex = gl_TexCoord[0].st;
	vec4 finalTexel = getTexel_noDesat(basetex);
	return finalTexel;
}