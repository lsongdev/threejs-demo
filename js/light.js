import * as THREE from 'three';

export const createLight = () => {
    const light = new THREE.AmbientLight(0xffffff, 8); // soft white light
    return light;
};