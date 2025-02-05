import {
  AmbientLight,
  BoxGeometry,
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
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { loadAnimations } from "./loadAnimations";
import { NavigationNames } from "../models/navigationNames";
import mouseEvents from "./mouseEvents";
import { initClickableObjects } from "./navigationHelper";

export const startUp = async (
  canvas: Ref<HTMLCanvasElement | null>,
  modelPath: string
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
  video.src = "/videos/projects.mp4"; // Converted GIF as a video
  video.loop = true;
  video.muted = true; // Autoplay requires muted video
  video.play();

  // Create a texture from the video
  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;

  // Create a material using the video texture
  const videoMaterial = new MeshBasicMaterial({ map: videoTexture });

  const videoGeometry = new PlaneGeometry(8.5, 26); // Aspect ratio of the video
  videoGeometry.scale(0.1, 0.1, 0.1);
  const plane = new Mesh(videoGeometry, videoMaterial);
  plane.position.set(-1.55, 3.35, -7.45);
  plane.rotation.y = Math.PI;
  mainScene.add(plane);

  const clock = new Clock();
  const mixer = loadAnimations(gltf);

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });

  let intersectedObject: Mesh | null = null;
  let cameraOnFocus = ref(false);

  const { onMouseClick, onMouseMove } = mouseEvents(
    camera,
    controls,
    clickableObjects,
    navItems,
    intersectedObject,
    glowOnHoverObjects,
    cameraOnFocus
  );

  window.addEventListener("click", onMouseClick, false);
  window.addEventListener("mousemove", onMouseMove, false);

  // ---------------------------------------------
  //                T E S T I N G
  // ---------------------------------------------
  const mesht1 = new Mesh(
    new BoxGeometry(0.1, 2, 2),
    new MeshBasicMaterial({
      color: 0xff0000,
    })
  );
  mesht1.name = "t1";
  mesht1.position.set(15, 9.3, 0); //back-front, down-up, right-left
  mainScene.add(mesht1);

  //Remove if not needed
  window.addEventListener("keydown", async (event) => {
    // Check if the pressed key is "g" or "G"
    if (event.key === "h" || event.key === "H") {
      await resetCamera(camera);

      cameraOnFocus.value = false;
      enableCameraControll(controls);
    }
  });

  // ---------------------------------------------
  //                T E S T I N G
  // ---------------------------------------------

  // Animation loop
  const animate = () => {
    if (!cameraOnFocus.value) {
      controls.update();
    }
    composer.render();

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
