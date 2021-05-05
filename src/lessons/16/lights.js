import * as THREE from 'three';
import COLORS from './colors';

export default function getObj(gui, scene, house) {
  // moon lights
  const ambientLight = new THREE.AmbientLight(COLORS.MOON_LIGHT, 0.12);
  gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001);
  scene.add(ambientLight);

  const moonLight = new THREE.DirectionalLight(COLORS.MOON_LIGHT, 0.12);
  moonLight.position.set(4, 5, -2);
  gui.add(moonLight, 'intensity').min(0).max(1).step(0.001);
  gui.add(moonLight.position, 'x').min(-5).max(5).step(0.001);
  gui.add(moonLight.position, 'y').min(-5).max(5).step(0.001);
  gui.add(moonLight.position, 'z').min(-5).max(5).step(0.001);
  scene.add(moonLight);

  // door light
  const doorLight = new THREE.PointLight(COLORS.DOOR_LIGHT, 1, 7);
  doorLight.position.set(0, 2.2, 2.7);
  house.add(doorLight);

  return {
    ambientLight, moonLight, doorLight,
  };
}
