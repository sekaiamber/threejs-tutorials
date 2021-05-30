import * as THREE from 'three';
import vertexShader from './shaders/1.vert.glsl';
import fragmentShader from './shaders/1.frag.glsl';

const debugObj = {
  depthColor: '#186691',
  surfaceColor: '#9bd8ff',
};

export default function initWave(scene, gui) {
  const waterMaterial = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      uBigWavesElevation: { value: 0.2 },
      uBigWavesFrequency: { value: new THREE.Vector2(4, 1.5) },
      uBigWavesSpeed: { value: 0.75 },

      uDepthColor: { value: new THREE.Color(debugObj.depthColor) },
      uSurfaceColor: { value: new THREE.Color(debugObj.surfaceColor) },
      uColorOffset: { value: 0.08 },
      uColorMultiplier: { value: 5 },

      uSmallWavesElevation: { value: 0.15 },
      uSmallWavesFrequency: { value: 3 },
      uSmallWavesSpeed: { value: 0.2 },
      uSmallIterations: { value: 4 },
    },
    wireframe: false,
  });

  gui.add(waterMaterial, 'wireframe');
  gui.add(waterMaterial.uniforms.uBigWavesElevation, 'value').min(0).max(1).step(0.01).name('uBigWavesElevation');
  gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'x').min(0).max(10).step(0.01).name('uBigWavesFrequency.x');
  gui.add(waterMaterial.uniforms.uBigWavesFrequency.value, 'y').min(0).max(10).step(0.01).name('uBigWavesFrequency.y');
  gui.add(waterMaterial.uniforms.uBigWavesSpeed, 'value').min(0).max(4).step(0.01).name('uBigWavesSpeed');
  gui.addColor(debugObj, 'depthColor').name('uDepthColor').onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObj.depthColor);
  });
  gui.addColor(debugObj, 'surfaceColor').name('uSurfaceColor').onChange(() => {
    waterMaterial.uniforms.uSurfaceColor.value.set(debugObj.surfaceColor);
  });
  gui.add(waterMaterial.uniforms.uColorOffset, 'value').min(0).max(1).step(0.01).name('uColorOffset');
  gui.add(waterMaterial.uniforms.uColorMultiplier, 'value').min(0).max(10).step(0.01).name('uColorMultiplier');
  gui.add(waterMaterial.uniforms.uSmallWavesElevation, 'value').min(0).max(1).step(0.001).name('uSmallWavesElevation');
  gui.add(waterMaterial.uniforms.uSmallWavesFrequency, 'value').min(0).max(30).step(0.001).name('uSmallWavesFrequency');
  gui.add(waterMaterial.uniforms.uSmallWavesSpeed, 'value').min(0).max(4).step(0.001).name('uSmallWavesSpeed');
  gui.add(waterMaterial.uniforms.uSmallIterations, 'value').min(0).max(5).step(1).name('uSmallIterations');

  return [waterMaterial, (elapsedTime) => {
    waterMaterial.uniforms.uTime.value = elapsedTime;
  }];
}
