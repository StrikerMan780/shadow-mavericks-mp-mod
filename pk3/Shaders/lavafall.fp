// Lavafall shader by Striker
uniform float timer;

vec4 ProcessLight(vec4 color)
{
	vec4 brightpix;
	brightpix.rgba = vec4(1.0, 1.0, 1.0, 1.0);
	return vec4(min (color.rgb + brightpix.rgb, 1.0), color.a);
}

vec4 getTexelWrapped(vec2 coord)
{	
	return texture2DGrad(tex, fract(coord), dFdx(coord), dFdy(coord));
}

vec4 Process(vec4 color)
{
	vec2 basetex = gl_TexCoord[0].st;
	vec2 fliptex = gl_TexCoord[0].st*-1; // Flip
	
	// Scroll
	basetex.y -= timer * 0.25;
	fliptex.y += timer * 0.50;
	
	// Get result
	vec4 baseTexel = getTexelWrapped(basetex);
	vec4 flipTexel = getTexelWrapped(fliptex);
	
	// Darken layers.
	baseTexel.rgb *= 0.75;
	flipTexel.rgb *= 0.25;
	
	vec4 finalTexel = baseTexel+flipTexel;
	finalTexel.a = baseTexel.a * color.a;
	
	return finalTexel;
}