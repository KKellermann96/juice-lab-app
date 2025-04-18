import {
  AmbientLight,
  Clock,
  LoadingManager,
  Mesh,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  Scene,
  Vector2,
  Vector3,
  VideoTexture,
} from "three";
import { ref, Ref } from "vue";
import { sceneRenderer } from "./sceneRenderer";
import {
  configureControls,
  enableCameraControll,
  resetCamera,
} from "./cameraControls";
import {
  CSS3DObject,
  CSS3DRenderer,
  GLTF,
  GLTFLoader,
} from "three/examples/jsm/Addons.js";
import { loadAnimations } from "./loadAnimations";
import { NavigationNames } from "../models/navigationNames";
import mouseEvents from "./mouseEvents";
import { initClickableObjects } from "./navigationHelper";
import { addVideo } from "../addVideo";
import { ModelObject, ModelNames } from "../models";
import { DRACOLoader } from "three/examples/jsm/Addons.js";

//Total items in the scene
const TOTAL_ITEMS = 25;

export const startUp = async (
  canvas: Ref<HTMLCanvasElement | null>,
  modelPath: string,
  htmlRenderer: CSS3DRenderer,
  videoElements: Ref<HTMLVideoElement[]>,
  videoTextures: Ref<VideoTexture[]>,
  progress: Ref<number>
) => {
  if (!canvas.value) return;
  const isMobile = window.matchMedia("(pointer: coarse)").matches;

  const mainScene = new Scene();

  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const { renderer, composer } = sceneRenderer(canvas, camera, mainScene);

  const controls = configureControls(camera, renderer);

  // Lighting
  const ambientLight = new AmbientLight(0xffffff, 3);
  mainScene.add(ambientLight);

  const navItems = [
    NavigationNames.aboutMe,
    NavigationNames.projects,
    NavigationNames.game,
    NavigationNames.credits,
  ];

  let clickableObjects = initClickableObjects(mainScene, navItems);

  const gltf = await loadGLBModel(modelPath, progress);

  const model = gltf.scene;

  let glowOnHoverObjects: Object3D<Object3DEventMap>[] = [];
  const menuCardObject = new ModelObject();
  model.traverse((child) => {
    if (navItems.map((item) => item + "Text").includes(child.name)) {
      glowOnHoverObjects.push(child);
    } else if (child.name === ModelNames.menuCard) {
      menuCardObject.object = child;
      menuCardObject.position.copy(child.position);
      menuCardObject.rotation.copy(child.rotation);
    }
  });

  mainScene.add(model);

  addVideo(
    "/videos/sideDisplay.mp4",
    new Vector3(-4.65, 9.3, -6.75),
    new Vector2(32, 17),
    mainScene,
    videoElements,
    videoTextures
  );

  addVideo(
    "/videos/projects.mp4",
    new Vector3(-1.55, 3.35, -7.45),
    new Vector2(8.5, 26),
    mainScene,
    videoElements,
    videoTextures
  );

  const clock = new Clock();
  const mixer = loadAnimations(gltf);

  let intersectedObject: Mesh | null = null;
  let cameraOnFocus = ref(false);

  const css3dObject = ref<CSS3DObject | undefined>(undefined);

  const resetToStart = async () => {
    mainScene.remove(css3dObject.value);
    css3dObject.value = undefined;
    await resetCamera(camera);

    cameraOnFocus.value = false;
    htmlRenderer.domElement.style.pointerEvents = "none";
    enableCameraControll(controls);
  };

  const { onMouseClick, onMouseMove } = mouseEvents(
    camera,
    controls,
    clickableObjects,
    navItems,
    intersectedObject,
    glowOnHoverObjects,
    cameraOnFocus,
    htmlRenderer,
    resetToStart,
    mainScene,
    css3dObject,
    menuCardObject,
    isMobile
  );

  if (isMobile) {
    window.addEventListener("pointerdown", onMouseClick, false);
  } else {
    window.addEventListener("click", onMouseClick, false);
    window.addEventListener("mousemove", onMouseMove, false);
  }

  const updateRendererSize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    htmlRenderer.setSize(window.innerWidth, window.innerHeight);
  };

  // Handle window resize
  if (isMobile) {
    window.visualViewport?.addEventListener("resize", updateRendererSize);
  } else {
    window.addEventListener("resize", updateRendererSize);
  }

  // Animation loop
  const animate = () => {
    if (!cameraOnFocus.value) {
      controls.update();
    }
    composer.render();
    htmlRenderer.render(mainScene, camera);

    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    requestAnimationFrame(animate);
  };

  animate();
};

const loadGLBModel = async (
  modelPath: string,
  progress: Ref<number>
): Promise<GLTF> => {
  try {
    const loadingManager = new LoadingManager();

    loadingManager.onProgress = function (url, loaded, total) {
      progress.value = Math.floor((loaded / TOTAL_ITEMS) * 100);
    };

    const loader = new GLTFLoader(loadingManager);
    const dLoader = new DRACOLoader();
    dLoader.setDecoderPath(
      "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
    );
    dLoader.setDecoderConfig({ type: "js" });
    loader.setDRACOLoader(dLoader);

    const gltf = await loader.loadAsync(modelPath);
    return gltf;
  } catch (error) {
    throw Error(`Error loading GLB model: ${error}`);
  }
};
