import { createApp, Ref } from "vue";
import { ModelObject, NavigationConfig, NavigationNames } from "../models";
import { CSS3DObject, CSS3DRenderer } from "three/examples/jsm/Addons.js";
import { Scene } from "three";
import { moveMesh } from "./moveObject";
import GunRunner from "../views/GunRunner.vue";
import Credits from "../views/Credits.vue";
import AboutMe from "../views/AboutMe.vue";
import Projects from "../views/Projects.vue";

export const createView = (
  coordinates: NavigationConfig,
  htmlRenderer: CSS3DRenderer,
  resetToStart: Function,
  mainScene: Scene,
  css3dObject: Ref<CSS3DObject | undefined>,
  menuCardObject: ModelObject,
  isMobile: boolean
) => {
  // A B O U T  M E
  if (coordinates.objectName === NavigationNames.aboutMe) {
    const vueApp = createApp(AboutMe, {
      goBack: resetToStart,
      showOrHideMenu: moveMesh,
      menuCardObject: menuCardObject,
      isMobile: isMobile,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const aboutMeElement = (instance as any).aboutMeContainer;

    css3dObject.value = new CSS3DObject(aboutMeElement);
    css3dObject.value.position.set(
      coordinates.position.x - 0.5,
      coordinates.position.y,
      coordinates.position.z + 0.21
    );
    css3dObject.value.rotation.y = coordinates.rotation.y;
    css3dObject.value.scale.set(0.000649, 0.000649, 0.000649);

    mainScene.add(css3dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
    // P R O J E C T S
  } else if (coordinates.objectName === NavigationNames.projects) {
    const vueApp = createApp(Projects, {
      goBack: resetToStart,
      isMobile: isMobile,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const projectsElement = (instance as any).projectsContainer;

    css3dObject.value = new CSS3DObject(projectsElement);
    css3dObject.value.position.set(
      coordinates.position.x,
      coordinates.position.y,
      coordinates.position.z + 0.5
    );
    css3dObject.value.rotation.y = coordinates.rotation.y;
    css3dObject.value.scale.set(0.0006, 0.0006, 0.0006);
    mainScene.add(css3dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
    // C R E D I T S
  } else if (coordinates.objectName === NavigationNames.credits) {
    const vueApp = createApp(Credits, {
      goBack: resetToStart,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const creditsElement = (instance as any).creditsContainer;

    css3dObject.value = new CSS3DObject(creditsElement);
    css3dObject.value.position.set(
      coordinates.position.x - 0.5,
      coordinates.position.y,
      coordinates.position.z + 0.05
    );
    css3dObject.value.rotation.y = coordinates.rotation.y;
    css3dObject.value.scale.set(0.00065, 0.00065, 0.00065);
    mainScene.add(css3dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
    // G A M E
  } else if (coordinates.objectName === NavigationNames.game) {
    const vueApp = createApp(GunRunner, {
      goBack: resetToStart,
      isMobile: isMobile,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const gunRunnerElement = (instance as any).gunRunnerContainer;

    css3dObject.value = new CSS3DObject(gunRunnerElement);
    css3dObject.value.position.set(
      coordinates.position.x - 0.5,
      coordinates.position.y,
      coordinates.position.z
    );
    css3dObject.value.rotation.y = coordinates.rotation.y;
    css3dObject.value.scale.set(0.000598, 0.000598, 0.000598);
    mainScene.add(css3dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
  }
};
