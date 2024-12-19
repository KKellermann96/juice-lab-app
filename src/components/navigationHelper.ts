import {
  BoxGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Object3DEventMap,
  Scene,
} from "three";

export const initClickableObjects = (
  mainScene: Scene,
  navItems: string[]
): Object3D<Object3DEventMap>[] => {
  const navGeometry = new BoxGeometry(1.5, 0.2, 7.5);

  const InvisibleMat = new MeshBasicMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0,
  });

  let clickableObjects = [];

  navItems.forEach((key, idx) => {
    const mesh = new Mesh(navGeometry, InvisibleMat);
    mesh.position.set(8 + idx * 2, 2.1, -16.5);
    mesh.name = key;
    clickableObjects.push(mesh);
    mainScene.add(mesh);
  });

  return clickableObjects;
};
