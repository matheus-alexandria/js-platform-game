import { State } from "../State";
import { Vec } from "../Vec";

export class Monster {
  public pos: Vec;
  public speed: Vec;
  public size = new Vec(1,1);

  constructor(pos: Vec, speed: Vec) {
    this.pos = pos;
    this.speed = speed;
  }

  static create(pos: Vec) {
    return new Monster(pos, new Vec(2,0));
  }

  get type() { return 'monster' };

  collides(state: State): State {
    return state;
  }

  update(time: number, state: State): Monster {
    let xSpeed = this.speed.x * time;
    let pos = this.pos;
    let moved = pos.plus(new Vec(time * this.speed.x, 0));
    if (!state.level.touches(moved, this.size, 'wall')) {
      pos = moved;
    } else {
      xSpeed = -xSpeed;
    }

    return new Monster(pos, new Vec(xSpeed, 0));
  }
}