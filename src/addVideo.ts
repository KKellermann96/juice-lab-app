import {
  LinearFilter,
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  VideoTexture,
} from "three";
import { Ref } from "vue";

export const addVideo = (
  videoSource: string,
  position: Vector3,
  aspectRatio: Vector2,
  mainScene: Scene,
  videoElements: Ref<HTMLVideoElement[]>,
  videoTextures: Ref<VideoTexture[]>,
  yRotation: number = Math.PI
) => {
  const video = document.createElement("video");
  video.src = videoSource;
  video.loop = true;
  video.muted = true;
  video.crossOrigin = "anonymous";
  video.play();

  const videoTexture = new VideoTexture(video);
  videoTexture.colorSpace = SRGBColorSpace;
  videoTexture.minFilter = LinearFilter;

  const videoMaterial = new MeshBasicMaterial({ map: videoTexture });
  const videoGeometry = new PlaneGeometry(aspectRatio.x, aspectRatio.y);
  videoGeometry.scale(0.1, 0.1, 0.1);
  const videoMesh = new Mesh(videoGeometry, videoMaterial);

  videoMesh.position.copy(position);
  videoMesh.rotation.y = yRotation;
  mainScene.add(videoMesh);

  videoElements.value.push(video);
  videoTextures.value.push(videoTexture);
};
