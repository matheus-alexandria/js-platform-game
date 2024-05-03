import { Actor } from "./Actor";
import { Level } from "./Level";
import { overlaps } from "./utils/overlaps";

export class State {
  public level: Level;
  public actors: Actor[];
  public status: string;

  constructor({ level, actors, status }: IStateParams) {
    this.level = level;
    this.actors = actors;
    this.status = status;
  }

  static start(level: Level) {
    return new State({ level, actors: level.startActors, status: 'playing' });
  }

  get player() {
    return this.actors.find(a => a.type == "player");
  }

  update(time, keys): State {
    const actors = this.actors.map((actor) => actor.update(time, this, keys));

    let newState = new State({ level: this.level, actors, status: this.status });
    if (newState.status !== 'playing') return newState;

    let player = newState.player!;
    if (
      player?.pos && player.size &&
      this.level.touches(player.pos, player.size, 'lava')
    ) {
      return new State({ level: this.level, actors, status: 'lost'});
    }

    for (let actor of actors) {
      if (actor.type !== 'player' && overlaps(player, actor)) {
        newState = actor.collides(newState);
      }
    }

    return newState;
  }
}

interface IStateParams {
  level: Level
  actors: Actor[]
  status: string
}