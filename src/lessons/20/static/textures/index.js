import * as THREE from 'three';
import px from './environmentMaps/0/px.png';
import nx from './environmentMaps/0/nx.png';
import py from './environmentMaps/0/py.png';
import ny from './environmentMaps/0/ny.png';
import pz from './environmentMaps/0/pz.png';
import nz from './environmentMaps/0/nz.png';

const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  px,
  nx,
  py,
  ny,
  pz,
  nz,
]);

export default environmentMapTexture;
