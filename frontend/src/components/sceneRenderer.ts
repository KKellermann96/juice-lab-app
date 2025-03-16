import {
  CineonToneMapping,
  PerspectiveCamera,
  Scene,
  Vector2,
  WebGLRenderer,
} from "three";
import {
  EffectComposer,
  RenderPass,
  UnrealBloomPass,
} from "three/examples/jsm/Addons.js";
import { Ref } from "vue";

export const sceneRenderer = (
  threeCanvas: Ref<HTMLCanvasElement | null>,
  camera: PerspectiveCamera,
  scene: Scene
) => {
  const renderer = new WebGLRenderer({ canvas: threeCanvas.value });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const renderScene = new RenderPass(scene, camera);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);

  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight), //resolution
    0.2, //intensity
    0.1, //radius of the bloom
    0.1 //which pixels emit the bloom
  );

  composer.addPass(bloomPass);

  renderer.toneMapping = CineonToneMapping;
  // renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1.5;

  return { renderer, composer };
};
