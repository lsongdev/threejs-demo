import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const stats = new Stats();
document.body.appendChild(stats.dom);

const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.physicallyCorrectLights = true;
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0xffffff, .17);
scene.background = new THREE.Color(0x333333);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 500);
camera.lookAt(0, 0, 0);
camera.lookAt(scene.position);

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({ color: 0x0000ff });
const points = [];
points.push(new THREE.Vector3(- 10, 0, 0));
points.push(new THREE.Vector3(0, 10, 0));
points.push(new THREE.Vector3(10, 0, 0));

const geometry = new THREE.BufferGeometry().setFromPoints(points);
const line = new THREE.Line(geometry, material);

const light = new THREE.AmbientLight(0xffffff, 8); // soft white light

scene.add(line);
scene.add(light);

const orbitControls = new OrbitControls(camera, renderer.domElement);
orbitControls.minDistance = .2;
orbitControls.maxDistance = 1.5;
orbitControls.enableDamping = true;

const loader = new GLTFLoader();
const gltf = await loader.loadAsync('flower.glb');
scene.add(gltf.scene);

(function animate() {
  stats.update(); // fps stats
  orbitControls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
})();