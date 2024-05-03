import { State } from "./State";
import { Vec } from "./Vec";

export class Lava {
  public pos;
  public speed;
  public reset;
  public size = new Vec(1, 1);

  constructor({ pos, speed, reset }: ILavaParams) {
    this.pos = pos;
    this.speed = speed;
    this.reset = reset;
  }

  get type() { return 'lava' };

  static create(pos: Vec, ch: string) {
    switch (ch) {
      case '=':
        return new Lava({ pos, speed: new Vec(2, 0) })
      case '|':
        return new Lava({ pos, speed: new Vec(0, 2) })
      case 'v':
        return new Lava({ pos, speed: new Vec(0, 3), reset: pos })
      default:
        break;
    }
  }

  collides(state: State): State {
    return new State({ level: state.level, actors: state.actors, status: 'lost' })
  }
}

interface ILavaParams {
  pos: Vec;
  speed: Vec;
  reset?: Vec;
}