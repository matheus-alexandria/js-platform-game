import { State } from "./State";
import { Vec } from "./Vec";

export class Coin {
  public pos;
  public basePos;
  public wobble;
  public size = new Vec(0.6, 0.6);

  constructor({ pos, basePos, wobble }: ICoinParams) {
    this.pos = pos;
    this.basePos = basePos;
    this.wobble = wobble;
  }

  get type() { return 'coin'; }

  static create(pos: Vec) {
    let basePos = pos.plus(new Vec(0.2, 0.1))
    return new Coin({ pos: basePos, basePos, wobble: Math.random() * Math.PI * 2})
  }

  collides(state: State): State {
    const filtered = state.actors.filter((act) => act !== this);
    if (!filtered.some((act) => act.type === 'coin')) {
      return new State({ level: state.level, actors: filtered, status: 'won'})
    }
    return new State({ level: state.level, actors: filtered, status: state.status })
  }
}

interface ICoinParams {
  pos: Vec;
  basePos: Vec;
  wobble: number;
}
