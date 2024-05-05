import { Actor } from "./actors/Actor";
import { Vec } from "./Vec";
import { levelChars } from "./utils/levelChars";

export class Level {
  public height: number;
  public width: number;
  public startActors: Actor[];
  public rows: string[][];

  constructor(plan: string) {
    let rows = plan.trim().split("\n").map(l => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = levelChars[ch];
        if (typeof type == "string") return type;

        this.startActors.push(
          type.create(new Vec(x, y), ch)
        );
        return "empty";
      });
    });
  }

  touches(pos: Vec, size: Vec, type: string): boolean {
    const xStart = Math.floor(pos.x);
    const xEnd = Math.ceil(pos.x + size.x);
    const yStart = Math.floor(pos.y);
    const yEnd = Math.ceil(pos.y + size.y);

    for (let y = yStart; y < yEnd; y++) {
      for (let x = xStart; x < xEnd; x++) {
        const isOutside = x < 0 || x >= this.width || y < 0 || yEnd >= this.height;
        const here = isOutside ? 'wall' : this.rows[y][x]
        if (here === type) return true;
      }
    }

    return false;
  }
}