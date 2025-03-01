import {
  AmbientLight,
  Clock,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Object3DEventMap,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
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
  CSS2DObject,
  CSS2DRenderer,
  GLTF,
  GLTFLoader,
} from "three/examples/jsm/Addons.js";
import { loadAnimations } from "./loadAnimations";
import { NavigationNames } from "../models/navigationNames";
import mouseEvents from "./mouseEvents";
import { initClickableObjects } from "./navigationHelper";

export const startUp = async (
  canvas: Ref<HTMLCanvasElement | null>,
  modelPath: string,
  htmlRenderer: CSS2DRenderer
) => {
  if (!canvas.value) return;

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

  const gltf = await loadGLBModel(modelPath);

  const model = gltf.scene;

  let glowOnHoverObjects: Object3D<Object3DEventMap>[] = [];
  model.traverse((child) => {
    // Renamed the mesh in blender like NavigationNames enum and added "Text" behind it
    if (navItems.map((item) => item + "Text").includes(child.name)) {
      glowOnHoverObjects.push(child);
    }
  });

  mainScene.add(model);

  // Add videos
  const video = document.createElement("video");
  video.src = "/videos/projects.mp4";
  video.loop = true;
  video.muted = true;
  video.play();

  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;

  const videoMaterial = new MeshBasicMaterial({ map: videoTexture });

  const videoGeometry = new PlaneGeometry(8.5, 26);
  videoGeometry.scale(0.1, 0.1, 0.1);
  const plane = new Mesh(videoGeometry, videoMaterial);
  plane.position.set(-1.55, 3.35, -7.45);
  plane.rotation.y = Math.PI;
  mainScene.add(plane);

  const clock = new Clock();
  const mixer = loadAnimations(gltf);

  let intersectedObject: Mesh | null = null;
  let cameraOnFocus = ref(false);

  const css2dObject = ref<CSS2DObject | undefined>(undefined);

  const resetToStart = async () => {
    mainScene.remove(css2dObject.value);
    css2dObject.value = undefined;
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
    css2dObject
  );

  window.addEventListener("click", onMouseClick, false);
  window.addEventListener("mousemove", onMouseMove, false);

  // ---------------------------------------------
  //                T E S T I N G
  // ---------------------------------------------

  //Remove if not needed
  window.addEventListener("keydown", async (event) => {
    // Check if the pressed key is "g" or "G"
    if (event.key === "h" || event.key === "H") {
      resetToStart();
    }
  });

  // ---------------------------------------------
  //                T E S T I N G
  // ---------------------------------------------

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
    htmlRenderer.setSize(window.innerWidth, window.innerHeight);
  });

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

const loadGLBModel = async (modelPath: string): Promise<GLTF> => {
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelPath);
    return gltf;
  } catch (error) {
    throw Error(`Error loading GLB model: ${error}`);
  }
};
