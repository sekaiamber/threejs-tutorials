/* eslint-disable no-param-reassign */
import * as THREE from 'three';
import 'three/examples/js/loaders/GLTFLoader';
import { updateAllMaterials } from './environment';
import { staticProxy } from '../../utils';


const {
  GLTFLoader,
} = THREE;

const gltfLoader = new GLTFLoader();

export default function initModel(scene, gui) {
  const folder = gui.addFolder('Model');

  // 飞行帽
  // gltfLoader.load(staticProxy('/23/models/FlightHelmet/glTF/FlightHelmet.gltf'), (gltf) => {
  //   const {
  //     scene: gltfScene,
  //   } = gltf;

  //   gltfScene.scale.set(10, 10, 10);
  //   gltfScene.position.set(0, -4, 0);
  //   gltfScene.rotation.y = Math.PI * 0.5;


  //   scene.add(gltfScene);
  //   updateAllMaterials(scene);

  //   folder.add(gltfScene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation y');
  // });

  // 22课中的汉堡
  gltfLoader.load(staticProxy('/22/burger.glb'), (gltf) => {
    const {
      scene: gltfScene,
    } = gltf;

    gltfScene.scale.set(0.3, 0.3, 0.3);
    gltfScene.position.set(0, -1, 0);

    scene.add(gltfScene);
    updateAllMaterials(scene);

    folder.add(gltfScene.rotation, 'y').min(-Math.PI).max(Math.PI).step(0.001).name('rotation y');
  });
}
