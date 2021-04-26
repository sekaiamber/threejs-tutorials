import * as THREE from 'three';
import gsap from 'gsap';

const {
  Scene,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  Clock,
} = THREE;

// 创建场景
const scene = new Scene();

// 几何体用于描述对象的形状
const geo = new BoxGeometry(1, 1, 1);
// 材质告诉WebGL如何渲染
const material = new MeshBasicMaterial({
  color: 'red',
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

// 动画1，自建
const clock = new Clock();
function anime1() {
  const elapsedTime = clock.getElapsedTime();

  // 使用DeltaTime
  // const currentTime = Date.now();
  // const deltaTime = currentTime - time;
  // time = currentTime;
  // mesh.rotation.y += 0.001 * deltaTime;

  // 使用Clock
  mesh.rotation.y = elapsedTime;
  mesh.position.y = Math.sin(elapsedTime);
}

// 动画2，使用类似gasp这样的库
gsap.to(mesh.position, { duration: 1, x: 2 });

function tick() {
  // anime1();

  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
}

tick();
