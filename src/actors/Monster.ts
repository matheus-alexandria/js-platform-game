import { State } from "../State";
import { Vec } from "../Vec";
import { Player } from "./Player";

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
    let player = state.player as Player;
    let playerFoot = player.pos.y + player.size.y;
    let oldPlayerPos = playerFoot - player.size.y / 10;
    if (oldPlayerPos < this.pos.y) {
      let actors = state.actors.filter((act) => act !== this);
      return new State({ level: state.level, actors, status: state.status });
    }
    
    return new State({ level: state.level, actors: state.actors, status: 'lost' })
  }

  update(time: number, state: State): Monster {
    let xSpeed = this.speed.x * time;
    let pos = this.pos;
    let moved = pos.plus(new Vec(xSpeed, 0));
    if (!state.level.touches(moved, this.size, 'wall')) {
      pos = moved;
    } else {
      this.speed.x = -this.speed.x;
    }

    return new Monster(pos, this.speed);
  }
}