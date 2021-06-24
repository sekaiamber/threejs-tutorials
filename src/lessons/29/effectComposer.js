import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// 默认的渲染通道
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
// 类似PS的单色色彩半调效果
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
// 类似显示器故障效果
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
// RGB分离效果，是通过shader实现的
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
// 类似显示器故障效果
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';


// 抗锯齿
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';

// 自定义效果1：着色器
import { TintPass } from './tintPass';
// 自定义效果2：波浪形扭曲效果
import { WaverPass } from './waverPass';
// 自定义效果3：位移效果
import { DisplacementPass } from './displacementPass';

import { staticProxy } from '../../utils';

export default function getEffectComposer(options) {
  const {
    renderer,
    pixelRatio,
    width,
    height,
    scene,
    camera,
    textureLoader,
  } = options;

  // 这里要新使用一个renderTarget
  // 因为传入的render使用了sRGB编码
  // 而默认提供的renderTarget却使用线性编码
  // 观察EffectComposer的代码，并不提供修改默认renderTarget的方式，所以只能自己实现一个，下面的配置是抄过来的，但是增加了编码
  const renderTarget = new THREE.WebGLRenderTarget(
    // 尺寸随便写，因为后面setSize会修改的
    800,
    600,
    {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      stencilBuffer: false,
      encoding: THREE.sRGBEncoding,
    },
  );

  const effectComposer = new EffectComposer(renderer, renderTarget);
  effectComposer.setPixelRatio(pixelRatio);
  effectComposer.setSize(width, height);

  const renderPass = new RenderPass(scene, camera);
  effectComposer.addPass(renderPass);

  const dotScreenPass = new DotScreenPass();
  dotScreenPass.enabled = false;
  effectComposer.addPass(dotScreenPass);

  const glitchPass = new GlitchPass();
  glitchPass.enabled = false;
  effectComposer.addPass(glitchPass);

  const rgbShiftPass = new ShaderPass(RGBShiftShader);
  rgbShiftPass.enabled = false;
  effectComposer.addPass(rgbShiftPass);

  const unrealBloomPass = new UnrealBloomPass();
  unrealBloomPass.enabled = false;
  effectComposer.addPass(unrealBloomPass);

  const tintPass = new TintPass();
  tintPass.material.uniforms.uTint.value = new THREE.Vector3(0.2, 0, 0);
  tintPass.enabled = false;
  effectComposer.addPass(tintPass);

  const waverPass = new WaverPass();
  waverPass.enabled = false;
  effectComposer.addPass(waverPass);

  const displacementPass = new DisplacementPass();
  displacementPass.material.uniforms.uNormalMap.value = textureLoader.load(staticProxy('/29/textures/interfaceNormalMap.png'));
  // displacementPass.enabled = false;
  effectComposer.addPass(displacementPass);


  // 关于抗锯齿，基于跟上述编码类似的原因，效果合成器不继承原本的抗锯齿选项（大多数时候，在PixelRatio大于1的情况下，可以忽视抗锯齿）
  // 但是在PixelRatio为1的时候，即屏幕比较老的情况下，需要进行抗锯齿。
  // 通常情况下可以无视这个，大不了在低端屏幕上放弃体验。
  // 但是仍然有方案。
  // 1. 最简单的方案是使用WebGLMultisampleRenderTargetl来替代WebGLRenderTarget，但是这必须浏览器支持WebGL 2.0，具体支持信息查看caniuse。
  // 2. 另一种是使用处理通道，因为render使用的是MSAA抗锯齿方案，但是PASS中只有其他选择，例如FXAA、SMAA等。并且将此通道放在最后。
  if (renderer.getPixelRatio() === 1 && renderer.capabilities.isWebGL2 === false) {
    const smaaPass = new SMAAPass();
    effectComposer.addPass(smaaPass);
  }

  const handleEffectComposerResize = (newWidth, newHeight) => {
    effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    effectComposer.setSize(newWidth, newHeight);
  };

  const handleEffectComposerUpdate = (elapsedTime) => {
    waverPass.material.uniforms.uTime.value = elapsedTime;
  };

  return [effectComposer, handleEffectComposerResize, handleEffectComposerUpdate];
}
