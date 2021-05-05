import * as THREE from 'three';
import COLORS from '../colors';

const size = {
  width: 1,
};

const geo = new THREE.SphereBufferGeometry(size.width, 16, 16);
const material = new THREE.MeshStandardMaterial({ color: COLORS.BUSH });

function getBush({ scale, position }) {
  const obj = new THREE.Mesh(
    geo,
    material,
  );
  obj.scale.set(...scale);
  obj.position.set(...position);
  return obj;
}

export default function getObj() {
  const g = new THREE.Group();
  const obj1 = getBush({
    scale: [0.5, 0.5, 0.5],
    position: [0.8, 0.2, 2.2],
  });
  const obj2 = getBush({
    scale: [0.25, 0.25, 0.25],
    position: [1.4, 0.1, 2.1],
  });
  const obj3 = getBush({
    scale: [0.4, 0.4, 0.4],
    position: [-0.8, 0.1, 2.2],
  });
  const obj4 = getBush({
    scale: [0.15, 0.15, 0.15],
    position: [-1, 0.05, 2.6],
  });

  g.add(obj1, obj2, obj3, obj4);

  return [g, [obj1, obj2, obj3, obj4]];
}

export {
  size,
};
