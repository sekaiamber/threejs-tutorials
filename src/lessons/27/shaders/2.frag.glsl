varying vec3 vColor;

void main() {
  // // 实心圆
  // // 获得点渲染坐标距离中心位置
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // // 将距离大于0.5的变为0，小于0.5变为1
  // strength = 1.0 - step(0.5, strength);

  // // 线性渐变圆
  // // 获得点渲染坐标距离中心位置
  // float strength = distance(gl_PointCoord, vec2(0.5));
  // // 将位置*2，并用1取反，使得边缘为0，中心为1
  // strength = 1.0 - strength * 2.0;

  // 急速衰减的光源
  // 获得点渲染坐标距离中心位置
  float strength = distance(gl_PointCoord, vec2(0.5));
  // 取反后立即pow
  strength = pow(1.0 - strength, 10.0);

  // 混合颜色
  vec3 mixedColor = mix(vec3(0.0), vColor, strength);

  gl_FragColor = vec4(mixedColor, 1.0);
}
