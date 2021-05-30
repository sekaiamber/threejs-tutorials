uniform vec3 uDepthColor;
uniform vec3 uSurfaceColor;
uniform float uColorOffset;
uniform float uColorMultiplier;

varying vec2 vUv;
varying float vElevation;

// float random2d(vec2 coord) {
//   return fract(sin(dot(coord.xy, vec2(12.9898, 78.233))) * 43758.5453);
// }

// vec2 rotate2d(vec2 origin, float rotation, vec2 mid) {
//   return vec2(
//   cos(rotation) * (origin.x - mid.x) + sin(rotation) * (origin.y - mid.y) + mid.x,
//   cos(rotation) * (origin.y - mid.y) - sin(rotation) * (origin.x - mid.x) + mid.y
//   );
// }

// const float PI = 3.14159265359;

void main() {
  float elevation = (vElevation + uColorOffset) * uColorMultiplier;

  vec3 mixedColor = mix(uDepthColor, uSurfaceColor, elevation);

  gl_FragColor = vec4(mixedColor, 1.0);
}