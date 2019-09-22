// Water shader by Striker

uniform float timer;

vec4 getTexelWrapped(vec2 coord)
{	
	return texture2DGrad(tex, fract(coord), dFdx(coord), dFdy(coord));
}

vec4 Process(vec4 color)
{
	vec2 basetex = gl_TexCoord[0].st;
	vec2 fliptex = gl_TexCoord[0].st*-1; // Flip
	
	// Scroll
	basetex.x += timer * 0.25;
	fliptex.x += timer * 0.125;
	fliptex.y += timer * 0.125;
	
	// Warp
	vec2 texCoord = gl_TexCoord[0].st;
	vec2 offset = vec2(0,0);
	const float pi = 3.14159265358979323846;
	
	// Style 1 for normal layer.
	offset.y = sin(pi * 2.0 * (texCoord.x + timer * 0.125)) * 0.1;
	offset.x = sin(pi * 2.0 * (texCoord.y + timer * 0.125)) * 0.1;
	basetex += offset;
	
	// Style 2 for flipped layer.
	float siny = sin(pi * 2.0 * (texCoord.y * 2.2 + timer * 0.75)) * 0.03;
	offset.y = siny + sin(pi * 2.0 * (texCoord.x * 0.75 + timer * 0.75)) * 0.03;
	offset.x = siny + sin(pi * 2.0 * (texCoord.x * 1.1 + timer * 0.45)) * 0.02;
	fliptex += offset;
	// End Warp
	
	// Get result
	vec4 baseTexel = getTexelWrapped(basetex);
	vec4 flipTexel = getTexelWrapped(fliptex);
	
	// Darken flipped layer.
	baseTexel.rgb *= 0.75;
	flipTexel.rgb *= 0.25;
	
	vec4 finalTexel = baseTexel+flipTexel;
	finalTexel.a = baseTexel.a;
	
	return finalTexel * color;
}