import { Object3D, Object3DEventMap, Vector3 } from "three";

export class ModelObject {
  public object: Object3D<Object3DEventMap>;
  public position: Vector3;
  public rotation: Vector3;

  constructor(
    obj?: Object3D<Object3DEventMap>,
    pos: Vector3 = new Vector3(0, 0, 0),
    rot: Vector3 = new Vector3(0, 0, 0)
  ) {
    this.object = obj;
    this.position = pos;
    this.rotation = rot;
  }
}
