import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import vertexShader from './1.vert.glsl';
import fragmentShader from './1.frag.glsl';

const WaverShader = {
  uniforms: {
    // 必须使用这个uniform名来传递上一个renderTarget的像素值
    tDiffuse: { value: null },
    uTime: { value: 0 },
  },
  vertexShader,
  fragmentShader,
};
class WaverPass extends ShaderPass {
  constructor() {
    super(WaverShader);
  }
}

export {
  WaverShader,
  WaverPass,
};
