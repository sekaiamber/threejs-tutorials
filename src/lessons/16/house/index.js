import * as THREE from 'three';
import getWalls from './walls';
import getRoof from './roof';
import getDoor from './door';
import getBushes from './bushes';

export default function getHouse() {
  const house = new THREE.Group();

  const walls = getWalls();
  const roof = getRoof();
  const door = getDoor();
  const [bushes, bushesObjs] = getBushes();
  house.add(walls, roof, door, bushes);

  return [house, { walls, roof, door, bushes, bushesObjs }];
}
