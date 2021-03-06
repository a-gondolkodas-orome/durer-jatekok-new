import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { MyGame } from './game';
import { MyBoard } from './board';
import strategy from './strategy';
import botWrapper from '../../common/botwrapper';

const TicTacToe = Client({
  game: MyGame,
  board: MyBoard,
  multiplayer: Local(
    {
      bots: {'0': botWrapper("clickCell",strategy)}
    }
  ),
});

export default function() {
  return (
    <>
      <TicTacToe playerID='1' />
    </>
  );
};