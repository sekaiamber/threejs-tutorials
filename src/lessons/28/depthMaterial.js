/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import vertexShader from './shaders/depth/vertex';

const customUniforms = {
  uTime: { value: 0 },
};

function onBeforeCompile(shader) {
  shader.uniforms.uTime = customUniforms.uTime;

  shader.vertexShader = vertexShader(shader.vertexShader);
}


export default function getMaterial() {
  const depthMaterial = new THREE.MeshDepthMaterial({
    depthPacking: THREE.RGBADepthPacking,
  });
  depthMaterial.onBeforeCompile = onBeforeCompile;

  return depthMaterial;
}

export function update(elapsedTime) {
  customUniforms.uTime.value = elapsedTime;
}
