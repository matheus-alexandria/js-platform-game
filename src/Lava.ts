import { State } from "./State";
import { Vec } from "./Vec";

export class Lava {
  public pos: Vec;
  public speed: Vec;
  public reset?: Vec;
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

  update(time: number, state: State): Lava {
    const newPos = this.pos.plus(this.speed.times(time));
    if (!state.level.touches(newPos, this.size, 'wall')) {
      return new Lava({ pos: newPos, speed: this.speed, reset: this.reset });
    } else if (this.reset) {
      return new Lava({ pos: this.reset, speed: this.speed, reset: this.reset });
    } else {
      return new Lava({ pos: this.pos, speed: this.speed.times(-1) });
    }
  }
}

interface ILavaParams {
  pos: Vec;
  speed: Vec;
  reset?: Vec;
}