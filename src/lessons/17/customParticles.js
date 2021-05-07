import * as THREE from 'three';
import particleTextureImage from './textures/2.png';

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load(particleTextureImage);


const COUNT = 5000;
const positions = new Float32Array(COUNT * 3);
const colors = new Float32Array(COUNT * 3);
for (let i = 0; i < COUNT * 3; i += 1) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));


const particlesMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  // color: '#ff88cc',
  // map: particleTexture,
  transparent: true,
  alphaMap: particleTexture,
});

// particlesMaterial.alphaTest = 0.001;
// particlesMaterial.depthTest = false;
particlesMaterial.depthWrite = false;
particlesMaterial.blending = THREE.AdditiveBlending;
particlesMaterial.vertexColors = true;

const particles = new THREE.Points(
  particlesGeometry,
  particlesMaterial,
);

function update(elapsedTime) {
  for (let i = 0; i < COUNT; i += 1) {
    const i3 = i * 3;
    const x = particlesGeometry.attributes.position.array[i3];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(elapsedTime + x);
  }
  particlesGeometry.attributes.position.needsUpdate = true;
}

export default particles;
export {
  update,
};
