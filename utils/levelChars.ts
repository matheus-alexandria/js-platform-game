import { Lava } from '../Lava';
import { Player } from '../Player';
import { Coin } from '../Coin';

export const levelChars = {
  ".": "empty", 
  "#": "wall", 
  "+": "lava",
  "@": Player, 
  "o": Coin,
  "=": Lava,
  "|": Lava,
  "v": Lava
};