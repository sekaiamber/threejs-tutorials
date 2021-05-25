import * as THREE from 'three';
import { updateAllMaterials } from './environment';


export default function initRenderer(scene, canvas, sizes, gui) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: window.devicePixelRatio === 1,
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  // 使用基于物理单位的光照
  renderer.physicallyCorrectLights = true;
  // 设置纹理的输出编码
  renderer.outputEncoding = THREE.sRGBEncoding;
  // 设置色调映射
  renderer.toneMapping = THREE.ReinhardToneMapping;
  renderer.toneMappingExposure = 3;
  // 设置renderer阴影
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const folder = gui.addFolder('Renderer');
  folder.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  }).onFinishChange(() => {
    renderer.toneMapping = Number(renderer.toneMapping);
    updateAllMaterials(scene);
  });
  folder.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.01).name('exposure');

  return renderer;
}
