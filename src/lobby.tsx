import { Client, Lobby } from 'boardgame.io/react';
import { Local } from 'boardgame.io/multiplayer';
import { MyGame } from './games/tictactoe/game';
import { MyBoard } from './games/tictactoe/board';

const server = 'http://localhost:8000';

export default function () {
  return (
    <div>
      <h1>Lobby</h1>
      <Lobby gameServer={server} lobbyServer={server} gameComponents={[{
        game: /* TicTacToe. */ MyGame,
        board: /* TicTacToe. */ MyBoard
      }]} />
    </div>
  );
};