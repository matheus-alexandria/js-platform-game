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
}

interface ICoinParams {
  pos: Vec;
  basePos: Vec;
  wobble: number;
}
