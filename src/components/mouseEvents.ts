import {
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Raycaster,
  Vector2,
} from "three";
import { checkRayIntersections, getMouseVector2 } from "./rayCastHelper";

const mouseEvents = (
  camera: PerspectiveCamera,
  clickableObjects: Object3D<Object3DEventMap>[],
  navItems: string[],
  intersectedObject: Mesh | null,
  glowOnHoverObjects: Object3D<Object3DEventMap>[]
) => {
  let mousePointer = new Vector2();
  const raycaster = new Raycaster();

  const onMouseClick = (event) => {
    mousePointer = getMouseVector2(event);

    const clickedObj = checkRayIntersections(
      mousePointer,
      camera,
      raycaster,
      clickableObjects
    );

    if (!clickedObj) {
      return;
    }

    if (navItems.includes(clickedObj.name)) {
      handleTriggerClick(clickedObj.name);
    }
  };

  const onMouseMove = (event) => {
    mousePointer = getMouseVector2(event);

    const hoveredObj = checkRayIntersections(
      mousePointer,
      camera,
      raycaster,
      clickableObjects
    );

    if (hoveredObj && navItems.includes(hoveredObj.name)) {
      if (intersectedObject && intersectedObject.name === hoveredObj.name) {
        return;
      } else if (
        intersectedObject &&
        intersectedObject.name !== hoveredObj.name
      ) {
        updateEmissiveIntensity(intersectedObject, 7, 3);
      }

      intersectedObject = glowOnHoverObjects.find(
        (obj) => obj.name === `${hoveredObj.name}Text`
      ) as Mesh;

      updateEmissiveIntensity(intersectedObject, 3, 7);
    } else if (intersectedObject) {
      updateEmissiveIntensity(intersectedObject, 7, 3);
      intersectedObject = null;
    }
  };

  return { onMouseClick, onMouseMove };
};

export default mouseEvents;

function handleTriggerClick(navItem: string) {
  console.log(`clicked on: ${navItem}`);
}

const updateEmissiveIntensity = (object, from: number, to: number) => {
  if ((object.material as MeshStandardMaterial).emissiveIntensity === from) {
    (object.material as MeshStandardMaterial).emissiveIntensity = to;
  }
};
