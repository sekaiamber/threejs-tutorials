import * as THREE from 'three';
import * as dat from 'dat.gui';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { RESOURCE_NAMES, RESOURCE_FILES } from './textures';

import env0nx from './textures/environmentMaps/0/nx.jpg';
import env0ny from './textures/environmentMaps/0/ny.jpg';
import env0nz from './textures/environmentMaps/0/nz.jpg';
import env0px from './textures/environmentMaps/0/px.jpg';
import env0py from './textures/environmentMaps/0/py.jpg';
import env0pz from './textures/environmentMaps/0/pz.jpg';

import './style.scss';

const gui = new dat.GUI();

const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const doorColorTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.color]);
const doorAlphaTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.alpha]);
const doorAmbientOcclusionTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.ambientOcclusion]);
const doorHeightTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.height]);
const doorMetalnessTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.metalness]);
const doorNormalTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.normal]);
const doorRoughnessTexture = textureLoader.load(RESOURCE_FILES.door[RESOURCE_NAMES.door.roughness]);

const gradients3Texture = textureLoader.load(RESOURCE_FILES.gradients[RESOURCE_NAMES.gradients[3]]);

const matcaps1Texture = textureLoader.load(RESOURCE_FILES.matcaps[RESOURCE_NAMES.matcaps[1]]);

const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
const envTexutre = cubeTextureLoader.load([
  env0px,
  env0nx,
  env0py,
  env0ny,
  env0pz,
  env0nz,
]);

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// 基础材质
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// material.color.set(0x00ffff);
// // material.wireframe = true;
// material.transparent = true;
// material.opacity = 0.5;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide;

// 法线材质
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

// 材质捕捉
// const material = new THREE.MeshMatcapMaterial();
// material.matcap = matcaps1Texture;

// 距离材质
// const material = new THREE.MeshDepthMaterial();

// Lambert网格材质
// const material = new THREE.MeshLambertMaterial();

// Phong网格材质
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0xff2211);

// toon网格材质
// const material = new THREE.MeshToonMaterial();
// material.gradientMap = gradients3Texture;
// material.gradientMap.minFilter = THREE.NearestFilter;
// material.gradientMap.magFilter = THREE.NearestFilter;
// material.gradientMap.generateMipmaps = false;

// 标准网格材质
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45;
// material.roughness = 0.65;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.alphaMap = doorAlphaTexture;
// material.transparent = true;


// 测试环境
const material = new THREE.MeshStandardMaterial();
material.metalness = 1;
material.roughness = 0.3;
material.envMap = envTexutre;

gui.add(material, 'metalness', 0, 1);
gui.add(material, 'roughness', 0, 1);

const sphere = new THREE.Mesh(
  new THREE.SphereBufferGeometry(0.5, 64, 64),
  material,
);
sphere.position.x = -1.5;
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2));

const plane = new THREE.Mesh(
  new THREE.PlaneBufferGeometry(1, 1, 100, 100),
  material,
);
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2));

const torus = new THREE.Mesh(
  new THREE.TorusBufferGeometry(0.5, 0.2, 64, 128),
  material,
);
torus.position.x = 1.5;
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2));

scene.add(sphere);
scene.add(plane);
scene.add(torus);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

/**
 * Light
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

  sphere.rotation.y = elapsedTime * 0.1;
  plane.rotation.y = elapsedTime * 0.1;
  torus.rotation.y = elapsedTime * 0.1;

  sphere.rotation.x = elapsedTime * 0.1;
  plane.rotation.x = elapsedTime * 0.1;
  torus.rotation.x = elapsedTime * 0.1;

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
