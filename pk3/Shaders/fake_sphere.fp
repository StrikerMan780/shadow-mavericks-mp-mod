vec4 Process(vec4 color)
{
    vec2 texCoord = gl_TexCoord[0].st;
    
    vec3 fucker = normalize(vWorldNormal.xyz);
    
    return getTexel( vec2(texCoord+vec2(fucker.x,fucker.y))*0.5 );
}