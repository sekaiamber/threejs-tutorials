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


function getItem({ color, position }) {
  // const obj = new THREE.Mesh(
  //   geo,
  //   material,
  // );
  // const scale = Math.random() * 0.4 + 0.8;
  // obj.scale.set(scale, scale, scale);
  // const postion = getPosizion();
  // obj.position.set(postion[0], 0.3, postion[1]);
  // obj.rotation.y = (Math.random() - 0.5) * 0.4;
  // obj.rotation.z = (Math.random() - 0.5) * 0.4;

  const obj = new THREE.PointLight(color, 2, 3);
  return obj;
}

export default function getObj(scene) {
  const ghost1 = getItem({
    color: '#ff00ff',
  });
  scene.add(ghost1);
  const ghost2 = getItem({
    color: '#00ffff',
  });
  scene.add(ghost2);
  const ghost3 = getItem({
    color: '#ffff00',
  });
  scene.add(ghost3);

  const update = (elapsedTime) => {
    const ghost1Angle = elapsedTime * 0.5;
    ghost1.position.x = Math.cos(ghost1Angle) * 4;
    ghost1.position.z = Math.sin(ghost1Angle) * 4;
    ghost1.position.y = Math.sin(elapsedTime * 3);

    const ghost2Angle = -elapsedTime * 0.32;
    ghost2.position.x = Math.cos(ghost2Angle) * 5;
    ghost2.position.z = Math.sin(ghost2Angle) * 5;
    ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);

    const ghost3Angle = -elapsedTime * 0.18;
    ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32));
    ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5));
    ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5);
  };

  return [[ghost1, ghost2, ghost3], update];
}

export {
  size,
};
