import * as THREE from 'three';
import COLORS from './colors';

export default function getObj() {
  const fog = new THREE.Fog(COLORS.FOG, 1, 15);

  return fog;
}
