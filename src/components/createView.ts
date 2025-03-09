import { createApp, Ref } from "vue";
import { ModelObject, NavigationConfig, NavigationNames } from "../models";
import { CSS2DObject, CSS2DRenderer } from "three/examples/jsm/Addons.js";
import { Scene } from "three";
import { moveMesh } from "./moveObject";
import GunRunner from "../views/GunRunner.vue";
import Credits from "../views/Credits.vue";
import AboutMe from "../views/AboutMe.vue";
import Projects from "../views/Projects.vue";

export const createView = (
  coordinates: NavigationConfig,
  htmlRenderer: CSS2DRenderer,
  resetToStart: Function,
  mainScene: Scene,
  css2dObject: Ref<CSS2DObject | undefined>,
  menuCardObject: ModelObject
) => {
  if (coordinates.objectName === NavigationNames.aboutMe) {
    const vueApp = createApp(AboutMe, {
      goBack: resetToStart,
      showOrHideMenu: moveMesh,
      menuCardObject: menuCardObject,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const aboutMeElement = (instance as any).aboutMeContainer;

    css2dObject.value = new CSS2DObject(aboutMeElement);
    css2dObject.value.position.set(
      coordinates.position.x - 0.5,
      coordinates.position.y,
      coordinates.position.z + 0.21
    );
    mainScene.add(css2dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
  } else if (coordinates.objectName === NavigationNames.projects) {
    const vueApp = createApp(Projects, {
      goBack: resetToStart,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const projectsElement = (instance as any).projectsContainer;

    css2dObject.value = new CSS2DObject(projectsElement);
    css2dObject.value.position.set(
      coordinates.position.x,
      coordinates.position.y,
      coordinates.position.z + 0.5
    );
    mainScene.add(css2dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
  } else if (coordinates.objectName === NavigationNames.credits) {
    const vueApp = createApp(Credits, {
      goBack: resetToStart,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const creditsElement = (instance as any).creditsContainer;

    css2dObject.value = new CSS2DObject(creditsElement);
    css2dObject.value.position.set(
      coordinates.position.x - 0.5,
      coordinates.position.y,
      coordinates.position.z
    );
    mainScene.add(css2dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
  } else if (coordinates.objectName === NavigationNames.game) {
    const vueApp = createApp(GunRunner, {
      goBack: resetToStart,
    });
    const instance = vueApp.mount(document.createElement("div"));
    const gunRunnerElement = (instance as any).gunRunnerContainer;

    css2dObject.value = new CSS2DObject(gunRunnerElement);
    css2dObject.value.position.set(
      coordinates.position.x - 0.5,
      coordinates.position.y,
      coordinates.position.z
    );
    mainScene.add(css2dObject.value);
    htmlRenderer.domElement.style.pointerEvents = "auto";
  }
};
