/* eslint-disable no-restricted-properties */
import * as THREE from 'three';
import vertexShader from './shaders/1.vert.glsl';
import fragmentShader from './shaders/1.frag.glsl';

/**
 * Galaxy
 */
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.5;
parameters.randomnessPower = 3;
parameters.insideColor = '#ff6030';
parameters.outsideColor = '#1b3984';

let geometry = null;
let material = null;
let points = null;

export default function generateGalaxy(scene, gui) {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  /**
     * Geometry
     */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count);
  const randomness = new Float32Array(parameters.count * 3);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i += 1) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle = (i % parameters.branches) / parameters.branches * Math.PI * 2;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    // Randomness
    const randomX = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    const randomY = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;
    const randomZ = Math.pow(Math.random(), parameters.randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * parameters.randomness * radius;

    randomness[i3] = randomX;
    randomness[i3 + 1] = randomY;
    randomness[i3 + 2] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Scale
    scales[i] = Math.random();
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));

  /**
     * Material
     */
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
    vertexShader,
    fragmentShader,
    uniforms: {
      uTime: { value: 0 },
      // 这里需要强调，有些GPU不会显示size为0的点，根据pixel ratio，如果是2，那么1个单位的点是0.5片元，就不会显示了。
      uSize: { value: 30 * Math.min(window.devicePixelRatio, 2) },
    },
  });

  /**
     * Points
     */
  points = new THREE.Points(geometry, material);
  scene.add(points);


  gui.add(parameters, 'count').min(100).max(1000000).step(100).onFinishChange(generateGalaxy);
  gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
  gui.add(parameters, 'branches').min(2).max(20).step(1).onFinishChange(generateGalaxy);
  gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generateGalaxy);
  gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.001).onFinishChange(generateGalaxy);
  gui.addColor(parameters, 'insideColor').onFinishChange(generateGalaxy);
  gui.addColor(parameters, 'outsideColor').onFinishChange(generateGalaxy);

  return [material, (elapsedTime) => {
    material.uniforms.uTime.value = elapsedTime;
  }];
}
