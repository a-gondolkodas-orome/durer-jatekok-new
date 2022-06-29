import { Client } from 'boardgame.io/react';
import { MyGame } from './game';
import { MyBoard } from './board';

const TicTacToe = Client({
  game: MyGame,
  board: MyBoard,
});

export default TicTacToe;