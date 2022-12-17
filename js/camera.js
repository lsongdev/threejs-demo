import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export const createCamera = renderer => {
  const camera = new THREE.PerspectiveCamera(15, window.innerWidth / window.innerHeight, .1, 2000);
  camera.lookAt(0, 0, 0);

  const orbitControls = new OrbitControls(camera, renderer.domElement);
  orbitControls.minDistance = 3
  orbitControls.maxDistance = 30;
  orbitControls.enableDamping = true;
  orbitControls.panSpeed = 3
  orbitControls.rotateSpeed = 3
  orbitControls.listenToKeyEvents(window);
  return { controls: orbitControls, camera };
};