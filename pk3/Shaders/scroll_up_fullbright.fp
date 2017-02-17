uniform float timer;

vec4 ProcessLight(vec4 color)
{
	vec4 brightpix;
	brightpix.rgba = vec4(1.0, 1.0, 1.0, 1.0);
	return vec4(min (color.rgb + brightpix.rgb, 1.0), color.a);
}

vec4 Process(vec4 color)
{
	vec2 basetex = gl_TexCoord[0].st;
   
	basetex.y += timer * 0.5;

	vec4 finalTexel = getTexel(basetex);
   
	return finalTexel;
}