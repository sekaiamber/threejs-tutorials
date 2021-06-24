uniform sampler2D tDiffuse;
uniform sampler2D uNormalMap;

varying vec2 vUv;

void main() {
  vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;

  vec2 newUv = vUv + normalColor.xy * 0.1;

  vec4 color = texture2D(tDiffuse, newUv);

  // 增加光照反射
  // 这里获得一个光照方向的单位向量
  vec3 lightDirection = normalize(vec3(-1.0, 1.0, 0.0));
  // clamp的作用是防止产生 >1和<1的值，否则会出现光照和阴影过强的情况
  float lightness = clamp(
    // dot能够判断，两个向量如果相对，那么返回1，相反则返回-1，垂直返回0
    dot(normalColor, lightDirection),
    0.0,
    1.0
  );
  color.rgb += lightness * 2.0;

  gl_FragColor = color;
}
