import { Vector3, Vector4 } from "three";
import { NavigationNames } from "./navigationNames";

export interface NavigationConfig {
  objectName: NavigationNames;
  position: Vector3;
  rotation: Vector3;
}

export interface NavigationConfigQuaternion {
  objectName: NavigationNames;
  position: Vector3;
  rotation: Vector4;
}
