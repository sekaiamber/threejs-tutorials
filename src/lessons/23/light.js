import * as THREE from 'three';

export default function initLight(scene, gui) {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
  directionalLight.position.set(0.25, 3, -2.25);
  // 启用阴影
  directionalLight.castShadow = true;
  directionalLight.shadow.camera.far = 15;
  directionalLight.shadow.mapSize.set(1024, 1024);
  directionalLight.shadow.normalBias = 0.05;
  scene.add(directionalLight);

  // const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  // scene.add(directionalLightCameraHelper);

  const folder = gui.addFolder('Light');
  folder.add(directionalLight, 'intensity').min(0).max(10).step(0.01).name('intensity');
  folder.add(directionalLight.position, 'x').min(-5).max(5).step(0.01).name('x');
  folder.add(directionalLight.position, 'y').min(-5).max(5).step(0.01).name('y');
  folder.add(directionalLight.position, 'z').min(-5).max(5).step(0.01).name('z');
}
