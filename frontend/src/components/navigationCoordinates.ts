import { Vector3, Vector4 } from "three";
import {
  NavigationConfig,
  NavigationConfigQuaternion,
  NavigationNames,
} from "../models";

export const navigationCoordinates: NavigationConfig[] = [
  {
    objectName: NavigationNames.aboutMe,
    position: new Vector3(7.6, 5.7, -3),
    rotation: new Vector3(0, Math.PI / 2 + 0.4, 0),
  },
  {
    objectName: NavigationNames.projects,
    position: new Vector3(-3.272, 4.36, -9.7),
    rotation: new Vector3(0, Math.PI, 0),
  },
  {
    objectName: NavigationNames.game,
    position: new Vector3(8, 4.5132, 4.693),
    rotation: new Vector3(0, Math.PI / 2, 0),
  },
  {
    objectName: NavigationNames.credits,
    position: new Vector3(50, 20, 20),
    rotation: new Vector3(0, Math.PI / 2 + 0.1, 0),
  },
];

export const startingCoordinates: NavigationConfigQuaternion = {
  objectName: NavigationNames.start,
  position: new Vector3(29.3, 14.3, -15.4),
  rotation: new Vector4(
    -0.10470398253995944,
    0.838203527285549,
    0.17331762518282762,
    0.5063723172600576
  ),
};
