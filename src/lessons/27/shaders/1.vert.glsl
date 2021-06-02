attribute float aScale;
attribute vec3 aRandomness;

uniform float uSize;
uniform float uTime;

varying vec2 vUv;
varying vec3 vColor;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  // 动画，旋转，距离中心越近转的越快
  // 获得角度
  float angle = atan(modelPosition.x, modelPosition.z);
  // 获得去中心的距离，跟y无关
  float distance2center = length(modelPosition.xz);
  // 计算每帧的角度变动
  float angleOffset = (1.0 / distance2center) * uTime * 0.2;
  // 改变角度
  angle += angleOffset;
  // 改变位置
  modelPosition.x = cos(angle) * distance2center;
  modelPosition.z = sin(angle) * distance2center;

  // 加入随机值
  modelPosition.xyz += aRandomness;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  // 处理point size
  gl_PointSize = uSize * aScale;
  // 根据远近缩放point size
  // 观察原版的PointMaterial的shader，可以找到这两句：
  // #ifdef USE_SIZEATTENUATION
  //   bool isPerspective = isPerspectiveMatrix( projectionMatrix );
  //   if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
  // #endif
  // 其中：gl_PointSize *= ( scale / - mvPosition.z )，这句可以直接用。
  // scale代表了镜头缩放，正常情况下都是1.0，mvPosition观察几个include，可以得到就是这里的viewPosition
  gl_PointSize *= (1.0 / -viewPosition.z);

  vUv = uv;
  // vertexColors = true时ShaderMaterial会传入color
  vColor = color;
}
