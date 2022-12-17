import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

export const loadModel = async () => {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('js/');
  dracoLoader.setDecoderConfig({ type: 'js' });

  const loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);
  const gltf = await loader.loadAsync('models/LittlestTokyo.glb');
  return gltf
};