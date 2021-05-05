import * as THREE from 'three';

import brickSambientOcclusion from './bricks/ambientOcclusion.jpg';
import brickScolor from './bricks/color.jpg';
import brickSnormal from './bricks/normal.jpg';
import brickSroughness from './bricks/roughness.jpg';


import doorAlpha from './door/alpha.jpg';
import doorAmbientOcclusion from './door/ambientOcclusion.jpg';
import doorColor from './door/color.jpg';
import doorHeight from './door/height.jpg';
import doorMetalness from './door/metalness.jpg';
import doorNormal from './door/normal.jpg';
import doorRoughness from './door/roughness.jpg';

import grassSambientOcclusion from './grass/ambientOcclusion.jpg';
import grassScolor from './grass/color.jpg';
import grassSnormal from './grass/normal.jpg';
import grassSroughness from './grass/roughness.jpg';


const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);


const bricksAmbientOcclusionTexture = textureLoader.load(brickSambientOcclusion);
const bricksColorTexture = textureLoader.load(brickScolor);
const bricksNormalTexture = textureLoader.load(brickSnormal);
const bricksRoughnessTexture = textureLoader.load(brickSroughness);

const doorAlphaTexture = textureLoader.load(doorAlpha);
const doorAmbientOcclusionTexture = textureLoader.load(doorAmbientOcclusion);
const doorColorTexture = textureLoader.load(doorColor);
const doorHeightTexture = textureLoader.load(doorHeight);
const doorMetalnessTexture = textureLoader.load(doorMetalness);
const doorNormalTexture = textureLoader.load(doorNormal);
const doorRoughnessTexture = textureLoader.load(doorRoughness);

const grassAmbientOcclusionTexture = textureLoader.load(grassSambientOcclusion);
grassAmbientOcclusionTexture.repeat.set(8, 8, 8);
grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping;
grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping;
const grassColorTexture = textureLoader.load(grassScolor);
grassColorTexture.repeat.set(8, 8, 8);
grassColorTexture.wrapS = THREE.RepeatWrapping;
grassColorTexture.wrapT = THREE.RepeatWrapping;
const grassNormalTexture = textureLoader.load(grassSnormal);
grassNormalTexture.repeat.set(8, 8, 8);
grassNormalTexture.wrapS = THREE.RepeatWrapping;
grassNormalTexture.wrapT = THREE.RepeatWrapping;
const grassRoughnessTexture = textureLoader.load(grassSroughness);
grassRoughnessTexture.repeat.set(8, 8, 8);
grassRoughnessTexture.wrapS = THREE.RepeatWrapping;
grassRoughnessTexture.wrapT = THREE.RepeatWrapping;

const textures = {
  bricksAmbientOcclusionTexture,
  bricksColorTexture,
  bricksNormalTexture,
  bricksRoughnessTexture,
  doorAlphaTexture,
  doorAmbientOcclusionTexture,
  doorColorTexture,
  doorHeightTexture,
  doorMetalnessTexture,
  doorNormalTexture,
  doorRoughnessTexture,
  grassAmbientOcclusionTexture,
  grassColorTexture,
  grassNormalTexture,
  grassRoughnessTexture,
};

export default textures;
