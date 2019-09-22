uniform float timer;

vec4 ProcessLight(vec4 color)
{
	vec4 brightpix;
	brightpix.rgba = vec4(1.0, 1.0, 1.0, 1.0);
	return vec4(min (color.rgb + brightpix.rgb, 1.0), color.a);
}

vec4 Process(vec4 color)
{
	vec2 uv = gl_TexCoord[0].xy;
	
	// Generate noisy x value
	vec2 n0Uv = vec2(uv.x, uv.y + timer*0.69);
	vec2 n1Uv = vec2(uv.x, uv.y*2.0 + timer*0.12);
	vec2 n2Uv = vec2(uv.x, uv.y*3.0 + timer*0.61);
	
	// Wrap Y coords
	n0Uv.y = fract(n0Uv.y);
	n1Uv.y = fract(n1Uv.y);
	n2Uv.y = fract(n2Uv.y);
	
	float n0 = (getTexel(n0Uv).w-0.5)*2.0;
	float n1 = (getTexel(n1Uv).w-0.5)*2.0;
	float n2 = (getTexel(n2Uv).w-0.5)*2.0;
	float noiseA = clamp(n0 + n1 + n2, -1.0, 1.0);

	// Generate noisy y value
	vec2 n0UvB = vec2(uv.x, uv.y + timer*0.27);
	vec2 n1UvB = vec2(uv.x, uv.y*1.9 + timer*0.61);
	vec2 n2UvB = vec2(uv.x, uv.y*2.5 + timer*0.51);
	
	// Wrap Y coords
	n0UvB.y = fract(n0UvB.y);
	n1UvB.y = fract(n1UvB.y);
	n2UvB.y = fract(n2UvB.y);
	
	float n0B = (getTexel(n0UvB).w-0.5)*2.0;
	float n1B = (getTexel(n1UvB).w-0.5)*2.0;
	float n2B = (getTexel(n2UvB).w-0.5)*2.0;
	float noiseB = clamp(n0B + n1B + n2B, -1.0, 1.0);
	
	vec2 finalNoise = vec2(noiseA, noiseB);
	float perturb = (1.0 - uv.y) * 0.35 + 0.02;
	finalNoise = (finalNoise * perturb) + uv - 0.02;
	
	// Prepare flame color for final noise coords.
	vec4 flamecolor = getTexel(finalNoise);
	
	// Desaturate
	float gray = (flamecolor.r * 0.3 + flamecolor.g * 0.56 + flamecolor.b * 0.14);	
	flamecolor = mix(vec4(gray,gray,gray,flamecolor.a), flamecolor, 0.0);
	
	// Apply color
	flamecolor.r *= 0.25;
	flamecolor.g *= 0.25;
	flamecolor.b *= 0.25;
	//flamecolor.a = 1.0;
	
	// Combine noise blue channel and base blue channel to get final flame shape.
	flamecolor.a = (getTexel(finalNoise).b*2.0)*getTexel(uv).b;
	
	// Multiply color by alpha, to fade to black if line isn't transparent and to increase contrast.
	flamecolor.rgb *= flamecolor.a;
	flamecolor.a = 1.0;
	
	return flamecolor;
}