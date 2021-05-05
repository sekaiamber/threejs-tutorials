import * as THREE from 'three';
import textures from './textures';

const size = {
  width: 20,
};

export default function getObj() {
  const obj = new THREE.Mesh(
    new THREE.PlaneBufferGeometry(size.width, size.width),
    new THREE.MeshStandardMaterial({
      map: textures.grassColorTexture,
      aoMap: textures.grassAmbientOcclusionTexture,
      normalMap: textures.grassNormalTexture,
      roughnessMap: textures.grassRoughnessTexture,
    }),
  );
  obj.geometry.setAttribute('uv2', new THREE.Float32BufferAttribute(obj.geometry.attributes.uv.array, 2));
  obj.rotation.x = -Math.PI * 0.5;
  obj.position.y = 0;

  return obj;
}

export {
  size,
};
