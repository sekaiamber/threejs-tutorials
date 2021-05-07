import * as THREE from 'three';

const parameters = {
  count: 100000,
  size: 0.01,
  radius: 5,
  branches: 3,
  spin: 3,
  randomness: 0.2,
  randomnessPower: 3,
  insideColor: '#ff00ff',
  outsideColor: '#ffff00',
};

let geometry;
let material;
let points;

function getRandom() {
  const {
    radius,
    randomness,
    randomnessPower,
  } = parameters;

  return (Math.random() ** randomnessPower) * (Math.random() < 0.5 ? 1 : -1) * randomness * radius;
}

function generate(scene) {
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  const {
    count,
    size,
    radius,
    branches,
    spin,
    insideColor,
    outsideColor,
  } = parameters;

  geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const colorInside = new THREE.Color(insideColor);
  const colorOutside = new THREE.Color(outsideColor);

  for (let i = 0; i < count; i += 1) {
    const i3 = i * 3;
    const r = Math.random() * radius;
    const spinAngle = (r / radius) * spin;
    const branchAngle = (i % branches) / branches * 2 * Math.PI;

    const randomX = getRandom();
    const randomY = getRandom();
    const randomZ = getRandom();


    positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
    positions[i3 + 1] = 0 + randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, r / radius);
    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

  material = new THREE.PointsMaterial({
    size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  points = new THREE.Points(
    geometry,
    material,
  );

  scene.add(points);
}

export default function initGalaxy(scene, gui) {
  generate(scene);

  // gui
  gui.add(parameters, 'count').min(100).max(200000).step(100).onFinishChange(generate.bind(null, scene));
  gui.add(parameters, 'size').min(0.001).max(0.1).step(0.001).onFinishChange(generate.bind(null, scene));
  gui.add(parameters, 'radius').min(0.01).max(20).step(0.01).onFinishChange(generate.bind(null, scene));
  gui.add(parameters, 'branches').min(2).max(10).step(1).onFinishChange(generate.bind(null, scene));
  gui.add(parameters, 'spin').min(-5).max(5).step(0.001).onFinishChange(generate.bind(null, scene));
  gui.add(parameters, 'randomness').min(0).max(2).step(0.001).onFinishChange(generate.bind(null, scene));
  gui.add(parameters, 'randomnessPower').min(1).max(10).step(0.01).onFinishChange(generate.bind(null, scene));
  gui.addColor(parameters, 'insideColor').onFinishChange(generate.bind(null, scene));
  gui.addColor(parameters, 'outsideColor').onFinishChange(generate.bind(null, scene));
}
