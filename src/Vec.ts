export class Vec {
  public x;
  public y;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  plus(otherVec: Vec) {
    return new Vec(this.x + otherVec.x, this.y + otherVec.y)
  }

  times(factor: number) {
    return new Vec(this.x * factor, this.y * factor)
  }
}