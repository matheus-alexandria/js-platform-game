import { Vec } from "./Vec";

export class Player {
  public pos;
  public speed;
  public size = new Vec(0.8, 1.5);

  constructor(pos: Vec, speed: Vec) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return 'player' };

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }
}
