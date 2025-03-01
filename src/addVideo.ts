import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Scene,
  SRGBColorSpace,
  Vector2,
  Vector3,
  VideoTexture,
} from "three";

export const addVideo = (
  videoSource: string,
  position: Vector3,
  aspectRatio: Vector2,
  mainScene: Scene,
  yRotation: number = Math.PI
) => {
  const video = document.createElement("video");
  video.src = videoSource;
  video.loop = true;
  video.muted = true;
  video.play();

  video.addEventListener("canplaythrough", () => {
    const videoTexture = new VideoTexture(video);
    videoTexture.colorSpace = SRGBColorSpace;

    const videoMaterial = new MeshBasicMaterial({ map: videoTexture });

    const videoGeometry = new PlaneGeometry(aspectRatio.x, aspectRatio.y);
    videoGeometry.scale(0.1, 0.1, 0.1);
    const videoProjectsPlane = new Mesh(videoGeometry, videoMaterial);
    videoProjectsPlane.position.copy(position);
    videoProjectsPlane.rotation.y = yRotation;
    mainScene.add(videoProjectsPlane);
  });
};
