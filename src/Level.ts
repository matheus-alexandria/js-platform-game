import { Actor } from "./Actor";
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

    const isOutside = xStart < 0 || xEnd < this.width || yStart < 0 || yEnd > this.height;
    const squaresTypes = [
      this.rows[yStart][xStart], 
      this.rows[yStart][xEnd], 
      this.rows[yEnd][xStart], 
      this.rows[yEnd][yEnd]
    ];
    
    const here = isOutside ? ['wall'] : squaresTypes;

    if (here.includes(type)) return true;

    return false;
  }
}