import * as THREE from 'three';

const particlesGeometry = new THREE.SphereBufferGeometry(1, 32, 32);
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.02,
  sizeAttenuation: true,
});
const particles = new THREE.Points(
  particlesGeometry,
  particlesMaterial,
);


function update() {}

export default particles;
export {
  update,
};
