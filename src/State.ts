import { Actor } from "./Actor";
import { Level } from "./Level";

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
}

interface IStateParams {
  level: Level
  actors: Actor[]
  status: string
}