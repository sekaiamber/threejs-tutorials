import * as THREE from 'three';
import { size as wallSize } from './walls';
import textures from '../textures';

const size = {
  width: 2.2,
  height: 2.2,
};

export default function getObj() {
  const obj = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(size.width, size.height, 50, 50),
    new THREE.MeshStandardMaterial({
      map: textures.doorColorTexture,
      transparent: true,
      alphaMap: textures.doorAlphaTexture,
      // 不要忘记uv2
      aoMap: textures.doorAmbientOcclusionTexture,
      // 不要忘记设置segments
      displacementMap: textures.doorHeightTexture,
      displacementScale: 0.1,
      normalMap: textures.doorNormalTexture,
      metalnessMap: textures.doorMetalnessTexture,
      roughnessMap: textures.doorRoughnessTexture,
    }),
  );
  obj.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(obj.geometry.attributes.uv.array, 2));
  obj.position.y = size.height / 2;
  obj.position.z = wallSize.width / 2 + 0.01;

  return obj;
}

export {
  size,
};
