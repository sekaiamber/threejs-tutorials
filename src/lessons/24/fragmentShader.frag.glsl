precision mediump float;

uniform sampler2D uTexture;

// 从顶点着色器传参
varying float vRamdom;
varying vec2 vUv;
varying float vElevation;

void main() {
  vec4 textureColor = texture2D(uTexture, vUv);
  // 这里只操作rgb
  textureColor.rgb *= vElevation * 2.0 + 0.5;

  // gl_FragColor = vec4(1.0, vRamdom, 1.0, 1.0);
  gl_FragColor = textureColor;
}
