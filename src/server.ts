import { Server } from 'boardgame.io/server';
import { MyGame } from './games/tictactoe/game';

const server = Server({
    games: [
        MyGame,
    ],
})

server.run(8000);
