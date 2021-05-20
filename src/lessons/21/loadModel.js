import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import modelUrl from './static/models/Fox/glTF-Binary/Fox.glb';

const gltfLoader = new GLTFLoader();

let mixer;

export default function loadModel(scene) {
  gltfLoader.load(modelUrl, (model) => {
    mixer = new THREE.AnimationMixer(model.scene);
    const action = mixer.clipAction(model.animations[0]);

    action.play();

    model.scene.scale.set(0.025, 0.025, 0.025);
    scene.add(model.scene);
  });

  return (deltaTime) => {
    if (!mixer) return;
    mixer.update(deltaTime);
  };
}
