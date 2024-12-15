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

  const mainScene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 2;
  camera.position.y = 8;
  camera.position.x = 30;

  // Add lighting for main house
  const mainLight = new THREE.DirectionalLight(0xffffff, 0.5);
  mainLight.position.set(-10, 10, 0);

  mainScene.add(mainLight);

  const lightHelper2 = new THREE.DirectionalLightHelper(mainLight, 1); // 1 is the size of the helper
  mainScene.add(lightHelper2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 2);
  mainScene.add(ambientLight);

  // Renderer
  const renderer = new THREE.WebGLRenderer({ canvas: threeCanvas.value });
  renderer.setSize(window.innerWidth, window.innerHeight);

  //---------------------------------------------

  const renderScene = new RenderPass(mainScene, camera);
  const composer = new EffectComposer(renderer);
  composer.addPass(renderScene);

  const bloomPass = new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight), //resolution
    0.22, //intensity
    0.1, //radius of the bloom
    0.1 //which pixels emit the bloom
  );

  composer.addPass(bloomPass);

  renderer.toneMapping = THREE.CineonToneMapping;
  // renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 1.5;
  //---------------------------------------------

  // Animations
  let mixer;
  const clock = new THREE.Clock();

  const loader = new GLTFLoader();

  loader.load(
    "/model/scene6.glb",
    function (gltf) {
      const loadedScene = gltf.scene;

      mainScene.add(loadedScene);

      // Debug: Check animations
      if (gltf.animations.length > 0) {
        // Initialize the AnimationMixer
        mixer = new THREE.AnimationMixer(loadedScene);

        gltf.animations.forEach((clip) => {
          const action = mixer.clipAction(clip);
          action.play();
        });
      } else {
        console.warn("No animations found in the GLB file.");
      }
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );

  camera.layers.enable(0);
  camera.layers.enable(1);

  // OrbitControls setup
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.target.set(0, 0, 0);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;
  controls.minDistance = 22; // Minimum zoom
  controls.maxDistance = 50; // Maximum zoom
  controls.enablePan = false;
  controls.minPolarAngle = 0.2;
  controls.maxPolarAngle = Math.PI / 2.2;

  // Animation loop
  const animate = () => {
    controls.update();
    composer.render();
    requestAnimationFrame(animate);

    // Update mixer if it's defined
    const delta = clock.getDelta();
    if (mixer) {
      mixer.update(delta);
    }
  };

  animate();

  // Handle window resize
  window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    composer.setSize(window.innerWidth, window.innerHeight);
  });
});
</script>

<template>
  <canvas ref="threeCanvas" class="w-full h-full"></canvas>
</template>
