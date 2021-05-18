/* eslint-disable no-param-reassign */
import CANNON from 'cannon';
import hitSoundUrl from './static/sounds/hit.mp3';

const hitSound = new Audio(hitSoundUrl);

function playHitSound(collision) {
  const impactStrength = collision.contact.getImpactVelocityAlongNormal();

  if (impactStrength > 1.5) {
    hitSound.volume = Math.random();
    hitSound.currentTime = 0;
    hitSound.play();
  }
}

const world = new CANNON.World();
world.broadphase = new CANNON.SAPBroadphase(world);
world.allowSleep = true;
world.gravity.set(0, -9.82, 0);

const beforeStepCallbacks = [];
const afterStepCallbacks = [];

// 物理材质
const defaultMaterial = new CANNON.Material('default');
const defaultContactMaterial = new CANNON.ContactMaterial(
  defaultMaterial,
  defaultMaterial,
  {
    friction: 0.1,
    restitution: 0.7,
  },
);
// world.addContactMaterial(defaultContactMaterial);
world.defaultContactMaterial = defaultContactMaterial;

export default function nextStep(fps, deltaTime) {
  beforeStepCallbacks.forEach(cb => cb());
  world.step(fps, deltaTime, 3);
  afterStepCallbacks.forEach(cb => cb());
}

function updateMeshFromBody(mesh, body) {
  mesh.position.copy(body.position);
  mesh.quaternion.copy(body.quaternion);
}

export function bindSphere(sphere, { mass = 0, position = [0, 0, 0] }) {
  const sphereShape = new CANNON.Sphere(sphere.scale.x);
  const sphereBody = new CANNON.Body({
    mass,
    position: new CANNON.Vec3(...position),
    shape: sphereShape,
  });
  world.addBody(sphereBody);
  // beforeStepCallbacks.push(() => {
  //   sphereBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), sphereBody.position);
  // });
  afterStepCallbacks.push(() => {
    updateMeshFromBody(sphere, sphereBody);
  });
  // sphereBody.applyLocalForce(new CANNON.Vec3(150, 0, 0), new CANNON.Vec3(0, 0, 0));
}

export function bindPlane(plane, { mass = 0, position = [0, 0, 0] }) {
  const planeShape = new CANNON.Plane();
  const planeBody = new CANNON.Body({
    mass,
    position: new CANNON.Vec3(...position),
    shape: planeShape,
  });
  world.addBody(planeBody);
  planeBody.quaternion.setFromAxisAngle(new CANNON.Vec3(-1, 0, 0), Math.PI / 2);
  // callbacks.push(() => {
  //   updateMeshFromBody(plane, planeBody);
  // });
}

export function bindBox(box, { mass = 0, position = [0, 0, 0] }) {
  const boxShape = new CANNON.Box(new CANNON.Vec3(box.scale.x / 2, box.scale.y / 2, box.scale.z / 2));
  const boxBody = new CANNON.Body({
    mass,
    position: new CANNON.Vec3(...position),
    shape: boxShape,
  });
  world.addBody(boxBody);
  boxBody.addEventListener('collide', playHitSound);
  // beforeStepCallbacks.push(() => {
  //   boxBody.applyForce(new CANNON.Vec3(-0.5, 0, 0), boxBody.position);
  // });
  afterStepCallbacks.push(() => {
    updateMeshFromBody(box, boxBody);
  });
}
