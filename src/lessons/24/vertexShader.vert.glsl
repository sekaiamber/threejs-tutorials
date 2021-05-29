uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
// 通过material.uniform可以传着色器全局常量
uniform vec2 uFrequency;
uniform float uTime;

attribute vec3 position;
// 通过bufferGeometry.setAttribute可以传参进入shader
attribute float aRamdom;
attribute vec2 uv;

// 向片元着色器传参
varying float vRamdom;
varying vec2 vUv;
varying float vElevation;

void main(){
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  // 这里修改模型的z坐标，使渲染出来的平面呈现波浪形
  float elevation = sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
  elevation += sin(modelPosition.y * uFrequency.y - uTime) * 0.1;
  modelPosition.z = elevation;
  // 通过aRamdom可以打造一种皱纹效果
  // modelPosition.z += aRamdom * 0.1;

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;

  gl_Position = projectionPosition;

  vRamdom = aRamdom;
  vUv = uv;
  vElevation = elevation;
}
