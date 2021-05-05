import * as THREE from 'three';
import COLORS from './colors';
import { size as floorSize } from './floor';
import { size as wallSize } from './house/walls';

const size = {
  width: 0.6,
  height: 0.8,
  depth: 0.2,
};

const geo = new THREE.BoxBufferGeometry(size.width, size.height, size.depth);
const material = new THREE.MeshStandardMaterial({ color: COLORS.GRAVE });

// 获得位置
// 因为不能超出floor范围，也不能在小屋的范围内，所以就相当于要落到一个外径等于floor一半，内径等于小屋斜边一半的圆环内
const maxR = floorSize.width / 2;
const minR = wallSize.width * 1.414 / 2;
const widthR = maxR - minR;
function getPosizion() {
  const r = Math.random() * widthR + minR;
  const theta = Math.random() * 2 * Math.PI;
  const x = Math.cos(theta) * r;
  const y = Math.sin(theta) * r;
  return [x, y];
}


function getItem() {
  const obj = new THREE.Mesh(
    geo,
    material,
  );
  const scale = Math.random() * 0.4 + 0.8;
  obj.scale.set(scale, scale, scale);
  const postion = getPosizion();
  obj.position.set(postion[0], 0.3, postion[1]);
  obj.rotation.y = (Math.random() - 0.5) * 0.4;
  obj.rotation.z = (Math.random() - 0.5) * 0.4;
  return obj;
}

export default function getObj() {
  const g = new THREE.Group();
  const gravesObjs = [];
  for (let i = 0; i < 40; i += 1) {
    const grave = getItem();
    gravesObjs.push(grave);
    g.add(grave);
  }
  return [g, gravesObjs];
}

export {
  size,
};
