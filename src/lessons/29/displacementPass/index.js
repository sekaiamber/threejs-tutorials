import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import vertexShader from './1.vert.glsl';
import fragmentShader from './1.frag.glsl';

const DisplacementShader = {
  uniforms: {
    // 必须使用这个uniform名来传递上一个renderTarget的像素值
    tDiffuse: { value: null },
    uNormalMap: { value: null },
  },
  vertexShader,
  fragmentShader,
};
class DisplacementPass extends ShaderPass {
  constructor() {
    super(DisplacementShader);
  }
}

export {
  DisplacementShader,
  DisplacementPass,
};
