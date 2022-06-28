import { Client } from 'boardgame.io/react';
import { Game } from './game';

import { Board } from './board';

const Coin123 = Client({
  game: Game,
  board: Board,
});

export default Coin123;