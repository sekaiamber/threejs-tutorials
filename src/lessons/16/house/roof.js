import * as THREE from 'three';
import COLORS from '../colors';
import { size as wallSize } from './walls';

const size = {
  width: wallSize.width + 3,
  height: 1,
};

export default function getObj() {
  const obj = new THREE.Mesh(
    new THREE.ConeBufferGeometry(size.width / 2, size.height, 4),
    new THREE.MeshStandardMaterial({ color: COLORS.ROOF }),
  );
  obj.position.y = wallSize.height + size.height / 2;
  obj.rotation.y = Math.PI / 4;

  return obj;
}

export {
  size,
};
