import { ModelObject } from "../models";
import { gsap } from "gsap";

export const moveMesh = async (modelObj: ModelObject, ease: string) => {
  await Promise.all([
    gsap.to(modelObj.object.position, {
      x: modelObj.position.x,
      y: modelObj.position.y,
      z: modelObj.position.z,
      duration: 1,
      ease: ease,
    }),

    gsap.to(modelObj.object.rotation, {
      x: modelObj.rotation.x,
      y: modelObj.rotation.y,
      z: modelObj.rotation.z,
      duration: 1,
      ease: ease,
    }),
  ]);
};
