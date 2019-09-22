// This isn't really meant to make any sense, I just threw shit at a wall until I found an effect I liked.
// It'll have to do for now until I can have access to the features I need to make something more realistic.
vec4 Process( vec4 color )
{	
	vec3 pos = gl_FragCoord.xyz;
	pos.z = gl_FragCoord.z / gl_FragCoord.w;
	
	// Intentionally static.
	vec3 eyedir;
	eyedir.x = 4.0;
	eyedir.y = 1.0;
	eyedir.z = 2.0;
	
    vec3 x = dFdx(pos.xyz);
    vec3 y = dFdy(pos.xyz);
    vec3 normal = normalize(cross(x,y));

    vec3 norm = reflect(eyedir.xyz,normalize(normal.xyz));
	
	vec2 basetex = gl_TexCoord[0].st;
	basetex.xy += (norm.xz*0.1);
	//basetex.xy *= 0.5;
	
    return getTexel(basetex)*color;
}