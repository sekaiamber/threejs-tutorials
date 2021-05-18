import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';
import environmentMapTexture from './static/textures';
import nextStep, { bindSphere, bindPlane, bindBox } from './physics';
import './style.scss';

/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Test sphere
 */
const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
const sphereMaterial = new THREE.MeshStandardMaterial({
  metalness: 0.3,
  roughness: 0.4,
  envMap: environmentMapTexture,
});
function createSphere(radius, position = [0, 0, 0]) {
  const sphere = new THREE.Mesh(
    sphereGeometry,
    sphereMaterial,
  );
  sphere.scale.set(radius, radius, radius);
  sphere.castShadow = true;
  bindSphere(sphere, {
    mass: 1,
    position,
  });
  scene.add(sphere);
}
createSphere(0.5, [0, 3, 0]);


const boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
function createBox(width, height, depth, position = [0, 0, 0]) {
  const box = new THREE.Mesh(
    boxGeometry,
    new THREE.MeshStandardMaterial({
      metalness: 0.3,
      roughness: 0.4,
      envMap: environmentMapTexture,
    }),
  );
  box.scale.set(width, height, depth);
  box.castShadow = true;
  bindBox(box, {
    mass: 1,
    position,
  });
  scene.add(box);
}

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: '#777777',
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
  }),
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
bindPlane(floor, {
  mass: 0,
  position: [0, 0, 0],
});
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

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
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;
const fps = 1 / 60;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // 更新物理世界
  nextStep(fps, deltaTime);

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

// debug
const debugObject = {
  createSphere() {
    createSphere(Math.random() * 0.5, [Math.random() * 0.5, 3, Math.random() * 0.5]);
  },
  createBox() {
    createBox(Math.random(), Math.random(), Math.random(), [Math.random() * 0.5, 3, Math.random() * 0.5]);
  },
};
gui.add(debugObject, 'createSphere');
gui.add(debugObject, 'createBox');
