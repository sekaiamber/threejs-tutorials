import * as THREE from 'three';
import textures from '../textures';

const size = {
  width: 4,
  height: 2.5,
};

export default function getObj() {
  const obj = new THREE.Mesh(
    new THREE.BoxBufferGeometry(size.width, size.height, size.width),
    new THREE.MeshStandardMaterial({
      map: textures.bricksColorTexture,
      aoMap: textures.bricksAmbientOcclusionTexture,
      normalMap: textures.bricksNormalTexture,
      roughnessMap: textures.bricksRoughnessTexture,
    }),
  );
  obj.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(obj.geometry.attributes.uv.array, 2));
  obj.position.y = size.height / 2;

  return obj;
}

export {
  size,
};
