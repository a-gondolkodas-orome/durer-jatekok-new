import { Client } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { MyGame } from './game';
import { MyBoard } from './board';
import MyBot from './mybot';

const SuperstitiousCounting = Client({
  game: MyGame,
  board: MyBoard,
  multiplayer: Local(
    {
      bots: { '0': MyBot }
    }
  ),
});

export default function () {
  return (
    <>
      <SuperstitiousCounting playerID='1' />
    </>
  )
};