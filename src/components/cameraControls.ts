import { PerspectiveCamera, Vector3, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { gsap } from "gsap";
import { startingCoordinates } from "./navigationCoordinates";

export const configureControls = (
  camera: PerspectiveCamera,
  renderer: WebGLRenderer
): OrbitControls => {
  camera.position.set(30, 8, 2);
  // OrbitControls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.minDistance = 22; // Minimum zoom
  controls.maxDistance = 70; // Maximum zoom
  controls.enablePan = false;
  controls.minPolarAngle = 0.2;
  controls.maxPolarAngle = Math.PI / 2.2;

  return controls;
};

export const enableCameraControll = (controls: OrbitControls, value = true) => {
  controls.enableRotate = value;
  controls.enableDamping = value;
  controls.enableZoom = value;
};

export const moveCamera = async (
  camera: PerspectiveCamera,
  coordinates: Vector3,
  rotation: Vector3,
  duration = 2
) => {
  await Promise.all([
    gsap.to(camera.position, {
      x: coordinates.x,
      y: coordinates.y,
      z: coordinates.z,
      duration: 2,
      ease: "power1.inOut",
    }),

    gsap.to(camera.rotation, {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z,
      duration,
      ease: "power1.inOut",
    }),
    // y axsis rotation
    //right 0
    //left Math.PI ,
    //front Math.PI / 2,
    //back Math.PI / -2,
  ]);
};

export const resetCamera = async (camera: PerspectiveCamera) => {
  await Promise.all([
    gsap.to(camera.position, {
      x: startingCoordinates.position.x,
      y: startingCoordinates.position.y,
      z: startingCoordinates.position.z,
      duration: 2,
      ease: "power1.inOut",
    }),
    gsap.to(camera.quaternion, {
      w: startingCoordinates.rotation.w,
      x: startingCoordinates.rotation.x,
      y: startingCoordinates.rotation.y,
      z: startingCoordinates.rotation.z,
      duration: 2,
      ease: "power1.inOut",
    }),
  ]);
};
