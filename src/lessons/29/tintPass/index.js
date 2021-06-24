import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import vertexShader from './1.vert.glsl';
import fragmentShader from './1.frag.glsl';

const TintShader = {
  uniforms: {
    // 必须使用这个uniform名来传递上一个renderTarget的像素值
    tDiffuse: { value: null },
    uTint: { value: null },
  },
  vertexShader,
  fragmentShader,
};
class TintPass extends ShaderPass {
  constructor() {
    super(TintShader);
  }
}

export {
  TintShader,
  TintPass,
};
