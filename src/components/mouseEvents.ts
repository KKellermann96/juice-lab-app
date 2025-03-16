import {
  Mesh,
  MeshStandardMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
} from "three";
import { checkRayIntersections, getMouseVector2 } from "./rayCastHelper";
import {
  CSS3DObject,
  CSS3DRenderer,
  OrbitControls,
} from "three/examples/jsm/Addons.js";
import { navigationCoordinates } from "./navigationCoordinates";
import { enableCameraControll, moveCamera } from "./cameraControls";
import { Ref } from "vue";
import { createView } from "./createView";
import { ModelObject } from "../models";

const mouseEvents = (
  camera: PerspectiveCamera,
  controls: OrbitControls,
  clickableObjects: Object3D<Object3DEventMap>[],
  navItems: string[],
  intersectedObject: Mesh | null,
  glowOnHoverObjects: Object3D<Object3DEventMap>[],
  cameraOnFocus: Ref<boolean>,
  htmlRenderer: CSS3DRenderer,
  resetToStart: Function,
  mainScene: Scene,
  css3dObject: Ref<CSS3DObject | undefined>,
  menuCardObject: ModelObject
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

    if (navItems.includes(clickedObj.name) && !cameraOnFocus.value) {
      onClick(
        clickedObj.name,
        camera,
        controls,
        cameraOnFocus,
        htmlRenderer,
        resetToStart,
        mainScene,
        css3dObject,
        menuCardObject
      );
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

const onClick = async (
  navItem: string,
  camera: PerspectiveCamera,
  controls: OrbitControls,
  cameraOnFocus: Ref<boolean>,
  htmlRenderer: CSS3DRenderer,
  resetToStart: Function,
  mainScene: Scene,
  css3dObject: Ref<CSS3DObject | undefined>,
  menuCardObject: ModelObject
) => {
  const coordinates = navigationCoordinates.find(
    (item) => item.objectName === navItem
  );

  if (!coordinates) {
    return;
  }

  cameraOnFocus.value = true;
  enableCameraControll(controls, false);
  controls.update();

  await moveCamera(camera, coordinates.position, coordinates.rotation);
  createView(
    coordinates,
    htmlRenderer,
    resetToStart,
    mainScene,
    css3dObject,
    menuCardObject
  );
};

const updateEmissiveIntensity = (object, from: number, to: number) => {
  if ((object.material as MeshStandardMaterial).emissiveIntensity === from) {
    (object.material as MeshStandardMaterial).emissiveIntensity = to;
  }
};
