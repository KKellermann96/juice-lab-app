import { PerspectiveCamera, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";


export const configureControls = (camera: PerspectiveCamera, renderer: WebGLRenderer): OrbitControls => {
  camera.position.set(30, 8, 2);
  // OrbitControls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.minDistance = 22; // Minimum zoom
  controls.maxDistance = 70; // Maximum zoom
  controls.enablePan = false;
  controls.minPolarAngle = 0.2;
  controls.maxPolarAngle = Math.PI / 2.2;

  return controls;

}