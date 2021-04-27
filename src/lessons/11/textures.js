import * as THREE from 'three';
import color from './textures/door/color.jpg';
import alpha from './textures/door/alpha.jpg';
import ambientOcclusion from './textures/door/ambientOcclusion.jpg';
import height from './textures/door/height.jpg';
import metalness from './textures/door/metalness.jpg';
import normal from './textures/door/normal.jpg';
import roughness from './textures/door/roughness.jpg';

import minTest from './textures/checkerboard-1024x1024.png';
import maxTest from './textures/checkerboard-8x8.png';
import minecraft from './textures/minecraft.png';

const RESOURCE_NAMES = {
  color: 'color',
  alpha: 'alpha',
  ambientOcclusion: 'ambientOcclusion',
  height: 'height',
  metalness: 'metalness',
  normal: 'normal',
  roughness: 'roughness',
  minTest: 'minTest',
  maxTest: 'maxTest',
  minecraft: 'minecraft',
};

const RESOURCE_FILES = {
  [RESOURCE_NAMES.color]: color,
  [RESOURCE_NAMES.alpha]: alpha,
  [RESOURCE_NAMES.ambientOcclusion]: ambientOcclusion,
  [RESOURCE_NAMES.height]: height,
  [RESOURCE_NAMES.metalness]: metalness,
  [RESOURCE_NAMES.normal]: normal,
  [RESOURCE_NAMES.roughness]: roughness,
  [RESOURCE_NAMES.minTest]: minTest,
  [RESOURCE_NAMES.maxTest]: maxTest,
  [RESOURCE_NAMES.minecraft]: minecraft,
};

export default function getTexture(resourceName, TextureClass = THREE.Texture) {
  const file = RESOURCE_FILES[resourceName];
  if (!file) return null;
  const image = new Image();
  const texture = new TextureClass(image);
  image.addEventListener('load', () => {
    texture.needsUpdate = true;
  });
  image.src = file;
  return texture;
}

export {
  RESOURCE_NAMES,
  RESOURCE_FILES,
};
