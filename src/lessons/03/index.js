import * as THREE from 'three';

const {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
} = THREE;

// 创建场景
const scene = new Scene();

// 几何体用于描述对象的形状
const geo = new BoxGeometry(1, 1, 1);
// 材质告诉WebGL如何渲染
const material = new MeshBasicMaterial({
  color: '#771719',
});

// mesh是连接几何体和材质的结构，也是scene接受的孩子之一（Object3D类）
const mesh = new Mesh(geo, material);
scene.add(mesh);

// 创建相机
// fov代表视锥体角度，人眼大约是60，60以上可以呈现类似广角效果
// aspect是长宽比，一般就是容器宽/容器高
// near是摄像机对于那些距离相机坐标多近的对象不予显示
// far是摄像机对于那些距离相机坐标多远的对象不予显示
const camera = new PerspectiveCamera(75, 800 / 600);
camera.position.z = 3;
scene.add(camera);

// 渲染
const renderer = new WebGLRenderer({
  canvas: document.getElementById('scene'),
});
// 设置尺寸
renderer.setSize(800, 600);
renderer.render(scene, camera);
