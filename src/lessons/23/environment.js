/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import { staticProxy } from '../../utils';
import { updateAllMaterials as originUpdateAllMaterials } from './utils';

const textureLoader = new THREE.CubeTextureLoader();
const environmentMap = textureLoader.load([
  staticProxy('/23/textures/environmentMaps/0/px.jpg'),
  staticProxy('/23/textures/environmentMaps/0/nx.jpg'),
  staticProxy('/23/textures/environmentMaps/0/py.jpg'),
  staticProxy('/23/textures/environmentMaps/0/ny.jpg'),
  staticProxy('/23/textures/environmentMaps/0/pz.jpg'),
  staticProxy('/23/textures/environmentMaps/0/nz.jpg'),
]);
environmentMap.encoding = THREE.sRGBEncoding;

const debugObject = {
  intensity: 5,
};

export {
  environmentMap,
};
export function updateAllMaterials(scene) {
  originUpdateAllMaterials(scene, environmentMap, debugObject.intensity);
}

export default function initEnvironmentMap(scene, gui) {
  scene.background = environmentMap;
  scene.environment = environmentMap;

  const folder = gui.addFolder('Environment');
  folder.add(debugObject, 'intensity').min(0).max(10).step(0.01).name('intensity').onChange(() => {
    updateAllMaterials(scene);
  });
}
