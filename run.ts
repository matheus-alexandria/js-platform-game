import { Level } from "./Level";
import { Player } from "./Player";
import { Vec } from "./Vec";

let simpleLevelPlan = `
......................
..#................#..
..#..............=.#..
..#.........o.o....#..
..#.@......#####...#..
..#####............#..
......#++++++++++++#..
......##############..
......................`;

const level = new Level(simpleLevelPlan);
console.log(`${level.width} by ${level.height}`);