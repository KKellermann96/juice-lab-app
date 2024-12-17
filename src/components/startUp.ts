import {
  AmbientLight,
  Clock,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  VideoTexture,
} from "three";
import { Ref } from "vue";
import { sceneRenderer } from "./sceneRenderer";
import { configureControls } from "./cameraControls";
import { GLTF, GLTFLoader } from "three/examples/jsm/Addons.js";
import { loadAnimations } from "./loadAnimations";

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

  const gltf = await loadGLBModel(modelPath);
  mainScene.add(gltf.scene);

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

  // Create a plane geometry for the video
  const geometry = new PlaneGeometry(8.5, 26); // Aspect ratio of the video
  geometry.scale(0.1, 0.1, 0.1); // Adjust scale if needed
  const plane = new Mesh(geometry, videoMaterial);
  plane.position.set(-1.55, 3.35, -7.45);
  plane.rotation.y = Math.PI;
  // Add the plane to the scene
  mainScene.add(plane);

  const clock = new Clock();
  const mixer = loadAnimations(gltf);

  // Animation loop
  const animate = () => {
    controls.update();
    composer.render();

    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }

    requestAnimationFrame(animate);
  };

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
};

async function loadGLBModel(modelPath: string): Promise<GLTF> {
  try {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync(modelPath);
    return gltf;
  } catch (error) {
    throw Error(`Error loading GLB model: ${error}`);
  }
}
