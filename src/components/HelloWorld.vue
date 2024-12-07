<script setup lang="ts">
import { onMounted, ref } from "vue";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

const threeCanvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
  if (!threeCanvas.value) return;

  // Scene
  const scene = new THREE.Scene();

  // Camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 0;
  camera.position.y = 5;
  camera.position.x = 20;
  camera.rotation.y = 1.55;

  // Add lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(5, 10, 7.5);
  scene.add(light);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas.value });
  renderer.setSize(window.innerWidth, window.innerHeight);

  const loader = new GLTFLoader();
  loader.load(
    "/model/scene2.glb",
    function (gltf) {
      scene.add(gltf.scene);
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  // OrbitControls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0); // Set the pivot point
  controls.enableDamping = true; // Enable damping (smooth movement)
  controls.dampingFactor = 0.05; // Adjust damping factor
  controls.enableZoom = true; // Allow zooming
  controls.enablePan = false; // Disable panning (optional)

  // Animation loop
  const animate = () => {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>

<template>
  <canvas ref="threeCanvas" class="three-canvas"></canvas>
</template>

<style scoped>
.three-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
