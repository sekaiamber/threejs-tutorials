import * as THREE from 'three';

const {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Group,
  PerspectiveCamera,
  WebGLRenderer,
  AxesHelper,
} = THREE;

// 创建场景
const scene = new Scene();


// group能够组合内部的Object3D
const group = new Group();
const cube1 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 'red' }),
);
group.add(cube1);
const cube2 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 'blue' }),
);
cube2.position.x = 2;
group.add(cube2);
const cube3 = new Mesh(
  new BoxGeometry(1, 1, 1),
  new MeshBasicMaterial({ color: 'green' }),
);
cube3.position.x = -2;
group.add(cube3);

// group的transform操作均会同步内部的children。
group.position.y = 1;
scene.add(group);

// 创建相机
// fov代表视锥体角度，人眼大约是60，60以上可以呈现类似广角效果
// aspect是长宽比，一般就是容器宽/容器高
// near是摄像机对于那些距离相机坐标多近的对象不予显示
// far是摄像机对于那些距离相机坐标多远的对象不予显示
const camera = new PerspectiveCamera(75, 800 / 600);
camera.position.z = 3;
scene.add(camera);

// 帮助类
const helper = new AxesHelper(10);
scene.add(helper);

// 渲染
const renderer = new WebGLRenderer({
  canvas: document.getElementById('scene'),
});
// 设置尺寸
renderer.setSize(800, 600);
renderer.render(scene, camera);
