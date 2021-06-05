/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { staticProxy } from '../../utils';
import vertexShader from './shaders/model/vertex';
import fragmentShader from './shaders/1.frag.glsl';


// Textures

const customUniforms = {
  uTime: { value: 0 },
};

function onBeforeCompile(shader) {
  shader.uniforms.uTime = customUniforms.uTime;

  shader.vertexShader = vertexShader(shader.vertexShader);
}

export default function getMaterial(textureLoader) {
  const mapTexture = textureLoader.load(staticProxy('/28/models/LeePerrySmith/color.jpg'));
  mapTexture.encoding = THREE.sRGBEncoding;

  const normalTexture = textureLoader.load(staticProxy('/28/models/LeePerrySmith/normal.jpg'));
  // Material
  const material = new THREE.MeshStandardMaterial({
    map: mapTexture,
    normalMap: normalTexture,
  });
  material.onBeforeCompile = onBeforeCompile;

  return material;
}

export function update(elapsedTime) {
  customUniforms.uTime.value = elapsedTime;
}
