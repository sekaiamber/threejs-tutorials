import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  // OrthographicCamera,
  WebGLRenderer,
} = THREE;

const sizes = {
  width: 800,
  height: 600,
};


const canvas = document.getElementById('scene');

// 创建场景
const scene = new Scene();

const mesh = new Mesh(
  new BoxGeometry(1, 1, 1, 5, 5, 5),
  new MeshBasicMaterial({ color: 'red' }),
);
scene.add(mesh);

// 创建相机
const aspectRatio = sizes.width / sizes.height;
const camera = new PerspectiveCamera(75, aspectRatio);
// const camera = new OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1);
camera.position.z = 3;
camera.lookAt(mesh.position);
scene.add(camera);

// 增加控制器
const controls = new OrbitControls(camera, canvas);
// 开启缓动，但是要在每一帧去update控制器
controls.enableDamping = true;

// 渲染
const renderer = new WebGLRenderer({
  canvas,
});
// 设置尺寸
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// Animate
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
