import { State } from "./State";
import { Vec } from "./Vec";

const gravity = 30;
const playerXSpeed = 7;
const jumpSpeed = 14;

export class Player {
  public pos: Vec;
  public speed: Vec;
  public size = new Vec(0.8, 1.5);

  constructor(pos: Vec, speed: Vec) {
    this.pos = pos;
    this.speed = speed;
  }

  get type() { return 'player' };

  static create(pos: Vec) {
    return new Player(pos.plus(new Vec(0, -0.5)), new Vec(0, 0));
  }

  update(time: number, state: State, keys: Record<string, boolean>): Player {
    let xSpeed = 0;
    if (keys.ArrowLeft) xSpeed -= playerXSpeed;
    if (keys.ArrowRight) xSpeed += playerXSpeed;

    let pos = this.pos;
    let xMoved = pos.plus(new Vec(xSpeed * time, 0));
    if (!state.level.touches(xMoved, this.size, 'wall')) {
      pos = xMoved;
    }

    let ySpeed = this.speed.y + time * gravity;
    let yMoved = pos.plus(new Vec(0, ySpeed * time));
    if (!state.level.touches(yMoved, this.size, 'wall')) {
      pos = yMoved;
    } else if (keys.ArrowUp && ySpeed > 0) {
      ySpeed = -jumpSpeed;
    } else {
      ySpeed = 0;
    }

    return new Player(pos, new Vec(xSpeed, ySpeed));
  }
}
