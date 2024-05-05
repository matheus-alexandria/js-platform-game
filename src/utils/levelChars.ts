import { Lava } from '../actors/Lava';
import { Player } from '../actors/Player';
import { Coin } from '../actors/Coin';
import { Monster } from '../actors/Monster';

export const levelChars = {
  ".": "empty", 
  "#": "wall", 
  "+": "lava",
  "@": Player, 
  "o": Coin,
  "=": Lava,
  "|": Lava,
  "v": Lava,
  "M": Monster
};