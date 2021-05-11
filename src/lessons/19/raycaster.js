/* eslint-disable no-param-reassign */
import * as THREE from 'three';

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const mouse = new THREE.Vector2();

window.addEventListener('mousemove', (event) => {
  mouse.x = event.clientX / sizes.width * 2 - 1;
  mouse.y = -(event.clientY / sizes.height) * 2 + 1;
}, false);

let currnetIntersectObject = null;

function setCurrnetIntersect(intersectObject) {
  if (intersectObject !== currnetIntersectObject) {
    if (currnetIntersectObject) {
      console.log('leave', currnetIntersectObject);
    }
    if (intersectObject) {
      console.log('enter', intersectObject);
    }
    currnetIntersectObject = intersectObject;
  }
}

window.addEventListener('click', () => {
  if (currnetIntersectObject) {
    console.log('click', currnetIntersectObject);
  }
});

export function update(elapsedTime, { object1, object2, object3, raycaster, camera }) {
  // 基础使用
  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(10, 0, 0).normalize();

  // raycaster.set(rayOrigin, rayDirection);

  // 鼠标hover
  raycaster.setFromCamera(mouse, camera);

  const objs = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objs);

  objs.forEach((obj) => {
    obj.material.color.set('#ff0000');
  });

  intersects.forEach((intersect) => {
    intersect.object.material.color.set('#0000ff');
  });

  if (intersects.length) {
    setCurrnetIntersect(intersects[0].object);
  } else {
    setCurrnetIntersect(null);
  }
}

export default function initRaycaster(scene, gui, { object1, object2, object3 }) {
  const raycaster = new THREE.Raycaster();
  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(10, 0, 0).normalize();

  // raycaster.set(rayOrigin, rayDirection);

  // const intersect = raycaster.intersectObject(object1);
  // console.log(intersect);
  // const intersects = raycaster.intersectObjects([object1, object2, object3]);
  // console.log(intersects);

  return raycaster;
}
