import { Object3D, Object3DEventMap, Vector2 } from "three";

export const getMouseVector2 = (event) => {
  const mousePointer = new Vector2();
  mousePointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  mousePointer.y = -(event.clientY / window.innerHeight) * 2 + 1;
  return mousePointer;
};

export const checkRayIntersections = (
  mousePointer: Vector2,
  camera,
  raycaster,
  clickableObjects
): Object3D<Object3DEventMap> | null => {
  raycaster.setFromCamera(mousePointer, camera);

  const intersects = raycaster.intersectObjects(clickableObjects);

  return intersects.length ? intersects[0].object : null;
};
