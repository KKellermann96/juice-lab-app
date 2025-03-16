import { AnimationMixer } from "three";
import { GLTF } from "three/examples/jsm/Addons.js";

export const loadAnimations = (gltf: GLTF) => {
  if (!gltf.animations.length) {
    console.warn("No animations found in the GLB file.");
    return null;
  }

  const mixer = new AnimationMixer(gltf.scene);

  gltf.animations.forEach((clip) => {
    const action = mixer.clipAction(clip);
    action.play();
  });
  return mixer;

}