/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import COLORS from './colors';

export default function getObj({ lights, ghosts, houseObjs, gravesObjs, floor }) {
  const {
    moonLight,
    doorLight,
  } = lights;
  moonLight.castShadow = true;
  moonLight.shadow.mapSize.height = 256;
  moonLight.shadow.mapSize.width = 256;
  moonLight.shadow.camera.far = 15;
  doorLight.castShadow = true;
  doorLight.shadow.mapSize.height = 256;
  doorLight.shadow.mapSize.width = 256;
  doorLight.shadow.camera.far = 7;

  ghosts.forEach((ghost) => {
    ghost.castShadow = true;
    ghost.shadow.mapSize.height = 256;
    ghost.shadow.mapSize.width = 256;
    ghost.shadow.camera.far = 7;
  });

  houseObjs.walls.castShadow = true;
  houseObjs.bushesObjs.forEach((bush) => {
    bush.castShadow = true;
  });
  gravesObjs.forEach((grave) => {
    grave.castShadow = true;
  });

  floor.receiveShadow = true;
}
