import * as THREE from 'three';
import vertexShader from './vertexShader.vert.glsl';
import fragmentShader from './fragmentShader.frag.glsl';

// Material
let material;

export default function initMaterial(flagTexture, gui) {
  material = new THREE.RawShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      // 波浪间隙
      uFrequency: { value: new THREE.Vector2(10, 5) },
      // 时间
      uTime: { value: 0 },
      uTexture: { value: flagTexture },
    },
  });

  gui.add(material.uniforms.uFrequency.value, 'x').min(0).max(20).step(0.1).name('uFrequency.x');
  gui.add(material.uniforms.uFrequency.value, 'y').min(0).max(20).step(0.1).name('uFrequency.y');

  return material;
}

export function updateMaterial(elapsedTime) {
  material.uniforms.uTime.value = elapsedTime;
}
