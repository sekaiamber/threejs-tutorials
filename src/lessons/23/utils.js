/* eslint-disable import/prefer-default-export */
/* eslint-disable no-param-reassign */
import * as THREE from 'three';

export function updateAllMaterials(scene, environmentMap, envMapIntensity = 5) {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      if (!scene.environment) {
        child.material.envMap = environmentMap;
      }
      child.material.envMapIntensity = envMapIntensity;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
}
