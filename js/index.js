import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { VRButton } from 'three/addons/webxr/VRButton.js';

import { createRenderer } from './render.js';
import { createScene } from './scene.js';
import { createLight } from './light.js';
import { createCamera } from './camera.js';
import { loadModel } from './loader.js';

const stats = new Stats();
document.body.appendChild(stats.dom);

const renderer = createRenderer();
const light = createLight();
const scene = createScene(renderer);
const { camera, controls } = createCamera(renderer);

document.body.appendChild(renderer.domElement);

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

scene.add(line);
scene.add(light);

const gltf = await loadModel();

camera.position.set(0, 20, 100);
controls.update();

const button = VRButton.createButton(renderer);
document.body.appendChild(button);

const model = gltf.scene;
model.position.set(0, 0, 0);
model.scale.set(0.01, 0.01, 0.01);
scene.add(model);

const mixer = new THREE.AnimationMixer(model);
mixer.clipAction(gltf.animations[0]).play();

window.onresize = function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};

const clock = new THREE.Clock();

renderer.setAnimationLoop(function () {
  stats.update();
  controls.update();

  const delta = clock.getDelta();
  mixer.update(delta);

  renderer.render(scene, camera);
});
