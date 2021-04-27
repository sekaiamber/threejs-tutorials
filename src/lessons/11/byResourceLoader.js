import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RESOURCE_NAMES, RESOURCE_FILES } from './textures';

import './style.scss';

const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log('loading start');
};
loadingManager.onProgress = () => {
  console.log('loading progress');
};
loadingManager.onLoad = () => {
  console.log('loading end');
};
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.color]);
// const alphaTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.alpha]);
// const ambientOcclusionTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.ambientOcclusion]);
// const heightTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.height]);
// const metalnessTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.metalness]);
// const normalTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.normal]);
// const roughnessTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.roughness]);
const minTestTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.minTest]);
const maxTestTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.maxTest]);
const minecraftTexture = textureLoader.load(RESOURCE_FILES[RESOURCE_NAMES.minecraft]);

// // 正常纹理
// const materialTexture = colorTexture;

// // 测试 mipmapping - minification filter 效果纹理
// const materialTexture = minTestTexture;
// // 会产生严重的摩尔纹
// materialTexture.minFilter = THREE.NearestFilter;

// // 测试 mipmapping - magnification filter 效果纹理
// const materialTexture = maxTestTexture;
// // 会清晰显示图片不会放大模糊
// materialTexture.magFilter = THREE.NearestFilter;

// 还有种方式是，在minFilter为NearstFilter算法下，直接关闭生成mipmap
const materialTexture = minecraftTexture;
materialTexture.minFilter = THREE.NearestFilter;
materialTexture.generateMipmaps = false;


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ map: materialTexture });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();


window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
