import { Client } from 'boardgame.io/react';
import { Game } from './game';

import { Board } from './board';

const TicTacToe = Client({
  game: Game,
  board: Board,
});

export default TicTacToe;